<template>
  <div class="v-table-list">
    <el-table :id="id"
              ref="table"
              stripe
              :height="tableHeight"
              :header-cell-style="tableStyle.headercellstyle"
              :cell-style="tableStyle.cellstyle"
              :row-style="tableStyle.rowstyle"
              :data="vTableData.data"
              @sort-change="sortChange"
              @cell-dblclick="cellDblclick">

      <!--序号-->
      <el-table-column v-if="showSequence"
                       type="index"
                       label="序号"
                       width="80"
                       :index="numerical" />

      <!--thead-->
      <el-table-column v-for="(item, index) of vTableData.tHead"
                       :key="index"
                       :formatter="formatter"
                       :sortable="item.sortable"
                       :prop="item.prop"
                       :label="item.text"
                       max-width="150"
                       show-overflow-tooltip />

      <el-table-column v-if="vTableData.operateBtn && vTableData.operateBtn.length"
                       label="操作"
                       fixed="right"
                       min-width="150">
        <template slot-scope="scope">
          <!--自定义按钮栏-->
          <el-button v-for="(item,index) in vTableData.operateBtn"
                     :key="index"
                     class="defind-btn"
                     type="text"
                     size="small"
                     @click="customBtnClick(scope.row, item.btnKey)">{{ item.text }}</el-button>

        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'VTableDataList',
  props: ['id', 'vTableData', 'showSequence', 'formatter'],
  data () {
    return {
      tableHeight: '',
      tableStyle: {
        headercellstyle: {
          background: 'rgba(241,241,241,1)',
          fontSize: '14px',
          color: '#3A3A3A'
        },
        cellstyle: {
          border: 'none',
          fontSize: '12px',
          textAlign: 'left'
        },
        rowstyle: {
          height: '40px'
        }
      },
      multipleSelection: []
    };
  },
  created () {
    console.log(this.vTableData);
    if (this.vTableData.textAlign) {
      this.tableStyle.cellstyle.textAlign = this.vTableData.textAlign;
    }
    const _height = window.innerHeight - 325;
    console.log('_height:' + _height)
    this.tableHeight = this.vTableData.height || _height;
  },
  mounted () {
  },
  beforeDestroy () { },
  methods: {
    numerical (i) {
      return ++i;
    },
    // 排序表头条件发生变化
    sortChange (columnAttr) {

    },
    cellDblclick (row, column, cell, event) {
      //    console.log(row);
    }
  }
};
</script>

<style scoped lang="scss">
$grayColor: #838383;
$fontC3: #333;

.v-table-list {
  .table-list {
    background: rgba(241, 241, 241, 1);
    font-size: 14px;
    color: #3a3a3a;
  }
  .el-pagination-box {
    padding: 20px 10px 0 10px;

    .page-total {
      float: left;

      .total {
        color: $grayColor;
        float: left;
        line-height: 30px;
        margin-right: 20px;

        .total-num {
          color: $fontC3;
        }
      }

      .page-select {
        float: left;
        width: 100px;
      }
    }

    .page-list {
      float: right;

      .go-to {
        display: inline-block;
        color: $grayColor;
        vertical-align: text-top;

        .go-to-ipt {
          width: 24px;
          height: 24px;
          text-align: center;
          border: 1px solid $grayColor;
          outline: none;
          color: #1881bf;
          border-radius: 4px;
        }
        .go-to-btn {
          cursor: pointer;
        }
        :hover {
          color: #409eff;
        }
      }

      .pages-tabs {
        display: inline-block;
      }
    }

    .clear-both {
      clear: both;
    }
  }
}

.defind-btn {
  color: #1881bf;
  text-decoration: underline;
}
.v-table-list {
  .el-select .el-input.is-focus .el-input__inner {
    border-color: #838383;
  }
  .el-pagination .btn-next .el-icon,
  .el-pagination .btn-prev .el-icon {
    font-size: 19px;
  }
}
</style>
