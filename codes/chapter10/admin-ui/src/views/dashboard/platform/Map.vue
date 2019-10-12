<template>
  <div
    class="i-map-container"
    @click.self="hideShopDetail"
    v-loading="loading"
    :element-loading-text="$baseConfig.loading.text"
    :element-loading-spinner="$baseConfig.loading.spinner"
    :element-loading-background="$baseConfig.loading.background"
  >
    <div class="i-info">
      天下会有
      <span class="i-key">
        <ICountUp
          :startVal="countAnimation.start"
          :endVal="endVal"
          :decimals="countAnimation.decimals"
          :duration="countAnimation.duration"
        ></ICountUp>
      </span>个分舵，覆盖
      <span class="i-key">152</span>个城市，覆盖率
      <span class="i-key">84%</span>
      <br />旗下设立堂主：
      <span class="i-key">4</span>个，舵主：
      <span class="i-key">24</span>个，分舵主
      <span class="i-key">256</span>个
    </div>
    <div class="i-map" id="mapContainer"></div>
    <span
      v-if="showFold"
      class="fold"
      @click="onFold"
      :title="isFold?'折叠':'展开'"
      :class="isFold?'up':'down'"
    >
      <i class="iconfont" :class="isFold?'icon-downarrow':'icon-uparrow'"></i>
    </span>
    <transition name="el-zoom-in-center">
      <div class="i-shop-info" v-show="showDetail">
        <span class="border left-bottom" />
        <span class="border right-bottom" />
        <div class="i-show-head">
          <span class="i-show-name">{{curShopPoint.name}}分舵</span>
        </div>
        <div class="i-shop-detail">
          <dl>
            <dd>
              累计待办事项：
              <span>2</span>个
            </dd>
            <dd>
              分舵面积：
              <span>1000平方千米</span>
            </dd>
          </dl>
          <dl>
            <dd>
              今日事项：
              <span>3</span>个
            </dd>
            <dd>详细地址：长沙城橘子洲</dd>
          </dl>
          <dl>
            <dd>
              已解决事项：
              <span>3</span>个
            </dd>
            <dd>
              联系电话：
              <span>666-666666</span>
            </dd>
          </dl>
          <dl>
            <dd>
              平均响应时长：
              <span>6</span>天
            </dd>
            <dd>
              成立时间：
              <span>2019年1月20日</span>
            </dd>
          </dl>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Echarts from 'echarts'
import ICountUp from 'vue-countup-v2';
import chinaJson from '../../../assets/json/china'
import china_option from './map-options/china-map-option'
import { convertData, pointsData, matterPointData, uplinePointData } from '@/mock/json'

export default {
  components: {
    ICountUp
  },
  data () {
    return {
      loading: true,
      showDetail: false,//显示分舵详细信息
      showFold: false,//显示折叠/展开按钮
      isFold: true,//是否是折叠按钮
      endVal: 256,
      countAnimation: {
        start: 0,
        decimals: 0,
        duration: 3
      },
      mapChart: null,
      dataName: '',
      curShopPoint: { name: '' }
    };
  },
  mounted () {
    this.mapChartsInit();
    this.setMapView();
    //模拟获取完请求数据后，关闭loading
    let that = this;
    setTimeout(() => {
      that.loading = false;
    }, 300);
  },
  methods: {
    onFold () {
      this.showDetail = !this.showDetail;
      this.isFold = !this.isFold;
    },
    //隐藏分舵详情弹窗
    hideShopDetail () {
      console.log('hideShopDetail')
      this.showDetail = false;
    },
    // 根据ID获取地图容器
    mapChartsInit: function () {
      this.mapChart = Echarts.init(document.getElementById('mapContainer'))
    },
    setMapView () {
      var mapOption = Object.assign({}, china_option)
      mapOption.series[0].data = convertData(pointsData);
      mapOption.series[1].data = convertData(matterPointData);
      mapOption.series[2].data = convertData(uplinePointData);
      Echarts.registerMap('china', chinaJson)// 注册中国地图
      this.mapChart.setOption(mapOption)// 显示中国地图
      //如果分舵详情弹窗是显示状态，更新弹窗数据
      if (this.showDetail) {
        switch (this.seriesIndex) {
          case 0:
            this.curShopPoint = pointsData.find(n => n.name == this.dataName);
            break;
          case 1:
            this.curShopPoint = matterPointData.find(n => n.name == this.dataName);
            break;
          case 2:
            this.curShopPoint = uplinePointData.find(n => n.name == this.dataName);
            break;
          default:
            break;
        }
      }
      console.log('object :', this.seriesIndex, this.curShopPoint, this.dataName, matterPointData);
      let that = this;
      that.mapChart.on('click', function (params) {
        console.log('params', params)
        if (params.data) {
          that.showDetail = true;
          that.dataName = params.name;
          that.showFold = true;
          that.isFold = true;
          that.curShopPoint = params.data;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../index.scss";
.i-map-container {
  height: 100%;
}
.i-info {
  display: block;
  line-height: 56px;
  position: absolute;
  margin: 10px 0px 0px 40px;
  font-size: 22px;
  color: #94e3f9;
  z-index: 2;
  .i-key {
    color: white;
    font-size: 36px;
    font-weight: 600;
    margin: 0px 2px;
  }
}
.i-shop-info {
  // opacity: 0.5;
  background: rgba(27, 36, 63, 0.5);
  height: 128px;
  width: calc(100% - 40px);
  // background-color: #1b243f;
  display: block;
  bottom: 0px;
  position: absolute;
  padding: 4px 20px;
  color: #dfe8f8;
  z-index: 2;
  .one-level {
    color: $oneLevelColor;
  }
  .i-show-head {
    height: 52px;
    line-height: 52px;
    font-size: 20px;
    .i-show-name {
      float: left;
    }
    dl {
      float: left;
      margin-left: 25px;
    }
    dd {
      line-height: 52px;
      height: 52px;
      float: left;
      width: 60px;
      margin: 0px 5px;
      .i-icon {
        margin: 0px 4px;
      }
      span {
        font-size: 18px;
      }
    }
  }
  .i-shop-detail {
    dl {
      float: left;
      width: 25%;
    }
    dd {
      line-height: 38px;
      height: 38px;
    }
  }
}
.i-map {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
.fold {
  display: block;
  width: 24px;
  height: 14px;
  background: #1b4569;
  z-index: 3;
  position: absolute;
  margin-left: -12px;
  left: 50%;
  cursor: pointer;
  text-align: center;
  &.up {
    bottom: 120px;
    border-radius: 0px 0px 4px 4px;
  }
  &.down {
    border-radius: 4px 4px 0px 0px;
    bottom: 0px;
    .iconfont {
      position: absolute;
      bottom: 0px;
      left: 4px;
    }
  }
  &:hover {
    color: $hoverColor;
    .iconfont {
      color: $fontColor;
    }
  }
  .iconfont {
    color: #67cbff;
  }
}
</style>
