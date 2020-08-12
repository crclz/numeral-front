<template>
    <div v-if="ret">
        <div>团队名：{{team.name}}</div>
        <div v-if="isMember">
            <div v-if="isCreator">
                <el-button type="primary" @click="manageApplication">处理团队申请</el-button>
                <el-button type="danger" @click="dismissTeam">解散团队</el-button>
            </div>
            <div v-if="!isCreator">
                <el-button type="danger" @click="quitTeam">退出团队</el-button>
            </div>
        </div>
        <div v-if="!isMember">
            <el-button type="primary" @click="applyForTeam" plain>申请加入</el-button>
        </div>
        <div>团队信息：{{team.description}}</div>
        <div>
            团队成员：<h1>Not yet implemented</h1>
        </div>
        <div>
            团队文档：<h1>Not yet implemented</h1>
        </div>
    </div>
</template>
<!--Todo:
1. 实现团队成员列表
2. 实现解散团队
3. 实现处理团队申请
4. 实现申请团队
-->

<script>
    import axios from "axios";

    export default {
        name: "Team",
        created() {
            this.teamId = this.$route.params.id;
            // 获取团队信息
            axios.get('/api/teams/'+this.teamId)
                .then((response)=>{
                    // window.console.log(response.data.length);
                    console.log(response);
                    this.team = response.data;

                    // 验证是否为创建者
                    if(this.team.leaderId == this.global.me.id){
                        this.isCreator = true;
                    }

                    // 获取团队成员
                    axios.get('/api/memberships/',{params:{teamId: this.teamId}})
                        .then((response)=>{
                            // window.console.log(response.data.length);
                            console.log(response);
                            this.members = response.data;

                            // 验证是否为团队成员
                            axios.get('/api/memberships/',{params:{teamId: this.teamId, userId: this.global.me.id}})
                                .then((response)=>{
                                    // window.console.log(response.data.length);
                                    console.log(response);
                                    if(response.data){
                                        this.isMember = true;
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });

                            this.ret = true;
                            // alert("请求成功")
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    // alert("请求成功")
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        data() {
            return {
                teamId: '',
                team: {},
                members: [],
                ret: false,
                isMember: false,
                isCreator: false,
            }
        },
        methods: {
            manageApplication() {
            //Todo
            },
            dismissTeam() {
            //Todo
            },
            quitTeam() {
            //Todo
            },
            applyForTeam() {
            //Todo
            }
        }
    }
</script>

<style scoped>

</style>