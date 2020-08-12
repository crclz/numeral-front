<template>
    <div>
        <h1>修改文件</h1>
        <div>标题</div><el-input v-model="currentFile.title" placeholder="请输入标题"></el-input>
        <div>文档基础信息</div><el-input v-model="currentFile.description" placeholder="请输入对该文档的描述"></el-input>
        <div>文档内容</div>
        <editor ref="thisEditor" @change="change"></editor>
        <el-button type="success" @click="onSubmit">保存文件</el-button>
    </div>
</template>

<script>
    import Editor from "../components/Editor";
    import axios from "axios";
    export default {
        name: "EditFile",
        components: {Editor},
        created() {
            this.documentId=this.$route.params.id;
            axios.get('/api/documents/'+this.documentId)
                .then((response)=>{
                    // window.console.log(response.data.length);
                    console.log(response);
                    this.currentFile = response.data;
                    this.defaultData = response.data.data;

                    // alert("请求成功")
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        data () {
            return {
                documentId: '',
                defaultData: '',
                currentFile:{
                    title: '',
                    description: '',
                    data: '',
                }
            }
        },
        methods: {
            editorOnChange(value){
                this.currentFile.data = value;
            },
            onSubmit(){
                axios.patch('/api/documents/'+this.documentId, {
                    "title": this.currentFile.title,
                    "description": this.currentFile.description,
                    "data": this.currentFile.data,
                })
                    .then(function (response) {
                        console.log(response);
                        alert("保存成功");
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("保存失败");
                    });
            },
            change(val){
                this.currentFile.data = val;
                // alert(val);
            },
            getDocumentId(){
                return this.documentId;
            }
        }
    }
</script>

<style scoped>

</style>