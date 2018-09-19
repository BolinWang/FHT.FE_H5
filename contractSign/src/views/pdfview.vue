<template>
  <div class="container">
    <section class="header">
      <van-nav-bar
        :title="title"
        :left-arrow="isApp"
        fixed
        :z-index="1000"
        @click-left="returnApp"
      />
    </section>
    <section v-if="images && images.length > 0" class="container_images">
      <van-swipe class="images_wrap" vertical :loop="false">
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img class="images_item" v-lazy="item" />
        </van-swipe-item>
      </van-swipe>
    </section>
    <section v-else id="pdfview_wrapper"></section>
    <section class="footer">
      <van-button v-if="canSign" size="large" class="btn_sign" @click="gotoSign">立即签约</van-button>
    </section>
  </div>
</template>
<script>
import { Button, Swipe, SwipeItem, NavBar } from 'vant'
import { deepClone } from '@/utils/index'
import PDFPlugin from '@/components/PDF'

export default {
  name: 'pdfview',
  components: {
    [Button.name]: Button,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NavBar.name]: NavBar
  },
  props: {
    isApp: {
      type: Boolean,
      default: false
    },
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
    },
    isAndriod: {
      type: Boolean,
      default: false
    },
    isIos: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      title: '租赁合同',
      params: {},
      contractDataInfo: {},
      contentUrl: '',
      canSign: false,
      images: []
    }
  },
  created () {
    this.params = this.paramsData
    this.contractDataInfo = deepClone(this.contractData)
    this.contentUrl = this.contractDataInfo.contentUrl
    this.canSign = this.contractDataInfo.status * 1 === 1
    this.app_andriod = this.isAndriod
    this.app_ios = this.isIos
  },
  mounted () {

  },
  methods: {
    handlePreview () {
      if (!this.contentUrl) {
        return false
      }
      if (this.contentUrl.indexOf('contract_image') > -1) {
        // 清除DOM中的pdf容器
        let pdfNode = document.getElementById('pdf_box')
        document.body.removeChild(pdfNode)
        this.images = this.contentUrl.split(',')
      } else {
        let contentUrl = (process.env.NODE_ENV !== 'development') ? this.contentUrl : (this.contentUrl.replace('https://fh-contract-test.oss-cn-hangzhou.aliyuncs.com', '/pdf'))
        let $vm = new PDFPlugin().$mount()
        document.getElementById('pdfview_wrapper').appendChild($vm.$el)
        $vm.showPDF(contentUrl)
        // vm.$showPDF('../../static/default.pdf')
      }
    },
    gotoSign () {
      this.$emit('handleSign')
    },
    returnApp () {
      if (!this.isApp) {
        return false
      }
      console.log('return App')
      this.$emit('handleReturn', {
        type: 'contract'
      })
    }
  },
  watch: {
    contractData: {
      immediate: true,
      handler (val = {}) {
        this.contractDataInfo = deepClone(val)
        this.contentUrl = val.contentUrl
        this.canSign = val.status * 1 === 1
        this.handlePreview()
      }
    },
    paramsData: {
      immediate: true,
      handler (val = {}) {
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
  top: 90px;
  left: 0;
  width: 750px;
  height: 100%;
  z-index: 200;
  background: #fff;
  .images_wrap {
    width: 100%;
    height: 100%;
    .images_item {
      width: 750px;
    }
  }
}
.header {
  color: #333;
  .van-nav-bar {
    width: 750px;
    height: 90px;
    line-height: 90px;
  }
}
.footer {
  position: absolute;
  bottom: 0;
  z-index: 999;
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
