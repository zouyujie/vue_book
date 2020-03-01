<template>
  <div>
    <span class="txt">
      <Marquee :content="msg"></Marquee>
    </span>
  </div>
</template>

<script>
import Marquee from '@/components/marquee/index.vue'
export default {
  components: {
    Marquee
  },
  data () {
    return {
      msg: '  我踏月色而来的'
    }
  }
}
</script>

<style lang="scss" scoped>
.txt {
  display: block;
  width: 80px;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>