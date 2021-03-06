import fetch from '~/utils/fetch'

/* 获取房间详情 */
export const queryRoomDetailApi = {
  estate(params = {}, version = '3.6') {
    return fetch({
      noAssign: true,
      url: '/api/estate',
      method: 'post',
      data: {
        v: version,
        method: 'eRoomTypeDetail',
        params
      }
    })
  },
  house(params = {}) {
    return fetch({
      noAssign: true,
      url: '/api/house',
      method: 'post',
      data: {
        v: '3.6.0',
        method: 'queryHouseRoomDetail',
        params
      }
    })
  }
}

/* 获取推荐房源 */
export function querySimilarListApi(params = {}) {
  return fetch({
    noAssign: true,
    url: '/api/search',
    method: 'post',
    data: {
      v: '3.6.0',
      method: 'recommendList',
      params
    }
  })
}

/* 不知道干嘛用的 */
export function queryFlyingKeyApi(params = {}) {
  return fetch({
    url: process.env.FLYING_API + '/share/open',
    method: 'post',
    data: {
      params
    }
  })
}

/* 发送短信验证码 */
export function sendCheckcodeApi(params = {}) {
  return fetch({
    noAssign: true,
    url: '/api/customer',
    method: 'post',
    data: {
      v: '2.3',
      method: 'sendCheckcode',
      params
    }
  })
}

/* 下单，预定房间 */
export function BookingRoomApi(params = {}) {
  return fetch({
    noAssign: true,
    url: '/api/customer',
    method: 'post',
    data: {
      v: '2.3',
      method: 'tenantBooking',
      params
    }
  })
}

/* 获取可下单事件 */
export function intelligentTenantTimeApi(params = {}) {
  return fetch({
    noAssign: true,
    url: '/api/estate',
    method: 'post',
    data: {
      v: '3.1.0',
      method: 'intelligentTenantTime',
      params
    }
  })
}