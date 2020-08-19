<template>
  <div>
    <h1>我收藏的文档</h1>
    <document-list
      :QDocument="this.documents"
      :isMyFavorite="true"
      @abandon-favorite-onclick="abandonFavorite"
    ></document-list>
  </div>
</template>

<script>
import axios from "axios";
import DocumentList from "@/components/DocumentList.vue";

export default {
  name: "FavoriteFiles",
  components: {
    DocumentList,
  },
  created() {
    axios
      .get("/api/documents", {
        params: { isAbandoned: false, myfavorite: true },
      })
      .then((response) => {
        // window.console.log(response.data.length);
        this.documents = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.err(error);
      });
  },
  data() {
    return {
      documents: [],
      favoriteId: "",
    };
  },
  methods: {
    loadData() {
      axios
        .get("/api/documents", {
          params: { isAbandoned: false, myfavorite: true },
        })
        .then((response) => {
          // window.console.log(response.data.length);
          this.documents = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.err(error);
        });
    },
    abandonFavorite(document) {
      axios
        .get("/api/favorites/find-by-documentId?documentId=" + document.id)
        .then((response) => {
          console.log(response);
          this.favoriteId = response.data.id;
          axios
            .delete("/api/favorites/" + this.favoriteId)
            .then((response) => {
              console.log(response);
              this.success("取消收藏成功");
              this.loadData();
            })
            .catch((error) => {
              console.log(error);
              this.err(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openDocument(documentId) {
      // 结合router
      this.$router.push({ path: "/editFile/" + documentId });
    },
    readDocument(documentId) {
      this.$router.push({ path: "/readFile/" + documentId });
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
