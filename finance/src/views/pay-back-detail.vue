/*
 * @Author: xiangting
 * @Date: 2018-07-13 16:49:49
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-07-16 10:59:27
 */
<template>
  <div class="container">
    <van-nav-bar
      title="详情"
      left-text=""
      left-arrow
      @click-left="back"
    />
    <van-row>
        <van-col span="24" class="logo">
          <img src="@/assets/磐谷分期.png" alt="">
        </van-col>
        <van-col span="24" class="list">
          <div class="list-top van-hairline--bottom">
            <van-row>
              <van-col span="6" offset="1">期数</van-col>
              <van-col span="10">第{{billDetail.refundPeriods}}期</van-col>
            </van-row>
            <van-row>
              <van-col span="6" offset="1">租金金额</van-col>
               <van-col span="10">{{feeChange(billDetail.rentFee)}}</van-col>
            </van-row>
            <van-row>
              <van-col span="6" offset="1">利息</van-col>
               <van-col span="10">{{feeChange(billDetail.interest)}}</van-col>
            </van-row>
            <van-row>
              <van-col span="6" offset="1">计划还款时间</van-col>
               <van-col span="10">{{billDetail.repayDate}}</van-col>
            </van-row>
            <van-row>
              <van-col span="6" offset="1">状态</van-col>
               <van-col span="10" class="status" :class="{active: billDetail.refundStatus == '00'}">
                 {{billDetail.refundStatus == '80' ? '已还款' : '未还款'}}
              </van-col>
            </van-row>
            <van-row  v-if="payBackStatus === 1 || payBackStatus === 3">
              <van-col span="6" offset="1">逾期天数</van-col>
              <van-col span="10">{{billDetail.overdueDays}}</van-col>
            </van-row>
            <van-row  v-if="payBackStatus === 1 || payBackStatus === 3">
              <van-col span="6" offset="1">逾期金额</van-col>
              <van-col span="10">{{feeChange(billDetail.overdueFee)}}</van-col>
            </van-row>
            <!-- <van-row>
              <van-col span="6" offset="1">违约金</van-col>
              <van-col span="10">{{feeChange(billDetail.dedit)}}</van-col>
            </van-row> -->
            <van-row>
              <van-col span="6" offset="1">总还款金额</van-col>
              <van-col span="10">{{feeChange(billDetail.repayAmt)}}</van-col>
            </van-row>
            <van-row>
              <van-col span="6" offset="1">实际支付时间</van-col>
              <van-col span="10">{{billDetail.realRepayDate}}</van-col>
            </van-row>
          </div>
        </van-col>
    </van-row>
    <van-row class="footer" v-show="billDetail.refundStatus == '00'" @click.native="toPay()">
      <van-col span="24">确认并支付</van-col>
    </van-row>
    <van-loading color="black"   type="spinner" class="loading" v-show="!hasData"/>
  </div>
</template>

<script>
import {Button, NavBar, Row, Col} from 'vant'
import {getPayPlanDetail} from '@/api/planDetail'

export default {
  name: 'payBackDetail',
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col
  },
  data () {
    return {
      hasData: false,
      billDetail: {
        refundPeriods: '',
        rentFee: '',
        interest: '',
        repayTime: '',
        status: '',
        overdueDays: '',
        overdueFee: '',
        repayAmt: '',
        dedit: '',
        actualPayment: ''
      }
    }
  },
  computed: {
    payBackStatus () {
      if (this.billDetail.refundStatus === '80') { // 已还款
        return this.billDetail.overdueDays > 0 ? 1 : 2 // 1逾期，2正常
      }
      if (this.billDetail.refundStatus === '00') { // 未还款
        return this.billDetail.overdueDays > 0 ? 3 : 4 // 3逾期，4正常
      }
    }
  },
  methods: {
    toPay () {
      this.$router.push({name: 'pay', params: { externalOrderNo: this.billDetail.externalOrderNo, periods: this.billDetail.refundPeriods, fee: this.billDetail.repayAmt }})
    }
  },
  mounted () {
    let param = {
      externalOrderNo: this.$route.query.externalOrderNo,
      periods: this.$route.query.periods
    }
    getPayPlanDetail(param).then(res => {
      this.hasData = true
      this.billDetail = res.data
    })
  }
}
</script>

<style scoped>
.container{
  background: #f8f8f8;
}
.logo{
  background: #Fff;
  height: 79px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo img{
  width: 226px;
  height: 60px;
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
.active{
  color: rgba(229, 28, 35, 1);
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
.loading{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
</style>
