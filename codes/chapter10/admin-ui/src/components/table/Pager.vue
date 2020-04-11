<!-- 分页查询
<pager :pager=[分页对象] @query=[列表查询方法] />
-->

<template>
  <div class="pagination-box clear">
    <span class="page-total fl">
      共有记录：
      <span>{{ pager.total }}</span>条
    </span>
    <el-pagination
      layout="sizes,jumper, prev, pager, next"
      background
      :pager-count="7"
      :total="pager.total"
      :current-page.sync="pager.page"
      :page-size="pager.rows"
      :page-sizes="[10,15,20,50,100,200]"
      @size-change="onChangeSize"
      @current-change="onChangePage"
    ></el-pagination>
    <span v-if="refresh" class="btn-refresh fn-right" title="刷新" @click="$emit('query')">
      <i class="fas fa-redo"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Pager',
  props: {
    pager: {
      type: Object,
      required: true
    },
    refresh: {
      type: Boolean
    },
    props: {
      type: Object,
      required: false,
      default: () => ({
        page: 'page', // 第几页
        rows: 'rows', // 显示条数
        total: 'count' // 总记录条数
      })
    }
  },
  // 设置绑定参数
  model: {
    prop: 'pager',
    event: 'setPager'
  },
  computed: {
    total () {
      return this.pager.total || 0;
    },
    // 检测获取到的数据是否为空
    isEmptyList () {
      return Math.ceil(this.pager.total / this.pager.rows) < this.pager.page;
    }
  },
  watch: {
    total () {
      // 存在记录但未获取到数据时, 重新请求
      if (this.pager.page > 1 && this.isEmptyList) {
        this.$emit('setPager', Object.assign(this.pager, {
          [this.page]: this.pager.page - 1
        }));
        this.$emit('query');
      }
    }
  },
  methods: {
    // 每页条数
    onChangeSize (rows) {
      const temp = {
        [this.rows]: rows,
        // 当显示条数小于或等于总条数时，重置页数
        [this.page]: rows <= this.total ? 1 : this.pager.page
      };

      this.$emit('setPager', Object.assign(this.pager, temp));
      // 触发父组件查询请求
      this.$emit('query');
    },
    // 翻页
    onChangePage (page) {
      console.log('page :', page);
      this.$emit('setPager', Object.assign(this.pager, { [this.page]: page }));
      this.$emit('query');
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination-box {
  padding-top: 14px;
  position: relative;
  .el-pagination {
    float: right;
  }
  /deep/ .el-pagination__sizes {
    position: absolute;
    top: 14px;
    left: 150px !important;
  }
}
.page-total {
  padding-left: 20px;
  height: 31px;
  line-height: 31px;
  font-size: 14px;
  color: #838383;
}

.page-total span {
  color: #3a3a3a;
}

.el-input__inner {
  border-radius: 15px;
}
.closeBtn {
  text-align: center;
  margin-top: 10px;
}

.el-input--small .el-input__inner {
  height: 25px;
  line-height: 25px;
}

.el-input__inner {
  border-color: #838383;
}
.el-pagination .btn-next .el-icon,
.el-pagination .btn-prev .el-icon {
  font-size: 19px;
  position: relative;
  top: -3px;
}
.el-pager li {
  margin: 0 8px;
  border-radius: 3px;
  height: 24px;
  line-height: 24px;
  min-width: 20px;
}

.el-pager li.active {
  background: #1881bf !important;
}

.el-pagination__jump {
  margin-right: 20px;
  font-size: 14px;
  color: #838383;
}

.el-pagination__jump .pagination__editor {
  margin-right: 20px;
}

.el-pagination__jump .el-pagination__editor.el-input {
  width: 28px;
}
.el-pagination__jump .el-input__inner {
  box-sizing: border-box;
  width: 100%;
  color: #3a3a3a;
  font-size: 14px;
  border-color: #838383 !important;
  height: 24px;
  line-height: 24px;
  border-radius: 3px;
  background: #fff !important;
}

.el-pagination .el-select .el-input .el-input__inner {
  border-radius: 15px !important;
  font-size: 14px;
  border-color: #838383 !important;
  background: #fff !important;
}
.el-button--text > span > span {
  color: #1881bf;
  font-size: 12px;
  text-decoration: underline;
}
</style>
