<template>
  <div class="container_sign">
    <section class="header">
      <div class="returnContract" @click="returnContract">
        <van-icon name="arrow-left" />
        <div class="title">查看合同</div>
      </div>
    </section>
    <div class="tips">{{msg}}</div>
    <canvas id="canvas_sign">{{supportMsg}}</canvas>
    <section class="canvas_tools">
      <div class="tools_clear" @click="clearDraw">
        <img class="tools_clear_img" src="../assets/clear.png" alt="" />
        <div class="tools_clear_title">清 除</div>
      </div>
    </section>
    <section class="footer fixed">
      <van-button size="large" class="btn_sign" @click="savePNG">提交签名</van-button>
    </section>
  </div>
</template>

<script>
import { Button, Icon, Dialog } from 'vant'
import Draw from '@/utils/draw'
import { contractApi } from '@/api/contract'
import { getUserData } from '@/utils/auth'
import Bridge from '@/utils/bridge'

export default {
  name: 'sign',
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    Draw
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
      msg: '请在下方区域手写签名，务必使用真实姓名',
      supportMsg: '您的设备暂不支持签名',
      signImage: '',
      params: {}
    }
  },
  created () {
    this.params = this.paramsData
    this.app_andriod = this.isAndriod
    this.app_ios = this.isIos
  },
  mounted () {
    this.$nextTick(() => {
      this.initCanvas()
    })
  },
  methods: {
    initCanvas () {
      const canvas = document.getElementById('canvas_sign')
      this.draw = new Draw(canvas)
    },
    clearDraw () {
      this.draw.clear()
    },
    savePNG () {
      this.signImage = this.draw.getPNGImage()
      if (!this.signImage) {
        this.$toast.fail('请手写签名后再提交')
        return false
      }
      contractApi.signContract({
        sealData: this.signImage,
        sessionId: getUserData().sessionId,
        contractNo: this.params.contractNo
      }).then(res => {
        Dialog.alert({
          message: '签名成功'
        }).then(() => {
          this.handleBridge()
        })
      })
    },
    returnContract () {
      this.$emit('handleReturnContract')
    },
    handleBridge () {
      let bridgeParam = {
        libCode: 5016
      }
      if (this.app_andriod === true) {
        window.SetupJsCommunication.jumpToNativePages(JSON.stringify(bridgeParam))
      } else if (this.app_ios === true) {
        Bridge.callHandler('jumpToNativePages', bridgeParam, function responseCallback (responseData) {
          window.location.href = window.location.href
        })
      } else {
        console.log('H5')
      }
    }
  }
}
</script>
<style scoped lang="scss">
.container_sign {
  position: fixed;
  top: 0;
  left: 0;
  width: 750px;
  height: 100%;
  z-index: 101;
  background: #FFF;
  font-size: 30px;
  .header {
    line-height: 90px;
    .title {
      display: inline-block;
    }
    .returnContract {
      padding: 0 20px;
      display: flex;
      align-items: center;
    }
  }
  .tips {
    color: #999;
    padding: 0 20px;
    line-height: 60px;
  }
  #canvas_sign {
    background: #fff;
    cursor: default;
    width: 750px;
    height: calc(100% - 240px);
  }
  .canvas_tools {
    .tools_clear{
      position: absolute;
      right: 0;
      bottom: 100px;
      z-index: 100;
      padding: 20px 40px 40px 20px;
    }
    .tools_clear_title{
      color:#999;
      font-size: 30px;
      text-align: center;
    }
    .tools_clear_img{
      height: 100px;
      text-align: center;
      width: 100px;
      position: relative;
      border-radius: 10px;
      border: 2px dashed #b0b2b7;
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
