<template>
  <div>
    <div>
      <div class="messageItem" v-for="item in messageList" :key="item.id">
        <div v-if="!item.hide" class="msg-wrapper">
          <div class="msg-title">
            <i class="el-icon-message"></i>
            <div class="title">{{item.title}}</div>
          </div>
          <div v-if="item.sender">
            <el-avatar :size="35" :src="item.sender.avatarUrl"></el-avatar>
            <div id="msgInfo">
              <div class="username">{{item.sender.username}}</div>
              <div style="flex-grow: 1"></div>
            </div>
          </div>
          <div v-else>
            <div class="username">系统消息</div>
          </div>
          <div class="timeCreated">{{item.createdAt | moment}}</div>

          <div class="content">{{item.content}}</div>
          <div class="operations">
            <el-link v-if="item.link" type="primary" @click="jmp(item.link)">详情 |</el-link>
            <el-link type="success" @click="markRead(item)">已读</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from "vue";

export default {
  name: "MessageList",
  model: {
    event: ["messageCntChange"],
  },
  props: ["haveRead"],
  created() {
    this.$axios
      .get("/api/message", {
        params: {
          haveRead: this.haveRead,
          receiverId: this.global.me.id,
        },
      })
      .then((response) => {
        this.messageList = response.data;
        this.$emit("messageCntChange", this.messageList.length);
        console.log(this.messageList);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      messageList: [],
    };
  },
  methods: {
    clearList() {
      this.messageList = [];
    },
    markRead(message) {
      this.$axios
        .post("/api/message/batch-mark-read", {
          ids: [message.id],
        })
        .then((res) => {
          console.log(res);
          this.success("已标记为已读");
          // Vue.set(message, "hide", true);
          for (let i = 0; i < this.messageList.length; i++) {
            if (this.messageList[i].id == message.id) {
              this.messageList.splice(i, 1);
            }
          }
          this.$emit("messageCntChange", this.messageList.length);
          // this.$forceUpdate();
        })
        .catch((p) => this.err(p));
    },
  },
};
</script>

<style scoped>
.messageItem {
  border-bottom: 1px solid #ebeef5;
}
.messageItem .title {
  font-weight: bold;
  color: #8c939d;
  font-size: larger;
}
.messageItem .content {
  width: 100%;
}
.username {
  color: #409eff;
  font-weight: bold;
}
#msgInfo {
  margin-right: 20px;
  display: flex;
}
.timeCreated {
  color: #8c939d;
}
.msg-title {
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
}
</style>