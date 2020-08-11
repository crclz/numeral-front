<template>
  <div class="PatchUser_container">
    <h2 class="PatchUser_title">修改个人信息</h2>
    <div class="PatchUser_box">
      <!-- 修改个人信息表单区域 -->
      <el-form
        ref="PatchUserFormRef"
        :model="PatchUserForm"
        status-icon
        :rules="PatchUserFormRules"
        label-width="100px"
        class="PatchUser_form"
      >
        <!-- 更换头像 -->

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="PatchUserForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="PatchUserForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 描述信息 -->
        <el-form-item label="个人简介" prop="description">
          <el-input type="textarea" v-model="PatchUserForm.description" placeholder="请输入个人简介"></el-input>
        </el-form-item>

        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm('PatchUserForm')">保存</el-button>
          <el-button type="info" @click="resetPatchUserForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PatchUser",
  data() {
    // 后面主要是进行一个表单的验证

    var checkDescpt = (rule, value, callback) => {
      // 或许还应该完善
      if (value.length > 100) {
        callback(new Error("字数超出限制"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.PatchUserForm.checkPass !== "") {
          this.$refs.PatchUserFormRef.validateField("checkPass");
        }
        callback();
      }
    };
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
      // 这是登录表单的数据绑定对象
      PatchUserForm: {
        avatarUrl: "",
        description: "",
        password: "",
        checkPass: "",
      },
      // 这是表单验证规则对象
      PatchUserFormRules: {
        //验证密码是否合法
        password: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 16, message: "密码格式错误", trigger: "blur" },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        description: [{ validator: checkDescpt, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetPatchUserForm() {
      this.$refs.PatchUserFormRef.resetFields();
    },
    submitForm(PatchUserForm) {
      this.$axios
        .post("/api/users/{id}", {
          avatarUrl: PatchUserForm.avatarUrl,
          description: PatchUserForm.description,
          password: PatchUserForm.password,
        })
        .then((response) => {
          console.log(response);
          alert("修改成功");
          console.log("开始测试");
          console.log(response);
          console.log("测试again");
          console.log(response.data);
        })
        .catch(function (error) {
          // window.err3 = error;
          console.log("错误提示！");
          console.log(error);
          alert(error.response.data.message);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.PatchUser_container {
  height: 100%;
}
.PatchUser_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  // 文本框向下
  padding: 0 30px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
  // 按钮尾部对齐
}
.PatchUser_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>