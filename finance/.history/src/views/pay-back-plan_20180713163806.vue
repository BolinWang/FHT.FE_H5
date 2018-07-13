<template>
  <div class="container">
    <van-nav-bar
      title="还款计划"
      left-text=""
      left-arrow
      @click-left="back"
    />
    <van-row>
        <van-col span="24" class="list" @click.native="toDetail(index, item)"   v-for="(item, index) in planList" :key="index">
          <div class="list-top van-hairline--bottom">
            <van-row>
              <van-col span="4">第{{item.refundPeriods}}期</van-col>
              <van-col span="10">租金金额 {{feeChange(item.repayAmt)}}</van-col>
              <van-col span="6"  offset="5" class="status" :class="{active: item.refundStatus === '00'}">
                {{item.refundStatus === '00' ? '未还款' : '已还款'}}
              </van-col>
            </van-row>
          </div>
          <div class="list-top">
            <van-row>
              <van-col span="10" class="time">还款时间 {{item.repayDate}}</van-col>
              <van-col span="1"  offset="11">></van-col>
            </van-row>
          </div>
          <div class="list-bottom"></div>
        </van-col>
    </van-row>
  </div>
</template>

<script>
import {Button, NavBar, Row, Col, Toast} from 'vant'
import {getPayPlanList} from '@/api/source'
import {getQueryObject} from '@/utils/index'

export default {
  name: 'payBackPlan',
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]: Toast
  },
  data () {
    return {
      doNotPay: [],
      periods: 1,
      externalOrderNo: 3,
      planList: [{
        refundPeriods: 2,
        refundStatus: '80',
        repayAmt: '20.15',
        repayDate: '2016-09-25'
      }, {
        refundPeriods: 3,
        refundStatus: '00',
        repayAmt: '20.15',
        repayDate: '2016-10-25'
      }]
    }
  },
  methods: {
    toDetail (index, item) {
      if (item !== this.doNotPay[0]) {
        this.$toast({message: '抱歉！不支持跨期支付，请先支付上一期费用', duration: 1000})
        return
      }
      this.$router.push({name: 'detail', query: { externalOrderNo: this.externalOrderNo, periods: this.periods }})
    }
  },
  mounted () {
    let params = getQueryObject()
    let externalOrderNo = params.externalOrderNo
    this.externalOrderNo = externalOrderNo
    getPayPlanList(externalOrderNo).then(res => {
      this.planList = res.data
      this.periods = res.data[0].refundPeriods
      console.log(res.data)
      res.data.forEach(el => {
        if (el.refundStatus === '00') {
          this.doNotPay.push(el)
        }
      })
    })
  }
}
</script>

<style scoped>
.container{
  background: #f8f8f8;
}
.list{
  padding-left: 15px;
 margin-top: 3Px;
 background: #fff;
}
.list-top{
  line-height: 40px;
  font-size: 14Px;
  height: 40px;
  padding-left: 10px;
  box-sizing: border-box;
color: rgba(153, 153, 153, 1);
font-family: -apple-system;
  text-align: left;

}
.status{
  width: 50px;
  height: 24px;
  line-height: 24px;
  border-radius: 4px;
  background-color: rgba(200, 200, 200, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 12Px;
  text-align: center;
  font-family: PingFang SC;
  margin-top: 10px;
}
.status{
  font-size: 12Px;
}
.active{
  background-color: rgba(229, 28, 35, 1);
  color: rgba(255, 255, 255, 1);
}
</style>
