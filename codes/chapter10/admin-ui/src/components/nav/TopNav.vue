<template>
  <div class="top-nav">
    <span
      v-for="menu in menus"
      :key="menu.id"
      @click="handleSelect(menu)"
      class="item"
      :class="{active : defaultActive == menu.index}"
    >{{ menu.title }}</span>
  </div>
</template>

<script>
import Storages from '../../utils/storages';
import { getRootMenu, getSubMenuById, getShopAuthoritiesArr } from '../../utils/permission.js';
export default {
  data () {
    return {
      defaultActive: '',
      menus: []
    };
  },
  computed: {
    AuthoritiesArr: function () {
      return getShopAuthoritiesArr();
    }
  },
  watch: {
    '$route': function (to, from) { // 路由改变时执行
      // console.info("to.path:" + to.path);
      this.initNavData();
    }
  },
  created () {
    // 获取权限
    this.menus = getRootMenu(this.AuthoritiesArr);
    this.refreshInit();
  },
  methods: {
    /**
 * 匹配斜杠出现的次数
 */
    patchNums (path) {
      return path.split('/').length - 1;
    },
    // 页面刷新初始化：解决直接复制地址在新页面打开没有默认选中的问题
    refreshInit () {
      var path = this.$route.path;
      var matchData = path.match(/\/(\S*)\//);
      var result = matchData && matchData.length > 1 ? '/' + matchData[1] : '';
      if (this.patchNums.length > 0) {
        result = '/' + path.split('/')[1];//去第一个
      }
      this.defaultActive = result;
      console.log('updateTopNavStatus:', result)
      this.$store.commit('base/updateTopNavStatus', this.defaultActive);
    },
    // 初始化菜单激活项
    initNavData () {
      this.defaultActive = this.$store.getters.getTopNavState;
    },
    // 菜单改变
    handleSelect (menu) {
      let key = menu.index;
      console.log('key', key);
      this.defaultActive = key;
      this.$store.commit('base/updateTopNavStatus', key);
      this.initSubMenusActive();// 默认选中子菜单中的第一项
    },
    // 路由跳转
    jumpTo (url) {
      this.$router.push(url);
    },
    // 初始化子菜单默认选中项，初始化二、三级菜单选中第一项
    initSubMenusActive () {
      var subMenus = getSubMenuById(this.menus, this.defaultActive);
      console.log('subMenus1', subMenus)
      var activeIndex = '';
      if (subMenus && subMenus.length > 0) {
        activeIndex = subMenus[0].subs && subMenus[0].subs.length > 0 ? subMenus[0].subs[0].index : subMenus[0].index;
      }
      var url = activeIndex === '' ? this.defaultActive : activeIndex;
      console.log('url:', url)
      // this.$store.commit('base/updateLeftNavStatus', url);
      this.$store.commit('base/updateLeftNavRefresh', true);
      this.jumpTo(url);
    }
  }
}
</script>
<style lang="scss" scoped>
.top-nav {
  float: right;
  margin-left: 20px;
}
.item {
  cursor: pointer;
  display: inline-block;
  width: 102px;
  height: 46px;
  line-height: 46px;
  text-align: center;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(103, 203, 255, 1);
  margin-right: 10px;
  background: url(../../../static/img/shop/unselect.png) no-repeat 0 0;
  &.active,
  &:hover {
    color: $fontColor;
    background: url(../../../static/img/shop/selected.png) no-repeat 0;
  }
}
</style>

