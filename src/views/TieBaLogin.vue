<template>
  <div>
    <el-button type="primary" @click="showQRCode()">二维码</el-button>
    <el-button type="primary" @click="showQRCodeLoginStatus()">状态</el-button>
    <div>
      <img :src="qrCode.codeUrl" alt />
    </div>
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
    }
  },
  methods: {
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
      const data = {
        sign: this.qrCode.sign,
        gid: this.qrCode.gid,
      }
      getQRCodeLoginStatus(data).then((res) => {
        if (res.code === '0000') {
          console.log(res.data)
        }
      })
    },
  },
}
</script>

<style>
</style>