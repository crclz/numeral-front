<template>
    <div v-if="ret">
        <div v-if="!userPermissions.document.canRead">
            <h1>对不起，您没有该文档的阅读权限。</h1>
            <h1>Sorry, but you have no permission to read this document.</h1>
        </div>
        <div v-else>
            <div>
                <div v-if="dirty.lockOwner" style="background-color: coral; color: white">请注意，该文档正在被{{this.dirty.lockOwner.username}}编辑，您看到的可能不是该文档的最新版本。</div>
                <div v-if="dirty.isDirty && !dirty.lockOwner" style="background-color: #42b983; color: white">请注意，{{this.dirty.lastModifierName}}已于{{this.dirty.updatedAt | moment}}提交了该文档的最新版本，刷新页面以获得最新版本内容。</div>
                <div><h1>{{currentFile.title}}</h1></div>

                <HR style="margin-top:2.5rem; margin-bottom:2.5rem;" />

                <div>创建者：{{currentFile.creatorId}}</div>
                <div>团队ID：{{currentFile.teamId}}</div>
                <div>创建时间：{{currentFile.createdAt | moment}}</div>
                <div>编辑次数：{{currentFile.modifyCount}}</div>
                <div>上次更新时间：{{currentFile.updatedAt | moment}}</div>
                <div>上次更新者：{{currentFile.lastModifierId}}</div>
                <div>文件描述：{{currentFile.description}}</div>

                <HR style="margin-top:2.5rem; margin-bottom:2.5rem;" />


                <el-button type="warning" :icon="favorite.favoriteIcon" @click="favoriteFile" circle></el-button>
                <el-button type="primary" :disabled="!userPermissions.document.canWrite" @click="gotoEditFile">编辑文档</el-button>
                <el-button type="success" :disabled="!userPermissions.document.canShare" @click="toggleShare">分享文档</el-button>
                <div id="sharePanel" v-if="displaySwitch.share">
                    <HR style="margin-top:2.5rem; margin-bottom:2.5rem;" />
                    <div>将下方链接复制到浏览器打开 或扫描二维码</div>
                    <div>{{shareUrl}}</div>
                    <div><ShareQR></ShareQR></div>
                </div>
                <HR style="margin-top:2.5rem; margin-bottom:2.5rem;" />
                <h1>文档内容</h1>
                <div v-html="currentFile.data"></div>
                <HR style="margin-top:2.5rem; margin-bottom:2.5rem;" />
                <div><h1>评论列表</h1></div>
                <div>
                    <el-row>
                        <div v-for="item in comments" :key="item.id">
                            <el-col :span="24">
                                <div class="grid-content"><img height="32" width="32" :src="item.user.avatarUrl"/>{{item.user.username}}</div>
                            </el-col>
                            <el-col>
                                <div class="grid-content" v-html="item.content"></div>
                            </el-col>
                            <hr style="width: 555px;">
                        </div>
                    </el-row>
                </div>
                <HR/>
                <create-comment></create-comment>
            </div>
        </div>

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

            //先检查文档阅读权限
            axios.get('/api/documents/permission/'+this.documentId)
                .then((response) => {
                    console.log(response);
                    this.userPermissions.ref = response.data;

                    // 解析权限
                    //      文档读写
                    if(this.userPermissions.ref.documentAccess == "ReadWrite"){
                        this.userPermissions.document.canWrite = true;
                        this.userPermissions.document.canRead = true;
                    }
                    else if(this.userPermissions.ref.documentAccess =="Read"){
                        this.userPermissions.document.canRead = true;
                    }
                    //      文档分享
                    if(this.userPermissions.ref.canShare){
                        this.userPermissions.document.canShare = true;
                    }
                    //      评论读写
                    if(this.userPermissions.ref.commentAccess == "ReadWrite"){
                        this.userPermissions.comment.canWrite = true;
                        this.userPermissions.comment.canRead = true;
                    }
                    else if(this.userPermissions.ref.commentAccess =="Read"){
                        this.userPermissions.comment.canRead = true;
                    }

                    // 有权限读
                    if(this.userPermissions.document.canRead){
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
                    }
                    this.ret = true;
                })
                .catch(function (error) {
                    console.log(error);
                });

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
                },
                userPermissions: {
                    ref: null,
                    document: {
                        canRead: false,
                        canWrite: false,
                        canShare: false,
                    },
                    comment: {
                        canRead: false,
                        canWrite: false,
                    }
                },
                displaySwitch: {
                    share: false,
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
            },
            gotoEditFile() {
                this.$router.push({path: "/editFile/"+this.documentId})
            },
            toggleShare(){
                if(this.userPermissions.document.canShare){
                    this.displaySwitch.share = !this.displaySwitch.share;
                }
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