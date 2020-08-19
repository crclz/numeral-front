<template>
  <div>
    <h1>最近浏览的文档</h1>
    <document-list :QDocument="this.documents"></document-list>
  </div>
</template>

<script>
import axios from "axios";
import DocumentList from "@/components/DocumentList.vue";
export default {
  name: "RecentFiles",
  components: {
    DocumentList,
  },
  created() {
    axios
      .get("/api/documents", {
        params: { recent: true, isAbandoned: false },
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
  methods: {},
};
</script>

<style scoped>
</style>
