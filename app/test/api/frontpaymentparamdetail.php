<?php
header('Content-Type: text/json');
echo json_encode(array(
    status => 0,
    msg => "success",
    data => array(
        "id" => "409",
        "payment_rate_code" => "00520170914000015", // 分期计划编号
        "payment_apply_code" => "00320170914000005", // 费率单号
        "repayment_no" => "1",
        "interest_rule" => "按利率", // 利息计算规则
        "interest_ymdflag" => "日利率", // 利息年月日标志
        "interest_value" => "5", // 利息
        "penalty_rule" => "按利率", // 罚息计算规则
        "penalty_ymdflag" => "日利率", // 罚息年月日标志
        "penalty_value" => "0", // 罚息
        "charges_rule" => "按利率", // 费用计算规则
        "charges_ymdflag" => null, //费用年月日标志
        "charges_value" => "0", // 费用
        "overdue_rule" => null, //逾期费计算规则
        "overdue_ymdflag" => null, //逾期费年月日标志
        "overdue_value" => "-1",  //逾期费
        "violate_prepay_rule" => "按利率", // 提前还款违约金计算规则
        "violate_prepay_ymdflag" => null, // 提前还款违约金年月日标志
        "violate_prepay_value" => "150", // 提前还款违约金
        "violate_refund_rule" => null, // 退款违约金计算规则
        "violate_refund_ymdflag" => null, // 退款违约金年月日标志
        "violate_refund_value" => "-1", // 退款违约金
        "change_plan_rule" => null, // 分期计划变更服务费计算规则
        "change_plan_ymdflag" => null, // 分期计划变更服务费年月日标志
        "change_plan_value" => "-1",// 分期计划变更服务费
        "account_management_rule" => "按利率", // 账号管理费计算规则
        "account_management_ymdflag" => null, // 账号管理费年月日标志
        "account_management_value" => "100", // 账号管理费
        "product_id" => "大额现金贷", // 产品线
        "status" => "生效", // 状态
        "create_time" => "0000-00-00 00:00:00", // 创建时间
        "modify_time" => "2017-09-14 16:36:49", // 修改时间
        "repayment_type" => "等额本息", // 分期方式
        "total_instalment_num" => "36", // 总期数
        "irr" => "0", //irr 
        "effect_time" => "2017-09-14 16:36:49",  // 生效时间
        "pos_bd" => "上分一线BD-A1"  // 负责BD
   )
));
