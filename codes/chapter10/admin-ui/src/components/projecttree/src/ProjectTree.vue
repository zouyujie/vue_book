<template>
  <div v-Clickoutside="handleClose" class="project-tree" :class="{'another-style': anotherStyle}">
    <el-input
      :id="id"
      ref="reference"
      :value="selectedLabel || placeholder"
      :type="inputType"
      :placeholder="placeholder"
      :name="name"
      :size="selectSize"
      :disabled="disabled"
      :readonly="true"
      :rows="rows"
      :validate-event="false"
      class="label-input"
      :class="['is-'+textAlign,`${ visible ? 'is-focus' : ''}`, `${inputType === 'text' ? 'text-input' : ''}`, `${round ? 'is-round' : ''}`]"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.native.esc.stop.prevent="visible = false"
      @keydown.native.tab="visible = false"
      @mouseenter.native="labelInputHover = true"
      @mouseleave.native="labelInputHover = false"
      :clearable="clearable"
    >
      <i
        v-if="inputType === 'text' && !isLoading && clearable && labelInputHover"
        slot="suffix"
        class="el-icon-circle-close el-input__icon"
        @click="clearData"
      />
      <i
        v-else-if="inputType === 'text' && !isLoading"
        slot="suffix"
        class="select-caret"
        :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"
        @click="visible = !visible"
      />

      <i
        v-if="inputType === 'text' && isLoading"
        slot="suffix"
        class="el-icon-loading el-input__icon"
      />
    </el-input>
    <transition name="el-zoom-in-top" @after-leave="doDestroy">
      <el-select-menu
        v-show="visible"
        ref="popper"
        :appendToBody="true"
        :class="{'another-style': anotherStyle}"
      >
        <div class="main-box">
          <div class="header">
            <template v-if="$slots.poperTitle && showTitle" slot="poperTitle">
              <!-- 可自定义标题插槽 -->
              <slot name="poperTitle" />
            </template>
            <p v-else-if="showTitle" class="poper-title">{{ poperTitle }}</p>
            <div class="search-box">
              <el-input
                v-model="query"
                placeholder="输入名称搜索"
                @keyup.native="filterData"
                @paste.native="filterData"
                @input.native="filterData($event)"
              >
                <i slot="suffix" class="icon el-icon-search" @click.stop="filterData" />
              </el-input>
            </div>
          </div>
          <div class="section" :class="{'noTabs': !showTabs}">
            <tabs v-model="showType" :data-arr="tabsArray" v-if="showTabs" />
            <el-scrollbar
              ref="scrollbar"
              tag="div"
              wrap-class="el-select-dropdown__wrap"
              view-class="el-select-dropdown__list"
            >
              <div class="tree-box">
                <el-tree
                  ref="elTree"
                  :default-expand-all="true"
                  :default-checked-keys="defaultCheckedKeys"
                  :filter-node-method="filterNode"
                  :data="dataCopy"
                  :props="defaultProps"
                  :show-checkbox="true"
                  @node-click="nodeClick"
                  :node-key="defaultProps.key"
                  :empty-text="emptyText"
                  @check="treeCheck"
                  @check-change="treeCheckChange"
                />
              </div>
            </el-scrollbar>
          </div>
        </div>
      </el-select-menu>
    </transition>
  </div>
</template>
<script>
import {
  addResizeListener,
  removeResizeListener
} from 'element-ui/lib/utils/resize-event';
import Clickoutside from 'element-ui/lib/utils/clickoutside';
import Emitter from 'element-ui/lib/mixins/emitter';
import ElSelectMenu from './SelectDropdown.vue';
import Tabs from './Tabs.vue';
import utils from '@/utils/common.js';
import axios from '@/axios/request'
/**
     * 支持chang事件 返回checkKeyList 与ckeckNodeList
     * 支持通过修改v-model的传值改变选中分舵 
     * 支持nodeClick原生事件
     * 支持是否复选isMultiple
     * 支持是否默认全选
     * 分舵树数据请求失败会触发ajaxError事件,并返回错误信息
     */
