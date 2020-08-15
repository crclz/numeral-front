<template>
  <div>
    <el-table :data="QDocument" style="width: 100%" height="250" stripe>
      <el-table-column prop="createdAt" label="日期" width="200"></el-table-column>
      <el-table-column prop="title" label="标题" width="200"></el-table-column>
      <el-table-column prop="description" label="描述" width="500"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-link @click="readDocument(scope.row.id)" v-if="isAbandoned!=true">查看</el-link>
          <el-link @click="deleteDocument(scope.row.id)" v-if="isMyCreated">删除</el-link>
          <el-link @click="deleteFavorite(scope.row.id)" v-if="isMyFavorite">取消收藏</el-link>
          <el-link @click="recoverDocument(scope.row.id)" v-if="isAbandoned">恢复</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DocumentList",
  props: ["QDocument", "isMyCreated", "isMyFavorite", "isAbandoned"],
  created() {},
  data() {
    return {};
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },
};
</script>

<style scoped>
.el-link.el-link--default {
  color: #409eff;
  font-size: small;
}
</style>