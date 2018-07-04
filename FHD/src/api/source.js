import fetch from '@/utils/fetch'
// 客源接口是一个域名
const hmsUrl = 'https://' + (process.env.ENV_CONFIG === 'dev' ? 'dev' : 'api') + '.mdguanjia.com/hms/api/hmsuser'
// 搜索接口是一个域名
const searchUrl = 'https://' + (process.env.ENV_CONFIG === 'dev' ? 'dev' : 'www') + '.mdguanjia.com/search'
// 雷星星接口又是一个域名
const leiUrl = 'https://' + (process.env.ENV_CONFIG === 'dev' ? 'test-flying-api' : 'flying-api') + '.mdguanjia.com'
/* 获取用户列表 */
export function queryListByPageApi(params = {}) {
  return fetch({
    url: '/bop/flying/guestSource/',
    method: 'post',
    data: {
      method: 'queryListByPage',
      params
    }
  })
}
// 查询房源
export function saveOrUpdateApi(params = {}) {
  return fetch({
    url: '/bop/flying/guestSource/',
    method: 'post',
    data: {
      method: 'saveOrUpdate',
      params
    }
  })
}

/* 获取用户列表 */
export function getApi(params = {}) {
  return fetch({
    url: hmsUrl,
    method: 'post',
    data: {
      method: 'cityManagers',
      params
    }
  })
}

/* 房源列表 */
export function houseApi(params = {}) {
	params.tags = ['fhd']
  return fetch({
    url: searchUrl + '/room/search',
    method: 'post',
    isSearch: true,
    data: params
  })
}

/* 获取用户名 */
export function getUserNameApi(params = {}) {
  return fetch({
    url: hmsUrl,
    method: 'post',
    data: {
      method: 'queryUserInfo',
      params
    }
  })
}

// 查询板块信息
export function plateApi(params = {}) {
  return fetch({
    url: '/bop/house/region/',
    method: 'post',
    data: {
      method: 'query.region.zone',
      params
    }
  })
}

// 查询客源详情
export function detailApi(params = {}) {
  return fetch({
    url: '/bop/flying/guestSource/',
    method: 'post',
    data: {
      method: 'detail',
      params
    }
  })
}

// 客源更进
export function saveFollowInfoApi(params = {}) {
  return fetch({
    url: '/bop/flying/guestSource/',
    method: 'post',
    data: {
      method: 'saveFollowInfo',
      params
    }
  })
}

export function search(params = {}) {
  return fetch({
    url: searchUrl + '/fhd/estate/search',
    method: 'post',
    data: params
  })
}

// 查询未读消息数
export function unreadRecords(params = {}) {
  return fetch({
    url: leiUrl + '/api/message',
    method: 'post',
    notId: true,
    data: {
      method: 'unreadRecords',
      params
    }
  })
}
// 查询未读消息数
export function msgList(params = {}) {
  return fetch({
    url: leiUrl + '/api/message',
    method: 'post',
    notId: true,
    data: {
      method: 'msgList',
      params
    }
  })
}

// 记录搜索数据
export function recordUrlApi(params = {}) {
  return fetch({
    url: leiUrl + '/api/search',
		method: 'post',
		v: '1.0',
    notId: true,
    data: {
      method: 'recordUrl',
      params
    }
  })
}
