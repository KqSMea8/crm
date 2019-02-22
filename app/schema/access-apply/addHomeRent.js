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
    "title": "租房准入申请",
    "remark": "",
    "name": "amis-admin-pages",
    "initApi": "/access/apply/infoforaudit",
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
                            {}
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
                                "name": "company_register_name",
                                "label": "公司注册名称",
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
                                "type": "file",
                                "label": "企业营业执照副本",
                                "name": "file",
                                "maxSize": 1048576
                            }
                        ],
                        [
                            {
                                "name": "social_credit_code",
                                "label": "注册号/统一社会信用代码",
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
                                source: '/access/api/commonmetainfo?productId=DXJ&metaType=company_type',
                            }
                        ],
                        [
                            {
                                "type": "cascader",
                                "name": "province_city",
                                "label": "机构所在城市",
                                "inline": true,
                                "clearable": false,
                                "source": "/access/api/commonmetainfo?metaType=province_city"
                            },
                            {}
                        ],
                        [
                            {
                                "type": "date",
                                "name": "register_date",
                                "label": "成立日期",
                                "disabled": false,
                                "placeholder": ""
                            },
                            {}
                        ],
                        [{
                            "type": "number",
                            "name": "create_time",
                            "label": "注册资本(万元)",
                            "maxSize": 18,
                            "validations": {
                                "required": true,
                                "trigger": "blur"
                            }
                        },
                            {
                                "name": "owner_cellphone",
                                "label": "法人手机号码",
                                "placeholder": "",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "disabled": false,
                                "type": "text"
                            }],
                        [
                            {
                                "name": "owner_name",
                                "label": "法人代表姓名",
                                "placeholder": "",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "disabled": false,
                                "type": "text"
                            },
                            {
                                "name": "owner_identity_code",
                                "label": "法人代表身份证号",
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
                                "name": "financial_charger_name",
                                "label": "财务负责人姓名",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "type": "text"
                            },
                            {
                                "name": "financial_charger_identity",
                                "label": "财务负责人身份证号",
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
                                "label": "财务负责人手机号码",
                                "name": "financial_charger_phone",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "type": "text"
                            },
                            {
                                "label": "业务负责人姓名",
                                "name": "business_leader_name",
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
                                "label": "业务负责人身份证号码",
                                "name": "business_leader_identity",
                                "validations": {
                                    "required": true,
                                    "message": "必填",
                                    "trigger": "blur"
                                },
                                "type": "text"
                            },
                            {
                                "label": "业务负责人手机号码",
                                "name": "business_leader_phone",
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
                                "type": "file",
                                "label": "业务负责人身份证照片正面",
                                "name": "file",
                                "maxSize": 1048576
                            }
                        ],
                        [
                            {
                                "type": "file",
                                "label": "业务负责人身份证照片反面",
                                "name": "file",
                                "maxSize": 1048576
                            }
                        ],
                        [
                            {
                                "type": "file",
                                "label": "机构准入材料",
                                "name": "file",
                                "maxSize": 1048576
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
                                "name": "adjustOwner",
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
        }
    ]
}

/* eslint-enable */
