
<template>
  <div class="logout_container">
    <!-- 登出表单区域 -->
    <el-form class="logout_form">
      <!-- 按钮区域 -->
      <el-form-item class="btns">
        <el-button @click="logout_now">退出登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  //   data() {
  //     return {};
  //   },
  methods: {
    // 点击“退出登录”按钮，接受服务器反馈
    logout_now: function () {
      this.$axios
        .post("/api/access/logout", {})
        .then(function (response) {
          alert("退出成功");
          console.log("开始测试");
          console.log(response);
          console.log("测试again");
          console.log(response.data);
          // 页面跳转，好像有问题
          // window.sessionStorage.setItem("token", res.data.token);
          // this.$router.push("/home");
        })
        .catch(function (error) {
          // window.err3 = error;
          console.log(error);
          alert(error.response.data.message);
          console.log("开始错误测试的response");
          console.log(error);
          console.log(error.data);
        });
    },
  },
};
</script>

<style>
</style>