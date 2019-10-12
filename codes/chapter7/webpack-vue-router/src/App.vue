<template>
    <div>
   启动组件  
    <router-link to="/login">登录</router-link>
    <router-link to="/register">注册</router-link>
    <router-link to="/permission">权限管理</router-link>
    <router-view></router-view>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>