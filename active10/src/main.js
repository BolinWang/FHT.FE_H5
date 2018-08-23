/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-17 14:44:52
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-08-23 15:34:46
 */

import Vue from 'vue'
import App from './App'
import 'lib-flexible/flexible'
import 'normalize.css/normalize.css'
import FastClick from 'fastclick'
import { Toast } from 'vant'
import { setUserData } from '@/utils/auth'
import Bridge from '@/utils/bridge'
// development引用vconsole
// eslint-disable-next-line
process.env.NODE_ENV === 'development' && require('@/utils/vconsole').default

FastClick.attach(document.body)
Vue.config.productionTip = false

const vm = new Vue({
  el: '#app-box',
  components: { App },
  template: '<App/>'
})
Vue.use(vm)

/**
 * 挂载
 */
Vue.prototype.$window = window
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
