<?php
header('Content-Type: text/json');
echo json_encode(array(
    // 获取菜单数据
    status => 0,
    msg => "success",
    data => array(
        array(
            style => "el-icon-menu",
            name => "合同管理",
            children => array(
                array(
                    style => "el-icon-star-on",
                    name => "费率列表",
                    uri => "/pcrm/group/contract/rateList"
                ),
                array(
                    style => "el-icon-setting",
                    name => "费率审核列表",
                    uri => "/pcrm/group/contract/rateApproveList"               
                ),
                array(
                        style => "el-icon-setting",
                        name => "自主支付息费列表",
                        uri => "/pcrm/group/contract/selfPayRateList"
                )
            )
        ),
         array(
            style => "el-icon-menu",
            name => "商户准入管理",
            children => array(
                array(
                    style => "el-icon-setting",
                    name => "准入申请列表",
                    uri => "/pcrm/group/access/apply/listforaudit"
                ),
                 array(
                    style => "el-icon-setting",
                    name => "机构审核列表",
                    uri => "/pcrm/group/access/apply/institutionforauditlist"
                ),
                 array(
                        style => "el-icon-setting",
                        name => "机构管理列表",
                        uri => "/pcrm/group/access/shoplistview"
                )
            )
        ),
        array(
            style => "el-icon-menu",
            name => "银企直联管理",
            children => array(
                array(
                    style => "el-icon-setting",
                    name => "银企直联管理",
                    uri => "/pcrm/group/account/bbaccountlist"
                )
            )
        ),
        array(
            style => "el-icon-menu",
            name => "商机管理模块",
            children => array(
                array(
                    style => "fa fa-home",
                    name => "沟通平台登录",
                    uri => "/ccrm/group/communication/login"
                ),
                array(
                    style => "fa fa-home",
                    name => "房抵贷",
                    uri => "/ccrm/group/housebusiness/list"
                ),
                array(
                    style => "fa fa-jpy",
                    name => "现金贷公有池",
                    uri => "/ccrm/group/cashbusiness/publiclist"
                ),
                array(
                    style => "fa fa-jpy",
                    name => "现金贷私有池",
                    uri => "/ccrm/group/cashbusiness/privatelist"
                )
            )
        )
    )
));