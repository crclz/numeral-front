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
        <div v-html="currentFile.data"></div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ReadFile",
        created() {
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
        },
        data() {
            return {
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
    }
</script>

<style scoped>

</style>