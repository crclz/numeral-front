<template>
  <div class="SetDucPermission_container">
    <el-form
      ref="currentPermissionRef"
      :model="currentPermission"
      status-icon
      :rules="currentPermissionRules"
      label-width="100px"
      class="SetDucPermission_form"
    >
      <tr>
        <td>所有人是否可分享</td>
        <td>
          <el-radio-group v-model="currentPermission.publicCanShare">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </td>
      </tr>
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
        <td>团队人员是否可分享：</td>
        <td>
          <el-radio-group v-model="currentPermission.teamCanShare">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
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
          <el-radio-group v-model="currentPermission.teamDocumentAccess">
            <el-radio :label="'None'">无权限</el-radio>
            <el-radio :label="'Read'">只读权限</el-radio>
            <el-radio :label="'ReadWrite'">读写权限</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="submit()">保存</el-button>
            <el-button type="info" @click="resetcurrentPermission">重置</el-button>
          </el-form-item>
        </td>
      </tr>
    </el-form>
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
      radio: 3,
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
      currentPermissionRules: {},
    };
  },
  mounted() {},
  methods: {
    // 点击重置按钮，重置登录表单
    resetcurrentPermission() {
      this.$refs.currentPermissionRef.resetFields();
    },
    submit() {
      this.$axios
        .patch("/api/documents/" + this.documentId, {
          publicCanShare: this.currentPermission.publicCanShare,
          publicCommentAccess: this.currentPermission.publicCommentAccess,
          publicDocumentAccess: this.currentPermission.publicDocumentAccess,
          teamCanShare: this.currentPermission.teamCanShare,
          teamCommentAccess: this.currentPermission.teamCommentAccess,
          teamDocumentAccess: this.currentPermission.teamDocumentAccess,
        })
        .then((response) => {
          console.log(response);
          alert("修改成功");
          console.log("正确提示！");
          console.log(response.data);
          console.log(this.currentPermission);
        })
        .catch((error) => {
          console.log("错误提示！");
          console.log(this.currentPermission);
          console.log(error.response.data);
        });
    },
  },
};
</script>

<style>
</style>