<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 按钮区域 -->
      <el-form class="btns">
        <el-button
          type="primary"
          @click="jumpToMoveDoc"
          v-if="this.creatorId==this.global.me.id"
        >移动文档至团队</el-button>
        <el-button
          type="primary"
          @click="jumpToSetDocPermis"
          v-if="this.creatorId==this.global.me.id"
        >修改文档权限</el-button>
        <el-button
          type="primary"
          @click="jumpToSetTeamDocPermis"
          v-if="this.global.me.id==this.leaderId && this.global.me.id!=this.creatorId"
        >修改团队人员文档权限</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocMange",
  mounted() {
    this.documentId = this.$route.params.id;
    console.log(this.documentId);
    this.$axios
      .get("/api/documents/" + this.documentId, {
        params: { id: this.documentId },
      })
      .then((response) => {
        this.creatorId = response.data.creatorId;
        this.teamId = response.data.teamId;
        console.log(response.data);
        console.log("这是teamId(1)：" + this.teamId);
        console.log(this.creatorId);
        console.log(this.global.me.id);
        if (this.teamId != null) {
          this.$axios
            .get("/api/teams/" + this.teamId, {
              params: { id: this.teamId },
            })

            .then((response) => {
              this.leaderId = response.data.leaderId;
              console.log("这是leaderId：" + this.leaderId);
            })
            .catch(function (error) {
              console.log(error);
              alert("请求leaderIdID失败");
              console.log("这是leaderId：" + this.leaderId);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("请求文档创建者ID失败");
      });
    // 通过文档看teamId然后看team创建者是否为用户↓
    console.log("这是teamId：" + this.teamId);
  },
  data() {
    return {
      leaderId: null,
      teamId: null,
      creatorId: null,
      documentId: null,
    };
  },
  methods: {
    jumpToMoveDoc() {
      this.$router.push({ path: "/movefiletoteam/" + this.documentId });
    },
    jumpToSetDocPermis() {
      this.$router.push({ path: "/setdocpermission/" + this.documentId });
    },
    jumpToSetTeamDocPermis() {
      this.$router.push({ path: "/setteamdocpermis/" + this.documentId });
    },
  },
};
</script>

<style scoped>
</style>