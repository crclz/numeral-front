<template>
    <div>
        <!--{{this.global.me.id}}-->
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in documents" :key="item.id"><div class="grid-content bg-purple">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span  @click="openDocument(item.id)">{{item.title}}</span><div @click="readDocument(item.id)">读</div>
                        <el-button style="float: right; padding: 3px 0" type="icon" icon="el-icon-delete" @click="abandonDocument(item)"></el-button>
                    </div>
                    <div class="text item"  @click="openDocument(item.id)">
                        {{item.description}}
                    </div>
                </el-card>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "MyFiles",
        created() {
            // alert(this.global.me.id);
            axios.get('/api/documents',{params:{creatorId: this.global.me.id, isAbandoned:false}})
                .then((response)=>{
                    // window.console.log(response.data.length);
                    this.documents = response.data;
                    // alert("请求成功")
                })
                .catch(function (error) {
                    console.log(error);
                    alert("请求失败")
                });
        },
        data() {
            return{
                documents: [],
            }
        },
        methods: {
            abandonDocument(document){
                document.isAbandoned = true;
                axios.patch('/api/documents/'+document.id, {
                    "isAbandoned": true
                })
                    .then(function (response) {
                        console.log(response);
                        alert("删除成功");
                        window.location.reload();
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("删除失败");
                    });
            },
            openDocument(documentId){
                // 结合router
                // alert(documentId);
                this.$router.push({path: '/editFile/'+documentId});
            },
            readDocument(documentId){
                this.$router.push({path: '/readFile/'+documentId});
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