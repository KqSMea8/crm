<?php
header('Content-Type: text/json');
echo json_encode(array(
    // 获取菜单数据
    status => 0,
    msg => "success",
    data => array(
       array(
           label => "产品线",
           value => "1"
       ),
       array(
           label => "状态",
           value => "2"
       ),
       array(
           label => "分期方式",
           value => "3"
       )
    )
));
