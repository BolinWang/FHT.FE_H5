import Vue from 'vue'
import VueRouter from 'vue-router'

import CheckService from '../pages/checkService.vue'
import RoomDetail from '../pages/roomDetail.vue'

Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'order', component: CheckService },
	{ path: '/roomDetail', name: 'room-detail', component: RoomDetail }
]

const Router = new VueRouter({
  routes
})

export default Router