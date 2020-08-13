<template>
  <div class="setTeamDocPermis_container">
    <el-form
      ref="currentTeamPermisRef"
      :model="currentTeamPermis"
      status-icon
      :rules="currentTeamPermisRules"
      label-width="100px"
      class="setTeamDocPermis_form"
    >
      <tr>
        <td>团队人员是否可分享：</td>
        <td>
          <el-radio-group v-model="currentTeamPermis.teamCanShare">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td>团队人员对评论权限：</td>
        <td>
          <el-radio-group v-model="currentTeamPermis.teamCommentAccess">
            <el-radio :label="'None'">无权限</el-radio>
            <el-radio :label="'Read'">只读权限</el-radio>
            <el-radio :label="'ReadWrite'">读写权限</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td>团队人员对文档权限：</td>
        <td>
          <el-radio-group v-model="currentTeamPermis.teamDocumentAccess">
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
        this.currentTeamPermis = response.data;
        this.defaultData = response.data.data;
        console.log("当前传入情况");
        console.log(this.currentTeamPermis);
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
      currentTeamPermis: {
        publicCanShare: true,
        publicCommentAccess: "None",
        publicDocumentAccess: "None",
        teamCanShare: true,
        teamCommentAccess: "None",
        teamDocumentAccess: "None",
      },
      currentTeamPermisRules: {},
    };
  },
  mounted() {},
  methods: {
    submit() {
      this.$axios
        .patch("/api/documents/" + this.documentId, {
          teamCanShare: this.currentTeamPermis.teamCanShare,
          teamCommentAccess: this.currentTeamPermis.teamCommentAccess,
          teamDocumentAccess: this.currentTeamPermis.teamDocumentAccess,
        })
        .then((response) => {
          console.log(response);
          alert("修改成功");
          console.log("正确提示！");
          console.log(response.data);
          console.log(this.currentTeamPermis);
        })
        .catch((error) => {
          console.log("错误提示！");
          console.log(this.currentTeamPermis);
          console.log(error.response.data);
        });
    },
  },
};
</script>

<style>
</style>