<template>
  <div class="login-wrap">
    <div class="login-title">
      <img src="/static/img/logo.jpg" />
      <span class="spn_title" v-text="$baseConfig.title" />
    </div>
    <div class="login-main">
      <div class="login-type">
        <a
          class="item"
          :class="{'actived': currentLoginType === loginTypeEnum.user}"
          @click="loginTypeChange(loginTypeEnum.user)"
        >帐号登录</a>
        <a
          class="item"
          :class="{'actived': currentLoginType === loginTypeEnum.qrcode}"
          @click="loginTypeChange(loginTypeEnum.qrcode)"
        >扫码下载</a>
      </div>

      <!--帐号密码登录-->
      <div :class="{'fade-in': currentLoginType === loginTypeEnum.user}" class="user">
        <!--用户名-->
        <div
          class="form-input username"
          :class="{
            'actived': userFocus,
            'empty' : usernameEmpty
          }"
        >
          <div class="icon-box">
            <i class="icon" />
          </div>
          <div class="ipt-box">
            <input
              v-model="ruleForm.username"
              name="username"
              type="text"
              placeholder="帐号"
              class="ipt"
              @keyup="keyUpCheck($event)"
              @focus="focused('user')"
              @blur="blured('user')"
            />
          </div>
          <p v-if="usernameEmpty" class="empty position_a">帐号不能为空</p>
        </div>
        <!--密码-->
        <div
          class="form-input password"
          :class="{
            'actived': passwordFocus,
            'empty' : passwordEmpty
          }"
        >
          <div class="icon-box">
            <i class="icon" />
          </div>
          <div class="ipt-box">
            <input
              v-model="ruleForm.password"
              name="password"
              type="password"
              placeholder="密码"
              class="ipt"
              @keyup="keyUpCheck($event)"
              @keydown="enterSubmit"
              @focus="focused()"
              @blur="blured()"
            />
          </div>
          <p v-if="passwordEmpty" class="empty position_a">密码不能为空</p>
        </div>
        <!--验证码-->
        <div v-if="showIdentifyCode" class="form-input verification-code">
          <div class="icon-box">
            <i class="icon" />
          </div>
          <input
            v-model="userInputCode"
            class="item code-input ipt"
            type="text"
            placeholder="请输入验证码"
            :maxlength="identifyCodeLength"
          />
          <div @click="refresCode">
            <div class="item code-area" title="点击刷新验证码">
              <verification-code
                :identify-code="identifyCode"
                content-width="120"
                content-height="42"
              />
            </div>
            <div class="item refres-code" title="刷新">
              <i class="el-icon-refresh" />
            </div>
          </div>
        </div>

        <p class="rember-pw" :class="{checked: remember}" @click="rememberClick">
          <i class="check-box" />
          记住密码
        </p>
        <p class="alter-pw float_r" @click="showForgetPwd=!showForgetPwd;">忘记密码</p>
        <p class="login-btn" :class="{'not-allow': !isAllowSubmit}" @click="submitForm">
          <el-button class="btn" :loading="btnLoading">
            登
            <i class="space" />录
            <span v-if="!isAllowSubmit">
              (
              {{ showSeconds }}
              )
            </span>
          </el-button>
        </p>
      </div>
      <!--忘记密码-->
      <el-dialog
        v-dialogDrag
        title="忘记密码"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :visible.sync="showForgetPwd"
        width="400px"
      >
        <forget-password @isHideForgetPwd="showForgetPwd"></forget-password>
      </el-dialog>
      <!--扫码登录-->
      <div :class="{'fade-in': currentLoginType === loginTypeEnum.qrcode}" class="qrcode">
        <div class="qrcode-box">
          <i class="corner-border left-top" />
          <i class="corner-border right-top" />
          <i class="corner-border left-bottom" />
          <i class="corner-border right-bottom" />
          <div class="appDownload">
            <img src="/static/img/code.png" alt />
          </div>
        </div>
        <p class="download-app">
          <i class="icon" />
          <a class="url">
            手机
            扫一扫下载APP
          </a>
        </p>
      </div>
    </div>
    <div class="login-footer">
      <p>版权所有 xx公司 ©2019 All Rights Reserved.</p>
      <p>
        最佳分辨率1400*900，推荐使用
        <span class="emphasize">谷歌、360浏览器（极速模式）、IE9</span>以上浏览器
      </p>
    </div>
  </div>
