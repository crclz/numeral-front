<template>
    <div>
        <h1>撰写评论</h1>
        <div>评论内容</div>
        <editor ref="thisEditor" @change="change"></editor>
        <el-button type="success" @click="onSubmit">提交评论</el-button>
    </div>
</template>

<script>
    import Editor from "./Editor";
    import axios from "axios";

    export default {
        name: "CreateComment",
        props:['documentId'],
        components: {
            Editor
        },
        created() {
            // 这样写比较蠢. commented by crclz
            // this.newComment.documentId = this.$parent.currentFile.id;

            this.newComment.documentId = this.$parent.documentId;
        },
        data() {
            return {
                newComment: {
                    documentId: 0,
                    content: "",
                }
            }
        },
        methods: {
            change(val){
                this.newComment.content = val;
                // alert(val);
            },
            onSubmit(){
                // this.newFile.data = this.$refs.thisEditor.getEditorContent;
                // this.newFile.data = '123';
                axios.post('/api/comments/', {
                    documentId: this.$parent.documentId,
                    content: this.newComment.content
                })
                    .then(function (response) {
                        console.log(response);
                        alert("提交成功");
                        window.location.reload();
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("提交失败");
                    });
            },
            getDocumentId() {
                return null;
            }
        }
    }
</script>

<style scoped>

</style>