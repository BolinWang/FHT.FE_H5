/*
 * @Author: chenxing 
 * @Date: 2018-04-23 17:40:16 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-08 17:07:43
 */
<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" title="房东" :left-options="{showBack: false}">
      </x-header>
      <div class="searchGray">
        <search :auto-fixed="false" 
          v-model="keyword" 
          placeholder="姓名/手机"
          @on-change="debounceSearch"
          @on-submit="searchParam"
          @on-clear="keyword = ''"
          @on-cancel="clearSearch">
        </search>
      </div>
      <ul class="landlordNav">
        <li v-for="(item, index) in orgList" :key="index">
          <div class="name">{{item.orgName}}</div>
          <div>
            <span @click="callMobile(item.orgMobile)">{{item.orgMobile | mobileStr}} <i class="iconfont icon-dianhua blue"></i></span>
            <span class="right blue" @click="addHouse(item.orgMobile)">录入房源</span>
          </div>
        </li>
      </ul>
      <footers :selectedIndex="2" slot="bottom"></footers>
    </view-box>
  </div>
</template>

<script>
import { Search, debounce } from 'vux'
import footers from '@/components/footer'
import { queryTempOrg } from '@/api/source'
import { plusXing, deepClone } from '@/utils'
import axios from 'axios'

export default {
  name: 'landlord',
  components: {
    Search,
    footers
  },
  created() {
    this.getData()
    window['backUrl'] = () => {
      return 'false'
    }
  },
  filters: {
    mobileStr(val) {
      return val ? plusXing(val, 3, 4) : ''
    }
  },
  data() {
    return {
      keyword: '',
      orgList: [],
      defaultData: []
    }
  },
  methods: {
    debounceSearch: debounce(function(){
      this.searchParam()
    }, 500),
    searchParam() {
      let arr = []
      this.defaultData.map(val => {
        if (val.orgName.indexOf(this.keyword) !== -1 || val.orgMobile.indexOf(this.keyword) !== -1) {
          arr.push(val)
        }
      })
      this.orgList = arr
    },
    getData() {
      const userData = JSON.parse(localStorage.getItem('userData')) || {}
      axios({
        url: 'http://test-flying-api.mdguanjia.com/api/user/queryTempOrg',
        method: 'post',
        data: {
          sessionId: userData.sessionId
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if (res.data.success) {
          this.orgList = res.data.data || []
          this.defaultData = deepClone(this.orgList)          
        } 
      }).catch(req => {
        this.$vux.toast.text('系统出错啦')
      })
    },
    clearSearch() {
      this.keyword = ''
      this.orgList = deepClone(this.defaultData)
    },
    callMobile(mobile) {
      if (mobile && window.call) {
        window.call.callAction(mobile)
      }
    },
    addHouse(mobile) {
      if (window.JSAddHouse) {
        window.JSAddHouse.addHouseAction(mobile)
      }
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .landlordNav {
    width: 100%;
    li {
      height: 55px;
      width: 100%;
      margin-bottom: 1px;
      padding: 5px 12px;
      background: #fff;
      color: #101010;
      font-size: 12px;
      .name {
        font-size: 14px;
      }
      .icon-dianhua {
        position: relative;
        top: 2px;
      }
    }
  }
</style>
