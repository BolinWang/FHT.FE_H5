<template>
  <div>
    <div id="mapDiv">
      <i class="iconfont icon-ditubiaodianb mapIcon" v-show="showIcon"></i>
      <baidu-map class="map" :center="center" :zoom="zoom" @ready="mapReady">
      </baidu-map>
    </div>
    <div class="mapBox">
      <div style="text-align:center;" v-show="showLoading">
        <inline-loading></inline-loading>
      </div>
      <div class="mapLine" v-show="searchList.length > 0">
        <div class="title blue ellipsis">{{currentData ? currentData.subdistrictName : ''}}</div>
        <div class="address ellipsis">{{currentData ? currentData.subdistrictAddress : ''}}</div>
        <div class="mapEdit" @click="editData">自定义</div>
      </div>
      <div class="scrollDiv">
        <scroll :pullDownRefresh="false" 
          :pullUpLoad="false" 
          :data="searchList" ref="scroll">
          <ul class="mapNav">
            <li class="mapLine" v-for="(item, key) in searchList" 
              :key="key" 
              @click="clickOne(key)"
              :class="{active: key === current}">
              <div class="title">{{item.title}}</div>
              <div class="address">{{item.address}}</div>
            </li>
          </ul>
        </scroll>
      </div>
    </div>
    <!-- 自定义 -->
    <div v-transfer-dom>
      <popup v-model="editShow" height="100%">
        <popup-header
        left-text="取消"
        right-text="确定"
        title="自定义地址"
        :show-bottom-border="false"
        @on-click-left="editShow = false"
        @on-click-right="editSave"></popup-header>
        <group gutter="0" title="当前选择位置信息" label-width="70px">
          <popup-picker value-text-align="left" title="区域" :data="optList" :popup-style="{'z-index': 502}" show-name v-model="areaValue" :columns="1"></popup-picker>
          <x-textarea title="小区名称" ref="editTitle" v-model="currentData.subdistrictName" :show-counter="false" :rows="1" autosize></x-textarea>
          <x-textarea title="小区地址" v-model="currentData.subdistrictAddress" :show-counter="false" ref="editAddress" :rows="1" autosize></x-textarea>
        </group>
      </popup>
    </div>

    <!-- 搜索 -->
    <div v-transfer-dom>
      <popup v-model="wordShow" height="100%" :is-transparent="true">
        <search
          v-model="keyword" 
          ref="wordSearch"
          :auto-fixed="false"
          placeholder="搜索房源"
          @on-change="debounceSearch" 
          @on-cancel="hideSearch"
          @on-submit="searchParam">
        </search>
        <div class="keyDiv">
          <scroll :pullDownRefresh="false" 
            :pullUpLoad="false" 
            :data="keywordList" ref="scroll">
            <ul class="searchNav">
              <li class="mapLine" v-for="(item, key) in keywordList" 
                :key="key" 
                @click="keywordClick(key)">
                <div class="title">{{item.title}}</div>
                <div class="address">{{item.address}}</div>
              </li>
            </ul>
          </scroll>
        </div>
        
      </popup>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Search, XInput, InlineLoading, PopupHeader, Popup, TransferDom, Selector, XTextarea, debounce, PopupPicker } from 'vux'
  import cityData from '../cityData/cityData'
  import scroll from '@/components/scroll'
  export default {
    name: 'map-search',
    directives: {
      TransferDom
    },
    components: {
      Search,
      XInput,
      scroll,
      InlineLoading,
      PopupHeader, 
      Popup,
      Selector,
      XTextarea,
      PopupPicker
    },
    props: {
      wordShow: {
        type: Boolean,
        default: false
      },
      value: {
        default: {}
      }
    },
    watch: {
      wordShow(val) {
        this.wordShow = val
        this.$nextTick(() => {
          val ? this.$refs.wordSearch.setFocus() : ''
        })
      }
    },
    data() {
      return {
        center: { lat: 0, lng: 0 },
        zoom: 18,
        showIcon: false,
        BmapObj: '',
        mapObj: '',
        searchList: [],
        keywordList: [],
        keyword: '',
        currentData: {
          provinceId: '',
          cityId: '',
          addrRegionId: '',
          subdistrictName: '',
          subdistrictAddress: '',
          longitude: '',
          latitude: ''
        },
        nowCityName: '', //当前城市
        nowAreaName: '', //当前区域
        current: 0,
        showCurrent: false,
        geolocation: null,
        geoc: null,
        local: null,
        showLoading: false,
        editShow: false,
        optList: [],
        areaValue: []
      }
    },
    mounted() {
      window['locationStatusInAndroid'] = (data) => {
        let obj = JSON.parse(data)
        this.center = {
          lng: obj.location.longitude,
          lat: obj.location.latitude
        }
        let point = new BMap.Point(obj.location.longitude, obj.location.latitude)
        this.getCenterData(point)
      }
      if(window.JSRunAs) {
        window.JSRunAs.getLocation()
      } 
    },
    methods: {
      editSave() {
        this.editShow = false
        console.log(this.currentData)
      },
      debounceSearch: debounce(function(){
        this.searchParam()
      }, 500),
      searchParam() { //关键字搜索
        this.local.searchNearby(this.keyword, this.center, 10000)
      },
      hideSearch() {
        this.$emit('changeShow')
      },
      keywordClick(index) { //选中关键字搜索结果的某个地址
        this.center = this.keywordList[index].point
        this.$emit('changeShow')
        this.getCenterData(this.keywordList[index].point)
        this.keywordList = []
      },
      clickOne(index) {
        this.current = index
        this.center = this.searchList[index].point
        this.combineData(this.searchList[index])
      },
      editData() { //自定义当前数据
        this.editShow = true
        this.$nextTick(() => {
          this.$refs.editAddress.updateAutosize()
          this.$refs.editTitle.updateAutosize()
        })
      },
      combineData(item) { //获取当前选择的数据

        this.currentData.subdistrictName = item.title
        this.currentData.subdistrictAddress = item.address
        this.currentData.longitude = item.point.lng
        this.currentData.latitude = item.point.lat

        if (this.nowCityName === item.city) { //城市没有切换就不用重新获取
          this.optList.map((y, x) => { //切换对应的区域即可
            if (y.name === this.nowAreaName) {
              this.currentData.addrRegionId = y.value
              this.areaValue = [String(y.value)]
            }
          })
          this.updateData()
          return 
        }
        if (item.province && item.city) {
          this.nowCityName = item.city
          cityData.map((v, k) => {
            if (v.label === item.province || v.label.indexOf(item.province) !== -1) {
              this.currentData.provinceId = v.value
              v.children.map((n, m) => { 
                if (n.label === item.city || n.label.indexOf(item.city) !== -1) {
                  this.currentData.cityId = n.value
                  let arr = []
                  n.children.map((y, x) => { //获取当前所属的区域
                    arr.push({name: y.label, value: String(y.value)})
                    if (y.label === this.nowAreaName) {
                      this.currentData.addrRegionId = y.value
                      this.areaValue = [String(y.value)]
                    }
                  })
                  this.optList = arr
                }
              })
            }
          })
          this.updateData()
        }
      },
      updateData() {
        this.$emit('input', this.currentData)
      },
      getCenterData(point) { //查询附近的房子
        let self = this
        this.showLoading = true
        self.searchList = []
        this.geoc.getLocation(point, function(rs){ // 获取所在的区
          if(rs) {
            self.nowAreaName = rs.addressComponents.district
            self.local.searchNearby('房', point, 100)
          }
        })
      },
      mapReady({BMap, map}) { //地图加载完成
        let self = this
        this.BmapObj = BMap
        this.mapObj = map
        this.geolocation = new BMap.Geolocation()
        this.geoc = new BMap.Geocoder();	
        this.showIcon = true
        if (!window.JSRunAs) { //非APP里面调用定位
          //自动定位当前位置
          this.geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
              self.center = r.point
              self.getCenterData(self.center)
            }
          },{enableHighAccuracy: true,
          SDKLocation: true})
        }

        // 拖拽完成触发
        map.addEventListener("touchend", function(e){ 
          setTimeout(function(){
            self.getCenterData(map.getCenter())
          },100)
        });
        // 搜索结果处理
        this.local = new BMap.LocalSearch(map, {
          onSearchComplete: function(results){
            self.showLoading = false
            // 判断状态是否正确
            if (self.local.getStatus() == BMAP_STATUS_SUCCESS){
              let resultsLen = results.getCurrentNumPois()
              if (resultsLen.length === 0 && !self.wordShow) {
                self.showCurrent = false
                return 
              }
              let arr = []
              for (let i = 0; i < resultsLen; i++){
                arr.push(results.getPoi(i))
              }
              if (self.wordShow) { //关键字输入搜索
                self.keywordList = arr
              } else {
                self.searchList = arr
                self.$refs.scroll.scrollTo(0, 0)
                self.current = 0
                self.showCurrent = true
                self.combineData(arr[0])
              }
              
            }
          },
          pageCapacity : 20 //设置每页容量
        })

      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less" lang="less" scoped>
  #mapDiv {
    width: 100%;
    height: 250px;
    position: relative
  }
  .map {
    width: 100%;
    height: 100%;
  }
  .mapIcon {
    position: absolute;
    font-size: 40px;
    color:red;
    width: 25px;
    height: 25px;
    left: 157px;
    top: 78px;
    z-index: 1;
  }
  .currentDiv {
    position: relative;
  }
  .mapBox {
    height: 306px;
    background: #fff;
  }
  .scrollDiv {
    height: 250px;
  }
  .mapNav {
    .active:after{
      content:"\e679";
      color: green;
      font-family: "iconfont";
      font-size: 15px;
      position: absolute;
      right: 10px;
      top: 15px;
    }
  }
  .mapLine {
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding: 5px 0px 5px 10px;
    position: relative;
    background: #fff;
    .title {
      width: 85%;
      font-size: 14px;
    }
    .address {
      font-size: 12px;
      width: 85%;
      color: #999;
    }
    .mapEdit {
      width: 50px;
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      color: rgba(255, 152, 0, 1);
      font-size: 12px;
      text-align: center;
      border: 1px solid rgba(255, 152, 0, 1);
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
  .keyDiv {
    height: 600px;
  }
</style>
