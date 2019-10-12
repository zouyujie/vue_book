<template>
  <div class="u-menus">
    <ul class="sidebar-el-menu el-menu--horizontal el-menu">
      <li
        class="el-menu-item"
        v-for="item in items"
        :key="item.index"
        @click="onSelect(item)"
        :class="{'is-active' : defaultActive == item.index}"
      >
        <span :key="item.id" :index="item.index">
          <i :class="item.icon" />
          <span class="title">{{ item.title }}</span>
          <div class="line" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getRootMenu, getSubMenuById } from '../../../utils/permission.js';
import Storages from '../../../utils/storages';
export default {
  data () {
    return {
      defaultActive: '/plat-index',
      items: [],
      collapse: false
    }
  },

  created () {
    this.initMenuData();
    // this.defaultActive = 'plat-index';
  },
  methods: {
    // 初始化菜单数据
    initMenuData () {
      const authoritiesMenu = Storages.getLocalStorage('$platMenus');
      this.items = getRootMenu(authoritiesMenu);
    },
    onSelect (item) {
      this.initSubMenusActive(item.index);// 默认选中子菜单中的第一项
    },
    handleSelect (key) {
    },
    // 路由跳转
    jumpTo (url) {
      this.$router.push(url);
    },
    // 初始化子菜单默认选中项，初始化二、三级菜单选中第一项
    initSubMenusActive (index) {
      var subMenus = getSubMenuById(this.items, index);
      console.log('subMenus1', subMenus)
      var activeIndex = '';
      if (subMenus && subMenus.length > 0) {
        activeIndex = subMenus[0].subs && subMenus[0].subs.length > 0 ? subMenus[0].subs[0].index : subMenus[0].index;
      }
      var url = activeIndex === '' ? index : activeIndex;
      console.log('url:', url)
      this.$store.commit('base/updateLeftNavStatus', url);
      this.defaultActive = url;
      // this.$store.commit('base/updateLeftNavRefresh', true);
      this.jumpTo(url);
    }
  }
}
</script>

<style lang="scss" scoped>
.u-menus {
  float: right;
  height: 98px;
  line-height: 98px;
  margin-right: 40px;
}
.el-menu-item {
  padding: 0px 20px;
  .title {
    line-height: normal;
    margin-top: 0px;
  }
  i {
    color: #7abef9;
  }
}
.el-menu-item.is-active i,
.el-menu-item.is-active .title {
  color: white;
}
/deep/ .el-menu--horizontal > .el-menu-item {
  height: 98px;
  line-height: 50px;
  padding-top: 5px;
  color: #7abef9;
  &:hover {
    background-color: #10192b;
    color: white !important;
    .iconfont {
      color: white !important;
    }
  }
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
  background: #182237;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
}
</style>
