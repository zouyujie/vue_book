<template>
  <div>
    <el-select
      v-model="curValue"
      placeholder="请选择"
      clearable
      multiple
      collapse-tags
      @change="selectAll"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
/**
 * 支持全选反选的下拉列表
 */
export default {
  props: ['value', 'options'],
  data () {
    return {
      allVal: -1,//全部选项的值
      curValue: this.value,
      oldOptions: []// 用来储存上一次的数据
    }
  },
  created () {
    if (this.curValue.includes(this.allVal)) {
      let allValues = []
      //保留所有值
      for (let item of this.options) {
        allValues.push(item.value)
      }
      this.curValue = allValues;
      this.$emit('input', this.curValue);
      this.oldOptions[1] = this.curValue; //储存当前最后的结果 作为下次的老数据 
    }
  },
  methods: {
    selectAll (val) {
      // console.log('change', val)
      let allValues = []
      //保留所有值
      for (let item of this.options) {
        allValues.push(item.value)
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldOptions.length <= 1 ? [] : this.oldOptions[1]
      // 若是全部选择
      if (val.includes(this.allVal)) {
        this.curValue = allValues;
      }

      // 取消全部选中  上次有 当前没有 表示取消全选
      if (oldVal.includes(this.allVal) && !val.includes(this.allVal)) this.curValue = []

      // 点击非全部选中  需要排除全部选中 以及 当前点击的选项 
      // 新老数据都有全部选中 
      if (oldVal.includes(this.allVal) && val.includes(this.allVal)) {
        const index = val.indexOf(this.allVal)
        val.splice(index, 1) // 排除全选选项
        this.curValue = val
      }

      //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes(this.allVal) && !val.includes(this.allVal)) {
        if (val.length === allValues.length - 1) this.curValue = [this.allVal].concat(val)
      }
      //储存当前最后的结果 作为下次的老数据 
      this.oldOptions[1] = this.curValue;
      this.$emit('input', this.curValue);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>