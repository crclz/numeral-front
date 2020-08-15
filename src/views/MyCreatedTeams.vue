<template>
  <div>
    <h1>我创建的团队</h1>
    <team-list :teamList="this.teamList" :isMycreated="true"></team-list>
  </div>
</template>

<script>
import TeamList from "@/components/TeamList.vue";
export default {
  name: "MyCreatedTeams",
  components: {
    TeamList,
  },
  created() {
    this.$axios
      .get("/api/teams", { params: { leaderId: this.global.me.id } })
      .then((response) => {
        this.teamList = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.err(error);
      });
  },
  data() {
    return {
      teamList: [],
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>