<template>
  <section class="container">
    <section class="download_wrap">
    </section>
    <div class="download_container">
      <div class="download_btnGroup">
        <div class="btn_download" @click="downloadLink"></div>
      </div>
    </div>
    <section class="download_footer">
    </section>
  </section>
</template>

<script>
let searchUrl = location.search
const config = {
  scheme_IOS: 'MyRoom://activity',
  scheme_And: 'myroom://'
}
export default {
  name: 'appdownload',
  data () {
    return {

    }
  },
  created () {
    // 非微信端唤醒APP
    if (navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1) {
      console.log('wechat')
    } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      window.location.href = config.scheme_IOS + searchUrl
    } else if (/(Android)/i.test(navigator.userAgent)) {
      window.location.href = config.scheme_And + searchUrl
    }
  },
  methods: {
    downloadLink () {
      window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.memorhome.home'
    }
  }
}
</script>

<style scoped>
.container,
.download_wrap {
  height: 100%;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
}
.container {
  display: flex;
  justify-content: center;
}
.download_wrap {
  position: absolute;
  z-index: 1;
  width: 750px;
  height: 1000px;
  background: url('../assets/bg_download.jpg') center center no-repeat;
  background-size: cover;
}
.download_footer {
  position: absolute;
  z-index: 2;
  width: 750px;
  height: 100px;
  bottom: 0;
  background: url('../assets/bg_download_footer.jpg') center center no-repeat;
  background-size: cover;
}
.download_container {
  position: absolute;
  z-index: 3;
  top: 1035px;
  width: 750px;
}
.download_btnGroup {
  display: flex;
  width: 750px;
  justify-content: center;
}
.btn_download {
  width: 353px;
  height: 91px;
  background: url('../assets/btn_download.png') center center no-repeat;
  background-size: cover;
}
</style>
