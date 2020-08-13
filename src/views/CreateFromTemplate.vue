<template>
    <div>
        <h1>创建文档</h1>
        <el-form :model="currentFile" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input v-model="currentFile.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="文档基础信息" prop="description">
                <el-input v-model="currentFile.description" placeholder="请输入对该文档的描述"></el-input>
            </el-form-item>
        </el-form>
        <div>文档内容</div>
        <editor ref="thisEditor" @change="change"></editor>
        <el-button type="success" @click="onSubmit">保存文件</el-button>
    </div>
</template>

<script>
    import Editor from "../components/Editor";
    import axios from "axios";
    export default {
        name: "CreateFromTemplate",
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
                },
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 1, max: 25, message: '长度小于 25 个字符，不得为空', trigger: 'blur' }
                    ],
                    description: [
                        { max: 140, message: '长度不得超过 140 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            editorOnChange(value){
                this.currentFile.data = value;
            },
            onSubmit(){
                axios.post('/api/documents/', {
                    "data": this.currentFile.data,
                    "description": this.currentFile.description,
                    "title": this.currentFile.title,
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