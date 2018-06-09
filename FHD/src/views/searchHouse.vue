/*
 * @Author: chenxing 
 * @Date: 2018-04-23 17:40:16 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-09 16:57:15
 */
<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" title="搜索房源" :left-options="{showBack: false}">
        <div slot="right" @click="cancelSearch">取消</div>
      </x-header>
      <group class="noTop" label-width="90px">
        <x-input title="小区/公寓" v-model="searchData.estateName" placeholder="请输入"></x-input>
        <x-input title="房东/手机号" v-model="searchData.adminKeyword" placeholder="请输入"></x-input>
      </group>
      <div style="padding:15px;">
        <x-button type="primary" @click.native="searchParam">确定</x-button>
      </div>  
    </view-box>
    <div v-transfer-dom>
      <popup v-model="resultShow" width="100%" height="100%" position="right">
        <div class="searchHead">
          <i class="iconfont icon-zuojiantou" @click="hidePopup"></i>
          搜索结果
        </div>
        <div class="resultScroll">
          <scroll :data="resultList" ref="scroll" :pullDownRefresh="false" @pullingUp="moreData">
            <ul class="houseNav">
                <li v-for="(item, index) in resultList" :key="index" @click="toHouse(item)">
                <div class="blue">
                  <span v-if="item.housingType === 1" class="houseTypeSpan">集</span>
                  {{item.estateName}}
                </div>
                <div class="rightIcon">{{item.orgAdminName}} {{item.orgAdminMobile | mobileStr}}</div>
                <div>共{{item.totalRoomCount}}间，空房{{item.vacantRoomCount}}间</div>
              </li>
            </ul>
          </scroll>
        </div>
        
      </popup>
    </div>
  </div>
</template>

<script>
import { Search, XInput, XButton, Popup, TransferDom, PopupHeader } from 'vux'
import { plusXing, deepClone } from '@/utils'
import { search } from '@/api/source'
import scroll from '@/components/scroll'

export default {
  name: 'search-house',
  directives: {
    TransferDom
  },
  components: {
    Search,
    XInput,
    XButton,
    PopupHeader,
    Popup,
    scroll
  },
  filters: {
    mobileStr(val) {
      return val ? plusXing(val, 3, 4) : ''
    }
  },
  data() {
    return {
      searchData: {
        pageNo: 1,
        pageSize: 20,
        adminKeyword: '',
        estateName: ''
      },
      resultList: [],
      resultShow: false
    }
  },
  methods: {
    searchParam() {
      search(this.searchData).then(res => {
        if (this.searchData.pageNo === 1) {
          this.resultShow = true
          this.resultList = res.result || []
        } else {
          if (res.result && res.result.length > 0) {
            this.resultList = this.resultList.concat(res.result)
          } else {
            this.$refs.scroll.forceUpdate()
          }
        }
      }).catch(rep => {})
    },
    cancelSearch() {
      this.$router.go(-1)
    },
    toHouse(item) {
      if (window.HouseResouse) { //安卓方法
        window.HouseResouse.gotoRoomList(JSON.stringify(item))
      } 
    },
    moreData(){
      this.searchData.pageNo++
      this.searchParam()
    },
    hidePopup(){
      this.resultShow = false
      this.searchData.pageNo = 1
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .resultScroll {
    height: 575px;
  }
  .houseNav {
    li {
      width: 100%;
      height: 78px;
      background: #fff;
      margin-bottom: 1px;
      padding: 3px 12px;
      color: #666;
      line-height: 24px;
      .blue {
        font-size: 14px;
        font-weight: 700;
      }
      .houseTypeSpan {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 18px;
        color: #FF9800;
        display: inline-block;
        font-size: 12px;
        border: 1px solid #FF9800;
        border-radius: 4px;
        margin-right: 10px;
        position: relative;
        top: -2px;
      }
    }
  }
  .searchHead {
    width: 100%;
    height: 46px;
    text-align: center;
    line-height: 46px;
    background: #4680FF;
    color: #fff;
    font-size: 18px;
    position: relative;
    .icon-zuojiantou {
      position: absolute;
      left: -20px;
    }
  }
</style>
