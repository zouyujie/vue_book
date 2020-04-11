<template>
  <div class="matter-detail-list">
    <div class="search-bar">
      <div class="search-item">
        <label>分舵名称：</label>
        <Projecttree v-model="treeData" :allChecked="true" :anotherStyle="false"></Projecttree>
      </div>
      <div class="search-item">
        <label>事项名称：</label>
        <el-input v-model="searchOptions.matterName" placeholder="事项名称" clearable></el-input>
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
        <el-table
          v-loading="loading"
          :element-loading-text="$baseConfig.loading.text"
          :element-loading-spinner="$baseConfig.loading.spinner"
          :element-loading-background="$baseConfig.loading.background"
          :data="tableData"
          :height="tableHeight"
          @sort-change="sortChange"
          border
          style="width: 100%"
          ref="table"
        >
          <el-table-column prop="shopName" label="分舵名称"></el-table-column>
          <el-table-column prop="matterName" label="事项名称" width="130">
            <template slot-scope="scope">
              <el-link
                class="ellipse"
                type="primary"
                :title="scope.row.matterName"
                @click="goToPage(scope.row)"
              >{{scope.row.matterName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="事项时间" align="center" sortable="custom" prop="matterTime">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">{{ scope.row.matterTime |timeFormat }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="事项级别"
            width="100"
            align="center"
            sortable="custom"
            prop="matterLevel"
          >
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <level-button :text="scope.row.matterLevel"></level-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="处理状态" width="100" align="center" sortable="custom" prop="status">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <status-button :text="scope.row.status"></status-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="handler" label="处理人" align="center"></el-table-column>
          <el-table-column label="响应时间" align="center" sortable="custom" prop="responseTimeLength">
            <template slot-scope="scope">{{scope.row.matterTime|timeFormat}}</template>
          </el-table-column>
        </el-table>
        <Pager :pager="pager" @query="getItemList" @setPager="setPager"></Pager>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <div style="display: inline-block">
        <el-button type="primary" @click="isHide">确 定</el-button>
        <el-button @click="isHide">取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getMatterList } from '@/services/dashboard';
import LevelButton from '../../../components/form/LevelButton';
import StatusButton from '../../../components/form/StatusButton';
import { matterStatus, matterSystem } from '../../../enum/matter-enum.js';
import Projecttree from '@/components/projecttree/index.js';
import Pager from '@/components/table/Pager'
export default {
  components: {
    LevelButton,
    StatusButton,
    Pager,
    Projecttree
  },
  data () {
    return {
      loading: false,
      btnLoading: false,
      tableHeight: 400,
      searchOptions: {
        shopNumber: '', pageNum: 1, pageSize: 15, matterName: '',
        orderType: '', orderField: '', status: '0,2'
      },
      tableData: [],
      pager: {
        total: 100,
        pageNum: 1,
        pageSize: 15
      },
      treeData: []
    }
  },
  watch: {
    treeData: {
      handler: function (val) {
        if (val) {
          this.searchOptions.shopNumber = val.join(',')
        }
      }
    }
  },
  created () {
    this.getItemList();
  },
  methods: {
    getItemList () {
      this.ctrlLoading(true);
      this.searchOptions.pageNum = this.pager.pageNum;
      this.searchOptions.pageSize = this.pager.pageSize;
      this.searchOptions.shopIds = this.treeData;
      console.log('searchOptions', this.searchOptions)
      // 待解决事项详情
      getMatterList(this.searchOptions).then((res) => {
        console.log('res', res)
        this.tableData = res.data.list;
        this.pager.total = res.data.total;
        if (this.tableData.length == 0) {
          this.tableData = null;
        }
        this.ctrlLoading(false);
      }).catch(() => {
        this.ctrlLoading(false);
      });
    },
    // 排序变化
    sortChange (data) {
      console.log('data', data);
      if (data.prop) {
        this.searchOptions.orderType = data.order == 'ascending' ? 'asc' : 'desc';
        this.searchOptions.orderField = data.prop;
        this.getItemList();
      }
    },
    ctrlLoading (flag) {
      this.btnLoading = flag;
      this.loading = flag;
    },
    // 关闭
    isHide () {
      this.$emit('isHideMore');
    },
    // 页面跳转
    goToPage (item) {
      this.$store.commit('base/updateCurShop', { shopId: item.shopId, shopNumber: item.shopNumber, shopName: item.shopName });
      this.$router.push({ path: '/safety/matter/view', name: 'matterView', params: { referer: 'index', id: item.id } });
    },
    setPager (pager) {
      this.pager.pageNum = pager.page;
    }
  }
}
</script>

<style lang="scss" scoped>
.ellipse {
  /deep/ .el-link--inner {
    width: 108px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
}
</style>
