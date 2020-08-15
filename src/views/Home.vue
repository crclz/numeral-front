<template>
  <div class="home">
    <div id="workspace-sidenav">
      <h5>默认颜色</h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div id="document-list">
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
      <h1>自定义颜色</h1>
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
  top: 63px;
  width: 250px;
  height: calc(100vh - 63px);
}
</style>