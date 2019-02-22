<template>
    <div>
        <el-button :schema="schema"
            :disabled="this.list.length === 0"
            @click="showDialog">
            <b style="font-weight: bold; color: red">共{{ length }}单 总计{{ total }}元</b>
        </el-button>
        <el-dialog title="待合并单据"
                   :visible.sync="showAlert"
                   width="80%">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content bg-purple">收款单号：提交后生成</div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">待合并单据总额：{{ total }}(元)</div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-button  @click="clear"
                                    size="small"
                                    type="primary">
                            清空待合并单据
                        </el-button>
                    </div>
                </el-col>
            </el-row>
            <el-table :data="list"
                      stripe>
                <el-table-column label="收款编号" prop="account_no"></el-table-column>
                <el-table-column label="网银流水" prop="serial_number"></el-table-column>
                <el-table-column property="address" label="付款方名称" prop="payer_name"></el-table-column>
                <el-table-column property="address" label="摘要" prop="remark"></el-table-column>
                <el-table-column property="address" label="单据金额元" prop="bill_money"></el-table-column>
                <el-table-column property="address" label="操作" prop="name">
                    <template slot-scope="scope">
                        <el-button size="mini"
                                   @click="removeData(scope.$index)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showAlert = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import finbox from 'finbox';
    import Cart from '../../static/js/cart';

    let cart;

    export default {
        data() {
           return {
               length: 0,
               total: 0,
               showAlert: false,
               list: []
           }
        },
        created() {
            let option = {
                deep: true
            };

            this.$watch('model.amisPages.login_ucid', key => {
                cart = new Cart(key, this);
            }, option);
            this.$watch('model.customCart', ({total, length, list, show}) => {
                // this.$set(this.$data, 'total', total);
                // this.$set(this.$data, 'length', length);
                // this.$set(this.$data, 'list', list);
                // this.$set(this.$data, 'show', show);
                this.total = total;
                this.length = length;
                this.list = list;
                this.show = show;
            }, option);
        },
        methods: {
            showDialog() {
                this.showAlert = true;
            },
            removeData(index) {
                this.removeByIndex(index);
                cart.store(this.list);
                this.showMessage('删除成功');
            },
            clear() {
                this.list = [];
                cart.store(this.list);
                this.showMessage('清空成功');
            },
            showMessage(message, type = 'success') {
                this.$message({
                    type,
                    message
                });
            },
            removeByIndex(index) {
                this.list.splice(index, 1);
            },
            submit() {
                let data = this.list.map(item => item.account_no);

                if (data.length <= 1) {
                    if (!data.length) {
                        this.showMessage('请选择需要合单的单据', 'error');
                    } else {
                        this.showMessage('合单单据至少两条', 'error');
                    }
                    return;
                }

                finbox.apify('/account/api/mergeaccount').initApi({arr_account_no: data})
                    .then(response => {
                        cart.store([]);
                        this.showMessage('合单操作成功');
                        this.showAlert = false;
                        document.querySelector('.action-style').querySelector('button').click();
//                        location.reload();
                    })
                    .catch(() => this.showMessage('合单操作失败', 'error'));
            }
        }
    }
</script>
