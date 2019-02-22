<?php
header('Content-Type: text/json');
header("Content-type: text/html; charset=utf-8");
 $value ='{}';
 if($_GET["metaType"] == 'province_city') {
 echo '{"status":0,"msg":"成功","data":[{"value":"110000","label":"北京市","children":[{"value":"110100","label":"北京市"}]},{"value":"120000","label":"天津市","children":[{"value":"120100","label":"天津市"}]}]}';
 }
 else if($_GET["metaType"] == 'products_list') {
  echo '{"status":0,"msg":"\u6210\u529f","data":[{"value":"DXJ","label":"\u6559\u80b2"},{"value":"YMD","label":"\u533b\u7f8e"},{"value":"JZD","label":"\u5bb6\u88c5"},{"value":"ZFD","label":"\u79df\u623f"},{"value":"JCD","label":"\u5efa\u6750"},{"value":"BJD","label":"\u5ea6\u91d1\u8d37\u989d\u5ea6"}]}';
 }
 else if($_GET["metaType"] == 'product_id') {
  echo '{"status":0,"msg":"成功","data":[{"value":"JCD","label":"建材", {"value":"YMD","label":"医美"}]}';
 }
 else if($_GET["metaType"] == 'status') {
  echo '{"status":0,"msg":"成功","data":[{"value":1,"label":"未提交"},{"value":2,"label":"后台处理中"},{"value":22,"label":"后台处理失败"},{"value":3,"label":"bshop确认中"},{"value":23,"label":"bshop 驳回"},{"value":4,"label":"运营审核中"},{"value":24,"label":"运营审核驳回"},{"value":8,"label":"运营 二次审核中"},{"value":28,"label":"运营 二次审核驳回"},{"value":5,"label":"预算审核中"},{"value":25,"label":"预算驳回"},{"value":6,"label":"生效"},{"value":7,"label":"失效"},{"value":30,"label":"区域经理审核"},{"value":31,"label":"区域经理驳回"},{"value":32,"label":"行业经理审核"},{"value":33,"label":"行业经理驳回"}]}';
 }
 else if($_GET["metaType"] == 'train_type_level_one') {
   echo '{"status":0,"msg":"成功","data":[{"value":"10001","label":"高学历培训","children":[{"value":"20001","label":"考前辅导","children":[{"value":"30001","label":"考研培训"},{"value":"30002","label":"考MBA培训"},{"value":"30003","label":"公职培训"}]},{"value":"20002","label":"学位研修","children":[{"value":"30004","label":"在职研究生"},{"value":"30005","label":"统考MBA类专硕"},{"value":"30006","label":"非统考类学位研修"}]}]},{"value":"10002","label":"语言","children":[{"value":"20003","label":"英语类","children":[{"value":"30007","label":"考试英语"},{"value":"30008","label":"成人英语"},{"value":"30009","label":"少儿英语"}]},{"value":"20004","label":"非英语类","children":[{"value":"30010","label":"小语种"}]}]}]}';
 }
 else if($_GET["metaType"] == 'products_list') {
   echo '{"status":0,"msg":"\u6210\u529f","data":[{"value":"DXJ","label":"\u6559\u80b2"},{"value":"YMD","label":"\u533b\u7f8e"},{"value":"JZD","label":"\u5bb6\u88c5"},{"value":"ZFD","label":"\u79df\u623f"},{"value":"JCD","label":"\u5efa\u6750"},{"value":"BJD","label":"\u5ea6\u91d1\u8d37\u989d\u5ea6"}]}';
 }
 else if($_GET["metaType"] == 'application_type') {
   echo '{"status":0,"msg":"\u6210\u529f","data":[{"value":"1","label":"\u6b63\u5e38\u7533\u8bf7"},{"value":"2","label":"\u8fdd\u4f8b\u7533\u8bf7"},{"value":"3","label":"\u7279\u6279\u7533\u8bf7"}]}';
 }
