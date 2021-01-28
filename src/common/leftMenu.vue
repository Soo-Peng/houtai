<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      background-color="rgb(61,95,129)"
      text-color="#ffffff"
      active-text-color="rgb(255,208,75)"
      unique-opened
      :collapse-transition="false"
      router
    >
      <!-- <el-menu-item class="homeTitle"> -->
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu v-for="item in navList" :key="item.id" :index="item.id.toString()">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item v-for="list in item.children" :key="list.id" :index="list.url">{{list.title}}</el-menu-item>
        <!-- <el-menu-item index="/role">角色管理</el-menu-item>
        <el-menu-item index="/manger">管理员管理</el-menu-item> -->
      </el-submenu>
      <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>商城管理</span>
        </template>
        <el-menu-item index="/goods">商品分类</el-menu-item>
        <el-menu-item index="2">商品规格</el-menu-item>
        <el-menu-item index="3">商品管理</el-menu-item>
        <el-menu-item index="4">会员管理</el-menu-item>
        <el-menu-item index="5">轮播图管理</el-menu-item>
        <el-menu-item index="6">秒杀活动</el-menu-item>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: this.$route.path,
      navList : []
    };

  },
  mounted() {
    if(window.sessionStorage.getItem('loginInfo')){
      this.navList = JSON.parse(window.sessionStorage.getItem('loginInfo')).menus;
    }
  }
};
</script>

<style lang="" scoped>
.el-menu {
  border-right: none;
}
.el-submenu .el-menu-item {
  padding-left: 50px !important;
}
.el-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.3) !important;
}
.homeTitle:hover {
  background-color: #3d5f81 !important;
}
</style>