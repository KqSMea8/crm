/**
 * @file corpList.js
 * @description 准入模块-机构审核列表
 * @author zengqingzhuang(zengqingzhuang@baidu.com)
 * @since  2017-10-21
 */
/* eslint-disable */
export default
{
    "$schema":"http://amis.baidu.com/schemas/page.json",
    "title":"机构审核列表",
    "body":[

        {
            "name":"amis-admin-pages",
            "type":"crud",
            "api":"/access/api/institutionforauditlist",
            "perPageField":"size",
            "pageField":"page",
            "defaultParams":{
                "size":"10",

            },
            "filter":{
                "title":"查询条件",
                "submitText":"查询",
                "exportText":"重置",
                "mode":"horizontal",
                "labelWidth":"121",
                "controls":[
                    [
                        {
                            "type":"text",
                            "name":"company_register_name",
                            "label":"公司注册名称"
                        },{
                        "type":"select",
                        "name":"bd_posid",
                        "label":"负责BD",
                        "remote":true,
                        "clearable":true,
                        "firstLoading":false,
                        "optionAliseMap":{
                            "pos_name": "label",
                            "bd_posid": "value"
                        },
                        "source":"/crmbase/api/fuzzysearchbdname"
                    },
                        {
                            "type": "cascader",
                            "name": "register_province",
                            "label": "机构所在省市:",
                            "inline": true,
                            "clearable": true,
                            "source": "/access/api/commonmetainfo?metaType=province_city"
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
                            "type":"select",
                            "name":"status",
                            "label":"申请状态",
                            "clearable":true,
                            "source":"/access/api/commonmetainfo?metaType=status"
                        },
                        {
                            "type":"select",
                            "name":"product_id",
                            "label":"产品线",
                            "clearable":true,
                            "source":"/access/api/commonmetainfo?metaType=products_list"
                        }
                    ],[ {
                        "type":"select",
                        "name":"apply_type",
                        "label":"申请类型",
                        "clearable":true,
                        "source":"/access/api/commonmetainfo?metaType=application_type"
                    },
                        {
                            "type":"daterangeless",
                            "name":"create_time",
                            "valueFormat":"yyyy-MM-dd",
                            "label":"申请创建时间",
                            "validations": [{validator(rule, value, callback, source, options) {
                                var errors = [];
                                if(value && value[0] && value[1]) {
                                    if(new Date(value[0]).valueOf() > new Date(value[1]).valueOf()) {
                                        callback('最小时间不可大于最大时间!');
                                    }
                                }
                                callback(errors);
                                }}
                                ],
                            "disabled":false
                        },
                        {
                            "type":"daterangeless",
                            "name":"submit_time",
                            "valueFormat":"yyyy-MM-dd",
                            "label":"最后提交时间",
                            "validations": [{validator(rule, value, callback, source, options) {
                            var errors = [];
                                if(value && value[0] && value[1]) {
                                    if(new Date(value[0]).valueOf() > new Date(value[1]).valueOf()) {
                                        callback('最小时间不可大于最大时间!');
                                    }
                                }
                                callback(errors);
                               }}
                            ],
                            "disabled":false
                        }
                    ],
                    [{
                        "type":"select",
                        "name":"business_type",
                        "label":"机构业务类型",
                        "visibleOn": "data.product_id=='DXJ'",
                        "clearable":true,
                        "source":"/access/api/commonmetainfo?metaType=business_type&productId=$product_id"
                    },
                        {},{}]

                ],

                "actions": [
                    {
                        "type": "button",
                        "actionType": "ajax",
                        "level": "primary",
                        "label": "查询"
                    },
                    {
                        "visibleOn": "data.FddExport",
                        "type": "button",
                        "level": "success",
                        "label": "导出",
                        "actionType": "url",
                        "url": "/ccrm/bo/exportpersonbo?customer_name=$customer_name&mobile_no=$mobile_no&product_code=$product_code&follow_status=$follow_status&leads_source=$leads_source&city=$city&apply_time=$apply_time&allocate_time=$allocate_time&follow_posid=$follow_posid"
                    }
                ]
            },
            "toolbarInline":true,
            "switchPerPage":false,
            "showJumper":false,
            "columns":[
                {
                    "name":"company_register_name",
                    "label":"公司注册名称",
                    "width":"270"
                },
                {
                    "name":"register_province",
                    "label":"机构所在省",
                    "width":"100"
                },
                {
                    "name":"register_city",
                    "label":"城市",
                    "width":"100"
                },
                {
                    "name":"product_name",
                    "label":"产品线",
                    "width":"120"
                },
                {
                    "name":"create_time",
                    "label":"申请创建时间",
                    "width":"220"
                },
                {
                    "name":"update_time",
                    "label":"最后提交时间	",
                    "width":"120"
                },
                {
                    "label": "负责BD",
                    "name": "pos_bd",
                    "width":"170"
                },
                {
                    "label": "渠道",
                    "name": "channel_id",
                    "width":"170"
                },
                {
                    "label": "申请来源",
                    "name": "apply_source",
                    "width":"170"
                },
                {
                    "label": "申请状态",
                    "name": "status",
                    "width":"170"
                },
                {
                    "label": "申请类型",
                    "name": "application_type",
                    "width":"170"
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
                            "level": "text",
                            "label": "审批",
                            "actionType": "url",
                            "url":"/access/apply/institutionforauditinfoview?company_id=$company_id"
                        }
                    ]
                }
            ]
        }
    ]
}
