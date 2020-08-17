<template>
  <div>
    <h1>文档回收站</h1>
    <document-list
      :QDocument="this.documents"
      :isAbandoned="true"
      @on-recover-click="recoverDocument"
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
    this.loadData();
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
          params: { creatorId: this.global.me.id, isAbandoned: true },
        })
        .then((response) => {
          this.documents = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.err(error);
        });
    },
    recoverDocument(documentId) {
      axios
        .patch("/api/documents/" + documentId, {
          isAbandoned: false,
        })
        .then((response) => {
          console.log(response);
          this.success("恢复成功");
          this.loadData();
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