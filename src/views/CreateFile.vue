<template>
    <div>
        <h1>创建文件</h1>
        <el-form :model="newFile" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input v-model="newFile.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="文档基础信息" prop="description">
                <el-input v-model="newFile.description" placeholder="请输入对该文档的描述"></el-input>
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
        name: "CreateFile",
        components: {Editor},
        created() {

        },
        data () {
            return {
                newFile:{
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
            change(val){
                this.newFile.data = val;
                // alert(val);
            },
            onSubmit(){
                // this.newFile.data = this.$refs.thisEditor.getEditorContent;
                // this.newFile.data = '123';
                axios.post('/api/documents/', {
                            "data": this.newFile.data,
                            "description": this.newFile.description,
                            "title": this.newFile.title,
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
            getDocumentId(){
                return null;
            }
        }
    }
</script>

<style scoped>

</style>