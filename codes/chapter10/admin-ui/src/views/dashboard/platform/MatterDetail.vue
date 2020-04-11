<template>
  <div>
    <card-head @lookMore="lookMore()"></card-head>
    <div
      class="i-row"
      v-loading="loading"
      :element-loading-text="$baseConfig.loading.text"
      :element-loading-spinner="$baseConfig.loading.spinner"
      :element-loading-background="$baseConfig.loading.background"
    >
      <template v-if="!isEmpty">
        <el-row class="i-line" v-for="item in items" :key="item.id">
          <div @click="goToPage" class="div-row">
            <span class="i-info fl">{{item.matterName}}</span>
            <span class="i-datetime fl">{{item.matterTime|timeFormat}}</span>
            <status-button :text="item.status"></status-button>
            <level-button :text="item.matterLevel"></level-button>
          </div>
        </el-row>
      </template>
      <template v-else>
        <empty-data msg="各分舵运行良好，无安全隐患，请继续保持哦" height="480px"></empty-data>
      </template>
    </div>
    <el-dialog
      v-dialogDrag
      title="事项详情"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :visible.sync="isShowMore"
      width="800px"
    >
      <matter-detail-list @isHideMore="isShowMore=false"></matter-detail-list>
    </el-dialog>
  </div>
</template>

<script>
import CardHead from './CardHead';
import LevelButton from '@/components/form/LevelButton';
import StatusButton from '@/components/form/StatusButton';
import { getMatterList } from '@/services/dashboard';
import EmptyData from '@/components/form/EmptyData';
import MatterDetailList from './MatterDetailList';

export default {
  components: {
    CardHead,
    LevelButton,
    StatusButton,
    EmptyData,
    MatterDetailList
  },
  data () {
    return {
      loading: true,
      isShowMore: false,
      isEmpty: false,
      items: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      // 待解决事项详情
      getMatterList({ pageNum: 1, pageSize: 9 }).then((res) => {
        console.log('res', res)
        this.items = res.data.list;
        if (this.items.length == 0) {
          this.isEmpty = true;
        }
        this.loading = false;
      }).catch(error => {
        this.loading = false;
      });
    },
    // 查看更多
    lookMore () {
      console.log('查看更多')
      this.isShowMore = true;
    },
    // 调整到新页面
    goToPage () {
      this.$router.push({ path: '/safety/matter/view', query: { referer: 'index' } });
    }
  }
}
</script>

<style lang="scss" scoped>
.i-row {
  min-height: 300px;
  .el-row {
    height: 50px;
    line-height: 50px;
    .i-status-btn {
      margin-right: 0px;
    }
    cursor: pointer;
  }
  .i-line {
    &:after {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0px;
      height: 1px;
      content: "";
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      background-color: #445574;
      width: 100%;
    }
  }
  .div-row {
    display: block;
    height: 50px;
  }
  .div-row div {
    float: right;
    margin: 0px 12px;
  }
  .div-row div.i-level-btn {
    margin-left: 0px;
  }
  .i-info {
    width: 186px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .i-datetime {
    width: 156px;
    text-align: center;
  }
  .i-icon {
    font-size: 24px;
    width: 46px;
    text-align: center;
  }
  .bottom {
    clear: both;
    text-align: center;
  }
}
</style>
