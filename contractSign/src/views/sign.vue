<template>
  <div class="container">
    <section class="header">
      <van-nav-bar
        :title="title"
        left-arrow
        fixed
        :z-index="1000"
        @click-left="returnContract"
      />
    </section>
    <section class="container_sign">
      <div class="tips">{{msg}}</div>
      <canvas id="canvas_sign">{{supportMsg}}</canvas>
      <section class="canvas_tools">
        <div class="tools_clear" @click="clearDraw">
          <img class="tools_clear_img" src="../assets/clear.png" alt="" />
          <div class="tools_clear_title">清 除</div>
        </div>
      </section>
    </section>
    <section class="footer">
      <van-button size="large" class="btn_sign" @click="savePNG">提交</van-button>
    </section>
  </div>
</template>

<script>
import { Button, Dialog, NavBar } from 'vant'
import Draw from '@/utils/draw'
import { contractApi } from '@/api/contract'
import { getUserData } from '@/utils/auth'

export default {
  name: 'sign',
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
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
      title: '签约',
      msg: '请在下方区域手写签名，务必使用真实姓名',
      supportMsg: '您的设备暂不支持签名',
      signImage: '',
      params: {},
      draw: ''
    }
  },
  created () {
    this.params = this.paramsData
    this.app_andriod = this.isAndriod
    this.app_ios = this.isIos
    if (this.app_andriod === true) {
      window.SetupJsCommunication.canBack(true)
      window.returnBack = () => {
        this.returnContract()
      }
    }
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
      this.signImage = ''
    },
    savePNG () {
      this.signImage = this.draw.getPNGImage()
      if (!this.draw.hasDrawed) {
        this.$toast.fail('请手写签名后再提交')
        return false
      }
      let toastId = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        mask: true,
        message: '加载中...'
      })
      contractApi.signContract({
        sealData: this.signImage,
        sessionId: getUserData().sessionId,
        contractNo: this.params.params.contractNo
      }, {
        interceptors: false,
        imei: this.params.imei,
        geographicPosition: this.params.geographicPosition,
        baseStation: this.params.baseStation,
        lac: this.params.lac
      }).then(res => {
        this.$toast.clear(toastId)
        if (this.app_andriod === true) {
          window.SetupJsCommunication.canBack(false)
        }
        let signParams = res.code * 1 === 0 ? {
          success: true,
          message: '签名成功'
        } : {
          success: false,
          message: res.message || '签名失败'
        }
        Dialog.alert({
          message: signParams.message
        }).then(() => {
          this.$emit('handleReturn', {
            type: 'sign',
            params: {
              success: signParams.success
            }
          })
        })
      })
    },
    returnContract () {
      this.$emit('handleReturnContract')
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  background: #fff;
  height: 100%;
}
.header {
  color: #333;
  .van-nav-bar {
    width: 750px;
    height: 90px;
    line-height: 90px;
  }
}
.container_sign {
  position: absolute;
  top: 90px;
  left: 0;
  bottom: 90px;
  width: 750px;
  z-index: 101;
  background: #FFF;
  font-size: 30px;
  .tips {
    color: #999;
    padding: 0 20px;
    line-height: 90px;
    border-bottom: 2px dashed #ccc;
  }
  #canvas_sign {
    background: #fff;
    cursor: default;
    width: 750px;
    height: calc(100% - 90px);
  }
  .canvas_tools {
    .tools_clear{
      position: absolute;
      right: 0;
      bottom: 30px;
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
      padding: 15px;
    }
  }
}

.footer {
  position: absolute;
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
