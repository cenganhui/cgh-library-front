<template>
  <div class="left-navigation">
    <el-row class="tac">
      <el-col>
        <div class="sys-title">
          <i class="el-icon-menu"></i>
          <span class="title">系统管理</span>
        </div>
        <el-menu
          default-active="3"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="rgb(48, 65, 86)"
          text-color="#fff"
          active-text-color="rgb(64, 158, 255)"
        >
          <el-menu-item index="1">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-collection"></i>
            <span slot="title">图书管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-reading"></i>
            <span slot="title">我的图书</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$router.push({ path: '/book' })
    },
    handleSelect(key) {
      // handleSelect(key, keyPath) {
      //   console.log(key, keyPath)
      if (key === '1') {
        this.$router.push({ path: '/user' })
      } else if (key === '2') {
        this.$router.push({ path: '/sysbook' })
      } else if (key === '3') {
        this.$router.push({ path: '/book' })
      }
    },
  },
}
</script>

<style>
.sys-title {
  color: white;
  font-size: 30px;
  margin-bottom: 20px;
}

.title {
  color: white;
  margin-left: 10px;
}

.left-navigation {
  background-color: rgb(48, 65, 86);
  height: 100%;
  margin-right: 10px;
}

.el-col > .el-menu {
  width: 100%;
}

.el-row > .el-menu-item {
  width: 100%;
  text-align: center;
  justify-content: center;
}
</style>