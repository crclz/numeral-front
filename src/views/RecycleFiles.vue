<template>
    <div>
        <h1>文档回收站</h1>
        <!--{{this.global.me.id}}-->
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in documents" :key="item.id"><div class="grid-content bg-purple">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <div>文档ID：{{ item.id }}</div>
                        <span>文档标题：{{item.title}}</span>
                        <el-button style="float: right; padding: 3px 0" type="icon" icon="el-icon-refresh-left" @click="recycleDocument(item)"></el-button>
                    </div>
                    <div class="text item" >
                        文档简介：{{item.description}}
                    </div>
                </el-card>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "RecycleFiles",
        created() {
            // alert(this.global.me.id);
            axios.get('/api/documents',{params:{creatorId: this.global.me.id, isAbandoned:true}})
                .then((response)=>{
                    // window.console.log(response.data.length);
                    this.documents = response.data;
                    // alert("请求成功")
                })
                .catch((error) => {
                    console.log(error);
                    this.err(error);
                });
        },
        data() {
            return{
                documents: [],
            }
        },
        methods: {
            recycleDocument(document){
                document.isAbandoned = true;
                axios.patch('/api/documents/'+document.id, {
                    "isAbandoned": false
                })
                    .then((response) => {
                        console.log(response);
                        this.success("取消删除成功");
                        setTimeout(() => {
                            this.$router.go(0);
                        }, 500);
                    })
                    .catch((error) => {
                        console.log(error);
                        this.err(error);
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
    }
    :last-child {
         margin-bottom: 0;
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