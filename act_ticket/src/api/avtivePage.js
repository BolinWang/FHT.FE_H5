/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-19 21:02:07
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-08-27 18:34:20
 */

import { fetch } from '@/utils/fetch'

/* 登录获取sessionId */
export const customerApi = {
  requestUrl: 'customer',
  login (params = {}) {
    return fetch(customerApi.requestUrl, {
      method: 'loginByVcode',
      params
    })
  },
  /* 获取验证码 */
  getVcode (params = {}) {
    return fetch(customerApi.requestUrl, {
      method: 'sendCheckcode',
      params
    })
  },
  /**
   * 获取用户信息
   */
  getUserInfo (params = {}) {
    return fetch(customerApi.requestUrl, {
      method: 'getCustomerInfo',
      params
    })
  },
  /**
   * 领取优惠券
   */
  receiveCoupon (params = {}) {
    return fetch('coupon', {
      method: 'receiveCoupon',
      params
    })
  },
  activityCoupon (params = {}) {
    return fetch('coupon', {
      method: 'activityCoupon',
      params
    })
  }
}
