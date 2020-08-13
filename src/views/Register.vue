<template>
  <div class="register_container">
    <div class="register_box">
      <!-- 注册表单区域 -->
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerFormRules"
        class="register_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-view"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 描述信息 -->
        <el-form-item label="个人简介" prop="description">
          <el-input type="textarea" v-model="registerForm.description" placeholder="请输入个人简介"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="resetregisterForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    var checkDescpt = (rule, value, callback) => {
      if (value.length > 32) {
        callback(new Error("最多输入32个字符，字数超出限制"));
      } else {
        callback();
      }
    };
    return {
      // 这是注册表单的数据绑定对象
      registerForm: {
        username: "",
        password: "",
        description: "",
      },
      // 这是表单验证规则对象
      registerFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入账号", trigger: "change" },
          {
            min: 3,
            max: 16,
            message: "用户名长度在 3 到 16 个字符",
            trigger: "change",
          },
        ],

        //验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 16,
            message: "用户名长度在 6 到 32 个字符",
            trigger: "change",
          },
        ],
        description: [{ validator: checkDescpt, trigger: "change" }],
      },
    };
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetregisterForm() {
      this.$refs.registerFormRef.resetFields();
    },
    register() {
      this.$axios
        .post("/api/users", {
          description: this.registerForm.description,
          password: this.registerForm.password,
          username: this.registerForm.username,
        })
        .then((response) => {
          console.log(response);
          alert("注册成功");
          console.log("开始测试");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          alert(error.response.data.message);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.register_container {
  background-color: skyblue;
  height: 100%;
}
.register_form {
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
.register_box {
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