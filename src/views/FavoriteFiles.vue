<template>
    <div>
        <!--{{this.global.me.id}}-->
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in documents" :key="item.id"><div class="grid-content bg-purple">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <!-- <span  @click="openDocument(item.id)">{{item.title}}</span><div @click="readDocument(item.id)">读</div> -->
                        <el-link @click="readDocument(item.id)">{{item.title}}</el-link>
                        <el-button style="float: right; padding: 3px 0" type="icon" icon="el-icon-star-on" @click="abandonFavorite(item)"></el-button>
                    </div>
                    <!-- <div class="text item"  @click="openDocument(item.id)">
                        {{item.description}}
                    </div> -->
                    <div class="text item">
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
            axios.get('/api/documents',{params:{isAbandoned:false, myfavorite:true}})
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
                favoriteId: ''
            }
        },
        methods: {
            abandonFavorite(document){
                axios.get("/api/favorites/find-by-documentId?documentId="+document.id)
                    .then((response)=>{
                        console.log(response);
                        this.favoriteId = response.data.id;
                        axios.delete('/api/favorites/'+this.favoriteId)
                            .then(function (response) {
                                console.log(response);
                                alert("取消收藏成功");
                                window.location.reload();
                            })
                            .catch(function (error) {
                                console.log(error);
                                alert("取消收藏失败");
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                    })

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