// 'use strict'
// const merge = require('webpack-merge')
// const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"',
//   ENV_CONFIG: '"test"',
//   BASE_API: '"https://test.mdguanjia.com/"'
// })

module.exports = {
  NODE_ENV: '"development"',
  
  // BASE_API: '"http://192.168.230:1314/api/"'
  // BASE_API: '"https://dev.mdguanjia.com/bop/"'
  BASE_API: '"https://test.mdguanjia.com/"'
}
var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  ENV_CONFIG: '"test"',
  NPM_CONFIG_REPORT: '"false"',
})
