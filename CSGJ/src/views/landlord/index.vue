<template>
  <div class="height100">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header title="房东管理" slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        <x-icon slot="overwrite-left" type="ios-search-strong" style="fill:#fff;position:relative;top:-8px;left:-3px;" size="30" @click="doSearch"></x-icon>
        <i class="iconfont icon-xinjian1" slot="right" @click="addNew"></i>
      </x-header>
      <tab>
        <tab-item selected @on-item-click="onItemClick">已审核</tab-item>
        <tab-item @on-item-click="onItemClick">处理中</tab-item>
      </tab>
      <scroll :pullUpLoad="false" @pullingDown="pullingDown" :data="listData">
        <ul class="userInfoNav" :class="{action: activeIndex === 1}">
          <li v-for="(item, key) in listData" @click="toDetail(item)" :key="key">
            <div class="userInfo">
              <span class="userType" :class="{company: item.type === 2}">{{item.type | typeStr}}</span>
              <span class="name">{{item.name}}</span>
              <span v-show="item.desc">（{{item.desc}}）</span>
            </div>
            <div class="contact">
              <div class="left">{{item.mobile | mobileStr}}
                <span v-show="item.mobileName">（{{item.mobileName}}）</span>
              </div>
              <div class="noCard" v-show="item.hasCard">银行卡未绑定</div>
            </div>
            <div class="actionStatus rightIcon" v-if="activeIndex === 1">
              <div class="statusText" :class="{statusError: item.status === 2}">{{item.status === 1 ? '审核中' : '审核未通过：具体原因'}}</div>
            </div>
          </li>
          <div class="clearfix"></div>
        </ul>
      </scroll>
      <actionsheet 
        v-model="showAdd" 
        :menus="menus" 
        @on-click-menu="clickMenu" 
        show-cancel>
        <div slot="header">请选择用户类型</div>
      </actionsheet>
      <div v-transfer-dom>
        <popup v-show="searchShow" 
        height="100%" position="top" 
        width="100%">
          <div>
            <search v-model="keyword" 
            ref="houseSearch"
            :auto-fixed="false"
            placeholder="房东姓名/企业名称"
            @on-change="keywordSearch"
            @on-cancel="hideSearch"></search>
            <ul class="userInfoNav">
              <li v-for="(item, key) in searchData" @click="toDetail(item)" :key="key">
                <div class="userInfo">
                  <span class="userType" :class="{company: item.type === 2}">{{item.type | typeStr}}</span>
                  <span class="name">{{item.name}}</span>
                  <span v-show="item.desc">（{{item.desc}}）</span>
                </div>
                <div class="contact">
                  <div class="left">{{item.mobile | mobileStr}}
                    <span v-show="item.mobileName">（{{item.mobileName}}）</span>
                  </div>
                  <div class="noCard" v-show="item.hasCard">银行卡未绑定</div>
                </div>
              </li>
              <div class="clearfix"></div>
            </ul>
          </div>
          
        </popup>
      </div>
      <footers :selectedIndex="0" slot="bottom"></footers>
    </view-box>
  </div>
</template>

<script>
import { Tab, TabItem, Popup, TransferDom, Search, debounce, Actionsheet } from 'vux'
import footers from '@/components/footer'
import scroll from '@/components/scroll'
import { queryListByPageApi } from '@/api/source'
import { plusXing } from '@/utils'
import { getCheckList } from '@/api/landlord'

export default {
  directives: {
    TransferDom
  },
  components: {
    footers,
    scroll,
    Tab, 
    TabItem,
    Popup,
    Search,
    Actionsheet
  },
  mounted() {
    // this.searchParam()
  },
  filters: {
    typeStr(val) {
      return val === 2 ? '企业' : '个人' 
    },
    mobileStr(val) {
      return plusXing(val, 3, 4)
    }
  },
  data() {
    return {
      activeIndex: 0,
      searchShow: false,
      showAdd: false,
      menus: {
        menu1: '个人用户',
        menu2: '企业用户'
      },
      keyword: '',
      searchData: [],
      listData: [{
        id: 1,
        type: 1, // 类别 1-个人,2-企业
        name: '张三',
        desc: '哈哈哈', // 备注
        mobile: 18912344321,
        hasCard: false,
        status: 1,
        auditReason: ''
      },{
        id: 2,
        type: 2,
        name: '阿里巴巴',
        desc: '',
        mobile: 18933552244,
        mobileName: '马云',
        hasCard: true,
        status: 2
      }]
    }
  },
  methods: {
    doSearch() {
      this.searchShow = true;
      this.$nextTick(() => {
        this.$refs.houseSearch.setFocus()
      })
    },
    onItemClick (index) {
      this.activeIndex = index
      let classify = index == 0 ? 2 : 1
      // this.searchParam(classify)
    },
    keywordSearch: debounce(function(){
     this.searchData = this.listData
    }, 500),
    hideSearch() {
      this.searchShow = false
      this.searchData = []
    },
    pullingDown() { //下拉刷新

    },
    toDetail(item) {
      console.log(item)
      let path = item.type === 1 ? '/person' : '/company'
      let name = item.type === 1 ? 'person' : 'company'
      this.$router.push({
        path: path, 
        name: name,
        params: item
      })
    },
    searchParam(classify = 2) {
      let self = this
      let params = {
        classify: classify,
        pageSize: 10,
        pageNum: 1
      }
      getCheckList(params).then(res => {
        self.listData = res.data
      })
    },
    addNew() { //新增
      this.showAdd = true
    },
    clickMenu(menuKey, menuItem) { //新增选择类型
      if (menuKey === 'menu1') {
        this.$router.push({name: 'person'})
      } else if (menuKey === 'menu2') {
        this.$router.push({name: 'company'})
      }
    },
    dataInit () {
      getCheckList().then(res => {
        if (res.data && res.data.content) {
        }
      }).catch(res => {
        this.$vux.toast.text(res.message)
      })
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  
  .userInfoNav {
    li {
      width: 100%;
      background: #fff;
      padding: 12px 0 0 12px;
      border-bottom: 1px solid #ddd;
      .userInfo {
        width: 100%;
        .userType {
          width: 40px;
          height: 20px;
          line-height: 18px;
          border: 1px solid #259B24;
          border-radius: 4px;
          color: #259B24;
          text-align: center;
          display: inline-block;
        }
        .company {
          border-color: #FF9800;
          color: #FF9800;
        }
        .name {
          padding: 0 5px;
          display: inline;
        }
      }
      .contact {
        width: 100%;
        padding: 10px 0 30px 0;
        height: 28px;
        color: #737373;
        .noCard {
          color: #4680FF;
          float: right;
          margin-right: 10px;
        }
      }  
    }
  }
  .action {
    li {
      border-bottom: none;
      margin-bottom: 5px;
      .actionStatus {
        width: 100%;
        height: 28px;
        line-height: 28px;
        border-top: 1px solid #ddd;
        color: #4680FF;
      }
      .statusError{
        color: #E51C23;
      }
    }
  }
</style>
