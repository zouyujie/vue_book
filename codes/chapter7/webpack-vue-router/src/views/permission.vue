<template>
    <div>
        <p>权限管理</p>
            <router-link to="/permission/user">用户管理</router-link>
    <router-link to="/permission/role">角色管理</router-link>
    <router-view></router-view>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
.head{
    color: red;
}
</style>