export default class Storages {
  constructor() {}

  static getSessionStorage(key) {
    if (key === '' || typeof key !== 'string') return;
    const val = window.sessionStorage.getItem(key) || null;
    return val === null ? val : JSON.parse(val);
  }

  static setSessionStorage(key, value) {
    if (key === '' || typeof key !== 'string') return;
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  static removeSessionStorage(key, value) {
    if (key === '' || typeof key !== 'string') return;
    window.sessionStorage.removeItem(key);
  }

  static getLocalStorage(key) {
    if (key === '' || typeof key !== 'string') return;
    const val = window.localStorage.getItem(key);
    // 防止历史方法混入 value "undefined"
    try {
      return val === null ? val : JSON.parse(val);
    } catch (e) {
      console.log(e);
    }
  }

  static setLocalStorage(key, value) {
    if (key === '' || typeof key !== 'string') return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  static removeLocalStorage(key) {
    if (key === '' || typeof key !== 'string') return;
    window.localStorage.removeItem(key);
  }
  // 移除本系统所有本地存储和会话
  static removeAllLocalStorage() {
    Storages.removeLocalStorage('$platMenus'); // 平台菜单权限
    Storages.removeLocalStorage('$shopAuthoritiesArr'); // 分舵菜单权限
    Storages.removeLocalStorage('$user_info'); // 用户信息
    localStorage.removeItem('$token_info'); // token

    Storages.removeLocalStorage('$topNavState');
    Storages.removeLocalStorage('$leftNavState');
    sessionStorage.clear();
  }
}
