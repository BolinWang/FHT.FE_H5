<template>
  <div id="app">
    <activePage></activePage>
  </div>
</template>

<script>
import activePage from '@/views/activePage'
import { getWxShareInfo } from '@/utils/wxshare'
import { getBrowser } from '@/utils/browser'
import { setUserData } from '@/utils/auth'
import Bridge from '@/utils/bridge'

// 获取客户端类型
const browser = getBrowser()
console.log(browser)

// APP分享信息
const initPageInfo = {
  title: '麦邻租房',
  shareData: {
    title: '麦家公寓减房租了',
    introduction: '最高立减1000元房租！',
    thumbnail: './assets/shareImg.jpg',
    linkUrl: location.href
  }
}
const userAgent = navigator.userAgent.toLocaleLowerCase()

export default {
  name: 'app',
  components: {
    activePage
  },
  data () {
    return {
      active: 0, // 0：无， 1：activePage  2: login
      app_ios: false, // ios
      app_andriod: false, // andriod
      isAPP: false // 是否APP内
    }
  },
  created () {
    this.initPage()
  },
  mounted () {
    this.$nextTick(() => {
      getWxShareInfo(initPageInfo.shareData)
    })
  },
  methods: {
    initPage () {
      // 字符串查找不用includes  IOS8不兼容
      this.app_ios = userAgent.indexOf('fht-ios') > -1
      this.app_andriod = userAgent.indexOf('fht-android') > -1
      this.isAPP = this.app_ios || this.app_andriod
      /**
       * 获取App数据
       */
      let _this = this
      if (this.app_ios === true) {
        Bridge.callHandler('getParamsFromNative', {}, function responseCallback (responseData) {
          setUserData(responseData)
          _this.initApp()
        })
      } else if (this.app_andriod === true) {
        // eslint-disyouable-next-line
        let getAndriodData = JSON.parse(window.SetupJsCommunication.getParamsFromNative())
        setUserData(getAndriodData)
        this.initApp()
      } else {
        this.initApp()
      }
      this.initApp()
    },
    /**
     * 注册IOS/Andriod方法，获取页面信息
     */
    initApp () {
      if (this.app_ios === true) {
        Bridge.registerHandler('initPageInfo', (data, responseCallback) => {
          responseCallback(initPageInfo)
        })
        Bridge.registerHandler('refreshPage', (data, responseCallback) => {
          window.location.href = window.location.href
        })
      } else if (this.app_andriod === true) {
        // eslint-disable-next-line
        window.SetupJsCommunication.initPageInfo(
          JSON.stringify(initPageInfo)
        )
        window.refresh = () => {
          window.location.href = window.location.href
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
