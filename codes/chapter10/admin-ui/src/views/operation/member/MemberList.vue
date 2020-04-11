<template>
  <div>
    <div class="search-bar">
      <div class="search-item">
        <label>姓名：</label>
        <el-input v-model="memberName" placeholder="请输入" clearable></el-input>
      </div>
      <div class="search-item">
        <label>工号：</label>
        <el-input v-model="memberNumber" placeholder="请输入" clearable></el-input>
      </div>
      <div class="search-item">
        <label>状态：</label>
        <el-select v-model="status" placeholder="请选择" clearable filterable>
          <el-option
            v-for="item in statusOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="search-item">
        <label>部门：</label>
        <tree-select
          v-model="departId"
          placeholder="请选择"
          :clearable="true"
          :data="treeData"
          :defaultProps="defaultProps"
          :onlyLeafSelect="false"
        ></tree-select>
      </div>
      <div class="search-item btn">
        <el-button
          type="primary"
          icon="el-icon-search"
          round
          :loading="btnLoading"
          @click="getItemList"
        >查询</el-button>
      </div>
    </div>
    <div class="search-content">
      <div class="datatable-box">
        <el-table :data="tableData" :height="tableHeight" border style="width: 100%" ref="table">
          <el-table-column type="index" label="序号" :index="indexMethod" width="50"></el-table-column>
          <el-table-column prop="jobNumber" label="工号" width="180" align="center"></el-table-column>
          <el-table-column prop="realName" label="姓名" width="180"></el-table-column>
          <el-table-column prop="orgName" label="部门"></el-table-column>
          <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
          <el-table-column prop="billCount" label="当前工单数"></el-table-column>
          <el-table-column prop="status" label="状态" width="180" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button
                v-if="pageBtns.some(val=>val=='detail')"
                type="text"
                size="small"
                @click="onDetail(scope.row)"
              >详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pager :pager="pager" @query="getItemList" @setPager="setPager"></Pager>
      </div>
      <!-- 详情 -->
      <el-dialog
        v-dialogDrag
        :title="addEditTitle"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :visible.sync="showAddEdit"
        width="800px"
      >详情页面内容</el-dialog>
    </div>
  </div>
</template>

<script>
import { getMemberList, getDepartSelected } from '../../../services/operation';
import baseOptions from '@/utils/baseOptions';
import TreeSelect from '@/components/treeSelect';
import Pager from '@/components/table/Pager'

export default {
  extends: baseOptions,
  components: {
    TreeSelect,
    Pager
  },
  // mixins:[baseOptions],
  data () {
    return {
      isEdit: false,
      addEditTitle: '人员详情',
      showAddEdit: false,//显示新增界面
      showDispatching: false,//显示派工页面
      btnLoading: false, // 查询按钮loading状态
      checkTime: '',
      tableHeight: 400,
      pager: {
        total: 100,
        pageNum: 1,
        pageSize: 10,
      },
      curUserId: '',//当前人员ID
      memberName: '', //姓名
      memberNumber: '', //工号
      departId: '', //部门ID
      tableData: [],
      status: '',//状态
      statusOption: [
        { label: '休假', value: 0 },
        { label: '空闲', value: 1 },
        { label: '忙碌', value: 2 },
      ],
      treeData: [],//部门树
      defaultProps: {
        children: 'options',
        label: 'name',
        key: 'id',
        disabled: 'disabled'
      },
    }
  },
  created () {
    this.initData();
    this.getItemList();
  },
  mounted: function () {
    this.$common.initTableHeight(this, 210);
  },
  watch: {
    //门店编码
    shopNumber (val) {
      this.getItemList();
    }
  },
  methods: {
    //初始化数据
    initData () {
      getDepartSelected().then(res => {
        if (res.code == 200) {
          this.treeData = res.data.array;
        }
      })
    },
    ctrlLoading (flag) {
      this.btnLoading = flag;
      this.$common.updateLoadingStatus(flag);
    },
    // 查询请求
    getItemList () {
      this.ctrlLoading(true)
      getMemberList({
        pageNum: this.pager.pageNum, pageSize: this.pager.pageSize, shopNumber: this.shopNumber, memberName: this.memberName,
        memberNumber: this.memberNumber, departId: this.departId, status: this.status
      }).then(res => {
        // console.log('res.data.list :', res.data.list);
        this.tableData = res.data.list;
        this.pager.total = res.data.total;
        this.ctrlLoading(false)
      }).catch(error => {
        this.ctrlLoading(false)
      })
    },
    //打开编辑弹窗
    onDetail (row) {
      console.log(row)
      this.showAddEdit = true;
      this.isEdit = true;
      this.curUserId = row.userId;
    },
    //隐藏 添加/编辑 弹窗
    hideAddEditWin () {
      this.showAddEdit = false;
    },
    setPager (pager) {
      this.pager.pageNum = pager.page;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>