export default class Utils {
  constructor() {}
  /**
   * 深拷贝
   * @param obj
   * @returns {any}
   */
  static deepCopy(obj) {
    if (obj === null) return null;
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * 防抖函数
   * @param {
   *  function
   * }
   * @returns {
   *  function
   * }
   */
  static debounce(method, delay = 100) {
    let timer = null;
    return function() {
      const self = this;
      const args = arguments;
      timer && clearTimeout(timer);
      timer = setTimeout(function() {
        method.apply(self, args);
      }, delay);
    };
  }
  /**
   * echarts坐标轴换行
   * @param {*} option  ：echarts 的options
   * @param {*} number ： 指定每隔多少个字符换行
   * @param {*} axis  ：xAxis or yAxis，表示是x轴还是y轴
   */
  static chartNewLine(option, number, axis) {
    /* 此处注意你的json是数组还是对象 */
    let axisLabel = option[axis][0]['axisLabel'];
    option[axis][0]['axisLabel'] = {
      interval: axisLabel.interval || 0, //横轴信息全部显示
      // rotate: 45, //45度角倾斜显示
      fontSize: axisLabel.fontSize || '12',
      // lineHeight: 30,
      // height: 60,
      rich: axisLabel.rich || {
        row: {
          // color: 'red',
          lineHeight: 8
        }
      },
      padding: [5, 5, 5, 6],
      formatter: function(params) {
        var arr = [];
        var paramsNameNumber = params.length;
        var provideNumber = number;
        var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
        if (paramsNameNumber > provideNumber) {
          for (var p = 0; p < rowNumber; p++) {
            var tempStr = '';
            var start = p * provideNumber;
            var end = start + provideNumber;
            if (p == rowNumber - 1) {
              tempStr = params.substring(start, paramsNameNumber);
            } else {
              tempStr = params.substring(start, end) + '\n';
            }
            arr.push('{row|' + tempStr + '}');
          }
        } else {
          arr.push('{row|' + params + '}');
        }
        return arr.join('\n');
      }
    };
    return option;
  }
  /**
   * 判断数组元素
   */
  static array_contain(array, obj) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == obj) {
        // 如果要求数据类型也一致，这里可使用恒等号===
        return true;
      }
    }
    return false;
  }
  /**
   * 判断是否为空
   */
  static notEmpty(val) {
    if (val || val === 0) return true;
    return false;
  }
}
