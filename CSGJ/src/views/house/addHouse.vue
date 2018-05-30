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
  </div>
</template>

<script>
import { Tab, TabItem, XButton } from 'vux'
import houseInfo from './components/houseInfo'
import roomInfo from './components/roomInfo'

export default {
  components: {
    Tab, 
    TabItem,
    XButton,
    houseInfo,
    roomInfo
  },
  activated() {
    this.houseData.houseRentType = this.$route.params.houseType
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
