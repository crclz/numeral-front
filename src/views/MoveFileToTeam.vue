<template>
  <div>
    <h1>我加入的团队</h1>
    <el-table :data="teamList" style="width: 100%" highlight-current-row @current-change="joinTeam">
      <el-table-column prop="teamId" label="团队编号" width="180"></el-table-column>
      <el-table-column prop="team.name" label="团队名称" width="180"></el-table-column>
      <el-table-column prop="team.description" label="团队描述"></el-table-column>
    </el-table>
    <el-form class="btns">
      <el-button type="info" @click="deletefromteam">将文档从当前团队中移除</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "MoveFileToTeam",
  created() {
    this.documentId = this.$route.params.id;
    console.log("文档id");
    console.log(this.documentId);
    this.$axios
      .get("/api/memberships", { params: { userId: this.global.me.id } })
      .then((response) => {
        // window.console.log(response.data.length);
        this.teamList = response.data;
        // alert("请求成功")
      })
      .catch(function (error) {
        console.log(error);
        alert("请求失败");
      });
  },
  data() {
    return {
      teamList: [],
      teamId: null,
      documentId: null,
    };
  },
  methods: {
    deletefromteam: function () {
      this.teamId = 0;
      this.$axios
        .patch("/api/documents/" + this.documentId, {
          teamId: this.teamId,
        })
        .then((response) => {
          console.log(response);
          alert("成功将文档移除团队");
          console.log("正确提示！");
          console.log(response.data);
          console.log(this.documentId);
        })
        .catch((error) => {
          alert("文档移除失败");
          console.log("错误提示！");
          console.log(this.documentId);
          console.log("团队id");
          console.log(this.teamId);
          console.log(error.response.data);
        });
    },
    openTeam(team) {
      this.$router.push({ path: "/team/" + team.teamId });
    },
    joinTeam(team) {
      this.teamId = team.teamId;
      this.$axios
        .patch("/api/documents/" + this.documentId, {
          teamId: this.teamId,
        })
        .then((response) => {
          console.log(response);
          alert("成功将文档移动到该团队");
          console.log("正确提示！");
          console.log(response.data);
          console.log(this.documentId);
        })
        .catch((error) => {
          alert("文档移动失败");
          console.log(this.documentId);
          console.log("团队id");
          console.log(this.teamId);
          console.log(error.response.data);
        });
    },
  },
};
</script>

<style scoped>
</style>