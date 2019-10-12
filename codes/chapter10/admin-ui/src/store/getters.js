import Storages from '../utils/storages';
const getters = {
  //获取加载中状态
  getLoading: state => {
    return state.base.isLoading;
  },
  //获取页面正在加载中状态
  getPageLoading: state => state.base.openPageLoading,
  getTokenInfo: state => {
    if (!state.user.requestHeaderToken) {
      state.user.requestHeaderToken = localStorage.getItem('$token_info');
    }
    return state.user.requestHeaderToken;
  },
  indexEchartsData: state => state.indexEchartsData,
  //获取用户信息
  getUserInfo: state => {
    if (!state.user.userInfo) {
      state.user.userInfo = Storages.getLocalStorage('$user_info');
    }
    return state.user.userInfo;
  },
  //获取顶部一级导航栏菜单选中标识 index
  getTopNavState: state => {
    if (!state.base.topNavState) {
      state.base.topNavState = Storages.getLocalStorage('$topNavState');
    }
    return state.base.topNavState;
  },
  //获取左侧菜单激活项标识 index
  getLeftNavState: state => {
    if (!state.base.leftNavState) {
      state.base.leftNavState = Storages.getLocalStorage('$leftNavState');
    }
    return state.base.leftNavState;
  },
  //获取左侧菜单刷新标识
  getLeftNavRefresh: state => {
    if (!state.base.leftNavRefresh) {
      state.base.leftNavRefresh = Storages.getLocalStorage('$leftNavRefresh');
    }
    return state.base.leftNavRefresh;
  },
  getUploadHeader: state => {
    return {
      token: localStorage.getItem('$token_info')
    };
  },
  getLeftTabTree: state => state.base.leftTabTree,
  //获取当前页面按钮权限
  getPageBtns: state => {
    if (!state.permission.pageBtns) {
      state.permission.pageBtns = Storages.getLocalStorage('$page_btns');
    }
    return state.permission.pageBtns;
  },
  //获取当前选中分舵实体对象
  getCurShop: state => {
    if (!state.base.curShop) {
      state.base.curShop = Storages.getLocalStorage('$curShop');
    }
    return state.base.curShop;
  },
  //获取当选中分舵编码集合
  getCheckedShopNumbers: state => {
    if (
      !state.base.checkedShopNumbers ||
      state.base.checkedShopNumbers.length == 0
    ) {
      state.base.checkedShopNumbers = Storages.getLocalStorage(
        '$checkedShopNumbers'
      );
    }
    return state.base.checkedShopNumbers;
  },
  //获取当前叶子菜单数组
  getCurLeafMenus: state => {
    if (!state.permission.curLeafMenus) {
      state.permission.curLeafMenus = Storages.getLocalStorage('$curLeafMenus');
    }
    return state.permission.curLeafMenus;
  },
  //获取当前选中的分舵编号
  shopNumber: state => {
    if (!state.user.userInfo) {
      state.user.userInfo = Storages.getLocalStorage('$user_info');
    }
    if (!state.base.curShop) {
      state.base.curShop = Storages.getLocalStorage('$curShop');
    }
    return state.user.userInfo.roleType == 2
      ? state.user.userInfo.shopNumber
      : state.base.curShop.shopNumber;
  },
  //获取当前门店名称
  getCurShopName: state => {
    if (!state.user.userInfo) {
      state.user.userInfo = Storages.getLocalStorage('$user_info');
    }
    return state.user.userInfo.shopName;
  }
};
export default getters;
