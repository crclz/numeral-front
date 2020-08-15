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
              <el-menu-item index="/recycleFiles">回收站</el-menu-item>

              <div style="flex-grow: 1;"></div>
              <el-menu-item @click="logout">登出</el-menu-item>
              <el-menu-item :index="'/getUser/'+this.global.me.id">{{this.global.me.username}}</el-menu-item>
              <el-avatar :size="40" :src="this.global.me.avatarUrl"></el-avatar>
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

export default {
  components: {
    // Header,
  },
  data() {
    return {
      meReturned: false,
      activeIndex: "1",
      displayOldNav: false,
    };
  },
  created() {
    this.axios.get("/api/access/me").then((res) => {
      this.meReturned = true;
      this.global.me = res.data;
    });
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

// Style not scoped!!
<style>
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

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#head-nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;
}

#main-content {
  margin-top: 63px;
}

#footer-box {
  text-align: center;
  margin: 80px 0 12px;
}

.center-wrapper {
  max-width: 860px;
  margin: 0 auto;
}
</style>
