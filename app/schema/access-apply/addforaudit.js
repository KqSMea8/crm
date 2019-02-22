/**
 * @file applyBuilding
 * @author ienix(guoaimin01@baidu.com)
 *
 * @since 2017/12/18
 */

/* eslint-disable */

export default
{
    "$schema": "http://amis.baidu.com/schemas/page.json",
    "title": "教育准入申请",
    "remark": "",
    "name": "amis-admin-pages",

    "body": [
        {
            "type": "button",
            "label": "取消",
            "level": "default",
            "actionType": "dialog",
            "dialog": {
                "title": "确认操作",
                "body":{
                    "type": "form",
                    "name": "ui_dialog",
                    "controls": [
                        {
                            "type": "static",
                           "name": "ui_dialog_content",
                            "labelWidth": 300,
                            "value": "是否确认返回列表，本次修改将不会保存?"
                        }
                    ],
                    "actions": [
                        {
                            "type": "button",
                            "level": "success",
                            "actionType": "link",
                            "link": "/pcrm/group/access/apply/listforaudit",
                            "label": "确认"
                        },
                        {
                            "actionType": "cancel",
                            "type": "button",
                            "level": "info",
                            "label": "取消"
                        }
                    ]
                }
            }
        },
        {
            "type": "submit",
            "label": "提交审核",
            "actionType": "ajax",
            "redirect": "/pcrm/group/access/apply/addforaudit?product_id=DXJ",
            "api": {
                "url": "/access/reviewsubmit"
            }
        },
        {
            "type": "submit",
            "actionType": "ajax",
            "label": "保存",
            "redirect": "/pcrm/group/access/apply/addforaudit?product_id=JCD",
            "messages": {
                "success": "保存成功"
            },
            "api": {
                "url": "/access/api/applysave"
            }
        },
        {
            "type": "form",
            "collapsable": true,
            "mode": "horizontal",
            "fieldSet": [
                {
                    "title": "机构基本信息",
                    "sheetName": "DXJ01",
                    "labelWidth": "180",
                    "controls": [
                        [
                            {
                                "type":"finbox-product-type",
                                "name":"product_id",
                                "label":"产品线",
                                "clearable":true,
                                "source":"/access/api/commonmetainfo?metaType=products_list"
                            },
                            {
                                "type":"select",
                                "name":"apply_type",
                                "label":"申请类型",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "clearable":true,
                                "source":"/access/api/commonmetainfo?metaType=application_type"
                            }
                        ],
                        [
                            {
                                "type":"select",
                                "name":"apply_source",
                                "label":"申请来源",
                                "clearable":true,
                                "source":"/access/api/commonmetainfo?metaType=apply_source"
                            },
                            {
                                "name": "brand_name",
                                "label": "机构品牌",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "disabled": false,
                                "type": "text"
                            }
                        ],
                        [
                            {
                                "name": "company_register_name",
                                "label": "公司注册名称",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "disabled": false,
                                "type": "text"
                            },
                            {
                                "type":"select",
                                "name":"company_type",
                                "label":"机构类型",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "clearable":true,
                                source: "/access/api/commonmetainfo?productId=DXJ&metaType=company_type",
                            }
                        ],
                        [
                            {
                                "type": "select",
                                "name": "credentials_due_date_select",
                                "label": "证件期限类型",
                                "value": 0,
                                "options": [
                                    {
                                        "label": "无期限",
                                        "value": 0
                                    },
                                    {
                                        "label": "有期限",
                                        "value": 1
                                    }
                                ]
                            },{
                            "name": "credentials_due_date",
                            "type": "date",
                            "label": "证照到期日",
                            "visibleOn":"credentials_due_date_select == 1",
                            "validations": {
                                "required": true,
                                "message": "必填",
                                "trigger": "blur"
                            }
                        }],
                        [
                            {
                                "type": "file",
                                "label": "证件有效期补件上传",
                                "name": "file",
                                "maxSize": 1048576
                            }
                        ],
                        [
                            {
                                "type": "text",
                                "name": "organ_number",
                                "label": "资质文件编号",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "disabled": false
                            },
                            {
                                "type":"select",
                                "name":"apply_source",
                                "label":"机构业务类型",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "clearable":true,
                                "source":"/access/api/commonmetainfo?metaType=apply_source"
                            }
                        ],
                        [
                            {
                                "type": "cascader",
                                "name": "trainTypeLevelOTT",
                                "label": "机构类型(主行业)",
                                "source":"/access/api/commonmetainfo?metaType=train_type_level_one&productId=$product_id"
                            },{}
                        ],
                        [
                            {
                                "type":"combo",
                                "name":"trainTypeLevels",
                                "label":"机构类型(非主行业)",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "multiple":true,
                                "controls":[
                                    [{
                                        "type": "cascader2",
                                        "name":"trainTypeLevel",
                                        "inline": true,
                                        "clearable": true,
                                        "source": "/access/api/commonmetainfo?metaType=train_type_level_one&productId=$product_id"
                                    }]
                                ]
                            }
                        ],
                        [
                            {
                                "type": "cascader",
                                "name": "province_city",
                                "label": "机构所在城市",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "inline": true,
                                "clearable": false,
                                "source": "/access/api/commonmetainfo?metaType=province_city"
                            },
                            {
                                "type": "text",
                                "name": "detail_address",
                                "label": "详细地址",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                }
                            }
                        ],
                        [
                            {
                                "type": "date",
                                "name": "register_date",
                                "label": "成立日期",
                                "disabled": false,
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                }
                            },
                            {
                                "type": "number",
                                "name": "register_capitial",
                                "label": "注册资本(万元)",
                                "maxSize": 18,
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                }
                            }
                        ],

                        [
                            {
                                "type": "file",
                                "label": "注册资本不足补件上传",
                                "name": "file",
                                "maxSize": 1048576
                            }
                        ],

                        [
                            {
                                "type": "text",
                                "name": "owner_name",
                                "label": "法人代表姓名",
                                
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "placeholder": "",
                                "disabled": false

                            },
                            {
                                "name": "owner_identity_code",
                                "label": "法人代表身份证号",
                                
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "placeholder": "",
                                "disabled": false,
                                "type": "text"
                            }

                        ],

                        [
                            {
                                "type": "select",
                                "name": "sfzqx",
                                "label": "法人代表身份证期限类型",
                                "value": 0,
                                "options": [
                                    {
                                        "label": "无期限",
                                        "value": 0
                                    },
                                    {
                                        "label": "有期限",
                                        "value": 1
                                    }
                                ]
                            },{
                            "name": "owner_identity_due_date",
                            "type": "date",
                            "label": "身份证到期日",
                            "visibleOn":"sfzqx == 1"
                        }],
                        [
                            {
                                "type": "file",
                                "label": "法人代表身份证照片正面",
                                "name": "file",
                                "maxSize": 1048576
                            }
                        ],
                        [
                            {
                                "type": "file",
                                "label": "法人代表身份证照片反面",
                                "name": "file",
                                "maxSize": 1048576
                            }
                        ],
                        [
                            {
                                "name": "contact_name",
                                "label": "机构联系人姓名",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "type": "text"
                            },
                            {
                                "name": "contact_phone",
                                "label": "机构联系人手机号",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "type": "text"
                            }
                        ],
                        [
                            {
                                "name": "customer_service_phone",
                                "label": "机构客服电话",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "type": "text"
                            },
                            {
                                "type": "select",
                                "name": "branch_manage_mode",
                                "label": "机构经营模式",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "options": [
                                    {
                                        "label": "直营",
                                        "value": 0
                                    },
                                    {
                                        "label": "加盟",
                                        "value": 1
                                    }
                                ]
                            }
                        ],
                        [
                            {
                                "name": "join_authorized",
                                "label": "加盟是否被有效授权",
                                "type": "switch",
                                "onText": "是",
                                "offText": "否",
                                "activeValue":"1",
                                "inactiveValue":"0"

                            },
                            {
                                "type": "text",
                                "name": "company_url",
                                "label": "官网url"
                            },
                        ],
                        [
                            {
                                "name": "advertising_account",
                                "label": "广告投放账号",
                                "type": "text"
                            },
                            {
                                "type": "switch",
                                "name": "is_stock_right_chanage",
                                "label": "3年内的控股权变更",
                                "onText": "是",
                                "offText": "否",
                                "activeValue":"1",
                                "inactiveValue":"0"
                            }
                        ],
                        [
                            {
                                "type":"select",
                                "name":"is_manage_right_chanage",
                                "label":"3年内的经营范围变更",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "clearable":true,
                                "source":"/access/api/commonmetainfo?metaType=products_list"
                            },
                            {
                                "type":"select",
                                "name":"company_peroid",
                                "label":"企业的发展阶段",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "clearable":true,
                                "source":"/access/api/commonmetainfo?metaType=application_type"
                            }
                        ],
                        [
                            {
                                "type": "switch",
                                "name":"sensitive_words_reveal",
                                "label":"经营范围是否出现“不得从事培训”字样",
                                "onText": "是",
                                "offText": "否",
                                "activeValue":"1",
                                "inactiveValue":"0"

                            },
                            {
                                "type":"select",
                                "name":"company_bureau_status",
                                "label":"工商信息登记状态",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "clearable":true,
                                "source":"/access/api/commonmetainfo?metaType=application_type"
                            }
                        ],
                        [
                            {
                                "type": "switch",
                                "name":"change_record_12_3",
                                "label":"变更记录（12个月内是否超过3次重要工商信息变更）",
                                "onText": "是",
                                "offText": "否",
                                "activeValue":"1",
                                "inactiveValue":"0"
                            },
                            {
                                "type": "switch",
                                "name":"concealin_information",
                                "label":"是否因“公示企业信息隐瞒真实情况、弄虚作假的”被列入异常名录",
                                "onText": "是",
                                "offText": "否",
                                "activeValue":"1",
                                "inactiveValue":"0"
                            }
                        ],
                    ]
                },
                {
                    "title": "机构规模信息",
                    "sheetName": "DXJ02",
                    "labelWidth": "180",
                    "controls": [
                        [
                            {
                                "type":"select",
                                "name":"staff_num",
                                "label":"在职人员数",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "clearable":true,
                                "source":"/access/api/commonmetainfo?metaType=products_list"
                            },
                            {
                                "type":"select",
                                "name":"last_year_income",
                                "label":"过去1年营收(万元)",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "clearable":true,
                                "source":"/access/api/commonmetainfo?metaType=products_list"
                            }
                        ],
                        [
                            {
                                "type":"select",
                                "name":"branch_institution_num",
                                "label":"分支机构数",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "clearable":true,
                                "source":"/access/api/commonmetainfo?metaType=products_list"
                            },
                            {
                                "type":"text",
                                "name":"last_year_payout",
                                "label":"预估1年放款额(万元)",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                }
                            }
                        ],
                        [
                            {
                                "type":"select",
                                "name":"last_year_customer_num",
                                "label":"过去1年客户数",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "clearable":true,
                                "source":"/access/api/commonmetainfo?metaType=products_list"
                            },{}
                        ]
                    ]
                },
                {
                    "title": "竞品合作信息",
                    "type": "form",
                    "sheetName": "DXJ03",
                    "labelWidth": "180",
                    "controls": [
                        [
                            {
                                "type": "number",
                                "name": "cooperate_institutions_num",
                                "label": "合作信贷机构数",
                                "controls":true,
                                "max":2,
                                "controlsPosition": "left"
                            },{}
                        ],
                        [
                            {
                                "type":"combo",
                                "name":"competitiveInfo1",
                                "label":"主要合作机构1",
                                "invisibleClear":false,
                                "visibleOn":"data.cooperate_institutions_num > 0",
                                "controls":[
                                    [{
                                        "type":"text",
                                        "name":"cooperate_institution_name",
                                        "label":"主要信贷合作机构名称"

                                    },
                                    {
                                        "type":"text",
                                        "name":"cooperate_duration_year",
                                        "label":"合作时长（年)"
                                    }],
                                    [
                                        {
                                            "type":"select",
                                            "name":"competitive_type",
                                            "label":"竞品性质",
                                            "options":[
                                                "a",
                                                "b",
                                                "c"
                                            ]
                                        },
                                        {
                                            "type":"text",
                                            "name":"limit_customer",
                                            "label":"限制客群"
                                        }
                                    ],
                                    [
                                        {
                                            "type":"text",
                                            "name":"pass_rate",
                                            "label":"通过率"
                                        },
                                        {
                                            "type":"select",
                                            "name":"compete_advantage",
                                            "label":"核心竞争优势",
                                            "options":[
                                                "a",
                                                "b",
                                                "c"
                                            ]
                                        }
                                    ],
                                    [{
                                        "type":"text",
                                        "name":"product_form_p1",
                                        "label":"产品形态1"
                                    },
                                        {
                                            "type":"text",
                                            "name":"customer_character_p1",
                                            "label":"客群特征1"
                                        }],
                                    [{
                                        "type":"text",
                                        "name":"project_price_p1",
                                        "label":"课程价格1"
                                    },
                                        {
                                            "type":"text",
                                            "name":"down_payment_rate_p1",
                                            "label":"首付比例1"
                                        }],
                                    [{
                                        "type":"text",
                                        "name":"repayment_way_p1",
                                        "label":"还款方式1"
                                    },
                                        {
                                            "label":"审批时效1",
                                            "type":"text",
                                            "name":"approval_timeliness_p1"
                                        }],
                                    [{
                                        "label":"产品形态2",
                                        "name":"product_form_p2",
                                        "type":"text"
                                    },
                                        {
                                            "label":"客群特征2",
                                            "type":"text",
                                            "name":"customer_character_p2"
                                        }],
                                    [{
                                        "label":"课程价格2",
                                        "name":"project_price_p2",
                                        "type":"text"
                                    },
                                        {
                                            "label":"首付比例2",
                                            "type":"text",
                                            "name":"down_payment_rate_p2"
                                        }],
                                    [{
                                        "label":"还款方式2",
                                        "name":"repayment_way_p2",
                                        "type":"text"
                                    },
                                        {
                                            "label":"审批时效2",
                                            "type":"text",
                                            "name":"approval_timeliness_p2"
                                        }]
                                ]
                            }
                        ],
                        [
                            {
                                "type":"combo",
                                "name":"competitiveInfo2",
                                "label":"主要合作机构2",
                                "invisibleClear":false,
                                "visibleOn":"data.cooperate_institutions_num > 1",
                                "controls":[
                                    [{
                                        "type":"text",
                                        "name":"cooperate_institution_name",
                                        "label":"主要信贷合作机构名称"

                                    },
                                        {
                                            "type":"text",
                                            "name":"cooperate_duration_year",
                                            "label":"合作时长（年)"
                                        }],
                                    [
                                        {
                                            "type":"select",
                                            "name":"competitive_type",
                                            "label":"竞品性质",
                                            "options":[
                                                "a",
                                                "b",
                                                "c"
                                            ]
                                        },
                                        {
                                            "type":"text",
                                            "name":"limit_customer",
                                            "label":"限制客群"
                                        }
                                    ],
                                    [
                                        {
                                            "type":"text",
                                            "name":"pass_rate",
                                            "label":"通过率"
                                        },
                                        {
                                            "type":"select",
                                            "name":"compete_advantage",
                                            "label":"核心竞争优势",
                                            "options":[
                                                "a",
                                                "b",
                                                "c"
                                            ]
                                        }
                                    ],
                                    [{
                                        "type":"text",
                                        "name":"product_form_p1",
                                        "label":"产品形态1"
                                    },
                                        {
                                            "type":"text",
                                            "name":"customer_character_p1",
                                            "label":"客群特征1"
                                        }],
                                    [{
                                        "type":"text",
                                        "name":"project_price_p1",
                                        "label":"课程价格1"
                                    },
                                        {
                                            "type":"text",
                                            "name":"down_payment_rate_p1",
                                            "label":"首付比例1"
                                        }],
                                    [{
                                        "type":"text",
                                        "name":"repayment_way_p1",
                                        "label":"还款方式1"
                                    },
                                        {
                                            "label":"审批时效1",
                                            "type":"text",
                                            "name":"approval_timeliness_p1"
                                        }],
                                    [{
                                        "label":"产品形态2",
                                        "name":"product_form_p2",
                                        "type":"text"
                                    },
                                        {
                                            "label":"客群特征2",
                                            "type":"text",
                                            "name":"customer_character_p2"
                                        }],
                                    [{
                                        "label":"课程价格2",
                                        "name":"project_price_p2",
                                        "type":"text"
                                    },
                                        {
                                            "label":"首付比例2",
                                            "type":"text",
                                            "name":"down_payment_rate_p2"
                                        }],
                                    [{
                                        "label":"还款方式2",
                                        "name":"repayment_way_p2",
                                        "type":"text"
                                    },
                                        {
                                            "label":"审批时效2",
                                            "type":"text",
                                            "name":"approval_timeliness_p2"
                                        }]
                                ]
                            }
                        ]
                    ]
                },
                {
                    "title": "实地考察信息",
                    "sheetName": "DXJ05",
                    "labelWidth": "180",
                    "controls": [
                        [
                            {
                                "type": "switch",
                                "name": "is_fixed_office_space",
                                "label": "机构是否有固定的办公和经营场所",
                                "onText": "是",
                                "offText": "否",
                                "activeValue":"1",
                                "inactiveValue":"0"
                            },
                            {
                                "type": "switch",
                                "name": "is_fixed_educate_space",
                                "label": "机构是否有固定的教学场所",
                                "onText": "是",
                                "offText": "否",
                                "activeValue":"1",
                                "inactiveValue":"0"
                            }
                        ]
                    ]
                },
                {
                    "title": "行业个性化信息-教育",
                    "sheetName": "DXJ04",
                    "labelWidth": "180",
                    "controls": [
                        [
                            {
                                "name": "training_qualification",
                                "label": "机构是否有培训实质",
                                "type": "switch",
                                "onText": "是",
                                "offText": "否",
                                "activeValue":"1",
                                "inactiveValue":"0"
                            },
                            {
                                "name": "student_subsidy",
                                "label": "机构是否对学员进行补贴",
                                "type": "switch",
                                "onText": "是",
                                "offText": "否",
                                "activeValue":"1",
                                "inactiveValue":"0"
                            }
                        ],
                        [
                            {
                                "type": "switch",
                                "name": "contract_signing_protocol",
                                "label": "机构是否与学员签订培训协议",
                                "onText": "是",
                                "offText": "否",
                                "activeValue":"1",
                                "inactiveValue":"0"
                            },
                            {
                                "type": "select",
                                "name": "refund_type",
                                "label": "培训协议退课退款类型",
                                "multiple": true,
                                "optionAliseMap": {
                                    "label": "label",
                                    "value": "value"
                                },
                                "options": [
                                    {
                                        "label": "自有物流",
                                        "value": 10
                                    },
                                    {
                                        "label": "第三方",
                                        "value": 10
                                    },
                                    {
                                        "label": "无",
                                        "value": 10
                                    }
                                ]

                            }
                        ],
                        [
                            {
                                "type": "file",
                                "label": "培训协议补件上传",
                                "name": "file",
                                "maxSize": 1048576
                            }
                        ],
                        [
                            {
                                "name": "course_loading",
                                "label": "培训协议是否允许课程转让",
                                "type": "switch",
                                "onText": "是",
                                "offText": "否",
                                "activeValue":"1",
                                "inactiveValue":"0"
                            },
                            {
                                "name": "online_classes",
                                "label": "报名和上课是否均在线上",
                                "type": "switch",
                                "onText": "是",
                                "offText": "否",
                                "activeValue":"1",
                                "inactiveValue":"0"
                            }
                        ]
                    ]
                },
                {
                    "title": "备注",
                    "sheetName": "DXJ06",
                    "labelWidth": "180",
                    "controls": [
                        [
                            {
                                "type": "file",
                                "label": "其它附件",
                                "name": "file",
                                "maxSize": 1048576
                            }
                        ],

                        [
                            {
                                "name": "remarks",
                                "placeholder": "备注",
                                "type": "textarea",
                                "label": "备注"
                            }
                        ]
                    ]
                }

            ]
        },

        {
            "type": "submit",
            "label": "取消",
            "actionType": "ajax",
            "redirect": "http://www.baidu.com",
            "api": {
                "url": "/mock/saveForm.json"
            }
        },
        {
            "type": "submit",
            "label": "提交审核",
            "actionType": "ajax",
            "redirect": "/pcrm/group/access/apply/addforaudit?product_id=DXJ",
            "api": {
                "url": "/access/reviewsubmit"
            }
        },
        {
            "type": "submit",
            "actionType": "ajax",
            "label": "保存",
            "redirect": "/pcrm/group/access/apply/addforaudit?product_id=DXJ",
            "messages": {
                "success": "保存成功"
            },
            "api": {
                "url": "/access/api/applysave"
            }
        }
    ]
}

/* eslint-enable */
