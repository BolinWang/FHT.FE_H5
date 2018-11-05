/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-17 16:09:03
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-10-18 14:00:11
 */

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"test"',
  BASE_API: '"//test.mdguanjia.com/activity/"',
  ML_API: '"//test.mdguanjia.com/myhome/api/"'
})

