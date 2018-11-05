/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-19 21:02:07
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-10-18 14:24:02
 */

import { fetch } from '@/utils/fetch'

/* 登录获取sessionId */
export const loginApi = {
  requestUrl: 'customer',
  login (params = {}) {
    return fetch(this.requestUrl, {
      method: 'loginByVcode',
      params
    }, {
      isMock: true
    })
  },
  /* 获取验证码 */
  getVcode (params = {}) {
    return fetch(this.requestUrl, {
      method: 'sendCheckcode',
      params
    }, {
      isMock: true
    })
  }
}