export default {
  name: 'ElFormItem',
  componentName: 'ElFormItem',
  components: {
    ElSelectMenu,
    Tabs
  },
  directives: {
    Clickoutside
  },
  mixins: [Emitter],
  props: {
    value: { // 传入的选中值,请用v-model绑定
      type: Array,
      required: true
    },
    allChecked: { // 是否默认全选
      type: Boolean,
      default: false
    },
    isMultiple: { // 是否可复选
      type: Boolean,
      default: true
    },
    disabled: { // 组件是否禁用
      type: Boolean,
      default: false
    },
    placeholder: { // input框placeholder
      type: String,
      default: '请选择'
    },
    showTabs: { // 是否展示tabs菜单
      type: Boolean,
      default: true
    },
    defaultShowType: [String, Number], // 有tabs情况下 默认展示的tab类型
    showTitle: {
      type: Boolean,
      default: true,
    },
    poperTitle: { // 下拉树标题
      type: String,
      default: '分舵选择'
    },
    defaultProps: { // 下拉树配置选项
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'shopName',
          key: 'shopNumber'
        }
      }
    },
    dataArray: { // 下拉树数据,在不为空情况下 不请求dataUrl数据
      type: Array,
      default: () => null
    },
    dataUrl: { // dataArray为空情况下请求分舵树数据请求URL
      type: String,
      default: '/common/shop/getShopTree'
    },
    ajaxFun: {
      type: String,
      default: 'post'
    },
    requestParams: {  // 分舵树数据请求参数  // treeType{1:不控权限,2:控权限}
      type: Object,
      default: () => {
        return {
          treeType: 2
        }
      }
    },
    id: String, // input id
    name: String, // input name
    size: String, // input szie
    inputType: {
      type: String,
      default: 'text'
    }, // input type
    defaultTextAlign: { // input内容框内容显示靠左还是靠右
      type: String,
      default: 'left'
    },
    rows: [String, Number], // inputType为textArea时使用的属性
    noDataText: String, // 无数据显示文本
    noMatchText: String, // 无匹配数据显示文本
    popperClass: String, // 下拉框类名
    checkedLabel: String, //选中时展示的label
    allCheckedLabel: { // 所有选中时展示的label
      type: String,
      default: '所有分舵'
    },
    someCheckedLabel: String, // 部分选中时展示的label
    clearable: {
      type: Boolean,
      default: false
    },
    anotherStyle: { // 两套样式  一套首页有深蓝背景色的 一套白色
      type: Boolean,
      default: true
    },
    round: Boolean // 是否椭圆形边框
  },
  data () {
    return {
      labelInputHover: false, // 鼠标是否悬浮在label-input内
      isLoading: false, // 是否在进行ajax请求
      data: [],
      inputWidth: 0, // 用于调整下拉框宽度
      visible: '', // 下拉框是否可见
      query: '', // 过滤内容
      showType: '', // 展示类型
      defaultCheckedKeys: [] // 选中项
    };
  },
  computed: {
    dataCopy () {
      // 根据是否复选对数据的disabled进行格式化
      const _self = this;
      const data =
        this.data.filter(item => {
          return item.type === _self.showType;
        })[0] || [];
      if (this.isMultiple) return data.data || [];
      const dataCopy = this.formatDataCopy(data.data || []);
      return dataCopy;
    },
    tabsArray () {
      // tabs组件标签列表
      const tabsArray = this.data.map(item => {
        return {
          label: item.label,
          value: item.type
        };
      });
      return tabsArray;
    },
    selectedLabel () {
      if (this.isLoading) return ''
      // 在框显示的选中情况内容
      const allItemArr = this.getAllItemArr(this.dataCopy);
      const allLen = allItemArr.length;
      let checkedItem = this.$refs.elTree && this.$refs.elTree.getCheckedNodes() || [];
      checkedItem = checkedItem.filter(item => !item.children)
      const checkedLen = checkedItem.length
      // 其它选中情况
      switch (checkedLen) {
        case 0:
          return this.placeholder;
        case 1:
          return this.checkedLabel || (checkedItem[checkedItem.length - 1] || {})[this.defaultProps.label] || this.placeholder;
        case allLen:
          return this.checkedLabel || this.allCheckedLabel;
        default:
          return this.checkedLabel || this.someCheckedLabel || `已选择分舵${checkedLen}个`;
      }
    },
    selectSize () {
      // 分舵数选择器大小
      if (['large', 'medium', 'small', 'mini'].indexOf(this.size) > -1) {
        return this.size;
      }
      return '';
    },
    iconClass () {
      // 输入框后缀样式
      return this.visible ? 'arrow-up' : 'arrow-down';
    },
    emptyText () {
      if (!this.query && this.query !== 0) return this.noDataText || '暂无数据';
      return this.noMatchText || '无匹配数据';
    },
    textAlign () {
      return ['left', 'center', 'right'].includes(this.defaultTextAlign) ? this.defaultTextAlign : 'left'
    }
  },
  watch: {
    visible (val) {
      if (!val) {
        this.broadcast('ElSelectDropdown', 'destroyPopper');
      } else {
        this.broadcast('ElSelectDropdown', 'updatePopper');
      }
    },
    dataUrl: {
      immediate: true,
      handler: function (val) {
        val && this.initData(val)
      }
    },
    dataArray: {
      immediate: true,
      handler: function (val) {
        if (val) {
          this.data = JSON.parse(JSON.stringify(val))
          this.$nextTick(_ => {// 传过来的数据变更了就刷一下全选状态
            this.initAllCkeckedNode()
          })
        }
      }
    },
    value: {
      // 监听组件传选中值
      immediate: true,
      deep: true,
      handler: function (val = []) {
        if (!this.isMultiple) {
          // 非多选情况下只取最后一个
          this.defaultCheckedKeys = val.length ? [val[val.length - 1]] : [];
          this.$refs.elTree &&
            this.$refs.elTree.setCheckedKeys(this.defaultCheckedKeys);
          return;
        }
        const isEqual = this.arrayEqual(val, this.defaultCheckedKeys);
        if (isEqual) return;
        this.defaultCheckedKeys = JSON.parse(JSON.stringify(val));
        // 设置当前选中值为默认选中值
        this.$refs.elTree &&
          this.$refs.elTree.setCheckedKeys(this.defaultCheckedKeys);
      }
    },
    tabsArray: {
      // 监听tabsArray， 如有修改在无defaultShowType情况下 截取tabsArray[0].value作为默认showType
      immediate: true,
      handler: function (val) {
        this.showType = this.defaultShowType || (val[0] || {}).value || '';
      }
    },
    isMultiple (val) {
      if (!val && this.defaultCheckedKeys.length > 1) { // 是否双选属性改成false后，选中值如果不是单选则选最后一个作为单选选中项
        this.defaultCheckedKeys = this.defaultCheckedKeys.slice(this.defaultCheckedKeys.length - 1)
        // 设置当前选中值为默认选中值
        this.$refs.elTree &&
          this.$refs.elTree.setCheckedKeys(this.defaultCheckedKeys);
      }
    },
    showType (val) {
      this.$nextTick(_ => {
        this.filterData()
      })
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
    if (this.$el && this.resetInputWidth) {
      removeResizeListener(this.$el, this.resetInputWidth);
    }
  },
  methods: {
    initData (url = this.dataUrl) { // 初始化分舵树列表数据
      if (this.dataArray) return // 如果dataArray有数据过来的话 不取url数据
      this.isLoading = true
      axios[this.ajaxFun](url, this.requestParams).then(res => {
        this.isLoading = false
        if (res.code !== 200) {
          return Promise.reject('分舵列表数据请求失败')
        }
        this.data = (res.data || {}).array || []
        this.$emit('ajaxSuccess', JSON.parse(JSON.stringify(this.data)), this.getAllItemArr(this.dataCopy))
        this.$nextTick(_ => { // 请求完数据后如果为全选则设置全选
          this.initAllCkeckedNode()
        })
      }).catch(_ => {
        this.isLoading = false
        console.error('分舵列表数据请求失败(errorMessage):', _);
        this.$emit('ajaxError', _) // ajax数据请求失败  触发ajaxError事件 并返回错误信息
      })
    },
    initAllCkeckedNode () {
      if (this.allChecked && this.$refs.elTree) {
        let allItem = this.getAllItemArr(this.dataCopy) // 获取所有无子项节点
        this.$refs.elTree.setCheckedNodes(allItem);
      }
    },
    formatDataCopy (data = []) {
      // 格式化节点不可选
      const dataCopy = JSON.parse(JSON.stringify(data));
      dataCopy.forEach(item => {
        if (item.children) {
          item.disabled = true;
          item.children = this.formatDataCopy(item.children);
        }
      }, this);
      return dataCopy;
    },
    resetInputWidth () {
      if (this.$refs.reference && this.$refs.reference.$el) {
        this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
      }
    },
    handleClose () {
      this.visible = false;
    },
    handleFocus () {
      // 聚焦
      this.visible = true;
      // console.log('聚焦了');
    },
    handleBlur () {
      // 失焦
      // console.log('失焦了');
    },
    clearData () { // 清空选中项数据
      if (!this.defaultCheckedKeys.length) return
      this.$emit('change', [], []);
      this.$emit('input', []);
      this.dispatch('ElFormItem', 'el.form.change', []);
    },
    doDestroy () {
      this.$refs.popper && this.$refs.popper.doDestroy();
      // console.log('弹出框消失后');
    },
    filterData () {
      // 过滤树节点数据
      // console.log('过滤一下');
      this.$refs.elTree && utils.debounce(this.$refs.elTree.filter(this.query));
    },
    filterNode (value, data) {
      // 节点树过滤方法
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },
    nodeClick (...args) {
      // 节点点击回调
      this.$emit('nodeClick', ...args);
    },
    treeCheck (...args) { // 处理单选变化
      // 分舵树节点选中回调
      if (!this.isMultiple) {
        if (args[0].children) return
        // 选中同一值
        if (args[0][this.defaultProps.key] === this.defaultCheckedKeys[0]) {
          // 单选状态下 不让取消选中状态
          !args[1].checkedKeys.length && this.$refs.elTree && this.$refs.elTree.setCheckedKeys([args[0][this.defaultProps.key]]);
          return
        }
        this.$emit('change', [args[0][this.defaultProps.key]], args[0]);
        this.$emit('input', [args[0][this.defaultProps.key]])
        this.dispatch('ElFormItem', 'el.form.change', [args[0][this.defaultProps.key]]);
      }
    },
    treeCheckChange (...args) { // 处理多选变化
      // 分舵树选中状况变化回调
      if (this.isMultiple) {
        // 复选状态下，只要分舵树选中状态有变化就返回当前选中值
        const checkNodes =
          this.$refs.elTree && this.$refs.elTree.getCheckedNodes();
        const checkNodesCopy = checkNodes.filter(item => !item.children);
        const checkKeys = checkNodesCopy.map(item => item[this.defaultProps.key]);
        // 因为选中一个节点情况下 会触发多次回调，在这里需要避免多次emit change 事件到父级
        const isEqual = this.arrayEqual(checkKeys, this.defaultCheckedKeys);
        if (isEqual) return;
        this.$emit('change', checkKeys || [], checkNodes || []);
        this.$emit('input', checkKeys || [])
        this.dispatch('ElFormItem', 'el.form.change', checkKeys);
      }
    },
    getAllItemArr (data = this.dataCopy) {
      // 获取所有无子项的树节点
      let allArr = [];
      data.forEach(item => {
        if (item.children && item.children.length) {
          const itemArr = this.getAllItemArr(item.children);
          allArr = allArr.concat(itemArr);
        } else if (!item.children) {
          allArr.push(item);
        }
      }, this);
      return allArr;
    },
    arrayEqual (arr1 = [], arr2 = []) {
      // 比对数组是否相等
      let isEqual = Boolean(arr1.length === arr2.length);
      if (arr1.length === arr2.length && arr1.length) {
        for (let i = 0, len = arr1.length; i < len; i++) {
          isEqual = isEqual && arr1[i] === arr2[i];
          if (!isEqual) return;
        }
      }
      return isEqual;
    }
  }
};

