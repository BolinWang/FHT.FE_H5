import fetch from '@/utils/fetch'

/* 获取还款计划列表 */
export function queryListByPageApi (params = {}) {
  return fetch({
    url: '/api/isz/',
    method: 'post',
    data: {
      method: 'queryListByPage',
      params
    }
  })
}
