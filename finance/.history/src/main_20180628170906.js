// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'
import '../rem'
// import router from './router'

Vue.config.productionTip = false

Vue.use(VueRouter)
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history' // 去掉地址中的'#' 以便接受微信登录授权回调参数
})

Vue.prototype.back = function () {
  router.back()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
