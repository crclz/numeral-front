<template>
  <div class="SetDucPermission_container" v-if="ret">
    <el-form
      ref="currentFileRef"
      :model="currentFile"
      status-icon
      label-width="100px"
      class="SetDucPermission_form"
    >
      <div class="permisEveryone" v-if="isCreator">
        <!-- 所有人的权限设置 -->
        <tr>
          <td>所有人是否可分享：</td>
          <td>
            <el-radio-group v-model="currentFile.publicCanShare">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>所有人对评论权限：</td>
          <td>
            <el-radio-group v-model="currentFile.publicCommentAccess">
              <el-radio :label="'None'">无权限</el-radio>
              <el-radio :label="'Read'">只读权限</el-radio>
              <el-radio :label="'ReadWrite'">读写权限</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>所有人对文档权限：</td>
          <td>
            <el-radio-group v-model="currentFile.publicDocumentAccess">
              <el-radio :label="'None'">无权限</el-radio>
              <el-radio :label="'Read'">只读权限</el-radio>
              <el-radio :label="'ReadWrite'">读写权限</el-radio>
            </el-radio-group>
          </td>
        </tr>
      </div>
      <!-- 上面只有在isCreator==true时显示 -->
      <div class="permisTeam">
        <!-- 团队的权限设置 -->
        <tr>
          <td>团队人员是否可分享：</td>
          <td>
            <el-radio-group v-model="currentFile.teamCanShare">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>团队人员对评论权限：</td>
          <td>
            <el-radio-group v-model="currentFile.teamCommentAccess">
              <el-radio :label="'None'">无权限</el-radio>
              <el-radio :label="'Read'">只读权限</el-radio>
              <el-radio :label="'ReadWrite'">读写权限</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>团队人员对文档权限：</td>
          <td>
            <el-radio-group v-model="currentFile.teamDocumentAccess">
              <el-radio :label="'None'">无权限</el-radio>
              <el-radio :label="'Read'">只读权限</el-radio>
              <el-radio :label="'ReadWrite'">读写权限</el-radio>
            </el-radio-group>
          </td>
        </tr>
      </div>
      <tr>
        <td></td>
        <td>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="submit()" v-if="this.isEditFile == null">保存</el-button>
            <!-- <el-button type="info" @click="resetcurrentFile">重置</el-button> -->
          </el-form-item>
        </td>
      </tr>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SetDocPermission",
  props: ["document", "isEditFile"],
  created() {
    this.documentId = this.$route.params.id;
    // 获取原本的权限
    this.$axios
      .get("/api/documents/" + this.documentId)
      .then((response) => {
        console.log(response);
        this.currentFile = response.data;

        // 验证是否为Creator
        if (this.currentFile.creatorId == this.global.me.id)
          this.isCreator = true;

        this.ret = true;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      documentId: "",
      currentFile: {
        publicCanShare: true,
        publicCommentAccess: "None",
        publicDocumentAccess: "None",
        teamCanShare: true,
        teamCommentAccess: "None",
        teamDocumentAccess: "None",
      },
      isCreator: false, // 如果不是创作者那只可能是队长，而队长只有团队权限编辑的权力
      ret: false,
    };
  },
  mounted() {},
  methods: {
    // 点击重置按钮，重置登录表单
    submit() {
      if (this.isCreator) {
        this.$axios
          .patch("/api/documents/" + this.documentId, {
            publicCanShare: this.currentFile.publicCanShare,
            publicCommentAccess: this.currentFile.publicCommentAccess,
            publicDocumentAccess: this.currentFile.publicDocumentAccess,
            teamCanShare: this.currentFile.teamCanShare,
            teamCommentAccess: this.currentFile.teamCommentAccess,
            teamDocumentAccess: this.currentFile.teamDocumentAccess,
          })
          .then((response) => {
            this.success("权限修改成功");
            console.log(response.data);
            if (this.isEditFile == null) {
              this.$router.go(-1);
            }
          })
          .catch((p) => this.err(p));
      } else {
        this.$axios
          .patch("/api/documents/" + this.documentId, {
            teamCanShare: this.currentFile.teamCanShare,
            teamCommentAccess: this.currentFile.teamCommentAccess,
            teamDocumentAccess: this.currentFile.teamDocumentAccess,
          })
          .then((response) => {
            this.success("权限修改成功");
            console.log(response.data);
            if (this.isEditFile == null) {
              this.$router.go(-1);
            }
          })
          .catch((p) => this.err(p));
      }
    },
  },
};
</script>

<style scoped>
</style>