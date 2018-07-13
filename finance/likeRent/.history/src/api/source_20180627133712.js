import fetch from '@/utils/fetch'

/* 获取用户列表 */
export function queryListByPageApi (params = {}) {
  return fetch({
    url: '/bop/flying/guestSource/',
    method: 'post',
    data: {
      method: 'queryListByPage',
      params
    }
  })
}
