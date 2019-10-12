<template>
  <div class="top-user">
    <span class="cursor-pointer">
      <img :src="imgUrl" style="cursor:default;" onerror="this.src ='/static/img/default-head.png'" />
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <span class="role-name" v-text="roleName" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="iconfont icon-jilu" command="modifyPwd">修改密码</el-dropdown-item>
          <el-dropdown-item divided icon="loginout iconfont icon-guanbi" command="loginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
    <!--修改密码-->
    <el-dialog
      v-dialogDrag
      title="修改密码"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :visible.sync="showAlterPwPopup"
      width="30%"
    >
      <modify-password :info="modifyPass" @isHideModifyPwd="showAlterPwPopup = false" />
    </el-dialog>
    <!--退出登录-->
    <login-out
      :show-login-out="showLoginOut"
      @loginOut="loginOut()"
      @cancleLoginOut="cancleLoginOut()"
    />
  </div>
</template>
<script>
import LoginOut from './LoginOut'
import Storages from '../../utils/storages.js'
import ModifyPassword from './ModifyPassword.vue'
import { logoutFun } from '../../services/user-service'

export default {
  components: {
    LoginOut,
    ModifyPassword
  },
  data () {
    var userInfo = this.$store.getters.getUserInfo;
    return {
      imgUrl: userInfo.picture,
      roleName: userInfo.roleName + '-' + userInfo.realName,
      showLoginOut: false,
      showAlterPwPopup: false,
      modifyPass: {
        id: userInfo.id,
        username: userInfo.username
      }
    };
  },
  methods: {
    handleCommand (command) {
      if (command == 'modifyPwd') {
        this.showAlterPwPopup = true;
      } else {
        this.showLoginOut = true;
      }
    },
    // 退出登录
    loginOut () {
      logoutFun().then((res) => {
        this.clearLoginInfo();
      }).catch(function (error) {
        console.log(error);
        this.clearLoginInfo();
      });;
      this.$router.push('/login');
    },
    //清空登录信息
    clearLoginInfo () {
      Storages.removeAllLocalStorage();
    },
    // 取消退出登录
    cancleLoginOut () {
      this.showLoginOut = false;
    },
  }
}
</script>
<style lang="scss" scoped>
$backgroundColor: rgba(19, 87, 134, 1) !important;
.el-dropdown {
  line-height: normal;
}
.el-dropdown-menu.el-popper {
  top: 60px !important;
  background: $backgroundColor;
  border: 1px solid rgba(103, 203, 255, 0.6);
  box-shadow: 0px 2px 6px 0px rgba(0, 75, 151, 0.36);
}
.el-dropdown-menu__item {
  color: #ffffff;
}
.el-dropdown-menu__item--divided:before {
  border-top: 1px solid #276a97;
  background-color: #135786;
}
.el-dropdown-menu__item--divided {
  border-top: none;
}
/deep/ .popper__arrow {
  border-bottom-color: rgba(103, 203, 255, 1) !important;
}
/deep/ .popper__arrow::after {
  border-bottom-color: #135786 !important;
}
/deep/ .top-tooltip.el-tooltip__popper[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: $backgroundColor;
}
/deep/
  .top-tooltip.el-tooltip__popper[x-placement^="bottom"]
  .popper__arrow:after {
  border-bottom-color: $backgroundColor;
}
/deep/ .top-tooltip {
  background: $backgroundColor;
}

.top-user {
  float: right;
  margin-right: 20px;
  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    vertical-align: middle;
    margin: auto 10px;
  }
  i {
    font-size: 24px;
    vertical-align: middle;
    cursor: pointer;
  }
  .setting-container {
    color: white;
    &:hover {
      color: $hoverColor;
    }
  }
  .setting {
    margin: 0px 10px 0px 0px;
  }
  .role-name {
    margin-right: 15px;
    color: $fontColor;
    &:hover {
      color: $hoverColor;
    }
  }
  .loginout {
    &:hover {
      color: $hoverColor;
    }
    color: #ddddc9;
  }
}
</style>

