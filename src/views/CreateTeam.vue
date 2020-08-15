<template>
    <div>
        <h1>创建团队</h1>
        <div>团队名</div><el-input v-model="newTeam.name" placeholder="请输入团队名"></el-input>
        <div>团队信息</div><el-input v-model="newTeam.description" placeholder="请输入团队基本的信息"></el-input>
        <el-button type="success" @click="onSubmit">创建团队</el-button>
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
                }
            }
        },
        methods: {
            onSubmit() {
                axios.post('/api/teams', {
                    "name": this.newTeam.name,
                    "description": this.newTeam.description,
                })
                    .then((response) => {
                        console.log(response);
                        this.success("创建成功");
                        this.$router.push({path: '/myTeams'});
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