<template>
  <div>
    <h1>团队文档</h1>
    <div v-if="documents.length==0">还未添加团队文档</div>
    <document-list :QDocument="this.documents"></document-list>
  </div>
</template>

<script>
import DocumentList from "@/components/DocumentList.vue";
export default {
  name: "TeamFiles",
  components: {
    DocumentList,
  },
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
</style>