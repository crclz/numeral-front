<template>
  <div id="app">
    <div v-if="this.meReturned">
      <div id="nav">
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>|
        <router-link to="/createFile">CreateFile</router-link>|
        <router-link to="/editFile">EditFile</router-link>|
        <router-link to="/myFiles">MyFiles</router-link>|
        <router-link to="/favoriteFiles">FavoriteFiles</router-link>|
        <router-link to="/recycleFiles">RecycleFiles</router-link>|
        <router-link to="/readFile">ReadFile</router-link>|
        <router-link to="/login">Login</router-link>|
        <router-link to="/logout">Logout</router-link>|
        <router-link to="/createFromTemplate">CreateFromTemplate</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
//import Vue from 'vue';

export default {
  data() {
    return {
      meReturned: false,
    };
  },
  created() {
    this.axios.get("/api/access/me").then((res) => {
      this.meReturned = true;
      this.global.me = res.data;
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
</style>
