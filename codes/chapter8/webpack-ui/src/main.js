
import Vue from 'vue'  
// 1. 导入 vue-router 包
import VueRouter from 'vue-router'
// 2. 手动安装 VueRouter 
Vue.use(VueRouter)
// 导入 App 组件
import App from './App.vue'
import router from './router'

//引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//引入Vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


// 引入全部组件 
// import Mint from 'mint-ui';
// import 'mint-ui/lib/style.css'
// Vue.use(Mint);

// 按需引入部分Mint-UI组件 
import { Button, Toast } from 'mint-ui';
// 使用 Vue.component 注册组件
Vue.component(Button.name, Button); 
Vue.component(Toast.name, Toast);

var vm = new Vue({
    el: '#app',
    render:r=>r(App),
    router // 4. 将路由对象挂载到 vm 上
})