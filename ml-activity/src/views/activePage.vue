<template>
  <div class="page_container">
    <div class="main-wrapper">
      <div class="main-title">
        邀请好友助力获得<br>租金券，最高可减免<span class="rent-price">1200</span>元房租
      </div>
      <div class="main-friends-num">
        <div class="main-friends-bg"></div>
        <div class="main-friends-center" v-if="countHelpCustomer">
          当前助力人数: <span class="friends-num">{{countHelpCustomer}}</span>
        </div>
      </div>
      <div class="main-steps">
        <div class="main-steps-reward">
          <div class="reward-item" :class="n.isActive ? 'active' : ''" v-for="n in couponList" :key="n.count" @click="receivePacket(n)">
            <img class="reward-item-pic" :class="(!n.isActive && !n.isUse) ? 'waiting-receive' : ''" :src="n.isActive ? rewardPicList.active : (n.isUse ? require(`../assets/images/received-discount-${n.worth}@2x.png`) : rewardPicList.default)" alt="">
          </div>
        </div>
        <div class="main-steps-slider">
          <div class="slider-progress" :style="{width: `${progressLength}%`}"></div>
          <div class="slider-dot">
            <div class="dot-item" v-for="n in couponList" :key="n.count">
              <img class="dot-item-pic" :src="(!n.isUse && !n.isActive) ? require('../assets/images/ml_icon_point.png') : require('../assets/images/ml_icon_jiedian@2x.png')" alt="">
            </div>
          </div>
          <div class="slider-text">
            <div class="text-item" v-for="n in couponList" :key="n.count">{{n.count}}位</div>
          </div>
        </div>
      </div>
      <div class="main-button">
        <img @click="inviteFriends" class="main-button-pic" src="../assets/images/ml_btn_jianzhu_default@2x.png" alt="">
      </div>
      <div class="main-action">
        <div>累积获得租金券: <span class="rent-price" v-if="couponFee !== ''">{{couponFee + '元'}}</span></div>
        <a @click="toUseCoupon" class="to-use" href="javascript: void(0);">立即使用</a>
      </div>
    </div>
    <div class="ml-activity-rules">
      <div class="rules-title"></div>
      <div class="rules-container">
        <p>1、本次活动仅限麦邻租房新注册用户发起助力， 每人仅可发起1次助力；</p>
        <p>2、好友助力仅限麦邻租房新注册用户，每人仅可帮 助好友助力1次； </p>
        <p>3、邀请三位好友助力可得100元租金券，邀请五位 好友助力可得300元租金券，邀请七位好友助力可 得500元租金券，邀请十位好友助力可得800元租 金券，邀请十二位好友助力可得1200元租金券；</p>
        <p>4、租金券可用于上海、杭州地区非金融房源在线交 租抵扣租金使用，签约租期1年及以上，抵扣租金 需≥1200元；租金券分12次使用，每次可使用1张 100元租金券；</p>
        <p>5、本次活动仅有100个名额，发完即止，请及时参 与；麦邻租房拥有在法律范围内的最终解释权，咨 询电话400 -033-9858。</p>
      </div>
    </div>
    <div class="ml-footer"></div>
  </div>
</template>

<script>

export default {
  name: 'activePage',
  components: {

  },
  data () {
    return {
      urlSearchParams: {},
      isLogin: false, // 是否已登录
      isAPP: false, // 是否APP内
      app_ios: false,
      app_andriod: false,
      loginModelVisible: false,
      isNewUser: false,
      sessionId: '',
      countHelpCustomer: '',
      couponFee: '',
      mobile: '',
      customerId: '',
      leadModelVisible: false,
      active: 1,
      couponList: [],
      progressLength: 0,
      rewardPicList: {
        default: require('../assets/images/waiting-receive@2x.png'),
        active: require('../assets/images/hongbao.gif')
      }
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    inviteFriends () {
      console.log(1111)
    },
    toUseCoupon () {
      console.log(11111)
    }
  }
}
</script>

<style lang="scss" scoped>
  $mlMainColor: #91440A;
  @keyframes mlJump {
    from {
     transform: rotate(45deg) translate3d(0, 0, 0)
    }
    to {
      transform: rotate(45deg) translate3d(0, -0.4rem, 0)
    }
  }
  @mixin bgimgFix ($url) {
    background-image: url($url);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .main-wrapper {
    .main-title {
      margin-bottom: 40px;
      font-size: 26px;
      .rent-price {
        font-weight: bold;
        color: #FE5614;
      }
    }
    .main-steps {
      padding: 0 50px 100px 60px;
      .main-steps-reward {
        display: flex;
        margin-bottom: 30px;
        .reward-item {
          height: 106px;
          flex: 1;
          &.active {
            .reward-item-pic {
              transform: scale(1.4);
              transform-origin: 50%;
            }
          }
          .reward-item-pic {
            width: 68px;
            height: auto;
            &.waiting-receive {
              margin-top: 10px;
            }
          }
        }
      }
      .main-steps-slider {
        position: relative;
        width: 100%;
        height: 8px;
        background-color: #F2E5C7;
        border-radius: 8px;
        .slider-progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 60%;
          height: 8px;
          background-color: #FE5614;
          border-radius: 8px;
        }
        .slider-dot {
          position: absolute;
          top: -8px;
          left: 0;
          width: 100%;
          height: 24px;
          display: flex;
          .dot-item {
            flex: 1;
            text-align: center;
            .dot-item-pic {
              width: 24px;
              height: 24px;
            }
          }
        }
        .slider-text {
          position: absolute;
          top: 40px;
          display: flex;
          width: 100%;
          .text-item {
            flex: 1;
            text-align: center;
            color: #999;
          }
        }
      }
    }
    .main-button {
      margin-bottom: 22px;
    }
    .main-action {
      display: flex;
      justify-content: space-between;
      padding: 0 140px;
      font-size: 28px;
      .rent-price {
        color: #FE5614;
      }
      .to-use {
        color: #5562D1;
        text-decoration: underline;
      }
    }
  }

  .ml-lead-model {
    background-color: transparent;
    color: #fff;
    font-size: 0.56rem;
    top: 1.5rem;
    left: 67%;
    overflow: visible;
    .ml-lead-container {
      position: relative;
      width: 9em;
      .ml-lead-arrow {
        position: absolute;
        top: -0.7rem;
        right: 0rem;
        width: 0.7rem;
        height: 0.7rem;
        animation: mlJump 0.7s infinite alternate;
      }
    }
  }

</style>
