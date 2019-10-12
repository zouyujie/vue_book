<template>
  <div class="header">
    <Logo linkUrl="/shop-index" />
    <div class="layout-tree" v-if="roleType==1">
      <Projecttree v-model="treeData" :isMultiple="false" @change="treeCheckChange"></Projecttree>
    </div>
    <span v-else class="shop-title" v-text="shopTitle" />
    <top-user />
    <top-nav />
  </div>
</template>

<script>
import Logo from '../../logo/index'
import TopNav from '../../nav/TopNav'
import TopUser from '../../nav/TopUser';
import Projecttree from '../../../components/projecttree/index.js';
export default {
  components: {
    Logo,
    TopNav,
    TopUser,
    Projecttree
  },
  data () {
    return {
      treeData: []
    }
  },
  created () {
    console.log('this.shopNumber', this.shopNumber)
    this.treeData.push(this.shopNumber);
  },
  computed: {
    roleType: function () {
      return this.$store.getters.getUserInfo.roleType;
    },
    shopNumber () {
      return this.$store.getters.shopNumber;
    },
    //门店名称
    shopTitle () {
      return this.$store.getters.getCurShopName;
    }
  },
  methods: {
    treeCheckChange (...args) {
      console.log('treeCheckChange', args);
      let curNode = args[1];
      console.log('存储', curNode.shopNumber)
      if (curNode && curNode.id) {
        this.$store.commit('base/updateCurShop', { shopId: curNode.id, shopNumber: curNode.shopNumber, shopName: curNode.shopName });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/head.scss";
</style>
