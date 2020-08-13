<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in memberships" :key="item.id">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <!-- 这里显示头像-->
            <div class="avatar_box">
              <span @click="openUser(item.user.id)" width="100%">
                <img :src="item.user.avatarUrl" width="100%" alt="avatar" />
              </span>
            </div>
            <!-- 这里显示用户名-->
            <div class="clearfix">
              <span @click="openUser(item.user.id)">
                <tr>
                  <td>用户名：</td>
                  <td>{{item.user.username}}</td>
                </tr>
                <tr>
                  <td>简介：</td>
                  <td>{{item.user.description}}</td>
                </tr>
              </span>
            </div>
            <!-- 这里显示个人简介
            <div class="text item" @click="openUser(item.user.id)">
              
            </div>-->
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MyFiles",
  props: ["teamId"],
  mounted() {
    this.$axios
      .get("/api/memberships", {
        params: { teamId: this.teamId },
      })
      .then((response) => {
        this.memberships = response.data;
        console.log(this.memberships);
        console.log("申请membership成功");
        console.log(this.memberships[0].user);
      })
      .catch(function (error) {
        console.log(error);
        alert("请求团队成员失败");
      });
  },
  data() {
    return {
      memberships: [],
    };
  },
  methods: {
    openUser(userID) {
      this.$router.push({ path: "/getuser/" + userID });
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>