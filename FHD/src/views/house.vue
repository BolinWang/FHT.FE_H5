/*
 * @Author: chenxing 
 * @Date: 2018-04-23 17:40:16 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-11 12:01:24
 */
<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <div class="searchHead" slot="header">
        <div class="search" @click="toSearch">
          小区/公寓/房东/房东手机号码
        </div>          
      </div>
      <div class="resultScroll">
        <scroll :data="houseList" ref="scroll" @pullingUp="moreData" @pullingDown="refreshData">
          <ul class="houseNav">
              <li v-for="(item, index) in houseList" :key="index" @click="toHouse(item)">
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
      <footers :selectedIndex="1" slot="bottom"></footers>
    </view-box>
  </div>
</template>

<script>
import { Sticky, Tab, TabItem, Search } from 'vux'
import footers from '@/components/footer'
import { search } from '@/api/source'
import { plusXing } from '@/utils'
import scroll from '@/components/scroll'

export default {
  name: 'house',
  components: {
    Sticky,
    Tab,
    TabItem,
    Search,
    footers,
    scroll
  },
  filters: {
    mobileStr(val) {
      return val ? plusXing(val, 3, 4) : ''
    }
  },
  created() {
    this.getData()
    window['backUrl'] = () => {
      return 'false'
    }
  },
  data() {
    return {
      houseList: [],
      pageNo: 1
    }
  },
  methods: {
    toSearch() {
      this.$router.push({name: 'searchHouse'})
    },
    getData() {
      let param = {
        pageNo: this.pageNo,
        pageSize: 20
      }
      search(param).then(res => {
        if (this.pageNo === 1) {
          this.houseList = res.result
        } else {
          if (res.result && res.result.length > 0) {
            this.houseList = this.houseList.concat(res.result)
          } else {
            this.$refs.scroll.forceUpdate()
          }
        }
      }).catch(rep => {})
    },
    moreData(){
      this.pageNo++
      this.getData()
    },
    refreshData() {
      this.pageNo = 1
      this.getData()
    },
    toHouse(item) {
      if (window.HouseResouse) { //安卓方法
        window.HouseResouse.gotoRoomList(JSON.stringify(item))
      } 
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .resultScroll {
    height: 540px;
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
    padding: 0px 40px;
    padding-top: 10px;
    background: #4680FF;
    position: absolute;
    top: 0;
    z-index: 2;
  }
  .search {
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    background-color: rgba(112, 161, 255, 1);
    text-align: center;
    position: relative;
    top: -2px;
    font-size: 12px;
    color: #eee;
    display: inline-block;
  }
</style>
