<template>
  <div>
    <el-input
      v-model="currentValue"
      :placeholder="placeholder"
      :type="inputType"
      @change="handlerChange"
    >
      <i v-if="showPrefix" slot="prefix" class="iconfont icon-denglumima"></i>
      <i
        v-if="visible"
        slot="suffix"
        title="显示密码"
        @click="changePass('show')"
        style="cursor:pointer;"
        class="el-input__icon iconfont icon-eye1"
      ></i>
      <i
        v-else
        slot="suffix"
        title="隐藏密码"
        @click="changePass('hide')"
        style="cursor:pointer;"
        class="el-input__icon iconfont icon-eye"
      ></i>
    </el-input>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    showPrefix: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value (newData) {
      if (newData !== null) {
        this.currentValue = newData;
      }
    },
  },
  data () {
    return {
      visible: true,
      inputType: 'password',
      currentValue: this.value,
    }
  },
  methods: {
    //隐藏和显示
    changePass (value) {
      this.inputType = value === 'show' ? 'text' : 'password';
      this.visible = !(value === 'show');//判断渲染，true:暗文显示，false:明文显示
    },
    handlerChange (val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>