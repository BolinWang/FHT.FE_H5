/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-20 16:17:56
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-08-20 17:59:34
 */

 /**
  * @param alpha Z轴
  * @param beta  X轴
  * @param gamma y轴
  */

// 手机摇晃事件
const orientationElMove = {
  varInit: {
    'canMove': true
  },
  init () {
    // 判断是否是手机晃动事件
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.mouseMove.bind(this), false)
      this.android(0.3)
    }
  },
  mouseMove (event = window.event) {
    // beta轴偏转角（绕x轴旋转的角度）
    let delB = event.beta
    // gamma轴偏转角(绕y轴旋转的角度)
    let delG = event.gamma
    if (delB && delG && this.varInit.canMove) {
      this.beta = event.beta
      this.gamma = event.gamma
      this.varInit.canMove = false
    }
    if (delB || delG) {
      let allMoveEle = document.getElementsByClassName('ori_move')
      // 初始化移动的权重
      let distanceW = 1
      for (let i = 0; i < allMoveEle.length; i++) {
        // 获取当前元素权重
        distanceW = allMoveEle[i].getAttribute('data-ori')
        if (distanceW && Math.abs(delG - this.gamma) <= 60 && Math.abs(delB - this.beta) <= 120) {
          this.transformAll(allMoveEle[i], ((delG - this.gamma) / 1.5) * distanceW, ((delB - this.beta) / 3) * distanceW)
          this.transformX = ((delG - this.gamma) / 1.5)
          this.transformY = ((delB - this.beta) / 3)
        } else if (distanceW && Math.abs(delG - this.gamma) <= 60 && Math.abs(delB - this.beta) > 120) {
          this.transformAll(allMoveEle[i], ((delG - this.gamma) / 1.5) * distanceW, this.transformY * distanceW)
        } else if (distanceW && Math.abs(delG - this.gamma) > 60 && Math.abs(delB - this.beta) <= 120) {
          this.transformAll(allMoveEle[i], this.transformX * distanceW, ((delB - this.beta) / 3) * distanceW)
        } else {
          this.transformAll(allMoveEle[i], this.transformX * distanceW, this.transformY * distanceW)
        }
        // 初始化偏移
        distanceW = 1
      }
    }
  },
  // 通用变化兼容性
  transformAll (ele, disX, disY) {
    setTimeout(() => {
      ele.style.transform = `translate3d(${disX}px, ${disY}px, 0)`
      ele.style.webkitTransform = `-webkit-translate3d(${disX}px, ${disY}px, 0)`
    }, 30)
  },
  android (ms) {
    let u = navigator.userAgent
    if (u.match(/Android/i)) { // 安卓机型
      let allMoveEle = document.getElementsByClassName('ori_move') // 当前所有可以的移动的元素
      for (let i = 0; i < allMoveEle.length; i++) {
        allMoveEle[i].style.transition = `transform ${ms}s linear`
        allMoveEle[i].style.webkitTransform = `-webkit-transition ${ms}s linear`
      }
    }
  }
}

export default orientationElMove
