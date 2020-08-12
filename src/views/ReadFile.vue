<template>
    <div v-if="ret">
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
    </div>
</template>

<script>
    import axios from "axios";
    import ShareQR from "../components/ShareQR";

    export default {
        name: "ReadFile",
        components: {
            ShareQR
        },
        created() {
            this.documentId = this.$route.params.id;
            axios.get('/api/documents/'+this.documentId)
                .then((response) => {
                    console.log(response);
                    this.currentFile = response.data;
                    this.ret = true;
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.checkFavorite();// 检查是否收藏过，如果收藏过则显示已收藏
            this.shareUrl = window.location.href;
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
                shareUrl: '',
                ret: false,
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
            }
        }
    }
</script>

<style scoped>

</style>