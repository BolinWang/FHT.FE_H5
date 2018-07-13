import fetch from '@/utils/fetch'

/* 获取还款计划列表 */
export function pay (params = {}) {
  return fetch({
    url: '/api/isz',
    method: 'post',
    data: {
      method: 'alipaySign',
      params: params
    }
  })
}
