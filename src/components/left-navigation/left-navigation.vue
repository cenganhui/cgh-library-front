<template>
  <div class="left-navigation">
    <el-row class="tac">
      <el-col>
        <h2 class="title">系统管理</h2>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="rgb(48, 65, 86)"
          text-color="#fff"
          active-text-color="rgb(64, 158, 255)"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
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
        this.$router.push({ path: '/book' })
      }
    },
  },
}
</script>

<style>
.title {
  color: white;
}

.left-navigation {
  background-color: rgb(48, 65, 86);
  height: 100%;
  margin-right: 8px;
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