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
  routes // short for routes: routes
  // mode: 'history'
})

Vue.prototype.back = function () {
  router.back()
}
Vue.prototype.feeChange = function (num) {
  var options = { style: 'currency', currency: 'CNY' }
  return num.toLocaleString('zn-CN', options)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
