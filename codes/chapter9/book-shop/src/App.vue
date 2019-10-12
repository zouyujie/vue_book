<template>
  <div class="app-container">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="玉杰图书商城">
       <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <!-- 中间的 路由 router-view 区域 -->
    <transition name="fade">
      <div class="mui-content">
        <router-view></router-view>
      </div>
    </transition>

    <!-- 底部 Tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-newitem" to="/home">
        <span class="mui-icon iconfont icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-newitem" to="/order">
        <span class="mui-icon iconfont icon-dingdan"></span>
        <span class="mui-tab-label">订单</span>
      </router-link>
      <router-link class="mui-tab-newitem" to="/shopcar">
        <span class="mui-icon iconfont icon-gouwuche" id="shopCar">
          <span class="mui-badge">{{allCout }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-newitem" to="/my">
        <span class="mui-icon iconfont icon-me"></span>
        <span class="mui-tab-label">我的</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
       flag: false,
    };
  },
  computed:{
  allCout(){
    return this.$store.getters.getCartAllCount;
  }
  },
   created() {
    this.flag = this.$route.path === "/home" ? false : true;
  },
    watch: {
    "$route.path": function(val) {
      this.flag=val === "/home"?false:true;
    }
  },
  methods: {
     goBack() {
      // 点击后退
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-content {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 40px;
  bottom: 50px;
  overflow-y: auto;
  overflow-x:hidden;
}
.app-container {
  padding-top: 40px;
  overflow-x: hidden;
}
.router-link-active {
  color: lightblue !important;
}
/* 定义进入过渡的开始状态和离开过渡的结束状态 */
.fade-enter {
  opacity: 0;
  transform: translateX(100%);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
/* 定义进入和离开时候的过渡状态 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.mui-bar-tab .mui-tab-newitem.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-newitem {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-newitem .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-newitem .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
