<template>
  <div class="login-out">
    <!--退出登录-->
    <el-dialog
      v-dialogDrag
      title="退出登录"
      :before-close="cancle"
      :visible.sync="show"
      width="420px"
      :modal-append-to-body="false"
    >
      <el-form>
        <el-row :gutter="0">
          <el-col :span="24">
            <div class="ico">
              <i class="el-icon-question" />
            </div>
            <div class="disText">
              <p>确定要退出登录吗？</p>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="0" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div style="display: inline-block">
          <el-button type="primary" @click="loginOut()">确 定</el-button>
          <el-button @click="cancle()">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 退出登录
 */
export default {
  name: 'LoginOut',
  props: {
    showLoginOut: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { show: false }
  },
  watch: {
    showLoginOut(val) {
      this.show = val;
    }
  },
  methods: {
    // 退出登录
    loginOut() {
      this.$emit('loginOut');
    },
    // 取消
    cancle() {
      // this.show = false;
      this.$emit('cancleLoginOut');
    }
  }
}
</script>

<style lang='scss' scoped>
.login-out {
  line-height: normal;
  /*退出登录*/
  .ico {
    text-align: center;
    font-size: 70px;
    color: #1881bf;
  }

  .disText {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
