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
