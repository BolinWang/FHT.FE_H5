/*
 * @Author: chenxing 
 * @Date: 2018-05-15 11:07:11 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-07-23 09:27:02
 */

<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" >   
      <x-header 
      title="客源详情" 
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
      slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        <div slot="right">编辑</div>
      </x-header>
      <div class="guestStatus">
        <div>
          <span class="statusSpan">已签约</span>
          <span class="time">2018/08/01 12:00:00</span>
          <span class="right editUser">操作员：李四</span>
        </div>
        <div class="roomName text-danger">天天小区-3幢-1单元-2楼-203号房间A</div>
      </div>
      <div class="guestInfo">
        <div class="userInfo flex">
          <div class="half">
            <span>姓名：张三 </span>
            <span class="gender">先生</span>
          </div>
          <div class="half">
            <span>手机号码：13812341234 <i class="iconfont icon-dianhua"></i></span>
          </div>
          <div class="half">
            <span>来源：网络-58个人</span>
          </div>
          <div class="half">
            <span>意向度：<span class="purpose">高</span></span>
          </div>
        </div>
        <div class="askInfo">
          <div class="line flex">
            <div class="half">
              房源类型：合租
            </div>
            <div class="half">
              月租金：<span class="text-danger">1000.00 ~ 2000.00</span>
            </div>
          </div>
          <div class="line resourceDiv">
            房源要求：
            <span>独卫</span>
            <span>厨房</span>
            <span>阳台</span>
            <span>飘窗</span>
          </div>
          <div class="line">
            位置需求（1）： 杭州市-西湖区-黄龙
          </div>
          <div class="line">
            位置需求（2）： 杭州市-西湖区-黄龙
          </div>
          <div class="line">
            位置需求（3）： 杭州市-西湖区-黄龙
          </div>
        </div>
      </div>
      <tab>
        <tab-item selected @on-item-click="handler(0)">跟进记录（5）</tab-item>
        <tab-item @on-item-click="handler(1)">带看记录（2）</tab-item>
      </tab>
      <ul class="recordNav" v-show="current === 0">
        <li>
          <div class="line">
            <span>2018/08/01 12:00:00 李四</span>
            <span class="right recordStatus">电话跟进</span>
          </div>
        </li>
        <li>
          <div class="line">
            <span>2018/08/01 12:00:00 李四</span>
            <span class="right recordStatus">电话跟进</span>
          </div>
          <div class="line">
            备注：预约5号下午3点看房
          </div>
        </li>
        <li>
          <div class="line">
            <span>2018/08/01 12:00:00 李四</span>
            <span class="right recordStatus">电话跟进</span>
          </div>
        </li>
      </ul>
      <ul class="recordNav" v-show="current === 1">
        <li>
          <div class="line">
            <span>2018/08/01 李四</span>
          </div>
          <div class="blue">天天小区-3幢-1单元-2楼-203号房间A</div>
          <div class="blue">天天小区-3幢-1单元-2楼-203号房间A</div>
        </li>
        
      </ul>
      <div slot="bottom" class="bottomDiv">
        <flexbox :gutter="0">
          <flexbox-item class="btn-box" @click.native="toFollow">
            <div class="btn-item text-warning">跟进</div>
          </flexbox-item>
          <flexbox-item class="btn-box" @click.native="toWatch">
            <div class="btn-item text-success">带看</div>
          </flexbox-item>
          <flexbox-item class="btn-box">
            <div class="btn-item blue">签约</div>
          </flexbox-item>
        </flexbox>
      </div>
    </view-box>
  </div>
</template>

<script>
import { XButton, Flexbox, FlexboxItem, Tab, TabItem } from 'vux'
import scroll from '@/components/scroll'
import { detailApi } from '@/api/source'

