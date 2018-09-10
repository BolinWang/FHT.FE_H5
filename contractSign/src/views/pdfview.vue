<template>
  <div class="container">
    <section class="footer fixed">
      <van-button size="large" class="btn_sign" @click="gotoSign">立即签约</van-button>
    </section>
  </div>
</template>
<script>
import { Button } from 'vant'
export default {
  name: 'pdfview',
  data () {
    return {}
  },
  components: {
    [Button.name]: Button
  },
  mounted () {
    // this.$showPDF('../../static/default.pdf')
    this.$showPDF('/pdf/20170613170959235529')
  },
  methods: {
    gotoSign () {

    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
}
.footer {
  position: fixed;
  bottom: 0;
  z-index: 100;
  width: 750px;
  .btn_sign {
    /* autoprefixer: off */
    background-image: -webkit-linear-gradient(top ,#ffc835, #fdab29);
    /* autoprefixer: on */
    border: 0 none;
    border-radius: 0;
    font-size: 28px;
    color: #fff;
    height: 90px;
    line-height: 90px;
  }
}
</style>
