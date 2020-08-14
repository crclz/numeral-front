<template>
  <div>
    <h1>撰写评论</h1>
    <div>评论内容</div>
    <editor ref="thisEditor" @change="change"></editor>
    <el-button type="success" @click="onSubmit">提交评论</el-button>
  </div>
</template>

<script>
import Editor from "./Editor";
import axios from "axios";

export default {
  name: "CreateComment",
  props: ["documentId"],
  components: {
    Editor,
  },
  created() {},
  data() {
    return {
      editorContent: "",
    };
  },
  methods: {
    change(val) {
      this.editorContent = val;
    },
    onSubmit() {
      axios
        .post("/api/comments/", {
          documentId: this.documentId,
          content: this.editorContent,
        })
        .then((response) => {
          console.log(response);
          this.$router.go(0);
        })
        .catch(function (error) {
          console.log(error);
          alert("提交失败");
        });
    },
  },
};
</script>

<style scoped>
</style>