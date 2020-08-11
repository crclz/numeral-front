<template>
  <div class="PatchUser_container">
    <div class="PatchUser_box">
      <!-- 修改个人信息表单区域 -->
      <el-form
        ref="PatchUserFormRef"
        :model="PatchUserForm"
        :rules="PatchUserFormRules"
        class="PatchUser_form"
      >
        <!-- 更换头像 -->

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="PatchUserForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-view"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 再次输入密码 -->
        <el-form-item label="再次输入密码" prop="password">
          <el-input
            v-model="PatchUserForm.password"
            placeholder="请再次输入密码"
            prefix-icon="el-icon-view"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 描述信息 -->
        <el-form-item label="个人简介" prop="username">
          <el-input
            type="textarea"
            v-model="PatchUser.description"
            placeholder="请输入个人简介"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>

        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="PatchUser">保存</el-button>
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
    return {
      // 这是登录表单的数据绑定对象
      PatchUserForm: {
        avatarUrl: "",
        description: "",
        password: "",
      },
      // 这是表单验证规则对象
      PatchUserFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],

        //验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "密码格式错误", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetPatchUserForm() {
      this.$refs.PatchUserFormRef.resetFields();
    },
    PatchUser() {
      this.$axios
        .post("/api/users/{id}", {
          password: this.PatchUserForm.password,
        })
        .then(function (response) {
          console.log(response);
          alert("登录成功");
          console.log("开始测试");
          console.log(response);
          console.log("测试again");
          console.log(response.data);
          // 页面跳转，好像有问题
          // window.sessionStorage.setItem("token", res.data.token);
          // this.$router.push("/home");
        })
        .catch(function (error) {
          // window.err3 = error;
          console.log(error);
          alert(error.response.data.message);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.PatchUser_container {
  background-color: skyblue;
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
  .avatar_box {
    height: 130px;
    width: 130px;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    border: 1px solid #b2b2b2;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
</style>