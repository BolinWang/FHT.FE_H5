<template>
  <section class="page_container">
    <!-- <section class="openApp" v-if="!isAPP && showOpenApp" @click="callupApp">
      <img class="close_png" src="../assets/close.png" alt="" @click.stop="showOpenApp = false" />
      <img class="image" src="../assets/openApp.png" alt="" />
    </section>
    <section class="header" v-else-if="!isAPP && !showOpenApp">
      <img src="../assets/logo.png" alt="" />
    </section> -->
    <section class="container">
      <div class="vr_container" id="scene1">
        <img
          class="img_bg"
          src="../assets/bg_header.jpg" alt="" />
      </div>
      <section class="bg_grid">
        <section class="active_container">
          <!-- 登录 -->
          <div class="flex flex_center" v-if="isLogin === false">
            <div class="container">
              <div class="login_field" v-if="!isAPP">
                <van-cell-group class="item_group" :border="false">
                  <van-field class="login_item" v-model="mobile" placeholder="请输入手机号" clearable type="number" @focus="scrollIntoView" />
                </van-cell-group>
                <van-cell-group class="item_group" :border="false">
                  <van-field class="login_item" v-model="vcode" placeholder="请输入验证码" clearable type="number" @focus="scrollIntoView">
                    <label slot="button" class="label_code" @click="getVcode" v-if="!disabled">获取验证码</label>
                    <label slot="button" class="label_code" v-else>{{timerNum}}s后重发</label>
                  </van-field>
                </van-cell-group>
              </div>
              <van-button size="large" class="btn_login" @click="loginMethod">立即领取</van-button>
              <article v-if="!isAPP">
                <p class="help_tips">温馨提示：未注册麦邻租房账号的手机号，登录时将自动注册，且代表您已同意
                  <span class="userAgree" @click="userAgree">《用户服务协议》</span>
                </p>
              </article>
            </div>
          </div>
          <div class="flex flex_center" v-else-if="isLogin === true">
            <!-- APP内未领取新用户-->
            <div class="container ticket_status" v-if="isAPP && (!ticket_status || (ticket_status === 4 && !showNotNewUser))">
              <van-button size="large" class="btn_login" @click="loginMethod">立即领取</van-button>
            </div>
            <div class="ticket_wrapper" v-if="ticket_status === 1">
              <div class="flex_item tips">恭喜您，领券成功！</div>
              <div class="flex_item"><img class="image_ticket" src="../assets/image_ticket.png" alt="" /></div>
              <section class="flex_item useTips">
                <div>抵扣券已发送至账户：{{userInfo.mobile | filterMobile}}</div>
                <div>
                  <span v-if="!isAPP">下载麦邻租房APP -> </span>
                  我家 -> 我的优惠券
                </div>
              </section>
            </div>
            <!-- 抵扣券已抢完 -->
            <div class="ticket_status" v-else-if="ticket_status === 2">
              <div class="title">来晚了，优惠券已抢完！</div>
            </div>
            <!-- 活动已结束 -->
            <div class="ticket_status" v-else-if="ticket_status === 3">
              <div class="title">来晚咯，领取活动已结束！</div>
            </div>
            <!-- 老用户不能参加 -->
            <div class="ticket_status" v-else-if="(!isAPP && ticket_status === 4) || showNotNewUser">
              <div class="title">本活动仅限新注册用户参与！</div>
            </div>
          </div>
          <!-- 活动规则 -->
          <section class="active_rules flex flex_center">
            <article>
              <section class="rules_container" v-for="item in rules_detail" :key="item.title">
                <div class="flex flex_center">
                  <div class="rules_title" :class="{title__ticket: item.isTicket}">
                    <h4>{{item.title}}</h4>
                  </div>
                </div>
                <p class="rules_item" v-for="(rule, index) in item.list" :key="index">
                  <span v-if="index < item.list.length - 1">{{index * 1 + 1}}.</span>
                  <span v-html="rule"></span>
                </p>
              </section>
            </article>
            <div class="cloud_item--left"></div>
            <div class="cloud_item--right"></div>
          </section>
          <!-- APP跳转 -->
          <section class="active_vrWrapper" @click.stop="goVrRoomPage">
            <div class="vr_wrapper flex flex_center">
              <div class="image_container">
                <div id="scene2">
                  <div data-depth="0.4">
                    <img src="../assets/image_vr.jpg" />
                  </div>
                </div>
              </div>
              <div class="superposition"></div>
              <div class="image_flower"></div>
            </div>
            <div class="info">
              <img src="../assets/vr.png" />
              去使用租房抵扣券
            </div>
          </section>
        </section>
      </section>
    </section>
    <!-- <section class="footer fixed">
      <van-button size="large" class="btn_downloadApp" @click="goVrRoomPage">前往体验VR看房</van-button>
    </section> -->
    <van-popup v-model="showUserAgree" position="right">
      <article>
        <section class="agreeTxt" v-html="agreeTxt"></section>
      </article>
    </van-popup>
  </section>
