<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in items" :key="item.id"><div class="grid-content bg-purple">
                <el-card class="box-card" @click="openFile(item.id)">
                    <div slot="header" class="clearfix">
                        <span>{{item.title}}</span>
                        <el-button style="float: right; padding: 3px 0" type="icon" icon="el-icon-delete" @click="abandonFile(item)"></el-button>
                    </div>
                    <div class="text item">
                        {{item.description}}
                    </div>
                </el-card>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "MyFiles",
        created() {
            axios.get('/api/documents',{params:{creatorId: localStorage.userId}})// 需要将userId存入localStorage
                .then(function (response) {
                    console.log(response);
                    if(response.status == 200){
                        this.items = response.data;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        data() {
            return{
                items: [// 测试用例
                    {id:'123',title:"345",description:"678",isAbandoned:false},
                    {id:'123',title:"345",description:"678",isAbandoned:false},
                    {id:'123',title:"345",description:"678",isAbandoned:false},
                ]
            }
        },
        methods: {
            abandonFile(file){
                file.isAbandoned = true;
                axios.post('/api/documents/'+file.id, {
                    "isAbandoned": true
                })
                    .then(function (response) {
                        console.log(response);
                        alert("删除成功");
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("删除失败");
                    });
            }
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
        &:last-child {
             margin-bottom: 0;
         }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>