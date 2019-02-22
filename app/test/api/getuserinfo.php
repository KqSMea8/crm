<?php
header('Content-Type: text/json');
echo json_encode(array(
    // 获取用户信息
    status => 0,
    msg => "success",
    data => array(
        loginState => true,
        account => "dht02",
        userId => 20154173,
        posId => "",
        role => 0
    )
));