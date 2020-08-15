
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
  name: "Logout",
  methods: {
    // 点击“退出登录”按钮，接受服务器反馈
    logout_now: function () {
      this.$axios
        .post("/api/access/logout", {})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>

<style>
</style>