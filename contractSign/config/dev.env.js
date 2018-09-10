/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-17 16:09:03
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-08-17 16:09:03
 */

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"https://dev.mdguanjia.com/activity/"',
  ML_API: '"https://dev.mdguanjia.com/myhome/api/"'
})

