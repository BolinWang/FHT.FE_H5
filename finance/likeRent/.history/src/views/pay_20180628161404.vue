<template>
  <div class="container">
    <van-nav-bar
      title="选择支付方式"
      left-text=""
      left-arrow
      @click-left="back"
    />
    <van-row  class="list">
      <van-col span="24">
        需支付
      </van-col>
      <van-col span="24">
        ￥1100.00
      </van-col>
    </van-row>
    <van-row class="pay-way">
      <van-col span="3" class="list">
        <span>icon</span>
      </van-col>
      <van-col span="3" class="list">
        <span>支付宝</span>
      </van-col>
      <van-col span="5" offset="13">
        sure
      </van-col>
    </van-row>
    <van-row class="footer">
      <van-col span="24" class="pay-button">
        立即支付
      </van-col>
    </van-row>
    <!-- <status></status> -->
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
      key: 'value'
    }
  },
  methods: {
    back () {
      this.$router.back()
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
}
.van-row{
  border-bottom: 1px solid #f8f8f8;
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
