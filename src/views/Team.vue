<template>
  <!--这3个功能被放在TeamManage.vue：
   解散、踢人按钮、link_to处理申请页

   团队文档列表功能 被安排到 “团队文档列表页”
  -->


  <div v-if="ret">
    <h1>团队名：{{team.name}}</h1>
    <h2>团队信息：{{team.description}}</h2>

    <hr style="width: 680px; margin-top:2.5rem; margin-bottom: 2.5rem; " />

    <div v-if="isMember">
      <div v-if="isCreator">
        <h2>
          <el-link @click="jmp('/team-manage/'+team.id)" type="primary">团队管理页</el-link>
        </h2>
      </div>
      <div v-if="!isCreator">
        <el-button type="danger" @click="quitTeam">退出团队</el-button>
      </div>
    </div>
    <div v-if="!isMember">
      <el-button type="primary" @click="applyForTeam" plain>申请加入</el-button>
    </div>

    <hr style="width: 680px; margin-top:2.5rem; margin-bottom: 2.5rem; " />

    <div>
      <el-button type="primary" @click="toggleShare" plain>分享团队</el-button>
    </div>
    <div v-if="showShare">
      <h1>分享团队</h1>
      <div>将下方链接复制到浏览器打开 或扫描二维码</div>
      {{this.shareUrl}}<el-link icon="el-icon-document-copy" v-clipboard:error="copyOnError" v-clipboard:success="copyOnSuccess" v-clipboard:copy="shareUrl">复制链接</el-link>
      <share-q-r :share-url="shareUrl"></share-q-r>
    </div>

    <el-link @click="jmp('/team-files/'+teamId)" type="primary">团队文档列表</el-link>

    <hr style="width: 680px; margin-top:2.5rem; margin-bottom: 2.5rem; " />

    <div>
      <h3>团队成员列表</h3>
      <team-members :teamId="teamId"></team-members>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import ShareQR from "../components/ShareQR";
import TeamMembers from "@/components/TeamMembers.vue";

export default {
  name: "Team",

  components: {
    ShareQR,
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
              .catch((error) => {
                console.log(error);
              });

            this.ret = true;
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
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
      showShare: false,
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
        .then((response) => {
          console.log(response);
          this.success("解散成功");
        })
        .catch((error) => {
          console.log(error);
          this.err(error);
        });
    },
    quitTeam() {
      // 退出团队
      axios
        .delete("/api/memberships/" + this.membershipId)
        .then((response) => {
          console.log(response);
          this.success("退出成功");
            setTimeout(() => {
                this.$router.go(0);
            }, 500);
        })
        .catch((error) => {
          console.log(error);
          this.err(error);
        });
    },
    applyForTeam() {
      // 申请加入团队
      axios
        .post("/api/team-requests", { teamId: this.teamId })
        .then((response) => {
          console.log(response);
          this.success("已发送申请");
        })
        .catch((error) => {
          console.log(error);
          this.err(error);
        });
    },
    toggleShare() {
      this.showShare = !this.showShare;
    },
      copyOnSuccess(){
          this.$message.success("复制成功");
      },
      copyOnError(){
          this.$message.error("复制失败");
      }
  },
};
</script>

<style scoped>
</style>