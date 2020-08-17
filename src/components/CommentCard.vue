<template>
  <div class="comment-each">
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
</template>

<style scoped>
.comment-each {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #dcdfe6;
  padding: 20px 0;
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

<script>
export default {
  name: "CommentCard",
  props: ["comment"],
  data() {
    return {};
  },
};
</script>
