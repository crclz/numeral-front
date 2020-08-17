
<template>
  <div class="user">
    <div class="avatar_box">
      <el-avatar shape="circle" :size="132" fit="cover"  alt="用户头像" :src="user.avatarUrl"></el-avatar>
      <!--<img :src="user.avatarUrl" size="40px" fit="cover" alt="用户头像" class="avatar" />-->
    </div>
    <div style="display:block" class="el-icon-user-solid">用户名：{{user.username}}</div>
    <div style="display:block" class="el-icon-info">个人简介：{{user.description}}</div>
    <div class="PatchUserBtns" v-if="this.$route.params.id==this.global.me.id">
      <el-form class="btns">
        <el-button class="btns" type="success" @click="jumpToPatchUser">修改个人信息</el-button>
      </el-form>
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
  width: 35%;
  margin: 0 auto;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.avatar_box {
  height: 132px;
  width: 132px;
  border: 1px solid black;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  margin: 0 auto;
  el-avatar {
    height: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.btns {
  text-align: center;
  margin-top: 50px;
}
.el-icon-user-solid,
.el-icon-info {
  font-size: medium;
  margin-top: 20px;
}
</style>