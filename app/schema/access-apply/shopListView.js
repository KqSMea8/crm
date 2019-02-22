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
    "title":"机构管理列表",
    "body":[
        {
            "name":"amis-admin-pages",
            "type":"crud",
            "api":"/access/api/getcompanylist",
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
                            "clearable": false,
                            "source": "/access/api/commonmetainfo?metaType=province_city"
                        }
                    ],
                    [
                        {
                            "type":"select",
                            "name":"apply_source",
                            "label":"申请来源",
                            "options": [
                                {
                                    "label": "全部",
                                    "value": ""
                                }],
                            "source":"/access/api/commonmetainfo?metaType=apply_source"
                        },
                        {
                            "type":"select",
                            "name":"status",
                            "label":"机构状态",
                            "options": [
                                {
                                    "label": "全部",
                                    "value": ""
                                }],
                            "source":"/access/api/commonmetainfo?metaType=status"
                        },
                        {
                            "type":"select",
                            "name":"status",
                            "label":"渠道",
                            "options": [
                                {
                                    "label": "全部",
                                    "value": ""
                                }],
                            "source":"/access/api/commonmetainfo?metaType=channel_list"
                        }
                    ],
                    [{
                        "type":"daterangeless",
                        "name":"access_success_time",
                        "valueFormat":"yyyy-MM-dd",
                        "label":"准入成功时间",
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
                            "type":"select",
                            "name":"product_id",
                            "label":"产品线",
                            "options": [
                                {
                                    "label": "全部",
                                    "value": ""
                                }],
                            "source":"/access/api/commonmetainfo?metaType=products_list"
                        },
                        {

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
                    "label":"准入成功时间	",
                    "width":"220"
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
                    "label": "机构状态",
                    "name": "status",
                    "width":"170"
                },
                {
                    "type":"operation",
                    "label":"操作",
                    "width": "200",
                    "align": "center",
                    "buttons":[
                        {
                            "visibleOn":"data.perminfo.viewdetailspage == true",
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "查看详情",
                            "actionType": "url",
                            "url": "/access/apply/baifubaolistview?company_id=$company_id"
                        },
                        {
                            "visibleOn":"data.perminfo.is_modify == true",
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "修改信息",
                            "actionType": "url",
                            "url": "/access/apply/editforaudit?is_edit=2&company_id=$company_id&type=2"
                        },
                        {
                            "visibleOn":"data.perminfo.modelcontractadd == true",
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "创建范本合同",
                            "actionType": "url",
                            "url": "/contract/getdetail?operationType=1&company_id=$company_id&contract_type=1"
                        },
                        {
                            "visibleOn":"data.perminfo.contractadd == true",
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "创建非范本合同",
                            "actionType": "url",
                            "url": "/contract/getdetail?operationType=1&company_id=$company_id&contract_type=2"
                        },
                        {
                            "visibleOn":"data.perminfo.agreementadd == true",
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "创建补充协议",
                            "actionType": "url",
                            "url": "/contract/getdetail?operationType=1&company_id=$company_id&contract_type=3"
                        },
                        {
                            "visibleOn":"data.perminfo.virtualcontractadd == true",
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "创建虚拟合同",
                            "actionType": "url",
                            "url": "/contract/etdetail?operationType=1&company_id=$company_id&contract_type=4"
                        },
                        {
                            "visibleOn":"data.perminfo.paymentrateadd == true",
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "创建费率",
                            "actionType": "url",
                            "url": "/contract/paymentrateinit?operationType=1&companyId=$company_id"
                        },
                        {
                            "visibleOn":"data.perminfo.changeRate == true",
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "变更费率",
                            "actionType": "url",
                            "url": "/contract/paymentrateinit?operationType=1&companyId=$company_id"
                        },
                        {
                            "visibleOn":"data.perminfo.changeaccount == true",
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "变更账户",
                            "actionType": "url",
                            "url": "/contract/bankchange?company_id=$company_id"
                        },
                        {
                            "visibleOn":"data.perminfo.merchantadd == true",
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "创建商户",
                            "actionType": "url",
                            "url": "/contract/merchantadd_foraudit?access_company_id=$company_id"
                        },
                        {
                            "visibleOn":"data.perminfo.baifubaoadd == true",
                            "type": "button",
                            "size": "mini",
                            "level": "text",
                            "label": "开通百度钱包商户号",
                            "actionType": "url",
                            "url": "/access/apply/baifubaoinfoview?company_id=$company_id&request=apply&type=1"
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
                                            "type": "hidden",
                                            "name": "company_id",
                                            "label": "公司注册名称"
                                        },
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
                                            "label": "确认分配",
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