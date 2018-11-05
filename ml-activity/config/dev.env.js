'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ML_API: '"https://test1.mdguanjia.com/myhome/"',
  BASE_API: '"https://api.mdguanjia.com/myhome/"',
  APP_DOWNLOAD_URL: '"https://tstatic201.mdguanjia.com/appGuides/index.html"'
})
