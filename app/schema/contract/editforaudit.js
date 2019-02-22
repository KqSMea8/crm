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
            "perPageField":"rn",
            "defaultParams":{
                "rn":"10"
            },
            "filter":{
                "title":"查询条件",
                "submitText":"查询",
                "exportText":"重置",
                "mode":"horizontal",
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
                            "source":"/contract/api/getpaymentapplylistmeta?metaType=product_id"
                        }
                    ],
                    [
                        {
                            "type":"select",
                            "name":"apply_type",
                            "label":"费率单类型",
                            "source":"/contract/api/getpaymentapplylistmeta?metaType=rate_type"
                        },
                        {
                            "type":"text",
                            "name":"channel_id",
                            "label":"运营单位"
                        },
                        {
                            "type":"daterangeless",
                            "name":"submit_time",
                            "valueFormat":"yyyy-MM-dd",
                            "label":"提交时间",
                            "disabled":false,
                            "validations": {
                                "type": "array",
                                "required": false,
                                "message": "请输入时间段",
                                "len": 2,
                                "fields": {
                                    "0": {"type": "string", "message": "开始时间" },
                                    "1": {"type": "string", "message": "结束时间" }
                                }
                            }
                        }
                    ]

                ],
                "actions": [
                    {
                        "type": "button",
                        "actionType": "ajax",
                        "level": "info",
                        "label": "查询"
                    },
                    {
                        "visibleOn": "data.FddExport",
                        "type": "button",
                        "level": "info",
                        "label": "导出",
                        "actionType": "url",
                        "url": "/ccrm/bo/exportpersonbo?customer_name=$customer_name&mobile_no=$mobile_no&product_code=$product_code&follow_status=$follow_status&leads_source=$leads_source&city=$city&apply_time=$apply_time&allocate_time=$allocate_time&follow_posid=$follow_posid"
                    }
                ]
            },

            "toolbarInline":true,
            "columns":[
                {
                    "sortable": true,
                    "name":"payment_apply_code",
                    "label":"费率单编号"
                },
                {
                    "sortable": true,
                    "name":"apply_type",
                    "label":"费率单类型	"
                },
                {
                    "name":"channel_id",
                    "label":"产品线"
                },
                {
                    "name":"status",
                    "label":"费率单状态	"
                },
                {
                    "name":"company_register_name",
                    "label":"公司注册名称"
                },
                {
                    "name":"contact_name",
                    "label":"联系人姓名	"
                },
                {
                    "label": "联系人身份证号",
                    "name": "contact_identify_code"
                },
                {
                    "type":"operation",
                    "label":"操作",
                    "width": "200",
                    "align": "center",
                    "buttons":[

                        {
                            "type":"button",
                            "size": "small",
                            "level":"success",
                            "label":"查看",
                            "actionType":"ajax",
                            "disabledOn":"data.status ==1",
                            "confirmText":"确定要提交审核吗？",
                            "api":"http://API_PRODUCT/ftrans/product/audit?id=$id&productId=$productId&auditStatus=2&aduitUser=$AMIS_USER"
                        }
                    ]
                }
            ]
        }
    ]
}