<template>
  <div>
    <div id="mapDiv">
      <i class="iconfont icon-ditubiaodianb mapIcon" v-show="showIcon"></i>
      <baidu-map class="map" :center="center" :zoom="zoom" @ready="mapReady">
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="false" :autoLocation="true" @locationSuccess="locationSuccess"></bm-geolocation>
      </baidu-map>
    </div>
    <div class="mapBox">
      <div style="text-align:center;" v-show="showLoading">
        <inline-loading></inline-loading>
      </div>
       
      <div class="mapLine" v-show="searchList.length > 0">
        <div class="title blue ellipsis">{{searchList[current] ? searchList[current].title : ''}}</div>
        <div class="address ellipsis">{{searchList[current] ? searchList[current].address : ''}}</div>
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
        <group gutter="0" title="当前选择位置信息" label-width="90px">
          <selector title="区域" :options="optList" v-model="areaValue" :value-map="valueMap" ref="area"></selector>
          <x-textarea title="小区名称" ref="editTitle" v-model="currentData.title" :show-counter="false" :rows="1" autosize></x-textarea>
          <x-textarea title="小区地址" v-model="currentData.address" :show-counter="false" ref="editAddress" :rows="1" autosize></x-textarea>
        </group>
      </popup>
    </div>

    <!-- 搜索 -->
    <div v-transfer-dom>
      <popup v-model="wordShow" height="100%">
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
  import { Search, XInput, InlineLoading, PopupHeader, Popup, TransferDom, Selector, XTextarea, debounce } from 'vux'
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
      XTextarea
    },
    props: {
      wordShow: {
        type: Boolean,
        default: false
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
        center: {lng: 0, lat: 0},
        zoom: 18,
        showIcon: false,
        BmapObj: '',
        mapObj: '',
        searchList: [],
        keywordList: [],
        keyword: '',
        valueMap: ['value','label'],
        currentData: {
          title: '',
          address: ''
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
        areaValue: {}
      }
    },
    methods: {
      editSave() {
        this.editShow = false
      },
      debounceSearch: debounce(function(){
        this.searchParam()
      }, 500),
      searchParam() {
        // forceLocal表示是否将搜索范围约束在当前城市
        this.local.search(this.keyword, {forceLocal:true})
      },
      hideSearch() {
        this.$emit('changeShow')
      },
      keywordClick(index) {

      },
      clickOne(index) {
        this.current = index
        this.center = this.searchList[index].point
      },
      editData() { //自定义当前数据
        this.currentData = this.searchList[this.current]
        this.getAreaData()
        this.editShow = true
        this.$nextTick(() => {
          this.$refs.editAddress.updateAutosize()
          this.$refs.editTitle.updateAutosize()
        })
      },
      getAreaData(){ //获取城市下面的区域
        let provinceName = this.currentData.province
        let cityName = this.currentData.city
        if (this.nowCityName === cityName) {
          return 
        }
        if (provinceName && cityName) {
          this.nowCityName = cityName
          cityData.map((v, k) => {
            if (v.label === provinceName || v.label.indexOf(provinceName) !== -1) {
              v.children.map((n, m) => { 
                if (n.label === cityName || n.label.indexOf(cityName) !== -1) {
                  this.optList = n.children
                  n.children.map((y, x) => { //获取当前所属的区域
                    if (y.label === this.nowAreaName) {
                      this.areaValue = y.value
                    }
                  })
                }
              })
            }
          })
        }
      },
      locationSuccess({point, addressComponent, marker}) { //手动定位成功后获取当前数据
        this.getCenterData(point)
        //地图默认的比例不是自己设置的估计在10左右，但是获取出来的又是18 如果设置的跟之前一样他不会修改所以在17和18来回设置保证可以设置成功
        this.zoom = this.zoom === 18 ? 17 : 18
      },
      getCenterData(point) { //查询附近的房子
        let self = this
        this.showLoading = true
        self.searchList = []
        this.geoc.getLocation(point, function(rs){ // 获取所在的区
          self.nowAreaName = rs.addressComponents.district
          self.local.searchNearby('房', point, 100);
        });  
      },
      mapReady({BMap, map}) { //地图加载完成
        let self = this
        this.BmapObj = BMap
        this.mapObj = map
        this.geolocation = new BMap.Geolocation()
        this.geoc = new BMap.Geocoder();	
        this.showIcon = true
        // 自动定位当前位置
        this.geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            self.center = r.point
            self.getCenterData(r.point)
          }
        },{enableHighAccuracy: true,
        SDKLocation: true})
        
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
              console.log(resultsLen)
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
    height: 500px;
    position: relative
  }
  .map {
    width: 100%;
    height: 100%;
  }
  .mapIcon {
    position: absolute;
    font-size: 80px;
    color:red;
    width: 50px;
    height: 50px;
    left: 330px;
    top: 155px;
    z-index: 1;
  }
  .currentDiv {
    position: relative;
  }
  .mapBox {
    height: 612px;
    background: #fff;
  }
  .scrollDiv {
    height: 500px;
  }
  .mapNav {
    .active:after{
      content:"\e679";
      color: green;
      font-family: "iconfont";
      font-size: 30px;
      position: absolute;
      right: 20px;
      top:30px;
    }
  }
  .mapLine {
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding: 10px 0px 10px 20px;
    position: relative;
    background: #fff;
    .title {
      width: 85%;
      font-size: 28px;
    }
    .address {
      font-size: 24px;
      width: 85%;
      color: #999;
    }
    .mapEdit {
      width: 100px;
      height: 60px;
      line-height: 60px;
      border-radius: 8px;
      color: rgba(255, 152, 0, 1);
      font-size: 24px;
      text-align: center;
      border: 1px solid rgba(255, 152, 0, 1);
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }
  .keyDiv {
    height: 1200px;
  }
</style>
