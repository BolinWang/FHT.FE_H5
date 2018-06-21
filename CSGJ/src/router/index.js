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
      component: resolve => require(['@/views/landlord/index'], resolve)
    },
    {
      path: '/landlord',
      component: resolve => require(['@/views/default'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['@/views/landlord/index'], resolve),
          name: 'landlordIndex'
        },
        {
          path: 'person',
          component: resolve => require(['@/views/landlord/person'], resolve),
          name: 'person'
        },
        {
          name: 'company',
          path: 'company',
          component: resolve => { require(['@/views/landlord/company'], resolve) }
        },
        {
          path: 'bindingCard',
          component: resolve => require(['@/views/landlord/bindingCard'], resolve),
          name: 'bindingCard'
        }
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
        }
      ]
    },
    {
      path: '/workbench',
      component: resolve => require(['@/views/default'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['@/views/workbench/index'], resolve),
          name: 'workbenchIndex'
        },
        {
          path: 'achievement-ranking',
          component: resolve => require(['@/views/workbench/achievementRanking'], resolve),
          name: 'achievementRanking'
        },
        {
          path: 'rent-bill',
          component: resolve => require(['@/views/workbench/rentBill'], resolve),
          name: 'rentBill'
        },
        {
          path: 'rent-contract',
          component: resolve => require(['@/views/workbench/rentContract'], resolve),
          name: 'rentContract'
        }
      ]
    },
    {
      path: '/guest',
      component: resolve => require(['@/views/default'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['@/views/guest/index'], resolve),
          name: 'sourceList'
        },
        {
          path: 'addSource/:guestSourceId',
          component: resolve => require(['@/views/guest/addSource'], resolve),
          name: 'addSource'
        },
        {
          path: 'sourceDetail/:guestSourceId',
          component: resolve => require(['@/views/guest/sourceDetail'], resolve),
          name: 'sourceDetail'
        },
        {
          path: 'sourceFollow/:guestSourceId',
          component: resolve => require(['@/views/guest/sourceFollow'], resolve),
          name: 'sourceFollow'
        },
        {
          path: 'sourceWatch/:guestSourceId',
          component: resolve => require(['@/views/guest/sourceWatch'], resolve),
          name: 'sourceWatch'
        },
        {
          path: 'signContract/:guestSourceId',
          component: resolve => require(['@/views/guest/signContract'], resolve),
          name: 'signContract'
        }
      ]
    },
    {
      path: '/mine',
      component: resolve => require(['@/views/default'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['@/views/mine/index'], resolve),
          name: 'mineIndex'
        },
        {
          path: 'password',
          component: resolve => require(['@/views/mine/password'], resolve),
          name: 'password'
        }
      ]
    }
  ]
})
