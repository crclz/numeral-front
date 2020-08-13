<template>
    <div v-if="ret">
        <div v-if="dirty.lockOwner" style="background-color: coral; color: white">请注意，该文档正在被{{this.dirty.lockOwner.username}}编辑，您看到的可能不是该文档的最新版本。</div>
        <div v-if="dirty.isDirty && !dirty.lockOwner" style="background-color: #42b983; color: white">请注意，{{this.dirty.lastModifierName}}已于{{this.dirty.updatedAt | moment}}提交了该文档的最新版本，刷新页面以获得最新版本内容。</div>
        <div>{{currentFile.title}}</div>
        <div>{{currentFile.creatorId}}</div>
        <div>{{currentFile.teamId}}</div>
        <div>{{currentFile.createdAt | moment}}</div>
        <div>{{currentFile.modifyCount}}</div>
        <div>{{currentFile.updatedAt | moment}}</div>
        <div>{{currentFile.lastModifierId}}</div>
        <div>{{currentFile.description}}</div>
        <el-button type="warning" :icon="favorite.favoriteIcon" @click="favoriteFile" circle></el-button>
        <div v-html="currentFile.data"></div>
        <div>将下方链接复制到浏览器打开 或扫描二维码</div>
        <div>{{shareUrl}}</div>
        <div><ShareQR></ShareQR></div>
        <div><h1>评论列表</h1></div>
        <div>
            <el-row>
                <div v-for="item in comments" :key="item.id">
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark"><img height="32" width="32" :src="item.user.avatarUrl"/>{{item.user.username}}</div>
                    </el-col>
                    <el-col>
                        <div class="grid-content bg-purple-light" v-html="item.content"></div>
                    </el-col>
                </div>
            </el-row>
        </div>
        <create-comment></create-comment>
    </div>
</template>

<script>
    import axios from "axios";
    import ShareQR from "../components/ShareQR";
    import CreateComment from "../components/CreateComment";

    export default {
        name: "ReadFile",
        components: {
            ShareQR,
            CreateComment
        },
        created() {
            this.documentId = this.$route.params.id;
            axios.get('/api/documents/'+this.documentId)
                .then((response) => {
                    console.log(response);
                    this.currentFile = response.data;

                })
                .catch(function (error) {
                    console.log(error);
                });
            this.checkFavorite();// 检查是否收藏过，如果收藏过则显示已收藏
            this.loadComments(); // 加载评论
            this.shareUrl = window.location.href;
            this.ret = true;

            // 计数器，获取该文档的写状态
            this.timer = setInterval(() => {
                // this.testCount=this.testCount+1;
                // alert("hello");
                axios.get('/api/e-lock/get-owner?documentId='+this.documentId )
                    .then((response) => {
                        console.log(response);
                        this.dirty.lockOwner = response.data;
                        if(this.dirty.lockOwner){    // 写锁有主
                            this.dirty.isDirty = true;
                            this.dirty.lastModifierName = this.dirty.lockOwner.username;
                        }
                        else{                   // 写锁有主
                            if(this.dirty.isDirty){ // 已脏
                                axios.get('/api/documents/'+this.documentId)
                                    .then((response)=>{
                                        // window.console.log(response.data.length);
                                        console.log(response);
                                        this.dirty.updatedAt=response.data.updatedAt;

                                        // alert("请求成功")
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("获取写锁失败");
                    });
            }, 1000);
        },
        destroyed() {
            if(this.timer)
                clearInterval(this.timer);
        },
        data() {
            return {
                favorite: {
                    favorited: false,
                    favoriteId: "",
                    favoriteIcon: "el-icon-star-off",
                    icons: ["el-icon-star-off", "el-icon-star-on"], // 未收藏 | 已收藏
                },
                currentFile: {
                },
                comments: [{}],
                shareUrl: '',
                ret: false,
                dirty: {
                    isDirty: false,
                    lockOwner: null,
                    lastModifierName: '',
                    updatedAt: 0
                }
            }
        },
        methods: {
            checkFavorite() {
                axios.get('/api/favorites/find-by-documentId/?documentId='+this.documentId)
                    .then((response) => {
                        console.log(response);
                        if(response.data == ""){
                            // alert("123444336");
                            this.favorite.favorited = false;
                            this.favorite.favoriteIcon = this.favorite.icons[0];
                        }
                        else{ // 收藏过
                            this.favorite.favorited = true;
                            this.favorite.favoriteIcon = this.favorite.icons[1];
                            this.favorite.favoriteId = response.data.id;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            favoriteFile() { // 收藏操作
                if (this.favorite.favorited == false) { // 未收藏过，执行收藏
                    axios.post('/api/favorites?documentId='+this.currentFile.id)
                        .then((response) => {
                            console.log(response);
                            // 变更状态为已收藏
                            this.favorite.favorited = true;
                            this.favorite.favoriteIcon = this.favorite.icons[1];
                            this.favorite.favoriteId = response.data.id;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                }
                else { // 已收藏过，取消收藏
                    axios.delete('/api/favorites/'+this.favorite.favoriteId)
                        .then((response) => {
                            console.log(response);
                            // 变更状态为未收藏
                            this.favorite.favorited = false;
                            this.favorite.favoriteIcon = this.favorite.icons[0];
                            this.favorite.favoriteId = '';
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
            loadComments() {
                axios.get('/api/comments?documentId='+this.documentId)
                    .then((response) => {
                        console.log(response);
                        this.comments = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
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