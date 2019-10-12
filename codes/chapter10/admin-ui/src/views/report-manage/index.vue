<template>
  <div class="p-container">
    <div class="sub-nav">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="报警报表" name="matter-report">
          <matter-report></matter-report>
        </el-tab-pane>
        <el-tab-pane label="响应报表" name="response-report">
          <member-online></member-online>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import MatterReport from './MatterReport.vue'
import MemberOnline from './MemberOnline.vue'
export default {
  components: { MatterReport, MemberOnline },
  data () {
    return {
      activeName: 'matter-report'
    };
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .sub-nav {
  height: 100%;
  line-height: 10px;
  border-radius: 5px;
  display: block;
  background-color: white;
}

/deep/ .el-input__inner {
  border-radius: 3px !important;
  background: #ffffff;
  border-color: #ffffff;
}
</style>

