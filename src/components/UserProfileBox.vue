
<template>
  <div class="user">
    <div class="person-info">
      <!-- 这里显示头像-->
      <div class="avatar_box">
        <el-avatar class="avatar" shape="circle" fit="cover" alt="用户头像" :src="user.avatarUrl"></el-avatar>
      </div>
      <!-- 这里显示用户信息-->
      <div class="user_box">
        <div style="display:block" class="el-icon-user-solid">用户名：{{user.username}}</div>
        <div style="display:block" class="el-icon-info">个人简介：{{user.description}}</div>
      </div>
      <div class="PatchUserBtns" v-if="this.$route.params.id==this.global.me.id">
        <el-form class="btns">
          <el-button class="btns" type="success" @click="jumpToPatchUser">修改个人信息</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfileBox",
  props: ["user"],
  data() {
    return {};
  },
  methods: {
    jumpToPatchUser: function () {
      this.$router.push({ path: "/patchuser/" + this.global.me.id });
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  width: 860px;
  margin: 0 auto;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.avatar_box {
  height: 100px;
  width: 100px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 0 8px #dddddd;
  .avatar {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.btns {
  margin-left: 50px;
}
.el-icon-user-solid,
.el-icon-info {
  font-size: 14px;
  margin-top: 20px;
  width: 500px;
  line-height: 24px;
}
.person-info {
  display: flex;
  align-items: center;
}
.user_box {
  margin: 0 20px;
  width: 400px;
}
</style>