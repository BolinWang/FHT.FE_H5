<template >
  <div class="container"  v-show="isToPay">
    <van-nav-bar
      title="支付"
      left-text=""
      left-arrow
      @click-left="back"
    />
    <van-row  class="list">
      <van-col span="24" class="pay-status"> 
        <img src="@/assets/支付成功.png" alt="">
      </van-col>
      <van-col span="24" style="font-size:18Px;">
        支付成功
      </van-col>
      <van-col span="24" style="font-size:14Px;">
        ￥1100.00
      </van-col>
    </van-row>
     <van-row  class="footer">
      <van-col span="24" class="confirm-button">
        确定
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {Button, NavBar, Row, Col} from 'vant'

export default {
  name: 'pay-status',
  props: {
    isToPay: {
      type: Boolean,
      default: false
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col
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
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.van-col--24{
  padding: 4px 0;
}
.pay-status{
  display: flex;
  justify-content: center;
  align-items: center;
}
.pay-status img{
  width: 60px;
  height: 60px;
}
.list{
  width: 375px;
  height: 180px;
  line-height: 20px;
  text-align: center;
  background: #fff;
}
.footer{
  margin: 80px auto;
width: 339px;
height: 40px;
border-radius: 4px;
background-color: rgba(255, 152, 0, 1);
color: rgba(255, 255, 255, 1);
font-size: 16px;
text-align: center;
font-family: PingFang SC;
border: 1px solid rgba(255, 255, 255, 0);

}
</style>
