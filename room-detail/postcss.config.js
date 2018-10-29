module.exports = {
  plugins: [
    require('autoprefixer')({
      remove: false // 解决这个插件把部分样式过滤掉的问题
    })
  ]
}
