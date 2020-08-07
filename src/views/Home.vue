<template>
  <div class="home">
    <el-row style="height: 100%;margin-left: 0">
      <el-col :span="24" class="head-el-col">
        <head-navigation></head-navigation>
      </el-col>
      <el-col :span="3" style="height: calc(100% - 60px);">
        <div class="left-div">
          <left-navigation></left-navigation>
        </div>
      </el-col>
      <el-col :span="21" style="height: calc(100% - 80px); margin-top: 10px">
        <div style="height: 100%">
          <transition enter-active-class="animate__animated animate__zoomIn">
            <router-view></router-view>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.home {
  height: 100%;
}
.head-el-col {
  background-color: rgb(48, 65, 86);
}
.left-div {
  text-align: center;
  height: 100%;
  margin-left: 0;
}
.el-footer {
  background-color: #7fb3f7;
  color: rgb(99, 171, 219);
  text-align: center;
  line-height: 60px;
}
</style>

<script>
import leftNavigation from '@/components/left-navigation/left-navigation.vue'
import headNavigation from '@/components/head-navigation/head-navigation.vue'
import { getLoginInfo } from '@/utils/auth.js'
export default {
  name: 'Home',
  components: {
    leftNavigation,
    headNavigation,
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log(getLoginInfo())
    },
  },
}
</script>