</template>
<script>
import Storages from '../../utils/storages'
import VerificationCode from '../../components/VerificationCode.vue'
import { shopMenus, platMenus } from '../../mock/permission.js'
import { loginFun } from '../../services/user-service'
import { setAuthoritiesArr } from '../../utils/permission.js';
var that; var login = true
export default {
  components: {
    VerificationCode
  },
  data: function () {
    return {
      btnLoading: false, // 查询按钮loading状态
      showForgetPwd: false, // 显示忘记密码
      userFocus: false, //用户名输入框聚焦
      usernameEmpty: false, //用户名为空
      passwordFocus: false, //密码输入框聚焦
      passwordEmpty: false, //密码为空
      remember: false, //是否记住密码
      loginInfo: {}, //登录信息实体
      ruleForm: {
        username: '',
        password: ''
      },
      //登录类型枚举
      loginTypeEnum: {
        user: 'user',
        qrcode: 'qrcode'
      },
      currentLoginType: 'user', // 初始展示登录类型
      showIdentifyCode: false, // 是否显示图形验证码
      userInputCode: '', // 用户输入的验证码
      identifyCode: '', // 图形上的验证码
      passwordErrorCount: 3, // 密码错误多少数出现图片验证码
      identifyCodeLength: 4, //生成的验证码长度
      isAllowSubmit: true, //提交按钮是否可以点击，限制连续提交
      interval: null, //定时器
      intervalCount: 3, // 限制再次提交时间，单位：秒
      showSeconds: null, //显示的秒数
      message: null//消息提示框对象
    }
  },
  created () {
    let that = this; //注意此处要将vm对象临时存储，因为在方法内部需要访问
    document.onkeydown = function (e) { // 回车提交表单
      // 兼容FF和IE和Opera
      var theEvent = window.event || e
      var code = theEvent.keyCode || theEvent.which || theEvent.charCode
      if (code === 13) { //回车提交
        that.submitForm()
      }
    }
    that.initData();
  },
  methods: {
    focused (target) {
      if (target === 'user') {
        this.userFocus = true
        this.passwordFocus = false
      } else {
        this.userFocus = false
        this.passwordFocus = true
      }
    },
    blured (target) {
      if (target === 'user') {
        this.userFocus = false
        this.usernameEmpty = !this.ruleForm.username.length
      } else {
        this.passwordFocus = false
        this.passwordEmpty = !this.ruleForm.password.length
      }
    },
    rememberClick () {
      this.remember = !this.remember
    },
    loginTypeChange (type) {
      console.log(type, 5656)
      this.currentLoginType = type

      if (type === this.loginTypeEnum.qrcode) {
        this.$refs.qrcodeArea && this.qrcode(this.$refs.qrcodeArea)
      }
    },
    // 刷新图形验证码
    refresCode () {
      if (this.showIdentifyCode) {
        this.identifyCode = this.createRandomString(this.identifyCodeLength)
      }
    },
    //生成随机字符串
    createRandomString (len) {
      let str = ''
      for (let i = 0; i < len; i++) {
        // 数字48-57 A 65-90  a 97-122
        const num = Math.random() * 123 ^ 0 + 48
        if (num < 48 || num > 122 || num > 57 && num < 65 || num > 90 && num < 97) {
          i--
        } else {
          str += (String.fromCharCode(num))
        }
      }
      return str
    },
    // 校验验证码,去除大小写差异
    checkCode () {
      return (this.userInputCode.toLocaleLowerCase() === this.identifyCode.toLocaleLowerCase())
    },
    // 是否显示图片验证码
    checkShowImgCode (isInit) {
      let pwErr = Storages.getSessionStorage('pwErr')
      if (pwErr === null) {
        !isInit && Storages.setSessionStorage('pwErr', 1)
        return false
      }
      if (pwErr >= (this.passwordErrorCount - 1)) {
        return true
      } else {
        !isInit && Storages.setSessionStorage('pwErr', pwErr += 1)
      }
      return false
    },
    // 初始化数据
    initData () {
      this.loginInfo = Storages.getLocalStorage('$loginInfo')
      this.remember = (this.loginInfo && this.loginInfo.loginstate)
      // 是否显示图片验证码
      this.showIdentifyCode = this.checkShowImgCode(true)
      // 生成验证码
      this.refresCode()
    },
    // 回车提交
    enterSubmit (event) {
      if (event.keyCode === 13) {
        this.submitForm()
      }
    },
    //提交登录表单
    submitForm () {
      // 模拟权限信息
      var toUrl = '';
      if (!this.isAllowSubmit) return

      if (!this.ruleForm.username) {
        this.errorInfo('帐号不能为空')
        this.usernameEmpty = true
        return
      }

      if (!this.ruleForm.password) {
        this.errorInfo('密码不能为空')
        this.passwordEmpty = true
        return
      }
      // 图片验证码校验-图片验证码错误
      if (this.showIdentifyCode && !this.checkCode()) {
        this.userInputCode = ''
        this.refresCode()
        this.errorInfo('图形验证码错误')
        return;
      }
      this.btnLoading = true;

      //调用登录接口
      loginFun({
        userName: this.ruleForm.username,
        password: this.ruleForm.password
      }).then((res) => {
        console.log('登陆信息：', res)
        if (res.msg) {
          this.loginError(res.msg)
          this.errorInterval()
        }
        // 存储当前用户权限
        if (res.data.permission) {
          console.log('res.data.permission', res.data.permission)
          setAuthoritiesArr(res.data.permission);// 存储权限
        }
        // 存储用户信息
        if (res.data.info) {
          this.$store.commit('user/setUserInfo', res.data.info)
          toUrl = res.data.info.roleType == 1 ? '/plat-index' : '/shop-index'; // 1：平台、2：分舵
        }
        // success
        if (res.data.token) {
          login = false;
          console.log('res.data.token', res.data.token)
          this.$store.commit('user/setRequestHeader', res.data.token);
          this.loginSuccess(toUrl)
        }
      }).catch((error) => {
        console.log(error)
        this.loginError(error.msg)
        this.errorInterval()
        this.btnLoading = false;
      })
    },
    // 错误倒计时
    errorInterval () {
      // 限制连续提交
      this.isAllowSubmit = false
      this.showSeconds = this.intervalCount
      this.interval = setInterval(
        () => {
          this.showSeconds -= 1
          if (this.showSeconds < 0) {
            this.showSeconds = this.intervalCount
            this.isAllowSubmit = true
            clearInterval(this.interval)
          }
        }, 1000)
    },
    // 登录错误提示
    loginError (msg) {
      this.errorInfo(msg)
      // 是否显示图片验证码
      this.showIdentifyCode = this.checkShowImgCode()
      // 生成验证码
      this.refresCode()
    },
    //登录成功回调
    loginSuccess (toUrl) {
      this.loginInfo = {
        loginInfo: this.ruleForm,
        loginstate: this.remember
      }
      Storages.removeSessionStorage('pwErr');
      Storages.setLocalStorage('$loginInfo', this.loginInfo);
      const that = this;
      that.$message({
        message: '登陆成功，正在跳转...',
        type: 'success',
        duration: 500,
        onClose: function () {
          that.btnLoading = false;
          // 模拟跳转
          that.$router.push({
            path: toUrl
          });
        }
      })
    },
    // 错误提示
    errorInfo (msg) {
      this.message && this.message.close()
      this.message = this.$message({
        message: msg,
        type: 'error',
        duration: 3000,
        center: true
      })
    },
    // 输入检验
    keyUpCheck (event) {
      const val = event.target.value.replace(/ /g, '')
      if (event.target.name === 'username') {
        this.ruleForm.username = val
        this.usernameEmpty = !this.ruleForm.username.length
      } else {
        this.ruleForm.password = val
        this.passwordEmpty = !this.ruleForm.username.length
      }
    },
    // 存储用户权限
    setAuthoritiesArr (data) {
      setAuthoritiesArr(data.shop); // 存储权限
      console.log('权限', data)
    }
  },
  //记得在当前组件页面销毁之前重置onkeydown事件
  beforeDestroy () {
    document.onkeydown = null;
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>

