<template>
  <div class="comment-wrapper">
    <div class="comment-row-one">
      <div class="comment-avatar">
        <el-avatar :size="45" :src="comment.user.avatarUrl"></el-avatar>
      </div>
      <div class="comment-username-and-content">
        <div class="comment-username">
          <el-link
            style="font-size: 18px; margin-right:20px;"
            @click="jmp('/getuser/'+comment.user.id)"
          >{{comment.user.username}}</el-link>
          <span id="createdAt">{{comment.createdAt | moment}}</span>
        </div>

        <div class="comment-content">
          <div class="grid-content">
            <div v-html="comment.content"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="comment-row-two">
      <!-- 点赞按钮 -->
      <el-button
        @click="thumbButtonClick"
        icon="el-icon-thumb"
        :type="comment.myThumb?'success':''"
      >{{comment.thumbCount}}</el-button>

      <el-button @click="showReplyBox=!showReplyBox">回复...</el-button>
    </div>

    <reply-box v-if="showReplyBox && comment" :comment="comment"></reply-box>
  </div>
</template>

<script>
import ReplyBox from "./ReplyBox";
export default {
  components: {
    ReplyBox,
  },
  name: "CommentCard",
  props: ["comment"],
  data() {
    return {
      thumbBusy: false,
      showReplyBox: false,
    };
  },
  methods: {
    thumbButtonClick() {
      // TODO: thumbBusy
      if (this.thumbBusy) {
        return;
      }

      this.thumbBusy = true;
      if (this.comment.myThumb) {
        // already have my thumb, delete the thumb
        this.$axios
          .delete("/api/thumbs/" + this.comment.myThumb.id)
          .then(() => {
            this.success("取消点赞成功");
            this.thumbBusy = false;
            this.comment.myThumb = null;
            this.comment.thumbCount--;
          })
          .catch((p) => {
            this.err(p);
            this.thumbBusy = false;
          });
      } else {
        // add the thumb
        this.$axios
          .post("/api/thumbs", {
            targetId: this.comment.id,
            targetType: "Comment",
          })
          .then((res) => {
            this.success("点赞成功");
            this.thumbBusy = false;
            this.comment.myThumb = { id: res.data.id };
            this.comment.thumbCount++;
          })
          .catch((p) => {
            this.err(p);
            this.thumbBusy = false;
          });
      }
    },
  },
};
</script>


<style scoped>
.comment-wrapper {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #dcdfe6;
  padding: 20px 0 7px 0;
}

.comment-row-one {
  display: flex;
}

.comment-username {
  margin-left: 15px;
}

.comment-username-and-content {
  /* flex-shrink: 1; */
}

.comment-username-and-content #createdAt {
  margin-top: 5px;
  margin-right: 15px;
  color: darkgray;
  text-align: right;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.comment-content {
  background-color: whitesmoke;
  padding: 8px 25px;
  margin-top: 10px;
  border-radius: 6px;
  width: fit-content;
  min-width: 160px;
  margin-left: 15px;
  word-break: break-word;
}
</style>
