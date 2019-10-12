
import Vue from 'vue'  
// 1. 导入 vue-router 包
import VueRouter from 'vue-router'
// 2. 手动安装 VueRouter 
Vue.use(VueRouter)
// 导入 App 组件
import App from './App.vue'
import router from './router'

var vm = new Vue({
    el: '#app',
    render:r=>r(App),
    router // 4. 将路由对象挂载到 vm 上
})