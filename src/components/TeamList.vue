<template>
  <div>
    <el-table :data="teamList" style="width: 100%" highlight-current-row v-if="isMycreated==false">
      <el-table-column prop="teamId" label="团队编号" width="180"></el-table-column>
      <el-table-column label="团队名称" width="200">
        <template slot-scope="scope">
          <el-link @click="jmp('/team/'+scope.row.teamId)">{{scope.row.team.name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="team.description" label="团队描述"></el-table-column>
    </el-table>
    <el-table :data="teamList" style="width: 100%" highlight-current-row v-if="isMycreated==true">
      <el-table-column prop="id" label="团队编号" width="180"></el-table-column>
      <el-table-column label="团队名称" width="200">
        <template slot-scope="scope">
          <el-link @click="jmp('/team/'+scope.row.id)">{{scope.row.name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="team.description" label="团队描述"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "MyTeams",
  props: ["teamList", "isMycreated"],
  created() {},
  data() {},
  methods: {
    openTeam(team) {
      console.log(team);
      // this.$router.push({ path: "/team/" + team.teamId });
    },
  },
};
</script>

<style scoped>
</style>