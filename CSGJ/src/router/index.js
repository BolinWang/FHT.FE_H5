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
      component: _import('landlord/index')
    },
    {
      path: '/landlord',
      component: resolve => require(['@/views/default'], resolve),
      children: [
        { path: '', component: _import('landlord/index'), name: 'landlordIndex' },
        { path: 'person', component: _import('landlord/person'), name: 'person' },
        {
          name: 'company',
          path: 'company',
          component: resolve => { require(['@/views/landlord/company'], resolve) }
        },
        { path: 'bindingCard', component: _import('landlord/bindingCard'), name: 'bindingCard' }
      ]
    },
    {
      path: '/house',
      component: resolve => require(['@/views/default'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['@/views/house/index'], resolve),
          name: 'houseIndex'
        },
        {
          path: 'searchHouse',
          component: resolve => require(['@/views/house/searchHouse'], resolve),
          name: 'searchHouse',
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: 'searchMap',
          component: resolve => require(['@/views/house/searchMap'], resolve),
          name: 'searchMap'
        },
        {
          path: 'addHouse/:houseType',
          component: resolve => require(['@/views/house/addHouse'], resolve),
          name: 'addHouse',
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: 'editHouse/:houseType',
          component: resolve => require(['@/views/house/editHouse'], resolve),
          name: 'editHouse'
        },
        {
          path: 'roomDetail',
          component: resolve => require(['@/views/house/roomDetail'], resolve),
          name: 'roomDetail'
        },
        {
          path: 'addSuccess/:houseType',
          component: resolve => require(['@/views/house/addSuccess'], resolve),
          name: 'addSuccess'
        }
      ]
    },
    {
      path: '/workbench',
      component: _import('default'),
      children: [
				{ path: '', component: _import('workbench/index'), name: 'workbenchIndex' },
				{ path: 'achievement-ranking', component: _import('workbench/achievementRanking'), name: 'achievementRanking' },
				{ path: 'rent-bill', component: _import('workbench/rentBill'), name: 'rentBill' },
				{ path: 'rent-contract', component: _import('workbench/rentContract'), name: 'rentContract' }
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
