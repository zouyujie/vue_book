/** 权限相关 */
import Storages from '../../utils/storages';
const state = {
    curLeafMenus: null, //当前叶子菜单数组
    pageBtns: null //页面按钮权限
};

const mutations = {
    setPageBtns(state, val) {
        if (val) {
            state.pageBtns = val;
            Storages.setLocalStorage('$page_btns', val);
        }
    },
    setCurLeafMenus(state, val) {
        if (val) {
            state.curLeafMenus = val;
            Storages.setLocalStorage('$curLeafMenus', val);
        }
    }
};

const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
