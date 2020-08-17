<template>
  <div>
    <div>
      <div class="messageItem" v-for="item in messageList" :key="item.id" @click="displayMessageInfo(item)">
        <i class="el-icon-message"></i><div class="title">{{item.title}}</div>
        <div v-if="item.sender">
          <el-avatar :size="35" :src="item.sender.avatarUrl"></el-avatar>
          <div id="msgInfo">
            <div class="username">{{item.sender.username}}</div>
            <div style="flex-grow: 1"></div>
            <div class="timeCreated">{{currentMessage.createdAt | moment}}</div>
          </div>

        </div>
        <div v-else>
          <div class="username">系统消息</div>
        </div>
        <div class="content" id="content-wrap">{{item.content}}</div>
        <el-link type="primary" :href="item.link"></el-link>
      </div>
    </div>


    <el-dialog
            :title="currentMessage.title"
            :visible.sync="displaySwitch.messageInfo"
            :append-to-body=true
            width="40%">
      <div v-if="currentMessage.sender">
        <el-avatar :size="35" :src="currentMessage.sender.avatarUrl"></el-avatar>
        <div class="username" @click="gotoSender(currentMessage.senderId)">{{currentMessage.sender.username}}</div>
        <div class="timeCreated">{{currentMessage.createdAt | moment}}</div>
      </div>
      <div v-else>
        <div class="username">系统消息</div>
      </div>
      <div class="content">{{currentMessage.content}}</div>
      <el-link type="primary" :href="currentMessage.link"></el-link>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="displaySwitch.messageInfo = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "MessageList",
    model: {
      event: [
          'messageCntChange',
      ],

    },
    props: [
      'haveRead'
    ],
    created() {
      this.$axios.get("/api/message", {params: {
          haveRead: this.haveRead,
          receiverId: this.global.me.id,
        }})
        .then((response) => {
          this.messageList = response.data;
          this.$emit('messageCntChange',this.messageList.length);
          console.log(this.messageList);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    data() {
      return {
        messageList: [],
        currentMessage: {
          "id": 80895917768704,
          "createdAt": 1597557979924,
          "updatedAt": 1597557979924,
          "senderId": 0,
          "receiverId": 79609690185728,
          "title": "string",
          "content": "叭叭叭叭叭叭叭叭叭",
          "link": null,
          "haveRead": false,
          "sender": null
        },
        displaySwitch: {
          messageInfo: false,
        },
      }
    },
    methods: {
      displayMessageInfo(message) {
        this.currentMessage = message;
        this.displaySwitch.messageInfo = true;
      },
      clearList(){
        this.messageList = [];
      },
      gotoSender(senderId){
        this.displaySwitch.messageInfo = false;
        this.jmp('/getuser/'+senderId);
      }
    }
  }
</script>

<style scoped>
  .messageItem{
    border-bottom: 1px solid #ebeef5;
  }
  .messageItem .title{
    font-weight: bold;
    color: #8c939d;
    font-size: larger;
  }
  .messageItem .content{
    width: 100%;
  }
  .username{
    color: #409eff;
    font-weight: bold;
  }
  .messageItem #content-wrap{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  #msgInfo{
    margin-right: 20px;
    display: flex;
  }
  .timeCreated{
    color: #8c939d;
  }
</style>