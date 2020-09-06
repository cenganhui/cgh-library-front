<template>
  <div class="login">
    <el-form
      :model="registerForm"
      :rules="registerRules"
      ref="registerForm"
      label-width="auto"
      class="login-form"
    >
      <h1 class="login-title">CGH的图书馆</h1>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="registerForm.nickName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="submitData('registerForm')">注册</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/user.js'
export default {
  data() {
    return {
      registerForm: {
        username: '',
        nickName: '',
        email: '',
        password: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false,
    }
  },
  methods: {
    submitData(registerForm) {
      this.$refs[registerForm].validate((valid) => {
        if (valid) {
          this.loading = true
          register(this.registerForm)
            .then((res) => {
              if (res.code === '0000') {
                this.lib.notificationSuccess(this, '注册成功')
                this.$router.push({ path: '/login' })
                this.loading = false
              } else {
                this.lib.notificationWarning(this, res.msg || '注册失败')
              }
            })
            .catch((error) => {
              this.loading = false
              this.lib.notificationWarning(this, error || '注册失败')
            })
        }
      })
    },
    resetForm(registerForm) {
      this.$refs[registerForm].resetFields()
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