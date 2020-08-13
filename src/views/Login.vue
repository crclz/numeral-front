<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-view"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
          <el-button type="primary" @click="jumpToRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },
      // 这是表单验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入账号", trigger: "change" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "change" },
        ],

        //验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 16, message: "密码格式错误", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    jumpToRegister() {
      this.$router.push({ path: "/register/" });
    },
    login() {
      this.$axios
        .post("/api/access/login", {
          password: this.loginForm.password,
          username: this.loginForm.username,
        })
        .then((response) => {
          console.log(response);
          alert("登录成功");
          console.log("开始测试");
          console.log(response);
          this.$router.push({ path: "/getuser/" + this.global.me.id });
          // 刷新页面从而起到刷新global.me的作用
          this.$router.go(0);
        })
        .catch(function (error) {
          // window.err3 = error;
          console.log(error);
          alert(error.response.data.message);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: skyblue;
  height: 100%;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  // 文本框向下
  padding: 0 30px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
  // 按钮尾部对齐
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    border: 1px solid #b2b2b2;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
</style>