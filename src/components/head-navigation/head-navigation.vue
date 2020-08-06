<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <div class="grid-content bg-purple">CGH的图书馆</div>
      </el-col>
      <el-col :span="4" :offset="4">
        <div>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">CGH</template>
              <el-menu-item index="1-1">个人中心</el-menu-item>
              <el-menu-item index="1-2">退出</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style>
</style>