else if($_GET["metaType"] == 'apply_source') {
    echo '{"status":0,"msg":"\u6210\u529f","data":[{"value":"1","label":"\u51e4\u5de2\u5ba2\u6237"},{"value":"2","label":"\u7cef\u7c73\u5ba2\u6237"},{"value":"3","label":"\u65b0\u5ba2\u6237"},{"value":"4","label":"BD\u521b\u5efa"}]}';
}
else if($_GET["metaType"] == 'business_type') {
    echo '{"status":0,"msg":"\u6210\u529f","data":[{"value":"1","label":"\u6b63\u5e38\u7533\u8bf7"},{"value":"2","label":"\u8fdd\u4f8b\u7533\u8bf7"},{"value":"3","label":"\u7279\u6279\u7533\u8bf7"}]}';
}
else if($_GET["metaType"] == 'channel_list') {
    echo '{"status":0,"msg":"\u6210\u529f","data":[{"value":"1","label":"\u6b63\u5e38\u7533\u8bf7"},{"value":"2","label":"\u8fdd\u4f8b\u7533\u8bf7"},{"value":"3","label":"\u7279\u6279\u7533\u8bf7"}]}';
}
/**
 * JCD
 */
else if($_GET["metaType"] == 'apply_source') {
    echo '{"status":0,"msg":"\u6210\u529f","data":[{"value":"1","label":"\u51e4\u5de2\u5ba2\u6237"},{"value":"2","label":"\u7cef\u7c73\u5ba2\u6237"},{"value":"3","label":"\u65b0\u5ba2\u6237"},{"value":"4","label":"BD\u521b\u5efa"}]}';
}
else if($_GET["metaType"] == 'company_type') {
    echo '{"status":0,"msg":"\u6210\u529f","data":[{"value":"1","label":"\u5356\u573a\u5355\u95e8\u5e97"},{"value":"2","label":"\u4ee3\u7406\u5546"},{"value":"3","label":"\u4e92\u8054\u7f51\u5bb6\u88c5\u56e2\u8d2d\u4f1a"},{"value":"4","label":"\u5356\u573a"},{"value":"5","label":"\u72ec\u7acb\u5927\u5e97"},{"value":"6","label":"\u5176\u4ed6"}]}';
}
else if($_GET["metaType"] == 'last_year_income') {
    echo '{"status":0,"msg":"\u6210\u529f","data":[{"value":"1","label":"[0,100)"},{"value":"2","label":"[100,200)"},{"value":"3","label":"[200,300)"},{"value":"4","label":"[300,400)"},{"value":"5","label":"[400,500)"},{"value":"6","label":"[500,+)"}]}';
}
else if($_GET["metaType"] == 'last_year_income_growth_rate') {
    echo '{"status":0,"msg":"\u6210\u529f","data":[{"value":"1","label":"\u751f\u4ea7\u5382\u5546"},{"value":"2","label":"\u54c1\u724c\u4ee3\u7406"},{"value":"3","label":"\u5356\u573a"},{"value":"4","label":"\u5176\u4ed6"}]}';
}
else if($_GET["metaType"] == 'client_payment_method') {
    echo '{"status":0,"msg":"\u6210\u529f","data":[{"value":"1","label":"\u751f\u4ea7\u5382\u5546"},{"value":"2","label":"\u54c1\u724c\u4ee3\u7406"},{"value":"3","label":"\u5356\u573a"},{"value":"4","label":"\u5176\u4ed6"}]}';
}
else if($_GET["metaType"] == 'brand_agent_type') {
    echo '{"status":0,"msg":"\u6210\u529f","data":[{"value":"1","label":"\u751f\u4ea7\u5382\u5546"},{"value":"2","label":"\u54c1\u724c\u4ee3\u7406"},{"value":"3","label":"\u5356\u573a"},{"value":"4","label":"\u5176\u4ed6"}]}';
}
else if($_GET["metaType"] == 'logistics') {
    echo '{"status":0,"msg":"\u6210\u529f","data":[{"value":"1","label":"\u81ea\u6709\u7269\u6d41"},{"value":"2","label":"\u7b2c\u4e09\u65b9"},{"value":"3","label":"\u65e0"}]}';
}
else if($_GET["metaType"] == 'office_space') {
    echo '{"status":0,"msg":"\u6210\u529f","data":[{"value":"1","label":"\u81ea\u6709"},{"value":"2","label":"\u79df\u8d41"}]}';
}
