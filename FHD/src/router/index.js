import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import')
Vue.use(Router)

export default new Router({
// 后退后页面位置
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/',
      name: 'index',
      component: _import('sourceList')
    },
    {
      path: '/sourceList/:sessionId',
      name: 'sourceList',
      component: _import('sourceList')
    },
    {
      path: '/addSource/:guestSourceId',
      name: 'addSource',
      component: _import('addSource')
    },
    {
      path: '/sourceDetail/:guestSourceId',
      name: 'sourceDetail',
      component: _import('sourceDetail')
    },
    {
      path: '/sourceFollow/:guestSourceId',
      name: 'sourceFollow',
      component: _import('sourceFollow')
    }
  ]
})
