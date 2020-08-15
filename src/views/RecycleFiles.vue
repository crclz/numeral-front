<template>
  <div>
    <h1>文档回收站</h1>
    <document-list
      ref="recoverDoc"
      :QDocument="this.documents"
      :isAbandoned="true"
      @recover-document="recycleDocument"
      @refresh="refresh"
      :key="refreshKey"
    ></document-list>
  </div>
</template>

<script>
import axios from "axios";

import DocumentList from "@/components/DocumentList.vue";
export default {
  name: "RecycleFiles",
  components: {
    DocumentList,
  },
  created() {
    // alert(this.global.me.id);
    axios
      .get("/api/documents", {
        params: { creatorId: this.global.me.id, isAbandoned: true },
      })
      .then((response) => {
        // window.console.log(response.data.length);
        this.documents = response.data;
        // alert("请求成功")
      })
      .catch((error) => {
        console.log(error);
        this.err(error);
      });
  },
  data() {
    return {
      documents: [],
      refreshKey: 0,
    };
  },
  methods: {
    recycleDocument(document) {
      document.isAbandoned = true;
      axios
        .patch("/api/documents/" + document.id, {
          isAbandoned: false,
        })
        .then((response) => {
          console.log(response);
          this.success("恢复成功");
          this.refreshKey = this.refreshKey + 1;
          //   setTimeout(() => {
          //     this.$router.go(0);
          //   }, 500);
        })
        .catch((error) => {
          console.log(error);
          this.err(error);
        });
    },
    openDocument(documentId) {
      // 结合router
      // alert(documentId);
      this.$router.push({ path: "/editFile/" + documentId });
    },
    readDocument(documentId) {
      this.$router.push({ path: "/readFile/" + documentId });
    },
    refresh() {
      axios
        .get("/api/documents", {
          params: { creatorId: this.global.me.id, isAbandoned: true },
        })
        .then((response) => {
          // window.console.log(response.data.length);
          this.documents = response.data;
          // alert("请求成功")
        })
        .catch((error) => {
          console.log(error);
          this.err(error);
        });
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
:last-child {
  margin-bottom: 0;
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