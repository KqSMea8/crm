
<?php
header('Content-Type: text/json');
echo json_encode(array(
    // 获取菜单数据
    status => 0,
    msg => "success",
    data => array(
        count => 7445,
        rows => array(
                       array(
                           payment_apply_code => "345345345345345",
                           company_id => 303530,
                           apply_type => "初始费率",
                           product_id => "教育",
                           status => "未提交",
                           company_register_name => "上海市震旦进修学院",
                           contact_name => "张静",
                           contact_identify_code => "234242342",
                           contact_phone => "187255656688",
                           channel_id => "QA测试",
                           pos_bd => "上分一线BD-A1",
                           submit_time => "2017-11-14 20:51:43",
                           operation => array(
                               open => 1,
                               edit => 0
                           )
                       ),
                        array(
                          payment_apply_code => "2342342342343",
                          company_id => 303530,
                          apply_type => "初始费率",
                          product_id => "教育",
                          status => "未提交",
                          company_register_name => "上海市震旦进修学院",
                          contact_name => "刘青",
                          contact_identify_code => "2333333",
                          contact_phone => "123123123",
                          channel_id => "QA测试",
                          pos_bd => "上分一线BD-A1",
                          submit_time => "2017-11-14 20:51:43",
                          operation => array(
                              open => 0,
                              edit => 1
                          )
                      ),
                       array(
                         payment_apply_code => "234234234234234",
                         company_id => 303530,
                         apply_type => "初始费率",
                         product_id => "教育",
                         status => "未提交",
                         company_register_name => "上海市震旦进修学院",
                         contact_name => "王哲",
                         contact_identify_code => "3242342423423423423",
                         contact_phone => "2342423424234",
                         channel_id => "QA测试",
                         pos_bd => "上分一线BD-A1",
                         submit_time => "2017-11-14 20:51:43",
                         operation => array(
                             open => 1,
                             edit => 1
                         )
                         )
                )
    )
));
