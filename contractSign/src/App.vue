<template>
  <div id="app">
    <!-- 合同查看 -->
    <keep-alive>
      <pdfview v-if="active === 1"
        :paramsData="appParams"
        :isApp="isApp"
        :isIos="app_ios"
        :isAndriod="app_andriod"
        :contractData="contractData"
        @handleSign="gotoSign"
        @handleReturn="returnMethod">
      </pdfview>
    </keep-alive>
    <!-- 手写签名 -->
    <sign v-if="active === 2"
      :paramsData="appParams"
      :isApp="isApp"
      :isIos="app_ios"
      :isAndriod="app_andriod"
      @handleReturnContract="refreshPage"
      @handleReturn="returnMethod">
    </sign>
  </div>
</template>

<script>
import pdfview from '@/views/pdfview'
import sign from '@/views/sign'
import Bridge from '@/utils/bridge'
import { setUserData, getUserData } from '@/utils/auth'
import { contractApi } from '@/api/contract'
import { ObjectMap } from '@/utils/index'
const initPageInfoData = {
  title: '合同签约',
  shareData: {
    title: '麦邻租房',
    introduction: '麦邻租房-合同签约',
    thumbnail: 'https://www.mdguanjia.com/images/wx_share__ml.png',
    linkUrl: location.href
  }
}
let userAgent = navigator.userAgent.toLocaleLowerCase()
export default {
  name: 'app',
  components: {
    pdfview,
    sign
  },
  data () {
    return {
      appParams: {
        params: {}
      },
      active: 1,
      isApp: false,
      contractData: {}
    }
  },
  created () {
    // 获取APP数据
    this.app_ios = userAgent.indexOf('fht-ios') > -1
    this.app_andriod = userAgent.indexOf('fht-android') > -1
    this.isApp = this.app_ios || this.app_andriod
    this.initApp()
    let _this = this
    if (this.app_ios === true) {
      Bridge.callHandler('getParamsFromNative', {}, function responseCallback (responseData) {
        console.log(responseData)
        _this.appParams = responseData
        setUserData({
          sessionId: responseData.sessionId
        })
        _this.getContractUrl()
      })
    } else if (this.app_andriod === true) {
      let getAndriodData = JSON.parse(window.SetupJsCommunication.getParamsFromNative())
      this.appParams = getAndriodData
      setUserData({
        sessionId: getAndriodData.sessionId
      })
      this.getContractUrl()
    } else {
      // this.$toast.fail({
      //   duration: 0,
      //   message: '请在APP内打开'
      // })
      // return false
      this.appParams = {
        sessionId: '22Sw06rr9ggbUZx0q5uTYvFf9IZkXPMBtPcheaNeeF/fRk8efUuyya8TCK1jhMQlFAWqNRj29DtG1E/LPCbQzRUsEcEtwzNz2cvjbNeViB0xK6kBMqGWOnO8qLefuTNf/8gNphcPD8WgZKjS4sAhlHq0lLiOU3mf5V3CLNOsmFU=',
        params: {
          contractNo: 'C20180912104042621470'
        }
      }
      setUserData({
        sessionId: this.appParams.sessionId
      })
      this.getContractUrl()
    }
  },
  methods: {
    initApp () {
      if (this.app_ios === true) {
        Bridge.registerHandler('initPageInfo', (data, responseCallback) => {
          console.log('initPageInfo')
          responseCallback(initPageInfoData)
        })
        Bridge.registerHandler('refreshPage', (data, responseCallback) => {
          window.location.href = window.location.href
        })
      } else if (this.app_andriod === true) {
        window.SetupJsCommunication.initPageInfo(
          JSON.stringify(initPageInfoData)
        )
        window.refreshPage = () => {
          window.location.href = window.location.href
        }
      }
    },
    // 获取合同数据
    getContractUrl () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        mask: true,
        message: '数据加载中...'
      })
      console.log(this.appParams)
      if (!this.appParams.params || !this.appParams.params.contractNo) {
        this.$toast.fail('无合同号')
        return false
      }
      contractApi.queryContract({
        contractNo: this.appParams.params.contractNo,
        sessionId: getUserData().sessionId
      }).then(res => {
        this.$toast.clear()
        this.contractData = res.data
      })
    },
    // 签约页面
    gotoSign () {
      this.active = 2
    },
    // 合同页面初始化
    refreshPage () {
      this.active = 1
    },
    returnMethod (data) {
      const resource = this.appParams.resource || {}
      const emitParams = data.params || {}
      console.log(emitParams)
      // let resourceCode = Object.values(resource)[0]
      let resourceCode = resource.ml || resource.md
      let regionType = data.type || 'contract'
      /**
       * contract: 【返回】5000 销毁当前页面
       * sign:【签约成功】跳转APP相应页面
       */
      // 跳转码处理
      const routerCodeMap = {
        // 磐谷
        '6006': {
          libCode: 5017
        },
        // 确认订单界面-签约合同（普通合同）
        '6007': {
          libCode: 5010,
          subLibCode: 1
        },
        // 订单、合同签约
        '6015': {
          libCode: 5010,
          subLibCode: 1
        },
        '6017': {
          libCode: 5010,
          subLibCode: 1
        }
      }
      let bridgeParam = {
        libCode: 5000 // 返回销毁当前页面
      }
      // 签约成功，通知APP跳转相应code
      if (regionType === 'sign' && resourceCode && routerCodeMap[resourceCode]) {
        bridgeParam = {
          ...routerCodeMap[resourceCode],
          params: emitParams
        }
      }
      if (resourceCode * 1 === 6007) {
        bridgeParam = {
          ...routerCodeMap['6007']
        }
      }
      if (this.app_andriod === true) {
        window.SetupJsCommunication.jumpToNativePages(JSON.stringify(bridgeParam))
      } else if (this.app_ios === true) {
        Bridge.callHandler('jumpToNativePages', ObjectMap(bridgeParam), function responseCallback (responseData) {
          console.log(responseData)
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import './styles/index.scss';
#app {
  width: 750px;
}
</style>
