/**
 * @file 百度统计平台配置文件
 */
/* eslint-disable */

(function() {
    window['statisticUserActionSwitcher'] = true;
})();

/*
* 页面日志埋点
*
*@param {string} type 统计种类
*@param {string} eventkey 页面名称
*@param {array} value 额外参数
*/
function _bfbStatistic(type, eventkey, value) {
    var data = {
        en: eventkey
    };

    if (type === 'page') {
        data.eg = 'in';
    }

    if (value) {
        data.ev = value;
    }

    if (window['BfbStatistic']) {
        window['BfbStatistic'].sendUserActionData(data);
    }
};
