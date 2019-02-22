<?php
header('Content-Type: text/json');
echo json_encode(array(
    // 获取用户信息
    status => 0,
    msg => "success",
    data => array(
        "irr" => "39.25"
    )
));