<template>
  <div class="bookdetail-container">
    <!-- 小球动画 -->
        <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="showBall" ref="ball">
      </div>
    </transition>
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :dataItem="bookDetalData.swiperData" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ bookDetalData.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            定价：
            <del>￥{{ bookDetalData.price }}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{ bookDetalData.sellPrice }}</span>
          </p>
          <p>
            购买数量：
            <numbox v-model="selectedCount" :max="bookDetalData.stockQuantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" v-tap="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品编号：{{ bookDetalData.goodsNo }}</p>
          <p>库存数量：{{ bookDetalData.stockQuantity }}件</p>
          <p>出版时间：{{ bookDetalData.publishTime}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入轮播图组件
import swiper from "../../components/swiper.vue";
import numbox from "../../components/DetailNumber.vue";
export default {
  components: {
    swiper,
    numbox
  },
  data() {
    return {
      id: this.$route.params.id, // 将路由参数对象中的 id 挂载到 data方便后期调用
      selectedCount:1, // 保存用户选中的商品数量，默认认为用户买1个
      //商品详情数据
      bookDetalData: {
        swiperData: [] // 轮播图的数据
      },
      showBall:false,//设置小球默认的显示状态
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      console.log("id", this.id);
      this.$axios.get("/book/getDetail/" + this.id).then(res => {
        console.log("res", res);
        if (res.data.code == "200") {
          this.bookDetalData = res.data.data;
        }
      });
    },
    // 添加到购物车
    addToShopCar() {
      this.showBall = !this.showBall;
       // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
      // 拼接出一个，要保存到 store 中 cart 数组里的商品信息对象
      console.log('this.selectedCount',this.selectedCount)
      var goodsinfo = {
        id: parseInt(this.id),
        count: this.selectedCount,
        price: this.bookDetalData.sellPrice,
        selected: true,
        amount:this.selectedCount*this.bookDetalData.sellPrice
      };
      // 调用 store 中的 mutations 来将商品加入购物车
      this.$store.commit("addCart", goodsinfo);
    },
     beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // 获取小球的在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取购物车图标在页面中的位置
      const badgePosition = document.getElementById("shopCar").getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "0.5s all cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.showBall = !this.showBall;
    },
  }
};
</script>

<style lang="scss" scoped>
.bookdetail-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
    .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }
}
/deep/ .mui-card-content {
  background-color: aliceblue;
}
</style>