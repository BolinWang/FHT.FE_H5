/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-17 14:29:59
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-08-17 16:24:25
 */
import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)
export default new Router({
// 后退后页面位置
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/',
      name: '',
      component: _import('activePage')
    }, {
      path: '/activePage',
      name: 'activePage',
      component: _import('activePage')
    }, {
      path: '/login',
      name: 'login',
      component: _import('login')
    }
  ]
})
