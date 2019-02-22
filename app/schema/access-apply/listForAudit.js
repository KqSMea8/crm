/**
 * @file listForAudit.js
 * @description
 * @author
 * @since  2017-10-21
 */
/* eslint-disable */
export default
{
    "$schema":"http://amis.baidu.com/schemas/page.json",
    "title":"准入申请列表",
    "body":[
        {
            "type": "button",
            "actionType": "link",
            "label": "申请准入",
            "link": "/access/apply/addforaudit"
        },
        {
            "name":"amis-admin-pages",
            "type":"crud",
            "api":"/access/api/getforauditlist",
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
                            "disabled":false,
                            "validations": [
                                {validator(rule, value, callback, source, options) {
                                    var errors = [];
                                    if(value && value[0] && value[1]) {
                                        if(new Date(value[0]).valueOf() > new Date(value[1]).valueOf()) {
                                            callback('最小时间不可大于最大时间!');
                                        }
                                    }
                                    callback(errors);
                                }}
                            ]
                        },
                        {
                            "type":"daterangeless",
                            "name":"submit_time",
                            "valueFormat":"yyyy-MM-dd",
                            "label":"最后提交时间",
                            "disabled":false,
                            "validations": [
                                {validator(rule, value, callback, source, options) {
                                        var errors = [];
                                        if(value && value[0] && value[1]) {
                                            if(new Date(value[0]).valueOf() > new Date(value[1]).valueOf()) {
                                                callback('最小时间不可大于最大时间!');
                                            }
                                        }
                                        callback(errors);
                                   }}]
                        }
                       ],
                    [{
                        "type":"select",
                        "name":"business_type",
                        "label":"机构业务类型",
                        "visibleOn": "data.product_id=='DXJ'||data.product_id=='YMD'",
                        "clearable":true,
                        "source":"/access/api/commonmetainfo?metaType=business_type&productId=$product_id"
                    },
                        {
                            "type": "cascader",
                            "name": "train_type_level_one",
                            "visibleOn": "data.product_id=='DXJ'",
                            "label": "机构主行业",
                            "inline": true,
                            "changeOnSelect": true,
                            "clearable": true,
                            "source": "/access/api/commonmetainfo?metaType=train_type_level_one&productId=$product_id"
                        },{}]

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
                    "name": "apply_type",
                    "width":"170"
                },
                {
                    "type":"operation",
                    "label":"操作",
                    "width": "200",
                    "align": "center",
                    "buttons":[
                        {
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "查看",
                            "actionType": "url",
                            "url":"/access/apply/infoforaudit?is_edit=1&company_id=$company_id&product_id=$product_id"
                        },
                        {
                            "visibleOn":"data.perminfo.bdassign == true",
                            "label": "分配",
                            "actionType": "dialog",
                            "level": "text",
                            "type": "button",
                            "size": "mini",
                            "dialog": {
                                "title": "分配",
                                "body":{
                                    "type": "form",
                                    "name": "sample_bulk_edit",
                                    "labelWidth": 120,
                                    "labelPosition": "left",
                                    "controls": [
                                        {
                                            "type": "static",
                                            "name": "company_register_name",
                                            "label": "公司注册名称"
                                        },
                                        {
                                            "type":"select",
                                            "name":"fp_pos_bd",
                                            "label":"负责BD",
                                            "value":"",
                                            "validations": {
                                                "required": true,
                                                "message": "请选择负责BD"
                                            },
                                            "remote":true,
                                            "clearable":true,
                                            "firstLoading":false,
                                            "optionAliseMap":{
                                                "pos_name": "label",
                                                "bd_posid": "value"
                                            },
                                            "source":"/crmbase/api/fuzzysearchbdname"
                                        }
                                    ],
                                    "actions": [
                                        {
                                            "api": {
                                                "url":"/access/api/distributebdforaudit",
                                                "data":{
                                                    "companyId":"$sample_bulk_edit.company_id",
                                                    "bd_posid":"$sample_bulk_edit.fp_pos_bd"
                                                }
                                            },
                                            "type": "submit",
                                            "level": "success",
                                            "label": "确认分配"
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
                            "visibleOn":"data.perminfo.modify == true",
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "编辑",
                            "actionType": "url",
                            "url": "/access/apply/editforaudit?is_edit=2&company_id=$company_id"
                        },
                        {
                            "visibleOn":"data.perminfo.delete == true",
                            "type": "button",
                            "size": "mini",
                            "actionType": "ajax",
                            "level": "text",
                            "label": "关闭",
                            "confirmText":"确定关闭吗",
                            "redirect": "/ccrm/group/business/edit?bo_ids=$id&product_code=$product_code&call_id=$call_id",
                            "api": "/ccrm/bo/callpersonbo?bo_id=$id&product_code=$product_code"
                        }

                    ]
                }
            ]
        }
    ]
}