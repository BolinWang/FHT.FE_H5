/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-17 14:44:52
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-08-18 15:04:19
 */

import Vue from 'vue'
import router from './router'
import App from './App'
import 'lib-flexible/flexible'
import 'normalize.css/normalize.css'
import FastClick from 'fastclick'
import { Toast } from 'vant'
import { setUserData, getUserData } from '@/utils/auth'
import Bridge from '@/utils/bridge'
// development引用vconsole
// eslint-disable-next-line
process.env.NODE_ENV === 'development' && require('@/utils/vconsole').default

FastClick.attach(document.body)
Vue.config.productionTip = false

const vm = new Vue({
  el: '#app-box',
  router,
  components: { App },
  template: '<App/>'
})
Vue.use(vm)

/**
 * 挂载
 */
Vue.prototype.$toast = (method, text = '...') => {
  if (method) {
    try {
      Toast[method](text)
    } catch (error) {
      console.log(error)
    }
  } else {
    Toast(text)
  }
}

/**
 * 获取App数据
 */
let userAgent = navigator.userAgent
if (userAgent.includes('fht-ios')) {
  Bridge.callHandler('getParamsFromNative', {}, function responseCallback (responseData) {
    setUserData(responseData)
  })
} else if (userAgent.includes('fht-android')) {
  // eslint-disable-next-line
  let getAndriodData = JSON.parse(SetupJsCommunication.getParamsFromNative())
  setUserData(getAndriodData)
}

router.beforeEach((to, from, next) => {
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
    } else {
      next()
    }
  // APP外
  } else {
    if (!getUserDataFromLoacal.sessionId) {
      next('/login')
    } else {
      next()
    }
  }
})

/**
 * 百度统计
 */
router.afterEach((to, from, next) => {
  setTimeout(() => {
    // eslint-disable-next-line
    let _hmt = _hmt || [];
    (function () {
      document.getElementById('fht_baidu_tj') &&
        document.getElementById('fht_baidu_tj').remove()
      let hm = document.createElement('script')
      hm.src = ''
      hm.id = 'fht_baidu_tj'
      let s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
  }, 0)
})
