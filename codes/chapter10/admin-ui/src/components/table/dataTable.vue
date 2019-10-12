<template>
  <div class="dataTableBox">
    <el-table
      :data="tableData.tData"
      stripe
      :height="tableHeight"
      :header-cell-style="headercellstyle"
      :row-class-name="rowclassname"
      :header-cell-class-name="headercellclassname"
      :cell-class-name="cellclassname"
      :row-style="rowstyle"
      :cell-style="cellstyle"
      style="width: 100%"
      @cell-dblclick="cellDblclick"
      @selection-change="selectionChange"
    >
      <el-table-column v-if="tableData.isMultiple" type="selection" width="55"/>
      <el-table-column
        v-if="tableData.isRank"
        type="index"
        align="center"
        width="80"
        label="序号"
        :index="numerical"
      />
      <template v-for="(tit,index) in tableData.tHead">
        <el-table-column
          v-if="tit.type == 'image'"
          v-show="!tit.isHide"
          :key="index"
          :label="tit.name"
          :width="tit.width?tit.width:''"
          :formatter="formatter"
        >
          <template slot-scope="scope">
            <span v-if="!scope.row[tit.field]">--</span>
            <img v-else style="width: 30px" :src="scope.row[tit.field]" alt>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="tit.type == 'video'"
          v-show="!tit.isHide"
          :key="index"
          :label="tit.name"
          :width="tit.width?tit.width:''"
          :formatter="formatter"
        >
          <template slot-scope="scope">
            <span v-if="!scope.row[tit.field]">--</span>
            <video
              v-else
              style="width: 30px"
              :src="scope.row[tit.field]"
              controls="controls"
            >您的浏览器不支持 video 标签。</video>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="tit.type == 'custom'"
          v-show="!tit.isHide"
          :key="index"
          :label="tit.name"
          :width="tit.width?tit.width:''"
          :formatter="formatter"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="allClick(tit.cltype, scope.row)">
              <span v-html="tit.custom"/>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="tit.type == 'ellipsis'"
          v-show="!tit.isHide"
          :key="index"
          :label="tit.name"
          :width="tit.width?tit.width:''"
          :formatter="formatter"
        >
          <template slot-scope="scope">
            <div class="ellipsis" :title="scope.row[tit.field]">{{ scope.row[tit.field] }}</div>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          v-show="!tit.isHide"
          :key="index"
          :prop="tit.field"
          :label="tit.name"
          :width="tit.width?tit.width:''"
          :formatter="formatter"
          show-overflow-tooltip
        />
      </template>
      <el-table-column
        v-if="tableData.actionBtns"
        label="操作"
        :width="tableData.actionBtWidth ? tableData.actionBtWidth :'' "
      >
        <template slot-scope="scope">
          <template v-for="btn of tableData.actionBtns">
            <template v-if="btn.filter != undefined && btn.filter != null">
              <el-button
                v-if="btn.filter.needel.indexOf(scope.row[btn.filter.field])>-1"
                type="text"
                :key="btn.filter.field"
                @click="allClick(btn.type, scope.row,dataSum)"
              >
                <span v-if="btn.diy" v-html="btn.label"/>
                <!-- <span v-if="btn.data==2" v-html="btn.label" style='color: #1881BF;font-size: 12px;'></span> -->
                <span v-else style="color: #1881BF;font-size: 12px;" v-html="btn.label"/>
              </el-button>
              <!--<el-button v-else type="text" style="width:30px">
                                -
              </el-button>-->
            </template>
            <template v-else>
              <el-button
                v-if="btn.data&&btn.data.indexOf(scope.row.type)>-1"
                type="text"
                :key="btn.filter.field"
                @click="allClick(btn.type, scope.row, dataSum)"
              >
                <!-- <span v-if="btn.diy" v-html="btn.label"></span> -->
                <span style="color: #1881BF;font-size: 12px;" v-html="btn.label"/>
                <!-- <span  v-html="btn.label" style='color: #1881BF;font-size: 12px;'></span> -->
              </el-button>
              <el-button
                v-else-if="!btn.data"
                type="text"
                :key="btn.filter.field"
                @click="allClick(btn.type, scope.row, dataSum)"
              >
                <!-- <span v-if="btn.diy" v-html="btn.label"></span> -->
                <span style="color: #1881BF;font-size: 12px;" v-html="btn.label"/>
                <!-- <span v-else-if="!btn.data" v-html="btn.label" style='color: #1881BF;font-size: 12px;'></span> -->
              </el-button>
            </template>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="ispagination" class="paginationBox clear">
      <span class="pageTotal fl">
        共有记录：
        <span>{{ tableData.total }}</span>条
      </span>
      <el-pagination
        :current-page="ispagination && ajax.data ? ajax.data.pageNum:''"
        :page-sizes="[10,15,20,50, 100,200]"
        :page-size="ispagination && ajax.data ? ajax.data.pageSize:''"
        layout="sizes,jumper, prev, pager, next"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: Number,
      default: 0
    },
    flush: { type: String, default: '' },
    ispagination: {
      type: Boolean,
      default: function () {
        return true;
      }
    },
    inSerachFilte: {},
    inAjax: {
      type: Object,
      default: function () {
        return {
          url: '',
          method: 'post',
          data: {
            pageNum: 1,
            pageSize: 15
          }
        };
      }
    },
    inTableData: {
      type: Object,
      default: function () {
        return {
          tHead: [
            {
              name: '主键',
              field: 'id',
              width: 100,
              isHide: true
            },
            {
              name: '用户名',
              field: 'username'
            },
            {
              name: '真实姓名',
              field: 'realname'
            },
            {
              name: '状态',
              field: 'status'
            },
            {
              name: '状态',
              field: 'status',
              type: 'image'
            }
          ],
          tData: [],
          total: 0,
          actionBtWidth: '',
          actionBtns: [
            {
              type: 'info',
              label:
                "<span style='color: #1881BF;font-size: 12px;text-decoration: underline'>详情</span>",
              filter: {
                field: 'id',
                needel: [1, 2, 3, 4, 5]
              }
            },
            {
              type: 'hulve',
              label:
                "<span style='color: #1881BF;font-size: 12px;text-decoration: underline'>忽略</span>"
            },
            {
              type: 'del',
              label:
                "<span style='color: #24D330;font-size: 12px;text-decoration: underline'>转为工单</span>",
              filter: {
                field: 'id',
                needel: [2, 3, 4, 5]
              }
            }
          ]
        };
      }
    },
    formatter: {},
    headercellclassname: {},
    cellclassname: {}
  },
  data () {
    return {
      tableHeight: '500',
      ajax: this.inAjax,
      tableData: this.inTableData,
      serachFilte: this.inSerachFilte,
      headercellstyle: {
        background: 'rgba(241,241,241,1)',
        fontSize: '14px',
        color: '#3A3A3A'
      },
      cellstyle: {
        background: 'transparent',
        border: 'none',
        fontSize: '12px'
      },
      rowstyle: { height: '30px' },
      length: '',
      dataSum: '' // 页面数据条数
    };
  },
  watch: {
    height (curVal, oldVal) {
      console.log('curVal', curVal)
      if (curVal) {
        this.tableHeight = curVal;
      }
    },
    inSerachFilte: {
      handler (newData, oldData) {
        this.serachFilte = newData;
        console.log(newData, 'ser');
        this.ajax.data.pageNum = 1;
        this.getList();
      },
      deep: true
    },
    flush: {
      handler (newData, oldData) {
        this.getList();
      }
    },
    inAjax: {
      handler (newData, oldData) {
        this.ajax = this.inAjax;
        this.tableData = this.inTableData;
        this.serachFilte = this.inSerachFilte;
        this.getList();
      },
      deep: true
    }
  },
  created () {
    this.tableHeight = this.height === undefined ? window.innerHeight - 320 : this.height;
    // alert( this.tableHeight)
    console.log('this.tableHeight', this.tableHeight)
  },
  mounted () {
    this.getList();
  },
  methods: {
    numerical (i) {
      if (this.ajax.data && this.ajax.data.pageNum) {
        return (this.ajax.data.pageNum - 1) * this.ajax.data.pageSize + i + 1;
      } else {
        return ++i;
      }
    },
    getList () {
      if (!this.ajax.url || (typeof (this.ajax.syn) !== 'undefined' && this.ajax.syn === false)) {
        return;
      }
      const data = Object.assign({}, this.ajax.data, this.serachFilte);
      // console.log(data, this.ajax)
      if (this.ajax.method === 'get') {
        this.$axios
          .get(this.ajax.url, data)
          .then(res => {
            console.log('res', res);
            const data = res.data;
            if (data.hasOwnProperty('list')) {
              this.tableData.tData = data.list;
            } else if (data.hasOwnProperty('array')) {
              console.log(data.array, 5656565);
              data.array.forEach(item => {
                if (item.updateDate) {
                  item.updateDate = item.updateDate.slice(0, 10)
                }
              });
              this.tableData.tData = data.array;
              console.log(data.array);
            } else {
              this.tableData.tData = [];
              this.tableData.tData.push(data);
            }
            this.dataSum = this.tableData.tData.length;
            if (data.hasOwnProperty('total')) {
              this.tableData.total = data.total;
              if (this.tableData.total === 0) {
                this.$message.success('暂时没有数据哦！')
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
      if (this.ajax.method === 'post') {
        this.$axios
          .post(this.ajax.url, data)
          .then(res => {
            let data = res.data;
            if (
              this.ajax.resData !== undefined &&
              this.ajax.resData.length > 0
            ) {
              for (const key of this.ajax.resData) {
                data = data[key];
              }
            }
            if (data.hasOwnProperty('list')) {
              this.tableData.tData = data.list;
              this.tableData.tData.forEach(item => {
                if (item.project && item.project.split(',').length > 5) {
                  item.project =
                    item.project.split(',')[0] +
                    ',' +
                    item.project.split(',')[1] +
                    '等' +
                    item.project.split(',').length +
                    '个分舵';
                }
              });
            } else if (data.hasOwnProperty('data')) {
              this.tableData.tData = data.data;
              // this.tableData.total = data.array.length;
            } else {
              this.tableData.tData.push(data);
            }
            this.dataSum = this.tableData.tData.length;
            if (data.hasOwnProperty('total')) {
              this.tableData.total = data.total;
              if (this.tableData.total === 0) {
                this.$message.success('暂时没有数据哦！')
              }
            }
            if (this.tableData.hasOwnProperty('errorTotal')) {
              this.tableData.errorTotal = data.errorTotal;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    allClick (type, row) {
      const outData = {
        type: type,
        rowData: row,
        total: this.dataSum,
        pageNum: this.ajax.data.pageNum
      };
      this.$emit('rowClick', outData);
      /* console.log('表格栏点击事件------' + type);
      console.log(row);*/
    },
    cellDblclick (row, column, cell, event) {
      const outData = {
        row: row,
        column: column,
        cell: cell,
        event: event
      };
      this.$emit('cellDbClick', outData);
    },
    selectionChange (selection) {
      this.$emit('selection', selection);
    },
    handleSizeChange (val) {
      this.ajax.data.pageSize = val;
      const totalNum = this.ajax.data.pageSize * this.ajax.data.pageNum
      if (totalNum > this.tableData.total && val > this.tableData.total) {
        this.ajax.data.pageNum = 1
      } else if (totalNum > this.tableData.total && val < this.tableData.total) {
        this.ajax.data.pageNum = Math.ceil(this.tableData.total / val)
      }
      this.getList();
    },
    handleCurrentChange (val) {
      console.log(11111)
      this.ajax.data.pageNum = val;
      this.getList();
    },
    rowclassname (row) {
      if (++row.rowIndex % 2 === 0) {
        return 'rowstylebg';
      }
    }
  }
};
</script>
<style scoped>
.dataTableBox {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
.dataTableBox {
  .el-table__body-wrapper {
    overflow-y: auto !important;
  }
}
.dataTableBox .rowstylebg {
  background: rgba(247, 251, 252, 1) !important;
}

.dataTableBox .fontRed {
  color: #ff4848;
}

.dataTableBox .fontGreen {
  color: #36b888;
}

.dataTableBox .fontGray {
  color: #a4a4a4;
}

.dataTableBox .fontBlack {
  color: #353535;
  font-weight: bold;
}

.dataTableBox .pl10 {
  padding-left: 10px;
}

.dataTableBox .pl20 {
  padding-left: 20px;
}

.dataTableBox .pl30 {
  padding-left: 30px;
}

.dataTableBox .pr20 {
  padding-right: 20px;
}

.dataTableBox .pr30 {
  padding-right: 30px;
}

.dataTableBox .pr40 {
  padding-right: 40px;
}

.dataTableBox .el-checkbox__inner {
  width: 15px;
  height: 15px;
  border-color: #a5b3bc;
  border-radius: 0;
}

.dataTableBox .el-table::before {
  background: #ccc;
}

.dataTableBox .operationTit div {
  padding-left: 27%;
}

.dataTableBox .operationbts div button {
  font-size: 14px;
  font-weight: bold;
}

.el-button + .el-button {
  padding-left: 1.5%;
}

.dataTableBox .pageTotal {
  padding-left: 20px;
  height: 31px;
  line-height: 31px;
  font-size: 14px;
  color: #838383;
}

.dataTableBox .pageTotal span {
  color: #3a3a3a;
}

.dataTableBox .el-input__inner {
  border-radius: 15px;
}
.closeBtn {
  text-align: center;
  margin-top: 10px;
}

.dataTableBox .setPagesize .el-input--small .el-input__inner {
  height: 25px;
  line-height: 25px;
}

.dataTableBox .setPagesize .el-input__inner {
  border-color: #838383;
}

.dataTableBox .paginationBox {
  padding-top: 14px;
  position: relative;
}

.dataTableBox .paginationBox .el-pagination {
  float: right;
}

.dataTableBox .paginationBox .el-pagination .btn-next .el-icon,
.el-pagination .btn-prev .el-icon {
  font-size: 19px;
  position: relative;
  top: -3px;
}

.dataTableBox .paginationBox .el-pager li {
  margin: 0 8px;
  border-radius: 3px;
  height: 24px;
  line-height: 24px;
  min-width: 20px;
}

.dataTableBox .paginationBox .el-pager li.active {
  background: #1881bf !important;
}

.dataTableBox .paginationBox .el-pagination__jump {
  margin-right: 20px;
  font-size: 14px;
  color: #838383;
}

.dataTableBox .paginationBox .el-pagination__jump .pagination__editor {
  margin-right: 20px;
}

.dataTableBox
  .paginationBox
  .el-pagination__jump
  .el-pagination__editor.el-input {
  width: 28px;
}

.dataTableBox .paginationBox .el-pagination__jump .el-input__inner {
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

.dataTableBox .paginationBox .el-pagination__sizes {
  position: absolute;
  top: 14px;
  left: 150px !important;
}

.dataTableBox
  .paginationBox
  .el-pagination
  .el-select
  .el-input
  .el-input__inner {
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