export default {
  name: 'source-detail',
  components: {
    XButton,
    scroll,
    Flexbox, 
    FlexboxItem,
    Tab, 
    TabItem
  },
  mounted() {
    window['backUrl'] = () => {
      this.goBack()
      return 'true'
    }
    this.getDetail()
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
    priceStatus(val) {
      let str = ''
      if (val.priceMin && val.priceMax) {
        str = `${val.priceMin}元 - ${val.priceMax}元`
      } else if (val.priceMin) {
        str = `${val.priceMin}元以下`
      } else if (val.priceMax) {
        str = `${val.priceMax}元以上`
      }else {
        str = '不限'
      }
      return str
    },
    typeStatus(val) {
      const status = ['整租', '合租']
      return val ? status[val - 1] : '整租'
    },
    requireStatus(val) {
      const status = ['', '独厨', '独卫']
      const valList = val ? val.split(',') : []
      let arr = []
      valList.map(v => {
        arr.push(status[v])
      })
      return arr.join(',')
    },
    listStatus(val) {
      const online = ['', '闲鱼', '58个人', '58企业', '赶集', '安居客', '网络搜索', '社交媒体（论坛、豆瓣等）', '麦邻生活', '官方微信', '其他渠道']
      const offline = ['', '蹲点截客', '企业客户', '小广告', '老客推荐']
      let str = ''
      if (val.source === 1) {
        str = '网络 - ' + (online[val.sourceType] || '')
      } else {
        str = '线下 - ' + (offline[val.sourceType] || '')
      }
      return str
    },
    areaStr(item) {
      let str = ''
      str = (item.zoneId ? (item.zoneName + ' - ') : '') + `${item.provinceName}${item.cityName}${item.regionName}`
      return str
    },
    followStr(item) {
      let str = ''
      const status = ['', '电话跟进', '带看中', '结束带看']
      if (item.mode === 0) {
        str = '新增'
      } else if (item.mode === 3 && item.modeType === 2) {
        str = '已签约'
      } else {
        str = status[item.mode]
      }
      return str
    }
  },
  data() {
    return {
      userForm: {
        name: '',
        gender: 1,
        mobile: '',
        intentionality: 2,
        source: '',
        sourceType: ''
      },
      current: 0,
      sessionId: '',
      followInfos: []
    }
  },
  methods: {
    getDetail() {
     
    },
    callMobile(mobile) {
      if (mobile && window.call) {
        window.call.callAction(mobile)
      }
    },
    goBack() {
      this.$router.push({name: 'sourceList'})
    },
    edit() {
      this.$router.push({name: 'addSource', params: {guestSourceId: this.$route.params.guestSourceId}})
    },
    handler(val) {
      this.current = val
    },
    toFollow() {
      this.$router.push({name: 'sourceFollow', params: {guestSourceId: this.$route.params.guestSourceId}})
    },
    toWatch() {
      this.$router.push({name: 'sourceWatch', params: {guestSourceId: this.$route.params.guestSourceId}})
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .btn-box {
    padding: 10px 0;
    background: #fff;
    &:last-child {
      .btn-item {
        border-right: none;
      }
    }
  }
  .btn-item {
    width: 100%;
    height: 100%;
    text-align: center;
    border-right: 1px solid #D9D9D9;
    font-size: 14px; 
  }
  .guestStatus {
    padding-left: 12px;
    padding-top: 6px;
    color: #666;
    font-size: 12px;
    background: #fff;
    margin-bottom: 3px;
    .statusSpan {
      border-radius: 4px;
      display: inline-block;
      padding: 0px 9px;
      background: #4680FF;
      color: #fff;
    }
    .time {
      padding-left: 10px;
    }
    .editUser {
      padding-right: 12px;
    }
    .roomName {
      line-height: 30px;
    }
  }
  .flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .guestInfo {
    background: #fff;
    padding-left: 12px;
    color: #666;
    margin-bottom: 3px;
    line-height: 22px;
    .icon-dianhua {
      color: #FF9800;
      position: relative;
      top: 2px;
    }
    .userInfo {
      border-bottom: 1px solid #D9D9D9;
      padding: 5px 0;
    }
    .half {
      width: 50%;
      height: 24px;
      line-height: 24px;
    }
    .gender {
      padding: 2px 8px;
      border: 1px solid #259B24;
      color: #259B24;
      border-radius: 4px;
    }
    .purpose {
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      display: inline-block;
      color: #fff;
      background: #FF9800;
    }
  }
  .resourceDiv {
    span {
      padding: 2px 8px;
      border: 1px solid #4680FF;
      color: #4680FF;
      border-radius: 4px;
      margin-right: 5px;
    }
  }
  .recordNav {
    padding-left: 12px;
    border-bottom: 1px solid #D9D9D9;
    background: #fff;
    li {
      font-size: 12px;
      width: 100%;
      border-bottom: 1px solid #D9D9D9;
      color: #666;
      padding: 7px 0;
      line-height: 20px;
      &:last-child {
        border-bottom: none;
      }
      .recordStatus {
        padding-right: 12px;
        color: #4680FF;
      }
    }
  }
</style>
