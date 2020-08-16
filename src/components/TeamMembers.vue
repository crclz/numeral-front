<template>
  <div>
    <el-row :gutter="20" :key="refreshKey">
      <el-col :span="6" v-for="item in memberships" :key="item.id">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="person-info">
              <!-- 这里显示头像-->
              <div class="avatar_box">
                <span @click="openUser(item.user.id)" width="100%">
                  <img :src="item.user.avatarUrl" style="width: 50px; height: 50px;" alt="avatar" />
                </span>
              </div>
              <!-- 这里显示用户名-->
              <div
                class="username"
                :class="{ 'leader-username': team.leaderId==item.user.id }"
              >{{item.user.username}}</div>
            </div>
            <div class="actions">
              <tr v-if="showKick && team.leaderId!=item.user.id">
                <td>
                  <el-button type="primary" @click="removeMembership(item.id)">踢出团队</el-button>
                </td>
              </tr>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "TeamMembers",
  props: ["teamId", "showKick", "team"],
  mounted() {
    this.$axios
      .get("/api/memberships", {
        params: { teamId: this.teamId },
      })
      .then((response) => {
        this.memberships = response.data;
        console.log(this.memberships);
      })
      .catch((p) => this.err(p));
  },
  data() {
    return {
      memberships: [],
      refreshKey: 0,
    };
  },
  methods: {
    openUser(userID) {
      this.$router.push({ path: "/getuser/" + userID });
    },
    removeMembership(id) {
      this.$axios
        .delete("/api/memberships/" + id)
        .then((res) => {
          console.log(res);
          this.success("踢出成功！");
          this.$axios
            .get("/api/memberships", {
              params: { teamId: this.teamId },
            })
            .then((response) => {
              this.memberships = response.data;
              console.log(this.memberships);
            })
            .catch((p) => this.err(p));
          this.refreshKey = this.refreshKey + 1;
        })
        .catch((p) => this.err(p));
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

.person-info {
  display: flex;
  align-items: center;
}

.username{
  margin: 0 8px;
}

.leader-username {
  color: gold;
}
</style>