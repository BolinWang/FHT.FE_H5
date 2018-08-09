<template>
  <div id="mj-container">
    <div class="mj-head" v-if="showHead">
      <span class="back-btn" @click="goBack"></span>
      房间详情
    </div>
    <div class="goBack" @click="goBack" v-else><i class="back-btn"></i></div>
    <div class="swiper-container" v-if="picList.length">
      <img v-if="picList.length == 1" :src="picList[0].src" alt="" @click="showPhoto(0)">
      <swiper :options="swiperOption" ref="picList" v-else>
        <swiper-slide
          v-for="(item, index) in picList">
          <img :src="item.src" alt="" @click="showPhoto(index)">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="room-intro" v-if="price">
      <p class="room-price">
        {{price}}元/月起
        <span class="side-btn" @click="$modal.show('payway-modal')">付款方式<i class="icon"></i></span>
      </p>
      <p class="room-name">{{name}}</p>
    </div>
    <div class="room-intro" v-if="type==2 && houseType">
      <div class="room-intro-title">房源信息</div>
      <div class="room-info-list">
        <div>
          <span>户型</span> {{houseType}}
        </div>
        <div>
          <span>装修</span> {{decorationDegree}}
        </div>
        <div>
          <span>面积</span> {{roomArea}}m²
        </div>
        <div>
          <span>朝向</span> {{roomDirection}}
        </div>
        <div>
          <span>楼层</span> {{floor}}层
        </div>
        <div>
          <span>编号</span> {{roomCode}}
        </div>
      </div>
    </div>
    <div class="room-intro device-box" v-if="deviceList.length || publicDeviceList.length">
      <div v-if="type==1">
        <div class="room-intro-title">
          房间设施
        </div>
        <div class="facility-list">
          <div 
            class="facility-item"
            v-for="(item, index) in showDeviceList">
            <div v-if="item.type == -1" @click="$modal.show('device-modal')">
              <img :src="require(`../assets/images/estate-service/more.png`)" alt="">
              <p>{{item.name}}</p>
            </div>
            <div v-else>
              <img :src="require(`../assets/images/estate-service/${item.type}.png`)" alt="">
              <p>{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="nowDevice==0">
          <div class="room-intro-title">
            房间设施
            <span class="side-btn" v-if="publicDeviceList.length" @click="nowDevice=1">公共区域<i class="icon"></i></span>
          </div>
          <div class="facility-list">
            <div 
              class="facility-item"
              v-for="(item, index) in showDeviceList">
              <div v-if="item.type == -1" @click="$modal.show('device-modal')">
                <img :src="require(`../assets/images/device-${item.type}.png`)" alt="">
                <p>{{item.name}}</p>
              </div>
              <div v-else>
                <img :src="require(`../assets/images/device-${item.type}.png`)" alt="">
                <p>{{item.name}}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="room-intro-title">
            公共设施
            <span class="side-btn" v-if="deviceList.length" @click="nowDevice=0">房间设施<i class="icon"></i></span>
          </div>
          <div class="facility-list">
            <div 
              class="facility-item"
              v-for="(item, index) in showPublicDeviceList">
              <div v-if="item.type == -1" @click="$modal.show('device-modal')">
                <img :src="require(`../assets/images/device-${item.type}.png`)" alt="">
                <p>{{item.name}}</p>
              </div>
              <div v-else>
                <img :src="require(`../assets/images/device-${item.type}.png`)" alt="">
                <p>{{item.name}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="room-intro device-box" v-if="serviceList.length">
      <div>
        <div class="room-intro-title">
          生活服务
        </div>
        <div class="facility-list">
          <div 
            class="facility-item"
            v-for="(item, index) in showServiceList">
            <div v-if="item.type == -1" @click="$modal.show('service-modal')">
              <img :src="require(`../assets/images/estate-service/more.png`)" alt="">
              <p>{{item.name}}</p>
            </div>
            <div v-else>
              <img :src="require(`../assets/images/estate-service/${item.type}.png`)" alt="">
              <p>{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="room-intro" v-if="roomDesc">
      <div class="room-intro-title">房间描述</div>
      <div class="room-description" :class="[isMuchWords && !showMuchWords ? 'text-break' : '']" v-html="roomDesc" ref="roomDesc">
      </div>
      <div class="switch-description" v-if="isMuchWords">
        <span @click="showMuchWords=!showMuchWords">详情</span>
      </div>
    </div>
    <div class="room-intro" v-if="address">
      <div class="room-intro-title">地理位置</div>
      <p class="room-address">{{address}}</p>
      <div id="map_content" class="map_content"></div>
    </div>
    <div class="room-intro" v-if="similarRoomList.length">
      <div class="room-intro-title">为您推荐</div>
      <ul class="similar-room-list">
        <li 
        class="similar-room-item"
        v-for="item in similarRoomList">
          <a :href="`./?type=${type}&roomId=${item.id}`">
            <img :src="item.pic" alt="">
            <p>{{item.price}}元/月起</p>
            <p class="similar-room-address">{{item.address}}</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="fixed-footer" v-if="isRent">
      <span class="btn btn-disabled">已出租</span>
    </div>
    <div class="fixed-footer" v-else>
      <a class="btn btn-default" :href="`tel:${phone}`">联系房东</a>
      <span class="btn btn-primary" @click="$modal.show('booking-modal')">{{isIntel =='bolin' ? '自助看房' : '预约看房'}}</span>
      <span class="btn btn-info" @click="onlineOrder" v-show="clientType=='h5'">在线预订</span>
    </div>
    <modal 
      class="mj-modal payway-modal" 
      name="payway-modal"
      width="100%"
      height="100%">
      <div class="modal-head">
        付款方式
        <span class="close-btn" @click="$modal.hide('payway-modal')"></span>
      </div>
      <div class="modal-container">
        <ul>
          <li 
          class="modal-list-item payway-item"
          v-for="item in payway">
            <div class="f-row">
              <span>{{item.name}}</span>
              <span>¥ {{item.price}} /月起</span>
            </div>
            <div class="s-row">
              {{item | paywayFormat}}
            </div>
          </li>
        </ul>
      </div>
    </modal>
    <modal 
      class="mj-modal device-modal" 
      name="device-modal"
      width="100%"
      height="100%">
      <div class="modal-head">
        房间设施
        <span class="close-btn" @click="$modal.hide('device-modal')"></span>
      </div>
      <div class="modal-container">
        <ul>
          <li 
          class="modal-list-item"
          v-for="item in deviceList"
          >
            <div class="device-row">
              <span>{{item.name}}</span>
              <span>
                <img v-if="type==1" :src="require(`../assets/images/estate-service/${item.type}.png`)" alt="">
                <img v-else :src="require(`../assets/images/device-${item.type}.png`)" alt="">
              </span>
            </div>
          </li>
        </ul>
      </div>
    </modal>
    <modal 
      class="mj-modal device-modal" 
      name="service-modal"
      width="100%"
      height="100%">
      <div class="modal-head">
        生活服务
        <span class="close-btn" @click="$modal.hide('service-modal')"></span>
      </div>
      <div class="modal-container">
        <ul>
          <li 
          class="modal-list-item"
          v-for="item in serviceList"
          >
            <div class="device-row">
              <span>{{item.name}}</span>
              <span>
                <img :src="require(`../assets/images/estate-service/${item.type}.png`)" alt="">
              </span>
            </div>
          </li>
        </ul>
      </div>
    </modal>
    <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div ref="pswp" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        <!-- Background of PhotoSwipe. 
             It's a separate element as animating opacity is faster than rgba(). -->
        <div class="pswp__bg"></div>
        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">
            <!-- Container that holds slides. 
                PhotoSwipe keeps only 3 of them in the DOM to save memory.
                Don't modify these 3 pswp__item elements, data is added later on. -->
            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>
            <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
            <div class="pswp__ui pswp__ui--hidden">
                <div class="pswp__top-bar">
                    <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                    <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                          <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div> 
                </div>
                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                </button>
                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                </button>
                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>
                <div class="pswp__counter"></div>
            </div>
        </div>
    </div>
    <modal
      class="mj-modal booking-modal" 
      name="booking-modal"
      width="100%"
      height="100%"
      @opened="opened"
      @before-close="beforeClose">
      <div class="mj-head">
        <span class="back-btn" @click="$modal.hide('booking-modal')"></span>
        预约看房
      </div>
      <booking-room 
        :type="type"
        :roomId="roomId"
        :roomName="name" 
        :pic="picList[0]" 
        :price="price"
        :address="address"
        :houseType="houseType"
        :decorationDegree="decorationDegree"
        :roomArea="roomArea"
        :apiAddr="apiAddr"
        :clientType="clientType"
        :isIntel="isIntel">
      </booking-room>
    </modal>
  </div>
</template>

<script>

import BookingRoom from './BookingRoom.vue'
import { Toast } from 'mint-ui'
import axios from 'axios'

const DecorationList = ['', '毛坯', '简装', '精装修', '豪华装'];
const RoomDirection = ['', '朝南', '朝北', '朝东', '朝西', '东南', '西南', '东北', '西北'];

/* 检测IOS9+ */
function isIOS9() {
    //获取固件版本
    var getOsv = function () {
        var reg = /OS ((\d+_?){2,3})\s/;
        if (navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
            var osv = reg.exec(navigator.userAgent);
            if (osv.length > 0) {
                return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.');
            }
        }
        return '';
    };
    var osv = getOsv();
    var osvArr = osv.split('.');
    //初始化显示ios9引导
    if (osvArr && osvArr.length > 0) {
        if (parseInt(osvArr[0]) >= 9) {
            return true
        }
    }
    return false
}

export default {
  data() {
    return {
      apiAddr: 'api',
      clientType: 'h5',
      isIntel: '',
      type: null,
      roomId: null,
      picList: [],
      name: '',
      phone: '',
      price: '',
      keyID:"",
      houseType: '',
      decorationDegree: '',
      roomArea: '',
      roomDirection: '',
      floor: '',
      roomCode: '',
      roomDesc: '',
      address: '',
      isRent: false,
      coordinate: [],
      payway: [],
      similarRoomList: [],
      nowDevice: 0,
      serviceList: [],
      deviceList: [],
      publicDeviceList: [],
      swiperOption: {
        loop : true,
        autoplay: {
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
      },
      isMuchWords: false,
      showMuchWords: false,
      showHead: false,
      bodyFixed: false
    }
  },
  computed: {
    showDeviceList() {
      if(this.deviceList.length > 6){
        let arr = this.deviceList.slice(0, 5);
        arr.push({
          type: -1,
          name: '更多'
        });
        return arr;
      } else {
        return this.deviceList;
      }
    },
    showPublicDeviceList() {
      if(this.publicDeviceList.length > 6){
        let arr = this.publicDeviceList.slice(0, 5);
        arr.push({
          type: -1,
          name: '更多'
        });
        return arr;
      } else {
        return this.publicDeviceList;
      }
    },
    showServiceList() {
      if(this.serviceList.length > 6){
        let arr = this.serviceList.slice(0, 5);
        arr.push({
          type: -1,
          name: '更多'
        });
        return arr;
      } else {
        return this.serviceList;
      }
    }
  },
  methods: {
    initRoomInfo() {
      if(location.search){
        let searchObj = {};
        let searchArr = location.search.slice(1).split('&');
        for (let i = 0; i < searchArr.length; i++) {
          if(searchArr[i].split("=")[1]){
            searchObj[searchArr[i].split("=")[0]] = unescape(searchArr[i].split("=")[1]);
          }
        }
        this.type = searchObj['type'];
        this.roomId = searchObj['roomId'];
        this.apiAddr = searchObj['memorhomeHost'] || 'api';
        this.clientType = searchObj['clientType'] || 'h5';
        this.isIntel = searchObj['isIntel'];
        this.keyID=searchObj['keyID'];
        if(this.type && this.roomId){
          this.getRoomInfo();
        } else {
          Toast({
            message: '没有该房间信息',
            duration: 3000
          });
        }
      }
    },
    getRoomInfo() {
      if(this.type == 2){
        this.sendReq('https://' + this.apiAddr + '.mdguanjia.com/myhome/api/house', {
          "v": "1.0",
          "method": "queryHouseRoomDetail",
          "params": {
            "devId": "5555998cccf2492db015c442f087f00a",
            "roomId": this.roomId
          }
        }).then((res) => {
          if(res.data.code == 0){
            let o = res.data.data;
            o.similarRoomList.forEach((item, index) => {
              this.similarRoomList.push({
                id: item.roomId,
                pic: item.imageUrl,
                price: item.minRentPrice,
                address: item.region
              });
            });
            o.images.forEach((item, index) => {
              this.picList.push({
                src: item.replace('http:', 'https:').replace('memorhome', 'mdguanjia'),
                w: 750,
                h: 560
              });
            });
            o.rentTypes.forEach((item, index) => {
              this.payway.push({
                name: item.name,
                price: item.rentPrice,
                deposit: item.depositPrice,
                period: [item.period[0], item.period[item.period.length - 1]],
                serviceFee: item.serviceChargePrice
              });
            });
            if(o.privateFacilityItems){
              o.privateFacilityItems.forEach((item, index) => {
                this.deviceList.push({
                  type: item.type,
                  name: item.name
                });
              });
            }
            if(o.facilityItems){
              o.facilityItems.forEach((item, index) => {
                this.publicDeviceList.push({
                  type: item.type,
                  name: item.name
                })
              });
            }
            this.price = o.price;
            this.name = o.houseName;
            this.phone = o.contactMobile;
            this.roomDesc = o.houseDesc;
            this.houseType = o.houseType;
            this.decorationDegree = DecorationList[o.decorationDegree];
            this.roomArea = o.houseArea;
            this.roomDirection = RoomDirection[o.roomDirection];
            this.floor = o.floorName;
            this.roomCode = o.roomCode;
            this.address = o.address;
            this.coordinate.push(o.longitude);
            this.coordinate.push(o.latitude);
            this.isRent = o.hasRent || false;
          } else {
            Toast({
              message: res.data.message,
              duration: 3000
            });
          }
        }).catch((err) => { console.log(err) });
      } else {
        this.sendReq('https://' + this.apiAddr + '.mdguanjia.com/myhome/api/estate', {
          "v": "2.3",
          "method": "eRoomTypeDetail",
          "params": {
            "devId": "5555998cccf2492db015c442f087f00a",
            "estateRoomTypeId": this.roomId,
          }
        }).then((res) => {
          if(res.data.code == 0){
            let o = res.data.data;
            o.imageUrls.forEach((item, index) => {
              this.picList.push({
                src: item.replace('http:', 'https:').replace('memorhome', 'mdguanjia'),
                w: 750,
                h: 560
              });
            });
            o.rentTypes.forEach((item, index) => {
              this.payway.push({
                name: item.name,
                price: item.rentPrice,
                deposit: item.depositPrice,
                period: [item.period[0], item.period[item.period.length - 1]],
                serviceFee: item.serviceChargePrice
              });
            });
            o.services.forEach((item, index) => {
              this.deviceList.push({
                type: item.code,
                name: item.name
              });
            })
            o.storeServices.forEach((item, index) => {
              this.serviceList.push({
                type: item.code,
                name: item.name
              });
            })

            this.price = o.rentPrice;
            this.name = o.estateName;
            this.phone = o.telephone;

            this.houseType = o.minChamber + '室';
            this.decorationDegree = DecorationList[3];
            this.roomArea = parseFloat(o.minRoomArea).toFixed(2);
            this.roomDesc = o.desc;
            this.address = o.address;
            this.coordinate.push(o.longitude);
            this.coordinate.push(o.latitude);
            this.isRent = o.hasRent || false;
          } else {
            Toast({
              message: res.data.message,
              duration: 3000
            });
          }
        }).catch((err) => { console.log(err) });
      }
    },
    showPhoto(i) {
      var options = {
        index: i,
        loop: false
      };
      this.openPhotoSwipe(this.$refs.pswp, this.picList, options);
    },
    onlineOrder() {
      if(isIOS9()){
        window.location.href = 'https://actlink.mdguanjia.com/appdownload/index.html?roomId='+this.roomId+'&housingType=' + this.type + '&clientType=' + this.clientType;
      }else{
        window.location.href = 'https://www.mdguanjia.com/appdownload/index.html?roomId='+this.roomId+'&housingType=' + this.type + '&clientType=' + this.clientType;
      }
    },
    goBack() {
      history.go(-1);
    },
    opened() {
      this.$nextTick(() => {
        this.bodyFixed = true;
      })
    },
    beforeClose() {
      this.bodyFixed = false;
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
            title: '帮助中心',
            share_img: 'https://www.mdguanjia.com/waptest/houseInfo/images/apple-touch-icon.png',
            share_desc:'麦滴管家帮助中心'
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
  filters: {
    paywayFormat(o) {
      return `租期:${o.period[0]}~${o.period[1]}个月  |  押金:¥${o.deposit} 起  |  服务费:¥${o.serviceFee}/月 起`;
    }
  },
  watch: {
    roomDesc(val) {
      if(val){
        this.$nextTick(() => {
          let rowHeight = document.documentElement.clientWidth / 10 * 0.48;
          if(this.$refs.roomDesc.offsetHeight > rowHeight * 3){
            this.isMuchWords = true;
          }
        });
      }
    },
    coordinate(val) {
      if(val.length){
        this.$nextTick(() => {
          /* 地图信息 */
          var map = new BMap.Map("map_content");
          var point = new BMap.Point(val[0],val[1]);
          map.centerAndZoom(point, 15);
          var marker = new BMap.Marker(point);  // 创建标注
          map.addOverlay(marker);               // 将标注添加到地图中
          map.disableDragging();
          map.disableScrollWheelZoom();
          map.disableDoubleClickZoom();
          marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        });
      }
    },
    deviceList(val) {
      this.nowDevice = !this.deviceList.length ? 1 : 0;
    },
    bodyFixed(val) {
      if(val){
        document.querySelectorAll('body')[0].classList.add('fixed')
      } else {
        document.querySelectorAll('body')[0].classList.remove('fixed')
      }
    }
  },
  created() {
    this.share();
    this.initRoomInfo();

  },
  mounted() {
    window.addEventListener('scroll', () => {
      let picHeight = document.documentElement.clientWidth / 10 * 7.49;
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      if(scrollTop > picHeight){
        this.showHead = true;
      } else {
        this.showHead = false;
      }
    })
    console.log(this.keyID)
    if (this.keyID) {

      let apiHost = this.memorhomeHost === 'api' ? 'flying-api' : 'test-flying-api'
      this.sendReq(`https://${apiHost}.mdguanjia.com/api/share/open`, {
        "params": {
          "key": this.keyID,
        }
      }).then((res) => {
         console.log(res)
      })
    }
  },
  components: {
    BookingRoom
  }
}
</script>

<style lang="scss">
@mixin bgFill($url) {
  background-image: url($url);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
@mixin multiple-text-break($line: 2) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* autoprefixer: off */
  -webkit-line-clamp: $line;
  /* autoprefixer: on */
  overflow: hidden;
}
* {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent; /* For some Androids */
  outline: none;
}
*,
*::before,
*::after {
    box-sizing: border-box;
}
::-webkit-scrollbar {
  display: none;
}
input,textarea,button { border: 0; margin: 0; padding: 0; font-family:"微软雅黑", "Helvetica Neue", Helvetica, STHeiTi, Arial, sans-serif;}
textarea { resize: none;}
table { border-collapse: collapse; border-spacing: 0; }
td, th { padding: 0; }
h1, h2, h3, h4, h5, h6, p, figure, form, blockquote { margin: 0; }
ul, ol, li, dl, dd { margin: 0; padding: 0; }
ul, ol { list-style: none; }
input::-moz-placeholder, textarea::-moz-placeholder { color: #ccc; }
input:-ms-input-placeholder, textarea:-ms-input-placeholder { color: #ccc; }
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { color: #ccc; }
a {
  text-decoration: none;
}
html {
  font-family: 'Microsoft YaHei';
  line-height: 1;
}
body {
  position: relative; 
  margin: 0;
  padding: 0;
  padding-bottom: 1.28rem;
  font-size: 0.32rem;
  color: #333;
  background-color: #fff;
  -webkit-overflow-scrolling: touch;
}
.fixed {
  position: fixed; 
  width: 100%;
}
.mj-head {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 1.28rem;
  line-height: 1.28rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: 0.426667rem;
  .back-btn {
    position: absolute;
    top: 0.4rem;
    left: 0.4rem;
    background-image: url(../assets/images/turn-back-b.png);
  }
}
.swiper-container {
  width: 100%;
  height: 7.493333rem;
  color: #fff;
  font-size: 0.373333rem;
  img {
    width: 100%;
    height: 100%;
  }
  .swiper-pagination {
    text-align: right;
    padding-right: 0.4rem;
  }
}
.room-intro {
  padding: 0.48rem 0;
  margin-left: 0.4rem;
  border-bottom: 1px solid #f2f2f2;
  font-size: 0.373333rem;
  .room-intro-title {
    font-size: 0.426667rem;
    font-weight: bold;
    margin-bottom: 0.48rem;
  }
  .room-price, .room-name {
    font-size: 0.48rem;
    line-height: 0.64rem;
  }
  .room-price {
    margin-bottom: 0.24rem;
    color: #ee7500;
  }
  .side-btn {
    font-weight: normal;
    display: inline-block;
    float: right;
    margin-right: 0.4rem;
    font-size: 0.32rem;
    line-height: 2;
    color: #ccc;
    .icon {
      display: inline-block;
      vertical-align: top;
      width: 0.373333rem;
      height: 0.64rem;
      background-image: url(../assets/images/icon-r.png);
      background-position: center;
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
  .room-info-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -0.32rem;
    div {
      width: 50%;
      margin-bottom: 0.32rem;
    }
    span {
      color: #ccc;
    }
  }
  .facility-list {
    text-align: center;
    .facility-item {
      width: 1.6rem;
      display: inline-block;
      img {
        width: 1.28rem;
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.32rem;
      }
    }
  }
  .room-description {
    line-height: 0.48rem;
    white-space: pre-line;
    padding-right: 0.4rem;
    text-align: justify;
    &.text-break {
      @include multiple-text-break(3);
    }
  }
  .switch-description {
    text-align: center;
    margin-top: 0.24rem;
    span {
      display: inline-block;
      width: 1.6rem;
      height: 0.64rem;
      line-height: 0.64rem;
      border-radius: 0.32rem;
      box-shadow: 0 0 1px rgba(0, 0, 0, .2);
    }
  }
  .similar-room-list {
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    font-size: 0;
  }
  .similar-room-item {
    display: inline-block;
    width: 6.4rem;
    font-size: 0.373333rem;
    margin-bottom: -0.24rem;
    margin-right: 0.4rem;
    img {
      width: 100%;
      height: 4.8rem;
      margin-bottom: 0.24rem;
    }
    p {
      color: #333;
      margin-bottom: 0.24rem;
    }
    .similar-room-address {
      color: #ccc;
    }
  }
  .map_content {
    width: 10.0rem;
    height: 7.2rem;
    margin-left: -0.4rem;
  }
  .room-address {
    margin-bottom: 0.32rem;
  }
}
.device-box {
  .side-btn {
    margin-top: -0.106667rem;
  }
}
.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 0.16rem 0.24rem;
  display: flex;
  align-items: center;
  .btn {
    flex: 1;
    margin: 0 0.16rem;
    height: 0.96rem;
    line-height: 0.96rem;
    border-radius: 0.16rem;
  }
}
.goBack {
  position: fixed;
  z-index: 50;
  top: 0.4rem;
  left: 0.4rem;
}
.back-btn {
  display: block;
  width: 0.4rem;
  height: 0.4rem;
  background-image: url(../assets/images/turn-back-w.png);
  background-size: cover;
}
.btn {
  text-align: center;
  color: #fff;
}
.btn-default {
  background-color: #f5f5f5;
  color: #333;
}
.btn-primary {
  background-color: #FFBE23;
}
.btn-info {
  background-color: #FF8C07;
}
.btn-disabled {
  background-color: #eee;
}
.mj-modal {
  .v--modal {
    border-radius: 0;
  }
  .modal-head {
    position: relative;
    font-size: 0.48rem;
    text-align: center;
    padding: 0.4rem;
    border-bottom: 1px solid #ddd;
    .close-btn {
      position: absolute;
      top: 0;
      left: 0;
      width: 1.28rem;
      height: 1.28rem;
      @include bgFill("../assets/images/close-btn.png");
    }
  }
}
.modal-list-item {
  padding: 0.4rem 0;
  margin: 0 0.4rem;
  border-bottom: 1px solid #ddd;
}
.payway-item {
  .f-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.373333rem;
    margin-bottom: 0.24rem;
  }
  .s-row {
    color: #999;
  }
}
.device-modal {
  .modal-head {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    background-color: #fff;
  }
  .modal-container {
    height: 100%;
    padding-top: 1.28rem;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
.device-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 1.28rem;
  }
}
.ripple-div {
  width: 100%;
  height: 1.28rem;
  line-height: 1.28rem;
  text-align: center;
  padding: 0 0.4rem;
  background-color: #ff0000;
  color: #fff;
}
.pswp__ui {
  .pswp__top-bar, .pswp__caption {
    background-color: transparent;
  }
  .pswp__button {
    float: left;
  }
  .pswp__counter {
    top: auto;
    bottom: 0;
  }
}
.booking-modal {
  .v--modal {
    padding-top: 1.28rem;
    background-color: #f5f5f5;
  }
  .mj-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
