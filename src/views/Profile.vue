<template>
  <div class="profile">
    <el-form :model="userForm" ref="userForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username" style="width: 600px">
        <el-input v-model="userForm.username" style="width: 300px" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName" style="width: 600px">
        <el-input v-model="userForm.nickName" style="width: 300px" :disabled="true"></el-input>
        <el-button
          type="primary"
          @click="showDialog('updateNickName')"
          style="margin-left: 10px"
        >修改昵称</el-button>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" style="width: 600px">
        <el-input v-model="userForm.email" style="width: 300px" :disabled="true"></el-input>
        <el-button
          type="primary"
          @click="showDialog('updateEmail')"
          style="margin-left: 10px"
        >修改邮箱</el-button>
      </el-form-item>
      <el-form-item label="密码" prop="password" style="width: 600px">
        <el-input v-model="userForm.password" style="width: 300px" :disabled="true"></el-input>
        <el-button
          type="primary"
          @click="showDialog('updatePassword')"
          style="margin-left: 10px"
        >修改密码</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="40%"
    >
      <el-form
        label-width="120px"
        :model="updateInfo"
        :rules="rules"
        :validate-on-rule-change="false"
        ref="updateForm"
      >
        <el-form-item v-if="dialogType === 'updatePassword'" label="原密码" prop="oldPassword">
          <el-input v-model="updateInfo.oldPassword" size="small" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item
          :label="label"
          prop="nickNameOrPassword"
        >
          <el-input v-model="updateInfo.nickNameOrPassword" size="small" style="width: 400px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="update('updateForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLoginInfo, setNickName, setEmail } from '@/utils/auth.js'
import { updateUser, updatePassword } from '@/api/user.js'
export default {
  data() {
    return {
      userForm: {
        username: '',
        nickName: '',
        email: '',
        password: '******'
      },
      updateInfo: {
        id: '',
        oldPassword: '',
        nickNameOrPassword: '',
      },
      rules: {
        oldPassword: {
          required: true,
          message: '不能为空',
          trigger: 'blur',
        },
        nickNameOrPassword: {
          required: true,
          message: '不能为空',
          trigger: 'blur',
        },
      },
      dialogType: '',
      title: '',
      label: '',
      dialogVisible: false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.userForm.username = getLoginInfo().username
      this.userForm.nickName = getLoginInfo().nickName
      this.userForm.email = getLoginInfo().email
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    showTitle() {
      if (this.dialogType === 'updateNickName') {
        this.title = '修改昵称'
      } else if (this.dialogType === 'updateEmail') {
        this.title = '修改邮箱'
      } else {
        this.title = '修改密码'
      }
    },
    showLabel() {
      if (this.dialogType === 'updateNickName') {
        this.label = '新昵称'
      } else if (this.dialogType === 'updateEmail') {
        this.label = '新邮箱'
      } else {
        this.label = '新密码'
      }
    },
    showDialog(type) {
      this.dialogType = type
      this.showTitle()
      this.showLabel()
      this.updateInfo.id = getLoginInfo().id
      this.updateInfo.oldPassword = ''
      this.updateInfo.nickNameOrPassword = ''
      this.dialogVisible = true
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogType === 'updateNickName') {
            const data = {
              id: this.updateInfo.id,
              nickName: this.updateInfo.nickNameOrPassword,
            }
            updateUser(data)
              .then((res) => {
                if (res.code === '0000') {
                  setNickName(res.data.nickName)
                  this.init()
                  this.lib.notificationSuccess(this, '修改成功')
                  this.dialogVisible = false
                } else {
                  this.lib.notificationWarning(
                    this,
                    res.msg || '修改失败，请重试'
                  )
                }
              })
              .catch((error) => {
                this.lib.notificationWarning(this, '修改失败，' + error)
              })
          } else if (this.dialogType === 'updateEmail') {
            const data = {
              id: this.updateInfo.id,
              email: this.updateInfo.nickNameOrPassword,
            }
            updateUser(data)
              .then((res) => {
                if (res.code === '0000') {
                  setEmail(res.data.email)
                  this.init()
                  this.lib.notificationSuccess(this, '修改成功')
                  this.dialogVisible = false
                } else {
                  this.lib.notificationWarning(
                    this,
                    res.msg || '修改失败，请重试'
                  )
                }
              })
              .catch((error) => {
                this.lib.notificationWarning(this, '修改失败，' + error)
              })
          } else if (this.dialogType === 'updatePassword') {
            const data = {
              oldPassword: this.updateInfo.oldPassword,
              newPassword: this.updateInfo.nickNameOrPassword,
            }
            updatePassword(data)
              .then((res) => {
                if (res.code === '0000') {
                  // TODO 重新登录
                  this.lib.notificationSuccess(this, '修改成功')
                  this.dialogVisible = false
                } else {
                  this.lib.notificationWarning(
                    this,
                    res.msg || '修改失败，请重试'
                  )
                }
              })
              .catch((error) => {
                this.lib.notificationWarning(this, '修改失败，' + error)
              })
          }
          // console.log(this.updateInfo)
          // console.log('submit')
        }
      })
    },
  },
}
</script>

<style scoped>
.profile {
  width: 100%;
}
</style>