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
  ENV_CONFIG: '"dev"',
  NPM_CONFIG_REPORT: '"false"',
  // BASE_API: '"http://192.168.230:1314/api/"'
  // BASE_API: '"https://dev.mdguanjia.com/bop/"'
  BASE_API: '"https://test.mdguanjia.com/"'
}
