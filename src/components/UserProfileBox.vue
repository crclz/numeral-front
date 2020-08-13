
<template>
  <div class="User">
<<<<<<< HEAD
    <h2>个人信息</h2>
    <ul>
      <li>用户名：{{user.username}}</li>
      <li>个人简介：{{user.description}}</li>
    </ul>
    <div class="PatchUserBtns" v-if="this.$route.params.id==this.global.me.id">
      <el-form class="btns">
        <el-button type="primary" @click="jumpToPatchUser">修改个人信息</el-button>
      </el-form>
    </div>
=======
>>>>>>> main/master
    <div>
      <img :src="user.avatarUrl" alt style="width:80px; height:80px;" />
    </div>

    <h2>用户名：{{user.username}}</h2>
    <h2>个人简介：{{user.description}}</h2>
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

<style>
.user {
  border: 1px solid #000;
}
</style>