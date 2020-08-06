<template>
  <el-container>
    <el-header>CGH的图书馆</el-header>
    <el-main>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="100px"
        class="login-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { login } from '@/api/user.js'
import { setLoginInfo, getLoginInfo } from '@/utils/auth.js'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    login(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          //   console.log(this.loginForm.username);
          login(this.loginForm)
            .then((response) => {
              console.log(response)
              const loginInfo = {
                token: response.data.token,
                admin: response.data.user.admin,
                id: response.data.user.id,
                username: response.data.user.username,
                nickName: response.data.user.nickName,
              }
              setLoginInfo(loginInfo)
              console.log(getLoginInfo())
              this.$router.push({ path: '/' })
            })
            .catch((error) => {
              console.log(error)
            })
          //   alert("submit!");
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(loginForm) {
      this.$refs[loginForm].resetFields()
    },
  },
}
</script>

<style>
</style>