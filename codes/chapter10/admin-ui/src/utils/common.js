import Vue from 'vue';
import store from '../store/index';
/**原型扩展 */
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
// 声明----如果有此 contains 直接用最好
Array.prototype.contains = function(needle) {
  for (var i in this) {
    if (this[i] === needle) return true;
  }
  return false;
};
// 移除字符串两边的空格
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, '');
};
export default class common extends Vue {
  constructor() {
    super();
  }
  /**
   * 初始化table的滚动高度
   * @param {*} h 需要减去的高度
   * @param {*} t 需要减去的顶部容器高度
   */
  static initTableHeight(vm, h = 250, t = 80) {
    vm.$nextTick(function() {
      // 监听窗口大小变化
      let self = vm;
      let offsetTop =
        self.$refs.table &&
        self.$refs.table.$el &&
        self.$refs.table.$el.offsetTop
          ? self.$refs.table.$el.offsetTop
          : t;
      let tableHeight = window.innerHeight - offsetTop - h;
      self.tableHeight = tableHeight;
      window.onresize = function() {
        self.tableHeight = tableHeight;
      };
    });
  }
  /**
   * 初始化Charts的滚动高度
   * @param {*} h 需要减去的高度
   * @param {*} d 父容器高度
   */
  static initChartHeight(vm, h = 80, d = 0) {
    vm.$nextTick(function() {
      // 监听窗口大小变化
      let self = vm;
      let offsetTop =
        self.$refs.chartsDiv && self.$refs.chartsDiv.offsetHeight
          ? self.$refs.chartsDiv.offsetHeight
          : d;
      let chartHeight = offsetTop - h;
      self.chartHeight = chartHeight + 'px';
      window.onresize = function() {
        self.chartHeight = chartHeight + 'px';
      };
    });
  }
  /**
   * 更新Loading状态
   * @param  status
   */
  static updateLoadingStatus(status) {
    store.commit('base/updatePageLoadingStatus', status); //页面启用loading标识
    store.commit('base/updateLoadingStatus', { isLoading: status });
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
  static debounce(method, delay = 400) {
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
}
