<template>
  <div>
    <h1>我加入的团队</h1>
    <el-table :data="teamList" style="width: 100%" highlight-current-row @current-change="openTeam">
      <el-table-column prop="teamId" label="团队编号" width="180"></el-table-column>
      <el-table-column prop="team.name" label="团队名称" width="180"></el-table-column>
      <el-table-column prop="team.description" label="团队描述"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "MyTeams",
  props: ["teamList"],
  created() {},
  data() {},
  methods: {},
};
</script>

<style scoped>
</style>