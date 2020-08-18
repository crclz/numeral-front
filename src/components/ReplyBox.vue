<template>
  <div>
    <div class="root-reply-sender">
      <el-input type="textarea" v-model="text"></el-input>
      <el-button
        :disabled="text.trim()==''||text.length>140"
        @click="sendReply(text)"
        v-if="text.length<=140"
        type="primary"
        plain
      >发送</el-button>
      <el-button disabled type="danger" v-if="text.length>140">已经超过140字</el-button>
    </div>
    <div id="reply-list">
      <div v-for="reply in replies" :key="reply.id">
        <reply-card :reply="reply" @load-replies-onclick="loadReplies"></reply-card>
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
    loadReplies() {
      this.$axios
        .get("/api/replies", { params: { commentId: this.comment.id } })
        .then((res) => (this.replies = res.data))
        .catch((p) => this.err(p));
    },
    sendReply(content) {
      this.text = "";

      this.$axios
        .post("/api/replies", {
          commentId: this.comment.id,
          content: content,
          targetUserId: this.comment.userId,
        })
        .then((res) => {
          console.log(res);
          this.success("回复成功");
          this.loadReplies();
        })
        .catch((p) => this.err(p));
    },
  },
};
</script>

<style scoped>
</style>