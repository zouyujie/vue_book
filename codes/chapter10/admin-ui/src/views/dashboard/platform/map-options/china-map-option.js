export default {
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(10,55,100,0.9)',
    borderColor: '#01EFF2',
    borderWidth: 1,
    padding: [11, 8],
    confine: true,
    textStyle: {
      color: '#B6E1F7',
      lineHeight: 24
    },
    hideDelay: 0,
    //鼠标停留在省份显示的数据
    formatter: function(obj) {
      if (obj.data) {
        let str =
          '<div class="bmr-row bmr-justify-center bmr-items-center bmr-map-tips">';
        str += '<h3>' + obj.data.name + '分舵</h3>';
        str += '</div>';
        str +=
          '<div class="bmr-row bmr-justify-center bmr-items-center bmr-map-tips">';
        str += '<h4>人数：<sup></sup></h4>';
        str += '<span>' + (obj.data.num || 0) + '位<sup></sup></span>';
        str += '</div>';
        str +=
          '<div class="bmr-row bmr-justify-center bmr-items-center bmr-map-tips">';
        str += '<h4>面积：<sup></sup></h4>';
        str += '<span>' + (obj.data.area || 0) + 'm<sup>2</sup></span>';
        str += '</div>';
        str +=
          '<div class="bmr-row bmr-justify-center bmr-items-center bmr-map-tips">';
        str += '<h4>白银：<sup></sup></h4>';
        str += '<span>' + (obj.data.energy || 0) + '两<sup></sup></span>';
        str += '</div>';
        str +=
          '<div class="bmr-row bmr-justify-center bmr-items-center bmr-map-tips">';
        str += '<h4>今日新增人数：<sup></sup></h4>';
        str += '<span>' + (obj.data.unitArea || 0) + '位</span>';
        str += '</div>';
        return str;
      }
    }
  },

  toolbox: {
    show: false,
    orient: 'vertical',
    x: 'right',
    y: 'center',
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  roamController: {
    show: false,
    x: 'right',
    mapTypeControl: {
      china: true
    }
  },
  visualMap: {
    min: 800,
    max: 50000,
    realtime: false,
    calculable: false,
    inRange: {
      color: ['#093C5F', '#094361', '#093756']
    },
    show: false
  },
  geo: {
    map: 'china',
    roam: true,
    selectedMode: 'single',
    symbolSize: 8,
    zoom: 1.2,
    itemStyle: {
      areaColor: '#093C5F',
      color: '#ffffff',
      borderColor: '#03C9D2',
      borderWidth: 1,
      areaColor: '#093C5F',
      color: '#093C5F',
      borderColor: '#03C9D2'
    },
    emphasis: {
      label: {
        show: false, //默认不显示省份名称
        textStyle: {
          color: '#00ff00' //省份标签字体颜色
        }
      },
      itemStyle: {
        areaColor: '#093C5F',
        color: '#093C5F',
        borderColor: '#03C9D2'
      }
    }
  },
  series: [
    {
      name: '正常',
      type: 'scatter',
      coordinateSystem: 'geo', //该系列使用的坐标系
      data: [],
      map: 'china',
      roam: true,
      selectedMode: 'single',
      symbolSize: 8,
      itemStyle: {
        color: 'yellow',
        borderColor: '#4B843D',
        borderWidth: 4
      }
    },
    {
      name: '事项',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: [],
      symbolSize: 16,
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true, //是否开启鼠标 hover 的提示动画效果。
      itemStyle: {
        borderWidth: 6,
        color: '#D52B00',
        borderColor: '#D52B00',
        shadowBlur: 10,
        shadowColor: '#D52B00'
      },
      emphasis: {
        label: {
          show: false
        },
        itemStyle: {
          color: '#D52B00',
          borderColor: '#D52B00'
        }
      },
      data: []
    },
    {
      name: '掉线',
      type: 'effectScatter',
      selectedMode: 'single',
      symbolSize: 16,
      coordinateSystem: 'geo',
      showEffectOn: 'render',
      effectType: 'emphasis',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      itemStyle: {
        borderWidth: 6,
        color: '#A7AFB9',
        borderColor: '#A7AFB9'
      },
      emphasis: {
        label: {
          show: false
        },
        itemStyle: {
          color: '#A7AFB9',
          borderColor: '#A7AFB9'
        }
      },
      data: []
    }
  ]
};
