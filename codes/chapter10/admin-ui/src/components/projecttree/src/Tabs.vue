<template>
  <div v-if="dataArr.length" class="tabs">
    <span
      v-for="(item, index) in dataArr"
      :key="index"
      class="tab"
      :class="{
        'activated': activated === item.value
      }"
      @click="change(item)"
    >{{ item.label }}</span>
    <span class="white-block"/>
  </div>
</template>
<script>
export default {
  name: 'Tabs',
  props: {
    value: [Number, String],
    // visible: Boolean, // 是否出现在视口内
    dataArr: {
      type: Array,
      default: () => {
        return [
          {
            label: '行政区域',
            value: 'city'
          }, {
            label: '分舵',
            value: 'type'
          }
        ]
      }
    }
  },
  data () {
    return {
      activated: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function (val) {
        (this.activated !== val) && (this.activated = val)
      }
    }
    // visible: { // 监听标签是否出现在视口
    //     immediate: true,
    //     handler: function(val) {
    //         if (!val) return
    //         const tabsWidth = this.$el.getBoundingClientRect().width
    //         const spanList = this.$el.querySelectorAll('span')
    //         const spanListLen = spanList.length
    //         let widthSum = 0
    //         spanList.forEach((element, index) => {
    //             if (index < spanListLen - 1) {
    //                 widthSum += element.getBoundingClientRect().width
    //             }
    //         });
    //         (spanList[spanListLen - 1]).style.width = tabsWidth - widthSum + 'px'
    //     }
    // }
  },
  methods: {
    change (item) {
      this.activated = item.value
      this.$emit('input', this.activated)
      this.$emit('change', this.activated)
    }
  }
}
</script>
<style lang="scss" scoped>
$border: 1px solid #dcdfe6;
$borderNone: 1px solid transparent;
.tabs {
  // 标签不会太多 暂时不考虑标签溢出问题
  white-space: nowrap;
  overflow: hidden;
  > span {
    display: inline-block;
    box-sizing: border-box;
    color: #aaa;
    &.tab {
      cursor: pointer;
      padding: 5px 10px;
      border: $borderNone;
      border-bottom: $border;
      &.activated {
        color: #666;
        border: $border;
        border-bottom: $borderNone;
      }
    }
    &.white-block {
      width: 100%;
      border-bottom: $border;
      vertical-align: bottom;
      margin-left: -5px;
    }
  }
}
</style>
