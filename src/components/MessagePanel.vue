<template>
  <div>
    <!-- 本组件用于扩展MessageList的功能，控制MessageList显示未读信息 / 所有信息 -->
    <div style="height: 85%">
      <MessageList id="thisList" ref="thisList" :have-read="false" @messageCntChange="relayMessageCntChange"></MessageList>
    </div>

    <div style="text-align: center">
      <el-button type="primary" style="width: 90%" round @click="readAll">全部标记为已阅读</el-button>
    </div>
  </div>
</template>

<script>
  import MessageList from "./MessageList";
  export default {
    name: "MessagePanel",
    components: {
      MessageList,
    },
    model: {
      event: [
        'messageCntChange',
      ]
    },
    methods: {
      relayMessageCntChange(newCnt) {
        this.$emit('messageCntChange', newCnt);
      },
      readAll() {
        this.$axios.patch("/api/message")
            .then((response) => {
              console.log(response);
              this.$refs.thisList.clearList();
              this.$emit("messageCntChange", 0);
            })
            .catch((error) => {
              console.log(error);
            })
      },
    }
  }
</script>

<style scoped>
  #thisList{
   height: 100%;
   overflow-y: scroll;
 }
</style>