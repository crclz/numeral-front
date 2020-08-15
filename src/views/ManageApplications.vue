<template>
    <div>
        <div>
            <h1>处理申请</h1> 团队{{this.teamId}}
        </div>
        <div>
            <ul :key="refreshKey">
                <li v-for="item in applications" :key="item.id">
                    <img width="32px" height="32px" :src="item.sender.avatarUrl"/>
                    {{item.sender.username}}
                    <el-button type="primary" @click="manageApp(item.id, true)">同意</el-button>
                    <el-button type="info" @click="manageApp(item.id, false)" plain>拒绝</el-button>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "ManageApplications",
        created() {
            this.teamId = this.$route.params.id;

            axios.get('/api/team-requests', {params:{isHandled: false, teamId: this.teamId}})
                .then((response) => {
                    console.log(response);
                    this.applications = response.data;
                })
                .catch((error) => {
                    console.log(error);
                    // alert("拉取申请失败");
                    this.err(error);
                });
        },
        data() {
            return {
                teamId: 0,
                applications: [],
                refreshKey: 0, // 控制组件刷新
            }
        },
        methods: {
            manageApp(appId, isAgree) {
                axios.patch('/api/team-requests/'+appId, {agree: isAgree})
                    .then((response) => {
                        console.log(response);
                        // alert("处理申请成功");
                        this.success("处理申请成功");
                        // window.location.reload();
                        axios.get('/api/team-requests', {params:{isHandled: false, teamId: this.teamId}})
                                .then((response) => {
                                    console.log(response);
                                    this.applications = response.data;
                                    this.refreshKey = this.refreshKey + 1;
                                })
                                .catch((error) => {
                                    console.log(error);
                                    // alert("拉取申请失败");
                                    this.err(error);
                                });
                    })
                    .catch((error) => {
                        console.log(error);
                        // alert("处理申请失败");
                        this.err(error);
                    });
            },
        }
    }
</script>

<style scoped>

</style>