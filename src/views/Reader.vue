<template>
  <div style="height: 100%">
    <iframe
      ref="abc"
      v-if="pdfSrc != ''"
      :src="'/pdf/web/viewer.html?file=' + pdfSrc + '#page=' + initPage"
      width="100%"
      frameborder="0"
      class="my-iframe"
      name="iframeRef"
    ></iframe>
  </div>
</template>

<script>
import { updateBook, persistById } from '@/api/book.js'
export default {
  data() {
    return {
      pdfSrc: '',
      bookId: '',
      initPage: '',
    }
  },
  mounted() {
    this.bookId = this.$route.params.id
    this.initPage = this.$route.params.initPage
    this.pdfSrc = this.$route.params.url
    this.timer = setInterval(this.check, 10 * 1000)
  },
  methods: {
    check() {
      console.log('bookId:' + this.bookId)
      console.log('initPage:' + this.initPage)
      const page = window.frames['iframeRef'].document.getElementById(
        'pageNumber'
      ).value
      const total = window.frames['iframeRef'].document.getElementById(
        'pageNumber'
      ).max
      console.log('currentPage:' + page)
      console.log('totalPage:' + total)
      const data = {
        id: this.bookId,
        currentPage: page,
        totalPage: total,
      }
      updateBook(data).then((res) => {
        if (res.code === '0000') {
          console.log('update success')
        }
      })
    },
  },
  beforeDestroy() {
    persistById(this.bookId).then((res) => {
      if (res.code === '0000') {
        console.log('persist success')
      }
    })
    clearInterval(this.timer)
  },
}
</script>

<style>
.my-iframe {
  width: calc(100% - 10px);
  height: 100%;
}
</style>