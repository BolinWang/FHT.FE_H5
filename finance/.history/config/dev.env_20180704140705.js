var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  ENV_CONFIG: '"test"',
  NPM_CONFIG_REPORT: '"false"',
  BASE_API: '"https://test.memorhome.com/"'
})
