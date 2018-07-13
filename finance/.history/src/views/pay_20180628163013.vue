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
        ￥1100.00
      </van-col>
    </van-row>
    <van-row class="pay-way">
      <van-col span="3" class="logo-zfb">
        <img src="@/assets/支付宝.png" alt="" srcset="">
      </van-col>
      <van-col span="3">
        <span>支付宝</span>
      </van-col>
      <van-col span="5" offset="13" class="choose">
        <img src="@/assets/未选择_22.png" alt="">
        <img src="@/assets/已选择_90.png" alt="">
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
import {Button, NavBar, Row, Col} from 'vant'
import status from '../components/pay-status'

export default {
  name: 'pay',
  components: {
    status,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col
  },
  data () {
    return {
      isToPay: false
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    toPay () {
      this.isToPay = true
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
