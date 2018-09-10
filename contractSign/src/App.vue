<template>
  <div id="app">
    <!-- 合同查看 -->
    <pdfview v-if="active === 1"
      :paramsData="appParams.params"
      :contractData="contractData"
      @handleSign="gotoSign">
    </pdfview>
    <!-- 手写签名 -->
    <sign v-else-if="active === 2"
      :paramsData="appParams.params"
      :isIos="app_ios"
      :isAndriod="app_andriod"
      @handleReturnContract="refreshPage">
    </sign>
  </div>
</template>

<script>
import pdfview from '@/views/pdfview'
import sign from '@/views/sign'
import Bridge from '@/utils/bridge'
import { setUserData, getUserData } from '@/utils/auth'
import { contractApi } from '@/api/contract'
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
      contractData: {}
    }
  },
  created () {
    // 获取APP数据
    this.app_ios = userAgent.indexOf('fht-ios') > -1
    this.app_andriod = userAgent.indexOf('fht-android') > -1
    this.initApp()
    let _this = this
    if (this.app_ios === true) {
      Bridge.callHandler('getParamsFromNative', {}, function responseCallback (responseData) {
        console.log(responseData)
        _this.appParams = responseData
        setUserData({
          sessionId: responseData.sessionId
        })
        this.getContractUrl()
      })
    } else if (this.app_andriod === true) {
      let getAndriodData = JSON.parse(window.SetupJsCommunication.getParamsFromNative())
      this.appParams = getAndriodData
      setUserData({
        sessionId: getAndriodData.sessionId
      })
      this.getContractUrl()
    } else {
      // this.$toast.fail('请在APP内打开')
      // return false
      this.appParams = {
        sessionId: 'kTUyG6xY7gZmBUiBvyU+a7+5vOotj0w5DS/+on09DM9LLKYnRZU8JoSdEOSGH9kMFAWqNRj29DtG1E/LPCbQzRUsEcEtwzNz2cvjbNeViB0701N12LXZKRCx+GVMSMxpALBSLwmdxsjuZj9BVePv02GsseNEtEm290FS0DOeVA8=',
        params: {
          contractNo: 'C20171129142514768766'
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
        mask: true,
        message: '加载中...'
      })
      if (!this.appParams.params || !this.appParams.params.contractNo) {
        this.$toast.fail('无合同号')
        return false
      }
      contractApi.queryContract({
        contractNo: this.appParams.params.contractNo,
        sessionId: getUserData().sessionId
      }).then(res => {
        this.contractData = res.data
      })
    },
    // 签约页面
    gotoSign () {
      this.active = 2
    },
    // 刷新页面
    refreshPage () {
      window.location.href = window.location.href
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
