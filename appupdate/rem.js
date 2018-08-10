// 设置 rem 函数
function setRem() {
  // 基准大小
  let baseSize = 32
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750
  // 设置页面根节点字体大小
  let scaleSize = baseSize * Math.min(scale, 2)
  document.documentElement.style.fontSize = `${scaleSize}px`
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
