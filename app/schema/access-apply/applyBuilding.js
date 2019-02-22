/**
 * @file applyBuilding
 * @author ienix(guoaimin01@baidu.com)
 *
 * @since 2017/12/18
 */

/* eslint-disable */

export default
{
    '$schema': 'http://amis.baidu.com/schemas/page.json',
    title: '建材准入申请',
    name: 'admin-pages',
    // initApi: '/access/apply/infoforaudit?is_edit=$is_edit&company_id=$company_id&isApi=true',
    body: [
        {
            type: 'button',
            label: '取消',
            level: 'default',
            actionType: 'dialog',
            dialog: {
                title: '确认操作',
                body:{
                    type: 'form',
                    name: 'ui_dialog',
                    controls: [
                        {
                            type: 'static',
                            name: 'ui_dialog_content',
                            labelWidth: 300,
                            value: '是否确认返回列表，本次修改将不会保存?'
                        }
                    ],
                    actions: [
                        {
                            type: 'button',
                            level: 'success',
                            actionType: 'link',
                            link: '/pcrm/group/access/apply/listforaudit',
                            label: '确认'
                        },
                        {
                            actionType: 'cancel',
                            type: 'button',
                            level: 'info',
                            label: '取消'
                        }
                    ]
                }
            }
        },
        {
            type: 'submit',
            label: '提交审核',
            actionType: 'ajax',
            redirect: '/pcrm/group/access/apply/addforaudit?product_id=JCD',
            api: '/access/reviewsubmit'
        },
        {
            type: 'submit',
            actionType: 'ajax',
            label: '保存',
            redirect: '/pcrm/group/access/apply/addforaudit?product_id=JCD',
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
                    title: '机构基本信息',
                    sheetName: 'JCD01',
                    labelWidth: '220',
                    controls: [
                        [
                            {
                                name: 'product_id',
                                type: 'finbox-product-type',
                                label: '产品线',
                                source: '/access/api/commonmetainfo?productId=JCD&metaType=products_list'
                            },
                            {
                                name: 'brand_name',
                                label: '机构品牌',
                                validations: {
                                    required: true,
                                    message: '请输入',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'apply_source',
                                type: 'select',
                                label: '申请来源',
                                disabled: true,
                                value: '4',
                                source: '/access/api/commonmetainfo?productId=JCD&metaType=apply_source'
                            },
                            {
                                name: 'agent_brand_name',
                                label: '机构所代理的品牌',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                disabled: false,
                                type: 'text'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '品牌资质证明（商标注册证/品牌授权书）',
                                name: 'brand_quality_prove',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传5个文件'
                            }
                        ],
                        [
                            {
                                name: 'company_register_name',
                                label: '公司注册名称',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '企业营业执照副本',
                                name: 'business_license_copy_file',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传5个文件'
                            }
                        ],
                        [
                            {
                                name: 'company_type',
                                label: '机构类型',
                                source: '/access/api/commonmetainfo?productId=JCD&metaType=company_type',
                                type: 'select'
                            }
                        ],

                        [
                            {
                                name: 'credentials_due_date_select',
                                type: 'select',
                                label: '证照到期日',
                                value: 0,
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
                                type: 'text',
                                name: 'organ_number',
                                label: '资质文件编号',
                            },
                            {
                                type: 'text',
                                name: 'social_credit_code',
                                label: '注册号/统一社会信用代码',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                type: 'cascader',
                                label: '机构所在城市:',
                                inline: true,
                                name: 'province_city',
                                source: '/access/api/commonmetainfo?productId=JCD&metaType=products_list'
                            },
                            {
                                type: 'text',
                                name: 'detail_address',
                                label: '详细地址',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                name: 'register_date',
                                label: '成立日期',
                                disabled: false,
                                type: 'date',
                                valueFormat: 'yyyy-MM-dd',
                                validations: {
                                    message: '请填写正确的日期',
                                    pattern: /^\d{4}-\d{1,2}-\d{1,2}$/
                                }
                            },
                            {
                                type: 'text',
                                name: 'register_capitial',
                                label: '注册资本(万元)',
                                validations: {
                                    required: true,
                                    message: '请填写正确的资本',
                                    trigger: 'blur',
                                    pattern: /^\d+$/
                                }
                            }
                        ],
                        [
                            {
                                name: 'owner_name',
                                label: '法人代表姓名',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text',

                            },
                            {
                                name: 'owner_identity_code',
                                label: '法人代表身份证',
                                validations: {
                                    required: true,
                                    message: '请填写正确的身份证',
                                    trigger: 'blur',
                                    pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                                },
                                disabled: false,
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'owner_identity_due_date_select',
                                type: 'select',
                                label: '法人代表身份证到期时间',
                                value: 0,
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
                                value: false,
                                visibleOn: 'owner_identity_due_date_select === 1',
                                placeholder: '',
                                type: 'date',
                                valueFormat: 'yyyy-MM-dd'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '法人代表身份证照片正面',
                                name: 'owner_identity_positive',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传5个文件'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '法人代表身份证照片反面',
                                name: 'owner_identity_other_side',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传5个文件'
                            }
                        ],
                        [
                            {
                                name: 'contact_name',
                                label: '机构联系人姓名',

                                validations: {
                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            },
                            {
                                name: 'contact_phone',
                                label: '机构联系人手机号',
                                validations: {
                                    message: '请填写正确的手机号',
                                    trigger: 'blur',
                                    pattern: /^1(3[0-9]|4[57]|5[0-35-9]|7[013678]|8[0-9])\d{8}$/
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'customer_service_phone',
                                label: '机构客服电话',

                                validations: {
                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            },
                            {
                                name: 'company_telephone',
                                label: '公司电话(座机)',

                                validations: {
                                    required: true,
                                    message: '请填写正确的座机号',
                                    trigger: 'blur',
                                    pattern: /^\d[\d|-]{0,18}\d$/
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'business_scope',
                                label: '经营范围',

                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            },
                            {
                                name: 'business_cover_city',
                                label: '业务覆盖城市',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'company_url',
                                label: '官网url',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur',
                                    pattern: /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i
                                },
                                type: 'text'
                            }
                        ]
                    ]
                },
                {
                    title: '机构规模信息',
                    type: 'form',
                    sheetName: 'JCD02',
                    labelWidth: '220',
                    controls: [
                        [
                            {
                                name: 'physical_store_num',
                                label: '实体店数量（家）',

                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            },
                            {
                                name: 'last_year_income',
                                label: '过去1年营收(万元)装修内容',
                                remote: true,
                                source: '/access/api/commonmetainfo?productId=JCD&metaType=last_year_income',
                                type: 'select'
                            }
                        ],
                        [
                            {
                                name: 'last_year_income_growth_rate',
                                label: '近一年营业收入增长率（%）',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            },
                            {
                                name: 'current_year_income_target',
                                label: '今年营业收入目标（万元）',
                                placeholder: '两位小数',
                                validations: {
                                    required: true,
                                    message: '请填写正确的收入',
                                    trigger: 'blur',
                                    pattern: /^\d+[.]\d{1,2}$|^\d+$/
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'expected_cooperation_num',
                                label: '合作后预计出单数量',

                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            },
                            {
                                name: 'expected_cooperation_amount',
                                label: '合作后预计出单金额',

                                placeholder: '两位小数',
                                validations: {
                                    required: true,
                                    message: '请填写正确的金额',
                                    trigger: 'blur',
                                    pattern: /^\d+[.]\d{1,2}$|^\d+$/
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'avg_price',
                                label: '平均客单价',

                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            },
                            {
                                name: 'package_price',
                                label: '是否包含套餐，套餐价格',
                                placeholder: '两位小数',
                                validations: {
                                    required: true,
                                    message: '请填写正确的金额',
                                    trigger: 'blur',
                                    pattern: /^\d+[.]\d{1,2}$|^\d+$/
                                },
                                type: 'text'
                            }
                        ]
                    ]
                },
                {
                    title: '竞品合作信息',
                    type: 'form',
                    sheetName: 'JCD03',
                    labelWidth: '220',
                    controls: [
                        [
                            {
                                name: 'cooperate_institution_name',
                                label: '主要信贷合作机构名称',
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            },
                            {
                                name: 'cooperate_start_time_memedai',
                                label: '合作开始时间',
                                type: 'date',
                                valueFormat: 'yyyy-MM-dd',
                                validations: {
                                    message: '请填写正确的时间',
                                    required: true
                                }
                            }
                        ],
                        [
                            {
                                name: 'last_year_loan_amount_memedai',
                                label: '近1年贷款规模（万元）',
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            },
                            {
                                name: 'last_month_loan_amount_memedai',
                                label: '近1月贷款规模（万元）',
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                name: 'avg_loan_amount_memedai',
                                label: '消费者平均信贷额（元）',
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            },
                            {
                                name: 'stage_number_memedai',
                                label: '分期期数',
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                name: 'repayment_way_memedai',
                                label: '还款方式',
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            },
                            {
                                name: 'consumer_rate_memedai',
                                label: '消费者费率',
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                name: 'institutions_bear_rate_memedai',
                                label: '机构承担费率',
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            },
                            {
                                name: 'cooperative_institutional_lending_rate',
                                label: '合作贷款机构贷款费率（%/月）',
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            }
                        ]
                    ]
                },
                {
                    title: '行业个性化信息-建材',
                    type: 'form',
                    sheetName: 'JCD04',
                    labelWidth: '220',
                    controls: [
                        [
                            {
                                name: 'is_need_caution_money',
                                label: '是否向上级机构缴纳保证金',
                                type: 'switch'
                            },
                            {
                                name: 'client_payment_method',
                                label: '与客户结算方式',
                                source: '/access/api/commonmetainfo?productId=JCD&metaType=client_payment_method',
                                type: 'select'
                            }
                        ],
                        [
                            {
                                name: 'brand_agent_type',
                                label: '品牌经销／品牌代理资质类型',
                                source: '/access/api/commonmetainfo?productId=JCD&metaType=brand_agent_type',
                                type: 'select'
                            },
                            {
                                name: 'delivery_period',
                                label: '送货期限（天）',
                                validations: {
                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'uarantee_period',
                                label: '产品保修期（年）',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            },
                            {
                                name: 'logistics',
                                label: '产品配送物流',
                                source: '/access/api/commonmetainfo?productId=JCD&metaType=logistics',
                                type: 'select'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '销售场所租赁合同',
                                name: 'lease_contract',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传5个文件',
                                /*
                                 validations: {
                                 required: true,
                                 message: '请上传',
                                 trigger: 'blur'
                                 },*/
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '销售合同／凭证样本',
                                name: 'sales_contract',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传5个文件',
                                /*validations: {
                                 required: true,
                                 message: '请上传',
                                 trigger: 'blur'
                                 }*/
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '生产许可证（若为生产厂商类型需提供）',
                                name: 'production_license',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传5个文件',

                                /*validations: {
                                 required: true,
                                 message: '请上传',
                                 trigger: 'blur'
                                 }*/
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '商标注册证（若为生产厂商类型需提供）',
                                name: 'trade_mark_paper',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传5个文件',

                                /*validations: {
                                 required: true,
                                 message: '请上传',
                                 trigger: 'blur'
                                 },*/
                            }
                        ]
                    ]
                },
                {
                    title: '实地考察信息',
                    type: 'form',
                    sheetName: 'JCD05',
                    labelWidth: '220',
                    controls: [
                        [
                            {
                                name: 'office_space',
                                label: '办公场所',
                                source: '/access/api/commonmetainfo?productId=JCD&metaType=office_space',
                                type: 'select'
                            },
                            {
                                name: 'address_1',
                                label: '实体店1地址',

                                validations: {

                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'principal_1',
                                label: '实体店1负责人',

                                validations: {

                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            },
                            {
                                name: 'principal_phone_1',
                                label: '实体店1负责人联系方式',

                                validations: {

                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'address_2',
                                label: '实体店2地址',

                                validations: {

                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            },
                            {
                                name: 'principal_2',
                                label: '实体店2负责人',
                                validations: {

                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'principal_phone_2',
                                label: '实体店2负责人联系方式',
                                validations: {

                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            },
                            {
                                name: 'space_is_work',
                                label: '办公场所是否正常办公',
                                type: 'switch'
                            }
                        ],
                        [
                            {
                                name: 'is_fixed_office',
                                label: '实体店是否正常营业',
                                type: 'switch'
                            }
                        ],
                        [
                            {
                                type: 'textarea',
                                name: 'local_check4',
                                placeholder: '考察情况描述：机构是否受到过自工商、质检、税务、海关、银行、证监会、协会等监管部门的处罚信息？近期是否发生过重大品牌声誉风险、重大纠纷、批量门店关停事件；'
                            }
                        ],
                        [
                            {
                                name: 'negative_news',
                                label: '公司是否有较多来自客户、供应商、社会公众的负面评价信息',

                                validations: {

                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            },
                            {
                                name: 'company_number',
                                label: '公司管理层有多长时间的建材行业从业经验，企业员工数量',

                                validations: {

                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'logistics_complete',
                                label: '公司物流系统是否完善，能否支持实时查询产品物流信息',
                                validations: {

                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            },
                            {
                                name: 'repertory_complete',
                                label: '公司库存系统是否完善，能否支持实时查询产品库存信息',

                                validations: {

                                    message: '请填写',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '营业场所照片（BD与logo合影）',
                                name: 'place_of_business_pic',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传5个文件'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: 'BD+主材区/样板间/板材区照片',
                                name: 'model_houses_pic',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传5个文件'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: 'BD+办公区域照片',
                                name: 'area_office_space_pic',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传5个文件'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '其他照片',
                                name: 'other_pic',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传5个文件'
                            }
                        ]
                    ]
                },
                {
                    title: '备注',
                    type: 'form',
                    sheetName: 'JCD06',
                    labelWidth: '220',
                    controls: [
                        [
                            {
                                name: 'remarks',
                                placeholder: '请填写门店数量及门店总面积；',
                                type: 'textarea',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
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
                title: '确认操作',
                body:{
                    type: 'form',
                    name: 'ui_dialog',
                    controls: [
                        {
                            type: 'static',
                            name: 'ui_dialog_content',
                            labelWidth: 300,
                            value: '是否确认返回列表，本次修改将不会保存?'
                        }
                    ],
                    actions: [
                        {
                            type: 'button',
                            level: 'success',
                            actionType: 'link',
                            link: '/pcrm/group/access/apply/listforaudit',
                            label: '确认'
                        },
                        {
                            actionType: 'cancel',
                            type: 'button',
                            level: 'info',
                            label: '取消'
                        }
                    ]
                }
            }
        },
        {
            type: 'submit',
            label: '提交审核',
            actionType: 'ajax',
            redirect: '/pcrm/group/access/apply/addforaudit?product_id=JCD',
            api: '/access/reviewsubmit'
        },
        {
            type: 'submit',
            actionType: 'ajax',
            label: '保存',
            redirect: '/pcrm/group/access/apply/addforaudit?product_id=JCD',
            messages: {
                success: '保存成功'
            },
            api: '/access/api/applysave'
        },
    ]
}

/* eslint-enable */
