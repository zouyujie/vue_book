<template>
  <div class="card-head">
    <span class="rectangle"></span>
    <span v-text="title" class="card-title"></span>
    <span class="card-more" @click="lookMore()">查看更多</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '待办事项'
    }
  },
  methods: {
    //查看更多
    lookMore () {
      this.$emit("lookMore");
    }
  }
}
</script>

<style lang="scss" scoped>
$fontColor: #c7d200;
$moreColor: "#000";
.card-head {
  height: 44px;
  line-height: 44px;
  .card-title {
    color: $fontColor;
    font-size: 18px;
    font-weight: 600;
  }
  .card-more {
    color: $moreColor;
    font-size: 17px;
    float: right;
    cursor: pointer;
  }
}
</style>