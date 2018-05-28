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
      component: _import('default'),
      children: [
        { path: '', component: _import('landlord/index'), name: 'landlordIndex' },
        { path: 'person', component: _import('landlord/person'), name: 'person' },
        {
          name: 'company',
          path: 'company',
          component: () => import('../views/landlord/company')
          // component: resolve => { require(['../views/landlord/company'], resolve) }
        },
        // { path: 'company', component: _import('landlord/company'), name: 'company' },
        { path: 'bindingCard', component: _import('landlord/bindingCard'), name: 'bindingCard' }
      ]
    },
    {
      path: '/house',
      component: _import('default'),
      children: [
        { path: '', component: _import('house/index'), name: 'houseIndex' },
        { path: 'searchHouse', component: _import('house/searchHouse'), name: 'searchHouse' },
        { path: 'searchMap', component: _import('house/searchMap'), name: 'searchMap' },
        { path: 'roomDetail', component: _import('house/roomDetail'), name: 'roomDetail' }
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
