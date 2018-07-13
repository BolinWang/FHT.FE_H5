import fetch from '@/utils/fetch'

/* 获取还款计划列表 */
export function getPayPlanList (externalOrderNo) {
  return fetch({
    url: '/api/isz/',
    method: 'post',
    data: {
      method: 'refundSchedules',
      params: {
        externalOrderNo: externalOrderNo || 6384
      }
    }
  })
}
