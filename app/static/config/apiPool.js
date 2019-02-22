/**
 * @file apiList.js
 * @author zengqingzhuang(zengqingzhuang@baidu.com)
 */
import finbox from 'finbox';
import Vue from 'vue';
//import apiList from './apiList';
export default {
    force: function() {
    Vue.use(finbox.apiPool, {
      initApi: ''
    });
  }
};
