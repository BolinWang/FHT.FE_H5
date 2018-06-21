import Vue from 'vue'
import Router from 'vue-router'
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
      component: resolve => require(['@/views/workbench'], resolve)
    },
    {
      path: '/sourceList',
      name: 'sourceList',
      component: resolve => require(['@/views/sourceList'], resolve)
    },
    {
      path: '/addSource/:guestSourceId',
      name: 'addSource',
      component: resolve => require(['@/views/addSource'], resolve)
    },
    {
      path: '/sourceDetail/:guestSourceId',
      name: 'sourceDetail',
      component: resolve => require(['@/views/sourceDetail'], resolve)
    },
    {
      path: '/sourceFollow/:guestSourceId',
      name: 'sourceFollow',
      component: resolve => require(['@/views/sourceFollow'], resolve)
    },
    {
      path: '/reminder',
      name: 'reminder',
      component: resolve => require(['@/views/reminder'], resolve)
    },
    {
      path: '/reminderDetail',
      name: 'reminderDetail',
      component: resolve => require(['@/views/reminderDetail'], resolve)
    },
    {
      path: '/workbench',
      name: 'workbench',
      component: resolve => require(['@/views/workbench'], resolve)
    },
    {
      path: '/house',
      name: 'house',
      component: resolve => require(['@/views/house'], resolve)
    },
    {
      path: '/searchHouse',
      name: 'searchHouse',
      component: resolve => require(['@/views/searchHouse'], resolve)
    },
    {
      path: '/landlord',
      name: 'landlord',
      component: resolve => require(['@/views/landlord'], resolve)
    }
  ]
})
