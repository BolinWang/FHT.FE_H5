import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import 'lib-flexible'
import router from './router'
import { ConfirmPlugin, ToastPlugin, DatetimePlugin } from 'vux'

FastClick.attach(document.body)

Vue.config.productionTip = false

const vm = new Vue({
  el: '#app-box',
  router,
  template: '<App/>',
  components: { App }
})

Vue.use(vm)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(DatetimePlugin)

const urlSearchParams = {}
if (location.search.indexOf('?') !== -1) {
  const searchArr = location.search.substr(1).split('&')
  for (let i = 0; i < searchArr.length; i++) {
    if (searchArr[i].split('=')[1]) {
      urlSearchParams[searchArr[i].split('=')[0]] = unescape(searchArr[i].split('=')[1])
    }
  }
}
