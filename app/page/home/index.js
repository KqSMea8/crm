/**
 * @file index.js
 * @author: zengqingzhuang(zengqingzhuang@baidu.com)
 * @description 项目入口文件
 * @since: 2017-10-18
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
import router from '/app/router';
Vue.use(ElementUI);
// 路由不存在跳转404页面
router.beforeEach((to, from, next)=> {
    if (to.matched.length === 0) {
        next({path: router.options.routes[0].path + '/error/404'});
    } else {
        next();
    }
});
new Vue({
    router
}).$mount('#app');
