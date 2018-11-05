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
import { setUserData } from '@/utils/auth'
import { Field, Cell, CellGroup, Button } from 'vant'
import { loginApi } from '@/api/login'

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

  },
  mounted () {

  },
  methods: {
    login () {
      if (!this.mobile) {
        this.$toast.fail('请输入手机号')
        return false
      }
      if (!this.vcode) {
        this.$toast.fail('请输入验证码')
        return false
      }
      loginApi.login({
        mobile: this.mobile,
        vcode: this.vcode
      }).then(response => {
        console.log(response)
        setUserData({
          sessionId: response.sessionId
        })
        this.$emit('handleEmit')
      }).catch()
    },
    getVcode () {
      if (!this.mobile) {
        this.$toast.fail('请输入手机号')
        return false
      }
      loginApi.getVcode({
        mobile: this.mobile
      }).then(response => {
        this.$toast.success('验证码已发送')
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
