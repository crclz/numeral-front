<template>
  <div v-if="ret" class="center-wrapper">
    <h1 class="text-center">团队管理</h1>

    <div class="fc-center">
      <el-link @click="jmp('/team/'+team.id)" type="primary">
        <h2>{{team.name}} 团队主页</h2>
      </el-link>
    </div>
    <div class="fc-center">
      <el-popover
              placement="bottom"
              title="处理团队申请"
              width="400"
              trigger="click"
      >
        <!--触发按钮-->
        <el-button type="primary" slot="reference">处理团队申请</el-button>

        <!--内容-->
        <ManageApplications :team-id="teamId" @refreshTeamList="refreshTeamList"></ManageApplications>
      </el-popover>
    </div>

    <div class="fc-center destroy-team">
      <el-popconfirm
        title="您确定要解散团队吗？"
        icon="el-icon-warning"
        icon-color="red"
        @onConfirm="dismissTeam"
      >
        <el-button type="danger" slot="reference">解散团队</el-button>
      </el-popconfirm>
    </div>

    <div v-if="!isCreator">
      <div>警告：你不是团队的创建人</div>
    </div>

    <div v-else>
      <hr style="width: 680px; margin-top:2.5rem; margin-bottom: 2.5rem; " />

      <div>
        <h2>团队成员</h2>
        <team-members ref="thisMembers" :team="team" :showKick="true" :teamId="teamId"></team-members>
      </div>
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
import TeamMembers from "@/components/TeamMembers.vue";
import ManageApplications from "../components/ManageApplications";

export default {
  name: "TeamManage",
  components: {
    TeamMembers,
    ManageApplications
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
          })
          .catch(function (error) {
            console.log(error);
          });
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
    // manageApplication() {
    //   this.$router.push({ path: "/manageApplications/" + this.teamId });
    // },
    dismissTeam() {
      // 解散团队
      axios
        .delete("/api/teams/" + this.teamId)
        .then((response) => {
          console.log(response);
          this.success("解散成功");
          this.jmp("/myTeams");
        })
        .catch((p) => this.err(p));
    },
    quitTeam() {
      // 退出团队
      axios
        .delete("/api/memberships/" + this.membershipId)
        .then(function (response) {
          console.log(response);
          this.success("退出成功");
          window.location.reload();
        })
        .catch((p) => this.err(p));
    },
    applyForTeam() {
      // 申请加入团队
      axios
        .post("/api/team-requests", { teamId: this.teamId })
        .then(function (response) {
          console.log(response);
          this.success("已发送申请");
        })
        .catch((p) => this.err(p));
    },
    refreshTeamList() {
      this.$refs.thisMembers.refreshTeamMembers();
    }
  },
};
</script>

<style scoped>
.destroy-team {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>