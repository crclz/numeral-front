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
            <!-- <el-button type="info" @click="resetcurrentPermission">重置</el-button> -->
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
        console.log(response);
        this.currentPermission = response.data;
        this.defaultData = response.data.data;
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
  methods: {
    // 点击重置按钮，重置登录表单
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
          this.success("权限修改成功");
          console.log(response.data);
        })
        .catch((p) => this.err(p));
    },
  },
};
</script>

<style scoped>
</style>