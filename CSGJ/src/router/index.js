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
      component: _import('default'),
      children: [
        { path: '', component: _import('house/index'), name: 'houseIndex' },
        { path: 'searchHouse', component: _import('house/searchHouse'), name: 'searchHouse' },
        { path: 'searchMap', component: _import('house/searchMap'), name: 'searchMap' }
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
