/*
 * @Author: chenxing 
 * @Date: 2018-04-23 17:40:16 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-08 11:21:13
 */
<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" title="意向客源" :left-options="{showBack: false}">
        <div slot="right" class="addIcon" @click="toAdd">
          <i class="iconfont icon-xinjian1" ></i>
        </div>
      </x-header>
      <sticky scroll-box="vux_view_box_body">
        <div class="searchGray">
          <search :auto-fixed="false" 
            v-model="keyWord" 
            placeholder="姓名/手机" 
            @on-submit="searchGuest"
            @on-clear="clearSearch"
            @on-cancel="clearSearch">
          </search>
        </div>
      </sticky>
      <div class="sourceScroll">
        <scroll :data="listData" ref="scroll" :pullDownRefresh="false" @pullingUp="moreData">
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
      </div>
      
      <footers :selectedIndex="3" slot="bottom"></footers>
    </view-box>
  </div>
</template>

<script>
import { Sticky, Tab, TabItem, Search } from 'vux'
import footers from '@/components/footer'
import { queryListByPageApi, getApi } from '@/api/source'
import scroll from '@/components/scroll'

export default {
  name: 'source-list',
  components: {
    Sticky,
    Tab,
    TabItem,
    Search,
    scroll,
    footers
  },
  mounted() {
    window['backUrl'] = () => {
      return 'false'
    }
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
      active: 1,
      pageNo: 1,
      listData: [],
      userList: [],
      userShow: false,
      listShow: false
    }
  },
  methods: {
    moreData() {
      this.pageNo++
      this.searchParam()
    },
    searchGuest() {
      this.pageSize = 1
      this.searchParam()
    },
    clearSearch() {
      this.keyWord = ''
      this.searchParam()
    },
    toDetail(item) {
      this.$router.push({name: 'sourceDetail', params: {guestSourceId: item.guestSourceId}})
    },
    runAs(item) {
      JSRunAs.runAsAction(item.relateMobile)
    },
    searchParam() {
      let param = {
        pageNo: this.pageNo,
        pageSize: 20,
        keyword: this.keyWord
      }
      queryListByPageApi(param).then(res => {
        if (res.data && res.data.content) {
          if (this.pageNo === 1) {
            this.listData = res.data.content || []
            this.listShow = this.listData.length > 0 ? false : true
          } else {
            if (res.data.content.length > 0) {
              this.listData = this.listData.concat(res.data.content)
            } else {
              this.$refs.scroll.forceUpdate()
            }
          }
          
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
  .sourceScroll {
    height: 494px;
  }
  .userNav {
    font-size: 12px;
    li {
      width: 100%;
      float: left;
      margin-bottom: 5px;
      position: relative;
      padding: 5px 15px;
      box-sizing: border-box;
      background-color: #fff;
      display:flex;/*Flex布局*/
      align-items:center;/*指定垂直居中*/
      .icon-youjiantou {
        position: absolute;
        right: 5px;
        color: #ccc;
        top: 12px;
      }
      .userLeft {
        width: 150px;
        line-height: 20px;
        .left;
        .name{
          width: 70px;
          .left;
        }
        .gender{
          width: 50px;
          .left;
        }
        .mobile {
          color:#666;
        }
        .width100 {
          width: 100%;
        }
      }
      .userStatus {
        .left;
        width: 20px;
        height: 20px;
        background: #4680FF;
        line-height: 22px;
        text-align: center;
        color:#fff;
      }
      .warn {
        background: red
      }
      .success{
        background: rgb(56, 224, 40);
      }
      .userRight {
        width: 170px;
        text-align: center;
        line-height: 30px;
        padding-right: 5px;
        .right;
      }
    }
  }
  .addList { 
    position:fixed;
    width: 50px;
    height: 50px;
    bottom: 25px;
    left:50%;
    margin-left: -25px;
    color: #4680FF;
    z-index: 3;
    i {
      font-size: 50px;
    }
  }
</style>
