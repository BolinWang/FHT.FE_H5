<template>
  <section class="page_container">
    <section>
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
            <p class="content">活动时间：2018年9月4日-2018年10月4日</p>
          </div>
        </div>
      </section>
      <section class="bg_grid">
        <section class="active_container">
          <!-- 登录 -->
          <div class="flex flex_center" v-if="isLogin === false">
            <div class="container">
              <van-cell-group class="item_group" :border="false">
                <van-field class="login_item" v-model="mobile" placeholder="请输入手机号" clearable type="number" />
              </van-cell-group>
              <van-cell-group class="item_group" :border="false">
                <van-field class="login_item" v-model="vcode" placeholder="请输入验证码" clearable type="number">
                  <label slot="button" class="label_code" @click="getVcode" v-if="!disabled">获取验证码</label>
                  <label slot="button" class="label_code" v-else>{{timerNum}}s后重发</label>
                </van-field>
              </van-cell-group>
              <van-button size="large" class="btn_login" @click="login">立即领取</van-button>
              <article>
                <p class="help_tips">温馨提示：未注册麦邻租房账号的手机号，登录时将自动注册，且代表您已同意
                  <span class="userAgree" @click="userAgree">《用户服务协议》</span>
                </p>
              </article>
            </div>
          </div>
          <div class="flex flex_center" v-else-if="isLogin === true">
            <div class="ticket_wrapper" v-if="ticket_status === 1">
              <div class="flex_item tips">恭喜您，领券成功！</div>
              <div class="flex_item"><img class="image_ticket" src="../assets/image_ticket.png" alt="" /></div>
              <div class="flex_item openticket" @click="openticket">拆开查看 >></div>
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
            <div class="ticket_status" v-else>
              <img src="../assets/ticket_finish.png" alt="" />
            </div>
          </div>
          <!-- 广告位 当前是活动盒子 -->
          <section class="advert_box flex flex_center">
            <div data-emmaBanner="2926d6a9a2" style="position: relative;" v-if="isLogin">
              <img v-if="isDevelopment" src="../assets/advert.jpg" alt="" />
            </div>
            <div v-else @click="returnClick">
              <img v-if="isDevelopment" src="../assets/advert.jpg" alt="" />
            </div>
          </section>
          <!-- 活动规则 -->
          <section class="active_rules flex flex_center">
            <article>
              <section class="rules_container" v-for="item in rules_detail" :key="item.title">
                <div class="rules_title" :class="{title__ticket: item.isTicket}">
                  <h4>{{item.title}}</h4>
                </div>
                <p class="rules_item" v-for="(rule, index) in item.list" :key="index">
                  {{index * 1 + 1}}.{{rule}}
                </p>
              </section>
            </article>
          </section>
        </section>
      </section>
    </section>
    <van-popup v-model="showUserAgree" position="right">
      <article>
        <section class="agreeTxt" v-html="agreeTxt"></section>
      </article>
    </van-popup>
    <van-popup v-model="showTickets" class="popup_tickets" overlay-class="overlay_ticket">
    </van-popup>
  </section>
</template>

<script>
import { getWxShareInfo } from '@/utils/wxshare'
import { setUserData, getUserData } from '@/utils/auth'
import { Field, Cell, CellGroup, Button, Popup } from 'vant'
import { customerApi } from '@/api/avtivePage'
import Bridge from '@/utils/bridge'
import Parallax from '@/utils/orienterParallax'
import userAgreeMent from '@/utils/mlAgree'
import { sensitiveInfo } from '@/utils'

