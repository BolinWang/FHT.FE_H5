/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-17 14:44:52
 * @Last Modified by: chudequan
 * @Last Modified time: 2018-11-05 20:56:53
 */

import Vue from 'vue'
import App from './App'

import ActivePage from '@/views/ActivePage'

import VueRouter from 'vue-router'
// import router from './router'
import 'lib-flexible/flexible'
import 'normalize.css/normalize.css'
import FastClick from 'fastclick'
import { Toast } from 'vant'
// development引用vconsole
// eslint-disable-next-line
process.env.ENV_CONFIG !== 'prod' && require('@/utils/vconsole').default

process.env.MOCK && require('./mock')

FastClick.attach(document.body)
Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    name: 'activity',
    component: ActivePage,
    meta: {
      title: '首页',
      metaList: [
        {
          name: 'keywords',
          content: '1234'
        },
        {
          name: 'description',
          content: '5678'
        }
      ]
    }
  }
  // {
  //   path: '/friends-assistance',
  //   name: 'assistance',
  //   component: AsistancePage,
  //   meta: {
  //     title: '租房网_白领合租_单身公寓_酒店式公寓出租_整租合租【麦邻生活租房平台】',
  //     metaList: [
  //       {
  //         name: 'keywords',
  //         content: '麦邻、麦邻生活、租房、租房网、租房平台、公寓出租、白领公寓、单身公寓、青年公寓、合租公寓、短租公寓、整租公寓、酒店式公寓、房屋出租、搜房、租房子、房价、公寓、杭州租、找室友'
  //       },
  //       {
  //         name: 'description',
  //         content: '【100%真实房源 免中介费 付一押一 优质房源】麦邻生活是以租房为核心的青年生活社区平台，配置智能家居系统，支持APP在线签约付款，让你一步到位租到好房子！'
  //       }
  //     ]
  //   }
  // }
]
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

const vm = new Vue({
  el: '#app-box',
  router,
  components: { App },
  template: '<App/>'
})
Vue.use(vm)

Vue.prototype.$toast = Toast
