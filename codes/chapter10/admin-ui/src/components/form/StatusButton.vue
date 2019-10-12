<template>
  <div class="i-status-btn">
    <el-button :type="getClassByVal" size="mini" v-text="showText"></el-button>
  </div>
</template>

<script>
import { matterStatus } from '../../enum/matter-enum.js';
export default {
  props: {
    text: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      //状态，0：未谋划，1：已确认，2：处理中，3：已解决',
      statusClasss: { 0: 'wait-sure', 1: 'sure', 2: 'processing', 3: 'resolved' }
    }
  },
  computed: {
    showText: function () {
      return matterStatus[this.text];
    },
    getClassByVal () {
      return this.statusClasss[this.text];
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "./button.scss";
</style>