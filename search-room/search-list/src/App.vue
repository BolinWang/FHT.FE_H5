<template>
  <div id="mj-container">
    <div class="roomList-head" v-if="cityList.length">
      <div class="roomList-search">
        <div class="search-city" @click="showCityList = true">
          {{ curCityIndex ? cityList[curCityIndex].name : '定位中...'}}
          <span class="search-city-icon"></span>
        </div>
        <div class="search-input" @click="showSearch = true">
          <div class="search-icon"></div>
          <p>搜索您想住的区域或小区</p>
          <!-- <input type="text" placeholder="搜索您想住的区域或小区" readonly> -->
        </div>
      </div>
      <div class="top-select">
        <div
          class="select-item"
          :class="{active: showPopupObj[index], selected: selectOptions[index].active}"
          v-for="(item, index) in selectOptions"
          :key="index"
          @click="showPopup(index)">
          <span class="select-text">
            {{item.text}}
          </span>
          <span class="select-icon"></span>
        </div>
      </div>
    </div>
    <div class="roomList-body">
      <div class="roomList-noData" v-if="noData">
        <div class="content">
          <p :style="{fontSize: '0.373333rem', color: '#999', marginBottom: '0.24rem'}">真的没了</p>
          <p :style="{color: '#ccc'}">更换筛选条件试试吧</p>
        </div>
      </div>
      <div id="roomListWrapper" ref="roomListWrapper" class="roomList-container" v-else>
        <mt-loadmore
          :top-method="loadTop"
          @top-status-change="handleTopChange"
          @bottom-status-change="handleBottomChange"
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          ref="loadmore"
          :autoFill="false">
          <a
            :href="`https://www.mdguanjia.com/waptest/roomDetail/index.html?type=${item.type}&roomId=${item.id}&memorhomeHost=${apiAddr}`"
            class="roomList-item"
            v-for="(item, index) in roomList"
            :key="index">
            <div class="room-pic">
              <img alt="" v-lazy.roomListWrapper="item.pic">
            </div>
            <div class="room-info">
              <div class="room-name">{{item.name}}</div>
              <div class="room-layout">{{item.houseArea}} | {{item.houseType}} | {{item.decorationDegree}}</div>
              <div class="room-price">
                <span style="font-size: 0.426667rem;">￥{{item.price}}</span>
                <span>/月</span>
              </div>
              <div class="room-address">
                <div class="room-tags">
                  <span v-for="(tag, tagIndex) in item.showTagList"
                    :key="tagIndex"
                    style="border: 1px solid; border-radius: 0.1rem; padding: 0 0.1rem;"
                    :style="{color: tag.tagColor, borderColor: tag.tagColor}">
                    {{tag.tagName}}
                  </span>
                </div>
                <div class="room-address-text">
                  <i class="icon-location" v-if="item.regionZone"></i>
                  {{item.regionZone}}
                </div>
              </div>
            </div>
          </a>
          <div slot="top" class="mint-loadmore-top mint-loadmore-tips">
            <span v-show="topStatus !== 'loading'" class="icon" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'pull'">OK</span>
            <span v-show="topStatus === 'drop'">快放手，我要刷新了^_^</span>
            <span v-show="topStatus === 'loading'">努力刷新中^_^</span>
          </div>
          <div slot="bottom" class="mint-loadmore-bottom mint-loadmore-tips">
            <span v-show="bottomStatus !== 'loading'" class="icon" :class="{ 'rotate': bottomStatus === 'drop' }">↑</span>
            <span v-show="bottomStatus === 'pull'">OK</span>
            <span v-show="bottomStatus === 'drop'">快放手，我要加载了^_^</span>
            <span v-show="bottomStatus === 'loading'">努力加载中^_^</span>
          </div>
          <p v-show="allLoaded" class="all-loaded">底线到了-_-!!</p>
        </mt-loadmore>
      </div>
    </div>
    <mt-popup
      class="select-list"
      v-model="showPopupObj[0]"
      zIndex="2000"
      position="top">
      <div class="rentType-list">
        <label :for="`rentType${index}`" v-for="(item, index) in rentTypeList" :key="index">
          <input type="radio" :id="`rentType${index}`" :value="item.val" v-model="curRentType">
          <p class="select-item" @click="changeRentType(item)">{{item.text}}</p>
        </label>
      </div>
    </mt-popup>
    <mt-popup
      class="select-list"
      v-model="showPopupObj[1]"
      zIndex="2001"
      position="top">
      <div class="district-list">
        <div class="district-item district">
          <label
            :for="`district${index}`"
            v-for="(item, index) in districtList"
            :key="index">
            <input type="radio" :id="`district${index}`" :value="index" v-model="curDistrict">
            <p class="select-item" @click="changeRegion(index)">{{item.name}}</p>
          </label>
        </div>
        <div class="district-item district">
          <label
            v-if="regionList.length"
            :for="`subDistrict${index}`"
            v-for="(item, index) in regionList"
            :key="index">
            <input type="radio" :id="`subDistrict${index}`" :value="index" v-model="curRegion">
            <p class="select-item" @click="selectRegion(index)">{{item.zoneName}}</p>
          </label>
        </div>
      </div>
    </mt-popup>
    <mt-popup
      class="select-list"
      v-model="showPopupObj[2]"
      zIndex="2002"
      position="top">
      <div class="price-list">
        <label :for="`price${index}`" v-for="(item, index) in priceList" :key="index">
          <input type="radio" :id="`price${index}`" :value="item.val" v-model="curPrice">
          <p class="select-item" @click="changePrice(item)">{{item.text}}</p>
        </label>
      </div>
    </mt-popup>
    <mt-popup
      class="select-list"
      v-model="showPopupObj[3]"
      zIndex="2003"
      position="top">
      <div class="moreInfo-list">
        <div class="moreInfo-item">
          <p class="moreInfo-title">装修</p>
          <label class="moreInfo-options" :for="item.text" v-for="(item, index) in decorationList" :key="index">
            <input :id="item.text" type="checkbox" v-model="item.checked" />
            <span>{{item.text}}</span>
          </label>
        </div>
        <div class="moreInfo-item">
          <p class="moreInfo-title">卧室</p>
          <label class="moreInfo-options" :for="item.text" v-for="(item, index) in chamberList" :key="index">
            <input :id="item.text" type="checkbox" v-model="item.checked" />
            <span>{{item.text}}</span>
          </label>
        </div>
        <div class="moreInfo-item">
          <p class="moreInfo-title">卫生间</p>
          <label class="moreInfo-options" :for="item.text" v-for="(item, index) in toiletList" :key="index">
            <input :id="item.text" type="checkbox" v-model="item.checked" />
            <span>{{item.text}}</span>
          </label>
        </div>
        <div class="moreInfo-checkBtn">
          <mt-button type="default" size="small" @click="resetMoreInfoOptions">重置</mt-button>
          <mt-button type="primary" size="small" @click="getMoreInfoOptions">确定</mt-button>
        </div>
      </div>
    </mt-popup>
    <mt-popup
      class="cityList"
      v-model="showCityList"
      zIndex="20000"
      position="bottom">
      <div class="cityList-head">
        选择城市
        <span class="close-btn" @click="showCityList = false"></span>
      </div>
      <div class="cityList-container">
        <div class="cityList-tab">选择服务城市</div>
        <ul>
          <li
            class="cityList-item"
            v-for="(item, index) in cityList"
            :key="item.id"
            @click="changeCurCity(index)">
            {{item.name}}
          </li>
        </ul>
      </div>
    </mt-popup>
    <mt-popup
      class="search-popup"
      v-model="showSearch"
      zIndex="20000"
      position="right">
      <div class="search-head">
        <div class="search-input" v-if="showSearch">
          <div class="search-icon"></div>
          <form action="javascript:void(0);">
            <input ref="keywords" type="search" @keyup.13="getKeywords" placeholder="搜索您想住的区域或小区" v-model="keywords">
            <span class="icon" v-show="keywords" @click="searchFocus"></span>
          </form>
        </div>
        <div class="back" @click="keywords='';showSearch=false;searchRoomList=[]">取消</div>
      </div>
      <div class="search-container" v-show="this.historySearch.length && !this.searchRoomList.length">
        <div class="title">
          搜索历史
          <span class="remove-icon" @click="removeHistory"></span>
        </div>
        <div class="search-history">
          <mt-button type="default" size="small" v-for="(item, index) in historySearch" :key="index" @click="doSearch(item)">{{item}}</mt-button>
        </div>
      </div>
      <div class="search-roomList" v-if="this.searchRoomList.length">
        <a
        :href="`https://www.mdguanjia.com/waptest/roomDetail/index.html?type=${item.type}&roomId=${item.id}&memorhomeHost=${apiAddr}`"
        class="roomList-item"
        v-for="(item, index) in searchRoomList" :key="index">
          <div class="room-pic">
            <img :src="item.pic" alt="">
          </div>
          <div class="room-info">
            <div class="room-name">{{item.name}}</div>
            <div class="room-layout">{{item.houseArea}} | {{item.houseType}} | {{item.decorationDegree}}</div>
            <div class="room-price">{{item.price}}元/月起</div>
            <div class="room-address">
              <div class="room-tags">
                <span v-for="(tag, tagIndex) in item.showTagList"
                  :key="tagIndex"
                  style="border: 1px solid; border-radius: 0.1rem; padding: 0 0.1rem;"
                  :style="{color: tag.tagColor, borderColor: tag.tagColor}">
                  {{tag.tagName}}
                </span>
              </div>
              <div class="room-address-text">
                <i class="icon-location" v-if="item.regionZone"></i>
                {{item.regionZone}}
              </div>
            </div>
          </div>
        </a>
      </div>
    </mt-popup>
    <mt-popup
      class="res-msg"
      v-model="showMsg"
      popup-transition="popup-fade"
      :modal='false'>
      没有找到相关内容，请尝试换一个关键词^_^
    </mt-popup>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      apiAddr: 'api',
      curCityIndex: null,
      pageNo: 1,
      showPopupObj: {
        0: false,
        1: false,
        2: false,
        3: false
      },
      selectOptions: [
        {
          text: '类型',
          active: false
        },
        {
          text: '区域',
          active: false
        },
        {
          text: '租金',
          active: false
        },
        {
          text: '更多',
          active: false
        }
      ],
      curRentType: null,
      curPrice: {
        minPrice: null,
        maxPrice: null
      },
      rentTypeList: [
        {
          val: null,
          text: '不限'
        },
        {
          val: 3,
          text: '品牌公寓'
        },
        {
          val: 1,
          text: '整租'
        },
        {
          val: 2,
          text: '合租'
        }
      ],
      priceList: [
        {
          text: '不限',
          val: {
            minPrice: null,
            maxPrice: null
          }
        },
        {
          text: '1500元以下',
          val: {
            minPrice: null,
            maxPrice: 1500
          }
        },
        {
          text: '1500-2000元',
          val: {
            minPrice: 1500,
            maxPrice: 2000
          }
        },
        {
          text: '2000-2500元',
          val: {
            minPrice: 2000,
            maxPrice: 2500
          }
        },
        {
          text: '2500-3000元',
          val: {
            minPrice: 2500,
            maxPrice: 3000
          }
        },
        {
          text: '3000-4000元',
          val: {
            minPrice: 3000,
            maxPrice: 4000
          }
        },
        {
          text: '4000-5000元',
          val: {
            minPrice: 4000,
            maxPrice: 5000
          }
        },
        {
          text: '5000元以上',
          val: {
            minPrice: 5000,
            maxPrice: null
          }
        }
      ],
      decorationList: [
        {
          text: '毛坯',
          checked: false,
          isChecked: false,
          val: '1'
        },
        {
          text: '简装',
          checked: false,
          isChecked: false,
          val: '2'
        },
        {
          text: '精装',
          checked: false,
          isChecked: false,
          val: '3'
        },
        {
          text: '豪华',
          checked: false,
          isChecked: false,
          val: '4'
        }
      ],
      chamberList: [
        {
          text: '一室',
          range: {
            min: 1,
            max: 1
          },
          checked: false,
          isChecked: false
        },
        {
          text: '二室',
          range: {
            min: 2,
            max: 2
          },
          checked: false,
          isChecked: false
        },
        {
          text: '三室',
          range: {
            min: 3,
            max: 3
          },
          checked: false,
          isChecked: false
        },
        {
          text: '四室',
          range: {
            min: 4,
            max: 4
          },
          checked: false,
          isChecked: false
        },
        {
          text: '四室及以上',
          range: {
            min: 4,
            max: null
          },
          checked: false,
          isChecked: false
        }
      ],
      toiletList: [
        {
          text: '一卫',
          range: {
            min: 1,
            max: 1
          },
          checked: false,
          isChecked: false
        },
        {
          text: '二卫',
          range: {
            min: 2,
            max: 2
          },
          checked: false,
          isChecked: false
        },
        {
          text: '二卫以上',
          range: {
            min: 2,
            max: null
          },
          checked: false,
          isChecked: false
        }
      ],
      districtList: [],
      regionList: [],
      curDistrict: 0,
      curRegion: 0,
      selectedDistrict: 0,
      selectedRegion: 0,
      roomList: [],
      topStatus: '',
      bottomStatus: '',
      allLoaded: false,
      noData: false,
      showSearch: false,
      cityList: [],
      showCityList: false,
      historySearch: [],
      keywords: '',
      searchRoomList: false,
      showMsg: false,
      isLoading: false
    }
  },
  computed: {
    type() {
      return this.curRentType == 3 ? 1 : (this.curRentType == null ? null : 2);
    }
  },
  created() {
    if(location.search){
      let searchObj = {};
      let searchArr = location.search.slice(1).split('&');
      for (let i = 0; i < searchArr.length; i++) {
        if(searchArr[i].split("=")[1]){
          searchObj[searchArr[i].split("=")[0]] = unescape(searchArr[i].split("=")[1]);
        }
      }
      this.apiAddr = searchObj['memorhomeHost'] || 'api';
    }
    this.getCityList();
    this.share();
  },
  mounted() {
    let top = this.$refs.roomListWrapper.offsetTop;
    this.$refs.roomListWrapper.style.height = document.body.clientHeight - top + 'px';
  },
  methods: {
    // 获取当前定位城市
    getCurrentPosition() {
      if (window.BMap) {
        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition((position) => {
          let getCurrentPositionCity = position.address.city || '杭州';
          let filterItemIndex
          this.cityList.forEach((item, index) => {
            if (item.name.includes(getCurrentPositionCity)){
              filterItemIndex = index
              return false
            }
          })
          this.curCityIndex = localStorage.getItem('MJ_DEFAULT_CITY_INDEX') || filterItemIndex;
          this.getRoomList(true);
          this.getDistrictList();
        });
      } else {
        this.curCityIndex = 8;
        this.getRoomList(true);
        this.getDistrictList();
      }
    },
    getMoreInfoOptions() {
      this.showPopupObj[3] = false;
      let checkLength = 0;
      this.decorationList.forEach((item, index) => {
        item.isChecked = item.checked;
        if(item.isChecked){
          checkLength++;
        }
      });
      this.chamberList.forEach((item, index) => {
        item.isChecked = item.checked;
        if(item.isChecked){
          checkLength++;
        }
      });
      this.toiletList.forEach((item, index) => {
        item.isChecked = item.checked;
        if(item.isChecked){
          checkLength++;
        }
      });
      if(checkLength){
        this.selectOptions[3].active = true;
      } else {
        this.selectOptions[3].active = false;
      }
      this.getRoomList(true);
    },
    resetMoreInfoOptions() {
      this.decorationList.forEach((item, index) => {
        item.checked = false;
      });
      this.chamberList.forEach((item, index) => {
        item.checked = false;
      });
      this.toiletList.forEach((item, index) => {
        item.checked = false;
      });
    },
    showPopup(i) {
      if(this.showPopupObj[i]){
        this.showPopupObj[i] = false;
        return ;
      }
      for(let n in this.showPopupObj){
        if(i == n){
          this.showPopupObj[n] = true;
        } else {
          this.showPopupObj[n] = false;
        }
      }
    },
    getDistrictList(reFlash) {
      this.sendReq('https://' + this.apiAddr + '.mdguanjia.com/myhome/api/search', '3.0.2', 'areaListWithHouse', {
          "devId": "5555998cccf2492db015c442f087f00a",
          "cityId": this.cityList[this.curCityIndex] ? this.cityList[this.curCityIndex].id : "330100"
      }).then((res) => {
        if(res.data.code == 0){
          if(reFlash){
            this.districtList.length = 0;
          }
          res.data.data.areaZones.forEach((item, index) => {
            this.districtList.push({
              id: item.areaId,
              name: item.areaName,
              checked: false,
              isChecked: false,
              zones: item.zones || [{
                zoneId: -1,
                zoneName: "全部"
              }]
            });
          })
        }
      }).catch((err) => { console.log(err); })
    },
    changeRegion(index) {
      this.regionList.length = 0;
      this.districtList[index].zones.forEach((o, i) => {
        this.regionList.push({
          zoneId: o.zoneId,
          zoneName: o.zoneName
        })
      });
      if(index == this.selectedDistrict){
        this.curRegion = this.selectedRegion;
      } else {
        this.curRegion = null;
      }
    },
    selectRegion(index) {
      console.log(index);
      this.selectedDistrict = this.curDistrict;
      this.selectedRegion = index;
      if(this.selectedDistrict != 0){
        if(index == 0){
          this.selectOptions[1].text = this.districtList[this.selectedDistrict].name;
        } else {
          this.selectOptions[1].text = this.regionList[this.selectedRegion].zoneName;
        }
        this.selectOptions[1].active = true;
      } else {
        this.selectOptions[1].text = '区域';
        this.selectOptions[1].active = false;
      }
      this.showPopupObj[1] = false;
      this.getRoomList(true);
    },
    getCityList() {
      this.sendReq('https://' + this.apiAddr + '.mdguanjia.com/myhome/api/search', '1.0', 'cityList', {
        "devId": "5555998cccf2492db015c442f087f00a"
      }).then((res) => {
        if(res.data.code == 0){
          res.data.data.cityList.forEach((item, index) => {
            this.cityList.push({
              id: item.areaId,
              name: item.areaName
            });
          });
        }
        this.getCurrentPosition();
      }).catch((err) => { console.log(err); });
    },
    getRoomList(reFlash) {
      if(reFlash){
        this.pageNo = 1;
        this.allLoaded = false;
      }
      if(this.isLoading){
        return ;
      }
      this.isLoading = true;
      this.sendReq('https://' + this.apiAddr + '.mdguanjia.com/myhome/api/search', '1.0', 'searchByPage', {
          "devId": "5555998cccf2492db015c442f087f00a",
          "cityId": this.cityList[this.curCityIndex].id,
          "regionId": this.districtList[this.selectedDistrict] ? this.districtList[this.selectedDistrict].id : null,
          "zoneId": this.regionList[this.selectedRegion] ? this.regionList[this.selectedRegion].zoneId : null,
          "fullRentType": "1",
          "type": this.type,
          "houseRentType": this.type == 1 ? null : this.curRentType,
          "minPrice": this.curPrice.minPrice,
          "maxPrice": this.curPrice.maxPrice,
          "decorationDegrees": this.decorationList.filter(item => item.isChecked).map(item => item.val),
          "chamberCounts": this.chamberList.filter(item => item.isChecked).map(item => item.range),
          "toiletCounts": this.toiletList.filter(item => item.isChecked).map(item => item.range),
          "pageNo": this.pageNo
      }).then((res) => {
        this.isLoading = false;
        if(res.data.code == 0){
          this.noData = false;
          if(reFlash){
            this.roomList.length = 0;
          }
          res.data.data.resultList.forEach((item, index) => {
            this.roomList.push({
              id: item.id,
              name: item.name,
              pic: item.imageUrl.replace('http:', 'https:'),
              houseArea: item.houseArea,
              houseType: item.houseType,
              decorationDegree: item.decorationDegree,
              price: item.minRentPrice,
              address: item.address,
              type: item.type,
              regionZone: `${item.region || ''} ${item.zone || ''}`,
              showTagList: item.showTagList || []
            })
          })
          if(this.pageNo == res.data.data.totalPages){
            this.allLoaded = true;
          }
        } else {
          this.roomList.length = 0;
          this.noData = true;
        }
      }).catch((err) => { console.log(err); })
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadTop() {
      setTimeout(() => {
        this.getRoomList(true);
        this.$refs.loadmore.onTopLoaded();
      }, 500);
    },
    loadBottom() {
      this.pageNo += 1;
      setTimeout(() => {
        this.getRoomList();
        this.$refs.loadmore.onBottomLoaded();
      }, 500);
    },
    changeCurCity(index) {
      if(this.curCityIndex == index){
        return ;
      }
      this.curCityIndex = index;
      this.showCityList = false;
      this.curRentType = null;
      this.selectedDistrict = 0;
      this.selectedRegion = 0;
      this.curPrice = {
        minPrice: null,
        maxPrice: null
      };
      this.decorationList.forEach((item, index) => {
        item.checked = false;
        item.isChecked = item.checked;
      });
      this.chamberList.forEach((item, index) => {
        item.checked = false;
        item.isChecked = item.checked;
      });
      this.toiletList.forEach((item, index) => {
        item.checked = false;
        item.isChecked = item.checked;
      });
      let arr = ['类型', '区域', '租金', '更多'];
      this.selectOptions.forEach((item, index) => {
        this.selectOptions[index].text = arr[index];
        this.selectOptions[index].active = false;
      })
      localStorage.setItem('MJ_DEFAULT_CITY_INDEX', index);
      this.getDistrictList(true);
      this.getRoomList(true);
    },
    changeRentType(obj) {
      this.curRentType = obj.val;
      this.showPopupObj[0] = false;
      if(obj.val != null){
        this.selectOptions[0].text = obj.text;
        this.selectOptions[0].active = true;
      } else {
        this.selectOptions[0].text = '不限';
        this.selectOptions[0].active = false;
      }
      this.getRoomList(true);
    },
    changePrice(obj) {
      this.curPrice = obj.val;
      this.showPopupObj[2] = false;
      if(obj.val.axPrice || obj.val.minPrice){
        this.selectOptions[2].text = obj.text;
        this.selectOptions[2].active = true;
      } else {
        this.selectOptions[2].text = '租金';
        this.selectOptions[2].active = false;
      }
      this.getRoomList(true);
    },
    removeHistory() {
      this.historySearch = [];
      localStorage.removeItem('MJ_SEARCH_HISTORY');
    },
    getKeywords() {
      this.$refs.keywords.blur();
      if(!this.keywords){
        return ;
      }
      this.historySearch.forEach((item, index) => {
        if(item == this.keywords){
          this.historySearch.splice(index, 1);
        }
      });
      this.historySearch.unshift(this.keywords);
      if(this.historySearch.length > 5){
        this.historySearch.pop();
      }
      localStorage.setItem('MJ_SEARCH_HISTORY', this.historySearch.join(','));
      this.getRoomListBySearch();
    },
    doSearch(item) {
      this.keywords = item;
      this.getRoomListBySearch();
    },
    getRoomListBySearch() {
      this.sendReq('https://' + this.apiAddr + '.mdguanjia.com/myhome/api/search', '1.0', 'searchByPage', {
          "devId": "5555998cccf2492db015c442f087f00a",
          "cityId": this.cityList[this.curCityIndex].id,
          "fullRentType": "1",
          "type": null,
          "pageNo": 1,
          "keyword": this.keywords
      }).then((res) => {
        this.searchRoomList = [];
        if(res.data.code == 0){
          res.data.data.resultList.forEach((item, index) => {
            this.searchRoomList.push({
              id: item.id,
              name: item.name,
              pic: item.imageUrl.replace('http:', 'https:'),
              houseArea: item.houseArea,
              houseType: item.houseType,
              decorationDegree: item.decorationDegree,
              price: item.minRentPrice.split('.')[0],
              address: item.address,
              fullRentType: item.isFullRent,
              type: item.type
            });
          });
        } else {
          this.showMsg = true;
          setTimeout(() => {
            this.showMsg = false;
          }, 3000);
        }
      }).catch((err) => { console.log(err); })
    },
    searchFocus() {
      this.keywords='';
      this.$refs.keywords.focus();
    },
    share() {
      axios.get('https://www.mdguanjia.com/myhome/act/august/wechat.htm', {
        params: {
          url: window.location.href,
          callback: 'h5'
        }
      })
      .then((result) => {
        const res = result.data
        if(res.success){
          var shareData = {
            title: '麦邻租房',
            share_img: 'https://www.mdguanjia.com/waptest/houseInfo/images/apple-touch-icon.png',
            share_desc:'麦邻租房'
          }
          var response = res.dataObject;
          wx.config({
            debug: false,
            appId: response.appid,
            timestamp: response.timestamp,
            nonceStr: response.noncestr,
            signature: response.signature,
            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }
        wx.ready(function(){
          var share_url = location.href;
          wx.onMenuShareTimeline({
            title: shareData.title, // 分享标题
            link: share_url, // 分享链接
            imgUrl: shareData.share_img, // 分享图标
            success: function () {
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          wx.onMenuShareAppMessage({
            title: shareData.title, // 分享标题
            desc: shareData.share_desc, // 分享描述
            link: share_url, // 分享链接
            imgUrl: shareData.share_img, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
        });
        wx.error(function(res){
          console.debug(res)
        });
      })
      .catch( err => { console.error(err) })
    }
  },
  watch: {
    showPopupObj: {
      handler(curVal, oldVal){
        if(curVal[1]){
          this.regionList.length = 0;
          this.districtList[this.selectedDistrict].zones.forEach((o, i) => {
            this.regionList.push({
              zoneId: o.zoneId,
              zoneName: o.zoneName
            })
          });
          this.curDistrict = this.selectedDistrict;
          this.curRegion = this.selectedRegion;
        }
        if(curVal[3]){
          this.decorationList.forEach((item, index) => {
            item.checked = item.isChecked;
          });
          this.chamberList.forEach((item, index) => {
            item.checked = item.isChecked;
          });
          this.toiletList.forEach((item, index) => {
            item.checked = item.isChecked;
          })
        }
      },
      deep: true
    },
    showSearch(val) {
      if(val){
        if(localStorage.getItem('MJ_SEARCH_HISTORY')){
          var keywordsArr = localStorage.getItem('MJ_SEARCH_HISTORY').split(',');
          this.historySearch = [];
          keywordsArr.forEach((item, index) => {
              this.historySearch.push(item);
          })
        }
        this.$nextTick(() => {
          this.$refs.keywords.focus();
        })
      }
    }
  }
}
</script>

<style lang="scss">
@mixin text-break {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mint-loadmore-content.is-dropped {
  transition: 0.5s;
}
* {
  box-sizing: border-box;
}
::-webkit-scrollbar { display: none; }
.mint-button--small {
  padding: 0;
}
.mint-button--primary {
  background-color: rgb(255, 140, 7);
}
.mint-button--default {
  color: rgb(51, 51, 51);
  background-color: #fff;
  box-shadow: 0 0 1px rgb(221, 221, 221);
}
html, body {
  height: 100%;
  overflow: hidden;
}
body {
  font-size: 0.32rem;
}
#mj-container {
  height: 100%;
}
.roomList-head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  background-color: #fff;
}
.roomList-search {
  display: flex;
  height: 1.6rem;
  font-size: 0.373333rem;
  padding: 0.4rem;
  border-bottom: 1px solid rgb(221, 221, 221);
  .search-city {
    height: 0.8rem;
    line-height: 0.8rem;
    width: 2.0rem;
    color: rgb(51, 51, 51);
    .search-city-icon {
      display: inline-block;
      vertical-align: top;
      width: 0.213333rem;
      height: 0.8rem;
      background-image: url(./assets/images/city-selected-icon.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
    }
  }
  .search-input {
    position: relative;
    flex: 1;
    background-color: rgb(242, 242, 242);
    height: 0.8rem;
    border-radius: 0.4rem;
    .search-icon {
      position: absolute;
      top: 0.2rem;
      left: 0.32rem;
      width: 0.4rem;
      height: 0.4rem;
      background-image: url(./assets/images/search-icon.png);
      background-size: 100%;
    }
    p {
      line-height: 0.8rem;
      color: #ccc;
      padding-left: 0.88rem;
    }
  }
}
.top-select {
  display: flex;
  align-items: center;
  height: 1.173333rem;
  justify-content: space-between;
  padding: 0.346667rem 0;
  border-bottom: 1px solid rgb(221, 221, 221);
  .select-item {
    width: 25%;
    text-align: center;
    line-height: 0.48rem;
    color: rgb(51, 51, 51);
    & + .select-item {
      border-left: 1px solid rgb(221, 221, 221);
    }
    &.active, &.selected {
      color: rgb(255, 140, 7);
    }
    &.active {
      .select-icon {
        background-image: url(./assets/images/top-select-icon-active.png);
      }
    }
    span {
      display: inline-block;
      vertical-align: top;
    }
    .select-text {
      max-width: 80%;
      @include text-break;
    }
    .select-icon {
      width: 0.213333rem;
      height: 0.48rem;
      background-image: url(./assets/images/top-select-icon.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
    }
  }
}
.select-list {
  width: 100%;
  top: 2.773333rem;
  background-color: #fff;
  .select-item {
    height: 0.933333rem;
    line-height: 0.933333rem;
    text-align: center;
  }
  .rentType-list, .price-list {
    input:checked + .select-item {
      color: rgb(255, 140, 7);
      background-color: rgb(242, 242, 242);
      background-image: url(./assets/images/selected-icon.png);
      background-repeat: no-repeat;
      background-size: 0.346667rem;
      background-position: 96% 48%;
    }
  }
  .district-list {
    display: flex;
    justify-content: center;
    height: 8.533333rem;
  }
  .district-item {
    width: 50%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    input:checked + .select-item {
      color: rgb(255, 140, 7);
      background-color: rgb(242, 242, 242);
    }
    &:first-child {
      border-right: 1px solid rgb(221, 221, 221);
      p.selected {
        color: rgb(255, 140, 7);
        background-color: rgb(242, 242, 242);
        background-image: none;
      }
    }
    &:last-child {
      input:checked + .select-item {
        background-image: url(./assets/images/selected-icon.png);
        background-repeat: no-repeat;
        background-size: 0.346667rem;
        background-position: 90% 48%;
      }
    }
    .select-item {
      padding-left: 0.8rem;
      text-align: left;
    }
  }
  .moreInfo-list {
    .moreInfo-item {
      margin-left: 0.4rem;
      padding-top: 0.4rem;
      padding-bottom: 0.133333rem;
      border-bottom: 1px solid rgb(242, 242, 242);
      &:last-child {
        border-bottom: none;
      }
      .moreInfo-title {
        margin-bottom: 0.4rem;
        color: rgb(153, 153, 153);
      }
      .moreInfo-options {
        display: inline-block;
        input {
          display: none;
          &:checked + span {
            color: #fff;
            background-color: rgb(255, 140, 7);
            box-shadow: none;
          }
        }
        span {
          display: block;
          width: 2.0rem;
          height: 0.64rem;
          line-height: 0.64rem;;
          margin-right: 0.266667rem;
          margin-bottom: 0.266667rem;
          box-shadow: 0 0 1px rgb(221, 221, 221);
          border-radius: 0.64rem;
          background-color: #fff;
          font-size: 0.32rem;
          text-align: center;
          // &.selected {
          //   color: #fff;
          //   background-color: rgb(255, 140, 7);
          //   box-shadow: none;
          // }
        }
      }
      .moreInfo-btn {
        display: inline-block;
        width: 2.0rem;
        height: 0.64rem;
        margin-right: 0.266667rem;
        margin-bottom: 0.266667rem;
        box-shadow: 0 0 1px rgb(221, 221, 221);
        border-radius: 0.64rem;
        background-color: #fff;
        font-size: 0.32rem;
        &.selected {
          color: #fff;
          background-color: rgb(255, 140, 7);
          box-shadow: none;
        }
      }
    }
    .moreInfo-checkBtn {
      display: flex;
      justify-content: space-between;
      padding: 0.32rem 0.4rem;
      box-shadow: 0 0 0.48rem rgb(221, 221, 221);
      .mint-button {
        height: 0.96rem;
        border-radius: 0.96rem;
        .mint-button-text {
          font-size: 0.373333rem;
        }
      }
      .mint-button--default {
        box-shadow: 0 0 1px rgb(153, 153, 153);
        width: 3.466667rem;
      }
      .mint-button--primary {
        width: 5.066667rem;
      }
    }
  }
  input {
    display: none;
  }
}
.roomList-body {
  padding-top: 2.773333rem;
  height: 100%;
}
.roomList-container {
  overflow-x: hidden;
  overflow-y: scroll;
  .all-loaded {
    height: 1.333333rem;
    line-height: 1.333333rem;
    text-align: center;
  }
  .mint-loadmore-tips {
    .icon {
      display: inline-block;
      transition: transform 0.3s;
      margin-right: 0.24rem;
    }
    .rotate {
      transform: rotate(-180deg);
    }
  }
}
.roomList-item {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0.32rem 0;
  padding-right: 0.4rem;
  margin-left: 0.4rem;
  border-bottom: 1px solid rgb(242, 242, 242);
  .room-pic {
    width: 3.36rem;
    height: 2.533333rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .room-info {
    width: 5.84rem;
    padding-left: 0.346667rem;
    line-height: 1;
    & > div {
      @include text-break;
    }
  }
  .room-name {
    font-size: 0.4rem;
    margin-bottom: 0.213333rem;
  }
  .room-layout {
    color: rgb(153, 153, 153);
    margin-bottom: 0.373333rem;
  }
  .room-price {
    color: rgb(238, 117, 0);
    margin-bottom: 0.426667rem;
  }
  .room-address {
    display: flex;
    justify-content: space-between;
    line-height: 0.426667rem;
    .room-address-text {
      color: #999;
      @include text-break;
    }
  }
  .fullRent-tips {
    width: 1.333333rem;
    height: 0.426667rem;
    padding: 0;
    font-size: 0.266667rem;
    border-radius: 0.213333rem;
  }
}
.cityList {
  width: 100%;
  height: 100%;
  padding-top: 1.333333rem;
  .cityList-head {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.4rem 0;
    font-size: 0.48rem;
    text-align: center;
    border-bottom: 1px solid rgb(221, 221, 221);
    .close-btn {
      position: absolute;
      top: 0.48rem;
      left: 0.4rem;
      width: 0.32rem;
      height: 0.32rem;
      background: url(./assets/images/close.png) center no-repeat;
      background-size: 100%;
    }
  }
  .cityList-container {
    height: 100%;
    margin-left: 0.64rem;
    overflow-x: hidden;
    overflow-y: scroll;
    font-size: 0.426667rem;
    .cityList-tab {
      padding: 0.4rem 0;
      color: rgb(153, 153, 153);
      border-bottom: 1px solid rgb(238, 238, 238);
    }
    .cityList-item {
      padding: 0.4rem 0;
    }
  }
}
.search-popup {
  width: 100%;
  height: 100%;
  padding-top: 1.6rem;
  .search-head {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.4rem;
    display: flex;
    font-size: 0.373333rem;
    border-bottom: 1px solid rgb(221, 221, 221);
    .search-input {
      position: relative;
      flex: 1;
      background-color: rgb(242, 242, 242);
      height: 0.8rem;
      padding: 0.2rem ;
      border-radius: 0.4rem;
      .search-icon {
        position: absolute;
        top: 0.2rem;
        left: 0.32rem;
        width: 0.4rem;
        height: 0.4rem;
        background-image: url(./assets/images/search-icon.png);
        background-size: 100%;
      }
      input {
        width: 100%;
        line-height: 0.4rem;
        font-size: 0.32rem;
        background-color: transparent;
        padding-left: 0.88rem;
        &::-webkit-search-cancel-button {
          display: none;
        }
      }
      .icon {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        border-radius: 50%;
        width: 0.4rem;
        height: 0.4rem;
        background-image: url(./assets/images/search-remove-btn.png);
        background-size: 100%;
      }
    }
    .back {
      width: 1.173333rem;
      line-height: 0.8rem;
      text-align: right;
    }
  }
  .search-container {
    .title {
      color: #999;
      padding: 0.4rem;
      line-height: 0.4rem;
      .remove-icon {
        float: right;
        width: 0.32rem;
        height: 0.4rem;
        background-image: url(./assets/images/remove-icon.png);
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .search-history {
      padding-left: 0.4rem;
    }
    .mint-button {
      padding: 0 0.4rem;
      height: 0.64rem;
      border-radius: 0.32rem;
      margin-right: 0.24rem;
      margin-bottom: 0.24rem;
      font-size: 0.32rem;
    }
  }
  .search-roomList {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
.roomList-noData {
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;
  background-color: #edeff2;
  .content {
    width: 10.0rem;
    height: 7.52rem;
    padding-top: 4.5rem;
    background-image: url(./assets/images/no-data.png);
    background-size: 75%;
    background-position: top;
    background-repeat: no-repeat;
    text-align: center;
  }
}
.res-msg {
  border-radius: 0.4rem;
  padding: 0.266667rem;
  line-height: 1.5;
  color: #fff;
  background-color: rgba(0, 0, 0, .6);
  text-align: center;
}

.icon-location {
  display: inline-block;
  background: url(./assets/images/location.png) no-repeat center center;
  background-size: contain;
  width: 0.32rem;
  height: 0.32rem;
  position: relative;
  top: 2px;
}
</style>
