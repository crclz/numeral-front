<template>
  <div id="app" v-if="this.meReturned">
    <el-container>
      <el-header id="head-nav">
        <div v-if="this.global.me">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <div style="display: flex;">
              <el-menu-item index="/workspace">工作台</el-menu-item>
              <el-menu-item index="/createFile">创建新的文档</el-menu-item>
              <el-menu-item index="/createTeam">创建新的团队</el-menu-item>

              <div style="flex-grow: 1;"></div>
              <div id="message-bell" @click="displayMessagePanel = !displayMessagePanel">
                  <el-popover
                          placement="bottom-end"
                          width="400"
                          trigger="click"
                          v-model="displayMessagePanel">
                    <el-badge slot="reference" :value="hintCnt" class="hint" :hidden="!hintCnt">
                      <i class="el-icon-bell"></i>
                    </el-badge>
                    <MessagePanel ref="thisPanel" @messageCntChange="hintChange" style="height: 400px"></MessagePanel>
                  </el-popover>
              </div>
              <el-menu-item @click="logout">登出</el-menu-item>
              <el-menu-item :index="'/getUser/'+this.global.me.id">{{this.global.me.username}}</el-menu-item>
              <div >
                <el-avatar :size="40" :src="this.global.me.avatarUrl"></el-avatar>
              </div>

            </div>
          </el-menu>
        </div>

        <!-- 未登录 -->
        <div v-if="!this.global.me">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <div style="display: flex;">
              <div style="flex-grow: 1;"></div>
              <el-menu-item index="/login">登录</el-menu-item>
              <el-menu-item index="/register">注册</el-menu-item>
            </div>
          </el-menu>
        </div>
      </el-header>

      <el-main id="main-content">
        <!-- 重要！防止路由复用！ -->
        <router-view :key="key" />
      </el-main>

      <el-footer>
        <div id="footer-box">
          <div>开发者：numeral 小组 2020</div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
//import Vue from 'vue';
// import Header from "./components/Header";
import MessagePanel from "./components/MessagePanel";

export default {
  components: {
    // Header,
    MessagePanel,
  },
  data() {
    return {
      meReturned: false,
      activeIndex: "1",
      displayOldNav: false,
      displayMessagePanel: false,
      hintCnt: 0,
    };
  },
  created() {
    this.axios.get("/api/access/me").then((res) => {
      this.meReturned = true;
      this.global.me = res.data;
    });
  },
  mounted() {
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push({ path: key });
    },
    logout() {
      this.$axios
        .post("/api/access/logout", {})
        .then(() => {
          this.success("登出成功");
          this.$router.push({ path: "/login" });
          this.$router.go(0);
        })
        .catch((p) => this.err(p));
    },
    hintChange(newCnt) {
      this.hintCnt = newCnt;
    },
  },
  computed: {
    // 防止路由复用相关
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#head-nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 553;
}
#main-content {
  margin-top: 63px;
}

#footer-box {
  text-align: center;
  margin: 80px 0 12px;
}

  #message-bell{
    margin: 10px 10px 10px 10px;
  }
</style>

// 全局样式
<style>
.center-wrapper {
  max-width: 860px;
  margin: 0 auto;
}

.text-center {
  text-align: center;
}

.box-center {
  margin: 0 auto;
}

.fc-center {
  margin: 0 auto;
  width: fit-content;
}

.flex-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.hint {
  margin-top: 10px;
  margin-right: 40px;
}
</style>