import fetch from '@/utils/fetch'

/* 获取还款计划列表 */
export function getPayPlanList (params = {}) {
  return fetch({
    url: '/api/isz/',
    method: 'post',
    data: {
      method: 'refundSchedules',
      params: {
        externalOrderNo: 122122
      }
    }
  })
}
