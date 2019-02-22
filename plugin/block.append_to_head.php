<?php

function smarty_block_append_to_head($params, $content, &$template, &$repeat){
    $strResourceApiPath = preg_replace('/[\\/\\\\]+/', '/', dirname(__FILE__) . '/FISResource.class.php');
    if(!class_exists('FISResource', false)){
        require_once($strResourceApiPath);
    }
    FISResource::appendHeadContent($content);
    return '';
}