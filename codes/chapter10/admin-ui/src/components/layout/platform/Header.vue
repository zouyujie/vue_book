<template>
  <div class="header">
    <Logo link-url="/plat-index"/>
    <div class="i-tree">
      <Projecttree v-model="treeData" :isMultiple="false"></Projecttree>
    </div>
    <top-user/>
  </div>
</template>

<script>
import Logo from '../../logo/index';
import TopUser from '../../nav/TopUser';
import Projecttree from '../../projecttree/index.js';
export default {
  components: {
    Logo,
    TopUser,
    Projecttree,
  },
  data () {
    return {
      treeData: []
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/head.scss";
.i-tree {
  float: left;
  margin-left: 20px;
}
</style>
