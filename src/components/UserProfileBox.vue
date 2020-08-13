
<template>
  <div class="User">
    <div>
      <img :src="user.avatarUrl" alt style="width:80px; height:80px;" />
    </div>

    <h2>用户名：{{user.username}}</h2>
    <h2>个人简介：{{user.description}}</h2>
  </div>
</template>

<script>
export default {
  name: "UserProfileBox",
  props: ["user"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.user {
  border: 1px solid #000;
}
</style>