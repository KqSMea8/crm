/**
 * @file corpList.js
 * @description 准入模块-机构管理列表
 * @author zengqingzhuang(zengqingzhuang@baidu.com)
 * @since  2017-10-21
 */
/* eslint-disable */
export default
{
    "$schema":"http://amis.baidu.com/schemas/page.json",
    "title":"费率审核列表",
    "body":[
        {
            "name":"amis-admin-pages",
            "type":"crud",
            "api":"/contract/api/getpaymentapplyinfoforaudit",
            "perPageField":"size",
            "pageField":"page",
            "defaultParams":{
                "size":"10"
            },
            "filter":{
                "title":"查询条件",
                "mode":"horizontal",
                "reset": true,
                "controls":[
                    [
                        {
                            "type":"text",
                            "name":"payment_apply_code",
                            "label":"费率单编号"
                        }, {
                        "type":"text",
                        "name":"company_register_name",
                        "label":"公司注册名称"
                    },
                        {
                            "type":"select",
                            "name":"product_id",
                            "label":"产品线",
                            "options": [
                                {
                                    "label": "全部",
                                    "value": ""
                                }],
                            "value": "",
                            "source":"/contract/api/getpaymentapplylistmeta?metaType=product_id"
                        }
                    ],
                    [
                        {
                            "type":"select",
                            "name":"apply_type",
                            "label":"费率单类型",
                            "options": [
                                {
                                    "label": "全部",
                                    "value": ""
                                }],
                            "value": "",
                            "source":"/contract/api/getpaymentapplylistmeta?metaType=rate_type"
                        },
                        {
                            "name": "channel_id",
                            "type": "select-async",
                            "label": "运营单位",
                            "remote":true,
                            "multiple": false,
                            "clearable": true,
                            "source": "/crmbase/api/fuzzysearchchannelinfo",
                            "firstLoading": false,
                            "optionAliseMap":{
                              "meta_value": "label",
                              "meta_desc": "value"
                            }
                        },
                        {
                            "type":"daterange",
                            "name":"submit_time",
                            "valueFormat":"yyyy-MM-dd",
                            "label":"提交时间"
                        }

                    ]

                ]
            },

            "toolbarInline":true,

            "bulkActions": [{
                    "label": "批量通过",
                    "actionType": "dialog",
                    "level": "primary",
                    "type": "button",
                    "size": "mini",
                    "dialog": {
                        "width": "500",
                        "title": "提示",
                        "body":{
                            "type": "form",
                            "name":"batch_audit_dialog",
                            "controls":[
                                {"type": "static","label": "", "name":"batch_audit_message","value":"是否批量提交审核?"}
                            ],
                            "actions": [
                                {
                                    "api": "/contract/api/approvalpaymentrateinfo?a=$company_register_name&payment_apply_code=$rowData.payment_apply_code&status=pass&operationType=4",
                                    "type": "submit",
                                    "level": "primary",
                                    "duration" : 0, // 提交成功后的消息提示不自动消失
                                    "label": "确定"
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
                }],
            "columns":[
                {
                    "name":"payment_apply_code",
                    "width": "180",
                    "label":"费率单编号"
                },
                {
                    "name":"apply_type",
                    "width": "120",
                    "label":"费率单类型"
                },
                {
                    "name":"company_register_name",
                    "label":"公司注册名称",
                    "width": "380"
                },
                {
                    "name":"product_id",
                    "width": "120",
                    "label":"产品线"
                },
                {
                    "name":"contact_name",
                    "label":"联系人"
                },
                {
                    "name":"contact_phone",
                    "width": "120",
                    "label":"联系电话"
                },
                {
                    "name":"user_name",
                    "label":"提交人"
                },
                {
                    "name":"submit_time",
                    "width": "200",
                    "label":"提交时间"
                },
                {
                    "name":"contract_status",
                    "width": "120",
                    "label":"主合同状态"
                },
                {
                    "name":"status",
                    "width": "120",
                    "label":"当前状态"
                },
                {
                    "type":"operation",
                    "label":"操作",
                    "width": "100",
                    "align": "center",
                    "buttons":[
                        {
                            "type": "button",
                            "size": "mini",
                            "level": "success",
                            "label": "审核",
                            "link": "/pcrm/group/contract/rateDetail?operationType=4&paymentApplyCode=$rowData.payment_apply_code",
                            "actionType": "link"
                        }
                    ]
                }
            ]
        }
    ]
}