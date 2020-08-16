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
  model: {
    event: "submit-comment",
  },
  created() {},
  data() {
    return {};
  },
  methods: {
    onSubmit() {
      var content = this.$refs.thisEditor.getEditorContent();

      const maxlen = 1024;
      if (content.length > maxlen) {
        this.errmsg(`当前富文本量为${content.length}, 超出了限制（${maxlen}）`);
        return;
      }

      axios
        .post("/api/comments/", {
          documentId: this.documentId,
          content: content,
        })
        .then((response) => {
          console.log(response);

          this.success("发送成功");

          // setTimeout(() => {
          //   this.$router.go(0);
          // }, 500);
          this.$emit("submit-comment");
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
</style>