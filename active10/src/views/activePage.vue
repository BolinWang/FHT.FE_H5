<template>
  <div class="page_container">
    活动
  </div>
</template>

<script>
import { getWxShareInfo } from '@/utils/wxshare'
import { getUserData } from '@/utils/auth'
import Bridge from '@/utils/bridge'

const initPageInfo = {
  title: '麦邻租房',
  shareData: {
    title: '麦邻生活',
    introduction: '麦邻生活',
    thumbnail: '',
    linkUrl: ''
  }
}

export default {
  name: 'activePage',
  components: {

  },
  data () {
    return {

    }
  },
  created () {
    let userAgent = navigator.userAgent
    let getUserDataFromLoacal = getUserData() || {}
    // APP内
    if (getUserDataFromLoacal.v && getUserDataFromLoacal.platform) {
      // 未登录
      if (!getUserDataFromLoacal.sessionId) {
        if (userAgent.includes('fht-android')) {
          // eslint-disable-next-line
          MLActivityLogin.callAppLogin()
        } else {
          Bridge.callHandler('loginAction', {}, function responseCallback (responseData) {
            window.location.href = './index.html'
          })
        }
      }
    // APP外
    } else {
      if (!getUserDataFromLoacal.sessionId) {
        this.$router.push('/login')
      }
    }
    this.initApp()
  },
  mounted () {
    this.$nextTick(function () {
      getWxShareInfo(initPageInfo.shareData)
    })
  },
  methods: {
    /**
     * 注册IOS/Andriod方法，获取页面信息
     */
    initApp () {
      Bridge.registerhandler('initPageInfo', (data, responseCallback) => {
        responseCallback(initPageInfo)
      })
      if (navigator.userAgent.includes('fht-android')) {
        // eslint-disable-next-line
        SetupJsCommunication.initPageInfo(
          JSON.stringify(initPageInfo)
        )
      }
    }
  }
}
</script>

<style>

</style>
