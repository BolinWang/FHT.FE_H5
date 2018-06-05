<template>
  <div>
    <group :label-width="labelWidth" class="noTop">
      <cell title="房源地址" is-link value-align="left" @click.native="chooseMap">
        <div v-if="!houseData.subdistrictInfo.provinceId">请选择</div>
        <div v-else class="black">
          <div>{{houseData.subdistrictInfo | areaStr}}</div>
          <div>{{houseData.subdistrictInfo | addressStr}}</div>
        </div>
      </cell>
      <cell title="板块" is-link value-align="left" @click.native="zoneShow = true">
        <cell-value :data="zoneList"></cell-value>
      </cell>
      <x-input title="楼幢名称" v-model="houseData.buildingName" placeholder="请输入"></x-input>
      <flexbox class="houseItem" wrap="wrap" :gutter="0">
        <flexbox-item :span="1/2">
          <x-input :label-width="labelWidth" v-model="houseData.unitCode" title="单元" placeholder="非必输"></x-input>
        </flexbox-item>
        <flexbox-item :span="1/2">
          <x-input :label-width="labelWidth" v-model="houseData.houseNo" title="房间号" placeholder="请输入"></x-input>
        </flexbox-item>
        <flexbox-item :span="1/2">
          <x-input :label-width="labelWidth" v-model="houseData.floorName" title="所在楼层" type="number" placeholder="请输入"></x-input>
        </flexbox-item>
        <flexbox-item :span="1/2">
          <x-input :label-width="labelWidth" v-model="houseData.floorAmount" title="楼层总数" type="number" placeholder="请输入"></x-input>
        </flexbox-item>
        <flexbox-item :span="1/2">
          <popup-picker class="cellHeight labelWidth" title="户型" 
            :data="unitList" 
            :show="unitShow"
            placeholder="请选择"
            value-text-align="left"
            :display-format="format"
            v-model="unitValue" >
          </popup-picker>
        </flexbox-item>
        <flexbox-item :span="1/2">
          <x-input :label-width="labelWidth" title="面积(㎡)" type="number" placeholder="请输入" v-model="houseData.houseArea"></x-input>
        </flexbox-item>
        <flexbox-item :span="1/2">
          <cell title="房屋朝向" class="cellHeight labelWidth" is-link @click.native="orientationsShow = true" value-align="left">
            <cell-value :value="houseData.houseDirection" :data="orientationsList"></cell-value>
          </cell>
        </flexbox-item>
        <flexbox-item :span="1/2">
          <cell title="装修程度" class="cellHeight labelWidth" is-link value-align="left" @click.native="decorationShow = true">
            <cell-value :value="houseData.decorationDegree" :data="decorationList"></cell-value>
          </cell>
        </flexbox-item>
      </flexbox>
      <cell :title="houseData.houseRentType === '1' ? '房间设施' : '公区设施'" is-link value-align="left" @click.native="houseFacilitiesShow = true">
        <cell-value :value="houseData.facilityItems" :data="houseFacilitiesList"></cell-value>
      </cell>
      <cell title="所属房东" is-link class="black" value-align="left" @click.native="showLandlord = true">{{landlordName}}</cell>
    </group>
    <!-- 所属板块 -->
    <!-- <popup-self :data="zoneList" title="请选择板块" 
      :show="zoneShow"
      @closePop="closePop('zoneShow')">
    </popup-self> -->
    <!-- 房间朝向 -->
    <popup-self :data="orientationsList" title="房间朝向"
      :show="orientationsShow"
      v-model="houseData.houseDirection"
      @closePop="closePop('orientationsShow')">
    </popup-self>
    <!-- 装修程度 -->
    <popup-self :data="decorationList" title="装修程度"
      :show="decorationShow"
      v-model="houseData.decorationDegree" 
      @closePop="closePop('decorationShow')">
    </popup-self>
    <!-- 房间设施 -->
    <popup-self :data="houseFacilitiesList" title="房间设施（多选）"
      :show="houseFacilitiesShow"
      v-model="houseData.facilityItems" 
      :isradio="false"
      @closePop="closePop('houseFacilitiesShow')">
    </popup-self>
    <!-- 房东列表 -->
    <div v-transfer-dom>
      <popup v-model="showLandlord" position="right" width="100%" height="100%" >
        <x-header 
          title="房东列表" 
          :left-options="{preventGoBack: true}"
          @on-click-back="showLandlord = false" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        </x-header>
        <div style="padding-top: 46px">
          <search :auto-fixed="false" placeholder="姓名/手机号码"></search>
          <ul class="landlordNav">
            <li v-for="(item, index) in resultList" :key="index" @click="clickLi(index)">
              <div class="half">{{item.name}}（{{item.area}}）</div>
              <div class="half">{{item.mobile | mobileStr}}</div>
            </li>
          </ul>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { XInput, Flexbox, FlexboxItem, PopupPicker, Popup, Search, TransferDom } from 'vux'
