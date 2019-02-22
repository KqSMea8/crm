/**
 * @file applyMedical
 * @author ienix(guoaimin01@baidu.com)
 *
 * @since 2017/12/15
 */

/* eslint-disable */

export default
{
    '$schema': 'http://amis.baidu.com/schemas/page.json',
    title: '医美准入申请',
    name: 'admin-pages',
    // initApi: '/access/apply/infoforaudit?is_edit=$is_edit&company_id=$company_id&isApi=true',
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
                    labelPosition: 'left',
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
                    sheetName: 'YMD01',
                    labelWidth: '220',
                    controls: [
                        [
                            {
                                name: 'product_id',
                                type: 'finbox-product-type',
                                label: '产品线',
                                source: '/access/api/commonmetainfo?productId=YMD&metaType=products_list'
                            },
                            {
                                name: 'application_type',
                                type: 'select',
                                label: '申请类型',
                                source: '/access/api/commonmetainfo?productId=YMD&metaType=application_type'
                            }
                        ],
                        [
                            {
                                name: 'apply_source',
                                type: 'select',
                                label: '申请来源',
                                disabled: true,
                                value: '4',
                                source: '/access/api/commonmetainfo?productId=YMD&metaType=apply_source'
                            },
                            {
                                name: 'company_register_name',
                                label: '公司注册名称',
                                validations: {
                                    required: true,
                                    message: '请输入正确的公司名称',
                                    trigger: 'blur'
                                },
                                type: 'finbox-sync-validate-company',
                                // source: '/access/isrepeatcompanyname?company_name=$company_register_name&company_id=$company_id&product_id=YMD'
                            }
                        ],
                        [
                            {
                                name: 'institution_license_name',
                                label: '医疗机构执业许可证名称',
                                validations: {
                                    required: true,
                                    message: '请输入正确的医疗机构执业许可证',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            },
                            {}
                        ],
                        [
                            {
                                name: 'institution_license_due_date_select',
                                type: 'select',
                                label: '医疗机构执业许可证到期日',
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
                                name: 'institution_license_due_date',
                                label: '证照到期日',
                                visibleOn: 'institution_license_due_date_select === 1',
                                placeholder: '',
                                type: 'date',
                                valueFormat: 'yyyy-MM-dd'
                            }
                        ],
                        {
                            type: 'divider'
                        },
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
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '医疗机构执业许可证',
                                name: 'file',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传5个文件',
                            }
                        ],
                        {
                            type: 'divider'
                        },
                        [
                            {
                                type: 'select',
                                label: '机构类型',
                                name: 'company_type',
                                remote: true,
                                source: '/access/api/commonmetainfo?productId=YMD&metaType=company_type'
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
                                visibleOn: 'credentials_due_date_select === 1',
                                label: '证照到期日',
                                type: 'date',
                                valueFormat: 'yyyy-MM-dd'
                            }
                        ],
                        {
                            type: 'divider'
                        },
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '证件有效期补件上传',
                                name: 'change_due_date_file',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            },
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '工商网查询机构信息截图上传',
                                name: 'industry_bureau_screenshot',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            },
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '法院网查询信息截图上传',
                                name: 'courn_screenshot',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            },
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '失信网查询信息截图上传',
                                name: 'credit_inquiry_screenshot',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            },
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '机构官网信息截图上传',
                                name: 'company_website_screenshot',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            },
                        ],
                        {
                            type: 'divider'
                        },
                        [
                            {
                                type: 'text',
                                name: 'organ_number',
                                label: '资质文件编号',
                                validations: {
                                    required: true,
                                    trigger: 'blur',
                                    message: '请输入资质文件编号'
                                }
                            },
                            {

                                type: 'text',
                                name: 'social_credit_code',
                                label: '注册号/统一社会信用代码',
                                validations: {
                                    required: true,
                                    trigger: 'blur',
                                    message: '请输入注册号/统一社会信用代码'
                                }
                            }
                        ],
                        [
                            {
                                type: 'select',
                                label: '机构类别-主业',
                                name: 'train_type_level_one',
                                remote: true,
                                source: '/access/api/commonmetainfo?productId=YMD&metaType=train_type_level_one'
                            }
                        ],
                        [
                            {
                                type: 'combo',
                                className: 'col-lg-6',
                                label: '机构类别-非主业',
                                inline: true,
                                name: 'train_type_level_one_combo',
                                clearable: false,
                                controls:[
                                    [
                                        {
                                            type: 'cascader2',
                                            name: 'train_type_level_one',
                                            remote: true,
                                            source: '/access/api/commonmetainfo?productId=YMD&metaType=train_type_level_one'
                                        }
                                    ]
                                ]
                            }
                        ],
                        [
                            {
                                name: 'hospital_item',
                                label: '诊疗科目',
                                validations: {
                                    required: true,
                                    trigger: 'blur',
                                    message: '请输入诊疗科目'
                                },
                                type: 'text'
                            },
                            {
                                type: 'cascader',
                                label: '机构所在城市:',
                                inline: true,
                                name: 'work_address',
                                source: '/access/api/commonmetainfo?productId=YMD&metaType=province_city'
                            }
                        ],
                        [
                            {
                                type: 'text',
                                name: 'detail_address',
                                label: '详细地址',
                                maxSize: 18,
                                validations: {
                                    required: true,
                                    trigger: 'blur',
                                    message: '请输入详细地址'
                                }
                            },
                            {
                                name: 'register_date',
                                label: '成立日期',
                                type: 'date',
                                valueFormat: 'yyyy-MM-dd',
                                validations: {
                                    required: true,
                                    trigger: 'blur',
                                    message: '请填写正确的日期',
                                    pattern: /^\d{4}-\d{1,2}-\d{1,2}$/
                                }
                            }
                        ],
                        [
                            {
                                type: 'text',
                                name: 'register_capitial',
                                label: '注册资本(万元)',
                                validations: {
                                    required: true,
                                    message: '请填写正确的资本',
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '注册资本不足补件上传',
                                name: 'short_refiater_capitial_file',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件',
                                required: true
                            },
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '经营年限不足补件上传',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件',
                                name: 'short_operating_age_file'
                            },
                        ],
                        {
                            type: 'divider'
                        },
                        [
                            {
                                name: 'owner_name',
                                label: '法人代表姓名',
                                validations: {
                                    required: true,
                                    trigger: 'blur',
                                    message: '请填写正确的法人代表姓名'
                                },
                                type: 'text',

                            },
                            {
                                name: 'owner_identity_code',
                                label: '法人代表身份证',
                                validations: {
                                    required: true,
                                    message: '请填写正确的法人代表姓名',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'owner_position',
                                label: '法人代表现任职位',
                                validations: {
                                    required: true,
                                    trigger: 'blur',
                                    message: '请填写正确的法人代表姓名',
                                },
                                type: 'text'
                            },
                            {
                                name: 'owner_cellphone',
                                label: '法人手机号码',
                                validations: {
                                    required: true,
                                    trigger: 'blur',
                                    pattern: /^1(3[0-9]|4[57]|5[0-35-9]|7[013678]|8[0-9])\d{8}$/,
                                    message: '请填写正确的法人代表姓名',
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'owner_identity_due_date_select',
                                type: 'select',
                                label: '法人代表身份证期限',
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
                                visibleOn: 'owner_identity_due_date_select === 1',
                                label: '证件到期日',
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
                                name: 'file',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            },
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '法人代表身份证照片反面',
                                name: 'file',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            },
                        ],
                        {
                            type: 'divider'
                        },
                        [
                            {
                                name: 'contact_name',
                                label: '机构联系人姓名',
                                type: 'text'
                            },
                            {
                                name: 'contact_phone',
                                label: '机构联系人手机号',
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'operating_resp_er_name',
                                label: '经营负责人姓名',
                                type: 'text',
                                validations: {
                                    required: true,
                                    trigger: 'blur',
                                    message: '请填写正确的姓名'
                                }
                            },
                            {
                                name: 'operating_resp_er_identity',
                                label: '经营负责人身份证号',
                                validations: {
                                    required: true,
                                    trigger: 'blur',
                                    message: '请填写正确的姓名'
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'operating_resp_er_phone',
                                label: '经营负责人手机号码',
                                
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写正确的手机号码',
                                    pattern: /^1(3[0-9]|4[57]|5[0-35-9]|7[013678]|8[0-9])\d{8}$/,
                                    trigger: 'blur'
                                }
                            },
                            {
                                name: 'adjustOwner',
                                label: '经营负责人现任职位',
                                
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写职位',
                                    trigger: 'blur'
                                }
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
                                name: 'operating_identity_positive',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            },
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '法人代表身份证照片反面',
                                name: 'operating_identity_other_side',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            },
                        ],
                        {
                            type: 'divider'
                        },
                        [
                            {
                                name: 'actual_controller_name',
                                label: '  实际控制人姓名',
                                validations: {
                                    required: true,
                                    message: '请填写姓名',
                                    trigger: 'blur'
                                },
                                type: 'text'
                            },
                            {
                                name: 'actual_controller_identity',
                                label: '  实际控制人身份证号',
                                validations: {
                                    required: true,
                                    message: '请填写正确的身份证号',
                                    trigger: 'blur',
                                    pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'actual_controller_phone',
                                label: '  实际控制人手机号码',
                                
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写正确的手机号',
                                    pattern: /^1(3[0-9]|4[57]|5[0-35-9]|7[013678]|8[0-9])\d{8}$/,
                                    trigger: 'blur'
                                }
                            },
                            {
                                name: 'actual_controller_position',
                                label: '实际控制人现任职位',
                                
                                type: 'text',
                                validations: {
                                    message: '请填写职位',
                                    required: true,
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '实际控制人身份证照片正面',
                                name: 'actual_controller_identity_positive',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            },
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '实际控制人身份证照片反面',
                                name: 'actual_controller_identity_other_side',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            },
                        ],
                        {
                            type: 'divider'
                        },
                        [
                            {
                                name: 'financial_charger_name',
                                label: '财务负责人姓名',
                                
                                type: 'text',
                                validations: {
                                    message: '请填写姓名',
                                    required: true,
                                    trigger: 'blur'
                                }
                            },
                            {
                                name: 'financial_charger_identity',
                                label: '财务负责人身份证号',
                                validations: {
                                    message: '请填写正确的身份证号',
                                    pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                                    required: true,
                                    trigger: 'blur'
                                },
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'financial_charger_phone',
                                label: '财务负责人手机号码',
                                
                                type: 'text',
                                validations: {
                                    message: '请填写正确的手机号码',
                                    pattern: /^1(3[0-9]|4[57]|5[0-35-9]|7[013678]|8[0-9])\d{8}$/,
                                    required: true,
                                    trigger: 'blur'
                                }
                            },
                            {
                                name: 'financial_charger_position',
                                label: '财务负责人现任职位',
                                
                                type: 'text',
                                validations: {
                                    message: '请填写姓名',
                                    required: true,
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '财务负责人身份证照片正面',
                                name: 'financial_charger_identity_positive',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            },
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '实际控制人身份证照片反面',
                                name: 'financial_charger_indetity_other_side',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            },
                        ],
                        {
                            type: 'divider'
                        },
                        [
                            {
                                name: 'customer_service_phone',
                                label: '机构客服电话',
                                
                                placeholder: '',
                                type: 'text'
                            },
                            {
                                type: 'text',
                                label: '公司电话(座机)',
                                name: 'company_telephone',
                                validations: {
                                    message: '请填写正确的电话号码',
                                    pattern: /^\d[\d|-]{0,18}\d$/,
                                    required: true,
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                name: 'customer_channel',
                                label: '获客渠道',
                                type: 'text',
                                validations: {
                                    message: '请填写',
                                    required: true,
                                    trigger: 'blur'
                                }
                            },
                            {
                                type: 'text',
                                label: '业务覆盖城市:',
                                name: 'business_cover_city',
                                validations: {
                                    message: '请填写',
                                    required: true,
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                name: 'company_url',
                                label: '官网url',
                                
                                type: 'text',
                                pattern: /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i
                            }
                        ],
                        [
                            {
                                name: 'listed_company',
                                type: 'switch',
                                label: '是否上市公司'
                            },
                            {
                                name: 'bd_credit_rating',
                                type: 'select',
                                label: '百度信誉评级',
                                source: '/access/api/commonmetainfo?productId=YMD&metaType=bd_credit_rating'
                            }
                        ],
                        [
                            {
                                name: 'company_bureau_status',
                                type: 'select',
                                label: '工商信息登记状态',
                                source: '/access/api/commonmetainfo?productId=YMD&metaType=company_bureau_status'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '迁出补件上传',
                                name: 'emigration_file',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            },
                        ],
                        [
                            {
                                name: 'switchField',
                                type: 'switch',
                                label: '异常名录',
                                onText: '是',
                                offText: '否'
                            },
                            {
                                type: 'plain',
                                label: '异常名录说明:',
                                text: '是否因“公示企业信息隐瞒真实情况、弄虚作假的”被列入异常名录'
                            }
                        ],
                        [
                            {
                                name: 'switchFiel111111d',
                                type: 'switch',
                                label: '工商信息变更',
                                onText: '是',
                                offText: '否'
                            },
                            {
                                type: 'plain',
                                label: '工商信息变更说明:',
                                text: '变更记录（12个月内是否超过3次重要工商信息变更）'
                            }
                        ]
                    ]
                },
                {
                    
                    
                    title: '机构规模信息',
                    sheetName: 'YMD06',
                    labelWidth: '200',
                    controls: [
                        [
                            {
                                name: 'staff_num',
                                type: 'select',
                                label: '在职人员数',
                                source: '/access/api/commonmetainfo?productId=YMD&metaType=staff_num'
                            },
                            {
                                name: 'doctor_num',
                                label: '全职医生数量',
                                
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写正确的医生数量',
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                name: 'branch_institution_num',
                                type: 'select',
                                label: '分支机构数',
                                source: '/access/api/commonmetainfo?productId=YMD&metaType=branch_institution_num'
                            },
                            {
                                name: 'last_year_new_customer_num',
                                label: '过去1年新客户数',
                                
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'last_year_old_customer_num',
                                label: '过去1年老客户数',
                                placeholder: '10的整数',
                                type: 'text'
                            },
                            {
                                name: 'last_3month_customer_num',
                                label: '近3月客户总数',
                                placeholder: '10的整数',
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'last_3month_agent_channel_customer_num',
                                label: '近3月客户总数中，来源于渠道代理商推荐介绍的客户数',
                                placeholder: '100的整数',
                                type: 'text'
                            },
                            {
                                name: 'last_year_income',
                                type: 'select',
                                label: '过去1年营收(万元)',
                                source: '/access/api/commonmetainfo?productId=YMD&metaType=last_year_income'
                            },
                        ],
                        [
                            {
                                name: 'last_year_income_growth_rate',
                                label: '近一年营业收入增长率（%）',
                                
                                placeholder: '两位小数',
                                type: 'text'
                            },
                            {
                                name: 'above_10w_percent',
                                label: '单价≥10万元医疗项目占比（%）',
                                
                                type: 'text',
                                placeholder: '两位小数',
                                validations: {
                                    required: true,
                                    message: '请填写正确的占比',
                                    trigger: 'blur',
                                    pattern: /^\d+[.]\d{1,2}$|^\d+$/
                                }
                            }
                        ],
                        [
                            {
                                name: 'equal_level_city_price_comparison',
                                type: 'select',
                                label: '机构医疗项目价格与该城市同等规模机构价格对比程度',
                                source: '/access/api/commonmetainfo?productId=YMD&metaType=equal_level_city_price_comparison'
                            },
                            {
                                name: 'area',
                                label: '经营场所面积（平米）',

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
                    
                    
                    title: '竞品合作信息',
                    sheetName: 'YMD02',
                    labelWidth: '200',
                    controls: [
                        [
                            {
                                name: 'cooperate_institution_name',
                                label: '主要信贷合作机构名称',
                                
                                type: 'text'
                            },
                            {
                                name: 'cooperate_duration_year',
                                label: '合作时长（年)',
                                
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'loan_rate',
                                label: '贷款费率（%）',
                                
                                type: 'text'
                            },
                            {
                                name: 'last_year_loan_amount',
                                label: '近1年贷款规模（万元）',
                                
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'last_year_loan_num',
                                label: '近1年贷款笔数',
                                
                                type: 'text'
                            },
                            {
                                name: 'lending_institutions_cooperate_way',
                                label: '与贷款机构合作方式',
                                
                                type: 'text'
                            }
                        ],
                        [
                            {
                                name: 'competitive_remarks',
                                label: '备注其他信息',
                                
                                type: 'text'
                            },
                            {
                                name: 'is_cooperate_memedai',
                                type: 'switch',
                                label: '是否与么么贷合作',
                            }
                        ]
                    ]
                },
                {
                    
                    
                    title: '行业个性化信息-医美',
                    sheetName: 'YMD03',
                    labelWidth: '200',
                    controls: [
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '近6个月银行流水',
                                name: 'bank_running_water_6',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '主诊医师、执业医师名单',
                                name: 'doctor_list',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '机构医疗项目价格表（需机构盖章）',
                                name: 'price_list',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            }
                        ],
                    ]
                },
                {
                    
                    
                    title: '实地考察信息',
                    sheetName: 'YMD04',
                    labelWidth: '200',
                    controls: [
                        [
                            {
                                name: 'check_time',
                                label: '考察日期',
                                type: 'date',
                                valueFormat: 'yyyy-MM-dd',
                                validations: {
                                    required: true,
                                    message: '请填写正确的日期',
                                    pattern: /^\d{4}-\d{1,2}-\d{1,2}$/,
                                    trigger: 'blur'
                                }
                            },
                            {
                                name: 'office_space',
                                type: 'select',
                                label: '办公场所',
                                source: '/access/api/commonmetainfo?productId=YMD&metaType=office_space'
                            }
                        ],
                        [
                            {
                                name: 'address_1',
                                label: '实体店1地址',
                                
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写地址',
                                    trigger: 'blur'
                                }
                            },
                            {
                                name: 'principal_1',
                                label: '实体店1负责人',
                                
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写负责人',
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                name: 'principal_phone_1',
                                label: '实体店1负责人联系方式',
                                
                                type: 'text',
                                validations: {
                                    required: true,
                                    message: '请填写联系方式',
                                    trigger: 'blur'
                                }
                            },
                            {
                                name: 'address_2',
                                label: '实体店2地址',
                                
                                type: 'text',
                            }
                        ],
                        [
                            {
                                name: 'principal_2',
                                label: '实体店2负责人',
                                
                                type: 'text',
                                validations: {
                                    message: '请填写',
                                    required: true,
                                    trigger: 'blur'
                                }
                            },
                            {
                                name: 'principal_phone_2',
                                label: '实体店2负责人联系方式',
                                
                                type: 'text',
                            }
                        ],
                        [
                            {
                                name: 'local_check1',
                                placeholder: '考察情况描述：侧面调查，机构是否存在协助客户套现、虚构合同、骗贷、虚假交易或虚假资料、违规收取贷款费用等情况，是否和黑产等中介有业务往来；',
                                type: 'textarea',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                name: 'local_check2',
                                placeholder: '考察情况描述：机构近期是否有扩张计划，比如上市、融资、新增覆盖城市、新增门店数量等利好消息；',
                                type: 'textarea',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                name: 'local_check3',
                                placeholder: '考察情况描述： 机构办公场所是否正常办公，实体店是否正常营业？是否存在长期拖欠物业费租金、门店场地分租给其他商户等情况；',
                                type: 'textarea',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                name: 'local_check4',
                                placeholder: '考察情况描述：机构是否受到过自工商、质检、税务、海关、银行、证监会、协会等监管部门的处罚信息？近期是否发生过重大品牌声誉风险、重大纠纷、批量门店关停事件；',
                                type: 'textarea',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            }
                        ],
                        [
                            {
                                name: 'local_check5',
                                placeholder: '考察情况描述：综合评估机构在当地的品牌影响力、稳定经营状况、倒闭风险，给出准入建议；',
                                type: 'textarea',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
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
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '办公场所照片',
                                name: 'office_space_pic',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            }
                        ],
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '手术场地照片',
                                name: 'surgical_space_pic',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
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
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            }
                        ]
                    ]
                },
                {
                    title: '备注',
                    sheetName: 'YMD05',
                    labelWidth: '200',
                    controls: [
                        [
                            {
                                type: 'file',
                                reciever: '/access/imageupload',
                                maxLength: 1,
                                accept: 'application/*,image/png,image/jpg,image/jpeg',
                                maxSize: 10485760,
                                label: '其他附件',
                                name: 'attachment_files',
                                desc: '支持上传图片、pdf、压缩包：gif,jpg,jpeg,png,zip,rar,pdf[20M]，最多可上传10个文件'
                            }
                        ],
                        [
                            {
                                name: 'remarks',
                                placeholder: '如有多个费率，多个分期，请在此填写；',
                                type: 'textarea',
                                validations: {
                                    required: true,
                                    message: '请填写',
                                    trigger: 'blur'
                                }
                            }
                        ],
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
                    labelPosition: 'left',
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
