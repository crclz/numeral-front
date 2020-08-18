<template>
  <div class="PatchUser_container">
    <h1 class="title">修改个人信息</h1>
    <div class="PatchUser_box">
      <!-- 修改个人信息表单区域 -->
      <!-- 上传头像 -->
      <div class="avatar_box">
        <div>
          <el-avatar
            v-if="PatchUserForm.avatarUrl"
            class="avatar"
            shape="square"
            :size="120"
            fit="cover"
            alt="用户头像"
            :src="PatchUserForm.avatarUrl"
          ></el-avatar>
          <!-- <img v-if="PatchUserForm.avatarUrl" :src="PatchUserForm.avatarUrl" class="avatar" /> -->
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <el-upload
            class="avatar-uploader"
            action="/api/blobs"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button
              size="small"
              type="success"
              class="Upload_btns"
              icon="el-icon-picture-outline-round"
            >点击上传</el-button>
          </el-upload>
        </div>
      </div>
      <div class="info_box">
        <!-- 密码 -->
        <el-form
          ref="password"
          :model="PatchUserForm"
          status-icon
          :rules="PatchUserFormRulesPassword"
          label-width="100px"
          label-position="top"
          class="PatchUser_form"
        >
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="PatchUserForm.password"
              autocomplete="off"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="PatchUserForm.checkPass"
              autocomplete="off"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="submitForm('password')" size="small">修改密码</el-button>
            <el-button type="info" @click="resetPatchUserForm('password')" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 描述信息 -->
        <el-form
          ref="description"
          :model="PatchUserForm"
          status-icon
          :rules="PatchUserFormRulesDescription"
          label-width="100px"
          class="PatchUser_form"
          label-position="top"
        >
          <el-form-item label="个人简介" prop="description">
            <el-input type="textarea" v-model="PatchUserForm.description" placeholder="请输入个人简介"></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="submitForm('description')" size="small">保存</el-button>
            <el-button type="info" @click="resetPatchUserForm('description')" size="small">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PatchUser",
  mounted() {
    this.UserId = this.$route.params.id;
    this.$axios
      .get("/api/users/" + this.UserId)
      .then((response) => {
        console.log(response);
        this.PatchUserForm.description = response.data.description;
        this.PatchUserForm.avatarUrl = response.data.avatarUrl;
      })
      .catch((p) => this.err(p));
  },
  data() {
    //对两次输入的密码是否相同进行验证
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.PatchUserForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      UserId: "",
      PatchUserForm: {
        avatarUrl: null,
        description: null,
        password: null,
        checkPass: null,
      },
      PatchUserFormRulesPassword: {
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 16,
            message: "密码长度在 6 到 32 个字符",
            trigger: "change",
          },
        ],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
      },
      PatchUserFormRulesDescription: {
        description: [
          { min: 0, max: 32, message: "长度超出32个字符", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    // 上传头像的限制
    handleAvatarSuccess(res, file) {
      this.PatchUserForm.avatarUrl = res;
      console.log(file);
      this.$axios
        .patch("/api/users/" + this.UserId, {
          avatarUrl: this.PatchUserForm.avatarUrl,
        })
        .then((response) => {
          this.success("头像更换成功");
          console.log(response.data);
          // 更新用户信息
          // this.refreshMe();
        })
        .catch((p) => this.err(p));
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 点击重置按钮，重置登录表单
    resetPatchUserForm(formname) {
      this.$refs[formname].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName == "password") this.submitForm_pass();
          else this.submitForm_description();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm_pass() {
      this.$axios
        .patch("/api/users/" + this.UserId, {
          password: this.PatchUserForm.password,
        })
        .then((response) => {
          this.success("修改成功");
          console.log(response.data);
        })
        .catch((p) => this.err(p));
    },
    submitForm_description() {
      this.$axios
        .patch("/api/users/" + this.UserId, {
          description: this.PatchUserForm.description,
        })
        .then((response) => {
          this.success("修改成功");
          console.log(response.data);
        })
        .catch((p) => this.err(p));
    },
  },
};
</script>

<style lang="less" scoped>
// element ui 中对头像上传的修饰css代码
.PatchUser_container {
  max-width: 860px;
  margin: 0 auto;
}
.title {
  text-align: left;
}
.btns {
  display: flex;
  justify-content: flex-end;
  // 按钮尾部对齐
}
.PatchUser_box {
  display: flex;
}
.info_box {
  width: 350px;
  margin-left: 130px;
}
.Upload_btns {
  margin-top: 5px;
}
.avatar_box {
  width: fit-content;
  margin-left: 50px;
  margin-top: 15px;
  text-align: center;
}
.el-upload {
  cursor: default;
  text-align: center;
}
.el-upload--text {
  text-align: center;
  cursor: default;
}
.avatar-uploader-icon,
.avatar {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: visible;
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  display: inline-block;
  text-align: center;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
</style>