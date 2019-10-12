<template>
  <div v-Clickoutside="handleClose" class="tree-select">
    <el-input
      :id="id"
      :name="name"
      ref="reference"
      v-model="query"
      :placeholder="currentPlaceholder"
      :validate-event="false"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.native.esc.stop.prevent="handleClose"
      @keydown.native.tab="handleClose"
      @keyup.native="filterData"
      @paste.native="filterData"
      @input.native="filterData"
      @mouseenter.native="labelInputHover = true"
      @mouseleave.native="labelInputHover = false"
      :disabled="disabled"
    >
      <i
        v-if="clearable && labelInputHover && !disabled"
        slot="suffix"
        class="el-icon-circle-close el-input__icon"
        @click.stop.prevent="clearData"
      />
      <i
        v-else-if="!disabled"
        slot="suffix"
        class="select-caret"
        :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"
        @click.stop.prevent="visible = !visible"
      />
    </el-input>
    <transition name="el-zoom-in-top" @after-leave="doDestroy">
      <el-select-menu v-show="visible" ref="popper" :appendToBody="true">
        <div class="main-box">
          <el-scrollbar
            ref="scrollbar"
            tag="div"
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list"
          >
            <div class="tree-box">
              <el-tree
                ref="elTree"
                :filter-node-method="filterNode"
                :data="dataArr"
                :props="defaultProps"
                @node-click="nodeClick"
                :node-key="defaultProps.key"
                :empty-text="emptyText"
                :expand-on-click-node="false"
                :default-expand-all="true"
                style="padding-right:5px;"
              >
                <span class="custom-tree-node" slot-scope="{ node }">
                  <span :class="{'active': node.key === value}">{{ node.label }}</span>
                </span>
              </el-tree>
            </div>
          </el-scrollbar>
        </div>
      </el-select-menu>
    </transition>
  </div>
</template>
<script>
/***
 * v-model 绑定数据
 * data 传入树数据
 * 
 */
