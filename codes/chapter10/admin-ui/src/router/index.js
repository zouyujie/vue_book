import Vue from "vue";
import Router from "vue-router";
import BaseConfig from "../base-config";
Vue.use(Router);

const modulesFiles = require.context("./modules", false, /\.js$/);

var otherRouters = []; //其它子模块路由
modulesFiles.keys().forEach(modulePath => {
  const value = modulesFiles(modulePath);
  otherRouters.push(value.default);
  return otherRouters;
}, {});
//基础路由
let baseRouters = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/plat-index",
    component: resolve =>
      require(["../views/dashboard/platform/index.vue"], resolve),
    meta: {
      title: BaseConfig.title + "-平台首页"
    }
  },
  {
    path: "/shop-index",
    component: resolve =>
      require(["../views/dashboard/shop/index.vue"], resolve),
    meta: {
      title: "分舵首页"
    }
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
    meta: {
      title: BaseConfig.title + "-系统登录", // 标题
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: "/test",
    component: resolve => require(["@/views/test/index.vue"], resolve)
  },
  {
    path: "/404",
    component: resolve => require(["@/views/error/404.vue"], resolve)
  }
];
export default new Router({
  fallback: false,
  mode: "history",
  // linkActiveClass: 'is-active',
  routes: baseRouters.concat(otherRouters)
});
