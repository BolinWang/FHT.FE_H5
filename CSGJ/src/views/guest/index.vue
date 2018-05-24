/*
 * @Author: chenxing 
 * @Date: 2018-05-15 11:07:11 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-05-16 14:13:09
 */

<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" >   
      <x-header title="客源管理" slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        <x-icon slot="overwrite-left" type="ios-search-strong" style="fill:#fff;position:relative;top:-8px;left:-3px;" size="30" @click.native="setFocus"></x-icon>
        <x-icon slot="right" @click.native="toAdd" type="ios-plus-outline" style="fill:#fff;position:relative;top:-8px;right:-3px;font-weight:700" size="30"></x-icon>
      </x-header>
      <div class="search">
        <search 
        v-show="searchShow" 
        :auto-fixed="false" 
        v-model="keyWord" 
        ref="search"
        placeholder="姓名/手机" 
        @on-submit="searchParam"
        @on-clear="clearSearch"
        @on-cancel="clearSearch"></search>
      </div>
      <scroll :pullUpLoad="false" @pullingDown="pullingDown" :data="listData">
        <ul class="userNav">
          <li v-for="(item, key) in listData" @click="toDetail(item)" :key="key">
            <div class="userLeft">
              <div class="line">
                <div class="name ellipsis">{{item.name}}</div>
                <div class="gender">{{item.gender | genderStr}}</div>
              </div>
              <div class="mobile">{{item.mobile}}</div>
            </div>
            <div :class="['userStatus', item.intentionality == 1 ? 'success' : item.intentionality == 3 ? 'warn' : '']">
              {{item.intentionality | statusStr}}
              </div>
            <div class="userRight">{{item | listStatus}}</div>
            <i class="iconfont icon-youjiantou"></i>
          </li>
          <div class="clearfix"></div>
          <i class="iconfont icon-wushuju" v-show="listShow"></i>
        </ul>
      </scroll>
      <footers :selectedIndex="3" slot="bottom"></footers>
    </view-box>
  </div>
</template>

<script>
import { Search } from 'vux'
import footers from '@/components/footer'
import scroll from '@/components/scroll'
import { queryListByPageApi } from '@/api/source'

export default {
  components: {
    footers,
    scroll,
    Search
  },
  mounted() {
    this.searchParam()
  },
  filters: {
    genderStr(val) {
      const gender = ['先生', '女士']
      return val ? gender[val - 1] : '先生'
    },
    statusStr(val) {
      const status = ['低', '中', '高']
      return val ? status[val - 1] : '中'
    },
    listStatus(val) {
      let statusStr = ''
      switch (val.status) {
        case 0:
          statusStr = '新增'
          break
        case 1:
          const arr = ['', '电话-意向中', '电话-约带看', '电话-已签约', '电话-无效']
          statusStr = val.statusType ? arr[val.statusType] : '未知状态'
          break
        case 2:
          statusStr = val.statusType ? '带看-带看中' : '未知状态'
          break
        case 3:
          const arrs = ['', '结束带看-未签约', '结束带看-已签约']
          statusStr = val.statusType ? arrs[val.statusType] : '未知状态'
          break
        default:
          statusStr = '未知状态'
      }
      return statusStr
    }
  },
  data() {
    return {
      userName: '',
      keyWord: '',
      listShow: false,
      searchShow: false,
      listData: []
    }
  },
  methods: {
    setFocus () {
      this.searchShow = true
      let self = this
      setTimeout(function(){
        self.$refs.search.setFocus()
      },20)
      
    },
    pullingDown() { //下拉刷新
      this.searchParam()
    },
    clearSearch() {
      this.keyWord = ''
      this.searchParam()
      this.searchShow = false
    },
    toDetail(item) {
      this.$router.push({name: 'sourceDetail', params: {guestSourceId: item.guestSourceId}})
    },
    searchParam() {
      let param = {
        pageNo: 1,
        pageSize: 20,
        keyword: this.keyWord
      }
      queryListByPageApi(param).then(res => {
        if (res.data && res.data.content) {
          this.listData = res.data.content || []
          this.listShow = this.listData.length > 0 ? false : true
        }
      }).catch(res => {
        this.$vux.toast.text(res.message)
      })
    },
    toAdd() {
      this.$router.push({name: 'addSource', params: {guestSourceId: 0}})
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .tabNav {
    margin-top:10px;
  }
  .search {
    width: 100%;
    position: absolute;
    top:0;
    left: 0;
    z-index: 111;
  }

</style>
