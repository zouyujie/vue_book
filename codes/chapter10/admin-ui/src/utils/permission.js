import Storages from '../utils/storages';
/**
 * 获取权限列表-店铺权限
 */
export function getShopAuthoritiesArr() {
  return Storages.getLocalStorage('$shopAuthoritiesArr');
}
/**
 * 存储权限列表
 * @param  data
 */
export function setAuthoritiesArr(data) {
  Storages.setLocalStorage('$shopAuthoritiesArr', data.shop); //店铺菜单权限
  Storages.setLocalStorage('$platMenus', data.bloc); //平台菜单权限
}
/**
 * 获取一级菜单
 * @param {*} menus  所有菜单列表
 */
export function getRootMenu(menus) {
  var rootMenus = [];
  if (menus && menus.length > 0) {
    menus.forEach(el => {
      if (el.pid === 0 && el.index != '/settings') {
        //排除【设置】菜单
        rootMenus.push(el);
      }
    });
  }
  return rootMenus;
}
/**
 * 根据Index获取分舵指定一级菜单
 * @param {*} index
 */
export function getShopOneLevelByIndex(index) {
  var oneLevelMenu = null;
  var menus = Storages.getLocalStorage('$shopAuthoritiesArr');
  if (menus && menus.length > 0) {
    for (var i = 0; i < menus.length; i++) {
      if (menus[i].index == index) {
        oneLevelMenu = menus[i];
        break;
      }
    }
  }
  // console.log('oneLevelMenu', oneLevelMenu);
  return oneLevelMenu;
}
/**
 * 根据一级菜单index获取二级菜单列表
 * @param {*} menus
 * @param {*} id
 */
export function getSubMenuById(menus, id) {
  var subMenus = { subs: [] };
  if (menus && menus.length > 0) {
    subMenus = menus.find((item, index, array) => {
      // eslint-disable-next-line eqeqeq
      if (item.index == id) {
        return item;
      }
    });
    if (subMenus === undefined) {
      return [];
    }
  }
  // console.log('subMenus', subMenus);
  return subMenus.subs;
}
//根据菜单index获取子菜单列表
// 2.递归获取全部节点
function getAllChildNodes(menus, index, allCN) {
  for (var i = 0; i < menus.length; i++) {
    let child = menus[i];
    if (child.index == index) {
      if (child.subs && child.subs.length > 0) {
        // allCN.push(child.subs[0]);
        child.subs.forEach(function(n) {
          allCN.push(n);
        });
      }
      break;
    }
    if (allCN.length == 0 && child.subs && child.subs.length > 0) {
      getAllChildNodes(child.subs, index, allCN);
    }
  }
}
/**
 * 根据index获取所有子菜单
 * @param  index
 * @param  category(shop:分舵,plat:平台)
 */
export function getSubmMenusByPreIndex(index, category = 'shop') {
  var allMenus =
    category == 'shop'
      ? Storages.getLocalStorage('$shopAuthoritiesArr')
      : Storages.getLocalStorage('$platMenus');
  // 1.创建全部节点的数组
  var allCN = [];
  // console.log('allMenus', allMenus);
  // debugger;
  getAllChildNodes(allMenus, index, allCN);
  // console.log('allCN', allCN);
  // 3.返回全部节点的数组
  return allCN;
}
//根据index获取页面按钮权限
export function getBtnsByIndex(index) {
  // var allMenus =
  //     category == 'shop'
  //         ? Storages.getLocalStorage('$shopAuthoritiesArr')
  //         : Storages.getLocalStorage('$platMenus');

  let shopMenus = Storages.getLocalStorage('$shopAuthoritiesArr');
  let platMenus = Storages.getLocalStorage('$platMenus');
  let allMenus = shopMenus.concat(platMenus);

  var btns = [];
  function getPageBtns(menus, index) {
    for (var i = 0; i < menus.length; i++) {
      let child = menus[i];
      if (child.index == index) {
        console.log('找到了：', index);
        if (child.btns && child.btns.length > 0) {
          btns = child.btns;
          break;
        }
      }
      if (btns.length == 0 && child.subs && child.subs.length > 0) {
        getPageBtns(child.subs, index);
      }
    }
  }
  getPageBtns(allMenus, index);
  return btns;
}
/**
 * 验证权限是否有效
 * @param {*} index
 * @param {*} category
 */
export function VerifyPermissions(index) {
  var shopMenus = Storages.getLocalStorage('$shopAuthoritiesArr') || [];
  var platMenus = Storages.getLocalStorage('$platMenus') || [];
  var allMenus = shopMenus.concat(platMenus);

  if (allMenus && allMenus.length > 0) {
    var result = false;
    function getMenuByIndex(menus, index) {
      for (var i = 0; i < menus.length; i++) {
        let child = menus[i];
        if (child.index == index) {
          result = true;
          break;
        }
        if (result == false && child.subs && child.subs.length > 0) {
          getMenuByIndex(child.subs, index);
        }
      }
    }
    getMenuByIndex(allMenus, index);
    // console.log('查找：', allMenus, index, result);
    return result;
  } else {
    return false;
  }
}
