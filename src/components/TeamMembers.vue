<template>
  <div>
    <div v-if="membership.length==0">还未添加团队文档</div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in memberships" :key="item.id">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="avatar_box">
              <span @click="openUser(item.user.id)" width="100%">
                <img :src="item.avatarUrl" width="100%" alt="avatar" />
              </span>
            </div>
            <div slot="header" class="clearfix">
              <span @click="openUser(item.user.id)">{{item.user.username}}</span>
            </div>
            <div class="text item" @click="openUser(item.user.id)">{{item.user.description}}</div>
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
        this.membershipIdArr = response.data;
        console.log(this.membershipIdArr);
        console.log("申请membership成功");
      })
      .catch(function (error) {
        console.log(error);
        alert("请求团队成员失败");
      });
    this.membershipIdArr.filter((item, i) => {
      console.log(item, i);
      this.$axios
        .get("/api/memberships/" + this.item.id, {
          params: { id: item.id },
        })
        .then((response) => {
          console.log(response);
          alert("踢出成员成功");
        })
        .catch(function (error) {
          console.log(error);
          alert("踢出成员失败");
        });
      return item >= 0;
    });
  },
  data() {
    return {
      membershipIdArr: [],
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