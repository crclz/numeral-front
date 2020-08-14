<template>
  <div>
    <h1>撰写评论</h1>
    <div>评论内容</div>
    <editor ref="thisEditor"></editor>
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
    return {};
  },
  methods: {
    onSubmit() {
      var content = this.$refs.thisEditor.getEditorContent();

      axios
        .post("/api/comments/", {
          documentId: this.documentId,
          content: content,
        })
        .then((response) => {
          console.log(response);

          this.$message({
            message: "发送成功",
            type: "success",
          });

          setTimeout(() => {
            this.$router.go(0);
          }, 500);
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