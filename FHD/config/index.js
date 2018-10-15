/*
 * @Author: chenxing
 * @Date: 2018-04-19 17:09:35
 * @Last Modified by: chudequan
 * @Last Modified time: 2018-10-15 16:24:51
 */

'use strict'
const path = require('path')
let proxyIPs = {
  WANLI: 'http://192.168.1.121:1234/', // 万里小哥哥
  HONGDENG: 'http://192.168.5.226:5555/' // 水滴灯小哥哥
}

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: proxyIPs.HONGDENG,
				changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // host: 'localhost',
    host: '0.0.0.0',
    port: 1314,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: false,
    showEslintErrorsInOverlay: false,
    devtool: 'eval-source-map',
    cacheBusting: true,
    cssSourceMap: false,
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
