/**
 * @file bbAccountList.js
 * @description 银企直联列表页-schema
 * @author zhangxinzhu(zhangxinzhu@baidu.com)
 * @since  2017-10-21
 */
/* eslint-disable */
export default
{
    "$schema": "http://amis.baidu.com/schemas/page.json",
    "title": "银企直连认款管理",
    "body": [

        {
            "name": "amisPages",
            "type": "crud",
            "api": "/account/api/getaccountlist",
            "perPageField": "size",
            "pageField": "page",
            "defaultParams": {
                "size": "10",
            },
            "filter": {
                "title": "查询条件",
                "mode": "horizontal",
                "controls": [
                    [
                        {
                            "type": "select",
                            "name": "acctnum",
                            "label": "收款账户:",
                            "options": [
                                {
                                    "label": "全部收款账户",
                                    "value": ""
                                }],
                            "value": "",
                            "source": "/account/api/getmetacode?metaType=account_number"
                        },
                        {
                            "type": "text",
                            "name": "remark",
                            "placeholder": "模糊匹配",
                            "label": "网银摘要:"

                        }
                    ],
                    [
                        {
                            "type": "text",
                            "name": "payer_account",
                            "label": "付款账号:",
                            "placeholder": "精确匹配"
                        },
                        {
                            "type": "text",
                            "name": "payer_name",
                            "label": "付款姓名:",
                            "placeholder": "模糊匹配"
                        }
                    ],
                    [
                        {
                            "type": "select",
                            "name": "product_id",
                            "label": "认款产品线:",
                            "options": [
                                {
                                    "label": "全部产品线",
                                    "value": ""
                                }],
                            "value": "",
                            "source": "/account/api/getmetacode?metaType=product_id"

                        },
                        {
                            "type": "select",
                            "name": "status",
                            "label": "单据状态:",
                            "options": [
                                {
                                    "label": "全部状态",
                                    "value": ""
                                }],
                            "value": "",
                            "source": "/account/api/getmetacode?metaType=account_status"
                        }
                    ],
                    [
                        {
                            "type": "select",
                            "name": "accept_account_type",
                            "label": "认款类型:",
                            "options": [
                                {
                                    "label": "全部认款类型",
                                    "value": ""
                                }],
                            "value": "",
                            "source": "/account/api/getmetacode?metaType=confirm_type&pageType=list_page"
                        },
                        {
                            "type": "text",
                            "name": "bussiness_credentials_number",
                            "label": "业务凭据编号:",
                            "placeholder": "精准匹配"
                        }
                    ],
                    [
                        {
                            "type": "daterange",
                            "name": "create_time",
                            "label": "创建日期:",
                            "valueFormat": "yyyy-MM-dd",
                            "valueTemplate": "[moment().subtract(1, 'day').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')]",
                            "valueTemplateClearable": true,
                            "clearable": true

                        },
                        {
                            "type": "daterange",
                            "name": "modify_time",
                            "label": "更新时间:",
                            "clearable": true,
                            "valueFormat": "yyyy-MM-dd"
                        }

                    ],
                    [
                        {
                            "label": "待合并单据",
                            "type": "finbox-cart-button"
                        }
                    ]
                ],

                "actions": [
                    {
                        "type": "submit",
                        "level": "primary",
                        "label": "查询"
                    },
                    // {
                    //     "visibleOn": "amisPages.count && amisPages.count > 2000",
                    //     "type": "button",
                    //     "actionType": "dialog",
                    //     "dialog": {
                    //         "title": "温馨提示",
                    //         "body": {
                    //             "type": "form",
                    //             "name": "exportExcel_form",
                    //             "controls": [
                    //                 {
                    //                     "type": "static",
                    //                     "value": "本次导出数据量较大，导出过程中可能会失败，如果失败，可以尝试分批导出或发邮件导出。"
                    //                 }
                    //             ],
                    //             "actions": [
                    //                 {
                    //                     "type": "button",
                    //                     "level": "primary",
                    //                     "label": "确定",
                    //                     "actionType": "url",
                    //                     "urlTemplate": "amisPages.downloadUrl"
                    //                 },
                    //                 {
                    //                     "actionType": "cancel",
                    //                     "type": "button",
                    //                     "level": "info",
                    //                     "label": "取消"
                    //                 }
                    //             ]
                    //         }
                    //     },
                    //     "level": "primary",
                    //     "label": "导出"
                    // },
                    {
                        "visibleOn": "amisPages.count && amisPages.count > 0",
                        "type": "button",
                        "actionType": "url",
                        "level": "primary",
                        "label": "导出",
                        "urlTemplate": "amisPages.downloadUrl"
                    }
                ]
            },
            "toolbarInline": false,
            "switchPerPage": true,
            "showJumper": false,
            "columns": [
                {
                    "name": "account_no",
                    "label": "收款编号",
                    "width": "120"
                },
                {
                    "name": "acctnum",
                    "label": "收款账户",
                    "width": "220"
                },
                {
                    "name": "bill_money",
                    "label": "单据金额(元)",
                    "width": "130"
                },
                {
                    "name": "remark",
                    "label": "网银摘要",
                    "width": "250"
                },
                {
                    "name": "serial_number",
                    "label": "网银流水号",
                    "width": "180"
                },
                {
                    "name": "payer_name",
                    "label": "付款方名称",
                    "width": "125"
                },
                {
                    "label": "认款产品线",
                    "name": "product_name",
                    "width": "125"
                },
                {
                    "label": "单据状态",
                    "name": "status_name",
                    "width": "100"
                },
                {
                    "label": "认款类型",
                    "name": "accept_account_type_name",
                    "width": "125"
                },
                {
                    "label": "认款人",
                    "name": "accept_account_ucname",
                    "width": "120"
                },
                {
                    "label": "网银到帐日期",
                    "name": "account_arrival_time",
                    "width": "180"
                },
                {
                    "label": "创建时间",
                    "name": "create_time",
                    "width": "180"
                },
                {
                    "label": "更新时间",
                    "name": "modify_time",
                    "width": "180"
                },
                {
                    "type": "operation",
                    "label": "操作",
                    "width": "180",
                    "align": "center",
                    "buttons": [
                        {
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "详情",
                            "actionType": "url",
                            "url": "/pcrm/group/account/bbaccountdetail?account_no=$rowData.account_no"
                        },
                        {
                            "visibleOn":"rowData.operation.can_split",
                            "label": "拆单",
                            "actionType": "dialog",
                            "level": "text",
                            "type": "button",
                            "size": "mini",
                            "dialog": {
                              "title": "拆单",
                              "body":{
                                "type": "form",
                                "name": "splitbill_dialog",
                                "initApi": "",
                                "labelWidth": 150,
                                "labelPosition": "left",
                                "controls": [
                                  [
                                    {
                                      "type": "static",
                                      "name": "account_no",
                                      "label": "收款编号:"
                                    },
                                    {
                                      "type": "static",
                                      "name": "serial_number",
                                      "label": "网银流水:"
                                    }
                                  ],
                                  [
                                    {
                                      "type": "static",
                                      "name": "payer_account",
                                      "label": "付款方帐号:"
                                    },
                                    {
                                      "type": "static",
                                      "name": "payer_name",
                                      "label": "付款方名称:"
                                    }
                                  ],
                                  [
                                    {
                                      "type": "static",
                                      "name": "bill_money",
                                      "label": "单据金额(元):"
                                    },
                                    {
                                      "type": "static",
                                      "name": "wait_money",
                                      "label": "待拆分金额(元):"
                                    }
                                  ],
                                  [
                                    {
                                      "type": "static",
                                      "name": "remark",
                                      "label": "摘要:"
                                    }
                                  ],
                                  {
                                    "type": "finbox-split-bill",
                                    "name": "splitbill"
                                  },
                                  {
                                    "type": "static",
                                    "name": "lingyige"
                                  }

                                ],
                                "actions": [
                                  {
                                    "api": {
                                      "url": "/account/api/splitaccount",
                                      "data": {
                                        "arr_bill_moneys": "$splitbill",
                                        "account_no": "$account_no"
                                      }
                                    },
                                    "eventName": "splitbillSubmit",
                                    "type": "button",
                                    "level": "success",
                                    "label": "提交",
                                    "actionType": "ajax",
                                  //  "redirect": "/pcrm/group/account/bbaccountlist",
                                    "messages": {
                                      "success": "拆单成功",
                                      "failed": "拆单失败"
                                    }
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
                            "visibleOn": "rowData.operation.can_merge",
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "合单",
                            "eventName": "mergeList"
                        },
                        {
                            "visibleOn": "rowData.operation.can_receive",
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "认款",
                            "actionType": "dialog",
                            "dialog": {
                                "title": "认款管理",
                                "body": {
                                    "type": "form",
                                    "name": "receiveDialog",
                                    "controls": [
                                        [
                                            {
                                                "type": "static",
                                                "valueTemplate": "account_no",
                                                "label": "收款编号"
                                            },
                                            {
                                                "type": "static",
                                                "valueTemplate": "serial_number",
                                                "label": "网银流水号"
                                            }
                                        ],
                                        [
                                            {
                                                "type": "static",
                                                "valueTemplate": "payer_name",
                                                "label": "付款方名称"
                                            },
                                            {
                                                "type": "static",
                                                "valueTemplate": "bill_money",
                                                "label": "单据金额(元)"
                                            }

                                        ],
                                        [
                                            {
                                                "type": "static",
                                                "valueTemplate": "remark",
                                                "label": "摘要"
                                            },
                                            {
                                                "type": "static",
                                                "valueTemplate": "acctnum",
                                                "label": "收款主体"
                                            }

                                        ],
                                        [
                                            {
                                                "type": "select",
                                                "name": "productId",
                                                "label": "产品线",
                                                "required": true,
                                                "source": "/account/api/getmetacode?metaType=product_id&pageType=confirm_page"
                                            },
                                            {
                                                "type": "select",
                                                "name": "confirmType",
                                                "label": "认款类型",
                                                "required": true,
                                                "source": "/account/api/getmetacode?metaType=confirm_type&pageType=confirm_page"
                                            }
                                        ],
                                        [
                                            {
                                                "requiredOn": "confirmType && confirmType != 5 && confirmType != 6",
                                                "type": "select",
                                                "name": "credentialType",
                                                "label": "业务凭据类型",
                                                "clearable": true,
                                                "firstLoading": false,
                                                "nonEmptyDepend": ['confirmType'],
                                                "source": "/account/api/getmetacode?metaType=credential_type&pageType=confirm_page&confirmType=$confirmType"
                                            },
                                            {
                                                "type": "finbox-account-input",
                                                "name": "credentialCode",
                                                "label": "业务凭据编号"
                                            }
                                        ],
                                        [
                                            {
                                                "type": "textarea",
                                                "name": "comment",
                                                "maxlength": 200,
                                                "label": "认款备注"
                                            },
                                            {
                                                "type": "plain",
                                                "name": "plain_one"
                                            }
                                        ],
                                        [
                                            {
                                                "visibleOn": "userName",
                                                "label": "姓名",
                                                "type": "static",
                                                "spaceVisible": false,
                                                "name": "userName"
                                            },
                                            {
                                                "visibleOn": "userIdCard",
                                                "label": "身份证号",
                                                "type": "static",
                                                "spaceVisible": false,
                                                "name": "userIdCard"
                                            }
                                        ],
                                        [
                                            {
                                                "visibleOn": "userTel",
                                                "type": "static",
                                                "label": "用户电话号",
                                                "spaceVisible": false,
                                                "name": "userTel"
                                            },
                                            {
                                                "visibleOn": "refundAmount",
                                                "type": "static",
                                                "label": "退款金额",
                                                "spaceVisible": false,
                                                "name": "refundAmount"
                                            }
                                        ],
                                        [
                                            {
                                                "visibleOn": "coreAccount",
                                                "type": "static",
                                                "label": "核心借据号",
                                                "spaceVisible": false,
                                                "name": "coreAccount"
                                            },
                                            {
                                                "visibleOn": "coreAccount",
                                                "type": "plain",
                                                "spaceVisible": false,
                                                "name": "plain_two"
                                            }
                                        ]
                                    ],
                                    "actions": [
                                        {
                                            "type": "button",
                                            "actionType": "ajax",
                                            "label": "确定",
                                            "level": "primary",
                                            "eventName": "confirmValidate",
                                            "api": {
                                                "url": "/account/api/accountconfirm",
                                                "data": {
                                                    "credentialCode": "$credentialCode",
                                                    "productId": "$productId",
                                                    "confirmType": "$confirmType",
                                                    "credentialType": "$credentialType",
                                                    "accountCode": "$account_no",
                                                    "comment": "$comment",
                                                }
                                            }

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
                        }

                    ]
                }
            ]
        }
    ]
}
