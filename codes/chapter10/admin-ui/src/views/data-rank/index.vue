<template>
  <div class="p-container">
    <div class="sub-nav">
      <el-tabs v-model="activeIndex" @tab-click="handleClick">
        <!-- lazy -->
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
import MemberLevel from './MemberLevel.vue'
import ShopLevel from './ShopLevel.vue'
export default {
  components: { MemberLevel, ShopLevel },
  data () {
    return {
      activeIndex: '/data-rank/shop-level',
      tabsData: [{ index: '/data-rank/shop-level', title: '分舵实力排名' }, { index: '/data-rank/member-level', title: '人员武力排名' }]
    };
  },
  watch: {
    '$route': function (to, from) { // 路由改变时执行
      this.activeIndex = this.$route.path;
    }
  },
  created () {
    this.activeIndex = this.$route.path;
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
      this.$router.push({ path: this.activeIndex });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-input__inner {
  border-radius: 3px !important;
  background: #ffffff;
  border-color: #ffffff;
}
</style>

