<template>
  <div>
    <mt-button type="primary" @click="ajaxClick">获取数据</mt-button>
    <!-- 改变颜色 -->
    <mt-button type="default">灰色</mt-button>
    <mt-button type="primary">蓝色</mt-button>
    <mt-button type="danger">红色</mt-button>
    <!-- 改变大小 -->
    <mt-button size="small">小</mt-button>
    <mt-button size="large">大</mt-button>
    <mt-button size="normal">正常</mt-button>
    <!-- 禁用按钮 -->
    <mt-button disabled>禁用</mt-button>
    <!-- 幽灵按钮 -->
    <mt-button plain>plain</mt-button>
    <!-- 带图标 -->
    <mt-button icon="back">返回</mt-button>
    <mt-button icon="more">更多</mt-button>
    <!-- 自定义图标 -->
    <mt-button>
      <img src="./imgs/me.jpg" height="20" width="20" slot="icon" />
      带自定义图标
    </mt-button>
    <!-- 绑定 click 事件 -->
    <mt-button type="primary" @click="handleClick">点击事件</mt-button>
    <router-view></router-view>

    <img :src="imgUrl" style="cursor:default;" onerror="this.src ='./imgs/default-head.png'" />
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <span class="role-name" v-text="roleName" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="iconfont icon-jilu1" command="modifyPwd">修改密码</el-dropdown-item>
        <el-dropdown-item divided icon="loginout iconfont icon-guanbi" command="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import {
  Toast
} from "mint-ui";
export default {
  data () {
    return {
      toastInstanse: null
    }
  },
  methods: {
    ajaxClick () {
      var that = this;
      that.showToast();
      setTimeout(() => {
        that.toastInstanse.close();
      }, 2000);
    },
    showToast () {
      this.toastInstanse = Toast({
        message: '加载中...',
        position: 'top', //显示位置
        duration: -1,// 如果是 -1 则弹出之后不消失
        iconClass: 'indexicon icon-indicator' // 设置的图标类
      });
    },
    handleClick () {
      Toast({
        message: '操作成功',
        position: 'bottom',
        duration: 5000,
        iconClass: 'indexicon icon-indicator'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
