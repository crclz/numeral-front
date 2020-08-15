<template>
  <div>
    <el-table :data="QDocument" style="width: 100%" stripe>
      <el-table-column fixed prop="createdAt" label="日期" width="180"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="description" label="描述" width="500"></el-table-column>
      <el-table-column fixed="right" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="small"
            v-if="isAbandoned!=true"
          >查看</el-button>
          <el-button type="text" size="small" v-if="isMyCreated">删除</el-button>
          <el-button type="text" size="small" v-if="isMyFavorite">取消收藏</el-button>
          <el-button type="text" size="small" v-if="isAbandoned">恢复</el-button>
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
</style>