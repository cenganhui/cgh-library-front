<template>
  <div>
    <el-card class="box-card" style="text-align: center">
      <h3>登录二维码</h3>
      <div>
        <img :src="qrCode.codeUrl" alt />
      </div>
      <h3>确认登录后点击开始绑定签到</h3>
      <el-button :loading="loading" type="primary" @click="showQRCodeLoginStatus()">开始绑定签到</el-button>
    </el-card>
  </div>
</template>

<script>
import { getQRCode, getQRCodeLoginStatus } from '@/api/tiebalogin.js'
export default {
  data() {
    return {
      qrCode: {
        codeUrl: '',
        gid: '',
        sign: '',
        time: '',
      },
      loading: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.showQRCode()
    },
    showQRCode() {
      getQRCode().then((res) => {
        if (res.code === '0000') {
          console.log(res.data)
          this.qrCode.codeUrl = res.data.codeUrl
          this.qrCode.gid = res.data.gid
          this.qrCode.sign = res.data.sign
          this.qrCode.time = res.data.time
        }
      })
    },
    showQRCodeLoginStatus() {
      this.loading = true
      const data = {
        sign: this.qrCode.sign,
        gid: this.qrCode.gid,
      }
      getQRCodeLoginStatus(data).then((res) => {
        if (res.code === '0000') {
          this.lib.notificationSuccess(this, '成功')
          // console.log(res.data)
          this.loading = false
        } else {
          this.lib.notificationWarning(this, res.msg || '失败，请重试')
        }
      })
      .catch(() => {
        this.lib.notificationWarning(this, '失败，请重试')
      })
    },
  },
}
</script>

<style>
</style>