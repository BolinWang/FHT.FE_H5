<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header slot="header" :left-options="{preventGoBack: true}"
      @on-click-back="goBack" title="添加房源" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
      <house-info :houseData="houseData"></house-info>
      <room-info :houseData="houseData" v-if="houseData.houseRentType === '2'"></room-info>
      <div slot="bottom" class="bottomDiv">
        <x-button  type="primary" action-type="button" @click.native="saveData">确定</x-button>
      </div>
    </view-box>
    <popup v-model="successShow" width="100%" height="100%">
      <popup-header title="添加成功" class="successHead"></popup-header>
      <msg title="房源录入成功">
        <template slot="description">
          立即完善<span style="color:#ff7100">交租方式、房源照片</span><br>
          并发布到流量渠道可以第一时间出房哦！
        </template>
        <template slot="buttons">
          <x-button type="primary">立即完善</x-button>
          <x-button type="primary">继续录入</x-button>
          <x-button type="default">返回</x-button>
        </template>
      </msg>
      
    </popup>
  </div>
</template>

<script>
import { Tab, TabItem, XButton, Popup, Msg, PopupHeader } from 'vux'
import houseInfo from './components/houseInfo'
import roomInfo from './components/roomInfo'

export default {
  components: {
    Tab, 
    TabItem,
    XButton,
    houseInfo,
    roomInfo,
    Popup,
    Msg,
    PopupHeader
  },
  activated() {
    this.houseData.houseRentType = this.$route.params.houseType
    this.houseData.subdistrictInfo = this.$store.state.datas.mapSearchData
  },
  mounted() {
    window['backUrl'] = () => {
      this.goBack()
      return 'true'
    }
  },
  data() {
    return {
      houseType: 1,
      successShow: false,
      houseData: {
        buildingName: '',
        unitCode: '',
        floorName: '',
        houseNo: '',
        floorAmount: '',
        chamberCount: '',
        boardCount: '',
        toiletCount: '',
        houseArea: '',
        houseDirection: '',
        decorationDegree: '',
        facilityItems: '',
        houseRentType: '',
        orgOwnId: '',
        subdistrictInfo: {
          provinceId: '',
          cityId: '',
          addrRegionId: '',
          subdistrictName: '',
          subdistrictAddress: '',
          zoneId: '',
          longitude: '',
          latitude: ''
        },
        rooms: [{
          roomNo: '房间A',
          roomArea: '',
          room_attributes: '',
          facility_items: '',
          houseDirection: ''
        }]
      }
    }
  },
  methods: {
    saveData() {
      console.log(this.houseData)
    },
    goBack() {
      this.$router.push({name: 'houseIndex'})
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  
</style>
