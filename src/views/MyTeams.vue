<template>
    <div>
        <h1>我加入的团队</h1>
        <el-table
                :data="teamList"
                style="width: 100%"
                highlight-current-row
                @current-change="openTeam"
        >
            <el-table-column
                    prop="teamId"
                    label="团队编号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="团队名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="团队描述">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "MyTeams",
        created() {
            axios.get('/api/memberships',{params:{userId: this.global.me.id}})
                .then((response)=>{
                    // window.console.log(response.data.length);
                    this.teamList = response.data;
                    // alert("请求成功")
                })
                .catch(function (error) {
                    console.log(error);
                    alert("请求失败")
                });
        },
        data() {
            return {
                teamList: [],
            }
        },
        methods: {
            openTeam(team){
                this.$router.push({path: '/team/'+team.teamId});
            }
        }
    }
</script>

<style scoped>

</style>