import {
  addResizeListener,
  removeResizeListener
} from 'element-ui/lib/utils/resize-event';
import Clickoutside from 'element-ui/lib/utils/clickoutside';
import Emitter from 'element-ui/lib/mixins/emitter';
import ElSelectMenu from './SelectDropdown.vue';
import utils from '@/utils/common.js';
import axios from '@/axios/request'
export default {
  name: 'TreeSelect',
  componentName: 'ElFormItem',
  components: {
    ElSelectMenu
  },
  directives: {
    Clickoutside
  },
  mixins: [Emitter],
  props: {
    value: { // 通过v-model绑定
      required: true
    }, // 传入的选中值,请用v-model绑定
    noDataText: String, // 无数据显示文本
    id: String, // input id
    name: String, // input name
    placeholder: String,
    clearable: { // 是否可清除
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    data: { // 下拉树数据
      type: Array,
      default: () => {
        return []
      }
    },
    defaultProps: { // 下拉树配置选项
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'configName',
          key: 'id',
          disabled: 'disabled'
        }
      }
    },
    //是否只有叶子节点可以选择
    onlyLeafSelect: {
      type: Boolean,
      default: false
    },
    isOnlyLeafSelect: {
      type: Boolean,
      default: false
    },
    isSparePart: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      labelInputHover: false,
      inputWidth: 0,
      dataArr: [],
      query: '',
      currentPlaceholder: '',
      visible: false
    }
  },
  computed: {
    emptyText () {
      if (!this.query && this.query !== 0) return this.noDataText || '暂无数据';
      return this.noMatchText || '无匹配数据';
    },
    selected () {
      let option = {}
      const dataArr = this.getAllItemArr(this.dataArr)
      for (let index = 0, len = dataArr.length; index < len; index++) {
        if (this.value === dataArr[index][this.defaultProps.key]) {
          option = dataArr[index]
          break;
        }
      }
      return option
    },
    iconClass () {
      // 输入框后缀样式
      return this.visible ? 'arrow-up' : 'arrow-down';
    }
  },
  created () {
    if (Array.isArray(this.value)) {
      this.clearData();
    }
    this.currentPlaceholder = this.placeholder;
  },
  methods: {
    filterNode (value, data) {
      // 节点树过滤方法
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },
    nodeClick (data, node) {
      console.log(data, node)
      if (node.key === this.value || data[this.defaultProps.disabled]) return;
      if (this.onlyLeafSelect) { //临时解决方案，等后端接口支持了，此处逻辑要删掉:&& data.pid == 0
        if (!node.isLeaf || data.id.toString().indexOf(',') == -1) {
          this.query = '';
          return;
        }
      }
      if (this.isOnlyLeafSelect) {
        if (data.pid == 0) {
          this.query = '';
          return;
        }
      }
      if (this.isSparePart) {
        if (!data.isSparePart) {
          this.query = '';
          return;
        }
      }
      this.$emit('input', node.key)
      this.$emit('change', node, data, this.index)
      this.dispatch('ElFormItem', 'el.form.change', node.key);
      this.query = node.label
      this.visible = false
    },
    clearData () { // 清除数据
      this.query = ''
      this.$emit('input', '')
      this.$emit('change', null)
      this.dispatch('ElFormItem', 'el.form.change', '');
      this.currentPlaceholder = this.placeholder
    },
    handleFocus () {
      this.visible = true
      this.query = ''
      this.filterData()
      this.currentPlaceholder = this.selected[this.defaultProps.label] || this.placeholder
    },
    handleBlur () {
      this.query = this.selected[this.defaultProps.label]
      this.currentPlaceholder = this.placeholder
    },
    handleClose () {
      this.visible = false
    },
    doDestroy () {
      this.broadcast('ElSelectDropdown', 'destroyPopper');
    },
    filterData () {
      // 过滤树节点数据
      this.$refs.elTree && utils.debounce(this.$refs.elTree.filter(this.query));
    },
    resetInputWidth () {
      if (this.$refs.reference && this.$refs.reference.$el) {
        this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
        this.$nextTick(_ => {
          this.broadcast('ElSelectDropdown', 'updatePopper');
        })
      }
    },
    getAllItemArr (data = this.dataCopy) {
      // 获取所有树节点
      let allArr = [];
      data.forEach(item => {
        if (item[this.defaultProps.children] && item[this.defaultProps.children].length) {
          allArr.push(JSON.parse(JSON.stringify(item)));
          const itemArr = this.getAllItemArr(item[this.defaultProps.children]);
          allArr = allArr.concat(itemArr);
        } else if (!item[this.defaultProps.children]) {
          allArr.push(item);
        }
      }, this);
      return allArr;
    }
  },
  watch: {
    value (val, oldVal) {
      if (Array.isArray(val)) {
        this.clearData()
      }
      this.query = this.selected[this.defaultProps.label]
    },
    visible (val) {
      if (!val) {
        this.broadcast('ElSelectDropdown', 'destroyPopper');
      } else {
        this.broadcast('ElSelectDropdown', 'updatePopper');
      }
    },
    data: {
      immediate: true,
      handler: function (val) {
        this.dataArr = JSON.parse(JSON.stringify(val))
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.query = this.selected[this.defaultProps.label]
      }
    }
  },
  mounted () {
    addResizeListener(this.$el, this.resetInputWidth);
    const reference = this.$refs.reference;
    this.$nextTick(() => {
      if (reference && reference.$el) {
        this.inputWidth = reference.$el.getBoundingClientRect().width;
      }
    });
  },
  beforeDestroy () {
    this.doDestroy()
    if (this.$el && this.resetInputWidth) {
      removeResizeListener(this.$el, this.resetInputWidth);
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-select {
  display: inline-block;
  line-height: normal;
  .el-input__icon {
    cursor: pointer;
  }
  .tree-box {
    /deep/ .el-tree {
      padding-right: 3px;
    }
  }
}
.tree-select-dropdown {
  .active {
    color: #1989fa;
  }
}
</style>
