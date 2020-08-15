
<template>
  <!-- 废弃 -->
  <div class="logout_container">
    <!-- 登出表单区域 -->
    <el-form class="logout_form">
      <!-- 按钮区域 -->
      <el-form-item class="btns">
        <el-link @click="logout_now">登出</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    // 点击“登出”按钮，接受服务器反馈
    logout_now: function () {
      this.$axios
        .post("/api/access/logout", {})
        .then(() => {
          this.success("登出成功");
        })
        .catch((p) => this.err(p));
    },
  },
};
</script>

<style>
</style>