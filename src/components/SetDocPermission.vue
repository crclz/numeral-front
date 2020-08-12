<template>
  <div class="SetDucPermission_container">
    <tr>
      <td>所有人对评论权限：</td>
      <td>
        <el-radio-group v-model="currentPermission.publicCommentAccess">
          <el-radio :label="'None'">无权限</el-radio>
          <el-radio :label="'Read'">只读权限</el-radio>
          <el-radio :label="'ReadWrite'">读写权限</el-radio>
        </el-radio-group>
      </td>
    </tr>
    <tr>
      <td>所有人对文档权限：</td>
      <td>
        <el-radio-group v-model="currentPermission.publicDocumentAccess">
          <el-radio :label="'None'">无权限</el-radio>
          <el-radio :label="'Read'">只读权限</el-radio>
          <el-radio :label="'ReadWrite'">读写权限</el-radio>
        </el-radio-group>
      </td>
    </tr>

    <tr>
      <td>团队人员对评论权限：</td>
      <td>
        <el-radio-group v-model="currentPermission.teamCommentAccess">
          <el-radio :label="'None'">无权限</el-radio>
          <el-radio :label="'Read'">只读权限</el-radio>
          <el-radio :label="'ReadWrite'">读写权限</el-radio>
        </el-radio-group>
      </td>
    </tr>
    <tr>
      <td>团队人员对文档权限：</td>
      <td>
        <el-radio-group v-model="currentPermission.teamCanShare">
          <el-radio :label="'None'">无权限</el-radio>
          <el-radio :label="'Read'">只读权限</el-radio>
          <el-radio :label="'ReadWrite'">读写权限</el-radio>
        </el-radio-group>
      </td>
    </tr>
  </div>
</template>

<script>
export default {
  created() {
    this.documentId = this.$route.params.id;
    this.$axios
      .get("/api/documents/" + this.documentId)
      .then((response) => {
        // window.console.log(response.data.length);
        console.log(response);
        this.currentPermission = response.data;
        this.defaultData = response.data.data;
        console.log("当前传入情况");
        console.log(this.currentPermission);
        // alert("请求成功")
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  data() {
    return {
      documentId: "",
      defaultData: "",
      currentPermission: {
        publicCanShare: true,
        publicCommentAccess: "None",
        publicDocumentAccess: "None",
        teamCanShare: true,
        teamCommentAccess: "None",
        teamDocumentAccess: "None",
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style>
</style>