</template>

<script>
import { getWxShareInfo } from '@/utils/wxshare'
import { setUserData, getUserData } from '@/utils/auth'
import { Field, Cell, CellGroup, Button, Popup, Dialog } from 'vant'
import { customerApi } from '@/api/avtivePage'
import Bridge from '@/utils/bridge'
import Parallax from '@/utils/orienterParallax'
import userAgreeMent from '@/utils/mlAgree'
import { sensitiveInfo } from '@/utils'
import { getBrowser } from '@/utils//browser'
import CallApp from 'callapp-lib'

const browser = getBrowser()

const initPageInfoData = {
  title: '麦邻租房',
  shareData: {
    title: '新用户领50元租房抵扣券',
    introduction: '720°VR看房，真实房源，0中介费，免费带看',
    thumbnail: 'https://www.mdguanjia.com/images/wx_share__ml.png',
    linkUrl: location.href
  }
}

const isDevelopment = process.env.NODE_ENV === 'development'
let userAgent = navigator.userAgent.toLocaleLowerCase()

export default {
  name: 'activePage',
  components: {
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog
  },
  filters: {
    filterMobile (val) {
      return sensitiveInfo(val, 5, 2)
    }
  },
  data () {
    return {
      showOpenApp: true,
      vcode: '',
      mobile: '',
      disabled: false,
      timerNum: 59,
      showUserAgree: false,
      agreeTxt: userAgreeMent,
      isLogin: null, // 是否已登录
      lastVersion: 357, // APP版本
      isAPP: false, // 是否APP内
      app_ios: false,
      app_andriod: false,
      ticket_status: null, // 1: 已领取 2: 已抢完 3: 活动结束 4：老用户
      active_startDate: 1536364800000,
      showNotNewUser: false, // 显示老用户view
      userInfo: {}, // 用户信息
      urlSearchParams: {}, // search 数据
      isDevelopment,
      positionKey: '5e946959c9', // 活动盒子positionkey
      rules_detail: [{
        title: '活动规则',
        list: [
          '本次活动仅限麦邻租房新注册用户领取，每人仅限领取和使用1次；',
          '本次活动租房抵扣券为50元面值，可用于抵扣非金融房源在线签约且在线支付，月租金≥1000元的订单；',
          '租房抵扣券不可叠加使用，不得与其他优惠同时使用，不可兑现及用于租房其他费用抵扣，消费抵扣后不予退还；',
          '抵扣券仅限上海、杭州租房抵扣使用；自领取日起15天内有效，逾期作废；',
          '活动严禁作弊行为，一经查出，取消活动权益资格。',
          '本活动解释权归麦邻租房所有。',
          '咨询电话：400-033-9858'
        ]
      }],
      activityCode: 'MJGY20181029'
    }
  },
  created () {
    /**
     * 获取search数据
     */
    let urlSearchParams = {}
    if (location.search.indexOf('?') !== -1) {
      const searchArr = location.search.substr(1).split('&')
      for (let i = 0; i < searchArr.length; i++) {
        if (searchArr[i].split('=')[1]) {
          urlSearchParams[searchArr[i].split('=')[0]] = unescape(
            searchArr[i].split('=')[1]
          )
        }
      }
    }
    this.urlSearchParams = urlSearchParams

    // 字符串查找不用includes  IOS8不兼容
    this.app_ios = userAgent.indexOf('fht-ios') > -1
    this.app_andriod = userAgent.indexOf('fht-android') > -1
    this.isAPP = this.app_ios || this.app_andriod
    /**
     * 获取App数据
     */
    let _this = this
    if (this.app_ios === true) {
      Bridge.callHandler('getParamsFromNative', {}, function responseCallback (responseData) {
        setUserData(responseData)
        _this.initActive()
        _this.initApp()
        _this.lastVersion = responseData.v ? responseData.v.split('.').join('') * 1 : 357
      })
    } else if (this.app_andriod === true) {
      // eslint-disable-next-line
      let getAndriodData = JSON.parse(window.SetupJsCommunication.getParamsFromNative())
      setUserData(getAndriodData)
      this.initActive()
      this.initApp()
      this.lastVersion = getAndriodData.v ? getAndriodData.v.split('.').join('') * 1 : 357
    } else {
      this.initActive()
      this.initApp()
    }
    window.refreshPage = function () {
      window.location.href = window.location.href
    }
  },
  mounted () {
    this.$nextTick(() => {
      getWxShareInfo(initPageInfoData.shareData)
      // // 活动盒子
      // window.emma.config({
      //   key: 'eacb7d079f7bc7104d1346e400291155',
      //   debug: false,
      //   test: false,
      //   eventList: [ 'iconSmall', 'iconBig', 'banner' ]
      // })
      // this.sourceTypeTrack()
    })
    // 重力感应实例化
    let scene2 = document.getElementById('scene2')
    // eslint-disable-next-line
    let parallax2 = new Parallax(scene2)
  },
  methods: {
    scrollIntoView () {
      if (document.activeElement.tagName.toLowerCase() === 'input') {
        window.setTimeout(() => {
          browser.isIos && document.activeElement.scrollIntoViewIfNeeded()
          browser.isAndroid && document.activeElement.scrollIntoView()
        }, 200)
      }
    },

    returnClick () {
      this.$toast('fail', '请先领取优惠券')
      return false
    },

    /**
     * 判断登录状态
     */
    initActive () {
      let getUserDataFromLoacal = getUserData() || {}
      // 未登录
      console.log(getUserDataFromLoacal.sessionId)
      if (!getUserDataFromLoacal.sessionId) {
        this.isLogin = false
      } else {
        this.getUserInfo(getUserDataFromLoacal.sessionId)
      }
    },

    /**
     * 注册IOS/Andriod方法，获取页面信息
     */
    initApp () {
      if (this.app_ios === true) {
        Bridge.registerHandler('initPageInfo', (data, responseCallback) => {
          console.log('initPageInfo')
          responseCallback(initPageInfoData)
        })
        Bridge.registerHandler('refreshPage', (data, responseCallback) => {
          window.location.href = window.location.href
        })
      } else if (this.app_andriod === true) {
        // eslint-disable-next-line
        window.SetupJsCommunication.initPageInfo(
          JSON.stringify(initPageInfoData)
        )
      }
    },

    /**
     * 优惠券状态
     */
    queryActivityStatus (sessionId) {
      customerApi.activityCoupon({
        sessionId,
        activityCode: this.activityCode
      }).then(response => {
        this.isLogin = true
        let resData = response.data
        if (!resData) {
          this.$toast('fail', '服务器返回无数据')
          return false
        }
        if (!resData.isNewUser) {
          // 老用户不能参加
          this.ticket_status = 4
        } else if (resData.coupons && resData.coupons.length > 0) {
          // 已领取过优惠券
          this.ticket_status = 1
        } else if (!resData.hasTicket) {
          // 领完了
          this.ticket_status = 2
        } else if (resData.activityStatus) {
          // true: end  false: active
          this.ticket_status = 3
        } else if (!this.isAPP) {
          this.getTickets(sessionId)
        }
      }).catch((err) => {
        this.$toast('fail', '服务器请求失败')
        console.log(err)
      })
    },

    /**
     * 领取优惠券
     */
    getTickets (sessionId) {
      if (!sessionId) {
        this.$toast('fail', '无登录用户信息')
        return false
      }
      let sourceType = 'h5'
      if (this.isAPP) {
        sourceType = 'APP'
      } else if (this.urlSearchParams.sourceType) {
        sourceType = this.urlSearchParams.sourceType
      } else if (userAgent.indexOf('micromessenger') > -1) {
        sourceType = 'wechat'
      }
      customerApi.receiveCoupon({
        sessionId,
        couponActivityCode: this.activityCode,
        sourceType: sourceType
      }).then(response => {
        this.$toast('success', '领取成功')
        this.ticket_status = 1
        // this.sourceTypeTrack()
      }).catch((err) => {
        this.$toast('fail', '领取优惠券失败')
        console.log(err)
      })
    },

    /**
     * 获取用户信息
     */
    getUserInfo (sessionId) {
      customerApi.getUserInfo({
        sessionId
      }).then(response => {
        // 存储用户数据
        this.userInfo = {
          ...getUserData(),
          sessionId,
          mobile: response.data.mobile,
          userName: response.data.customerName,
          nickName: response.data.nickName,
          gender: response.data.gender
        }
        setUserData({
          ...this.userInfo
        })
        // this.initEmma()
        this.queryActivityStatus(sessionId)
      }).catch((err) => {
        console.log(err)
        this.isLogin = false
      })
    },

    /**
     * 活动盒子
     */
    initEmma () {
      window.emma.push({
        'type': 'banner',
        'event': 'logged',
        'position_key': this.positionKey,
        'sex': this.userInfo.gender === 1 ? '男' : '女',
        'username': this.userInfo.userName || 'h5',
        'mobile': this.userInfo.mobile || 'h5',
        'nickname': this.userInfo.nickName || 'h5'
      })
      console.log('emma')
    },
    /**
     * 登录
     */
    loginMethod () {
      // 线上环境控制活动开始时间
      let tempDateTime = new Date().getTime()
      if (tempDateTime < this.active_startDate && process.env.ENV_CONFIG === 'prod') {
        Dialog.alert({
          message: '不要着急嘛，活动暂未开始！'
        }).then(() => {
          this.showNotNewUser = true
        })
        return false
      }
      if (this.isAPP) {
        if (!this.isLogin) {
          // 未登录调用登录方法
          let bridgeParam = {
            libCode: 5001,
            refresh: true
          }
          if (this.app_andriod === true) {
            // eslint-disable-next-line
            try {
              console.log(bridgeParam)
              window.SetupJsCommunication.jumpToNativePages(JSON.stringify(bridgeParam))
            } catch (error) {
              this.$toast('fail', 'Andriod调用失败')
              console.log(error)
            }
          } else if (this.app_ios === true) {
            Bridge.callHandler('jumpToNativePages', bridgeParam, function responseCallback (responseData) {
              console.log(responseData)
              window.location.href = window.location.href
            })
          } else {
            console.log('H5')
          }
        } else {
          if (this.isAPP && this.ticket_status === 4) {
            Dialog.alert({
              message: '您不是活动期间内新注册的用户<br>无法参与哦！'
            }).then(() => {
              this.showNotNewUser = true
            })
            return false
          }
          // 已登录获取优惠券
          this.getTickets(this.userInfo.sessionId)
        }
        return false
      }
      if (!this.mobile) {
        this.$toast('fail', '请输入手机号')
        return false
      }
      if (!this.vcode) {
        this.$toast('fail', '请输入验证码')
        return false
      }
      this.login()
    },
    login () {
      customerApi.login({
        mobile: this.mobile,
        vcode: this.vcode
      }).then(response => {
        // 获取用户信息
        this.disabled = false
        this.timerNum = 59
        this.getUserInfo(response.data.sessionId)
      }).catch((err) => {
        console.log(err)
        this.isLogin = false
      })
    },
    /**
     * 获取验证码
     */
    getVcode () {
      if (!this.mobile) {
        this.$toast('fail', '请输入手机号')
        return false
      }
      customerApi.getVcode({
        mobile: this.mobile
      }).then(response => {
        this.$toast('success', '验证码已发送')
        this.disabled = true
        let timetimer = setInterval(() => {
          this.timerNum--
          if (this.timerNum <= 0) {
            this.disabled = false
            this.timerNum = 59
            clearInterval(timetimer)
          }
        }, 1000)
      }).catch((error) => {
        console.log(error)
        this.disabled = false
        this.timerNum = 59
      })
    },

    /**
     * 用户协议
     */
    userAgree () {
      this.showUserAgree = true
    },
    downloadAPP () {
      if (this.isAPP) {
        return false
      }
      window.location.href = `${process.env.WEBSITE_LINK}appdownload/index.html`
    },

    // 前往vr看房页面
    goVrRoomPage () {
      let bridgeParam = {
        libCode: 5018
      }
      if (this.lastVersion > 357) {
        if (this.app_andriod === true) {
          try {
            window.SetupJsCommunication.jumpToNativePages(JSON.stringify(bridgeParam))
          } catch (error) {
            this.$toast('fail', 'Andriod调用失败')
            console.log(error)
          }
        } else if (this.app_ios === true) {
          bridgeParam = {
            libCode: 5018,
            params: {
              type: 3
            }
          }
          Bridge.callHandler('jumpToNativePages', bridgeParam, function responseCallback (responseData) {})
        }
      } else {
        window.location.href = `${process.env.WEBSITE_LINK}house-list/index.html`
      }
    },

    // 唤醒APP
    callupApp () {
      const schemeConfig = {
        scheme_IOS: 'MyRoom://',
        scheme_And: 'myroom://',
        iosPath: 'activity',
        yingyongbao: '//a.app.qq.com/o/simple.jsp?pkgname=com.memorhome.home',
        appstore: '//itunes.apple.com/cn/app/id1191743282?mt=8'
      }
      let callupAppOptions = {
        callback () {
          // IOS 微信中直接前往appstore
          if (browser.isIos && browser.isWechat) {
            window.location.href = schemeConfig.appstore
          } else {
            window.location.href = schemeConfig.yingyongbao
          }
        }
      }
      const options = {
        protocol: browser.isIos ? schemeConfig.scheme_IOS : (browser.isAndroid ? schemeConfig.scheme_And : ''),
        yingyongbao: schemeConfig.yingyongbao,
        appstore: schemeConfig.appstore
      }
      if (browser.isIos) {
        callupAppOptions.path = schemeConfig.iosPath
      }
      const callLib = new CallApp(options)
      callLib.open(callupAppOptions)
    },

    // 推广渠道转化
    sourceTypeTrack () {
      switch (this.urlSearchParams.sourceType) {
        // 百度推广转化成功
        case 'baidu':
          window._agl && window._agl.push(['track', ['success', {t: 3}]])
          break
        case 'toutiao':
          window._taq.push({convert_id: '1614378656386093', event_type: 'form'})
          break
        case 'douyin':
          window._taq.push({convert_id: '1612833307743251', event_type: 'form'})
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss">
.page_container {
  background-color: #ff9140;
  position: relative;
  padding-bottom: 65px;
  // .openApp {
  //   .image {
  //     width: 750px;
  //     height: 104px;
  //   }
  //   .close_png {
  //     position: absolute;
  //     width: 30px;
  //     height: 30px;
  //     z-index: 1;
  //     top: 37px;
  //     left: 30px;
  //   }
  // }
  // .header {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   z-index: 199;
  //   img {
  //     width: 200px;
  //     height: 90px;
  //   }
  // }
  .vr_container {
    overflow: hidden;
    background: #ffbb72;
    .img_bg {
      width: 750px;
      height: 635px;
    }
  }

  .bg_grid {
    width: 750px;
    position: relative;
    z-index: 101;
    .active_container {
      position: relative;
      z-index: 100;
      &>div {
        position: relative;
        background: -webkit-linear-gradient(top, #ffbb72, #ff9140)
      }
      .container {
        width: 625px;
        .label_code {
          padding-left: 20px;
          border-left: 1px solid #ccc;
        }
        .item_group {
          border-radius: 10px;
          font-size: 28px;
          .login_item {
            padding: 30px;
            line-height: 28px;
            margin-bottom: 60px;
            border-radius: 10px;
          }
        }
        .btn_login {
          /* autoprefixer: off */
          background-image: -webkit-linear-gradient(bottom ,#732cfe, #9a51ff);
          /* autoprefixer: on */
          background-color: inherit;
          font-size: 36px;
          border: 0 none;
          border-radius: 15px;
          color: #fff;
        }
        .help_tips {
          font-size: 24px;
          color: #fff;
          line-height: 48px;
          margin-top: 30px;
          .userAgree {
            color: #7a33fe;
            border-bottom: 1px solid #7a33fe;
          }
        }
      }
      .ticket_status,
      .ticket_wrapper {
        background: url('../assets/bg_area.png') repeat center center;
        border-radius: 6px;
        color: #fff;
        text-align: center;
        width: 622px;
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .ticket_status {
        height: 212px;
        font-size: 36px;
        font-weight: 700;
      }
      .ticket_wrapper {
        background-size: cover;
        height: 520px;
        padding: 40px;
        font-size: 24px;
        .flex_item {
          margin-bottom: 60px;
          &:last-child {
            margin-bottom: 0;
            line-height: 40px;
          }
        }
        .tips {
          font-size: 36px;
        }
        .image_ticket {
          width: 342px;
          height: 146px;
        }
        .openticket {
          color: #fdab2a;
          border-bottom: 1px solid #fdab2a;
        }
      }
    }
    .advert_box {
      margin: 60px 0;
      height: 246px;
      .emma_wrap {
        position: relative;
        width: 620px;
        height: 246px;
        img {
          width: 620px;
          height: 246px;
        }
      }
    }
  }
  .agreeTxt {
    width: 600px;
    padding: 20px;
  }
  .active_rules {
    position: relative;
    margin-top: 60px;
    color: #fff;
    article {
      width: 625px;
    }
    .rules_container{
      margin-bottom: 82px;
      .rules_title {
        width: 140px;
        background: #772ffe;
        height: 22px;
        text-align: center;
        &.title__ticket {
          width: 240px;
        }
        h4 {
          position: relative;
          top: -60px;
          font-size: 30px;
        }
      }
      .rules_item {
        font-size: 24px;
      }
    }
  }
  .active_partner {
    margin-top: 60px;
    img {
      width: 630px;
      height: 135px;
    }
  }
  .active_vrWrapper {
    position: relative;
    .image_container {
      border: 8px solid #feca9f;
      width: 622px;
      height: 240px;
      overflow: hidden;
      color: #fff;
      img {
        width: 680px;
        height: 300px;
        margin-top: -30px;
        margin-left: -30px;
      }
    }
    .superposition {
      background: #ff9140;
      opacity: 0.2;
      z-index: 2;
      position: absolute;
      top: 8px;
      width: 606px;
      height: 224px;
    }
    .image_flower {
      position: absolute;
      right: 10px;
      bottom: -10px;
      width: 100px;
      height: 150px;
      background: url('../assets/flower.png') no-repeat center center;
      background-size: cover;
      z-index: 3;
    }
    .info {
      cursor: pointer;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -162px;
      margin-top: -30px;
      background: rgba(135, 36, 1, 0.5);
      width: 325px;
      height: 60px;
      border-radius: 60px;
      padding: 0 35px 0 25px;
      font-size: 24px;
      font-weight: 700;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
      }
    }
  }
}

.overlay_ticket {
  background-color: rgba(0, 0, 0, 0.6)
}
.flex {
  display: flex;
  &.flex_column{
    flex-direction: column;
  }
  &.flex_center {
    justify-content: center;
  }
}
.fixed {
  position: fixed;
}
.footer {
  bottom: 0;
  z-index: 9999;
  width: 750px;
  .btn_downloadApp {
    /* autoprefixer: off */
    background-image: -webkit-linear-gradient(top ,#ffc835, #fdab29);
    /* autoprefixer: on */
    border: 0 none;
    border-radius: 0;
    font-size: 28px;
    color: #fff;
    height: 90px;
    line-height: 90px;
  }
}

.cloud_item--left {
  position: absolute;
  left: 40px;
  background: url('../assets/cloud_left.png') no-repeat center center;
  background-size: cover;
  width: 60px;
  height: 25px;
}
.cloud_item--right {
  position: absolute;
  right: 10px;
  top: -50px;
  background: url('../assets/cloud_right.png') no-repeat center center;
  background-size: cover;
  width: 155px;
  height: 55px;
}

</style>
