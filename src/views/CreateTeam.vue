<template>
  <div class="center-wrapper">
    <h1>创建团队</h1>
    <el-form :model="newTeam" :rules="rules" ref="ruleForm" label-position="top" class="team-ruleForm">
      <el-form-item label="团队名" prop="name">
        <el-input v-model="newTeam.name" placeholder="请输入团队名"></el-input>
      </el-form-item>
      <el-form-item label="团队信息" prop="description">
        <el-input v-model="newTeam.description" placeholder="请输入团队信息"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="success" @click="submitForm('ruleForm')">创建团队</el-button>
  </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "CreateTeam",
        data() {
            return {
                newTeam: {
                    name: this.global.me.username + '的团队',
                    description: ''
                },
                rules: {
                    name: [
                      { required: true, message: '请输入团队名称', trigger: 'blur' },
                      { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
                    ],
                    description: [
                        { required: false, message: '请输入团队名称', trigger: 'blur' },
                        { min: 0, max: 250, message: '长度不得超过 250 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.onSubmit();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onSubmit() {
                axios.post('/api/teams', {
                    "name": this.newTeam.name,
                    "description": this.newTeam.description,
                })
                    .then((response) => {
                        console.log(response);
                        this.success("创建成功");
                        this.$router.push({path: '/workspace/my-teams'});
                    })
                    .catch((error) => {
                        console.log(error);
                        this.err(error);
                    });
            }
        }
    }
</script>

<style scoped>

</style>