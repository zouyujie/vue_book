import Vue from "vue";
import Vuex from "vuex";

const cartKey = "$cart";
Vue.use(Vuex);
var store = new Vuex.Store({
  state: {
    cart: JSON.parse(localStorage.getItem(cartKey) || "[]")
    //{ id:商品的id, count: 购买数量, price: 商品的单价，selected: 是否选中  }
  },
  mutations: {
    //添加到购物车
    addCart(state, info) {
      var flag = false; //购物车中是否已存在标记

      state.cart.some(item => {
        if (item.id == info.id) {
          item.count += parseInt(info.count);
          flag = true;
          return true;
        }
      });

      // 购物车中没有则把商品数据直接 push 到 购物车中
      if (!flag) {
        state.cart.push(info);
      }

      // 当更新 cart 之后，把 cart 数组存储到本地的 localStorage 中
      localStorage.setItem(cartKey, JSON.stringify(state.cart));
    },
    //修改购物车商品数量
    updateCartInfo(state, info) {
      console.log("info", info, state.cart);
      let carts = state.cart;

      // 修改购物车中商品的数量值
      let index = state.cart.findIndex(item => {
        return item.id == info.id;
      });
      carts[index].count = info.count;
      console.log("state.cart", carts);
      // 当修改完商品的数量后把最新的购物车数据保存到本地存储中
      localStorage.setItem(cartKey, JSON.stringify(carts));
    },
    //从购物车中移除指定的商品
    removeCartById(state, id) {
      // 根据Id，从store 中的购物车中删除对应的那条商品数据
      state.cart.some((item, i) => {
        if (item.id == id) {
          state.cart.splice(i, 1);
          return true;
        }
      });
      // 将删除完毕后的最新的购物车数据同步到本地存储中
      localStorage.setItem(cartKey, JSON.stringify(state.cart));
    },
    //更新购物车中指定商品的选中状态
    updateCartSelected(state, info) {
      state.cart.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected;
        }
      });
      // 把最新的所有购物车商品的状态保存到 store 中去
      localStorage.setItem(cartKey, JSON.stringify(state.cart));
    }
  },
  // 相当于计算属性也相当于filters
  getters: {
    //获取购物车所有商品数
    getCartAllCount(state) {
      let count = 0;
      console.log("获取购物车所有商品数:state.cart", state.cart);
      state.cart.forEach(item => {
        count += item.count;
      });
      return count;
    },
    getGoodsCount(state) {
      var obj= {};
      state.cart.forEach(item => {
        obj[item.id] = item.count;
      });
      return obj;
    },
    //获取购物车中所有商品的选中状态（对象）
    getCartSelected(state) {
      var obj = {};
      state.cart.forEach(item => {
        obj[item.id] = item.selected;
      });
      return obj;
    },
    //获取所有选中商品的数量和金额
    getCartCountAndAmount(state) {
      let obj = {
        count: 0, // 勾选的数量
        amount: 0 // 勾选的总价
      };
      state.cart.forEach(item => {
        if (item.selected) {
          obj.count += item.count;
          obj.amount += item.price * item.count;
        }
      });
      return obj;
    }
  }
});

export default store;
