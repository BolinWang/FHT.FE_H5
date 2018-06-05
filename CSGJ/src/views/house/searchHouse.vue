/*
 * @Author: chenxing 
 * @Date: 2018-06-05 10:36:28 
 * @Last Modified by:   chenxing 
 * @Last Modified time: 2018-06-05 10:36:28 
 */

<template>
  <div style="height:100%;background:#fff">
    <div class="searchPop" :class="{bgcolor: tabIndex === 1}">
      <div class="popTop">
        <ul class="tab">
          <li :class="{active: tabIndex === 0}" @click="tabIndex = 0">快速搜索</li>
          <li :class="{active: tabIndex === 1}" @click="tabIndex = 1">精准匹配</li>
        </ul>
        <div class="cancel" @click="cancelSearch">取消</div>
      </div>
      <div class="popSearch" v-show="tabIndex === 0">
        <search :auto-fixed="false" 
          cancel-text=" "
          v-model="keyword"
          @on-change="keywordSearch"
          placeholder="小区名/房间号/房东">
        </search>
        <div>
          <house-list :data="searchData" @searchStatus="searchStatus"></house-list>
        </div> 
      </div>
      <div class="searchGroup" v-show="tabIndex === 1">
        <div class="line">
          <div class="labelTitle">所属板块</div>
          <div class="cellRight hasIcon" @click="zoneShow = true">
            <cell-value :value="zoneValue" :data="zoneList"></cell-value>
          </div>
        </div>
        <div class="line">
          <div class="labelTitle">小区名称</div>
          <input type="text" v-model="searchParam.keyword" class="cellRight isInput" placeholder="请输入">
        </div>
        <div class="line" >
          <div class="labelTitle">房间户型</div>
          <div class="cellRight hasIcon" @click="unitShow = true">
            <cell-value :value="unitValue" :data="unitList"></cell-value>
          </div>
        </div>
        <div class="line">
          <div class="labelTitle">房间朝向</div>
          <div class="cellRight hasIcon" @click="orientationsShow = true">
            <cell-value :value="orientationsValue" :data="orientationsList" ></cell-value>
          </div>
        </div>
        <div class="line" @click="rentChange">
          <div class="labelTitle">月租金</div>
          <div class="cellRight hasIcon black">{{searchParam | priceStr}}</div>
        </div>
        <div class="line" @click="typeShow = true">
          <div class="labelTitle">整租/合租</div>
          <div class="cellRight hasIcon">
            <cell-value :value="typeValue" :data="typeList"></cell-value>
          </div>
        </div>
        <div class="line">
          <ul class="checkNav">
            <li 
              :class="{'checked': item.checked}"
              v-for="(item, index) in checkList"
              @click="item.checked = !item.checked"
              v-show="searchParam.houseRentType === '2' || index === 4"
              :key="index">
              {{item.label}}
            </li>
            <div class="clearfix"></div>
          </ul>
        </div>
        <div class="buttonDiv">
          <div class="btn" @click="searchFn">确定</div>
        </div>
      </div>
    </div>
    <!-- 选择房源类型 -->
    <popup-picker title="房源类型" style="display:none"
      :show="typeShow"
      :data="typeList"
      @on-hide="typeShow = false"
      v-model="typeValue" 
      @on-change="changeType"
    ></popup-picker>
    <!-- 选择月租金 -->
    <div v-transfer-dom>
      <alert v-model="rentShow"
        title="月租金范围"
        >
        <div class="alertBox">
          <input class="alertInput" type="number" v-model="searchParam.minPrice" placeholder="最低价" >
          <span class="alertSpan">——</span>
          <input class="alertInput" type="number" v-model="searchParam.maxPrice" placeholder="最高价">
          <div class="clearfix"></div>
        </div>
      </alert>
    </div>
    <!-- 所属板块 -->
    <popup-self :data="zoneList" title="请选择板块" 
      :show="zoneShow" 
      v-model="zoneValue" 
      @closePop="closePop('zoneShow')">
    </popup-self>
    <!-- 房间户型 -->
    <popup-self :data="unitList" title="请选择户型" 
      :show="unitShow" 
      v-model="unitValue" 
      @closePop="closePop('unitShow')">
    </popup-self>
    <!-- 房间朝向 -->
    <popup-self :data="orientationsList" title="房间朝向（可多选）"
      :show="orientationsShow" 
      :isradio="false"
      v-model="orientationsValue" 
      @closePop="closePop('orientationsShow')">
    </popup-self>
    <!-- 精准匹配搜索结果 -->
    <div v-transfer-dom>
      <popup v-model="showResult" position="right" width="100%" height="100%" style="background: #fff">
        <x-header 
          title="搜索结果" 
          :left-options="{preventGoBack: true}"
          @on-click-back="hideResult" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
          <span slot="right" @click="hideResult">取消</span>
        </x-header>
        <div style="padding-top: 46px">
          <div class="resultNum">符合条件匹配共 <span class="red">{{resultList.length}}</span> 间</div>
          <house-list :data="resultList" :showTab="false" @searchMore="searchMore"></house-list>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Popup, TransferDom, Search, debounce, XButton, PopupPicker, Alert } from 'vux'
