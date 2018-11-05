<template>
  <div id="app">
    <activePage v-if="active === 1" :params="urlSearchParams"></activePage>
    <login v-else-if="active === 2"
      @handleEmit="handleLogin">
    </login>
  </div>
</template>

<script>
import activePage from '@/views/activePage'
import login from '@/views/login'
import { getWxShareInfo } from '@/utils/wxshare'
import { getBrowser } from '@/utils/browser'
import { setUserData, getUserData } from '@/utils/auth'
import Bridge from '@/utils/bridge'

// 获取客户端类型
const browser = getBrowser()
console.log(browser)

// APP分享信息
const initPageInfo = {
  title: '麦邻租房',
  shareData: {
    title: '麦邻租房',
    introduction: '麦邻租房',
    thumbnail: '',
    linkUrl: location.href
  }
}
const userAgent = navigator.userAgent.toLocaleLowerCase()

export default {
  name: 'app',
  components: {
    activePage,
    login
  },
  data () {
    return {
      active: 0, // 0：无， 1：activePage  2: login
      urlSearchParams: {}, // search 数据
      app_ios: false, // ios
      app_andriod: false, // andriod
      isAPP: false // 是否APP内
    }
  },
  created () {
    // 获取search数据
    let urlSearchParams = {}
    if (location.search.indexOf('?') !== -1) {
      const searchArr = location.search.substr(1).split('&')
      for (let i = 0; i < searchArr.length; i++) {
        if (searchArr[i].split('=')[1]) {
          urlSearchParams[searchArr[i].split('=')[0]] = unescape(
            searchArr[i].split('=')[1]
          )
        }
      }
    }
    this.urlSearchParams = urlSearchParams
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
          _this.initActive()
          _this.initApp()
        })
      } else if (this.app_andriod === true) {
        // eslint-disable-next-line
        let getAndriodData = JSON.parse(window.SetupJsCommunication.getParamsFromNative())
        setUserData(getAndriodData)
        this.initActive()
        this.initApp()
      } else {
        this.initActive()
        this.initApp()
      }
      this.initApp()
    },
    /**
     * 判断登录状态
     */
    initActive () {
      let getUserDataFromLoacal = getUserData() || {}
      // 未登录
      if (!getUserDataFromLoacal.sessionId) {
        // TODO something you need of outlogin
        this.active = 2
        let bridgeParam = {
          libCode: 5001,
          refresh: true
        }
        if (this.app_andriod === true) {
          window.SetupJsCommunication.jumpToNativePages(JSON.stringify(bridgeParam))
        } else if (this.app_ios === true) {
          Bridge.callHandler('jumpToNativePages', bridgeParam, function responseCallback (responseData) {
            window.location.href = window.location.href
          })
        } else {
          console.log('H5')
        }
      } else {
        // TODO something you need of login
        this.active = 1
      }
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
    },
    // emit
    handleLogin () {
      this.active = 1
    }
  }
}
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