import cellValue from '@/components/cellValue'
import popupSelf from '@/components/popupSelf'
import { plusXing } from '@/utils'
import { getAreaName } from '@/utils/areaName'
export default {
  directives: {
    TransferDom
  },
  components: {
    XInput,
    Flexbox, 
    FlexboxItem,
    PopupPicker,
    cellValue,
    popupSelf,
    Popup,
    Search
  },
  props: {
    houseData: {
      default: {}
    }
  },
  filters: {
    mobileStr(val) {
      return val ? plusXing(val, 3, 4) : ''
    },
    areaStr(val){
      return getAreaName(val.provinceId, val.cityId, val.addrRegionId)
    },
    addressStr(val) {
      return val.subdistrictAddress ? `${val.subdistrictName}-${val.subdistrictAddress}` : ''
    }
  },
  mounted() {
    this.orientationsList = this.$store.state.datas.orientations
    this.decorationList = this.$store.state.datas.decoration
    this.houseFacilitiesList = this.$store.state.datas.houseFacilities
    this.getUnit()
    this.dataFormat()
  },
  data() {
    return {
      labelWidth: '70px',
      zoneShow: false,
      zoneList: [
        { label: '古荡', value: 1 },
        { label: '文一路', value: 2},
        { label: '黄龙', value: 3 },
      ],
      zoneValue: [],
      orientationsShow: false,
      orientationsList: [],
      orientationsValue: [],
      decorationShow:false,
      decorationList: [],
      decorationValue: '',
      houseFacilitiesShow: false,
      houseFacilitiesList: [],
      houseFacilitiesValue: [],
      unitShow: false,
      unitList: [],
      unitValue: [],
      showLandlord: false,
      landlordName: '',
      resultList: [
        { name: '张三', mobile: 18912344321, area: '浦东', orgOwnId: 1 },
        { name: '李四', mobile: 18912353344, area: '松江', orgOwnId: 2 },
      ]
    }
  },
  methods: {
    dataFormat() { //数据处理 保证下拉弹框可以正常显示
      if (this.houseData.chamberCount && this.houseData.boardCount && this.houseData.toiletCount) {
        this.unitValue = [String(this.houseData.chamberCount), String(this.houseData.boardCount), String(this.houseData.toiletCount)]
      }
     
    },
    closePop(str) {
      this[str] = false
    },
    getUnit() {
      function valueName(str){
        let arr = []
        for (let i = 1; i <= 10; i++) {
          arr.push({value: i, name: i + str})
        }
        return arr
      }
      valueName('室')
      this.unitList = [valueName('室'), valueName('厅'), valueName('卫')]
    },
    format(value, name) {
      return `${value[0]}室${value[1]}厅${value[2]}卫`
    },
    clickLi(index) {
      this.showLandlord = false
      this.landlordName = this.resultList[index].name
      this.houseData.orgOwnId = this.resultList[index].orgOwnId
    },
    chooseMap(){
      this.$router.push({name: 'searchMap'})
    }
  },
  watch: {
    'unitValue'(val) {
      if(val && val.length > 0) {
        this.houseData.chamberCount = val[0]
        this.houseData.boardCount = val[1]
        this.houseData.toiletCount = val[2]
      }
    },
    'houseData.subdistrictInfo'(val) {
      this.houseData.subdistrictInfo = val
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" >
  .houseItem {
    position: relative;
    .vux-flexbox-item {
      border-top: 1px solid #ddd;
    }
    .vux-flexbox-item:nth-child(odd) {
      border-right: 1px solid #ddd;
    }
    .cellHeight {
      height: 41PX;
    }
  }
  .labelWidth {
    .vux-label {
      width: 70px;
    }
    .weui-label {
      width: 70px !important;
    }
  }
  .landlordNav {
    li {
      width: 100%;
      height: 45px;
      line-height: 45px;
      background-color: #fff;
      float: left;
      margin-bottom: 2px;
      padding: 0 10px;
      .half {
        width: 50%;
        height: 100%;
        float: left;
      }
    }
  }
</style>
