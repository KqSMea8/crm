/**
 * @file router.js
 * @author: zengqingzhuang(zengqingzhuang@baidu.com)
 * @since: 2017-11-30
 */
import Vue from 'vue';
import Router from 'vue-router';
import App from '/app/page/component/App.vue';
import error from '/app/page/component/error.vue';
Vue.use(Router);
const {
    finboxExtends,
    rateApproveList,
    selfPayRateList,
    rateList,
    editForaudit,
    listForAudit,
    shopListView,
    institutionForAuditListView,
    addforaudit,
    rateDetail,
    applyMedical,
    applyHome,
    applyBuilding,
    bbAccountList,
    bbAccountDetail
} = require('/app/component');
// 扩展finbox组件
Vue.use(finboxExtends);

let crmRouter = {
    path: '/pcrm/group',
    component: App,
    children: [
        {path: 'error/:id', name: '错误页面', component: error, meta: {keepAlive: true}},
        {path: 'contract/rateList', name: '费率列表', component: rateList},
        {path: 'contract/rateApproveList', name: '费率审核列表', component: rateApproveList},
        {path: 'contract/selfPayRateList', name: '自主支付息费列表', component: selfPayRateList},
        {path: 'access/apply/listforaudit', name: '准入申请列表', component: listForAudit},
        {path: 'access/apply/institutionforauditlist', name: '机构审核列表', component: institutionForAuditListView},
        {path: 'access/shoplistview', name: '机构管理列表', component: shopListView},
        {path: 'access/apply/addforaudit', name: '准入申请', component: addforaudit},
        {path: 'contract/rateDetail', name: '费率详情页', component: rateDetail},
        {path: 'account/bbaccountlist', name: '银企直连认款管理', component: bbAccountList},
        {path: 'account/bbaccountdetail', name: '银企直连单据详情', component: bbAccountDetail}
    ]
};
export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [crmRouter]
});
