<template>
  <div class="home">
    <div id="workspace-sidenav">
      <h2>工作台</h2>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :router="true"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/workspace/recent">
          <i class="el-icon-document"></i>
          <span slot="title">最近文件 TODO</span>
        </el-menu-item>
        <el-menu-item index="/workspace/myfiles">
          <i class="el-icon-document"></i>
          <span slot="title">我创建的文件</span>
        </el-menu-item>
        <el-menu-item index="/workspace/favorite">
          <i class="el-icon-star-off"></i>
          <span slot="title">收藏的文件</span>
        </el-menu-item>
        <el-menu-item index="/workspace/myTeams">
          <i class="el-icon-user-solid"></i>
          <span slot="title">我加入的团队</span>
        </el-menu-item>
        <el-menu-item index="/workspace/myTeams">
          <i class="el-icon-user"></i>
          <span slot="title">我创建的团队 TODO</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div id="sub-router-view">
      <router-view />
    </div>
  </div>
</template>

// Home组件：个人工作台

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>

<style>
.header {
  border-bottom-style: solid;
  border-color: #dddddd;
  border-width: 1px;
}
#userArea {
  position: fixed;
  right: 50px;
}
#workspace-sidenav {
  overflow-y: auto;
  position: fixed;
  top: calc(63px + 20px);
  width: 250px;
  height: calc(100vh - 63px);
}
#sub-router-view {
  margin-left: 255px;
}
</style>