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
        if (this.teamId != null) {
          this.$axios
            .get("/api/teams/" + this.teamId, {
              params: { id: this.teamId },
            })

            .then((response) => {
              this.leaderId = response.data.leaderId;
              console.log("这是leaderId：" + this.leaderId);
            })
            .catch((p) => this.err(p));
        }
      })
      .catch((p) => this.err(p));
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