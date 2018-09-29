import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import 'lib-flexible'
import router from './router'
import { ConfirmPlugin, ToastPlugin, DatetimePlugin, Group, Cell, ViewBox, XHeader } from 'vux'

FastClick.attach(document.body)
// development引用vconsole
// eslint-disable-next-line
// process.env.ENV_CONFIG !== 'prod' && require('@/utils/vconsole').default
Vue.config.productionTip = false

const vm = new Vue({
  el: '#app-box',
  router,
  template: '<App/>',
  components: { App }
})

if (window.JSUserInfo) {
  const data = window.JSUserInfo.getHouseKeeperUserAction()
  localStorage.setItem('userData', data)
} else {
  localStorage.setItem('userData', 'MTgwMTIzNDU2Nzg=')
}

Vue.use(vm)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(DatetimePlugin)

Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('view-box', ViewBox)
Vue.component('x-header', XHeader)
