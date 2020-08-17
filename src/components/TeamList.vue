<template>
  <div>
    <!-- 我加入的团队 -->
    <el-table
      :data="teamList"
      style="width: 100%"
      highlight-current-row
      v-if="isMycreated==false&&isMoveDoc==false"
    >
      <el-table-column prop="teamId" label="团队编号" width="180"></el-table-column>
      <el-table-column label="团队名称" width="400">
        <template slot-scope="scope">
          <el-link @click="jmp('/team/'+scope.row.teamId)">{{scope.row.team.name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="team.description" label="团队描述"></el-table-column>
    </el-table>
    <!-- 将文档移入团队 -->
    <el-table
      :data="teamList"
      style="width: 100%"
      highlight-current-row
      v-if="isMycreated==false&&isMoveDoc==true"
    >
      <el-table-column label="团队名称" width="180">
        <template slot-scope="scope">
          <el-link @click="jmp('/team/'+scope.row.teamId)">{{scope.row.team.name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" v-if="isMoveDoc">
        <template slot-scope="scope">
          <el-button
            @click="moveToTeam(document,scope.row.teamId)"
            type="warning"
            plain
            v-if="document.teamId!=scope.row.teamId"
            size="mini"
          >移入</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 我创建的团队 -->
    <el-table
      :data="teamList"
      style="width: 100%"
      highlight-current-row
      v-if="isMycreated==true&&isMoveDoc==false"
    >
      <el-table-column prop="id" label="团队编号" width="180"></el-table-column>
      <el-table-column label="团队名称" width="400">
        <template slot-scope="scope">
          <el-link @click="jmp('/team/'+scope.row.id)">{{scope.row.name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="团队描述"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TeamList",
  props: ["teamList", "document", "userId", "isMycreated", "isMoveDoc"],
  model: {
    event: ["get-teamlist"],
  },
  created() {},
  data() {
    return {
      teamId: -1,
      documentId: null,
    };
  },
  methods: {
    moveToTeam(document, teamId) {
      this.teamId = teamId;
      this.documentId = document.id;
      console.log("这里是document" + document.id);

      this.$axios
        .patch("/api/documents/" + this.documentId, {
          teamId: this.teamId,
        })
        .then((response) => {
          this.success("成功将文档移动到该团队");
          this.$emit("get-teamlist");
          console.log(response.data);
        })
        .catch((p) => this.err(p));
    },
  },
};
</script>

<style scoped>
</style>