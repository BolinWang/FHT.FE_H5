<template>
  <div style="height:100%;background:#fff">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        <div class="search" slot="overwrite-left" @click="toSearch">
          搜索小区/公寓名称
        </div>
        <div slot="right" class="addIcon" @click="addHouse">
          <i class="iconfont icon-xinjian1" ></i>
        </div>
      </x-header>
      <house-list :data="[1, 2]"></house-list>
      <div @click="tooo" style="width:100px;height:50px;background:red">hh</div>
      {{imgSrc}}
      <input type="file" @change="showImg" id="fileinput" class="inputfile" multiple accept="image/*;" capture="camera">
      <img :src="imgSrc" alt="">
      <footers :selectedIndex="1" slot="bottom"></footers>
      <actionsheet 
        v-model="showAdd" 
        :menus="menus" 
        @on-click-menu="clickMenu"
        show-cancel>
        <div slot="header">请选择用户类型</div>
      </actionsheet>
    </view-box>
  </div>
</template>

<script>
import { Tab, TabItem, XImg, Actionsheet } from 'vux'
import footers from '@/components/footer'
import houseList from './components/houseList'

export default {
  components: {
    footers,
    Tab, 
    TabItem,
    XImg,
    houseList,
    Actionsheet
  },
  mounted() {
    window['backUrl'] = (str) => {
      this.$vux.toast.text(str)
      return 'true'
    }
    window['getImage'] = (str) => {
      this.$vux.toast.text(str)
      this.imgSrc = 'file://' + str
    }
  },
  data() {
    return {
      showAdd: false,
      menus: {
        menu1: '分散式整租',
        menu2: '分散式合租'
      },
      imgSrc: ''
    }
  },
  methods: {
    toSearch() {
      this.$router.push({name: 'searchHouse'})
    },
    addHouse() {
      this.showAdd = true
    },
    clickMenu(menuKey, menuItem) { //新增选择类型
      if (menuKey === 'menu1') {
        console.log('整租')
        this.$router.push({name: 'addHouse'})
      } else if (menuKey === 'menu2') {
        this.$router.push({name: 'addHouse'})
      }
    },
    tooo() {
      window.takePhoto.takePhotoAction()
    },
    showImg(e){
      this.imgSrc = e.target.value
      console.log(e.target.file)
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .search {
    width: 300px;
    height: 100%;
    line-height: 30px;
    padding-left: 30px;
    border-radius: 5px;
    background-color: rgba(112, 161, 255, 1);
    position: relative;
    top: -5px;
    &:after{
      content: '\e60a';
      font-family: "iconfont";
      position: absolute;
      left: 10px;
    }
  }
  .houseNav {
    padding: 0 12px;
    li {
      width: 100%;
      .houseTitle {
        margin: 5px 0;
        width: 100%;
        height: 28px;
        line-height: 28px;
        border-radius: 4px;
        color: rgba(16, 16, 16, 1);
        font-size: 12px;
        left: 6px;
        padding: 0 5px;
        background-color: rgba(242, 242, 242, 1);
        .left {
          width: 90%;
        }
        .right {
          width: 10%;
          text-align: right;
        }
      }
      .houseDetail{
        height: 84px;
        .detailImg {
          width: 112px;
          height: 84px;
          border-radius: 4px;
          position: relative;
          float: left;
          overflow: hidden;
          .houseImg {
            width: 100%;
            height: 100%;
          }
          &:after{
            content:'';
            position: absolute;
            right: -25px;
            bottom: -25px;
            width: 50px;
            height: 50px;
            font-size: 12px;
            display: inline-block;
            transform: rotate(-45deg);
            text-align: center;
            background: #E5E5E5;
          }
        }
        .hasImg {
          &:after{
            content:'有图';
            color: #4680FF;
          }  
        }
        .noImg {
          &:after{
            content:'无图';
            color:#E51C23;
          }
        }
        .detailRight {
          width: 212px;
          height: 84px;
          float: right;
          border-bottom: 1px solid #ddd;
          .roomName {
            font-size: 14px;
            color: #101010;
            width: 80%;
            float: left;
          }
          .roomStatus {
            width: 15%;
            float: right;
            color: #4680FF;
            font-size: 14px;
          }
          .area {
            font-size: 12px;
            color: #999;
            line-height: 35px;
          }
          .feature {
            padding: 3px 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            color: #999;
          }
        }
      }
    }
  }
  .popTop {
    width: 100%;
    height: 55px;
    background-color: #4680FF;
    ul.tab {
      padding-left: 60px;
      line-height: 35px;
      li {
        font-size: 16px;
        padding: 5px;
        color: #ddd;
        text-align: center;
        float: left;
        border-bottom: 2px solid #4680FF;
        &:first-child {
          margin-right: 50px;
        }
      }
      .active {
        border-bottom: 2px solid #fff;
        color: #fff;
        font-size: 18px;
      }
    }
    .cancel {
      color: #fff;
      width: 50px;
      float: right;
      font-size: 14px;
      text-align: center;
      line-height: 55px;
    }
  }
  .bgcolor {
    height: 100%;
    background: #4680FF;
  }
  .searchGroup {
    .line {
      width:  100%;
      height: 34px;
      padding: 2px 0;
    }
    .labelTitle {
      width: 80px;
      text-align: center;
      color: #fff;
      line-height: 30px;
      float: left;
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
  
</style>
