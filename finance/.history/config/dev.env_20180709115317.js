var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"https://test.memorhome.com/myhome"'
})

module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  NPM_CONFIG_REPORT: '"false"',
  // BASE_API: '"http://192.168.230:1314/api/"'
  BASE_API: '"https://test.memorhome.com/myhome"'
}
