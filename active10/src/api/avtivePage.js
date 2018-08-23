/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-19 21:02:07
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-08-17 18:22:59
 */

import { fetch } from '@/utils/fetch'

/* 登录获取sessionId */
export const loginApi = {
  requestUrl: `${process.env.ML_API}customer`,
  login (params = {}) {
    return fetch(loginApi.requestUrl, {
      method: 'loginByVcode',
      params
    })
  },
  /* 获取验证码 */
  getVcode (params = {}) {
    return fetch(loginApi.requestUrl, {
      method: 'sendCheckcode',
      params
    })
  }
}
