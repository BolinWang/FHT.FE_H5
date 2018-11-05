/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-17 14:39:33
 * @Last Modified by: chudequan
 * @Last Modified time: 2018-11-05 11:15:36
 */
import { fetch } from '@/utils/fetch'

/* 获取活动数据 */
export const joinActivityApi = {
  requestUrl: '/api/coupon',
  getData (params) {
    return fetch(joinActivityApi.requestUrl, {
      method: 'activityProgress',
      params
    }, 'post')
  },
  joinActivity (params) {
    return fetch(joinActivityApi.requestUrl, {
      v: '2.0.1',
      timestamp: new Date().getTime(),
      reqId: '0010C2379272774D6EC087B917CE2A71438DEF90',
      sign: '8F4C4A8E9D850EDD9692DE38723D0543',
      method: 'joinActivity',
      params
    }, 'post', {
      noAssign: true
    })
  }
}

export function receiveCouponApi (params = {}) {
  return fetch('/api/coupon', {
    v: '2.0.1',
    timestamp: new Date().getTime(),
    reqId: '0010C2379272774D6EC087B917CE2A71438DEF90',
    sign: '8F4C4A8E9D850EDD9692DE38723D0543',
    method: 'receiveCoupon',
    params
  }, 'post', {
    noAssign: true
  })
}
