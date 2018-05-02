import { loginApi } from '@/api/login'
import { getSessionId, setSessionId, removeSessionId } from '@/utils/auth'

/**
 * @argument sessionId: 鉴权
 * @argument isApp：来源是否为APP
 * @argument appkeepLogin：App内保持登录状态
 */
const user = {
  state: {
    sessionId: getSessionId(),
    isApp: false,
    appkeepLogin: false
  },

  mutations: {
    SET_SESSIONID: (state, sessionId) => {
      state.sessionId = sessionId
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const mobile = userInfo.mobile.trim()
      return new Promise((resolve, reject) => {
        loginApi({
          mobile,
          name: userInfo.name,
          validateCode: userInfo.validateCode,
          devId: 'H5'
        }).then(response => {
          const data = response.data
          setSessionId(data.sessionId)
          commit('SET_SESSIONID', data.sessionId)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeSessionId()
        commit('SET_SESSIONID', '')
        resolve()
      })
    }
  }
}

export default user