</script>
<style lang="scss" scoped>
$border: 1px solid #dcdfe6;
$background: #14223c;
$borderColor: #67cbff;
$border2: 1px solid rgba(103, 203, 255, 0.5);
$borderNone: 1px solid transparent;
$color: #ffffff;
$active: #7ef7fe;
.project-tree {
  display: inline-block;
  text-align: left;
  line-height: normal;
  color: #606266;
  .text-input {
    /deep/ .el-input__inner {
      border: $border;
      cursor: pointer;
    }
    .el-input__icon {
      cursor: pointer;
    }
    &.is-round {
      /deep/ .el-input__inner {
        border-radius: 17px;
      }
    }
    &.is-left {
      /deep/ .el-input__inner {
        text-align: start;
      }
    }
    &.is-center {
      /deep/ .el-input__inner {
        text-align: center;
      }
    }
    &.is-right {
      /deep/ .el-input__inner {
        text-align: right;
      }
    }
  }
  .is-focus {
    /deep/ .el-input__inner {
      border-color: #3678ba;
    }
  }
}

.el-select-dropdown {
  /deep/ .el-tree-node__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 220px;
  }
  .main-box {
    background-color: #fff;
    .poper-title {
      padding: 10px;
      border-bottom: $border;
    }
    .search-box {
      padding: 10px;
      .el-icon-search {
        height: 100%;
        line-height: 32px;
        cursor: pointer;
      }
    }
    .section {
      padding: 0px 1px;
      &.noTabs {
        /deep/ .el-scrollbar {
          border: none;
        }
      }
      /deep/ .el-scrollbar {
        border: $border;
        border-top: none;
      }
      /deep/ .el-tree {
        background: none;
      }
      /deep/ .el-select-dropdown__list {
        padding-right: 10px;
      }
    }
  }
}
// 首页样式
.project-tree.another-style {
  color: $color;
  /deep/ .el-input__inner {
    background: $background;
    border: $border2;
    color: $color;
  }
}
.el-select-dropdown.another-style {
  border: none;
  .main-box {
    background-color: $background;
    border: $border2;
    padding-bottom: 1px;
    .poper-title {
      color: $active;
      border-bottom: $border2;
    }
    /deep/ .search-box {
      .el-input--small .el-input__inner {
        background: rgba(0, 77, 130, 0.47);
        // border: 1px solid #67cbff;
        border: $border2;
        border-radius: 12px;
        color: #b8c5dc;
      }
    }
    /deep/ .tabs {
      > span {
        &.tab {
          border: $borderNone;
          border-bottom: $border2;
          color: #ffffff;
          &.activated {
            border: $border2;
            color: $active;
            border-bottom: $borderNone;
          }
        }
        &.white-block {
          border-bottom: $border2;
        }
      }
    }
    /deep/ .el-scrollbar {
      border: $border2;
      border-top: none;

      /deep/ .el-tree {
        color: $color;
        /deep/ .el-tree-node__content:hover {
          background: none;
        }
        /deep/ .el-tree-node:focus > .el-tree-node__content {
          background-color: #182036;
        }
        .el-checkbox__inner,
        .el-checkbox__inner:after {
          background: none;
          border-color: $borderColor;
        }
        .el-checkbox__inner:before {
          background: $borderColor;
          border-color: $borderColor;
        }
      }
    }
  }
  /deep/ .popper__arrow {
    border-bottom-color: $borderColor;
    &::after {
      border-bottom-color: $background;
    }
  }
}
/deep/ .el-icon-circle-check {
  display: none;
  width: 0px;
}
/deep/ .el-icon-circle-check:before {
  content: "";
}
</style>