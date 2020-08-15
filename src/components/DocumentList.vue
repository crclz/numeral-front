<template>
  <div>
    <el-table :data="QDocument" style="width: 100%" stripe>
      <el-table-column label="标题" width="200">
        <template slot-scope="scope">
          <el-link
            @click="jmp('/readFile/'+scope.row.id)"
            v-if="isAbandoned!=true"
          >{{scope.row.title}}</el-link>
          <p v-if="isAbandoned">{{scope.row.title}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" width="500"></el-table-column>
      <el-table-column label="发布时间" width="200">
        <template slot-scope="scope">{{scope.row.createdAt|moment}}</template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            @click="$emit('delete-onclick',scope.row)"
            v-if="isMyCreated"
            type="danger"
            plain
          >删除</el-button>
          <el-button
            @click="$emit('abandon-favorite-onclick',scope.row)"
            v-if="isMyFavorite"
            type="warning"
            plain
          >取消收藏</el-button>
          <el-button
            @click="$emit('on-recover-click',scope.row.id)"
            v-if="isAbandoned"
            type="warning"
            plain
          >恢复</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DocumentList",
  props: ["QDocument", "isMyCreated", "isMyFavorite", "isAbandoned"],
  model: {
    event: ["delete-onclick", "abandon-favorite-onclick", "on-recover-click"],
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.el-link.el-link--default {
  font-size: medium;
}
</style>