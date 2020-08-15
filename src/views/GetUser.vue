
<template>
  <div class="getuser_container">
    <h1>用户信息</h1>
    <div class="info">
      <user-profile-box :user="Info"></user-profile-box>
    </div>
  </div>
</template>

<script>
import UserProfileBox from "@/components/UserProfileBox.vue";
export default {
  name: "GetUser",
  components: {
    UserProfileBox,
  },
  created() {},
  data() {
    return {
      userId: "",
      // 这是登录表单的数据绑定对象
      Info: {
        avatarUrl: "",
        description: "",
        id: "",
        username: "",
      },
    };
  },
  mounted: function () {
    this.userId = this.$route.params.id;
    console.log(this.userId);
    this.$axios
      .get("/api/users/" + this.userId)
      .then((response) => {
        console.log(response);
        this.Info = response.data;
      })
      .catch((p) => this.err(p));
  },
  methods: {},
};
</script>

<style scoped>
</style>