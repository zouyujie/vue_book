<template>
  <div
    class="matter-rank"
    ref="chartsDiv"
    v-loading="loading"
    :element-loading-text="$baseConfig.loading.text"
    :element-loading-spinner="$baseConfig.loading.spinner"
    :element-loading-background="$baseConfig.loading.background"
  >
    <card-head title="其它武林高手武力排名" @lookMore="lookMore()"></card-head>
    <template v-if="!isEmpty">
      <MyEcharts :id="'rankEchart'" :style="{width: '100%',height:'300px'}" :option="chartOption" />
    </template>
    <template v-else>
      <empty-data msg="从此江湖，我是神话，再无对手" height="480px"></empty-data>
    </template>
  </div>
</template>

<script>
import CardHead from './CardHead';
import MyEcharts from '@/components/echarts/index' // echarts
import utils from '@/utils/utils.js';
import { getMatterRankList } from '../../../services/dashboard';
import EmptyData from '../../../components/form/EmptyData';
export default {
  components: {
    CardHead,
    MyEcharts,
    EmptyData
  },
  data () {
    return {
      loading: true,
      isEmpty: false,
      chartOption: {
        color: ['#A96932'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
          borderColor: 'red'
        },
        xAxis: [
          {
            type: 'category',
            data: ['1', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '其它'],
            axisTick: {
              alignWithLabel: true
            },
            // nameLocation:'end',//坐标轴名称显示位置。
            // x轴的字体样式
            axisLabel: {
              show: true,
              textStyle: {
                color: '#83AED3',
              },
              interval: 0,//横轴信息全部显示
            },
            // x轴的颜色和宽度
            axisLine: {
              lineStyle: {
                color: '#BFBFBF',
                width: 1,   //这里是坐标轴的宽度,可以去掉
              }
            }
          }
        ],
        yAxis: [
          {
            minInterval: 1,
            type: 'value',
            name: '武力值',
            nameTextStyle: {
              color: '#83AED3',
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#83AED3',
              }
            },
            // y轴的颜色和宽度
            axisLine: {
              show: true,
              lineStyle: {
                color: 'white',
                width: 1,  //这里是坐标轴的宽度
              }
            },
            splitLine: {
              lineStyle: {
                // 使用深浅的间隔色
                color: '#ccc',
                type: 'dashed',
                shadowBlur: 10
              }
            }
          }
        ],
        series: [
          {
            name: '武力值',
            type: 'bar',
            barWidth: '30',
            label: {
              normal: {
                show: true,
                position: 'top'//'inside'
              }
            },
            data: [10, 52, 200, 334, 390, 330, 220, 40]
          }
        ]
      }
    }
  },
  mounted () {
    this.initCharts();
    this.initData();
  },
  methods: {
    initData () {
      getMatterRankList().then((res) => {
        if (res.code == 200) {
          this.chartOption.xAxis[0].data = res.data.xAxisData;
          this.chartOption.series[0].data = res.data.seriesData;
          this.loading = false;
        }
      }).catch(error => {
        this.loading = false;
      });
    },
    initCharts () {
      // this.chartOption = utils.chartNewLine(this.chartOption, 4, 'xAxis');
    },
    lookMore () {
      console.log('查看更多')
      this.$router.push({ path: '/data-rank/member-level' })
    }
  }
}
</script>

<style lang="scss" scoped>
.i-content {
  padding: 8px 20px;
}
</style>
