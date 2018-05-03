import Vue from 'vue'
import VueRouter from 'vue-router'

import Order from '../pages/order.vue'
import CheckOrder from '../pages/checkOrder.vue'
import RoomDetail from '../pages/roomDetail.vue'

Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'order', component: Order },
	{ path: '/checkOrder', name: 'check-order', component: CheckOrder },
	{ path: '/roomDetail', name: 'room-detail', component: RoomDetail }
]

const Router = new VueRouter({
  routes
})

export default Router