import scroll from '@/components/scroll'
import { houseApi } from '@/api/source'
import { deepClone } from '@/utils'
import houseList from './components/houseList'
import popupSelf from '@/components/popupSelf'
import cellValue from '@/components/cellValue'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, 
    TabItem,
    scroll,
    PopupPicker,
    Popup,
    Search,
    houseList,
    XButton,
    Alert,
    popupSelf,
    cellValue
  },
  filters: {
    houseTypeStr(val) {
      return val === '1' ? '整租' : '合租'
    },
    priceStr(val) {
      let str = '不限制'
      if (val.maxPrice && val.minPrice) {
        str = `${val.minPrice}元 - ${val.maxPrice}元`
      } else if (val.minPrice) {
        str = `${val.minPrice}元以下`
      } else if (val.maxPrice) {
        str = `${val.maxPrice}元以上`
      }
      return str
    }
  },
  created() {
    let defalutOrient = this.$store.state.datas.orientations
    let addOrient = [{ label: '不限制', value: 0 }]
    this.orientationsList = addOrient.concat(defalutOrient)
  },
  data() {
    return {
      searchShow: false,
      typeShow: false,
      rentShow: false,
      zoneShow: false,
      unitShow: false,
      showResult: false,
      orientationsShow: false,
      statusList: [],
      tabIndex: 0,
      show: false,
      keyword: '',
      pageNo: 1,
      searchData: [],
      resultList: [],
      typeValue: ['2'],
      zoneValue: [0],
      unitValue: [0],
      orientationsValue: [0],
      searchParam: {
        highlightKeword: true,
        zoneId: '',
        keyword: '',
        chamberCounts: [{
          min: '',
          max: ''
        }],
        minPrice: '',
        maxPrice: '',
        houseRentType: '2',
        roomAttributeList: [],
        statusList: [2]
      },
      typeList: [[
        { name: '整租', value: '1' },
        { name: '合租', value: '2' }
      ]],
      checkList: [
        { label: '独卫', value: 1, checked: false },
        { label: '独立阳台', value: 2, checked: false },
        { label: '独立厨房', value: 3, checked: false },
        { label: '飘窗', value: 4, checked: false },
        { label: '空房', value: 0, checked: true }
      ],
      zoneList: [
        { label: '不限制', value: 0 },
        { label: '古荡', value: 1 },
        { label: '文一路', value: 2},
        { label: '黄龙', value: 3 },
      ],
      unitList: [
        { label: '不限制', value: 0 },
        { label: '1室', value: 1 },
        { label: '2室', value: 2},
        { label: '3室', value: 3 },
        { label: '4室', value: 4 },
        { label: '5室', value: 5 },
        { label: '5室以上', value: 6 }
      ],
      orientationsList: []
    }
  },
  watch: {
    'unitValue'(val) {
      if (val === '0') {
        this.searchParam.chamberCounts = [{
          min: '',
          max: ''
        }]
      } else if (val === '6') {
        this.searchParam.chamberCounts = [{
          min: 6,
          max: ''
        }]
      } else {
        this.searchParam.chamberCounts = [{
          min: val,
          max: val
        }]
      }
    },
    'typeValue'(val) {
      this.searchParam.houseRentType = val[0]
    }
  },
  methods: {
    toSearch() {
      this.searchShow = true
    },
    cancelSearch() {
      this.$router.push({name: 'houseIndex'})
    },
    keywordSearch: debounce(function(){
      this.searchHouse()
    }, 500),
    changeType(val) { //修改房源类型
      this.searchParam.houseType = val[0]
    },
    rentChange() { //选择月租金范围
      this.rentShow = true
    },
    closePop(show) {
      this[show] = false
    },
    searchFn() {
      this.searchParam.roomAttributeList = []
      this.checkList.map(val => {
        if (val.value === 0) { //空房是房间状态 单独处理
          this.searchParam.statusList = val.checked ? [2] : []
        } else {
          if (this.searchParam.houseRentType === '2') { //只有合租才有独卫这些属性
            val.checked ? this.searchParam.roomAttributeList.push(val.value) : ''
          }
        }
      })
      houseApi(deepClone(this.searchParam)).then(res => {
        this.resultList = res.result || []
        this.showResult = true
      }).catch()
    },
    searchMore() {
      this.pageNo++
      this.postData()
    },
    hideResult() {
      this.showResult = false
    },
    postData(param) {
      param.pageNo = this.pageNo
      houseApi(param).then(res => {
        let resList = res.result || []
        if (param.pageNo === 1) {
          this.searchData = resList
        } else {
          this.searchData = this.searchData.concat(resList)
        }
      }).catch()
    },
    searchHouse() {
      let param = {
        keyword: this.keyword,
        statusList: this.statusList,
        highlightKeword: true,
        // tags: ['FHD']
      }
      this.pageNo = 1
      this.postData(param)
    },
    searchStatus(val) {
      this.statusList = val === 0 ? [] : [val]
      this.searchHouse()
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  
  .searchGroup {
    .line {
      width:  100%;
      min-height: 42px;
      padding: 5px 0;
      clear: both;
    }
    .labelTitle {
      width: 80px;
      text-align: left;
      color: #fff;
      line-height: 30px;
      float: left;
      padding-left: 10px;
    }
    .cellRight {
      width: 270px;
      height: 30px;
      border-radius: 4px;
      line-height: 30px;
      background: #fff;
      border:none;
      float: left;
      padding: 0 10px;
      position: relative;
      
    }
    .hasIcon{
      color: #c8c8c8;
      &:after{
        content: '\e678';
        font-family: 'iconfont';
        right: 10px;
        position: absolute;
        color: #c8c8c8;
        top: 0;
      }
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
      color: #c8c8c8;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #c8c8c8;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #c8c8c8;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
      color: #c8c8c8;
    }
  }
  .checkNav {
    li {
      width: 33.333%;
      padding-left: 40px;
      float: left;
      position: relative;
      line-height: 28px;
      color: #fff;
      &:before {
        position: absolute;
        font-family: 'iconfont';
        content: '\e693';
        color: #fff;
        left: 10px;
        top: 0;
        font-size: 18px;
        
      }
    }
    .checked {
      color: yellow;
      font-weight: 700;
      &:before {
        color: yellow;
        font-weight: 700;
      }
    }
  }
  .buttonDiv {
    padding: 10px 40px;
    .btn {
      text-align: center;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-radius: 4px;
      color: #4680FF;
      background: #FFF;
    }
  }
  .alertBox {
    width: 100%;
    padding: 20px 0;
    .alertInput {
      width: 40%;
      height: 36px;
      line-height: 36px;
      padding-left: 5px;
      border-radius: 4px;
      font-size: 14px;
      border: 1px solid #ddd;
      outline: none;
      float: left; 
      text-align: center;
    }
    .alertSpan {
      width: 20%;
      height: 36px;
      line-height: 36px;
      text-align: center;
      float: left;
    }
  }
  .resultNum {
    width: 100;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    .red {
      color: red;
    }
  }
</style>
