<template>
  <section class="page_container">
    <section class="openApp" v-if="!isAPP && showOpenApp" @click="callupApp">
      <img class="close_png" src="../assets/close.png" alt="" @click.stop="showOpenApp = false" />
      <img class="image" src="../assets/openApp.png" alt="" />
    </section>
    <section class="header" v-else-if="!isAPP && !showOpenApp">
      <img src="../assets/logo.png" alt="" />
    </section>
    <section class="container">
      <!-- 重力感应区域 -->
      <div class="vr_container" id="scene">
        <div data-depth="0.6">
          <img
            class="img_bg"
            src="../assets/bg.jpg" alt="" />
        </div>
        <div data-depth="0.6">
          <div class="active_animate">
            <div class="animate_point">
              <img src="../assets/image_house.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <!-- 活动信息 -->
      <section class="active_info">
        <div class="active_title"></div>
        <div class="active_date">
          <div class="flex flex_center">
            <p class="content">活动时间：2018年9月8日-2018年10月28日</p>
          </div>
        </div>
      </section>
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
              <img src="../assets/ticket_no.png" alt="" />
            </div>
            <!-- 活动已结束 -->
            <div class="ticket_status" v-else-if="ticket_status === 3">
              <img src="../assets/ticket_finish_1.png" alt="" />
            </div>
            <!-- 老用户不能参加 -->
            <div class="ticket_status" v-else-if="(!isAPP && ticket_status === 4) || showNotNewUser">
              <img src="../assets/ticket_user_1.png" alt="" />
            </div>
          </div>
          <!-- 广告位 当前是活动盒子 -->
          <!-- <section class="advert_box flex flex_center">
            <div :data-emmaBanner="positionKey" class="emma_wrap" v-if="isLogin">
              <img v-if="isDevelopment" src="../assets/advert.jpg" alt="" />
            </div>
            <div v-else class="emma_wrap" @click="returnClick">
              <img src="../assets/advert.jpg" alt="" />
            </div>
          </section> -->
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
          </section>
          <!-- 合作伙伴 -->
          <section class="active_partner flex flex_center">
            <img src="../assets/bizpartner.png">
          </section>
        </section>
      </section>
    </section>
    <section class="footer fixed" v-if="!isAPP && ticket_status === 1">
      <van-button size="large" class="btn_downloadApp" @click="downloadAPP">前往VR看房使用抵扣券</van-button>
    </section>
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
    title: '720°VR实景在线租房',
    introduction: '品质好房，全城带看，无中介费，送租房抵扣券',
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
          '本次活动仅限麦邻租房活动期间新注册用户领取，每人仅限领取和使用1次；',
          '本次活动租房抵扣券为50元面值，可用于抵扣非金融房源在线支付，首笔月租金≥1000元的订单；',
          '租房抵扣券不可叠加使用，不得与其他优惠同时使用，不可兑现及用于租房其他费用抵扣，消费抵扣后不予退还；',
          '本次活动抵扣券仅限上海、杭州租房抵扣使用；',
          '抵扣券仅限活动期间领取，自领取日起30天内有效，逾期作废；',
          '活动严禁作弊行为，一经查出，取消活动权益资格。<br>本活动解释权归麦邻租房所有。',
          '咨询电话：400-882-7099'
        ]
      }]
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
    /**
     * 获取App数据
     */
    let _this = this
    if (this.app_ios === true) {
      Bridge.callHandler('getParamsFromNative', {}, function responseCallback (responseData) {
        console.log(responseData)
        setUserData(responseData)
        _this.initActive()
        _this.initApp()
      })
    } else if (this.app_andriod === true) {
      // eslint-disable-next-line
      let getAndriodData = JSON.parse(window.SetupJsCommunication.getParamsFromNative())
      setUserData(getAndriodData)
      this.initActive()
      this.initApp()
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
    let scene = document.getElementById('scene')
    let parallax = new Parallax(scene)
    console.log(parallax)
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
      this.isAPP = getUserDataFromLoacal.v && getUserDataFromLoacal.platform
      // 未登录
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
        activityCode: 'MJGY20180904'
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
        couponActivityCode: 'MJGY20180904',
        sourceType: sourceType
      }).then(response => {
        this.$toast('success', '领取成功')
        this.ticket_status = 1
        this.sourceTypeTrack()
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
        this.initEmma()
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
    // 唤醒APP
    callupApp () {
      const schemeConfig = {
        scheme_IOS: 'MyRoom://',
        scheme_And: 'myroom://',
        iosPath: 'activity',
        yingyongbao: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.memorhome.home',
        appstore: 'https://itunes.apple.com/cn/app/id1191743282?mt=8'
      }
      let callupAppOptions = {
        callback: function () {
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
          window._taq.push({convert_id: '1611206099665924', event_type: 'form'})
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
  height: 100%;
  background-color: #0e1125;
  position: relative;
  .openApp {
    .image {
      width: 750px;
      height: 104px;
    }
    .close_png {
      position: absolute;
      width: 30px;
      height: 30px;
      z-index: 1;
      top: 37px;
      left: 30px;
    }
  }
  .header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 199;
    img {
      width: 200px;
      height: 90px;
    }
  }
  .vr_container {
    flex: 1;
    position: absolute;
    width: 1200px;
    height: 1400px;
    overflow: hidden;
    background-color: #0a0c21;
    .img_bg {
      width: 1200px;
      height: 1400px;
      position: absolute;
      left: -225px;
      top: -190px;
      z-index: 99;
    }
  }
  .active_animate {
    position: relative;
    left: 180px;
    top: 560px;
    .animate_point {
      img {
        width: 299px;
        height: 135px;
      }
    }
  }
  .active_info {
    height: 1210px;
    .active_title {
      background: url('../assets/title.png') no-repeat center center;
      background-size: cover;
      width: 750px;
      height: 540px;
      position: relative;
      top: 0;
      left: 0;
      z-index: 999;
    }
    .active_date {
      position: relative;
      z-index: 1000;
      top: -145px;
      width: 100%;
      .content {
        width: 570px;
        border-radius: 29px;
        background: rgba(0, 0, 0, 0.5);
        font-size: 26px;
        color: #fff;
        line-height: 58px;
        text-align: center;
      }
    }
  }
  .bg_grid {
    background: url('../assets/bg_grid.jpg') repeat;
    width: 750px;
    position: relative;
    z-index: 101;
    .active_container {
      position: relative;
      z-index: 100;
      top: -285px;
      background: url('../assets/bg_form.png') no-repeat 0 0;
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
          background-image: -webkit-linear-gradient(top ,#ffc835, #fdab29);
          /* autoprefixer: on */
          height: 100px;
          font-size: 36px;
          border: 0 none;
          border-radius: 15px;
          color: #fff;
        }
        .help_tips {
          font-size: 24px;
          color: #656cf8;
          line-height: 48px;
          margin-top: 30px;
          .userAgree {
            color: #fdac2a;
            border-bottom: 1px solid #fdac2a;
          }
        }
      }
      .ticket_status {
        img {
          width: 622px;
          height: 212px;
        }
      }
      .ticket_wrapper {
        background: url('../assets/bg_ticket.png') no-repeat center center;
        background-size: cover;
        width: 632px;
        height: 520px;
        padding: 40px;
        color: #7176ea;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
    margin-top: 60px;
    color: #7176ea;
    article {
      width: 625px;
    }
    .rules_container{
      margin-bottom: 82px;
      .rules_title {
        width: 140px;
        background: rgba(36, 17, 106, 1);
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

</style>
