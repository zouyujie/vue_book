<template>
  <div class="u-layout-empty" :style="style" :class="className">
    <div class="inner">
      <div class="img iconfont icon-nodata"></div>
      <div class="info">{{msg}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    className: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    },
  },
  computed: {
    style () {
      return {
        height: this.height,
        width: this.width
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.u-layout-empty {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */

  .inner {
    width: 100%;
    height: 200px;
  }
  .img {
    font-size: 100px;
    width: 100%;
    text-align: center;
    line-height: normal;
  }
  .info {
    width: 100%;
    height: 40px;
    // border: 1px solid #00c1b3;
    text-align: center;
  }
}
</style>