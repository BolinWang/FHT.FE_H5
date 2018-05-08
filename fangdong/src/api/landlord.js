/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-19 21:02:32
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-05-08 09:42:29
 */

import { fetch } from '@/utils/fetch'

/* 获取活动数据 */
export function getLandlordListApi(params = {}) {
  return fetch('/landlord/reward', {
    method: 'list',
    params
  })
}

/* 申请提现 */
export function applyCashApi(params = {}) {
  return fetch('/landlord/reward', {
    method: 'apply',
    params
  })
}

/* 开启线上支付 */
export function openOnlinePaymentApi(params = {}) {
  return fetch('/landlord/online', {
    method: 'openOnlinePayment',
    params
  })
}
