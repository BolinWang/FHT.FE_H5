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
  }, {
    method: 'get',
    noAssign: true,
    interceptors: false
  }).then((data) => {
    if (!data.success) {
      return false
    }
    const response = data.dataObject
    const jsApiList = [
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'onMenuShareTimeline',
      'onMenuShareAppMessage'
    ]
    wx.config({
      debug: false,
      appId: response.appid,
      timestamp: response.timestamp,
      nonceStr: response.noncestr,
      signature: response.signature,
      jsApiList
    })
    wx.ready(() => {
      wx.checkJsApi({
        jsApiList,
        success (res) {
          console.log(res)
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        }
      })
      // 1.4版本后废弃
      wx.onMenuShareTimeline({
        title: shareData.title, // 分享标题
        link: shareData.linkUrl, // 分享链接
        imgUrl: shareData.thumbnail, // 分享图标
        success () {},
        cancel () {}
      })
      wx.onMenuShareAppMessage({
        title: shareData.title, // 分享标题
        desc: shareData.introduction, // 分享描述
        link: shareData.linkUrl, // 分享链接
        imgUrl: shareData.thumbnail, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success () {},
        cancel () {}
      })

      // 1.4版本新增
      // // 分享好友（微信&QQ）
      // wx.updateAppMessageShareData({
      //   title: shareData.title,
      //   link: shareData.linkUrl,
      //   imgUrl: shareData.thumbnail,
      //   desc: shareData.introduction
      // }, (res) => {
      //   console.log(res)
      // })
      // wx.updateTimelineShareData({
      //   title: shareData.title,
      //   link: shareData.linkUrl,
      //   imgUrl: shareData.thumbnail
      // }, (res) => {
      //   console.log(res)
      // })
    })
    wx.error((res) => {
      console.debug(res)
    })
  })
}

export { getWxShareInfo }
