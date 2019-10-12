import Storages from '../../utils/storages';
/** 用户相关 */
const state = {
    userInfo: null,
    requestHeaderToken: ''
};

const mutations = {
    setRequestHeader(state, tokenString) {
        if (tokenString) {
            state.requestHeaderToken = tokenString;
            // debugger;
            localStorage.setItem('$token_info', tokenString);
        }
        console.log('tokenString', tokenString);
    },
    setUserInfo(state, user) {
        if (user) {
            state.userInfo = user;
            Storages.setLocalStorage('$user_info', user);
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
