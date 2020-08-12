
<template>
  <div class="User">
    <ul>
      <li>用户名：{{user.username}}</li>
      <li>个人简介：{{user.description}}</li>
    </ul>
    <div>
      <img :src="user.avatarUrl" alt style="width:40px,height:40px" />
    </div>
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