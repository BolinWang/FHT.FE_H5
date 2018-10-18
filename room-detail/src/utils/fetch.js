import axios from 'axios'
import { Toast } from 'mint-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  interceptors: true // 是否开启response拦截器
  /*   timeout: 5000 // 请求超时时间 */
})

// request拦截器
service.interceptors.request.use(config => {
  const defaultConfig = {
    reqId: 'cdq',
    timestamp: new Date().getTime().toString(),
    v: '1.0',
  }
  if (!config.noAssign) {
    config.data = Object.assign(config.data, defaultConfig)
  }
  return config
}, error => {
  console.log('【REQUEST】' + error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (!response.config.interceptors || res.code * 1 === 0) {
      return response.data
    }
    Toast({
      duration: 3000,
      message: res.message || '未知错误，请联系管理员'
    })
    return Promise.reject('error')
  },
  error => {
    console.log('【response】' + error)
    Toast({
      message: error.message,
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service
