import Mock from 'mockjs'
import userApi from './user'

// user
const reg_login = /\/customer\/loginByVcode/
const reg_getVcode = /\/customer\/sendCheckcode/

Mock.mock(reg_login, 'post', userApi.login)
Mock.mock(reg_getVcode, 'post', userApi.getVcode)

export default Mock
