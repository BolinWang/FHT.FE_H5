/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-17 14:39:33
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-10 14:59:51
 */
import { fetch } from '@/utils/fetch'
export const contractApi = {
  requestUrl: 'contract',
  // 查看合同
  queryContract (params) {
    return fetch(contractApi.requestUrl, {
      method: 'queryContract',
      params
    })
  },
  // 签名提交（公共参数）
  signContract (params, options) {
    return fetch(contractApi.requestUrl, {
      method: 'signContract',
      params
    }, 'post', options)
  }
}
