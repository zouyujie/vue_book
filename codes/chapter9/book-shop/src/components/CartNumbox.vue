<template>
  <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input  id="test" class="mui-input-numbox" type="number" :value="value" @change="countChanged" ref="numbox" readonly />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../libs/mui/js/mui.min.js";

export default {
  mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      console.log('值',this.$refs.numbox.value);
      // 每当数量值改变，则立即把最新的数量同步到购物车的 store 中，覆盖之前的数量值
      this.$store.commit("updateCartInfo", {
        id: this.id,
        count:parseInt(this.$refs.numbox.value)
      });
    }
  },
  props: ["value", "id"]
};
</script>

<style lang="scss" scoped>

</style>
