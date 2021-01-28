<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/head.jpg" />
      </div>

      <!-- 登录表单区 loginFormRef就是表单实例对象 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-width="0"
        class="login_form"
        :rules="loginFormRules"
      >
        <!-- 用户名 prop 验证规则 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            show-password
          ></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
import { axiosUserLogin } from "../util/axios";
export default {
  data() {
    return {
      // 登录表单的数据对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 表单验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10之间", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在6到15之间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 重置按钮点击
    resetLoginForm() {
      console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      // 表单预验证
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return this.$message.error("请输入规范的账号密码！");
        axiosUserLogin(this.loginForm)
          .then((res) => {
            console.log(res);
            if(res.data.code!==200){
              return this.$message.error(res.data.msg)
            }
            window.sessionStorage.setItem('loginInfo',JSON.stringify(res.data.list))
            this.$message.success("登陆成功");
            this.$router.push("/index");
          })
          .catch((err) => {
            return this.$message.error('服务器错误登录失败')
          });
      });
    },
  },
};
</script>


<style lang="" scoped>
@import "../assets/css/login.css";
</style>
  