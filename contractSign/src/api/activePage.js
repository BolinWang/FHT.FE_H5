/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-17 14:39:33
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-08-17 14:45:29
 */
import { fetch } from '@/utils/fetch'

/* 获取活动数据 */
export const activePageApi = {
  requestUrl: '',
  getData(params) {
    return fetch(activePageApi.requestUrl, {
      method: '',
      params
    })
  }
}
