<template>
  <div class="container">
    <van-nav-bar
      title="选择支付方式"
      left-text=""
      left-arrow
      @click-left="back"
    />
    <van-col span="24" class="logo">
      <img src="@/assets/磐谷分期.png" alt="">
    </van-col>
    <van-row  class="list">
      <van-col span="24">
        需支付
      </van-col>
      <van-col span="24" class="fee">
        ￥{{$route.params.fee}}
      </van-col>
    </van-row>
    <van-row class="pay-way">
      <van-col span="3" class="logo-zfb">
        <img src="@/assets/支付宝.png" alt="" srcset="">
      </van-col>
      <van-col span="3">
        <span>支付宝</span>
      </van-col>
      <van-col span="5" offset="13" class="choose" @click.native="choosePayWay">
        <img src="@/assets/未选择_22.png" alt="" v-if="!hasChoose">
        <img src="@/assets/已选择_90.png" alt="" v-else>
      </van-col>
    </van-row>
    <van-row class="footer" @click.native="toPay">
      <van-col span="24" class="pay-button">
        立即支付
      </van-col>
    </van-row>
    <status :isToPay="isToPay"></status>
  </div>
</template>

<script>
import {Button, NavBar, Row, Col, Toast} from 'vant'
import status from '../components/pay-status'
import {pay} from '@/api/pay'

export default {
  name: 'pay',
  components: {
    status,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]: Toast
  },
  data () {
    return {
      isToPay: false,
      hasChoose: true
    }
  },
  watch: {
    '$route': 'getParams'
  },
  mounted () {
    console.log(this.$route.params)
  },
  methods: {
    toPay () {
      let url = 'https://openapi.alipay.com/gateway.do?'
      url += 'charset=utf-8&biz_content=%7B%22body%22%3A%222%E6%9C%9F%E6%88%BF%E7%A7%9F%E7%A7%9F%E9%87%91payOrgId%3A1orgActualPayeeId215%22%2C%22orgActualPayeeId%22%3A215%2C%22orgId%22%3A1%2C%22out_trade_no%22%3A%22B20171211110001873777_001%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%222%E6%9C%9F%E6%88%BF%E7%A7%9F%E7%A7%9F%E9%87%91%22%2C%22timeout_express%22%3A%225m%22%2C%22total_amount%22%3A%220.00%22%7D&method=alipay.trade.app.pay&format=JSON&notify_url=http%3A%2F%2Fdev.memorhome.com%2Fmyhome%2Fpayment%2Falipay%2FappNotify.htm&app_id=2017052707361803&sign_type=RSA2&version=1.0&timestamp=2018-07-04+11%3A44%3A35&sign=bdWzF7pHr2PXbxPChFCfohopUjed195GOlfr%2BwHdqq1T0cA%2FXloWPYrhsrlSBnBJsp6JAAPshGCgbF1LekX5hBSckA7YUUkM1J2Xn6rYn3xfNRVMTAyotaFMzCeMxdaGx74ichXF%2FyhzcbMfXcG4%2Fc3m1t%2FsV12QO9ULWULdoS4f4FB6Y42lpDyY4IzY04cY0DMl%2BSYH1S84AJ9Im12kc%2B%2FHloNmiEjFpy%2F4%2FTcHjXTlQUW6Ej5HsQjkR4rIq%2BEqkZezstWzKYjXj5B5Ogy5IEHlyNILq98WHsp8rBjCKofqQC9NR8tC89eAxJ6%2B9UbEH%2BeaEE3NbU96bB6%2FrpyMDg%3D%3D'
      window.location.href = url
      // if (!this.hasChoose) {
      //   this.$toast('请选择支付方式')
      //   return false
      // }
      // this.isToPay = true
      // let param = {
      //   externalOrderNo: this.$route.params.externalOrderNo,
      //   periods: this.$route.params.externalOrderNo
      // }
      // pay(param).then(res => {
      //   let sign_type = res.result.data
      //   window.location.href = 'https://openapi.alipay.com/gateway.do?'
      // })
    },
    choosePayWay () {
      this.hasChoose = !this.hasChoose
    }
  }
}
</script>

<style scoped>
.container{
  background: #f8f8f8;
  height: 100vh;;
}
.list{
  margin-top: 3Px;
  background: #fff;
  padding-bottom: 22px;
  font-size: 14Px;
  line-height: 20px;
  color: rgba(153, 153, 153, 1);
}
.list .fee{
  margin-top: 15px;
  color: rgba(229, 28, 35, 1);
  font-size: 18px;
  font-family: -apple-system;
}
.logo-zfb {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;;
}
.logo-zfb img{
  width: 32px;
  height: 32px;;
  display: block;
}
.logo{
  background: #Fff;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo img{
  width: 121px;
  height: 32px;
}
.van-row{
  border-bottom: 1px solid #f8f8f8;
}
.choose{
  height: 100%;
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
}
.choose img{
  width: 24px;
  height: 24px;
}
.pay-way{
  font-size: 14px;
  background: #fff;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin-top: 10px;
}
.footer{
  position: absolute;
  bottom: 0;
  left: 0px;
}
.pay-button{
  width: 100vw;
 text-align: center;
  height: 40px;
  line-height: 40px;
  border-radius: 0px;
  background-color: rgba(255, 152, 0, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  text-align: center;
  font-family: -apple-system;
}
</style>
