<template>
  <div>
    <div id="center-wrapper">
      <h1>创建文件</h1>
      <el-form :model="newFile" :rules="rules" ref="ruleForm" label-position="top">
        <el-form-item label="标题" prop="title">
          <el-input v-model="newFile.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文档基础信息" prop="description">
          <el-input v-model="newFile.description" placeholder="请输入对该文档的描述"></el-input>
        </el-form-item>
      </el-form>

      <div id="editor-area">
        <editor ref="thisEditor" :initial-content="initialContent"></editor>
      </div>
      <div id="submit-wrapper">
        <el-button type="success" @click="submitForm('ruleForm')">保存文件</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "../components/Editor";
import axios from "axios";
export default {
  name: "CreateFile",
  components: { Editor },
  created() {
    // 判断是否由模板建立
    this.templateId = this.$route.params.id;
    if (this.templateId) {
      // 初始化编辑器
      axios
        .get("/api/documents/" + this.templateId)
        .then((response) => {
          // window.console.log(response.data.length);
          console.log(response);
          this.newFile.title = response.data.title;
          this.newFile.description = response.data.description;
          this.initialContent = response.data.data;
          // alert("请求成功")
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  data() {
    return {
      templateId: 0,
      initialContent: "",
      newFile: {
        title: "",
        description: "",
      },
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
    };
  },
  methods: {
    onSubmit() {
      // this.newFile.data = this.$refs.thisEditor.getEditorContent;
      // this.newFile.data = '123';
      axios
        .post("/api/documents/", {
          data: this.$refs.thisEditor.getEditorContent(),
          description: this.newFile.description,
          title: this.newFile.title,
        })
        .then((response) => {
          console.log(response);
          this.success("保存成功");
          this.$router.push({ path: "/myFiles" });
        })
        .catch((error) => {
          console.log(error);
          this.err(error);
        });
    },
    getDocumentId() {
      return null;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onSubmit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
#center-wrapper {
  max-width: 860px;
  margin: 0 auto;
}

#editor-area {
  margin: 50px 0;
}

#submit-wrapper {
  text-align: center;
}
</style>