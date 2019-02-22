/**
 * @file applyMedical
 * @author ienix(guoaimin01@baidu.com)
 *
 * @since 2017/12/15
 */

/* eslint-disable */

export default {
    "$schema": "http://amis.baidu.com/schemas/page.json",
    title: '家装准入申请',
    name: 'admin-pages',
    // initApi: "/access/apply/infoforaudit?is_edit=$is_edit&company_id=$company_id&isApi=true",
    body: [
        {
            type: 'button',
            label: '取消',
            level: 'default',
            actionType: 'dialog',
            dialog: {
                title: "确认操作",
                body:{
                    type: 'form',
                    name: 'ui_dialog',
                    controls: [
                        {
                            type: 'static',
                            name: 'ui_dialog_content',
                            labelWidth: 300,
                            value: "是否确认返回列表，本次修改将不会保存?"
                        }
                    ],
                    actions: [
                        {
                            type: 'button',
                            level: 'success',
                            actionType: 'link',
                            link: '/pcrm/group/access/apply/listforaudit',
                            label: "确认"
                        },
                        {
                            actionType: 'cancel',
                            type: 'button',
                            level: 'info',
                            label: "取消"
                        }
                    ]
                }
            }
        },
        {
            type: 'submit',
            label: '提交审核',
            actionType: 'ajax',
            redirect: '/',
            api: '/access/reviewsubmit'
        },
        {
            type: 'submit',
            actionType: 'ajax',
            label: '保存',
            redirect: '/',
            messages: {
                success: '保存成功'
            },
            api: '/access/api/applysave'
        },
        {
            type: 'form',
            collapsable: true,
            mode: 'horizontal',
            fieldSet: [
                {
                    title: "机构基本信息",
                    type: 'form',
                    sheetName: 'JZD01',
                    labelWidth: '220',
                    controls: [
                        [
                            {
                                name: 'product_id',
                                type: "finbox-product-type",
                                label: "产品线",
                                remote: true,
                                source: "/access/api/commonmetainfo?productId=JZD&metaType=products_list"
                            },
                            {}
                        ],
                        [
                            {
                                name: 'apply_source',
                                type: 'select',
                                label: "申请来源",
                                remote: true,
                                disabled: true,
                                value: '4',
                                source: "/access/api/commonmetainfo?productId=JZD&metaType=apply_source"
                            },
                            {
                                name: 'company_register_name',
                                label: "公司注册名称",
                                validations: {
                                    required: true,
                                    message: "请填写公司注册名称",
                                    trigger: 'blur'
                                },
                                placeholder: "必填",
                                disabled: false,
                                type: 'text'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                label: "企业营业执照副本",
                                name: 'business_license_copy_file',
                                maxSize: 1048576,
                                desc: "支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件"
                            }
                        ],
                        [
                            {
                                name: 'credentials_due_date_select',
                                type: 'select',
                                label: '证照到期日',
                                value: 1,
                                options: [
                                    {
                                        label: '有期限',
                                        value: 1
                                    },
                                    {
                                        label: '无期限',
                                        value: 0
                                    }
                                ]
                            },
                            {
                                name: 'credentials_due_date',
                                label: '证照到期日',
                                visibleOn: 'credentials_due_date_select === 1',
                                type: 'date',
                                valueFormat: 'yyyy-MM-dd'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                label: "建筑装饰装修工程资质",
                                name: 'constructione_qual',
                                maxSize: 1048576,
                                desc: "支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件"
                            }
                        ],
                        [
                            {
                                type: 'text',
                                name: 'organ_number',
                                label: "资质文件编号",
                                placeholder: "非必填"
                            },
                            {
                                type: 'text',
                                name: 'social_credit_code',
                                label: "注册号/统一社会信用代码",
                                validations: {
                                    required: true,
                                    message: "请填写注册号",
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                type: "select",
                                label: "机构类别",
                                inline: true,
                                name: 'train_type_level_one',
                                clearable: false,
                                source: "/access/api/commonmetainfo?productId=JZD&metaType=train_type_level_one"
                            },

                            {
                                type: 'cascader',
                                className: "col-lg-6",
                                label: "机构所在城市",
                                inline: true,
                                name: 'province_city',
                                clearable: false,
                                source: "/access/api/commonmetainfo?productId=JZD&metaType=province_city"
                            }
                        ],
                        [
                            {
                                type: 'text',
                                name: 'detail_address',
                                label: "详细地址",
                                maxSize: 18,
                                validations: {
                                    required: true,
                                    message: "请填写详细地址",
                                    trigger: 'blur'
                                },
                                placeholder: "必填"

                            },
                            {
                                name: 'register_date',
                                label: "成立日期",
                                disabled: false,
                                placeholder: "必填",
                                type: 'date',
                                validations: {
                                    required: true,
                                    trigger: 'blur',
                                    message: "请填写成立日期"
                                }
                            }
                        ],
                        [
                            {
                                type: 'text',
                                name: 'register_capitial',
                                label: "注册资本(万元)",
                                validations: {
                                    required: true,
                                    message: "请填写正确注册资本",
                                    trigger: 'blur',
                                    pattern: /^\d+$/
                                },
                                placeholder: "必填"
                            },
                            {
                                name: 'owner_name',
                                label: "法人代表姓名",
                                validations: {
                                    required: true,
                                    message: "请填写法人代表姓名",
                                    trigger: 'blur'
                                },
                                disabled: false,
                                type: 'text',
                                placeholder: "必填"
                            }
                        ],
                        [
                            {
                                name: 'owner_identity_code',
                                label: "法人代表身份证",
                                validations: {
                                    required: true,
                                    message: "请填写法人代表身份证",
                                    trigger: 'blur',
                                    pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

                                },
                                type: 'text',
                                placeholder: "必填"
                            },
                            {}
                        ],
                        [
                            {
                                name: 'owner_identity_due_date_select',
                                type: 'select',
                                label: '法人代表身份证到期时间',
                                value: 1,
                                options: [
                                    {
                                        label: '有期限',
                                        value: 1
                                    },
                                    {
                                        label: '无期限',
                                        value: 0
                                    }
                                ]
                            },
                            {
                                name: 'owner_identity_due_date',
                                label: '证照到期日',
                                visibleOn: 'owner_identity_due_date_select === 1',
                                placeholder: '',
                                type: 'date',
                                valueFormat: 'yyyy-MM-dd'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                label: "法人代表身份证照片正面",
                                name: 'owner_identity_positive',
                                maxSize: 1048576,
                                desc: "支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件"
                            }
                        ],
                        [
                            {
                                type: 'file',
                                label: "法人代表身份证照片反面",
                                name: 'owner_identity_other_side',
                                maxSize: 1048576,
                                desc: "支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件"
                            }
                        ],
                        [
                            {
                                name: 'contact_name',
                                label: "机构联系人姓名",
                                type: 'text',
                                validations: {
                                    required: false,
                                    message: '344444',
                                    trigger: 'blur'
                                },
                                placeholder: "非必填"
                            },
                            {
                                name: 'contact_phone',
                                label: "机构联系人手机号",
                                type: 'text',
                                placeholder: "非必填",
                                validations: {
                                    message: "请填写正确手机号",
                                    trigger: 'blur',
                                    pattern: /^1(3[0-9]|4[57]|5[0-35-9]|7[013678]|8[0-9])\d{8}$/
                                }
                            }
                        ],
                        [
                            {
                                name: 'customer_service_phone',
                                label: "机构客服电话",
                                type: 'text',
                                placeholder: "非必填"
                            },
                            {
                                name: 'company_telephone',
                                label: "公司电话(座机)",
                                validations: {
                                    required: true,
                                    message: "请填写正确电话号",
                                    trigger: 'blur',
                                    pattern: /^\d[\d|-]{0,18}\d$/
                                },
                                type: 'text',
                                placeholder: "必填"
                            }
                        ],
                        [
                            {
                                name: 'business_scope',
                                label: "经营范围",
                                validations: {
                                    required: true,
                                    message: "请填写经营范围",
                                    trigger: 'blur'
                                },
                                type: 'text',
                                placeholder: "必填"
                            },
                            {
                                name: 'business_cover_city',
                                label: "业务覆盖城市",
                                validations: {
                                    required: true,
                                    message: "请填写业务覆盖城市",
                                    trigger: 'blur'
                                },
                                type: 'text',
                                placeholder: "必填"
                            }
                        ],
                        [
                            {
                                name: 'company_name',
                                label: "官网名称",
                                validations: {
                                    required: true,
                                    message: "请填写官网名称",
                                    trigger: 'blur'
                                },
                                type: 'text',
                                placeholder: "必填"
                            },
                            {
                                name: 'company_url',
                                label: "官网url",
                                validations: {
                                    required: true,
                                    message: "请填写官网url",
                                    trigger: 'blur',
                                    pattern: /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i
                                },
                                type: 'text',
                                placeholder: "必填"
                            }
                        ]
                    ]
                },
                {
                    title: "机构规模信息",
                    type: 'form',
                    sheetName: 'JZD02',
                    labelWidth: '220',
                    controls: [
                        [
                            {
                                name: 'designer_num',
                                label: "公司配备专业设计师数量",
                                type: 'text',
                                placeholder: "非必填"
                            },
                            {
                                name: 'physical_store_num',
                                label: "实体店数量（家）",
                                validations: {
                                    required: true,
                                    message: "请填写实体店数量",
                                    trigger: 'blur'
                                },
                                type: 'text',
                                placeholder: "必填"
                            }
                        ],
                        [
                            {
                                name: 'last_year_income',
                                type: "select",
                                label: "过去1年营收(万元)",
                                remote: true,
                                source: "/access/api/commonmetainfo?productId=JZD&metaType=last_year_income"
                            },
                            {
                                name: 'last_year_income_growth_rate',
                                label: "近一年营业收入增长率（%）",
                                placeholder: "两位小数",
                                type: 'text',
                                validations: {
                                    message: "请填写信贷合作机构",
                                    trigger: 'blur',
                                    pattern: "^\\d+[.]\\d{1,2}$|^\\d+$"
                                },
                            }
                        ],
                        [
                            {
                                name: 'current_year_income_target',
                                label: "今年营业收入目标（万元）",
                                placeholder: "非必填",
                                type: 'text'
                            },
                            {}
                        ]
                    ]
                },
                {
                    title: "竞品合作信息",
                    type: 'form',
                    sheetName: 'JZD03',
                    labelWidth: '220',
                    controls: [
                        [
                            {
                                name: 'cooperate_institution_name',
                                label: "主要信贷合作机构名称",
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: "请填写信贷合作机构",
                                    trigger: 'blur'
                                },
                                placeholder: "必填"
                            },
                            {
                                name: 'cooperate_start_time_memedai',
                                label: "合作开始时间",
                                type: 'date',
                                validations: {
                                    required: true,
                                    message: "请填写合作开始时间",
                                    trigger: 'blur'
                                },
                                placeholder: "必填"
                            }
                        ],
                        [
                            {
                                name: 'last_year_loan_amount_memedai',
                                label: "近1年贷款规模（万元）",
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: "请填写近1年的贷款规模",
                                    trigger: 'blur'
                                },
                                placeholder: "必填"
                            },
                            {
                                name: 'last_month_loan_amount_memedai',
                                label: "近1月贷款规模（万元）",
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: "请填写近1月贷款规模",
                                    trigger: 'blur'
                                },
                                placeholder: "必填"
                            }
                        ],
                        [
                            {
                                name: 'avg_loan_amount_memedai',
                                label: "消费者平均信贷额（元）",
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: "请填写消费者平均信贷额",
                                    trigger: 'blur'
                                },
                                placeholder: "必填"
                            },
                            {
                                name: 'stage_number_memedai',
                                label: "分期期数",
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: "请填写分期期数",
                                    trigger: 'blur'
                                },
                                placeholder: "必填"
                            }
                        ],
                        [
                            {
                                name: 'repayment_way_memedai',
                                label: "还款方式",
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: "请填写还款方式",
                                    trigger: 'blur'
                                },
                                placeholder: "必填"
                            },
                            {
                                name: 'institutions_bear_rate_memedai',
                                label: "机构承担费率",
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: "请填写机构承担费率",
                                    trigger: 'blur'
                                },
                                placeholder: "必填"
                            }
                        ],
                        [
                            {
                                name: 'cooperative_institutional_lending_rate',
                                label: "合作贷款机构贷款费率（%/月）",
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: "请填写合作贷款机构贷款费率",
                                    trigger: 'blur'
                                },
                                placeholder: "必填"
                            },
                            {}
                        ]
                    ]
                },
                {
                    title: "行业个性化信息-家装",
                    type: 'form',
                    sheetName: 'JZD04',
                    labelWidth: '220',
                    controls: [
                        [
                            {
                                name: 'qualification_name',
                                label: "建筑装饰装修工程资质名称",
                                type: 'text',
                                placeholder: "非必填"

                            },
                            {
                                name: 'document_number',
                                label: "建筑装饰装修工程资质证书编号",
                                type: 'text',
                                placeholder: "非必填"
                            }
                        ],
                        [
                            {
                                name: 'issuing_authority',
                                label: "建筑装饰装修工程资质证书发证机关",
                                placeholder: "非必填",
                                type: 'text'
                            },
                            {
                                name: 'fit_project_avg_day',
                                label: "装修平均工期（天）",
                                type: 'text',
                                placeholder: "非必填",
                            }
                        ],
                        [
                            {
                                name: 'fit_project_avg_price',
                                label: "装修价格（套餐：元/平米）",
                                validations: {
                                    required: true,
                                    message: "请填写装修价格",
                                    trigger: 'blur'
                                },
                                type: 'text',
                                placeholder: "必填"
                            },
                            {
                                name: 'fit_project_content',
                                label: "装修内容",
                                multiple: true,
                                type: 'select',
                                remote: true,
                                source: "/access/api/commonmetainfo?productId=JZD&metaType=fit_project_content"
                            }
                        ],
                        [
                            {
                                name: 'defects_liability_period',
                                label: "装修工程保修期（年）",
                                type: 'text',
                                placeholder: "非必填"
                            },
                            {
                                name: 'delay_compensation',
                                label: "工期延时赔付",
                                type: 'switch'
                            },
                        ],
                        [
                            {
                                name: 'construction_team_own',
                                label: "施工队自有",
                                type: 'switch'
                            },
                            {
                                name: 'third_party_supervision',
                                label: "第三方监理",
                                type: 'switch'
                            }
                        ],
                        [
                            {
                                name: 'node_payment',
                                label: "按节点付款",
                                type: 'switch'
                            },
                            {
                                name: 'merchant_entry_criteria',
                                label: "平台内装修公司、商户入驻标准",
                                type: 'text',
                                placeholder: "非必填"
                            }
                        ],
                        [
                            {
                                name: 'merchant_monitoring',
                                label: "平台内施工、商品交易监控（有、无、不适用)",
                                placeholder: "非必填",
                                type: 'text'
                            },
                            {
                                name: 'promised_payment',
                                label: "承诺先行赔付（是、否、不适用）",
                                placeholder: "非必填",
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'payment_business_license',
                                label: "支付业务许可证（有、无、不适用）",
                                placeholder: "非必填",
                                type: 'text'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                label: "装修合同模板",
                                name: 'fit_contract_module',
                                maxSize: 1048576,
                                desc: "支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件"
                            }
                        ]
                    ]
                },
                {
                    title: "实地考察信息",
                    type: 'form',
                    sheetName: 'JZD05',
                    labelWidth: '220',
                    controls: [
                        [
                            {
                                name: 'office_space',
                                label: "办公场所",
                                type: 'select',
                                remote: true,
                                source: "/access/api/commonmetainfo?productId=JZD&metaType=office_space"
                            },
                            {
                                name: 'address_1',
                                label: "实体店1地址",
                                type: 'text',
                                placeholder: "非必填"
                            }
                        ],
                        [
                            {
                                name: 'principal_1',
                                label: "实体店1负责人",
                                placeholder: "非必填",
                                type: 'text'
                            },
                            {
                                name: 'principal_phone_1',
                                label: "实体店1负责人联系方式",
                                placeholder: "非必填",
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'address_2',
                                label: "实体店2地址",
                                placeholder: "非必填",
                                type: 'text'
                            },
                            {
                                name: 'principal_2',
                                label: "实体店2负责人",
                                placeholder: "非必填",
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'principal_phone_2',
                                label: "实体店2负责人联系方式",
                                placeholder: "非必填",
                                type: 'text'
                            },
                            {
                                name: 'space_is_work',
                                label: "办公场所是否正常办公",
                                type: 'switch'
                            }
                        ],
                        [
                            {
                                name: 'is_fixed_office',
                                label: "实体店是否正常营业",
                                type: 'switch'
                            }
                        ],
                        [
                            {
                                name: 'local_check4',
                                type: 'textarea',
                                placeholder: "考察情况描述：机构是否受到过自工商、质检、税务、海关、银行、证监会、协会等监管部门的处罚信息？近期是否发生过重大品牌声誉风险、重大纠纷、批量门店关停事件；"
                            }
                        ],
                        [
                            {
                                name: 'legitimate_decoration',
                                label: "自营的家装业务，装修施工现场是否规范（施工按工期计划进行，有建材进场、施工节点验收，施工工序标准化）",
                                type: 'switch'
                            },
                            {
                                name: 'negative_news',
                                label: "公司是否有较多来自客户、供应商、社会公众的负面评价信息",
                                type: 'switch'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                label: "营业场所照片（BD与logo合影）",
                                name: 'place_of_business_pic',
                                maxSize: 1048576,
                                desc: "支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件"
                            }
                        ],
                        [
                            {
                                type: 'file',
                                label: "BD+主材区/样板间/板材区照片",
                                name: 'model_houses_pic',
                                maxSize: 1048576,
                                desc: "支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件"
                            }
                        ],
                        [
                            {
                                type: 'file',
                                label: "BD+办公区域照片",
                                name: 'area_office_space_pic',
                                maxSize: 1048576,
                                desc: "支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件"
                            }
                        ],
                        [
                            {
                                type: 'file',
                                label: "门店租赁合同上传",
                                name: 'other_pic',
                                maxSize: 1048576,
                                desc: "支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件"
                            }
                        ],
                        [
                            {
                                type: 'file',
                                label: "门店情况填写表格，机构套餐上传，近一个月内真实用户装修合同、报价单、设计图",
                                name: 'decoration_contract',
                                maxSize: 1048576,
                                desc: "支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件"
                            }
                        ]
                    ]
                },
                {
                    title: "备注",
                    type: 'form',
                    sheetName: 'JZD06',
                    labelWidth: '220',
                    controls: [
                        [
                            {
                                name: 'remarks',
                                placeholder: "请填写门店数量及门店总面积；",
                                type: 'textarea'
                            }
                        ]
                    ]
                }
            ]
        },
        {
            type: 'button',
            label: '取消',
            level: 'default',
            actionType: 'dialog',
            dialog: {
                title: "确认操作",
                body:{
                    type: 'form',
                    name: 'ui_dialog',
                    controls: [
                        {
                            type: 'static',
                            name: 'ui_dialog_content',
                            labelWidth: 300,
                            value: "是否确认返回列表，本次修改将不会保存?"
                        }
                    ],
                    actions: [
                        {
                            type: 'button',
                            level: 'success',
                            actionType: 'link',
                            link: '/pcrm/group/access/apply/listforaudit',
                            label: "确认"
                        },
                        {
                            actionType: 'cancel',
                            type: 'button',
                            level: 'info',
                            label: "取消"
                        }
                    ]
                }
            }
        },
        {
            type: 'submit',
            label: '提交审核',
            actionType: 'ajax',
            redirect: '/',
            api: '/access/reviewsubmit'
        },
        {
            type: 'submit',
            actionType: 'ajax',
            label: '保存',
            redirect: '/',
            messages: {
                success: '保存成功'
            },
            api: '/access/api/applysave'
        }
    ]
}

/* eslint-enable */