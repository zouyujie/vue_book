<template>
  <div class="p-container">
    <div class="sub-nav">
      <el-tabs v-model="activeIndex" @tab-click="handleClick">
        <el-tab-pane
          v-for="item in tabsData"
          :label="item.title"
          :name="item.index"
          :key="item.index"
        >
          <template v-if="item.index==activeIndex">
            <router-view></router-view>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
/**
 * 子页面路由容器
 */
import { getBtnsByIndex } from '@/utils/permission.js';
export default {
  computed: {
    tabsData () {
      return this.$store.getters.getCurLeafMenus;
    },
  },
  data () {
    return {
      activeIndex: '',
    };
  },
  watch: {
    '$route': function (to, from) { // 路由改变时执行         
      this.activeIndex = this.$route.path;
      this.getBtns(this.activeIndex);
    }
  },
  created () {
    this.activeIndex = this.$route.path;
    this.getBtns(this.activeIndex);
  },
  methods: {
    handleClick (tab, event) {
      this.$router.push({ path: this.activeIndex });
    },
    //根据index获取page中button权限
    getBtns (key) {
      var btns = getBtnsByIndex(key);
      this.$store.commit('permission/setPageBtns', btns || [])
    },
  }
};
</script>

<style lang="scss" scoped>
.p-container {
  background-color: #f1f6fb;
}
.el-tabs__content,
.el-tabs.el-tabs--top {
  height: 100%;
}
/deep/ .el-tabs__content {
  background: #f1f6fb;
}
/deep/ .el-tabs__content {
  background: #fff;
}
/deep/ .el-tabs__content {
  padding: 0px;
}
</style>
