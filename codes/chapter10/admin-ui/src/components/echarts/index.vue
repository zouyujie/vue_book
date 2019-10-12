<template>
  <!-- 每一个图表都有自己唯一的id,需要动态传入。 -->
  <div :id="id" :class="myclass" :style="style" />
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: 'myCharts'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    },
    myclass: {
      type: String,
      default: 'echarts-line'
    },
    option: {
      type: Object,
      default: () => { }
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      MyEcharts: null // echarts实例
    }
  },
  computed: {
    style () {
      return {
        height: this.height,
        width: this.width
      }
    }
  },
  watch: {
    // 要监听的对象 option
    // 由于echarts采用的数据驱动，所以需要监听数据的变化来重绘图表
    option: {
      handler (newVal, oldVal) {
        if (this.MyEcharts) {
          if (newVal) {
            console.log(newVal)
            this.MyEcharts.setOption(newVal, true)
          } else {
            this.MyEcharts.setOption(oldVal, true)
          }
          setTimeout(() => {
            this.MyEcharts.resize()
          })
        } else {
          this.InitCharts()
        }
      },
      deep: true // 对象内部属性的监听，关键。
    },
    height (val) {
      if (val) {
        this.height = val;
      }
      if (this.MyEcharts) {
        this.MyEcharts.setOption(this.option, true)
      }
      else {
        this.InitCharts()
      }
    },
    loading (val) {
      console.log('变化', val)
      if (val == true) {
        this.showLoading();
      }
      if (val == false) {
        this.hideLoading();
      }
    }
  },
  mounted () {
    this.InitCharts()
  },
  methods: {
    // 组件初始化
    InitCharts () {
      console.log('this.MyEcharts', this.id, this.MyEcharts)
      this.MyEcharts = this.$echarts.init(document.getElementById(this.id))
      if (this.loading == true) {
        this.showLoading();
      }
      /**
 * 此方法适用于所有分舵的图表，但是每个配置都需要在父组件传进来，相当于每个图表的配置都需要写一遍，不是特别的省代码，主要是灵活度高
 * echarts的配置项，你可以直接在外边配置好，直接扔进来一个this.option
 */
      this.MyEcharts.clear() // 适用于大数据量的切换时图表绘制错误,先清空在重绘
      this.MyEcharts.setOption(this.option, true) // 设置为true可以是图表切换数据时重新渲染
      setTimeout(() => {
        this.MyEcharts.resize()
      })
      // 当窗口变化时随浏览器大小而改变
      const _this = this
      window.addEventListener('resize', function () {
        _this.MyEcharts.resize()
      })
      _this.MyEcharts.on('click', function (params) {
        _this.mapClick(params);
      })
    },
    //组件单击事件
    mapClick (params) {
      let that = this;
      console.log(params);
      let data = {
        color: params.color,
        data: params.data,
        dataIndex: params.dataIndex,
        seriesIndex: params.seriesIndex,
        chartType: params.componentSubType
      };
      that.$parent.$emit("chartParams", JSON.stringify(data));
      if (params.seriesType == "map") {
        that.$emit("mapValue", params.name);
      } else {
        that.$emit("eclick", params);
      }
    },
    showLoading () {
      if (this.MyEcharts) {
        this.MyEcharts.showLoading({
          text: 'loading',
          // color: '#4cbbff',
          // textColor: '#4cbbff',
        });
      }
    },
    hideLoading () {
      if (this.MyEcharts) {
        this.MyEcharts.hideLoading();
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.echarts-line {
  height: 100%;
}
</style>
