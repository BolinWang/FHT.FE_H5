/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-09-17 14:01:13
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-10-18 14:16:29
 */

const mockData_user = {
  login: {
    'reqId': null,
    'code': '0',
    'message': '',
    'data': {
      'sessionId': 'MTM2MA=='
    }
  },
  getVcode: {
    'reqId': null,
    'code': '0',
    'message': '',
    'data': {
      verifyCode: '123456'
    }
  }
}

export default {
  login: () => {
    return mockData_user.login
  },
  getVcode: () => {
    return mockData_user.getVcode
  }
}
