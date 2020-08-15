<template>
  <div>
    <el-table :data="QDocument" style="width: 100%" height="250" stripe>
      <el-table-column label="发布时间" width="200">
        <template slot-scope="scope">{{scope.row.createdAt|moment}}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="200"></el-table-column>
      <el-table-column prop="description" label="描述" width="500"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-link @click="jmp('/readFile/'+scope.row.id)" v-if="isAbandoned!=true">查看</el-link>
          <el-link @click="deleteDocument(scope.row.id)" v-if="isMyCreated">删除</el-link>
          <el-link @click="deleteFavorite(scope.row.id)" v-if="isMyFavorite">取消收藏</el-link>
          <el-link @click="recoverDocument(scope.row)" v-if="isAbandoned">恢复</el-link>
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
        .then((response) => {
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
      this.$axios
        .get("/api/favorites/find-by-documentId?documentId=" + id)
        .then((response) => {
          this.favoriteId = response.data.id;
          this.$axios
            .delete("/api/favorites/" + this.favoriteId)
            .then((response) => {
              console.log(response);
              this.success("取消收藏成功");
              setTimeout(() => {
                this.$router.go(0);
              }, 500);
            })
            .catch((p) => this.err(p));
        })
        .catch((p) => this.err(p));
    },
    recoverDocument(document) {
      document.isAbandoned = true;
      this.$axios
        .patch("/api/documents/" + document.id, {
          isAbandoned: false,
        })
        .then((response) => {
          this.success("恢复成功");
          console.log(response);
          setTimeout(() => {
            this.$router.go(0);
          }, 500);
        })
        .catch((p) => this.err(p));
    },
  },
};
</script>

<style scoped>
.el-link.el-link--default {
  color: #409eff;
  font-size: small;
  margin: 2px;
}
</style>