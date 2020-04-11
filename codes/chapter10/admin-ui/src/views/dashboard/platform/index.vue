<template>
  <div class="platform">
    <div class="index-top">
      <!-- barnner -->
      <Logo logo-name="logo" link-url="plat-index" />
      <div class="i-tree">
        <Projecttree v-model="treeData"></Projecttree>
      </div>
      <!-- 用户 -->
      <top-user />
      <!-- 菜单 -->
      <Menu />
    </div>
    <div class="index-container">
      <div class="i-left">
        <!-- 地图 -->
        <Map></Map>
      </div>
      <div class="i-right">
        <span class="border left-top" />
        <span class="border right-top" />
        <span class="border left-bottom" />
        <span class="border right-bottom" />
        <div class="i-content">
          <!-- 待办事项 -->
          <matter-detail></matter-detail>
          <!-- 其它武林高手武力排名 -->
          <matter-rank></matter-rank>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '../../../components/logo/index';
import TopUser from '../../../components/nav/TopUser';
import Menu from './Menu';
import Projecttree from '../../../components/projecttree/index.js';
import MatterDetail from './MatterDetail';
import MatterRank from './MatterRank';
import Map from './Map';
export default {
  components: {
    Logo,
    TopUser,
    Menu,
    Projecttree,
    MatterDetail,
    MatterRank,
    Map
  },
  data () {
    return {
      treeData: []
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../index.scss";
$borderColor: #3c5c75;
.platform {
  background-color: #182237;
  color: white;
  height: 100%;
  overflow: hidden;
  .index-top {
    height: 98px;
    line-height: 98px;
    padding: 0px 15px;
    .i-tree {
      float: left;
      margin-left: 20px;
    }
  }
  /deep/ .pm-title {
    color: #70bfe9;
  }
  /deep/ .top-user {
    margin-right: 20px;
  }
}
.index-container {
  height: calc(100% - 118px);
  min-height: 600px;
  display: block;
  padding: 10px 20px;
  background-color: #182037;
  .i-left {
    width: calc(100% - 571px);
    float: left;
    display: block;
    height: 100%;
    background: $bccolor;
    margin-right: 15px;
    position: relative;
  }
  .i-right {
    width: 556px;
    float: right;
    display: block;
    height: 100%;
    background: #1b243f;
    color: white;
    max-width: 556px;
    min-width: 450px;
    position: relative;
    .i-content {
      padding: 8px 20px;
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;
    }
  }
}
</style>