const initPageInfoData = {
  title: '麦邻租房',
  shareData: {
    title: '全城VR看房 2000元租房抵扣券免费领',
    introduction: '点击免费领取',
    thumbnail: '',
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
    [Popup.name]: Popup
  },
  filters: {
    filterMobile (val) {
      return sensitiveInfo(val, 5, 2)
    }
  },
  data () {
    return {
      vcode: '',
      mobile: '',
      disabled: false,
      timerNum: 59,
      showUserAgree: false,
      showTickets: false,
      agreeTxt: userAgreeMent,
      isLogin: null,
      isAPP: false,
      ticket_status: 1, // 1: 已领取 2: 已抢完 3: 活动结束 4：其他
      userInfo: {},
      isDevelopment,
      active_endDate: '2018-10-04',
      rules_detail: [{
        title: '活动规则',
        list: [
          '本次活动仅限麦邻租房新注册用户领取1次，每个用户仅限使用其中1张；',
          '本次租房抵扣券仅限用于抵扣非金融房源在线签约订单月租金；',
          '每人每个房间订单仅限使用1张抵扣券；',
          '租房抵扣券不可叠加使用，不得与其他优惠同时使用，不可兑现以及用于租房其他费用，消费抵扣后不予退还；',
          '本次活动抵扣券使用限制城市（上海、杭州），领取不限制；',
          '更多租房优惠活动咨询客服:400-882-7099；',
          '本次活动最终解释权归麦邻租房所有；'
        ]
      }, {
        title: '优惠券使用说明',
        isTicket: true,
        list: [
          '仅限活动期间领取，自领取日起90天内有效，逾期作废；',
          '满1000元-2999元月租金可抵扣50元；',
          '满3000元-4999元月租金可抵扣150元；',
          '满5000元-6999元月租金可抵扣300元；',
          '满7000元-9999元月租金可抵扣500元；',
          '满10000元以上月租金可抵扣1000元；'
        ]
      }]
    }
  },
  created () {
    /**
     * 获取App数据
     */
    let _this = this
    if (userAgent.includes('fht-ios')) {
      Bridge.callHandler('getParamsFromNative', {}, function responseCallback (responseData) {
        console.log(responseData)
        setUserData(responseData)
        _this.initActive()
        _this.initApp()
      })
    } else if (userAgent.includes('fht-android')) {
      // eslint-disable-next-line
      let getAndriodData = JSON.parse(SetupJsCommunication.getParamsFromNative())
      setUserData(getAndriodData)
      _this.initActive()
      _this.initApp()
    } else {
      _this.initActive()
      _this.initApp()
    }
    if (new Date().getTime() >= new Date(this.active_endDate).getTime()) {
      this.ticket_status = 3
    }
  },
  mounted () {
    this.$nextTick(() => {
      getWxShareInfo(initPageInfoData.shareData)
    })
    // 重力感应实例化
    let scene = document.getElementById('scene')
    let parallax = new Parallax(scene)
    console.log(parallax)
    // 活动盒子
    window.emma.config({
      key: 'eacb7d079f7bc7104d1346e400291155',
      debug: false,
      test: false,
      eventList: [ 'iconSmall', 'iconBig', 'banner' ]
    })
  },
  methods: {
    returnClick () {
      this.$toast('fail', '请先领取优惠券')
      return false
    },

    /**
     * 判断登录状态
     */
    initActive () {
      // APP内
      let getUserDataFromLoacal = getUserData() || {}
      if (getUserDataFromLoacal.v && getUserDataFromLoacal.platform) {
        // 未登录
        if (!getUserDataFromLoacal.sessionId) {
          this.isLogin = false
          if (userAgent.includes('fht-android')) {
            // eslint-disable-next-line
            MLActivityLogin.callAppLogin()
          } else {
            Bridge.callHandler('loginAction', {}, function responseCallback (responseData) {
              window.location.href = window.location.href
            })
          }
        } else {
          this.getUserInfo(getUserDataFromLoacal.sessionId)
        }
      } else {
        if (getUserDataFromLoacal.sessionId) {
          this.getUserInfo(getUserDataFromLoacal.sessionId)
        } else {
          this.isLogin = false
        }
      }
      this.isAPP = getUserDataFromLoacal.v && getUserDataFromLoacal.platform
    },

    /**
     * 注册IOS/Andriod方法，获取页面信息
     */
    initApp () {
      if (userAgent.includes('fht-ios')) {
        Bridge.registerHandler('initPageInfo', (data, responseCallback) => {
          console.log('initPageInfo')
          responseCallback(initPageInfoData)
        })
      } else if (userAgent.includes('fht-android')) {
        // eslint-disable-next-line
        SetupJsCommunication.initPageInfo(
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
        // 已领取过优惠券
        if (!response.data) {
          this.$toast('fail', '服务器返回无数据')
          return false
        }
        if (response.data.coupons && response.data.coupons.length > 0) {
          this.ticket_status = 1
        } else if (!response.data.hasTicket) {
          // 领完了
          this.ticket_status = 2
        } else if (response.data.activityStatus) {
          // true: end  false: active
          this.ticket_status = 3
        } else {
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
      customerApi.receiveCoupon({
        sessionId,
        couponActivityCode: 'MJGY20180904'
      }).then(response => {
        this.$toast('success', '领取成功')
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
        'event': 'h5',
        'position_key': '2926d6a9a2',
        'sex': this.userInfo.gender === 1 ? '男' : '女',
        'username': this.userInfo.userName,
        'mobile': this.userInfo.mobile,
        'nickname': this.userInfo.nickName
      })
    },
    /**
     * 登录
     */
    login () {
      if (!this.mobile) {
        this.$toast('fail', '请输入手机号')
        return false
      }
      if (!this.vcode) {
        this.$toast('fail', '请输入验证码')
        return false
      }
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
     * 查看优惠券
     */
    openticket () {
      this.showTickets = true
    },
    /**
     * 用户协议
     */
    userAgree () {
      this.showUserAgree = true
    }
  }
}
</script>

<style lang="scss">
.page_container {
  height: 100%;
  background-color: #0e1125;
  position: relative;
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
        align-content: space-between;
        align-items: center;
        font-size: 24px;
        .flex_item {
          margin-bottom: 40px;
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
      img {
        width: 620px;
        height: 246px;
      }
    }
  }
  .agreeTxt {
    width: 600px;
    padding: 20px;
  }
  .active_rules {
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
          top: -22px;
          font-size: 30px;
        }
      }
      .rules_item {
        font-size: 24px;
      }
    }
  }
}
.popup_tickets {
  width: 624px;
  height: 847px;
  background: url('../assets/image_ticket__all.png') no-repeat center center;
  background-size: cover;
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

</style>
