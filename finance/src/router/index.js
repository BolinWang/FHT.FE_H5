
const root = {
  path: '/',
  redirect: '/main'
}

const routes = [
  root,
  {
    path: '/main',
    name: 'main',
    component: resolve => { require(['../views/pay-back-plan'], resolve) }
  },
  {
    path: '/detail',
    name: 'detail',
    component: resolve => { require(['../views/pay-back-detail'], resolve) }
  },
  {
    path: '/pay',
    name: 'pay',
    component: resolve => { require(['../views/pay'], resolve) }
  }
]
module.exports = routes
