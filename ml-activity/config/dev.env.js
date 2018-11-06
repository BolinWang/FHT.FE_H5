/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-17 16:09:03
 * @Last Modified by: chudequan
 * @Last Modified time: 2018-11-05 21:06:26
 */

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"//dev.mdguanjia.com/activity/"',
  ML_API: '"https://test1.mdguanjia.com/myhome/"',
  APP_DOWNLOAD_URL: '"https://tstatic201.mdguanjia.com/appGuides/index.html"',
  MOCK: 'true'
})

