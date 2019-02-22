<?php
/**
 * Smarty plugin
 * @package Smarty
 * @subpackage PluginsFunction
 */

/**
 * Smarty {counter} function plugin
 *
 * Type:     function<br>
 * Name:     counter<br>
 * Purpose:  print out a counter value
 *
 * @author Monte Ohrt <monte at ohrt dot com>
 * @link http://www.smarty.net/manual/en/language.function.counter.php {counter}
 *       (Smarty online manual)
 * @param array                    $params   parameters
 * @param Smarty_Internal_Template $template template object
 * @return array|null
 */
function smarty_function_fpdserviceapi($params, $template)
{
    $displayParam = array();
    $transmissionParam = array();
    $curScriptParam = array();
    $returnParam = array();

    // display Param
    if ( empty($template) || (empty($params['assign']))) {
        $displayParam['print'] = false;
    } else {
        $displayParam['print'] = true;
        $displayParam['assign'] = $params['assign'];
    }

    // transmission Param
    parse_str($params['inputParam'],$transmissionParam);
    $transmissionParam = array_merge($_GET,$transmissionParam);

    #$curScriptParam['uri'] = 'http://127.0.0.1:8098'.parse_url($params['url'],PHP_URL_PATH);
    $curScriptParam['uri'] = 'http://127.0.0.1:'.$_SERVER['SERVER_PORT'].parse_url($params['url'],PHP_URL_PATH);

    if ( empty($curScriptParam['uri']) ) {
        $returnParam = '{"errno":1,"msg":"input error."}';
        $returnParam = json_decode($output,true);
        return $returnParam;
    }
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $curScriptParam['uri']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $transmissionParam);
    $output = curl_exec($ch);
    curl_close($ch);
    $returnParam = json_decode($output,true);
    //$returnParam = $output;
    if ($displayParam['print'] == true && !empty($displayParam['assign'])) {
        $template->assign($displayParam['assign'], $returnParam);
    } else {
        return $returnParam;
    }


    /*
    $strServer = 'smartyapi_'.Fpd_Util_Conf::getConf('/env/cur')
    ral_set_logid(LOG_ID);
    ral_set_pathinfo($curScriptParam['uri']);
    $arrInput = array('data' => json_encode($transmissionParam));
    Bd_Log::debug('ral_url:' . $strServer . $curScriptParam['uri']);
    Bd_Log::debug('ral_input:' . json_encode($arrInput));
    //$headerInput = json_decode(json_encode($headerInput), true);
    //echo  json_encode($arrInput);
    $res = ral($strServer, 'POST', $arrInput, 1);
    Bd_Log::addNotice('ral_smartyapi:' . json_encode(array('pathinfo' => $curScriptParam['uri'], 'body' => $arrInput, 'out' => $res)));
    $returnParam = json_decode($res,true);

    */

}
/*
$arrParam=array(
    'url' => 'http://127.0.0.1:8021/biz/api/getprojectinfo?app=medical&bizline=JIA&channel=YMD&loginType=ANDROID001&productId=YM001&projectId=0000101301001&random=1269981291682&scene=MAIN&version=v1.0',
    'inputParam' => 'project_id=0000101301001',
    'assign' => 'res',
    );
$ret  = smarty_function_fpdserviceapi($arrParam,null);
var_dump($ret);
*/
?>
