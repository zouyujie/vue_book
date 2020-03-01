//处理业务显示js文件
import Vue from "vue";
import moment from "moment";
import { StatusObj } from "../enum/generalEnum";
import router from "../router";
import store from "../store/index";
import { VerifyPermissions } from "../utils/permission";

/**
 * 时间格式化
 * formatString：日期格式
 */
Vue.filter("timeFormat", (value, formatString) => {
  formatString = formatString || "MM-DD HH:mm";
  return moment(value).format(formatString);
});
/**
 * 数字千分位
 * num: number
 * return string | number
 */
Vue.filter("thousandths", num => {
  if (typeof num === "number") {
    return num.toLocaleString();
  } else {
    return num;
  }
});

/**
 * 启用 0 禁用 1
 * 根据 value 返回 label 文本
 */
Vue.filter("getStatusText", num => {
  if (StatusObj[num] !== undefined) {
    return StatusObj[num].label;
  } else {
    return num;
  }
});
Vue.filter("zeroDefault", num => {
  if (num == 0 || num == 0.0) {
    return "--";
  } else {
    return num;
  }
});
// 字典翻译过滤器
Vue.filter("translate", function(
  value = "",
  dict = [],
  options = { value: "value", label: "label" }
) {
  if (!value && value !== 0) return "";
  let label = "";
  value = value.toString();
  for (let index = 0, len = dict.length; index < len; index++) {
    let dictValue = dict[index][options.value].toString();
    if (value === dictValue) {
      label = dict[index][options.label];
      break;
    }
  }
  return label;
});
//不需要权限验证的路由地址
let noAuth = ["/test"];
// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  // console.log('前');
  store.commit("base/updateLoadingStatus", { isLoading: true });
  const userInfo = store.getters.getUserInfo;
  // console.log('userInfo', userInfo, to, from)

  if (!userInfo) {
    if (to.path !== "/login") {
      next("/login");
      return;
    }
    next();
  } else {
    if (to.path !== "/login") {
      console.log("路径：", to.path);
      var result = false;
      // 不需要验证;
      if (noAuth.includes(to.path)) {
        result = true;
      } else {
        result = VerifyPermissions(to.path);
      }
      console.log("查找结果：", result);
      if (result) {
        next();
      } else {
        if (to.path !== "/404") {
          next("/404");
        }
      }
    }
  }
  next();
});
// 路由跳转后的钩子
router.afterEach(function(to) {
  // console.log('后'); 当页面没有启用loading时，默认显示loading 300ms然后自动隐藏
  setTimeout(() => {
    //当页面启动了Loading的时候，由页面自己来关闭Loading
    if (!store.getters.getPageLoading) {
      store.commit("base/updateLoadingStatus", { isLoading: false });
    }
  }, 300);
  //5s内没响应，自动隐藏loading
  setTimeout(() => {
    store.commit("base/updateLoadingStatus", { isLoading: false });
  }, 5000);
});
