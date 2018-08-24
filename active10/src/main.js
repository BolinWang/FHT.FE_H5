/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-17 14:44:52
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-08-24 09:40:51
 */

import Vue from 'vue'
import App from './App'
import 'lib-flexible/flexible'
import 'normalize.css/normalize.css'
import FastClick from 'fastclick'
import { Toast } from 'vant'
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
