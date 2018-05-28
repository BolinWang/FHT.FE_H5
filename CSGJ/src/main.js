import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import 'lib-flexible'
import router from './router'
import { ConfirmPlugin, ToastPlugin, DatetimePlugin, Group, Cell, ViewBox, XHeader } from 'vux'
import store from './store'
import BaiduMap from 'vue-baidu-map'
import VuePreview from '@/components/upload/Preview/plugins'

FastClick.attach(document.body)

Vue.config.productionTip = false

const vm = new Vue({
  el: '#app-box',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// vux全局注册
Vue.use(vm)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(DatetimePlugin)
Vue.use(VuePreview)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'tg1a3V6x83iiFGHSrTWukgyKrNP10T8'
})

Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('view-box', ViewBox)
Vue.component('x-header', XHeader)

