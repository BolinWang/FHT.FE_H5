/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-19 21:02:32
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-04-19 23:00:37
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
  return fetch('/landlord/reward/', {
    method: 'apply',
    params
  })
}
