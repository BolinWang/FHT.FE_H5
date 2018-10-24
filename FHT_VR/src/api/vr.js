/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-24 16:33:40
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-08-24 16:36:43
 */

import { fetch } from '@/utils/fetch'

export const playerVrApi = {
  requestUrl: 'vr',
  getVrData (params = {}) {
    return fetch(playerVrApi.requestUrl, {
      method: 'vrResourceByRoomId',
      params
    })
  }
}
