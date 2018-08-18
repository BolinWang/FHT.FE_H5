<template>
  <div class="page_container">
    <van-cell-group>
      <van-field
        v-model="mobile"
        label="手机号"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="vcode"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <van-button v-if="!disabled" slot="button" size="small" type="primary" @click="getVcode">发送验证码</van-button>
        <van-button v-else slot="button" size="small" disabled>{{timerNum}}s后重新获取</van-button>
      </van-field>
    </van-cell-group>
    <van-cell>
      <van-button type="primary" @click="login" style="width: 100%;">登录</van-button>
    </van-cell>
  </div>
</template>

<script>
import { getWxShareInfo } from '@/utils/wxshare'
import { setUserData } from '@/utils/auth'
import { Field, Cell, CellGroup, Button } from 'vant'
import { loginApi } from '@/api/login'

const initPageInfo = {
  title: '麦邻租房',
  shareData: {
    title: '麦邻生活',
    introduction: '麦邻生活',
    thumbnail: '',
    linkUrl: ''
  }
}

export default {
  name: 'login',
  components: {
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button
  },
  data () {
    return {
      vcode: '',
      mobile: '',
      disabled: false,
      timerNum: 59
    }
  },
  created () {
    // TODO development模拟登录态
    // let testLogin = 'Jqes+f0ERc9NPU0h/LeqchUsEcEtwzNz2cvjbNeViB0KBu++5d…wBqHjALBSLwmdxsjuZj9BVePv02GsseNEtEm290FS0DOeVA8='
    // setUserData({
    //   sessionId: testLogin
    // })
  },
  mounted () {
    this.$nextTick(function () {
      getWxShareInfo(initPageInfo.shareData)
    })
  },
  methods: {
    login () {
      loginApi.login({
        mobile: this.mobile,
        vcode: this.vcode
      }).then(response => {
        console.log(response)
        setUserData({
          sessionId: response.sessionId
        })
        this.$router.push('/activePage')
      }).catch()
    },
    getVcode () {
      if (!this.mobile) {
        this.$toast('fail', '请输入手机号')
        return false
      }
      loginApi.getVcode({
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
    }
  }
}
</script>

<style>

</style>
