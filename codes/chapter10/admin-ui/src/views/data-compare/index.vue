<template>
  <div class="p-container">
    <div class="sub-nav">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="项目对比" name="project-compare"><ProjectCompare></ProjectCompare></el-tab-pane>
        <el-tab-pane label="时间对比" name="time-compare"><TimeCompare></TimeCompare></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    import ProjectCompare from './ProjectCompare.vue'
    import TimeCompare from './Timecompare.vue'
    export default {
    components: { ProjectCompare,TimeCompare},
    data() {
        return {
            activeName: 'project-compare'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>
