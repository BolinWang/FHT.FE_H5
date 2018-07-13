<template>
  <div class="container">
    <van-nav-bar
      title="还款计划"
      left-text=""
      left-arrow
      @click-left="back"
    />
    <van-row>
      <router-link :to="{ name: 'detail', params: { externalOrderNo: externalOrderNo, periods: periods }}"  v-for="(item, index) in planList" :key="index" >
        <van-col span="24" class="list">
          <div class="list-top van-hairline--bottom">
            <van-row>
              <van-col span="4">第{{item.refundPeriods}}期</van-col>
              <van-col span="8">租金金额 {{feeChange(item.repayAmt)}}</van-col>
              <van-col span="3"  offset="8" class="status" :class="{active: payStatus == 1}">
                {{item.refundStatus == '00' ? '未还款' : '已还款'}}
              </van-col>
            </van-row>
          </div>
          <div class="list-top">
            <van-row>
              <van-col span="10" class="time">还款时间 {{item.repayDate}}</van-col>
              <van-col span="1"  offset="12">></van-col>
            </van-row>
          </div>
          <div class="list-bottom"></div>
        </van-col>
      </router-link>
    </van-row>
  </div>
</template>

<script>
import {Button, NavBar, Row, Col} from 'vant'
import {getPayPlanList} from '@/api/source'
import {getQueryObject} from '@/utils/index'

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
      payStatus: 1,
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
  },
  mounted () {
    let params = getQueryObject()
    let externalOrderNo = params.externalOrderNo
    this.externalOrderNo = externalOrderNo
    getPayPlanList(externalOrderNo).then(res => {
      this.planList = res.result.data
      this.periods = res.result.data.refundPeriods
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
