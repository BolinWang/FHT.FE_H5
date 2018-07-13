<template>
  <div class="container">
    <van-nav-bar
      title="详情"
      left-text=""
      left-arrow
      @click-left="back"
    />
    <van-row>
        <van-col span="24" class="list">
          <div class="list-top van-hairline--bottom">
            <van-row>
              <van-col span="6" offset="1">期数</van-col>
              <van-col span="10">第{{billDetail.nper}}期</van-col>
            </van-row>
            <van-row>
              <van-col span="6" offset="1">租金金额</van-col>
               <van-col span="10">{{fixed(billDetail.rentAmount)}}</van-col>
            </van-row>
            <van-row>
              <van-col span="6" offset="1">利息</van-col>
               <van-col span="10">{{fixed(billDetail.interest)}}</van-col>
            </van-row>
            <van-row>
              <van-col span="6" offset="1">计划还款时间</van-col>
               <van-col span="10">{{billDetail.repayTime}}</van-col>
            </van-row>
            <van-row>
              <van-col span="6" offset="1">状态</van-col>
               <van-col span="10">{{billDetail.status == 1 ? '已还款' : '未还款'}}</van-col>
            </van-row>
            <van-row>
              <van-col span="6" offset="1">逾期天数</van-col>
               <van-col span="10">{{billDetail.OverdueDays}}</van-col>
            </van-row>
            <van-row>
              <van-col span="6" offset="1">逾期费用</van-col>
               <van-col span="10">{{fixed(billDetail.overdueFee)}}</van-col>
            </van-row>
            <van-row>
              <van-col span="6" offset="1">总还款金额</van-col>
               <van-col span="10">{{fixed(billDetail.allRentAmount)}}</van-col>
            </van-row>
            <van-row>
              <van-col span="6" offset="1">实际支付时间</van-col>
              <van-col span="10">{{billDetail.actualPayment}}</van-col>
            </van-row>
          </div>
        </van-col>
    </van-row>
    <van-row class="footer">
      <van-col span="24">确认并支付</van-col>
    </van-row>
  </div>
</template>

<script>
import {Button, NavBar, Row, Col} from 'vant'
import {getPayPlanDetail} from '@/api/planDetail'

export default {
  name: 'payBackPlan',
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col
  },
  data () {
    return {
      billDetail: {
        nper: 1,
        rentAmount: 1000.00,
        interest: 0.00,
        repayTime: '2018/06/15',
        status: 1,
        OverdueDays: 5,
        overdueFee: 100,
        allRentAmount: 1100,
        actualPayment: '2018/07/12 13:30:30'
      }
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    fixed (value) {
      return value.toFixed(2)
    }
  },
  mounted () {
    let param = {
      externalOrderNo: 1323232,
      periods: 1
    }
    getPayPlanDetail()
  }
}
</script>

<style scoped>
.container{
  background: #f8f8f8;
}
.list{
 margin-top: 3Px;
 background: #fff;
}
.list-top{
  line-height: 40px;
  font-size: 14Px;
  height: 40px;
  box-sizing: border-box
}
.van-row{
  border-bottom: 1px solid #f8f8f8;
  text-align: left;
}
.van-col--10{
  float: right;
  text-align: right;
  padding-right: 15px;
}
.footer{
  position: absolute;
  bottom: 0;
  width: 375px;
  height: 40px;
  line-height: 40px;
  border-radius: 0px;
  background-color: rgba(255, 152, 0, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 16Px;
  text-align: center;
  font-family: PingFang SC;
}
</style>
