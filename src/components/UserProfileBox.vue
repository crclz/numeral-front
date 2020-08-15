
<template>
  <div class="User">

    <div>
      <img :src="user.avatarUrl" alt style="width:80px; height:80px;" />
    </div>

    <h2>用户名：{{user.username}}</h2>
    <h2>个人简介：{{user.description}}</h2>
    <div class="PatchUserBtns" v-if="this.$route.params.id==this.global.me.id">
      <el-form class="btns">
        <el-button type="primary" @click="jumpToPatchUser">修改个人信息</el-button>
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

<style scoped>
.user {
  border: 1px solid #000;
}
</style>