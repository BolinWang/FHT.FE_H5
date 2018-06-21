/*
 * @Author: chenxing 
 * @Date: 2018-04-23 17:40:16 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-13 15:49:50
 */
<template>
  <div class="height100">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header 
      title="签约" 
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
      slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
      <group class="noTop" label-width="80px">
        <cell title="选择房源" class="black" @click.native="showSearch = true" value-align="left" is-link>{{nameStr}}</cell>
      </group>
      <div slot="bottom" class="bottomDiv">
        <x-button type="primary" action-type="button" @click.native="saveData">下一步</x-button>
      </div>
    </view-box>
    <div v-transfer-dom>
      <popup v-model="showSearch" 
        position="right"
        width="100%"
        @on-hide="searchHide">
        <div class="searchBox">
          <div class="searchDiv">
            <search 
              :auto-fixed="false" 
              v-model="keyword" 
              placeholder="搜索房源"
              @on-change="debounceSearch" 
              @on-submit="searchParam">
            </search>
            <ul class="searchNav">
              <li class="ellipsis
              " v-for="(item, index) in searchList"
                :key=index
                @click="chooseHouse(item)">
                {{item.city}}-{{item.name}}
              </li>
              <li class="textCenter" v-show="noData">未查询到数据</li>
            </ul>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import {  Popup, TransferDom, Search, debounce, XButton } from 'vux'
import { houseApi } from '@/api/source'
import { deepClone } from '@/utils'

export default {
  name: 'sign-contract',
  directives: {
    TransferDom
  },
  components: {
    Search,
    XButton,
    Popup
  },
  mounted() {
    
    window['backUrl'] = () => {
      return 'true'
    }
  },
  data() {
    return {
      keyword: '',
      searchList: [],
      showSearch: false,
      noData: false,
      nameStr: ''
    }
  },
  methods: {
    searchHide() {
      this.searchList = []
      this.keyword = ''
      this.noData = false
    },
    debounceSearch: debounce(function(){
      this.searchParam()
    }, 500),
    searchParam(val) {
      if (this.keyword === ''){
        this.searchList = []
        return false
      }
      const param = {
        pageSize: 10,
        pageNo: 1,
        tags: ['fhd'],
        keyword: this.keyword
      }
      houseApi(param).then(res => {
        if (res.result && res.result.length > 0) {
          this.searchList = deepClone(res.result)
          this.noData = false
        } else {
          this.noData = true
          this.searchList = []
        }
      }).catch(res => {})
    },
    goBack() {
      this.$router.push({name: 'sourceDetail', params: {guestSourceId: this.$route.params.guestSourceId}})
    },
    chooseHouse(item) {
      this.nameStr = item.name
      this.roomName = item.roomName
      this.roomCode = item.roomCode
      this.showSearch = false
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .left {
    float: left;
  }
  .searchBox {
    width: 100%;
    .searchNav {
      width: 100%;
      padding: 20px 20px;
      li {
        width: 100%;
        height: 80px;
        line-height: 80px;
        .left;
      }
    }
  }
</style>
