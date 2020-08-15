<template>
  <div>
    <h1>我加入的团队</h1>
    <team-list :teamList="this.teamList"></team-list>
  </div>
</template>

<script>
import axios from "axios";
import TeamList from "@/components/TeamList.vue";
export default {
  name: "MyTeams",
  components: {
    TeamList,
  },
  created() {
    axios
      .get("/api/memberships", { params: { userId: this.global.me.id } })
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
  methods: {
    openTeam(team) {
      this.$router.push({ path: "/team/" + team.teamId });
    },
  },
};
</script>

<style scoped>
</style>