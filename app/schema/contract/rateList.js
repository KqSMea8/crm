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
  "title":"费率列表",
  "body":[
    {
      "name":"amis-admin-pages",
      "type":"crud",
      "api":"/contract/api/getpaymentapplyinfo",
      "perPageField":"size",
      "pageField":"page",
      "defaultParams":{
        "size":"10",
      },
      "filter":{
        "title":"查询条件",
        "mode":"horizontal",
        "labelWidth":"121",
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
              "type":"select",
              "name":"status",
              "label":"费率状态",
              "options": [
                {
                  "label": "全部",
                  "value": ""
                }],
              "value": "",
              "source":"/contract/api/getpaymentapplylistmeta?metaType=status"
            }
          ],
          [
            {
                "name": "pos_id",
                "type": "select-async",
                "label": "负责BD",
                "remote":true,
                "multiple": false,
                "clearable": true,
                "source": "/crmbase/api/fuzzysearchbdname",
                "firstLoading": false,
                "optionAliseMap":{
                  "pos_name": "label",
                  "bd_posid": "value"
                }
            },
            {
                "type":"daterangeless",
                "name":"submit_time",
                "valueFormat":"yyyy-MM-dd",
                "label":"提交时间",
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
              "type": "plain",
              "name": "plainOne"
            }
          ]
        ]
      },
      "toolbarInline":true,
      "switchPerPage":false,
      "showJumper":false,
      "columns":[
        {
          "name":"payment_apply_code",
          "width": "160",
          "label":"费率单编号"
        },
        {
          "name":"apply_type",
          "width": "100",
          "label":"费率单类型	"
        },
        {
          "name":"product_id",
          "width": "100",
          "label":"产品线"
        },
        {
          "name":"status",
          "width": "120",
          "label":"费率单状态	"
        },
        {
          "name":"company_register_name",
          "width": "220",
          "label":"公司注册名称"
        },
        {
          "name":"contact_name",
          "width": "100",
          "label":"联系人姓名	",
        },
        {
          "label": "联系人身份证号",
          "width": "170",
          "name": "contact_identify_code"
        },
        {
          "label": "联系人电话",
          "width": "120",
          "name": "contact_phone"
        },
        {
          "label": "运营单位",
          "name": "channel_id"
        },
        {
          "label": "负责BD",
          "width": "120",
          "name": "pos_bd"
        },
        {
          "label": "提交时间",
          "width": "170",
          "name": "submit_time"
        },
        {
          "type":"operation",
          "label":"操作",
          "width": "180",
          "align": "center",
          "buttons":[
            {
              "visibleOn":"rowData.operation.open == 1",
              "type": "button",
              "size": "mini",
              "level": "success",
              "label": "查看",
              "actionType": "link",
              "link": "/pcrm/group/contract/rateDetail?operationType=3&paymentApplyCode=$rowData.payment_apply_code"
            },
            {
              "visibleOn":"rowData.operation.edit == 1",
              "type": "button",
              "size": "mini",
              "level": "primary",
              "label": "编辑",
              "actionType": "link",
              "link": "/pcrm/group/contract/rateDetail?operationType=2&companyId=$rowData.company_id"
            }
          ]
        }
      ]
    }
  ]
}