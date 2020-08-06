<template>
  <div class="head-navigation">
    <el-row background-color="rgb(48, 65, 86)">
      <el-col :span="22">
        <div class="big-title">{{ nickName }}的图书馆</div>
      </el-col>
      <el-col :span="2">
        <div>
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            background-color="rgb(48, 65, 86)"
            text-color="#fff"
            active-text-color="rgb(64, 158, 255)"
            style="height: 45px"
          >
            <el-submenu index="1" style="width: 100%; text-align: center">
              <template slot="title">{{ nickName }}</template>
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
import { logout } from '@/api/user.js'
import { removeLoginInfo, getLoginInfo } from '@/utils/auth.js'
export default {
  data() {
    return {
      activeIndex: '1',
      nickName: getLoginInfo().nickName,
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      if (key === '1-2') {
        logout().then((res) => {
          if (res.code === '0000') {
            removeLoginInfo()
            this.lib.notificationSuccess(this, '已退出')
            this.$router.push({ path: '/login' })
          }
        })
      }
    },
  },
}
</script>

<style>
.head-navigation {
  height: 45px;
}
.big-title {
  font-size: 25px;
  text-align: center;
  margin-top: 10px;
  color: white;
}
</style>