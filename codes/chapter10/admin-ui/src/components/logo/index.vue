<template>
  <div class="logo">
    <img :src="logoUrl" @click="jumpToIndex()" />
    <div class="pm-title" v-text="title" />
  </div>
</template>

<script>
import Storages from '../../utils/storages.js'
export default {
  props: {
    linkUrl: {
      type: String,
      default: 'shop-index'
    }
  },
  data () {
    return {
      title: this.$baseConfig.ADMIN_TITLE
    }
  },
  computed: {
    logoUrl () {
      return require('../../assets/images/logo/logo.png')
    },
    userInfo: function () {
      return this.$store.getters.getUserInfo;
    }
  },
  methods: {
    // 跳转到首页
    jumpToIndex () {
      let url = this.linkUrl;
      let roleType = this.userInfo.roleType;
      console.log('roleType:', roleType)
      if (roleType) {
        url = roleType == 1 ? '/plat-index' : '/shop-index';
      }
      this.$router.push({
        path: url
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.logo,
.pm-title {
  height: 98px;
  line-height: 98px;
  float: left;
}
.logo {
  img {
    float: left;
    height: 98px;
    cursor: pointer;
  }
}
.pm-title {
  font-size: 38px;
  color: #386aa7;
  font-weight: 600;
}
</style>
