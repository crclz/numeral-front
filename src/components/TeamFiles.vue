<template>
  <div>
    <div v-if="documents.length==0">还未添加团队文档</div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in documents" :key="item.id">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-link @click="readDocument(item.id)">标题：{{item.title}}</el-link>
            </div>
            <div>文档简介：{{item.description}}</div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "TeamFiles",
  props: ["id"],
  mounted() {
    this.teamId = this.$route.params.id;
    this.$axios
      .get("/api/documents", {
        params: { teamId: this.teamId, isAbandoned: false },
      })
      .then((response) => {
        this.documents = response.data;
      })
      .catch((p) => this.err(p));
  },
  data() {
    return {
      documents: [],
      teamId: "",
    };
  },
  methods: {
    openDocument(documentId) {
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