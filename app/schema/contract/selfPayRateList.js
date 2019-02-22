
/* eslint-disable */
export default
{
    "$schema":"http://amis.baidu.com/schemas/page.json",
    "title":"自主支付息费列表",
    "body":[
        {
            "name":"amis-admin-pages",
            "type":"crud",
            "api":"/contract/api/frontpaymentparamlist",
            "pageField": "page",
            "perPageField":"size",
            "defaultParams":{
                "size":"10"
            },
            "filter":{
                "title":"查询条件",
                "controls":[
                    [
                        {
                            "type":"select",
                            "label":"产品线",
                            "name":"productId",
                            "source":"/contract/api/getfrontpaymentparamlistmeta?metaType=product_id",
                            "options": [
                                {
                                    "label": "全部",
                                    "value": ""
                                }
                            ],
                            "value": "",
                        },
                        {
                            "type":"select",
                            "name":"repaymentType",
                            "label":"分期方式",
                            "source":"/contract/api/getfrontpaymentparamlistmeta?metaType=repayment_type",
                            "options": [
                                {
                                    "label": "全部",
                                    "value": ""
                                }
                            ],
                            "value": "",
                        }
                    ],
                    [
                        {
                            "type":"text",
                            "name":"totalInstalmentNum",
                            "label":"总期数",
                            "validations": {
                                "pattern": /^\d+$/,
                                "message": "请输入数字"
                            }
                        },
                        {
                            "type":"select",
                            "label":"状态",
                            "name":"status",
                            "source":"/contract/api/getfrontpaymentparamlistmeta?metaType=status",
                            "options": [
                                {
                                    "label": "全部",
                                    "value": ""
                                }
                            ],
                            "value": "",
                        }
                    ],
                    [
                        {
                            "type":"daterangeless",
                            "name":"effect_time",
                            "valueFormat":"yyyy-MM-dd",
                            "label":"生效时间",
                            "validations": [
                                {
                                    validator(rule, value, callback, source, options) {
                                      var errors = [];
                                      if(value && value[0] && value[1]) {
                                          if(new Date(value[0]).valueOf() > new Date(value[1]).valueOf()) {
                                              callback('最小时间不可大于最大时间!');
                                          }
                                      }
                                      callback(errors);
                                    }
                                }
                            ]
                        },
                        {
                            "type":"daterangeless",
                            "name":"modify_time",
                            "valueFormat":"yyyy-MM-dd",
                            "label":"失效时间",
                            "validations": [
                                {
                                    validator(rule, value, callback, source, options) {
                                      var errors = [];
                                      if(value && value[0] && value[1]) {
                                          if(new Date(value[0]).valueOf() > new Date(value[1]).valueOf()) {
                                              callback('最小时间不可大于最大时间!');
                                          }
                                      }
                                      callback(errors);
                                    }
                                }
                            ]
                        }
                    ],
                    [
                        {
                            "type":"number-range",
                            "name":"irr",
                            "label":"IRR(%)",
                            "validations": {
                                "type": "array",
                                "message": "请输入IRR范围",
                                "len": 2,
                                "fields": {
                                    "0": {"type": "number", "message": "请输入不小于0的数字", "min": 0 },
                                    "1": {"type": "number", "message": "请输入不小于0的数字", "min": 0 }
                                }
                            }
                        },
                        {
                            "type": "plain",
                            "name": 'plain-one'
                        }
                    ]
                ]
            },
            "columns":[
                {
                    "name":"product_id",
                    "label":"产品线"
                },
                {   
                    "name":"repayment_type",
                    "label":"分期方式"
                },
                {
                    "name":"total_instalment_num",
                    "label":"总期数"
                },
                {
                    "name":"irr",
                    "label":"IRR(%)"
                },
                {
                    "name":"status",
                    "label":"状态"
                },
                {
                    "name": "pos_bd",
                    "label": "创建人"
                },
                {
                    "name": "effect_time",
                    "label": "生效时间"
                },
                {
                    "name": "modify_time",
                    "label": "失效时间"  
                },
                {
                    "type":"operation",
                    "label":"操作",
                    "width": "100",
                    "align": "center",
                    "buttons":[
                        {
                            "type":"button",
                            "level":"success",
                            "size": "mini",
                            "label":"查看",
                            "actionType":"dialog",
                            "dialog":{
                                "title":"分期计划详情",
                                "width": 800,
                                "body":{
                                    "type":"form",
                                    "initApi": "/contract/api/frontpaymentparamdetail?paymentApplyCode=$rowData.payment_apply_code&paymentRateCode=$rowData.payment_rate_code&productId=$rowData.product_id",
                                    "name":"repaymentDetail",
                                    "labelWidth": 200,
                                    "controls":[
                                        [
                                            {
                                                "name":"product_id",
                                                "label":"产品线",
                                                "type":"static"
                                            },
                                            {
                                                "name":"repayment_type",
                                                "type":"static",
                                                "label":"分期方式"
                                            }
                                        ],
                                        [
                                            {
                                                "name":"total_instalment_num",
                                                "label":"总期数",
                                                "type":"static"
                                            },
                                            {
                                                "name":"irr",
                                                "type":"static",
                                                "label":"IRR(%)"
                                            }
                                        ],
                                        [
                                            {
                                                "name":"status",
                                                "type":"static",
                                                "label":"状态"
                                            },
                                            {
                                                "name":"pos_bd",
                                                "type":"static",
                                                "label":"创建人"
                                            }
                                        ],
                                        [
                                            {
                                                "name":"effect_time",
                                                "type":"static",
                                                "label":"生效时间"
                                            },
                                            {
                                                "name":"effect_time",
                                                "type":"static",
                                                "label":"失效时间"
                                            }
                                        ],
                                        [
                                            {
                                                "name":"interest_rule",
                                                "type":"static",
                                                "label":"利息计算规则"
                                            },
                                            {
                                                "name":"interest_value",
                                                "type":"static",
                                                "label":"利息(%)"
                                            }
                                        ],
                                        {
                                            "name":"interest_ymdflag",
                                            "type":"static",
                                            "label":"利息年月日标志"
                                        },
                                        [
                                            {
                                                "name":"penalty_rule",
                                                "type":"static",
                                                "label":"罚息计算规则"
                                            },
                                            {
                                                "name":"penalty_value",
                                                "type":"static",
                                                "label":"罚息(%)"
                                            }
                                        ],
                                        {
                                            "name":"penalty_ymdflag",
                                            "type":"static",
                                            "label":"罚息年月日标志"
                                        },
                                        [
                                            {
                                                "name":"charges_rule",
                                                "type":"static",
                                                "label":"费用计算规则"
                                            },
                                            {
                                                "name":"charges_value",
                                                "type":"static",
                                                "label":"费用(%)"
                                            }
                                        ],
                                        [
                                            {
                                                "name":"overdue_rule",
                                                "type":"static",
                                                "label":"逾期费计算规则"
                                            },
                                            {
                                                "name":"overdue_value",
                                                "type":"static",
                                                "label":"逾期(%)"
                                            }
                                        ],
                                        [
                                            {
                                                "name":"violate_prepay_rule",
                                                "type":"static",
                                                "label":"提前还款违约金计算规则"
                                            },
                                            {
                                                "name":"violate_prepay_value",
                                                "type":"static",
                                                "label":"提前还款违约金(%)"
                                            }
                                        ],
                                        [
                                            {
                                                "name":"violate_refund_rule",
                                                "type":"static",
                                                "label":"退款违约金计算规则"
                                            },
                                            {
                                                "name":"violate_refund_value",
                                                "type":"static",
                                                "label":"退款违约金(%)"
                                            }
                                        ],
                                        [
                                            {
                                                "name":"change_plan_rule",
                                                "type":"static",
                                                "label":"分期计划变更服务费计算规则"
                                            },
                                            {
                                                "name":"change_plan_value",
                                                "type":"static",
                                                "label":"分期计划变更服务费(%)"
                                            }
                                        ],
                                        [
                                            {
                                                "name":"account_management_rule",
                                                "type":"static",
                                                "label":"账号管理费计算规则"
                                            },
                                            {
                                                "name":"account_management_value",
                                                "type":"static",
                                                "label":"账号管理费(%)"
                                            }
                                        ]
                                    ],
                                    "actions":[
                                        {
                                            "type":"button",
                                            "actionType":"cancel",
                                            "label":"确定"
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