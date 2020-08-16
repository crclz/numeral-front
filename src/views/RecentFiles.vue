<template>
  <div>
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
