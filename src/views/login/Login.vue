<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-width="auto"
      class="login-form"
    >
      <h1 class="login-title">CGH的图书馆</h1>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="login('loginForm')">登录</el-button>
        <el-button @click="toRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
import { setLoginInfo } from '@/utils/auth.js'

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
      loading: false
    }
  },
  methods: {
    login(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          this.loading = true
          //   console.log(this.loginForm.username);
          login(this.loginForm)
            .then((response) => {
              // console.log(response)
              const loginInfo = {
                token: response.data.token,
                admin: response.data.user.admin,
                id: response.data.user.id,
                username: response.data.user.username,
                nickName: response.data.user.nickName,
              }
              setLoginInfo(loginInfo)
              this.lib.notificationSuccess(this, '登录成功')
              this.$router.push({ path: '/' })
              this.loading = false
            })
            .catch((error) => {
              this.loading = false
              this.lib.notificationWarning(this, error || '登录失败')
            })
          //   alert("submit!");
        } else {
          this.loading = false
          this.lib.notificationWarning(this, '登录失败')
          return false
        }
      })
    },
    toRegister() {
      this.$router.push({ path: '/register' })
    },
  },
}
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  position: relative;
}
.login-form {
  width: 500px;
  margin: auto;
  position: absolute;
  top: 20%;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
}
</style>