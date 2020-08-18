<template>
  <div v-title data-title="我的文档_numeral">
    <h1>我创建的文件</h1>
    <document-list
      :QDocument="this.documents"
      :isMyCreated="true"
      @delete-onclick="abandonDocument"
    ></document-list>
  </div>
</template>

<script>
import axios from "axios";
import DocumentList from "@/components/DocumentList.vue";
export default {
  name: "MyFiles",
  components: {
    DocumentList,
  },
  created() {
    axios
      .get("/api/documents", {
        params: { creatorId: this.global.me.id, isAbandoned: false },
      })
      .then((response) => {
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
    };
  },
  methods: {
    loadData() {
      axios
        .get("/api/documents", {
          params: { creatorId: this.global.me.id, isAbandoned: false },
        })
        .then((response) => {
          this.documents = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.err(error);
        });
    },
    abandonDocument(document) {
      document.isAbandoned = true;
      axios
        .patch("/api/documents/" + document.id, {
          isAbandoned: true,
        })
        .then((response) => {
          console.log(response);
          this.success("删除成功");
          this.loadData();
        })
        .catch((error) => {
          console.log(error);
          this.err(error);
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
