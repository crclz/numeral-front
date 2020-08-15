<template>
  <div>
    <el-table :data="QDocument" style="width: 100%" height="250" stripe>
      <el-table-column prop="createdAt" label="发布日期" width="200"></el-table-column>
      <el-table-column prop="title" label="标题" width="200"></el-table-column>
      <el-table-column prop="description" label="描述" width="500"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-link @click="readDocument(scope.row.id)" v-if="isAbandoned!=true">查看</el-link>
          <el-link @click="deleteDocument(scope.row.id)" v-if="isMyCreated">删除</el-link>
          <el-link @click="deleteFavorite(scope.row.id)" v-if="isMyFavorite">取消收藏</el-link>
          <el-link @click="recoverDocument(scope.row.id)" v-if="isAbandoned">恢复</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DocumentList",
  props: ["QDocument", "isMyCreated", "isMyFavorite", "isAbandoned"],
  created() {},
  data() {
    return {};
  },
  methods: {
    readDocument(id) {
      console.log(id);
      this.$router.push({ path: "/readFile/" + id });
    },
    deleteDocument(id) {
      console.log(id);
      this.$axios
        .patch("/api/documents/" + id, {
          isAbandoned: true,
        })
        .then(function (response) {
          console.log(response);
          this.success("删除成功");
          setTimeout(() => {
            this.$router.go(0);
          }, 500);
        })
        .catch((p) => this.err(p));
    },
    deleteFavorite(id) {
      console.log(id);
    },
    recoverDocument(id) {
      console.log(id);
    },
  },
};
</script>

<style scoped>
.el-link.el-link--default {
  color: #409eff;
  font-size: small;
}
</style>