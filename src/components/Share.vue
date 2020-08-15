<template>
  <div>
      <div>将下方链接复制到浏览器打开 或扫描二维码</div>
      <div>{{shareUrl}}</div><el-link icon="el-icon-document-copy" v-clipboard:error="copyOnError" v-clipboard:success="copyOnSuccess" v-clipboard:copy="shareUrl">复制链接</el-link>
      <div><ShareQR :shareUrl="shareUrl"></ShareQR></div>
  </div>
</template>

<script>
  import ShareQR from "./ShareQR";

    export default {
        name: "Share",
        props: ['shareUrl'],
        components: {
            ShareQR,
        },
        data() {
            return {

            }
        },
        methods: {
            copyOnSuccess(){
                this.$message.success("复制成功");
            },
            copyOnError(){
                this.$message.error("复制失败");
            }
        }
    }
</script>

<style scoped>

</style>