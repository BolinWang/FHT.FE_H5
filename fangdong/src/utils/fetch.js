/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-19 21:02:15
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-04-20 17:06:13
 */

import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import { getSessionId } from '@/utils/auth'

/* 默认请求参数 */
const defaultConfig = {
  version: '1.0',
  timestamp: new Date().getTime(),
  reqId: '0010C2379272774D6EC087B917CE2A71438DEF90',
  sign: '8F4C4A8E9D850EDD9692DE38723D0543'
}

/* 创建axios实例 */
const service = axios.create({
  baseURL: process.env.BASE_API,
  interceptors: true, // 是否开启response拦截器 默认true
  noAssign: false // 请求体是否带defaultConfig 默认false
  // timeout: 5000 // 请求超时时间
})

/* request拦截器 */
service.interceptors.request.use(config => {
  /* post请求 */
  if (config.method.toUpperCase() === 'POST') {
    if (store.getters.sessionId) {
      config.data['sessionId'] = getSessionId()
    }
    if (!config.noAssign) {
      config.data = Object.assign(config.data, defaultConfig)
    }
  } else {
    if (store.getters.sessionId) {
      config.params['sessionId'] = getSessionId()
    }
    if (!config.noAssign) {
      config.params = Object.assign(config.params, defaultConfig)
    }
  }
  return config
}, error => {
  console.log('【REQUEST】' + error)
  Promise.reject(error)
})

/* respone拦截器 */
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('【response】' + error)
    if (error.message === '取消重复请求') {
      return Promise.reject(error)
    }
    Vue.$vux.toast.show({
      text: '连接服务器失败',
      type: 'cancel',
      width: 'auto'
    })
    return Promise.reject(error)
  }
)

/* 调用退出系统 */
const logOutMethod = () => {
  store.dispatch('FedLogOut').then(() => {
    location.reload() // 为了重新实例化vue-router对象 避免bug
  })
}

/* axios请求体包装 */
const responseMehod = (response, resolve, reject) => {
  const res = response.data
  if (!response.config.interceptors || res.code * 1 === 0) {
    return resolve(res)
  }
  if (res.code * 1 === 1011 && res.message === '数据不存在') {
    logOutMethod()
  }
  Vue.$vux.toast.show({
    text: res.message || '未知错误，请联系管理员',
    type: 'cancel',
    width: 'auto'
  })
  // sessionId 失效
  if (res.code * 1 === 1016) {
    Vue.$vux.toast.show({
      text: `${res.message}，请重新登录`,
      type: 'cancel',
      width: 'auto'
    })
    logOutMethod()
  }
  return reject('error')
}

const judgeMethod = (url, params, method = 'post', config = {}) => {
  let requestBody = {
    ...config,
    method,
    url
  }
  if (method.toUpperCase() === 'POST') {
    requestBody.data = params
  } else {
    requestBody.params = params
  }
  return new Promise((resolve, reject) => {
    service(requestBody).then(response => {
      responseMehod(response, resolve, reject)
    })
  })
}

export const fetch = judgeMethod
