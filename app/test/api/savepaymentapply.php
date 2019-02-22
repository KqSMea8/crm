<?php
header('Content-Type: text/json');
echo json_encode(array(
    status => 0,
    msg => "成功",
    data => array(
        "paymentApplyCode" => "00320171109000001"
    )
));