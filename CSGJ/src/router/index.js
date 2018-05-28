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
      component: _import('test')
    },
    {
      path: '/landlord',
      component: _import('default'),
      children: [
        { path: '', component: _import('landlord/index'), name: 'landlordIndex' },
        { path: 'person', component: _import('landlord/person'), name: 'person' },
        { path: 'company', component: _import('landlord/company'), name: 'company' }
      ]
    },
    {
      path: '/house',
      component: resolve => require(['@/views/default'], resolve),
      // component: resolve => require(['@/views/house/index'], resolve),
      // name: 'houseIndex',
      children: [
        {
          path: '',
          // component: _import('house/index'),
          component: resolve => require(['@/views/house/index'], resolve),
          name: 'houseIndex'
        },
        {
          path: 'searchHouse',
          component: resolve => require(['@/views/house/searchHouse'], resolve),
          // component: _import('house/searchHouse'),
          name: 'searchHouse',
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: 'searchMap',
          // component: _import('house/searchMap'),
          component: resolve => require(['@/views/house/searchMap'], resolve),
          name: 'searchMap',
          meta: {
            keepAlive: false // 需要被缓存
          }
        },
        {
          path: 'addHouse',
          component: resolve => require(['@/views/house/addHouse'], resolve),
          name: 'addHouse',
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: 'editHouse',
          component: resolve => require(['@/views/house/editHouse'], resolve),
          name: 'editHouse'
        },
        {
          path: 'photoDetail',
          component: resolve => require(['@/views/house/photoDetail'], resolve),
          name: 'photoDetail'
        }
      ]
    },
    {
      path: '/workbench',
      component: _import('default'),
      children: [
        { path: '', component: _import('workbench/index'), name: 'workbenchIndex' }
      ]
    },
    {
      path: '/guest',
      component: _import('default'),
      children: [
        { path: '', component: _import('guest/index'), name: 'sourceList' },
        { path: 'addSource/:guestSourceId', component: _import('guest/addSource'), name: 'addSource' },
        { path: 'sourceDetail/:guestSourceId', component: _import('guest/sourceDetail'), name: 'sourceDetail' },
        { path: 'sourceFollow/:guestSourceId', component: _import('guest/sourceFollow'), name: 'sourceFollow' },
        { path: 'signContract/:guestSourceId', component: _import('guest/signContract'), name: 'signContract' }
      ]
    },
    {
      path: '/mine',
      component: _import('default'),
      children: [
        { path: '', component: _import('mine/index'), name: 'mineIndex' },
        { path: 'password', component: _import('mine/password'), name: 'password' }
      ]
    }
  ]
})
