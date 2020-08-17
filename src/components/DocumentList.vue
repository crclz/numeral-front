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
          <!-- 删除按钮 -->
          <el-popover
            placement="top"
            width="160"
            :ref="`popover-${scope.$index}`"
            title="确定删除该文档吗？"
          >
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
              >取消</el-button>
              <el-button type="primary" size="mini" @click="$emit('delete-onclick',scope.row)">确定</el-button>
            </div>
            <el-button
              v-if="isMyCreated"
              type="danger"
              plain
              icon="el-icon-delete"
              circle
              size="mini"
              slot="reference"
            ></el-button>
          </el-popover>
          <!-- 取消收藏按钮 -->
          <el-button
            @click="$emit('abandon-favorite-onclick',scope.row)"
            v-if="isMyFavorite"
            type="warning"
            plain
            round
            size="mini"
          >取消收藏</el-button>
          <el-button
            @click="$emit('on-recover-click',scope.row.id)"
            v-if="isAbandoned"
            type="warning"
            plain
            round
            size="mini"
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
    return {
      visible: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
.el-link.el-link--default {
  font-size: medium;
}
</style>
