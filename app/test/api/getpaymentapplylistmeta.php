<?php
header('Content-Type: text/json');
echo json_encode(array(
    // 获取菜单数据
    status => 0,
    msg => "success",
    data => array(
       array(
           label => "初始费率",
           value => "1"
       ),
       array(
           label => "其它费率",
           value => "2"
       )
    )
));
