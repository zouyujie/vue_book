import Vue from 'vue'  
// 1. 导入 vue-router 包
import VueRouter from 'vue-router'
// 2. 手动安装 VueRouter 
Vue.use(VueRouter)
// 导入 App 组件
import App from './App.vue'
// 3. 导入路由对象
import router from './router'

// 导入MUI样式
import './libs/mui/css/mui.min.css'

// 引入Mint UI全部组件 
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

// 注册vuex，并引入store
import store from './store'

import axios from 'axios'
Vue.prototype.$axios=axios;

// 引入mockjs
require('./mock.js')

//import vueTap from 'Vue2-tap'
var vueTap = require('vue2-tap')
Vue.use(vueTap)

var vm = new Vue({
    el: '#app',
    render:r=>r(App),
    router, // 4. 将路由对象挂载到 vm 上
    store // 挂载 store 状态管理对象
})
