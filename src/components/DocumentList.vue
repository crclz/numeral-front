<template>
  <div>
    <!-- height是表头的高度，为了固定表头，这样在文档很多的情况下，也能显示表头 -->
<<<<<<< HEAD
    <el-table :data="QDocument" style="width: 100%" stripe :key="refreshKey">
=======
    <el-table :data="QDocument" style="width: 100%" stripe>
>>>>>>> main/master
      <el-table-column label="标题" width="200">
        <template slot-scope="scope">
          <el-link
            @click="jmp('/readFile/'+scope.row.id)"
            v-if="isAbandoned!=true"
          >{{scope.row.title}}</el-link>
          <p v-if="isAbandoned">{{scope.row.title}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" width="500"></el-table-column>
      <el-table-column label="发布时间" width="200">
        <template slot-scope="scope">{{scope.row.createdAt|moment}}</template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="deleteDocument(scope.row.id)" v-if="isMyCreated" type="danger" plain>删除</el-button>
          <el-button
            @click="deleteFavorite(scope.row.id)"
            v-if="isMyFavorite"
            type="warning"
            plain
          >取消收藏</el-button>
          <el-button @click="recoverDocument(scope.row)" v-if="isAbandoned" type="warning" plain>恢复</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DocumentList",
  props: ["QDocument", "isMyCreated", "isMyFavorite", "isAbandoned"],
  model: {
    event: ["recover-document", "refresh"],
  },
  created() {},
  data() {
    return {
      refreshKey: 0,
    };
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
          console.log(this.refreshKey);
          this.$forceUpdate();
          this.refreshKey = this.refreshKey + 1;
          //   setTimeout(() => {
          //     this.$router.go(0);
          //   }, 500);
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
      this.refreshKey = this.refreshKey + 1;

      this.$emit("recover-document", document);
      this.$emit("refresh");
    },
  },
};
</script>

<style scoped>
.el-link.el-link--default {
  font-size: medium;
}
</style>