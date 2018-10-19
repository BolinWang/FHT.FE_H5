import fetch from '~/utils/fetch'

/* 获取区域列表 */
export function queryDistrictListApi(params = {}) {
  return fetch({
    url: '/api/search',
    method: 'post',
    data: {
      method: 'areaListWithHouse',
      params
    }
  })
}

/* 获取城市列表 */
export function queryCityListApi(params = {}) {
  return fetch({
    url: '/api/search',
    method: 'post',
    data: {
      method: 'cityList',
      params
    }
  })
}

/* 搜索房源列表 */
export function queryRoomListBySearchApi(params = {}) {
  return fetch({
    url: '/api/search',
    method: 'post',
    data: {
      method: 'searchByPage',
      params
    }
  })
}