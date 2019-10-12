// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 全局样式引入
import './assets/scss/index.scss';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
Vue.use(ElementUI, {
  size: 'small'
});
import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle);

import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
import common from './utils/common.js';
Vue.prototype.$common = common;

Vue.config.productionTip = false;

import './mock/mock';
import './directive/index';
import './filter/filters';

import BaseConfig from './base-config';
Vue.prototype.$baseConfig = BaseConfig;

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
