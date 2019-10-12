<template>
  <div class="i-level-btn">
    <el-button :type="getClassByLevel" size="mini" v-text="showText"></el-button>
  </div>
</template>

<script>
import { matterLevel } from '../../enum/matter-enum.js';
export default {
  props: {
    text: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      levelClasss: { 1: 'one-level', 2: 'two-level', 3: 'three-level', 4: 'four-level', 5: 'five-level' }
    }
  },
  computed: {
    showText: function () {
      return matterLevel[this.text];
    },
    getClassByLevel () {
      return this.levelClasss[this.text];
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "./button.scss";
</style>