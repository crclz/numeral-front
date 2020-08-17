<template>
  <div>
    <!--相关功能转移到了 team-manage 页面下，本组件作为其子组件出现-->
    <!--<div>-->
    <!--    <h1>处理申请</h1> 团队{{this.teamId}}-->
    <!--</div>-->
    <div id="appli-list">
      <ul :key="refreshKey">
        <li class="appli" v-for="item in applications" :key="item.id">
          <img style="display: flex" width="32px" height="32px" :src="item.sender.avatarUrl"/>
          <div id="username" style="display: flex">{{item.sender.username}}</div>
          <div style="flex-grow: 1"></div>
          <el-button style="display: flex" type="primary" @click="manageApp(item.id, true)">同意</el-button>
          <el-button style="display: flex" type="info" @click="manageApp(item.id, false)" plain>拒绝</el-button>
        </li>
        <li class="appli-null" v-if="!applications.length">暂无团队申请</li>
      </ul>
    </div>
  </div>

</template>

<script>
  import axios from "axios";

  export default {
    name: "ManageApplications",
    model:{
      event: 'refreshTeamList',
    },
    props: [
      'teamId'
    ],
    created() {
      // this.teamId = this.$route.params.id;

      axios.get('/api/team-requests', {params:{isHandled: false, teamId: this.teamId}})
          .then((response) => {
            console.log(response);
            this.applications = response.data;
          })
          .catch((error) => {
            console.log(error);
            // alert("拉取申请失败");
            this.err(error);
          });
    },
    data() {
      return {
        applications: [],
        refreshKey: 0, // 控制组件刷新
      }
    },
    methods: {
      manageApp(appId, isAgree) {
        axios.patch('/api/team-requests/'+appId, {agree: isAgree})
            .then((response) => {
              console.log(response);
              // alert("处理申请成功");
              this.success("处理申请成功");
              // window.location.reload();
              axios.get('/api/team-requests', {params:{isHandled: false, teamId: this.teamId}})
                  .then((response) => {
                    console.log(response);
                    this.applications = response.data;
                    this.refreshKey = this.refreshKey + 1;
                    this.$emit("refreshTeamList");
                  })
                  .catch((error) => {
                    console.log(error);
                    // alert("拉取申请失败");
                    this.err(error);
                  });
            })
            .catch((error) => {
              console.log(error);
              // alert("处理申请失败");
              this.err(error);
            });
      },
    }
  }
</script>

<style scoped>
  #appli-list ul{
    margin-top:40px;
    left: 0px;
    right: 0px;
    margin-bottom: 20px;
  }

  .appli{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-right: 40px;
  }

  .appli #username{
    margin-left: 20px;
  }

  .appli-null{
    display: flex;
    justify-content: center;
    margin-right: 40px;
  }
</style>