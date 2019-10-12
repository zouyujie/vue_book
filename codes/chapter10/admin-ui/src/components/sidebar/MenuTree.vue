<template>
  <div class="subMenu">
    <template v-for="item in items ">
      <!-- 普通菜单 -->
      <template v-if="item.subs&&item.menuType!='page'">
        <el-submenu :key="item.id" :index="getSubIndex(item)">
          <template slot="title">
            <i :class="item.icon" />
            <span slot="title" class="title">{{ item.title }}</span>
            <div slot="title" class="line" />
          </template>
          <MenuTree :items="item.subs" />
        </el-submenu>
      </template>
      <template v-else>
        <!-- 子弹窗菜单 -->
        <el-menu-item
          :key="item.id"
          :index="getSubIndex(item)"
          v-if="item.menuType=='sub'"
          class="leaf"
        >
          <span class="menu-title">{{ item.title }}</span>
        </el-menu-item>
        <el-menu-item v-else :key="item.id" :index="getSubIndex(item)">
          <i :class="item.icon" />
          <!-- <span slot="title" class="title">{{ item.title }}</span>
          <div slot="title" class="line"/> 悬浮子弹窗形式-->
          <span class="title">{{ item.title }}</span>
          <div class="line" />
        </el-menu-item>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MenuTree',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {
    getSubIndex (item) {
      let result = '';
      if (item.subs && item.subs.length > 0) {
        result = item.subs[0].subs && item.subs[0].subs.length > 0 ? item.subs[0].subs[0].index : item.subs[0].index;
      } else {
        result = item.index;
      }
      return result;
    }
  }
}
</script>
<style lang="scss" scoped>
.subMenu {
  height: 100%;
  width: 100%;
  background-color: #f1f4fa;
}
.line {
  width: 4px;
  height: 100px;
  margin: 0px auto;
  background-color: #a6aeb5;
  overflow: hidden;
  display: none;
  position: absolute;
  left: 0px;
  top: 0px;
}
.title,
.iconfont {
  color: $menuNormalColor;
}
/deep/ .el-menu-item {
  &:hover {
    background-color: lightgray !important;
  }
}
.is-active {
  // background-color: white;
  .line {
    background-color: $menuHighlightColor;
    display: block;
  }
  .title,
  .iconfont {
    color: $menuHighlightColor;
  }
}
</style>
