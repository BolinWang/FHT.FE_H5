module.exports = file => () => import('@/views/' + file + '.vue')
// module.exports = resolve => require(['@/views/landlord/index.vue'], resolve)

