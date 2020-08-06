<template>
  <div class="home">
    <el-container>
      <el-header>
        <head-navigation></head-navigation>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <left-navigation></left-navigation>
        </el-aside>
        <el-main>
          <transition enter-active-class="animate__animated animate__zoomIn">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style>
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  justify-content: center;
}
</style>

<script>
import leftNavigation from '@/components/left-navigation/left-navigation.vue'
import headNavigation from '@/components/head-navigation/head-navigation.vue'
export default {
  name: 'Home',
  components: {
    leftNavigation,
    headNavigation,
  },
}
</script>