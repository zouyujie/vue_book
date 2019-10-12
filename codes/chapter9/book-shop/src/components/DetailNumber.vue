<template>
  <!-- 使用 watch 属性来监听父组件传递过来的 max 值，不管 watch 会被触发几次，但是最后一次，肯定是一个合法的 max 数值 -->
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input  class="mui-input-numbox" type="number" :value="value" @change="countChanged" ref="numbox" readonly/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../libs/mui/js/mui.min.js";

export default {
  props: ["value", "max"],
  mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
    console.log(this.max);
  },
  methods: {
    countChanged() {
      // 每当文本框的数据被修改时立即让最新的数据通过事件调用传递给父组件
      this.$emit("input", parseInt(this.$refs.numbox.value));
    }
  },
  watch: {
    // 属性监听
    max: function(newVal, oldVal) {
      // 使用 JS API 设置 numbox 的最大值
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal); 
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
