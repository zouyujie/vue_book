// Vue继承的基础对象
let baseOptions = {
  template: '',
  data: function() {
    return {};
  },
  computed: {
    //门店编码
    shopNumber() {
      return this.$store.getters.shopNumber;
    },
    //界面按钮权限
    pageBtns() {
      return this.$store.getters.getPageBtns;
    },
    checkedShopNumbers() {
      return this.$store.getters.getCheckedShopNumbers;
    }
  },
  methods: {
    /**
     * 弹窗操作成功之后回调
     * @param {*} msg ：提示信息
     * @param {*} closeWin ：关闭弹窗的方法
     * @param {*} searchFunc ：界面刷新方法
     */
    winCallBack(msg, closeWin, searchFunc) {
      this.$message({
        message: msg,
        type: 'success',
        duration: this.$baseConfig.messageDuration
      });
      if (closeWin) {
        closeWin();
      }
      if (searchFunc) {
        searchFunc();
      } else {
        this.getItemList();
      }
      console.log('winCallBack :');
    },
    indexMethod(index) {
      if (this.pager) {
        return (this.pager.pageNum - 1) * this.pager.pageSize + index + 1;
      } else {
        return 1;
      }
    }
  }
};
export default baseOptions;
