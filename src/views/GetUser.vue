
<template>
  <div class="getuser_container">
    <div class="userinfo_box">
      <h1 class="title">用户信息</h1>
      <div class="info">
        <user-profile-box :user="Info"></user-profile-box>
      </div>
    </div>
    <div class="doclist_box">
      <h1 class="title">用户文档列表</h1>
      <div class="doclist">
        <document-list :QDocument="this.documents" :NoBtns="false"></document-list>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileBox from "@/components/UserProfileBox.vue";
import DocumentList from "@/components/DocumentList.vue";
export default {
  name: "GetUser",
  components: {
    UserProfileBox,
    DocumentList,
  },
  created() {},
  data() {
    return {
      documents: [],
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
    // 这里获取该用户创作的文档列表
    this.$axios
      .get("/api/documents", {
        params: { creatorId: this.userId, isAbandoned: false },
      })
      .then((response) => {
        this.documents = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.err(error);
      });
  },
  methods: {},
};
</script>

<style scoped>
.userinfo_box {
  max-width: 860px;
  margin: 0 auto;
}
.doclist_box {
  width: 860px;
  margin: 0 auto;
}
.title {
  text-align: left;
}
.doclist {
  width: 100%;
}
</style>