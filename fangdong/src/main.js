import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import store from './store'
import 'lib-flexible'
import router from './router'
import { setSessionId, getSessionId } from '@/utils/auth'
import { ToastPlugin } from 'vux'

Vue.use(ToastPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

const vm = new Vue({
  el: '#app-box',
  router,
  store,
  template: '<App/>',
  components: { App }
})

Vue.use(vm)

const urlSearchParams = {}
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

const app_sessionId = unescape(urlSearchParams.sessionId || urlSearchParams.sessionid)
if (app_sessionId && app_sessionId !== 'undefined') {
  store.state.user.isApp = urlSearchParams.platform || urlSearchParams.appversion
  setSessionId(app_sessionId)
  store.state.user.sessionId = app_sessionId
}
// APP 已登录
if (store.state.user.isApp) {
  vm.$router.push({ path: '/landlord' })
} else {
  // 非APP
  // 已登录过
  if (getSessionId()) {
    vm.$router.push({ path: '/landlord' })
  } else {
    if (vm.$route.path !== '/login' && vm.$route.path !== '/') {
      vm.$router.push({ path: '/' })
    }
  }
}

router.beforeEach((to, from, next) => {
  // APP 已登录
  if (store.state.user.isApp) {
    if (to.path === '/login' || to.path === '/') {
      next('/landlord')
    } else {
      next()
    }
    return
  }
  // 已登录过
  if (getSessionId()) {
    if (to.path === '/login' || to.path === '/') {
      next('/landlord')
    } else {
      next()
    }
  } else {
    if (to.path === '/login' || to.path === '/') {
      next()
    } else {
      next('/')
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
    (function() {
      document.getElementById('fht_baidu_tj') &&
        document.getElementById('fht_baidu_tj').remove()
      let hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?6c601e3344a569ba05401d32b7ab52a1'
      hm.id = 'fht_baidu_tj'
      let s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
  }, 0)
})

/**
 * 挂载toast
 */
Vue.prototype.showToast = function(
  params = {
    text: '',
    type: 'cancel',
    position: 'middle',
    width: 'auto'
  }
) {
  this.$vux.toast.show({
    position: params.position,
    text: params.text,
    type: params.type,
    width: params.width
  })
}
