<template>
  <el-row class="tac">
    <el-col>
      <h2>系统管理</h2>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">图书管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      if (key === '2') {
        this.$router.push({ path: '/book' })
      } else if (key === '1') {
        this.$router.push({ path: '/user' })
      }
    },
  },
}
</script>

<style>
.el-row > .el-menu-item {
  width: 100%;
  text-align: center;
  justify-content: center;
}
</style>