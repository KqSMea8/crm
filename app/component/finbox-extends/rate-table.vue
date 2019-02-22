<template>
    <div class="rate-table">
        <el-form :rules="stageRules" :model="model" :inline="true" label-position="right" label-width="160px">
            <el-row class="jzd-delay" :class="{hidden: model.productId !== 'JZD'}">
                <el-col :span="24">
                    <el-form-item label="黑卡延迟还款天数（在C端显示为免息期）" prop="delayRepaymentDays">
                        <el-input v-model="model.delayRepaymentDays" placeholder="请输入黑卡延迟还款天数"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-button v-if="operationType!=3&&operationType!=4" type="primary" @click="createStage">新建分期</el-button>
                    <span style="color:#ff0000;margin-left:5px;">标红IRR已经超出产品预警范围， 请核实！</span>
                </el-col>
            </el-row>
            <el-row v-if="model.productId == 'YMD' || (model.productId === 'DXJ' && model.isAllowPriceMultiplier == 1)">
                <el-col :span="12">
                    <el-form-item label="是否开启浮动定价：">
                        <el-radio-group v-model='model.priceMultiplierSwitch' @change="priceChange" :disabled="operationType==4||operationType==3||loading">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :class="{hidden: model.priceMultiplierSwitch==0}">
                    <el-form-item label="使用浮动定价策略：">
                        <el-select v-model="model.priceMultiplierPolicyId" placeholder="请选择" @change=policyChange :disabled="operationType==4||operationType==3||loading">
                            <el-option
                                v-for="item in strategys"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :class="{hidden: model.priceMultiplierSwitch==0}" v-if="model.productId === 'YMD'">
                <el-col :span="12">
                    <el-form-item label="分期手续最低(元)：" prop="minAmountCharge">
                        <el-input v-model="model.minAmountCharge" placeholder="请输入最低分期手续费"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分期手续最高(元)：" prop="maxAmountCharge">
                        <el-input v-model="model.maxAmountCharge" placeholder="请输入最高分期手续费"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table v-if="model.rateDetailTableData && model.rateDetailTableData.length > 0" :data="model.rateDetailTableData" border v-loading="loading" element-loading-text="Loading">
            <el-table-column
                    width=260
                    label="行业"
                    prop="industryLabel">
                <template slot-scope="scope">
                    <template v-if="scope.row.industryLabel_old && scope.row.industryLabel != scope.row.industryLabel_old">
                        <span class="del-old">{{scope.row.industryLabel_old}}</span>
                        <span>{{scope.row.industryLabel}}</span>
                    </template>
                    <span v-else>{{scope.row.industryLabel}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    width=180
                    label="还款类型"
                    prop="repaymentTypeName">
            </el-table-column>
            <el-table-column
                    label="借款期数"
                    prop="totalInstalmentNum">
                <template slot-scope="scope">
                    <template v-if="scope.row.totalInstalmentNum_old && scope.row.totalInstalmentNum != scope.row.totalInstalmentNum_old">
                        <span class="del-old">{{scope.row.totalInstalmentNum_old}}</span>
                        <span>{{scope.row.totalInstalmentNum}}</span>
                    </template>
                    <span v-else>{{scope.row.totalInstalmentNum}}</span>
                </template>
            </el-table-column>
            <el-table-column 
                    width=150
                    label="浮动定价策略"
                    prop="priceMultiplierPolicyId">
                <template slot-scope="scope">
                    <template v-if="scope.row.priceMultiplierPolicyId_old && scope.row.priceMultiplierPolicyId != scope.row.priceMultiplierPolicyId_old">
                        <span class="del-old">{{scope.row.priceMultiplierPolicyName_old}}</span>
                        <span>{{scope.row.priceMultiplierPolicyName}}</span>
                    </template>
                    <span v-else>{{scope.row.priceMultiplierPolicyName}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="浮动类型"
                    prop="customerLevelName">
            </el-table-column>
            <el-table-column
                    label="第一批期数"
                    width=100
                    prop="firstInstalmentNum">
                <template slot-scope="scope">
                    <template v-if="scope.row.firstInstalmentNum_old && scope.row.firstInstalmentNum != scope.row.firstInstalmentNum_old">
                        <span class="del-old">{{scope.row.firstInstalmentNum_old}}</span>
                        <span>{{scope.row.firstInstalmentNum}}</span>
                    </template>
                    <span v-else>{{scope.row.firstInstalmentNum}}</span>
                </template>
            </el-table-column>
            <el-table-column 
                    width=150
                    label="第一批还本金比例%"
                    prop="firstPrincipalRate">
                <template slot-scope="scope">
                    <template v-if="scope.row.firstPrincipalRate_old && scope.row.firstPrincipalRate != scope.row.firstPrincipalRate_old">
                        <span class="del-old">{{scope.row.firstPrincipalRate_old}}</span>
                        <span>{{scope.row.firstPrincipalRate}}</span>
                    </template>
                    <span v-else>{{scope.row.firstPrincipalRate}}</span>
                </template>
            </el-table-column>
            <el-table-column 
                    width=170
                    label="第一批客户每期费率%"
                    prop="firstCustomerPaymentRate">
                <template slot-scope="scope">
                    <template v-if="scope.row.firstCustomerPaymentRate_old && scope.row.firstCustomerPaymentRate != scope.row.firstCustomerPaymentRate_old">
                        <span class="del-old">{{scope.row.firstCustomerPaymentRate_old}}</span>
                        <span>{{scope.row.firstCustomerPaymentRate}}</span>
                    </template>
                    <span v-else>{{scope.row.firstCustomerPaymentRate}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    width=100
                    label="第二批期数"
                    prop="secondInstalmentNum">
                <template slot-scope="scope">
                    <template v-if="scope.row.secondInstalmentNum_old && scope.row.secondInstalmentNum != scope.row.secondInstalmentNum_old">
                        <span class="del-old">{{scope.row.secondInstalmentNum_old}}</span>
                        <span>{{scope.row.secondInstalmentNum}}</span>
                    </template>
                    <span v-else>{{scope.row.secondInstalmentNum}}</span>
                </template>
            </el-table-column>
            <el-table-column 
                    width=150
                    label="第二批还本金比例%"
                    prop="secondPrincipalRate">
                <template slot-scope="scope">
                    <template v-if="scope.row.secondPrincipalRate_old && scope.row.secondPrincipalRate != scope.row.secondPrincipalRate_old">
                        <span class="del-old">{{scope.row.secondPrincipalRate_old}}</span>
                        <span>{{scope.row.secondPrincipalRate}}</span>
                    </template>
                    <span v-else>{{scope.row.secondPrincipalRate}}</span>
                </template>
            </el-table-column>
            <el-table-column 
                    width=170
                    label="第二批客户每期费率%"
                    prop="secondCustomerPaymentRate">
                <template slot-scope="scope">
                    <template v-if="scope.row.secondCustomerPaymentRate_old && scope.row.secondCustomerPaymentRate != scope.row.secondCustomerPaymentRate_old">
                        <span class="del-old">{{scope.row.secondCustomerPaymentRate_old}}</span>
                        <span>{{scope.row.secondCustomerPaymentRate}}</span>
                    </template>
                    <span v-else>{{scope.row.secondCustomerPaymentRate}}</span>
                </template>
            </el-table-column>
            <el-table-column 
                    width=120
                    label="机构贴息费率%"
                    prop="merchantInstalmentRate">
                <template slot-scope="scope">
                    <template v-if="scope.row.merchantInstalmentRate_old && scope.row.merchantInstalmentRate != scope.row.merchantInstalmentRate_old">
                        <span class="del-old">{{scope.row.merchantInstalmentRate_old}}</span>
                        <span>{{scope.row.merchantInstalmentRate}}</span>
                    </template>
                    <span v-else>{{scope.row.merchantInstalmentRate}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="IRR%"
                    prop="irr">
                <template slot-scope="scope">
                    <template v-if="scope.row.irr_old && scope.row.irr_old != scope.row.irr">
                        <span class="del-old">{{scope.row.irr_old}}</span>
                        <span v-if="scope.row.IRRRed" style="color:#ff0000;">{{scope.row.irr}}</span>
                        <span v-else>{{scope.row.irr}}</span>
                    </template>
                    <span v-else-if="scope.row.IRRRed" style="color:#ff0000;">{{scope.row.irr}}</span>
                    <span v-else>{{scope.row.irr}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    v-if="operationType == 1 || operationType == 2"
                    width=100
                    fixed="right"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.customerLevel == -1 || scope.row.childEdit" size="small" @click="editStage(scope.row)">编辑</el-button>
                    <!--只有父节点能删除-->
                    <el-button type="text" v-if="scope.row.customerLevel == -1" size="small" @click="deleteStage(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="850px"
            :before-close="handleClose">
            <el-form ref="stageForm" :inline="true" :rules="dialogRules" :model="dialogFormData" label-position="right" label-width="180px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="分期类型：">
                            <el-radio-group v-model="dialogFormData.repaymentType" @change="stageChange" :disabled="stageDisabled">
                                <el-radio
                                    v-for="item in model.repaymentTypes"
                                    :label="item.value">
                                    {{item.label}}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <template v-if="dialogFormData.repaymentType == 1 || dialogFormData.repaymentType == 5">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="借款期数：" prop="totalInstalmentNum">
                                <el-input v-model="dialogFormData.totalInstalmentNum" placeholder="请输入借款期数"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="客户每期费率%：" prop="firstCustomerPaymentRate">
                                <el-input v-model="dialogFormData.firstCustomerPaymentRate" placeholder="请输入客户每期费率"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>    
                </template>
                <template v-else>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="第一批期数：" prop="firstInstalmentNum">
                                <el-input :disabled="opState == 2 && dialogFormData.repaymentType == 4" v-model="dialogFormData.firstInstalmentNum" placeholder="请输入第一批期数" @input="instalmentChange"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="第一批还本金比例%：" prop="firstPrincipalRate">
                                <el-input :disabled="dialogFormData.repaymentType == 3 || (opState == 2 && dialogFormData.repaymentType == 4)" v-model="dialogFormData.firstPrincipalRate" placeholder="请输入第一批本金比例" @input="firstPriceChange"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="第一批客户每期费率%：" prop="firstCustomerPaymentRate">
                                <el-input :disabled="dialogFormData.repaymentType == 3" v-model="dialogFormData.firstCustomerPaymentRate" placeholder="请输入第一批客户费率" @input="firstCRateChange"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="第二批期数：" prop="secondInstalmentNum">
                                <el-input :disabled="opState == 2 && dialogFormData.repaymentType == 4" v-model="dialogFormData.secondInstalmentNum" placeholder="请输入第二批期数" @input="instalmentChange"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="第二批还本金比例%：" prop="secondPrincipalRate">
                                <el-input :disabled="dialogFormData.repaymentType == 2 || dialogFormData.repaymentType == 3 || dialogFormData.repaymentType == 4" v-model="dialogFormData.secondPrincipalRate" placeholder="请输入第二批本金比例"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="第二批客户每期费率%：" prop="secondCustomerPaymentRate">
                                <el-input :disabled="dialogFormData.repaymentType == 2" v-model="dialogFormData.secondCustomerPaymentRate" placeholder="请输入第二批客户费率"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </template>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="机构贴息费率：" prop="merchantInstalmentRate">
                            <el-input v-model="dialogFormData.merchantInstalmentRate" placeholder="请输入机构贴息费率"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="">
                            <el-button type="text" @click="calculateIRR">试算IRR</el-button>
                            <span v-if="irr">{{irr}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="费率使用行业：" prop="strTrain">
                            <el-checkbox  @change="strTrainChange" v-model="dialogFormData.strTrain"
                                v-for="item in model.trains"
                                :label="item.value">
                                {{item.label}}
                            </el-checkbox>
                            <div v-if="!trainChecked" style="color:#ff0000;">正在检查该行业关联门店、项目信息，请稍后。</div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="btnOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    /**
     * @file rate-table.vue
     * @description 费率详情页-表格
     * @author zengqingzhuang
     * @since  2017-12-11
     */
    import finbox from 'finbox';
    import _ from 'lodash';
    import url from 'url';
    import queryString from 'query-string';
    export default {
        data() {
            return {
                loading: false,
                isRequest: false,
                curRow: {}, // 保存编辑行的数据
                opState: '', // 1新建，2编辑
                stageDisabled: false, // 分期类型是否可选
                // 浮动定价策略
                strategys: [],
                // 页面删除的数据paymentRateCode值
                deletePaymentRateCodes: [],
                // 使用行业选择显示文案
                trainChecked: true,
                // 1新建，2编辑，3查看，4审核
                operationType: 0,
                strategyType: '', // 1=医美，2=教育，其它行业空值
                strategyList: [], // 策略包数据
                // 弹窗数据
                dialogVisible: false,
                dialogTitle: '',
                dialogFormData: {
                    // 分期类型
                    repaymentType: '',
                    // 机构贴息费
                    merchantInstalmentRate: '',
                    // 借款期数
                    totalInstalmentNum: '',
                    // 客户每期费率、第一批客户每期费率
                    firstCustomerPaymentRate: '',
                    // 第一批期数
                    firstInstalmentNum: '',
                    // 第一批还本金比例
                    firstPrincipalRate: '',
                    // 第二批期数
                    secondInstalmentNum: '',
                    // 第二批还本金比例
                    secondPrincipalRate: '',
                    // 第二批客户每期费率
                    secondCustomerPaymentRate: '',
                    // 费率使用行业
                    strTrain: []
                },
                // 校验规则
                dialogRules: {
                    merchantInstalmentRate: [
                        { required: true, message: '只能输入两位小数', trigger: 'blur', "pattern": /(^[1-9][0-9]*|^0)([.][0-9]{2})$/ }
                    ],
                    totalInstalmentNum: [
                        { required: true, message: '只能输入正整数', trigger: 'blur', "pattern": /^\d+$/ }
                    ],
                    firstCustomerPaymentRate: [
                        { required: true, message: '只能输入两位小数', trigger: 'blur', "pattern": /(^[1-9][0-9]*|^0)([.][0-9]{2})$/ }
                    ],
                    firstInstalmentNum: [
                        { required: true, message: '只能输入正整数', trigger: 'blur', "pattern": /^\d+$/  }
                    ],
                    firstPrincipalRate: [
                        { required: true, message: '只能输入两位小数', trigger: 'blur', "pattern": /(^[1-9][0-9]*|^0)([.][0-9]{2})$/ }
                    ],
                    secondInstalmentNum: [
                        { required: true, message: '只能输入正整数', trigger: 'blur', "pattern": /^\d+$/ }
                    ],
                    secondPrincipalRate: [
                        { required: true, message: '只能输入两位小数', trigger: 'blur', "pattern": /(^[1-9][0-9]*|^0)([.][0-9]{2})$/ }
                    ],
                    secondCustomerPaymentRate: [
                        { required: true, message: '只能输入两位小数', trigger: 'blur', "pattern": /(^[1-9][0-9]*|^0)([.][0-9]{2})$/ }
                    ],
                    strTrain: [
                        { required: true, message: '请选择费率使用行业' }
                    ]
                },
                stageRules: {
                    delayRepaymentDays: [
                        { required: true, message: '只能输入0-100之间的正整数', trigger: 'blur', "pattern": /^(\d|[1-9]\d|100)$/ }
                    ],
                    minAmountCharge: [
                        { required: true, message: '只能输入大于等于1的正整数', trigger: 'blur', "pattern": /^[0-9]*[1-9][0-9]*$/ }
                    ],
                    maxAmountCharge: [
                        { required: true, message: '只能输入大于等于1的正整数', trigger: 'blur', "pattern": /^[0-9]*[1-9][0-9]*$/ }
                    ]
                },
                irr: ''
            }
        },
        created() {
            this.$watch('model.repaymentTypes', (val, oldVal)=> {
                this.dialogFormData.repaymentType = val[0].value;
            });
            this.$watch('model.paymentRateInfo.applyInfo.companyId', (val) => {
                this.model.companyId = this.model.paymentRateInfo.applyInfo.companyId;
            });
            // 显示浮动定价策略-策略包
            this.$watch('model.productId', async (val, oldVal)=> {
                if (val == 'YMD' || val == 'DXJ') {
                    this.strategyType = 1;
                    if (val == 'DXJ') {
                        this.strategyType = 2;
                    }
                    let api = `/contract/api/getstrategypackagelist?productId=${val}&strategyType=${this.strategyType}`;
                    let res = await finbox.apify(api).initApi();
                    if (res.status == 0) {
                        this.strategyList = res.data;
                        res.data.forEach(item => {
                            this.strategys.push({
                                value: item.priceMultiplierPolicyId,
                                label: item.priceMultiplierPolicyName
                            });
                        });
                        // 子节点是否显示编辑按钮, 当策略包里的 floatType ==2 显示编辑
                        let tableData = this.handlerBtnState(this.model.rateDetailTableData);
                        this.model['rateDetailTableData'] = tableData.concat([]);
                    }
                }
            });
            let query = queryString.parse(url.parse(location.href).query);
            this.operationType = query.operationType;
        },
        methods: {
            // 创建分期
            createStage() {
                if (!this.model.productId) return;
                this.dialogVisible = true;
                this.dialogTitle = '新建分期计划';
                this.clearDialogForm();
                this.curRow = {};
                this.opState = 1; // 新建状态
                this.stageDisabled = false; // 分期可选
                this.dialogFormData.repaymentType = this.model.repaymentTypes[0].value; // 分期默认选中第一个
            },
            // 编辑分期
            editStage(rowData) {
                this.irr = '';
                this.dialogVisible = true;
                this.dialogTitle = '修改分期计划';
                this.clearDialogForm();
                Object.keys(this.dialogFormData).forEach(key => {
                    this.dialogFormData[key] = rowData[key];
                });
                this.curRow = rowData;
                this.opState = 2; // 编辑状态
                this.stageDisabled = rowData.paymentPlanCode ? true : false;
            },
            // 删除分期
            deleteStage(rowData) {
                if (rowData.customerLevel == -1) {
                    this.$confirm("确定删除吗？", '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async () => {
                        if (rowData.paymentRateCode) { // 调用接口查询是否可以删除
                            let res = await finbox.apify('/contract/api/deletepaymentratecheckbyratecode').initApi({paymentRateCode: rowData.paymentRateCode});
                            if (res.status == 0) {
                                if (!res.data) { // 不允许删除
                                    return this.$message({
                                        type: "error",
                                        message: res.msg
                                    });    
                                }
                            }
                        }
                        this.deleteTableData(rowData.paymentRateCode, rowData.entityDraftId);
                    }).catch((e) => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
            },
            // 删除表格数据-优先根据paymentRateCode删除，paymentRateCode不存在则根据草稿ID删除
            deleteTableData(paymentRateCode, entityDraftId) {
                let newTableData = [];
                if (paymentRateCode) {
                    this.model.rateDetailTableData.forEach(item => {
                        if (item.paymentRateCode == paymentRateCode) {
                            !this.deletePaymentRateCodes.includes(paymentRateCode) && this.deletePaymentRateCodes.push(paymentRateCode);
                        } else {
                            newTableData.push(item);
                        }
                    });
                    this.model['deletePaymentRateCodes'] = this.deletePaymentRateCodes.join(',');
                } else if (entityDraftId) { // 草稿ID
                    this.model.rateDetailTableData.forEach(item => {
                        if (item.entityDraftId != entityDraftId) {
                            newTableData.push(item);
                        }
                    });
                }
                this.model['rateDetailTableData'] = newTableData;
            },
            // 查询表格数据
            async selectTableData() {
                // 创建页面 && 表格无数据 不查接口
                if (this.operationType == 1 && this.model.rateDetailTableData.length == 0) return;
                let draftIds = [];
                this.model.rateDetailTableData.forEach(item => {
                    if (item.entityDraftId && !draftIds.includes(item.entityDraftId)) {
                        draftIds.push(item.entityDraftId);
                    }
                });
                let params = {
                    companyId: this.model.companyId,
                    productId: this.model.productId,
                    priceMultiplierSwitch: this.model.priceMultiplierSwitch,
                    priceMultiplierPolicyId: '',
                    strategyType: this.strategyType,
                    draftIds: draftIds.join(',')
                }
                // 开启浮动定价时传入浮动定价策略
                if (params.priceMultiplierSwitch === '1') {
                    params.priceMultiplierPolicyId = this.model.priceMultiplierPolicyId; 
                }
                this.loading = true;
                let res = await finbox.apify('/contract/api/refreshpaymentdraft').initApi(params);
                this.loading = false;
                if (res.status == 0) {
                    // 过滤已删除的数据
                    let newTableData = [];
                    if (this.deletePaymentRateCodes.length > 0) {
                        res.data.forEach(item => {
                            if (!this.deletePaymentRateCodes.includes(item.paymentInfo.paymentRateCode)) {
                                newTableData.push(item);
                            }
                        });
                    } else {
                        newTableData = res.data;
                    }
                    this.model['rateDetailTableData'] = this.formatTableData(newTableData);
                } else {
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        type: 'error',
                        message: res.msg
                    });
                }
            },
            // 是否开启浮动定价事件
            priceChange(val) {
                let policyId = this.model.priceMultiplierPolicyId;
                if (!policyId || policyId == 0) { // 浮动定价策略为空时，默认显示第一个
                    this.model['priceMultiplierPolicyId'] = this.strategys[0].value;
                }
                this.model['priceMultiplierSwitch'] = val;
                this.model['minAmountCharge'] = '';
                this.model['maxAmountCharge'] = '';
                this.selectTableData();
            },
            // 选择浮动定价策略
            policyChange(val) {
                this.model['priceMultiplierPolicyId'] = val;
                this.selectTableData();  
            },
            // 选择分期计划
            stageChange(val) {
                let formData = this.dialogFormData;
                this.irr = '';
                this.$refs.stageForm.clearValidate();
                if (val == 3) { // 前零后高
                    formData.firstPrincipalRate = '0.00';
                    formData.firstCustomerPaymentRate = '0.00';
                    formData.secondPrincipalRate = '100.00';
                } else if (this.opState == 2) { // 编辑
                    formData.firstPrincipalRate = this.curRow.firstPrincipalRate;
                    formData.firstCustomerPaymentRate = this.curRow.firstCustomerPaymentRate;
                    formData.secondCustomerPaymentRate = this.curRow.firstCustomerPaymentRate;
                    formData.secondPrincipalRate = (100 - formData.firstPrincipalRate).toFixed(2);
                } else { // 创建弹窗&等本等费，不需要重新赋值
                    formData.firstPrincipalRate = '';
                    formData.firstCustomerPaymentRate = '';
                    formData.secondCustomerPaymentRate = '';
                    formData.secondPrincipalRate = '';
                    formData.totalInstalmentNum = '';
                    formData.merchantInstalmentRate = '';
                }
            },
            // 第一批、第二批期数值改变事件
            instalmentChange() {
                let formData = this.dialogFormData;
                let firstNum = formData.firstInstalmentNum;
                let secondNum = formData.secondInstalmentNum;
                let sumNum = 0;
                if (firstNum) {
                    sumNum += parseInt(firstNum);
                }
                if (secondNum) {
                    sumNum += parseInt(secondNum);   
                }
                if (sumNum > 48) {
                    this.$message({
                        type: 'error',
                        message: '分期总数不能大于48'
                    });
                    formData.firstInstalmentNum = '';
                    formData.secondInstalmentNum = '';
                }
            },
            // 第一批本金比例
            firstPriceChange(val) {
                let formData = this.dialogFormData;
                let repaymentType = formData.repaymentType;
                if (repaymentType == 2 || repaymentType == 4) {
                    formData.secondPrincipalRate = (100 - formData.firstPrincipalRate).toFixed(2);
                }
            },
            // 第一批客户每期费率
            firstCRateChange(val) {
                let formData = this.dialogFormData;
                let repaymentType = formData.repaymentType;
                if (repaymentType == 2) {
                    formData.secondCustomerPaymentRate = formData.firstCustomerPaymentRate;
                }
            },
            // 费率使用行业选择事件
            async strTrainChange(checked, event) {
                let code = this.curRow.paymentRateCode;
                // 反选 && 有paymentRateCode
                if (!checked && code) {
                    let defValue = event.srcElement.defaultValue;
                    let params = {
                        paymentRateCode: code,
                        strTrain: defValue
                    }
                    this.trainChecked = false;
                    let res = await finbox.apify('/contract/api/deletepaymentratecheckbyratecode').initApi(params);
                    this.trainChecked = true;
                    if (res.status == 0) {
                        if (!res.data) { // 不允许反选
                            this.dialogFormData.strTrain.push(defValue);
                        }
                    }
                }
            },
            // 试算IRR
            calculateIRR() {
                if (this.isRequest) {
                    return;
                }
                this.$refs.stageForm.validate(async valid => {
                    if (valid) {
                        // 搜集表单数据
                        this.irr = '正在请求试算结果，请稍后';
                        this.isRequest = true;
                        let res = await finbox.apify('/contract/api/irrcalculate').initApi(this.getParamsByStage());
                        this.isRequest = false;
                        this.irr = `IRR ${res.data.irr}%`;
                    }
                });
            },
            // 弹窗确定,新建、编辑操作
            btnOk() {
                this.$refs.stageForm.validate(async valid => {
                    if (valid) {
                        let params = this.getParamsByStage();
                        params.entityDraftId = this.curRow.entityDraftId; // 草稿ID
                        if (this.opState == 1 || this.curRow.customerLevel == -1) { // 新建 || 编辑父节点
                            Object.assign(params.paymentInfo, {
                                priceMultiplierPolicyId: this.model.priceMultiplierPolicyId,
                                priceMultiplierSwitch: this.model.priceMultiplierSwitch,
                                paymentRateCode: this.curRow.paymentRateCode,
                                entityDraftId: this.curRow.entityDraftId // 草稿ID
                            });
                        } else {
                            Object.assign(params.subPaymentInfo, {
                                customerLevel: this.curRow.customerLevel,
                                paymentRateCode: this.curRow.paymentRateCode,
                                entityDraftId: this.curRow.entityDraftId // 草稿ID
                            });
                        }
                        try {
                            let res = await finbox.apify('/contract/api/paymentrateaddperiodinfo').initApi(params);
                            if (res.status === 0) {
                                this.$message({
                                    type: 'success',
                                    message: res.msg
                                });
                                this.dialogVisible = false;
                                let data = res.data.paymentInfo;
                                data.firstPrincipalRate = parseFloat(data.firstPrincipalRate).toFixed(2);
                                data.secondPrincipalRate = parseFloat(data.secondPrincipalRate).toFixed(2);
                                if (data.firstCustomerPaymentRate) {
                                    data.firstCustomerPaymentRate = parseFloat(data.firstCustomerPaymentRate).toFixed(2);    
                                }
                                if (data.secondCustomerPaymentRate) {
                                    data.secondCustomerPaymentRate = parseFloat(data.secondCustomerPaymentRate).toFixed(2);    
                                }
                                this.updateTableData(res.data);
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.msg
                                });
                            }    
                        } catch (e) {
                            console.error(e)
                            this.$message({
                                type: 'error',
                                message: e.statusText
                            });
                        }
                    }
                });
            },
            // 更新表格数据
            updateTableData(data) {
                let tableData = this.model.rateDetailTableData;
                if (this.opState == 2) { // 编辑需要先删除原始数据中等于(paymentRateCode||entityDraftId)对应的行数据
                    let newTableData = [];
                    for (let i = 0; i < tableData.length; i++) {
                        if (tableData[i].paymentRateCode != data.paymentInfo.paymentRateCode
                            && tableData[i].entityDraftId != data.entityDraftId) {
                            newTableData.push(tableData[i]);
                        }
                    }
                    tableData = newTableData;
                }
                this.model['rateDetailTableData'] = tableData.concat(this.formatTableData([data]));
            },
            // 格式化表格数据
            formatTableData(rateList) {
                let tableData = [];
                rateList.forEach(rate => {
                    let newRate = _.cloneDeep(rate);
                    let paymentInfo = newRate.paymentInfo;
                    let trainList = paymentInfo.trainList;
                    let industryName = [];
                    delete paymentInfo.subPaymentInfo;
                    // 行业
                    if (trainList) {
                        let trains = this.model.trains;
                        Object.keys(trainList).forEach(key => {
                            for (let i = 0; i < trains.length; i++) {
                                if (trains[i].value === key) {
                                    industryName.push(trains[i].label);
                                    break;      
                                }
                            }
                        });
                    }
                    paymentInfo.customerLevel = -1;
                    paymentInfo.customerLevelName = paymentInfo.customerLevel;
                    if (this.model.priceMultiplierSwitch == 1) { // 开启浮动定价
                        paymentInfo.customerLevelName = '基础定价';
                    } else {
                        paymentInfo.customerLevelName = '无';
                    }
                    paymentInfo.industryLabel = industryName.join(' ');
                    paymentInfo.strTrain = Object.keys(trainList); // 使用行业
                    paymentInfo.entityDraftId = rate.entityDraftId; // 草稿ID
                    // 还款类型
                    let repaymentTypes = this.model.repaymentTypes;
                    for (let i = 0; i < repaymentTypes.length; i++) {
                        if (repaymentTypes[i].value == paymentInfo.repaymentType) {
                            paymentInfo.repaymentTypeName = repaymentTypes[i].label;
                            break;
                        }
                    }
                    if (paymentInfo.irr_forbid_lower_limit || paymentInfo.irr_forbid_upper_limit || paymentInfo.irr_warning_lower_limit || paymentInfo.irr_warning_upper_limit) {
                        paymentInfo.IRRRed = true;
                    }
                    tableData.push(paymentInfo);
                    // 医美贷不显示子节点数据
                    if (this.model.productId !== 'YMD' && rate.paymentInfo.subPaymentInfo) {
                        let subKeys = Object.keys(rate.paymentInfo.subPaymentInfo);
                        if (subKeys.length > 0) {
                            subKeys.forEach(key => {
                                let subObj = rate.paymentInfo.subPaymentInfo[key];
                                subObj.customerLevelName = subObj.customerName ? subObj.customerName : subObj.customerLevel;
                                subObj.IRRRed = false;
                                if (subObj.irr_forbid_lower_limit || subObj.irr_forbid_upper_limit || subObj.irr_warning_lower_limit || subObj.irr_warning_upper_limit) {
                                    subObj.IRRRed = true;
                                }
                                tableData.push(_.assign({}, paymentInfo, subObj));
                            });
                        } 
                    }
                });
                this.saveDraftIds(tableData);
                return this.handlerBtnState(tableData);
            },
            // 处理按钮状态数据
            handlerBtnState(tableData) {
                let strategyList = this.strategyList;
                for (let i = 0; i < strategyList.length; i++) {
                    let item = strategyList[i];
                    tableData.forEach(rate => {
                        if (this.model.priceMultiplierSwitch === '0') { // 浮动定价未开启
                            rate.priceMultiplierPolicyName = '未开启';
                        } else {
                            if (rate.priceMultiplierPolicyId_old && rate.priceMultiplierPolicyId_old == item.priceMultiplierPolicyId) {
                                rate.priceMultiplierPolicyName_old = item.priceMultiplierPolicyName;
                            }
                            if (rate.priceMultiplierPolicyId && rate.priceMultiplierPolicyId == item.priceMultiplierPolicyId) {
                                rate.priceMultiplierPolicyName = item.priceMultiplierPolicyName;
                            }
                        }
                        // 判断行数据是否可编辑
                        if (rate.priceMultiplierPolicyId == item.priceMultiplierPolicyId) {
                            let keys = Object.keys(item.customerLists);
                            for (let j = 0; j < keys.length; j++) {
                                if (rate.customerLevel != -1 && rate.customerLevel == keys[j] && item.customerLists[keys[j]].floatType == 2) { //子节点
                                    rate.childEdit = true;
                                    break;
                                }
                            }
                        }
                    });
                }
                return tableData;
            },
            // 存储草稿ID
            saveDraftIds(tableData) {
                let ids = [];
                tableData.forEach(item => {
                    if (item.entityDraftId && !ids.includes(item.entityDraftId)) {
                        ids.push(item.entityDraftId);
                    }
                });
                this.model['updatePaymentRateIds'] = ids.join(',');
            },
            // 试算接口、新建分期、编辑分期公共的参数
            getParamsByStage(child) {
                let paymentInfo = {};
                Object.keys(this.dialogFormData).forEach(key => {
                    if (this.dialogFormData[key]) {
                        paymentInfo[key] = this.dialogFormData[key];
                    }
                });
                paymentInfo.strTrain = paymentInfo.strTrain.join(',');
                let params = {};
                let level = this.curRow.customerLevel;
                if (level && level != -1) { // 子节点
                    params.paymentInfo = this.curRow;
                    params.subPaymentInfo = paymentInfo;
                } else {
                    params.paymentInfo = paymentInfo;
                }
                params.companyId = this.model.companyId;
                return params;
            },
            // 清空弹窗数据
            clearDialogForm() {
                for (let key in this.dialogFormData) {
                    if (key == 'strTrain') {
                        this.dialogFormData.strTrain = [];
                    } else if (key != 'repaymentType') {
                        this.dialogFormData[key] = '';
                    }
                }
                this.$refs.stageForm && this.$refs.stageForm.resetFields();
            }
        }
    }
</script>
<style type="text/less" lang="less">
    .rate-table {
        .el-table {
            margin-top: 15px;    
        }
        .el-dialog__body {
            padding: 0px 20px !important;
        }
        .el-row {
            margin-bottom: 22px;
        }
        .del-old {
            color: #FF0000;
            text-decoration: line-through;
        }
        .jzd-delay {
            .el-form-item__label {
                width: 300px !important;
            }    
        }
    }
</style>