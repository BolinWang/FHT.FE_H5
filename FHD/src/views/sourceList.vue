/*
 * @Author: chenxing 
 * @Date: 2018-04-23 17:40:16 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-05-07 10:42:38
 */
<template>
  <div>
    <sticky>
      <div class="header">
        <h2>{{userName}}</h2>
        <h3>欢迎登陆城市管家</h3>
        <div class="head-rightBtn" @click="loginOut">退出</div>
      </div>
    </sticky>
    <div>
      <tab class="tabNav" bar-position="top">
        <tab-item :selected="active === 0" @on-item-click="tabChange">房源</tab-item>
        <tab-item :selected="active === 1" @on-item-click="tabChange">客源</tab-item>
      </tab>
    </div>
    <div v-show="active === 1" class="searchDiv">
      <search :auto-fixed="false" 
        v-model="keyWord" 
        placeholder="姓名/手机" 
        @on-submit="searchParam"
        @on-clear="clearSearch"
        @on-cancel="clearSearch">
      </search>
    </div>
    <ul class="userNav" v-show="active == 0" style="margin-top:10px">
      <li v-for="(item, key) in userList" @click="runAs(item)" :key="key">
        <div class="userLeft">
          <div class="name width100">{{item.relateName}}</div>
          <div class="mobile width100">{{item.relateMobile}}</div>
        </div>
        <i class="iconfont icon-youjiantou"></i>
      </li>
      <i class="iconfont icon-wushuju" v-show="userShow"></i>
    </ul>
    <ul class="userNav" v-show="active == 1">
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
    <div class="fixedBottm" v-show="active === 1 && fixedFlag">
      <button type="button" class="btn" @click="toAdd">新增客源</button>
    </div>
  </div>
</template>

<script>
import { Sticky, Tab, TabItem, Search } from 'vux'
import { queryListByPageApi, getApi, getUserNameApi } from '@/api/source'

export default {
  components: {
    Sticky,
    Tab,
    TabItem,
    Search
  },
  mounted() {
    const bodyHeight = document.body.clientHeight
    window.onresize = () => {
      let newHeight = document.body.clientHeight
      if (bodyHeight > newHeight) {
        this.fixedFlag = false
      } else {
        this.fixedFlag = true
      }
    }
    this.sessionId = this.$route.params.sessionId
    if (this.sessionId) {
      localStorage.setItem('sessionId', this.sessionId)
    }
    window['backUrl'] = () => {
      return 'false'
    }
    this.searchParam()
    this.getUserName()
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
      listData: [],
      userList: [],
      fixedFlag: true,
      userShow: false,
      listShow: false
    }
  },
  methods: {
    loginOut() {
      this.$vux.confirm.show({
        title: '提示',
        content: '确定退出当前账号吗？',
        onConfirm() {
          window.JSLogout.logOutAction()
        }
      })
    },
    clearSearch() {
      this.keyWord = ''
      this.searchParam()
    },
    toDetail(item) {
      this.$router.push({name: 'sourceDetail', params: {guestSourceId: item.guestSourceId}})
    },
    tabChange(index) {
      this.active = index
      if (index === 0) {
        this.houseSearch()
      } else {
        this.searchParam()
      }
    },
    runAs(item) {
      JSRunAs.runAsAction(item.relateMobile)
    },
    getUserName() {
      const param = {
        sessionId: this.sessionId
      }
      getUserNameApi(param).then(res => {
        if (res.data) {
          this.userName = res.data.name || ''
        }
      }).catch(res => {})
    },
    houseSearch() {
      getApi({}).then(res => {
        if (res.data && res.data.cityManagers) {
          this.userList = res.data.cityManagers || []
          this.userShow = this.userList.length > 0 ? false : true
        }
      }).catch(res => {
        this.$vux.toast.text(res.message)
      })
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
  .userNav {
    padding-bottom: 100px;
    li {
      width: 100%;
      float: left;
      margin-bottom: 10px;
      position: relative;
      padding: 10px 30px;
      box-sizing: border-box;
      background-color: #fff;
      display:flex;/*Flex布局*/
      align-items:center;/*指定垂直居中*/
      .icon-youjiantou {
        position: absolute;
        right: 10px;
        color: #ccc;
        top: 25px;
      }
      .userLeft {
        width: 300px;
        line-height: 40px;
        .left;
        .name{
          width: 140px;
          .left;
        }
        .gender{
          width: 100px;
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
        width: 40px;
        height: 40px;
        background: #4680FF;
        line-height: 44px;
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
        width: 340px;
        text-align: center;
        line-height: 60px;
        padding-right: 10px;
        .right;
      }
    }
  }
  .addList { 
    position:fixed;
    width: 100px;
    height: 100px;
    bottom: 50px;
    left:50%;
    margin-left: -50px;
    color: #4680FF;
    z-index: 3;
    i {
      font-size: 100px;
    }
  }
</style>
