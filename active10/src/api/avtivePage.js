/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-19 21:02:07
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-08-23 16:41:55
 */

import { fetch } from '@/utils/fetch'

/* 登录获取sessionId */
export const customerApi = {
  requestUrl: `${process.env.ML_API}customer`,
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
  }
}
