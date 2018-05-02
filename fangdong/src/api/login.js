/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-19 21:02:07
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-04-23 13:45:37
 */

import { fetch } from '@/utils/fetch'

/* 登录获取sessionId */
export function loginApi(params = {}) {
  return fetch('/landlord/login', {
    method: 'login',
    params
  })
}

/* 获取验证码 */
export function getValidateCodeApi(params = {}) {
  return fetch('/landlord/login', {
    method: 'sendCheckSms',
    params
  }, 'post', {
    interceptors: false
  })
}
