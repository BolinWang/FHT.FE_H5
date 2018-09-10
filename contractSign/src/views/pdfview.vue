<template>
  <div class="container">
    <section v-if="images && images.length > 0" class="container_images">
      <van-swipe class="images_wrap" vertical>
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img class="images_item" v-lazy="item" />
        </van-swipe-item>
      </van-swipe>
    </section>
    <section class="footer fixed">
      <van-button v-if="contractDataInfo.status * 1 === 1" size="large" class="btn_sign" @click="gotoSign">立即签约</van-button>
    </section>
  </div>
</template>
<script>
import { Button, Swipe, SwipeItem } from 'vant'
import { deepClone } from '@/utils/index'
export default {
  name: 'pdfview',
  components: {
    [Button.name]: Button,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  props: {
    paramsData: {
      type: Object,
      default () {
        return {
          params: {}
        }
      }
    },
    contractData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      params: {},
      contractDataInfo: {},
      contentUrl: '',
      images: []
    }
  },
  created () {
    this.params = this.paramsData
    this.contractDataInfo = deepClone(this.contractData)
    this.contentUrl = this.contractDataInfo.contentUrl
  },
  mounted () {
    this.handlePreview()
  },
  methods: {
    handlePreview () {
      if (!this.contentUrl) {
        return false
      }
      if (this.contentUrl.indexOf('contract_image') > -1) {
        let pdfNode = document.getElementById('pdf_box')
        document.body.removeChild(pdfNode)
        this.images = this.contentUrl.split(',')
      } else {
        // this.$showPDF('../../static/default.pdf')
        // this.$showPDF('/pdf/20170613170959235529')
        // let contentUrl = this.contentUrl.replace('https://fh-contract-test.oss-cn-hangzhou.aliyuncs.com', '/pdf')
        this.$showPDF(this.contentUrl)
      }
    },
    gotoSign () {
      this.$emit('handleSign', this.params)
    }
  },
  watch: {
    contractData: {
      immediate: true,
      handler: function (val = {}) {
        this.contractDataInfo = deepClone(val)
        this.contentUrl = val.contentUrl
        this.handlePreview()
      }
    },
    paramsData: {
      immediate: true,
      handler: function (val = {}) {
        this.params = deepClone(val)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
}
.container_images {
  position: fixed;
  width: 750px;
  height: 100%;
  z-index: 9999999;
  background: #fff;
  .images_wrap {
    width: 100%;
    height: 100%;
    .images_item {
      width: 750px;
    }
  }
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
