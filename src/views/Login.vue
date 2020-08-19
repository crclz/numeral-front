<template>
  <div class="login_container">
    <div class="login_box">
      <h1 class="text-center">登录</h1>

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
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <!-- <el-button type="info" @click="resetLoginForm">重置</el-button> -->
          <!-- <el-button type="info" @click="jumpToRegister">注册</el-button> -->
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
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            min: 3,
            max: 16,
            message: "用户名长度在 3 到 16 个字符",
            trigger: "change",
          },
        ],

        //验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 32,
            message: "密码长度在 6 到 32 个字符",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    // 点击重置按钮，重置登录表单
    // resetLoginForm() {
    //   this.$refs.loginFormRef.resetFields();
    // },
    // jumpToRegister() {
    //   this.$router.push({ path: "/register/" });
    // },
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.$axios
            .post("/api/access/login", this.loginForm)
            .then((res) => {
              console.log(res);
              this.success("登录成功，正在跳转..."); // success消息示例

              setTimeout(() => {
                this.$axios
                  .get("/api/access/me")
                  .then((res) => {
                    this.global.me = res.data;
                    this.global.app.$forceUpdate(); // update navbar and global.me
                    this.$router.push({ path: "/workspace/myfiles" });
                  })
                  .catch((p) => this.err(p));
              }, 500);
            })
            .catch((p) => this.err(p)); // error消息示例
        } else {
          console.log("err");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.btns {
  display: flex;
  justify-content: flex-end;
  // 按钮尾部对齐
}

.login_box {
  width: 300px;
  margin: 0 auto;
}
</style>