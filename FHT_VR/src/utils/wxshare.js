import wx from 'weixin-js-sdk'
import { fetch } from '@/utils/fetch'

/**
 * 微信分享
 * @function: getWxShareInfo()
 * @default: shareData{}
 */

const getWxShareInfo = (shareData = {
  title: '麦邻租房',
  introduction: '麦邻租房',
  thumbnail: 'https://www.mdguanjia.com/images/wx_share__ml.png'
}) => {
  fetch('https://www.mdguanjia.com/myhome/act/august/wechat.htm', {
    url: location.href.split('#')[0],
    callback: 'h5'
  }, 'get', {
    noAssign: true,
    interceptors: false
  }).then((data) => {
    if (!data.success) {
      return false
    }
    const response = data.dataObject
    wx.config({
      debug: false,
      appId: response.appid,
      timestamp: response.timestamp,
      nonceStr: response.noncestr,
      signature: response.signature,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: shareData.title, // 分享标题
        link: shareData.linkUrl, // 分享链接
        imgUrl: shareData.thumbnail, // 分享图标
        success: function () {},
        cancel: function () {}
      })
      wx.onMenuShareAppMessage({
        title: shareData.title, // 分享标题
        desc: shareData.introduction, // 分享描述
        link: shareData.linkUrl, // 分享链接
        imgUrl: shareData.thumbnail, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {},
        cancel: function () {}
      })
    })
    wx.error(function (res) {
      console.debug(res)
    })
  })
}

export { getWxShareInfo }
