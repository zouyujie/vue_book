<template>
  <div>
    <el-select
      v-model="selectModel"
      :multiple="multiple"
      filterable
      remote
      reserve-keyword
      placeholder="请选择"
      @change="changeClick"
      clearable
    >
      <el-option-group
        v-for="group in multipleSelectOption"
        :key="group.value"
        :label="group.label"
        @click.native="checkAll(group.value)"
      >
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-option-group>
    </el-select>
  </div>
</template>

<script>
var Enumerable = require('linq');
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    //是否多选
    multiple: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    options: {
      handler (val) {
        this.multipleSelectOption = this.options;
      },
      deep: true
    }
  },
  data () {
    return {
      selectModel: [],
      multipleSelectOption: []
    }
  },
  created () {
    this.multipleSelectOption = this.options;
    // console.log('this.multipleSelectOption', this.multipleSelectOption);
  },
  methods: {
    //点击一级菜单全选/全不选实现
    checkAll (value) { //value: 点击的一级name
      if (this.multiple == false) //单选直接不做任何操作
        return false;

      var list = Enumerable.from(this.multipleSelectOption).where((o) => { return o.value == value; }).toArray();
      var level2ValueList = Enumerable.from(list[0].options).select("o=>o.value").toArray(); //所有该一级下二级的value集合

      var num = 0;
      level2ValueList.forEach((value) => {
        this.selectModel.forEach((model, index) => {
          if (model == value) {
            this.selectModel.splice(index, 1); //如有匹配，先删除
            num++;
            return true;
          }
        })
      })

      if (num < level2ValueList.length) { //需要全选
        this.selectModel = this.selectModel.concat(level2ValueList); //合并数组
      }
      console.log('全选，this.selectModel', this.selectModel)
      this.$emit("input", this.selectModel);
    },
    changeClick (item) {
      console.log('item', item)
      this.$emit("input", item);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>