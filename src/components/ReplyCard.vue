<template>
  <div class="reply-card">
    <div class="reply-content">@{{reply.user.username}}: {{reply.content}}</div>
    <div class="reply-actions">
      <!-- 点赞按钮 -->
      <el-button
        size="mini"
        icon="el-icon-thumb"
        :type="reply.myThumb?'success':''"
        @click="thumbButtonClick"
      >{{reply.thumbCount}}</el-button>

      <el-button icon="el-icon-s-promotion" size="mini" @click="showReplyInput=!showReplyInput"></el-button>

      <!-- 回复按钮 -->
      <div v-if="showReplyInput" class="send-reply-area">
        <el-input size="mini" v-model="text"></el-input>
        <el-button :disabled="text.trim()==''" size="mini" @click="sendReply(text)">回复</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  name: "ReplyCard",
  props: ["reply"],
  data() {
    return {
      thumbBusy: false,
      text: "",
      showReplyInput: false,
    };
  },
  methods: {
    thumbButtonClick() {
      // TODO: thumbBusy
      if (this.thumbBusy) {
        return;
      }

      this.thumbBusy = true;
      if (this.reply.myThumb) {
        // already have my thumb, delete the thumb
        this.$axios
          .delete("/api/thumbs/" + this.reply.myThumb.id)
          .then(() => {
            this.success("取消点赞成功");
            this.thumbBusy = false;
            this.reply.myThumb = null;
            this.reply.thumbCount--;
          })
          .catch((p) => {
            this.err(p);
            this.thumbBusy = false;
          });
      } else {
        // add the thumb
        this.$axios
          .post("/api/thumbs", {
            targetId: this.reply.id,
            targetType: "Reply",
          })
          .then((res) => {
            this.success("点赞成功");
            this.thumbBusy = false;
            this.reply.myThumb = { id: res.data.id };
            this.reply.thumbCount++;
          })
          .catch((p) => {
            this.err(p);
            this.thumbBusy = false;
          });
      }
    },
    sendReply(content) {
      this.text = "";

      this.$axios
        .post("/api/replies", {
          commentId: this.reply.commentId,
          content: `回复@${this.reply.user.username}: ${content}`,
          targetUserId: this.reply.user.id,
        })
        .then(() => this.sucess("回复成功"))
        .catch((p) => this.err(p));
    },
  },
};
</script>

<style scoped>
.reply-card {
  margin: 3px 5px;
  background-color: skyblue;
}
</style>