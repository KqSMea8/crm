/**
 * @file businessDetail.js
 * @description 费率表单页
 * @author zengqingzhuang(zengqingzhuang@baidu.com)
 * @since  2017-12-8
 */
/* eslint-disable */
export default {
    "initApi": "",
    // "toolbar": {
    //     "title": "费率表单",
    //     "actions": [
    //         {
    //             "type": "button",
    //             "icon": "fa fa-plus",
    //             "className": "btn-addon",
    //             "label": "创建费率表单",
    //             "level": "primary",
    //             "actionType": "link",
    //             "link": "/addRules?type=add"
    //         }
    //     ]
    // },
    "body": [
        {
            "type": "form",
            "name": "rateDetail",
            "api": "/api/mock/saveForm?waitSeconds=2",
            "labelPosition": "right",
            "actions": [
                {
                    "visibleOn": "operationType==4",
                    "type": "button",
                    "actionType": "ajax",
                    "confirmText": "确认审核通过？",
                    "label": "审核通过",
                    "redirect": "/pcrm/group/contract/rateApproveList",
                    "api": {
                        "url": "/contract/api/approvalpaymentrateinfo",
                        "data": {
                            "payment_apply_code": "$paymentRateInfo.applyInfo.paymentApplyCode",
                            "audit_note": "$audit_note",
                            "status": "pass",
                            "page": "rateForm"
                        }
                    }
                },
                {
                    "visibleOn": "operationType==4",
                    "type": "button",
                    "actionType": "ajax",
                    "confirmText": "确认驳回？",
                    "eventName": "rejectUpdate",
                    "label": "驳回修改",
                    "redirect": "/pcrm/group/contract/rateApproveList",
                    "api": {
                        "url": "/contract/api/approvalpaymentrateinfo",
                        "data": {
                            "payment_apply_code": "$paymentRateInfo.applyInfo.paymentApplyCode",
                            "audit_note": "$audit_note",
                            "status": "reject",
                            "page": "rateForm"
                        }
                    }
                },
                {
                    "visibleOn": "operationType==1 || operationType==2",
                    "type": "button",
                    "eventName": "rateSubmitApprove",
                    "actionType": "ajax",
                    "label": "提交审核",
                    "redirect": "/pcrm/group/contract/rateList",
                    "api": {
                        "url":"/contract/api/savepaymentapply",
                        "data": {
                            "applyType": "$paymentRateInfo.applyInfo.applyType",
                            "ownerName": "$ownerName",
                            "ownerIdentityCode": "$ownerIdentityCode",
                            "ownerCellphone": "$ownerCellphone",
                            "priceMultiplierSwitch": "$priceMultiplierSwitch",
                            "refundType": "$paymentRateInfo.applyInfo.refundType",
                            "amortizationType": "$paymentRateInfo.applyInfo.amortizationType",
                            "institutionInterestFreeDays": "$paymentRateInfo.applyInfo.institutionInterestFreeDays",
                            "userInterestFreeDays": "$paymentRateInfo.applyInfo.userInterestFreeDays",
                            "userRefundViolateRate": "$paymentRateInfo.applyInfo.userRefundViolateRate",
                            "is_section_refund": "$paymentRateInfo.applyInfo.isSectionRefund",
                            "isAllowPrepayment": "$paymentRateInfo.applyInfo.isAllowPrepayment",
                            "prepaymentViolateRate": "$paymentRateInfo.applyInfo.prepaymentViolateRate",
                            "isAllowCancelGrace": "$paymentRateInfo.applyInfo.isAllowCancelGrace",
                            "comment": "$paymentRateInfo.applyInfo.applyNote",
                            "companyId": "$companyId",
                            "paymentApplyCode": "$paymentRateInfo.applyInfo.paymentApplyCode",
                            "updatePaymentRateIds": "$updatePaymentRateIds",
                            "deletePaymentRateCodes": "$deletePaymentRateCodes",
                            "minAmountCharge": "$minAmountCharge",
                            "maxAmountCharge": "$maxAmountCharge",
                            "fileAuth": "$fileAuth",
                            "fileIdentity": "$fileIdentity",
                            "fileProtocol": "$fileProtocol",
                            "fileIRR": "$fileIRR",
                            "fileOther": "$fileOther",
                            "submitType": "submit"
                        }
                    }
                },
                {
                    "visibleOn": "operationType==1 || operationType==2",
                    "type": "button",
                    "actionType": "ajax",
                    "label": "保存",
                    "redirect": "/pcrm/group/contract/rateList",
                    "api": {
                        "url":"/contract/api/savepaymentapply",
                        "data": {
                            "applyType": "$paymentRateInfo.applyInfo.applyType",
                            "ownerName": "$ownerName",
                            "ownerIdentityCode": "$ownerIdentityCode",
                            "ownerCellphone": "$ownerCellphone",
                            "priceMultiplierSwitch": "$priceMultiplierSwitch",
                            "refundType": "$paymentRateInfo.applyInfo.refundType",
                            "amortizationType": "$paymentRateInfo.applyInfo.amortizationType",
                            "institutionInterestFreeDays": "$paymentRateInfo.applyInfo.institutionInterestFreeDays",
                            "userInterestFreeDays": "$paymentRateInfo.applyInfo.userInterestFreeDays",
                            "userRefundViolateRate": "$paymentRateInfo.applyInfo.userRefundViolateRate",
                            "is_section_refund": "$paymentRateInfo.applyInfo.isSectionRefund",
                            "isAllowPrepayment": "$paymentRateInfo.applyInfo.isAllowPrepayment",
                            "prepaymentViolateRate": "$paymentRateInfo.applyInfo.prepaymentViolateRate",
                            "isAllowCancelGrace": "$paymentRateInfo.applyInfo.isAllowCancelGrace",
                            "comment": "$paymentRateInfo.applyInfo.applyNote",
                            "companyId": "$companyId",
                            "paymentApplyCode": "$paymentRateInfo.applyInfo.paymentApplyCode",
                            "cancelGracePeriodDays": "$paymentRateInfo.applyInfo.cancelGracePeriodDays",
                            "updatePaymentRateIds": "$updatePaymentRateIds",
                            "deletePaymentRateCodes": "$deletePaymentRateCodes",
                            "minAmountCharge": "$minAmountCharge",
                            "maxAmountCharge": "$maxAmountCharge",
                            "fileAuth": "$fileAuth",
                            "fileIdentity": "$fileIdentity",
                            "fileProtocol": "$fileProtocol",
                            "fileIRR": "$fileIRR",
                            "fileOther": "$fileOther",
                            "submitType": "save"
                        }
                    }
                }
            ],
            "fieldSet": [
                {
                    "title": "机构基本信息",
                    "controls": [
                        [
                            {
                              "type": "static",
                              "label": "机构名称:",
                              "name": "companyRegisterName"
                            },
                            {
                                "visibleOn": "operationType == 3 || operationType == 4",
                                "invisibleClear": false,
                                "type": "static",
                                "label": "费率单编号:",
                                "name": "paymentRateInfo.applyInfo.paymentApplyCode"
                            }
                        ],
                        [
                            {
                                "disabledOn": "operationType == 3 || operationType == 4",
                                "type": "select",
                                "label": "费率类型:",
                                "valueTemplate": "if(!paymentRateInfo || !paymentRateInfo.applyInfo.applyType){return applyTypes[0].value;}else{return paymentRateInfo.applyInfo.applyType;}",
                                "name": "paymentRateInfo.applyInfo.applyType",
                                "sourceName": "applyTypes"
                            },
                            {
                                "type": "static",
                                "label": "产品线:",
                                "name": "productName"
                            }
                        ],
                        [
                            {
                                "visibleOn": "productId == 'JZD' || productId == 'ZFD' || productId == 'JCD' || productId == 'BJD' || productId == 'JXJDD' || productId == 'JXJ' || productId == 'FDD'",
                                "type": "static",
                                "label": "行业:",
                                "invisibleClear": false,
                                "name": "industryLabel"
                            },
                            {
                                "visibleOn": "productId == 'DXJ' || productId == 'YMD'",
                                "type": "static",
                                "label": "主行业:",
                                "invisibleClear": false,
                                "name": "industryLabel"
                            },
                            {
                                "visibleOn": "paymentRateInfo.applyInfo.applyType == 2 && openLock != 1",
                                "type": "static",
                                "label": "联系人:",
                                "invisibleClear": false,
                                "name": "ownerName"
                            },
                            {
                                "visibleOn": "paymentRateInfo.applyInfo.applyType == 2 && operationType == 2 && openLock == 1",
                                "type": "text",
                                "label": "联系人:",
                                "invisibleClear": false,
                                "name": "ownerName"
                            }
                        ],
                        [
                            {
                                "visibleOn": "paymentRateInfo.applyInfo.applyType == 2 && openLock != 1",
                                "type": "static",
                                "label": "身份证号:",
                                "invisibleClear": false,
                                "name": "ownerIdentityCode"
                            },
                            {
                                "visibleOn": "paymentRateInfo.applyInfo.applyType == 2 && operationType == 2 && openLock == 1",
                                "type": "text",
                                "label": "身份证号:",
                                "invisibleClear": false,
                                "name": "ownerIdentityCode"
                            },
                            {
                                "visibleOn": "paymentRateInfo.applyInfo.applyType == 2 && openLock != 1",
                                "type": "static",
                                "label": "联系电话:",
                                "invisibleClear": false,
                                "name": "ownerCellphone"
                            },
                            {
                                "visibleOn": "paymentRateInfo.applyInfo.applyType == 2 && operationType == 2 && openLock == 1",
                                "type": "text",
                                "label": "联系电话:",
                                "invisibleClear": false,
                                "name": "ownerCellphone"
                            }
                        ],
                        [

                            {
                                "visibleOn": "paymentRateInfo.applyInfo.applyType == 2 && operationType == 2 && openLock != 1",
                                "type": "button",
                                "name": "openLock",
                                "invisibleClear": false,
                                "eventName": "openLock",
                                "label": "解锁"
                            }
                        ]
                    ]
                },
                {
                    "title": "产品分期及费率方案",
                    "controls": [
                        {
                            "type": "finbox-pcrm-rate-table",
                            "name": "rateDetailTableData"
                        },
                        {
                            "type": "hidden",
                            "name": "productId"  
                        },
                        {
                            "type": "hidden",
                            "name": "priceMultiplierSwitch"  
                        },
                        {
                            "type": "hidden",
                            "name": "priceMultiplierPolicyId"  
                        },
                        {
                            "type": "hidden",
                            "name": "delayRepaymentDays"  
                        },
                        {
                            "type": "hidden",
                            "name": "minAmountCharge"  
                        },
                        {
                            "type": "hidden",
                            "name": "maxAmountCharge"  
                        },
                        {
                            "type": "hidden",
                            "name": "isAllowPriceMultiplier"
                        }
                    ]
                },
                {
                    "visibleOn": "productId != 'BJD'",
                    "title": "退款参数",
                    "controls": [
                        [
                            {
                                "visibleOn": "productId == 'JZD' || productId == 'YMD' || productId == 'JCD' || productId == 'DXJ'",
                                "disabledOn": "operationType == 4 || operationType == 3 || productId == 'JZD' || productId == 'YMD' || productId == 'JCD'",
                                "type": "select",
                                "label": "退款类型:",
                                "invisibleClear": false,
                                "valueTemplate": "if(!paymentRateInfo || !paymentRateInfo.applyInfo.refundType){return refundTypes[0].value;}else{return paymentRateInfo.applyInfo.refundType;}",
                                "name": "paymentRateInfo.applyInfo.refundType",
                                "sourceName": "refundTypes"
                            },
                            {
                                "visibleOn": "productId == 'JZD' || productId == 'DXJ' || productId == 'JCD' || productId == 'ZFD' || productId == 'YMD'",
                                "disabledOn": "operationType == 4 || operationType == 3 || productId == 'YMD'",
                                "type": "select",
                                "label": "贴息摊销类型:",
                                "valueTemplate": "if(!paymentRateInfo || !paymentRateInfo.applyInfo.amortizationType){return amortizationTypes[0].value;}else{return paymentRateInfo.applyInfo.amortizationType;}",
                                "name": "paymentRateInfo.applyInfo.amortizationType",
                                "invisibleClear": false,
                                "sourceName": "amortizationTypes"
                            }
                        ],
                        [
                            {
                                "visibleOn": "productId == 'JZD' || productId == 'DXJ' || productId == 'JCD' || productId == 'ZFD'",
                                "disabledOn": "operationType == 4 || operationType == 3",
                                "type": "text",
                                "label": "机构免息期:",
                                "invisibleClear": false,
                                "valueTemplate": "if(operationType==1){if(productId=='DXJ'){return 30;}if(productId=='JZD' || productId=='JCD'){return 0;}if(productId=='ZFD'){return 5;}}else{return paymentRateInfo.applyInfo.institutionInterestFreeDays;}",
                                "name": "paymentRateInfo.applyInfo.institutionInterestFreeDays",
                                "validations": {
                                    "required": true,
                                    "pattern": /^\d+$/,
                                    "message": "请输入数字"
                                }
                            },
                            {
                                "visibleOn": "productId == 'JZD' || productId == 'DXJ' || productId == 'JCD' || productId == 'ZFD'",
                                "disabledOn": "operationType == 4 || operationType == 3",
                                "type": "text",
                                "label": "客户免息期:",
                                "invisibleClear": false,
                                "valueTemplate": "if(operationType==1){if(productId=='DXJ'){return 30;}if(productId=='JZD' || productId=='JCD' || productId=='ZFD'){return 0;}}else{return paymentRateInfo.applyInfo.userInterestFreeDays;}",
                                "name": "paymentRateInfo.applyInfo.userInterestFreeDays",
                                "validations": {
                                    "required": true,
                                    "pattern": /^\d+$/,
                                    "message": "请输入数字"
                                }
                            }
                        ],
                        [
                            {
                                "visibleOn": "productId == 'YMD'",
                                "type": "static",
                                "label": "机构免息期:",
                                "valueTemplate": "if(operationType==1){return 7;}else{return paymentRateInfo.applyInfo.institutionInterestFreeDays;}",
                                "invisibleClear": false,
                                "name": "paymentRateInfo.applyInfo.institutionInterestFreeDays"
                            },
                            {
                                "visibleOn": "productId == 'YMD'",
                                "type": "static",
                                "label": "客户免息期:",
                                "valueTemplate": "if(operationType==1){return 7;}else{return paymentRateInfo.applyInfo.userInterestFreeDays;}",
                                "invisibleClear": false,
                                "name": "paymentRateInfo.applyInfo.userInterestFreeDays"
                            }
                        ],
                        [
                            {
                                "visibleOn": "productId == 'DXJ'",
                                "disabledOn": "operationType == 4 || operationType == 3",
                                "type": "text",
                                "label": "退款违约金比例%:",
                                "name": "paymentRateInfo.applyInfo.userRefundViolateRate",
                                "validations": {
                                    "required": true,
                                    "pattern": /(^[1-9][0-9]*|^0)([.][0-9]{2})$/,
                                    "message": "请输入两位小数"
                                }
                            },
                            {
                                "visibleOn": "productId == 'DXJ' || productId == 'YMD'",
                                "disabled": true,
                                "type": "select",
                                "label": "是否允许部分退款:",
                                "name": "paymentRateInfo.applyInfo.isSectionRefund",
                                "valueTemplate": "if(operationType==1){return 1;}else{return paymentRateInfo.applyInfo.isSectionRefund;}",
                                "sourceName": "is_section_refund"
                            }
                        ]
                    ]
                },
                {
                    "visibleOn": "productId == 'ZFD'",
                    "title": "还款日参数",
                    "controls": [
                        [
                            {
                                "type": "select",
                                "label": "还款日配置类型:",
                                "name": "paymentRateInfo.applyInfo.prepaymentDayType",
                                "options": [
                                    {
                                        "label": "机构统一",
                                        "value": "1"
                                    },
                                    {
                                        "label": "用户自选",
                                        "value": "2"
                                    }
                                ]
                            },
                            {
                                "visibleOn": "paymentRateInfo.applyInfo.prepaymentDayType == 1",
                                "type": "text",
                                "label": "还款日提前天数:",
                                "name": "paymentRateInfo.applyInfo.prepaymentDayNum",
                                "validations": {
                                    "required": true,
                                    "pattern": /^([0-9]|(1[0-5]))$/,
                                    "message": "请输入小于15的整数"
                                }
                            }
                        ]
                    ]
                },
                {
                  "visibleOn": "productId == 'DXJ'",
                  "title": "提前还款参数",
                  "controls": [
                    [
                      {
                        "disabledOn": "operationType == 4 || operationType == 3",
                        "type": "select",
                        "name": "paymentRateInfo.applyInfo.isAllowPrepayment",
                        "label": "是否允许提前还款:",
                        "value": "1",
                        "options": [
                            {
                                "label": "允许",
                                "value": "1"
                            },
                            {
                                "label": "不允许",
                                "value": "0"
                            }
                        ]
                      },
                      {
                        "visibleOn": "paymentRateInfo.applyInfo.isAllowPrepayment == 1",
                        "disabledOn": "operationType == 4 || operationType == 3",
                        "type": "text",
                        "name": "paymentRateInfo.applyInfo.prepaymentViolateRate",
                        "label": "提前还款违约金比例%:",
                        "validations": {
                            "required": true,
                            "pattern": /(^[1-9][0-9]*|^0)([.][0-9]{2})$/,
                            "message": "请输入两位小数"
                        }
                      }
                    ]
                  ]
                },
                {
                  "visibleOn": "productId == 'DXJ'",
                  "title": "宽限期参数",
                  "controls": [
                    [
                      {
                        "disabledOn": "operationType == 4 || operationType == 3",
                        "type": "select",
                        "name": "paymentRateInfo.applyInfo.isAllowCancelGrace",
                        "label": "是否允许宽限期内撤销:",
                        "options": [
                            {
                                "label": "允许",
                                "value": "1"
                            },
                            {
                                "label": "不允许",
                                "value": "0"
                            }
                        ]
                      },
                      {
                        "visibleOn": "paymentRateInfo.applyInfo.isAllowCancelGrace == 1",
                        "disabledOn": "operationType == 4 || operationType == 3",
                        "type": "text",
                        "invisibleClear": false,
                        "name": "paymentRateInfo.applyInfo.cancelGracePeriodDays",
                        "label": "撤销宽限期天数:",
                        "validations": {
                            "required": true,
                            "pattern": /^(\d|[1-9]\d|100)$/,
                            "message": "请输入两位小数"
                        }
                      }
                    ]
                  ]
                },
                {
                  "title": "上传附件",
                  "controls": [
                    [
                      {
                        "visibleOn": "paymentRateInfo.applyInfo.applyType == 2",
                        "disabledOn": "operationType == 4 || operationType == 3",
                        "type": "file",
                        "name": "fileAuth",
                        "label": "联系人授权书",
                        "reciever": "/access/imageupload",
                        "maxLength": 1,
                        "accept": "application/*,image/png,image/jpg,image/jpeg",
                        "maxSize": 104857600,
                        "spaceVisible": false,
                        "desc": "*支持上传格式：msg,oft,eml,word,excel,pdf,png,jpg,jpeg, 最多可上传1个文件, 单个文件大小不超过100.00M"
                      },
                      {
                        "visibleOn": "paymentRateInfo.applyInfo.applyType == 2",
                        "disabledOn": "operationType == 4 || operationType == 3",
                        "type": "file",
                        "name": "fileIdentity",
                        "label": "联系人身份证",
                        "reciever": "/access/imageupload",
                        "maxLength": 1,
                        "accept": "application/*,image/png,image/jpg,image/jpeg",
                        "maxSize": 104857600,
                        "spaceVisible": false,
                        "desc": "*支持上传格式：msg,oft,eml,word,excel,pdf,png,jpg,jpeg, 最多可上传1个文件, 单个文件大小不超过100.00M"
                      }
                    ],
                    [
                      {
                        "visibleOn": "paymentRateInfo.applyInfo.applyType == 3 && productId != 'DJD'",
                        "disabledOn": "operationType == 4 || operationType == 3",
                        "type": "file",
                        "name": "fileProtocol",
                        "label": "补充协议",
                        "reciever": "/access/imageupload",
                        "maxLength": 1,
                        "accept": "application/*,image/png,image/jpg,image/jpeg",
                        "maxSize": 104857600,
                        "spaceVisible": false,
                        "desc": "*支持上传格式：msg,oft,eml,word,excel,pdf,png,jpg,jpeg, 最多可上传1个文件, 单个文件大小不超过100.00M"
                      },
                      {
                        "visibleOn": "productId != 'DJD'",
                        "disabledOn": "operationType == 4 || operationType == 3",
                        "type": "file",
                        "name": "fileIRR",
                        "label": "IRR特批邮件",
                        "reciever": "/access/imageupload",
                        "maxLength": 1,
                        "accept": "application/*,image/png,image/jpg,image/jpeg",
                        "maxSize": 10485760,
                        "spaceVisible": false,
                        "desc": "*支持上传格式：msg,oft,eml,word,excel,pdf,png,jpg,jpeg, 最多可上传1个文件, 单个文件大小不超过10.00M"
                      },
                      {
                        "disabledOn": "operationType == 4 || operationType == 3",
                        "type": "file",
                        "name": "fileOther",
                        "label": "其它附件",
                        "reciever": "/access/imageupload",
                        "maxLength": 1,
                        "accept": "application/*,image/png,image/jpg,image/jpeg",
                        "maxSize": 104857600,
                        "desc": "*支持上传格式：msg,oft,eml,word,excel,pdf,png,jpg,jpeg, 最多可上传1个文件, 单个文件大小不超过100.00M"
                      }
                    ]
                  ]
                },
                {
                  "title": "备注",
                  "controls": [
                    [
                      {
                        "disabledOn": "operationType == 3 || operationType == 4",
                        "type": "textarea",
                        "name": "paymentRateInfo.applyInfo.applyNote"
                      }
                    ]
                  ]
                },
                {
                  "visibleOn": "operationType==4",
                  "title": "审批备注",
                  "controls": [
                    [
                      {
                        "disabledOn": "operationType == 3",
                        "type": "textarea",
                        "name": "audit_note"
                      }
                    ]
                  ]
                },
                {
                    "visibleOn": "operationType == 3 || operationType == 4",
                    "title": "操作记录",
                    "controls": [
                      {
                        "type": "table",
                        "name": "processLogList",
                        "columns": [
                            {
                                "label": "创建时间",
                                "name": "createTime"
                            },
                            {
                                "label": "操作人ID",
                                "name": "operatorUcid"
                            },
                            {
                                "label": "操作人姓名",
                                "name": "operatorName"
                            },
                            {
                                "label": "操作类型",
                                "name": "operatorType"
                            },
                            {
                                "label": "备注",
                                "name": "remarks"
                            }
                        ]
                      }
                    ]
                }
            ]
        }
    ]
}
