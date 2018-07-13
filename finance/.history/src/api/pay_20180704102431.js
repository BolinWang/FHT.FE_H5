import fetch from '@/utils/fetch'

/* 获取还款计划列表 */
export function pay (params = {}) {
  return fetch({
    url: '/api/pg/receive',
    method: 'post',
    data: {
      method: 'refundScheduleDetail',
      params: {
        externalOrderNo: 122122,
        periods: 1
      }
    }
  })
}
