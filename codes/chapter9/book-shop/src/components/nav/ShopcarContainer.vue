<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item, i) in bookList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getCartSelected[item.id]"
              @change="selectedChanged(item.id, $store.getters.getCartSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumbnail" />
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sellPrice }}</span>
                <numbox :value="$store.getters.getGoodsCount[item.id]" :id="item.id"></numbox>
                <!-- 1. 我们可以先创建一个空对象，然后循环购物车中所有商品的数据， 把当前循环这条商品的Id，
                作为对象的属性名，count值作为对象的属性值， 这样当把所有的商品循环一遍，就会得到一个对象：{ 37: 2, 38: 1} -->
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">{{ $store.getters.getCartCountAndAmount.count }}</span> 件， 总价
              <span class="red">￥{{ $store.getters.getCartCountAndAmount.amount }}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
    <!-- 获取购物车中所有商品的选中状态（对象） -->
    <!-- <p>选中商品信息：{{ $store.getters.getCartSelected }}</p> -->
  </div>
</template>

<script>
import numbox from "../CartNumbox.vue";

export default {
  components: {
    numbox
  },
  data() {
    return {
      selectedCount:'',
      bookList: [] // 购物车中所有图书商品的数据
    };
  },
  created() {
    this.getBooksList();
  },
  methods: {
    //加载购物车图书列表
    getBooksList() {
      // 1. 获取到 store 中所有的商品的Id，然后拼接出一个用逗号分隔的字符串
      var idArr = [];
      console.log('this.$store.state.cart',this.$store.state.cart)
      this.$store.state.cart.forEach(item => idArr.push(item.id));
      // 如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
      if (idArr.length <= 0) {
        return;
      }
      // 获取购物车商品列表
      this.$axios
        .post("/book/getshopcartlist", { ids: idArr.join(",") })
        .then(result => {
          console.log('result',result)
          if (result.data.code == '200') {
            this.bookList = result.data.data;
          }
          console.log('this.bookList',this.bookList)
        });
    },
    remove(id, index) {
      // 点击删除，把商品从 store 中根据传递的Id删除，同时，把当前组件中的bookList，对应要删除的那个商品使用 index 来删除
      this.bookList.splice(index, 1);
      this.$store.commit("removeCartById", id);
    },
    selectedChanged(id, val) {
      // 每当点击开关，把最新的 快关状态，同步到 store 中
      // console.log(id + " --- " + val);
      this.$store.commit("updateCartSelected", { id, selected: val });
    }
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
