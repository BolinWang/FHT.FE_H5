import fetch from '@/utils/fetch'

/* 获取还款计划列表 */
export function getPayPlanDetail (params = {}) {
  return fetch({
    url: '/api/pg/receive',
    method: 'post',
    data: {
      method: 'refundSchedules',
      params: {
        externalOrderNo: 122122
      }
    }
  })
}
