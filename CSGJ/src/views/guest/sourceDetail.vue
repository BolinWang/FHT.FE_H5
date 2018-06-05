/*
 * @Author: chenxing 
 * @Date: 2018-05-15 11:07:11 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-05 14:55:51
 */

<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" >   
      <x-header 
      title="客源详情" 
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
      slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        <span slot="right">编辑</span>
      </x-header>
      <div class="guestStatus">
        <div>
          <span>已签约</span>
          <span>2018/08/01 12:00:00</span>
          <span>操作员：李四</span>
        </div>
        <div class="roomName">天天小区-3幢-1单元-2楼-203号房间A</div>
      </div>
      <div class="guestInfo">
        <div class="userInfo">
          <div class="half">
            <span>姓名：张三</span>
            <span class="gender">先生</span>
          </div>
          <div class="half">
            <span>手机号码：13812341234 <i class="iconfont"></i></span>
          </div>
          <div class="half">
            <span>来源：网络-58个人</span>
          </div>
          <div class="half">
            <span>意向度：<span>高</span></span>
          </div>
        </div>
        <div class="askInfo">
          <div class="line">
            <div class="half">
              房源类型：合租
            </div>
            <div class="half">
              月租金：<span class="text-danger">1000.00 ~ 2000.00</span>
            </div>
          </div>
          <div class="line">
            房源要求：
            <span>独卫</span>
            <span>厨房</span>
            <span>阳台</span>
            <span>飘窗</span>
          </div>
          <div class="line">
            位置需求（1）： 杭州市-西湖区-黄龙
          </div>
        </div>
      </div>
      <tab>
        <tab-item selected>跟进记录（5）</tab-item>
        <tab-item>带看记录（2）</tab-item>
      </tab>
      <ul class="recordNav">
        <li>
          <div class="line">
            <span>2018/08/01 12:00:00</span>
            <span>李四</span>
            <span>电话跟进</span>
          </div>
          <div class="line">
            备注：预约5号下午3点看房
          </div>
        </li>
      </ul>
      <div slot="bottom" class="bottomDiv">
        <flexbox :gutter="0">
          <flexbox-item class="btn-box">
            <div class="btn-item text-warning">跟进</div>
          </flexbox-item>
          <flexbox-item class="btn-box">
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
      sessionId: '',
      followInfos: []
    }
  },
  methods: {
    getDetail() {
      // let param = {
      //   guestSourceId: parseInt(this.$route.params.guestSourceId)
      // }
      // detailApi(param).then(res => {
      //   if (res.data && typeof res.data === 'object') {
      //     this.userForm = Object.assign(this.userForm, res.data)
      //     this.followInfos = res.data.followInfos
      //   }
      // }).catch(res => {
      //   this.$vux.toast.text(res.message)
      // })
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
    changeStatus() {
      this.$router.push({name: 'sourceFollow', params: {guestSourceId: this.$route.params.guestSourceId}})
    },
    sign() {
      this.$router.push({name: 'signContract', params: {guestSourceId: this.$route.params.guestSourceId}})
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
</style>
