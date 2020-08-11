<template>
    <div>
        <div>{{currentFile.title}}</div>
        <div>{{currentFile.creatorId}}</div>
        <div>{{currentFile.teamId}}</div>
        <div>{{currentFile.createdAt}}</div>
        <div>{{currentFile.modifyCount}}</div>
        <div>{{currentFile.updatedAt}}</div>
        <div>{{currentFile.lastModifierId}}</div>
        <div>{{currentFile.description}}</div>
        <el-button type="warning" :icon="favorite.favoriteIcon" @click="favoriteFile" circle></el-button>
        <div v-html="currentFile.data"></div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ReadFile",
        created() {
            this.documentId = this.$route.params.id;
            axios.get('/api/documents/'+this.documentId)
                .then(function (response) {
                    console.log(response);
                    if(response.status == 200){
                        this.currentFile = response.data;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.checkFavorite();// 检查是否收藏过，如果收藏过则显示已收藏
        },
        data() {
            return {
                favorite: {
                    favorited: false,
                    favoriteIcon: "el-icon-star-off",
                    icons: ["el-icon-star-off", "el-icon-star-on"] // 未收藏 | 已收藏
                },
                currentFile: {
                    "abandoned": false,
                    "createdAt": 0,
                    "creatorId": 0,
                    "data": "<h1>测试文章内容</h1>",
                    "description": "测试文章描述",
                    "id": 0,
                    "lastModifierId": 0,
                    "modifyCount": 0,
                    "publicCanShare": true,
                    "publicCommentAccess": "None",
                    "publicDocumentAccess": "None",
                    "teamCanShare": true,
                    "teamCommentAccess": "None",
                    "teamDocumentAccess": "None",
                    "teamId": 0,
                    "title": "测试文章标题",
                    "updatedAt": 0
                }
            }
        },
        methods: {
            checkFavorite() {
                axios.get('/api/favorites/find-by-documentId',
                    {params: {
                        documentId: this.currentFile.id
                    }})
                    .then(function (response) {
                        console.log(response);
                        if(response.data != null){ // 收藏过
                            this.favorite.favorited = true;
                            this.favorite.favoriteIcon = this.favorite.icons[1];
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            favoriteFile() { // 收藏操作
                if (this.favorite.favorited == false) { // 未收藏过，执行收藏
                    axios.post('/api/favorites/', {
                        documentId: this.currentFile.id
                    })
                        .then(function (response) {
                            console.log(response);
                            // 变更状态为已收藏
                            this.favorite.favorited = true;
                            this.favorite.favoriteIcon = this.favorite.icons[1];
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                }
                else { // 已收藏过，取消收藏
                    axios.post('/api/favorites/'+this.currentFile.id, {
                        id: this.currentFile.id
                    })
                        .then(function (response) {
                            console.log(response);
                            // 变更状态为未收藏
                            this.favorite.favorited = false;
                            this.favorite.favoriteIcon = this.favorite.icons[0];
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        }
    }
</script>

<style scoped>

</style>