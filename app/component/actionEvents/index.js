/**
 * @file index.js
 * @description 扩展按钮事件
 * @author zengqingzhuang(zengqingzhuang@baidu.com)
 * @since  2017-12-20
 */

import rateForm from './rateForm';
import bbAccount from './bbAccountEvent';
export default {
    ...rateForm,
    ...bbAccount
}