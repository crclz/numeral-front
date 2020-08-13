<template>
    <div>
        <div v-if="!haveLock">
            该文件正在被{{this.lockOwner.username}}编辑，您暂时无法编辑该文档。
        </div>
        <div v-if="haveLock">
            <h1>修改文件</h1>
            <div>标题</div><el-input v-model="currentFile.title" placeholder="请输入标题"></el-input>
            <div>文档基础信息</div><el-input v-model="currentFile.description" placeholder="请输入对该文档的描述"></el-input>
            <div>文档内容</div>
            <editor ref="thisEditor" @change="change"></editor>
            <el-button type="success" @click="onSubmit">保存文件</el-button>
        </div>

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

            // 计时器，定时获取锁
            this.timer = setInterval(() => {
                // this.testCount=this.testCount+1;
                // alert("hello");
                axios.post('/api/e-lock/acquire?documentId='+this.documentId )
                    .then((response) => {
                        console.log(response);
                        this.lockOwner = response.data.ownerRef;
                        if(!this.lockOwner){    // 写锁无主
                            this.haveLock = true;
                        }
                        else{                   // 写锁有主
                            this.haveLock = false;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("获取写锁失败");
                    });
            }, 1000);
        },
        destroyed() {
            if(this.timer)
                clearInterval(this.timer);
        },
        data () {
            return {
                documentId: '',
                defaultData: '',
                currentFile:{
                    title: '',
                    description: '',
                    data: '',
                },
                haveLock: false,
                lockOwner: null,
                timer: null,
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
            },
        }
    }
</script>

<style scoped>

</style>