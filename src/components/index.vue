<template>
  <div class="box">
    <el-container class="container">
      <el-header>
        <h2 class="headerH">小U商城后台管理系统</h2>
        <el-button class="close" type="primary" size="default" @click="close">退出</el-button>
      </el-header>
      <el-container >
        <el-aside>
          <left-nav></left-nav>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import leftNav from '../common/leftMenu'
export default {

  data() {
    return {

    };
  },
  mounted() {
  },
  methods: {
    close(){
      window.sessionStorage.removeItem('loginInfo')
       this.$router.push("/login");
    }
  },
  components : {
    leftNav
  }
};
</script>

<style  lang="" scoped>
@import "../assets/css/index.css";

.headerH{
  display: inline-block;
}
.close{
  float: right;
  margin: 2vh 0 0 0;
}
</style>
