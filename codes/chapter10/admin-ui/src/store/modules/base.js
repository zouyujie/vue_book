/** 基础相关 */
import Storages from '../../utils/storages';
const state = {
  isLoading: false, //是否加载中
  topNavState: '', //顶部导航选中index
  leftNavState: '', //左侧导航选中index
  leftNavRefresh: false, //左侧导航是否刷新
  uploadUrl: '/api/system-setting/upload',
  openPageLoading: false, //如果页面使用了loading就禁用默认的路由加载之后自动关闭
  curShop: null, //当前选中的分舵
  checkedShopNumbers: [] //当前选中的分舵编号数组
};

const mutations = {
  updateLoadingStatus(state, payload) {
    state.isLoading = payload.isLoading;
  },
  updatePageLoadingStatus(state, status) {
    state.openPageLoading = status;
  },
  updateTopNavStatus(state, status) {
    state.topNavState = status;
    Storages.setLocalStorage('$topNavState', status);
  },
  updateLeftNavStatus(state, status) {
    state.leftNavState = status;
    Storages.setLocalStorage('$leftNavState', status);
  },
  updateLeftNavRefresh(state, status) {
    state.leftNavRefresh = status;
    Storages.setLocalStorage('$leftNavRefresh', status);
  },
  updateCurShop(state, data) {
    state.curShop = data;
    Storages.setLocalStorage('$curShop', data);
  },
  updateCheckedShopNumbers(state, data) {
    state.checkedShopNumbers = data;
    Storages.setLocalStorage('$checkedShopNumbers', data);
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
