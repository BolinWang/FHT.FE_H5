<template>
  <div class="container">
    <van-nav-bar
      title="还款计划"
      left-text=""
      left-arrow
      @click-left="back"
    />
    <van-row>
      <van-col span="24" class="list" @click.native="toDetail(index, item)" v-for="(item, index) in planList" :key="index">
        <section class="align-left">
          <h2 class="period_title">第{{item.refundPeriods}}期</h2>
          <van-cell-group>
            <van-cell :value="feeChange(item.repayAmt)" icon="gold-coin" is-link>
              <template slot="title">
                <span class="van-cell-text">租金金额</span>
                <van-tag :type="item.refundStatus | filterTags">{{item.refundStatus === '00' ? '未还款' : '已还款'}}</van-tag>
              </template>
            </van-cell>
            <van-cell title="还款时间" :value="item.repayDate" icon="clock"></van-cell>
          </van-cell-group>
        </section>
        <div class="list-bottom"></div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {Button, NavBar, Row, Col, Toast, Cell, CellGroup, Icon, Tag} from 'vant'
import {getPayPlanList} from '@/api/source'
import {getQueryObject} from '@/utils/index'

export default {
  name: 'payBackPlan',
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Tag.name]: Tag
  },
  filters: {
    filterTags (type) {
      const tagsTypes = {
        '80': 'success',
        '00': 'danger'
      }
      return tagsTypes[type] || 'danger'
    }
  },
  data () {
    return {
      doNotPay: [],
      periods: 1,
      externalOrderNo: 3,
      planList: []
    }
  },
  methods: {
    toDetail (index, item) {
      if (item !== this.doNotPay[0] && item.refundStatus !== '80') {
        this.$toast({message: '抱歉！不支持跨期支付，请先支付上一期费用', duration: 1000})
        return
      }
      this.$router.push({
        name: 'detail',
        query: {
          externalOrderNo: this.externalOrderNo,
          periods: item.refundPeriods
        }
      })
    }
  },
  mounted () {
    let params = getQueryObject()
    let externalOrderNo = params.externalOrderNo
    this.externalOrderNo = externalOrderNo
    let cookieExternalOrderNo = window.localStorage.getItem('externalOrderNo')
    if (externalOrderNo) {
      window.localStorage.setItem('externalOrderNo', externalOrderNo)
    }
    getPayPlanList(externalOrderNo || cookieExternalOrderNo).then(res => {
      this.planList = res.data
      this.periods = res.data[0].refundPeriods
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
.align-left {
  text-align: left;
}
.period_title {
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  color: rgba(69,90,100,.6);
  background: #f8f8f8;
  padding: 8px 15px;
}
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
