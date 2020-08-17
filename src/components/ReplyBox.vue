<template>
  <div>
    <div class="root-reply-sender">
      <el-input v-model="text"></el-input>
      <el-button :disabled="text.trim()==''" @click="sendReply(text)">发送</el-button>
    </div>
    <div id="reply-list">
      <div v-for="reply in replies" :key="reply.id">
        <reply-card :reply="reply"></reply-card>
      </div>
    </div>
  </div>
</template>


<script>
import ReplyCard from "./ReplyCard";

export default {
  name: "ReplyBox",
  components: {
    ReplyCard,
  },
  props: ["comment"],
  data() {
    return {
      replies: [],
      text: "",
    };
  },
  mounted() {
    this.$axios
      .get("/api/replies", { params: { commentId: this.comment.id } })
      .then((res) => (this.replies = res.data))
      .catch((p) => this.err(p));
  },
  methods: {
    sendReply(content) {
      this.text = "";

      this.$axios
        .post("/api/replies", {
          commentId: this.comment.id,
          content: content,
          targetUserId: this.comment.userId,
        })
        .then(() => this.sucess("回复成功"))
        .catch((p) => this.err(p));
    },
  },
};
</script>

<style scoped>
</style>