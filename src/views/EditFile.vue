<template>
  <div v-if="this.ret">
    <div v-if="!userPermissions.document.canWrite">
      <h1>抱歉，您没有本文档的编辑权限。</h1>
      <h1>Sorry, but you have no permission to edit this document.</h1>
    </div>
    <div v-else>
      <div v-if="!haveLock">该文件正在被{{this.lockOwner.username}}编辑，您暂时无法编辑该文档。</div>
      <div v-if="haveLock">
        <div class="center-wrapper">
          <h1 class="text-center">修改文件</h1>
          <h2
            style="color:red;"
            v-if="this.currentFile.isAbandoned"
          >本文档在回收站中 This document is currently abandoned.</h2>

          <el-form
            :model="currentFile"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            label-position="top"
          >
            <el-form-item label="标题" prop="title">
              <el-input v-model="currentFile.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="文档基础信息" prop="description">
              <el-input v-model="currentFile.description" placeholder="请输入对该文档的描述"></el-input>
            </el-form-item>
          </el-form>
          <!-- 设置文档权限弹出框 -->
          <el-popover placement="top" trigger="click" v-model="visible">
            <div class="popup-wrapper" style="text-align: center; margin: 0">
              <set-doc-permission ref="setPermission" :isEditFile="true"></set-doc-permission>
              <el-button size="mini" type="warning" plain @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="SetPermissionOnclick">确定</el-button>
            </div>
            <el-button
              class="action-btn"
              slot="reference"
              type="warning"
              :disabled="this.currentTeam.leaderId!=this.global.me.id&&this.global.me.id!=this.currentFile.creatorId"
            >设置文档权限</el-button>
          </el-popover>

          <div id="editor-area">
            <editor ref="thisEditor" :initial-content="defaultData"></editor>
          </div>

          <div id="submit-wrapper">
            <el-button type="success" @click="onSubmit">保存文件</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "../components/Editor";
import SetDocPermission from "@/components/SetDocPermission.vue";
import axios from "axios";
export default {
  name: "EditFile",
  components: { Editor, SetDocPermission },
  created() {
    this.documentId = this.$route.params.id;

    // 读取用户权限
    axios
      .get("/api/documents/permission/" + this.documentId)
      .then((response) => {
        // window.console.log(response.data.length);
        console.log(response);
        this.userPermissions.ref = response.data;
        if (this.userPermissions.ref.documentAccess == "ReadWrite") {
          this.userPermissions.document.canWrite = true;
          axios
            .get("/api/documents/" + this.documentId)
            .then((response) => {
              // window.console.log(response.data.length);
              console.log(response);
              this.currentFile = response.data;
              this.defaultData = response.data.data;
              this.ret = true;
              if (
                this.currentFile.teamId != null &&
                this.currentFile.teamId != 0 &&
                this.currentFile.teamId != -1
              ) {
                this.$axios
                  .get("/api/teams/" + this.currentFile.teamId)
                  .then((response) => {
                    this.currentTeam = response.data;
                  })
                  .catch((error) => {
                    console.log(error);
                    this.err(error);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });

          // 计时器，定时获取锁
          this.timer = setInterval(() => {
            axios
              .post("/api/e-lock/acquire?documentId=" + this.documentId)
              .then((response) => {
                console.log(response);
                this.lockOwner = response.data.ownerRef;
                if (!this.lockOwner) {
                  // 写锁无主
                  this.haveLock = true;
                } else {
                  // 写锁有主
                  this.haveLock = false;
                }
              })
              .catch((error) => {
                console.log(error);
                this.err(error);
              });
          }, 1000);
        } else {
          this.ret = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  destroyed() {
    this.quitPage();
  },
  data() {
    return {
      visible: false,
      currentTeam: "",
      documentId: "",
      defaultData: "",
      currentFile: {
        title: "",
        description: "",
        data: "",
        isAbandoned: false,
      },
      haveLock: false,
      lockOwner: null,
      timer: null,
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 1,
            max: 25,
            message: "长度小于 25 个字符，不得为空",
            trigger: "blur",
          },
        ],
        description: [
          { max: 140, message: "长度不得超过 140 个字符", trigger: "blur" },
        ],
      },
      userPermissions: {
        ref: null,
        document: {
          canWrite: false,
        },
      },
      ret: false,
    };
  },
  methods: {
    SetPermissionOnclick() {
      this.$refs.setPermission.submit();
      this.visible = false;
    },
    onSubmit() {
      var content = this.$refs.thisEditor.getEditorContent();

      const maxlen = 65535;
      if (content.length > maxlen) {
        this.errmsg(`当前富文本量为${content.length}, 超出了限制（${maxlen}）`);
        return;
      }

      axios
        .patch("/api/documents/" + this.documentId, {
          title: this.currentFile.title,
          description: this.currentFile.description,
          data: content,
        })
        .then((response) => {
          console.log(response);
          this.success("保存成功");
          this.quitPage();
          this.$router.push({ path: "/readFile/" + this.documentId });
        })
        .catch((error) => {
          console.log(error);
          this.err(error);
        });
    },
    change(val) {
      this.currentFile.data = val;
    },
    quitPage() {
      if (this.timer) clearInterval(this.timer);
      axios.post("/api/e-lock/release?documentId="+this.documentId)
        .then((response) => {
          console.log(response);
        })
      .catch((error) => {
        console.log(error);
      })
    }
  },
};
</script>

<style scoped>
#editor-area {
  margin: 50px 0;
}

#submit-wrapper {
  text-align: center;
}
</style>