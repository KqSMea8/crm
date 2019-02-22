<?php
header('Content-Type: text/json');
echo json_encode(array(
    // 判断当前页面有无访问权限
    status => 0,
    msg => "success",
    data => array(
        isCan => true
    )
));