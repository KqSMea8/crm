/**
 * @file index.js
 * @description 对外统一出口
 * @author zengqingzhuang(zengqingzhuang@baidu.com)
 * @since  2017-11-19
 */
import apihook from './apihook';
import finboxExtends from './finbox-extends';
import actionEvents from './actionEvents';
// 费率
import rateDetail from './contract/rateDetail';
import rateApproveList from './contract/rateApproveList';
import selfPayRateList from './contract/selfPayRateList';
import rateList from './contract/rateList';
import editForaudit from './contract/editforaudit';
// 准入申请
import listForAudit from './access-apply/listForAudit';
import shopListView from './access-apply/shopListView';
import institutionForAuditListView from './access-apply/institutionForAuditListView';
import addforaudit from './access-apply/addforaudit';
// 银起直联
import bbAccountList from './bb-account/bbAccountList';
import bbAccountDetail from './bb-account/bbAccountDetail';

import Vue from 'vue';
import apiPool from '../static/config/apiPool';
import MessageMap from '../static/config/messageMap';
// 开启自定义接口状态处理
MessageMap.force();
import finbox from 'finbox';
Vue.use(finbox.apiRouter, apihook);
// 注册按钮扩展事件
Vue.use(finbox.actionEvents, actionEvents);


export default  {
    finboxExtends: finboxExtends,
    rateApproveList: rateApproveList,
    selfPayRateList: selfPayRateList,
    rateList: rateList,
    editForaudit: editForaudit,
    listForAudit: listForAudit,
    shopListView: shopListView,
    institutionForAuditListView: institutionForAuditListView,
    addforaudit: addforaudit,
    rateDetail: rateDetail,
    bbAccountList: bbAccountList,
    bbAccountDetail: bbAccountDetail
}