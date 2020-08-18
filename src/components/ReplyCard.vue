<template>
  <div class="reply-card">
    <!-- 回复“评论回复”的回复内容 -->
    <!-- <div class="reply-content">@{{reply.user.username}}: {{reply.content}}</div> -->

    <div class="reply-username">
      <span>@</span>
      <el-link
        style="font-size: 14px; margin-right:2px;"
        @click="jmp('/getuser/'+reply.user.id)"
      >{{reply.user.username}}</el-link>
      <span>:{{reply.content}}</span>
    </div>

    <div class="reply-actions">
      <!-- 点赞按钮 -->
      <el-button
        size="mini"
        icon="el-icon-thumb"
        :type="reply.myThumb?'success':''"
        @click="thumbButtonClick"
      >{{reply.thumbCount}}</el-button>
      <!-- 小飞机图案回复按钮 -->
      <el-button
        icon="el-icon-s-promotion"
        size="mini"
        @click="showReplyInput=!showReplyInput"
        type="primary"
        plain
      ></el-button>
      <!-- 回复日期 -->
      <span id="createdAt">{{reply.createdAt | moment}}</span>
      <!-- 回复按钮 -->
      <div v-if="showReplyInput" class="send-reply-area">
        <el-input size="mini" v-model="text"></el-input>
        <el-button
          :disabled="text.trim()==''"
          size="mini"
          type="primary"
          plain
          @click="sendReply(text)"
          v-if="text.length<=140"
          style="margin-left:2px"
        >回复</el-button>
        <el-button disabled type="danger" v-if="text.length>140" size="mini">已经超过140字</el-button>
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
  model: {
    event: ["load-replies-onclick"],
  },
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
        .then((res) => {
          console.log(res);
          this.success("回复成功");
          this.showReplyInput = !this.showReplyInput;
          this.$emit("load-replies-onclick");
        })
        .catch((p) => this.err(p));
    },
  },
};
</script>

<style lang="less" scoped>
.reply-card {
  margin: 3px 5px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
#createdAt {
  // display: flex;
  float: right;
  font-size: 10px;
  color: #99a2aa;
  line-height: 28px;
  margin-right: 20px;
  // justify-content: flex-end;
}
// .reply-username {
//   width: fit-content;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
// }
</style>