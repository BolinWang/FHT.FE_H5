<template>
  <div id="app-box">
    <div class="ml-main">
      <router-view/>
      <van-button @click="remove" class="ceshi-btn" type="primary" size="small">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { removeUserData } from '@/utils/auth'
import { Button } from 'vant'
export default {
  name: 'App',
  components: {
    [Button.name]: Button
  },
  data () {
    return {
    }
  },
  methods: {
    remove () {
      removeUserData('user')
      removeUserData('friends')
      window.location.reload()
    }
  },
  mounted () {

  },
  created () {
  }
}
</script>

<style lang="scss">
.ceshi-btn {
  position: fixed;
  bottom: 20px;
  left: 20px;
}
body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  // background-color: #FFAB2C;
}

html {
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  // height: 100%;
  // overflow-x: hidden;
  // overflow-y: auto;
  // -webkit-overflow-scrolling: touch;
  background-color: #FFAB2C;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

ul {
  list-style: none;
  padding: 0px;
  margin: 0px;
}

:focus,
:active {
  outline: none;
}

a,
a:focus,
a:hover {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

.clearfix {
  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
}

// 修改vant css
.van-toast--default {
  min-width: 120px;
  width: auto;
  .van-toast__text {
    font-size: 30px;
  }
}

.ml-model-close {
  position: absolute;
  bottom: -108px;
  left: 50%;
  margin-left: -44px;
  padding: 20px;
  img {
    width: 48px;
    height: 48px;
  }
}
// 两个页面公共样式
$mlMainColor: #91440A;
@mixin bgimgFix ($url) {
  background-image: url($url);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
}

.page_container {
  min-height: 100vh;
  padding-top: 418px;
  overflow: hidden;
  @include bgimgFix('./assets/images/ml_bg_big@2x.png');
  background-position: center top;
}
.main-wrapper {
  width: 750px;
  height: 760px;
  padding-top: 64px;
  color: $mlMainColor;
  text-align: center;
  @include bgimgFix('./assets/images/ml_bg_small@2x.png');
  .main-friends-num {
    position: relative;
    width: 540px;
    margin: 0 auto 60px;
    height: 44px;
    .main-friends-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      @include bgimgFix('./assets/images/ml_renshu@2x.png');
    }
    .main-friends-center {
      position: relative;
      z-index: 1;
      font-size: 32px;
      font-weight: bold;
      .friends-num {
        color: #FE5614;
      }
    }
  }
  .main-button {
    .main-button-pic {
      width: 590px;
      height: 80px;
    }
  }
}
.ml-activity-rules {
  padding-top: 36px;
  .rules-title {
    width: 284px;
    height: 50px;
    margin: 0 auto 40px;
    @include bgimgFix('./assets/images/ml_icon_guize@2x.png');
  }
  .rules-container {
    padding: 0 60px 28px;
    color: #9C4D0D;
    font-size: 26px;
    line-height: 36px;
    text-align: justify;
    p {
      margin: 0;
    }
  }
}
.ml-footer {
  width: 560px;
  height: 32px;
  margin: 0 auto 60px;
  @include bgimgFix('./assets/images/ml_slogn@2x.png');
}
.ml-login-model {
  border-radius: 0.1333rem;
  overflow: visible;
}
</style>
