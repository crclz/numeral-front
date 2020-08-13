<template>
  <div v-if="ret">
    <div>团队名：{{team.name}}</div>
    <div v-if="isMember">
      <div v-if="isCreator">
        <el-button type="primary" @click="manageApplication">处理团队申请</el-button>
        <el-button type="danger" @click="dismissTeam">解散团队</el-button>
      </div>
      <div v-if="!isCreator">
        <el-button type="danger" @click="quitTeam">退出团队</el-button>
      </div>
    </div>
    <div v-if="!isMember">
      <el-button type="primary" @click="applyForTeam" plain>申请加入</el-button>
    </div>
    <div>团队信息：{{team.description}}</div>
    <div>
      <h1>分享团队</h1>
      {{this.shareUrl}}
      <share-q-r></share-q-r>
    </div>
    <div>
      团队成员：
      <h3>团队成员</h3>
      <team-members :teamId="teamId"></team-members>
    </div>
    <div>
      <h3>团队文档</h3>
      <team-files :teamfiles="teamId"></team-files>
    </div>
  </div>
</template>
<!--Todo:
1. 实现团队成员列表
5. 展示团队文档
6. 实现管理团队成员
-->

<script>
import axios from "axios";
import ShareQR from "../components/ShareQR";
import TeamFiles from "@/components/TeamFiles.vue";
import TeamMembers from "@/components/TeamMembers.vue";

export default {
  name: "Team",
  components: {
    ShareQR,
    TeamFiles,
    TeamMembers,
  },
  created() {
    this.teamId = this.$route.params.id;
    this.shareUrl = window.location.href;
    // 获取团队信息
    axios
      .get("/api/teams/" + this.teamId)
      .then((response) => {
        // window.console.log(response.data.length);
        console.log(response);
        this.team = response.data;

        // 验证是否为创建者
        if (this.team.leaderId == this.global.me.id) {
          this.isCreator = true;
        }

        // 获取团队成员
        axios
          .get("/api/memberships/", { params: { teamId: this.teamId } })
          .then((response) => {
            // window.console.log(response.data.length);
            console.log(response);
            this.members = response.data;

            // 验证是否为团队成员
            axios
              .get("/api/memberships/", {
                params: { teamId: this.teamId, userId: this.global.me.id },
              })
              .then((response) => {
                // window.console.log(response.data.length);
                console.log(response);
                if (response.data.length > 0) {
                  this.isMember = true;
                  this.membershipId = response.data[0].id;
                }
              })
              .catch(function (error) {
                console.log(error);
              });

            this.ret = true;
            // alert("请求成功")
          })
          .catch(function (error) {
            console.log(error);
          });
        // alert("请求成功")
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  data() {
    return {
      teamId: 0,
      team: {},
      members: [],
      ret: false,
      isMember: false,
      membershipId: 0,
      isCreator: false,
      shareUrl: "",
    };
  },
  methods: {
    manageApplication() {
      this.$router.push({ path: "/manageApplications/" + this.teamId });
    },
    dismissTeam() {
      // 解散团队
      axios
        .delete("/api/teams/" + this.teamId)
        .then(function (response) {
          console.log(response);
          alert("解散成功");
        })
        .catch(function (error) {
          console.log(error);
          alert("解散失败");
        });
    },
    quitTeam() {
      // 退出团队
      axios
        .delete("/api/memberships/" + this.membershipId)
        .then(function (response) {
          console.log(response);
          alert("退出成功");
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
          alert("退出失败");
        });
    },
    applyForTeam() {
      // 申请加入团队
      axios
        .post("/api/team-requests", { teamId: this.teamId })
        .then(function (response) {
          console.log(response);
          alert("已发送申请");
        })
        .catch(function (error) {
          console.log(error);
          alert("申请失败");
        });
    },
  },
};
</script>

<style scoped>
</style>