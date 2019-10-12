<template>
  <div class="shop-home-page">
    <div class="shop-header">
      <Logo logo-name="logo" />
      <div class="layout-tree" v-if="roleType==1">
        <Projecttree v-model="treeData" :isMultiple="false" @change="treeCheckChange"></Projecttree>
      </div>
      <span v-else class="shop-title text-ellipse" :title="subBranchName">{{subBranchName}}</span>
      <top-user />
      <top-nav />
    </div>
    <div class="shop-container"></div>
  </div>
</template>
<script>
import Logo from '@/components/logo/index';
import TopUser from '@/components/nav/TopUser';

import TopNav from '@/components/nav/TopNav'
export default {
  components: { Logo, TopUser, TopNav },
  data () {
    return {
      treeData: [],
      shopCode: '',
      subBranchName: '',//分店名称，应该在vuex中取
    }
  },
  computed: {
    roleType: function () {
      return this.$store.getters.getUserInfo.roleType;
    },
    shopNumber: function () {
      return this.$store.getters.shopNumber;
    },
    curShop: function () {
      return this.$store.getters.getCurShop;
    },
  },
  created () {
    this.initShopName();
  },
  methods: {
    initShopName () {
      let res = [];
      if (this.curShop && this.curShop.shopNumber) {
        res.push(this.curShop.shopNumber);
      }
      this.treeData = res;
      this.shopCode = this.roleType == 2 ? this.shopNumber : this.curShop.shopNumber;
      this.subBranchName = this.$store.getters.getCurShopName;
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@/components/layout/scss/head.scss";
.shop-home-page {
  width: 100%;
  height: 100%;
  background-color: #182237;
  overflow: hidden;
  color: #b8daf5;
  min-height: 800px;
  .shop-header {
    height: 98px;
    line-height: 98px;
    padding: 0px 15px;
  }
  .shop-container {
    width: 100%;
    height: calc(100% - 98px);
    // min-height: 782px;
    padding: 10px 30px;
    box-sizing: border-box;
    background-color: rgba(20, 35, 64, 0.5);
    overflow: hidden;
    overflow-y: auto;

    background: url(/static/img/shop/xinfengyun.jpg) no-repeat 0 0;
    background-size: 100% 100%;
    position: relative;
  }
}
</style>