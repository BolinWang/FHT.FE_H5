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
          @on-change="keywordSearch"
          placeholder="小区名/房间号/房东">
        </search>
        <div>
          <house-list :data="searchData"></house-list>
        </div> 
      </div>
      <div class="searchGroup" v-show="tabIndex === 1">
        <div class="line">
          <div class="labelTitle">所属板块</div>
          <div class="cellRight hasIcon" @click="show = true">请选择</div>
        </div>
        <div class="line">
          <div class="labelTitle">小区名称</div>
          <input type="text" class="cellRight isInput" placeholder="请输入">
        </div>
        <div class="line">
          <div class="labelTitle">房间户型</div>
          <div class="cellRight hasIcon">请选择</div>
        </div>
        <div class="line">
          <div class="labelTitle">房间朝向</div>
          <div class="cellRight hasIcon">请选择（支持多选）</div>
        </div>
        <div class="line">
          <div class="labelTitle">月租金</div>
          <div class="cellRight hasIcon">请选择</div>
        </div>
        <div class="line">
          <div class="labelTitle">整租/合租</div>
          <div class="cellRight hasIcon">请选择</div>
        </div>
        <div class="line">
          <i class="iconfont icon-xuanzekuanghou" style="color: #ddd"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, XImg, Popup, TransferDom, Search, PopupHeader, debounce } from 'vux'
import scroll from '@/components/scroll'
import houseList from './components/houseList'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, 
    TabItem,
    scroll,
    XImg,
    Popup,
    Search,
    PopupHeader,
    houseList
  },
  mounted() {
  },
  data() {
    return {
      searchShow: false,
      tabIndex: 0,
      show: false,
      searchData: []
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
      this.searchData = [1, 2, 3] 
    }, 500),
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .search {
    width: 300px;
    height: 30px;
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
