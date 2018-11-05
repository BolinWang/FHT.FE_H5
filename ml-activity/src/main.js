/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-17 14:44:52
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-10-18 14:19:40
 */

import Vue from 'vue'
import App from './App'
import 'lib-flexible/flexible'
import 'normalize.css/normalize.css'
import FastClick from 'fastclick'
import { Toast } from 'vant'
// development引用vconsole
// eslint-disable-next-line
process.env.ENV_CONFIG !== 'prod' && require('@/utils/vconsole').default

process.env.MOCK && require('./mock')

FastClick.attach(document.body)
Vue.config.productionTip = false

const vm = new Vue({
  el: '#app-box',
  components: { App },
  template: '<App/>'
})
Vue.use(vm)

Vue.prototype.$toast = Toast
