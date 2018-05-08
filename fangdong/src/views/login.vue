<template>
  <div class="page_container">
    <div class="act_rules" @click="showRulesBox = true">规则</div>
		<div class="container_items">
			<div class="item_container">
				<div class="container_box">
          <div class="container_login">
            <div class="input_item">
              <input type="text" placeholder="请输入您的姓名" v-model="name" />
            </div>
            <div class="input_item">
              <input type="tel" placeholder="请输入您的手机号" v-model="mobile" />
            </div>
            <div class="input_item input_item-split" style="position: relative;">
              <input type="tel" placeholder="请输入验证码" v-model="validateCode" />
              <button v-if="!disabled" type="button" class="btn btn_getValidateCode"
                :disabled="disabled" @click="getValidateCode">
                获取验证码
              </button>
              <button v-else type="button" class="btn btn_getValidateCode" disabled>
                {{timerNum}}s后重新获取
              </button>
            </div>
          </div>
				</div>
			</div>
      <div class="item_connect"></div>
      <div class="item_operate">
        <div class="tips_box">
          <p class="tips text-center">
            尚未注册麦滴管家的手机号，
          </p>
          <p class="tips text-center">
            登录自动注册，初始登录密码为123456
          </p>
        </div>
        <div class="btn_applyCash text-center" @click="handleLogin">立即领取</div>
      </div>
		</div>
    <div class="dialog_rules">
      <x-dialog v-model="showRulesBox"
        :hide-on-blur="true">
        <div class="rules_head text-center">
          活动规则
        </div>
        <div class="rules-box" @click="showRulesBox = false">
          <p class="rules_title">活动时间：</p>
          <p>2018年4月20日-2018年5月15日</p>
          <p class="rules_title">参与方式：</p>
          <p>运营商（房东）进入活动页完善登录信息，点击“立即领取”并开通在线交租支付功能后，即可参与本活动；</p>
          <p class="rules_title">奖励方式和规则：</p>
          <p>1、新开通奖励：活动期间，首次开通在线交租支付功能，并完成首次在线租房交易，每位运营商可获得100元现金红包奖励；</p>
          <p>2、新交易奖励：</p>
          <p>(1) 每个线上新签约房间交易订单可获得50元现金红包，最高可获得10000元现金红包；</p>
          <p>(2) 新交易奖励需满足以下条件：北京、上海、广州、深圳、杭州五个城市运营商（房东）完成在线新签约租房交易，且月租金大于等于1500元；其他城市运营商（房东）完成在线新签约租房交易，且月租金大于等于1000元 ；</p>
          <p>(3) 新交易奖励，仅限活动期间新签约房间交易订单享受，每笔订单仅享受一次奖励，活动期内签约又退房的订单不享受奖励；</p>
          <p>3、如何提现：现金红包提现前，请确保已经绑定银行卡（企业用户请绑定对公账户），活动结束后，请运营商（房东）在活动结束后3个工作日内在领取页提交提现申请，现金奖励在提交申请后7个工作日内一次性统一发放到开通在线交易绑定账号的银行卡；</p>
          <p>4、活动期间务必保证开通线上交易支付功能、交易房源、交易行为真实性，活动期间将进行审核，发现有作弊行为，一律取消获得的活动奖励权益；</p>
          <p>5、本活动解释权归麦滴管家所有。</p>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { Toast, XDialog } from 'vux'
import { getValidateCodeApi } from '@/api/login'
import { getWxShareInfo } from '@/utils/wxshare'

export default {
  name: 'login',
  components: {
    Toast,
    XDialog
  },
  data() {
    return {
      showRulesBox: false,
      name: '',
      mobile: '',
      validateCode: '',
      disabled: false,
      timerNum: 59
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(function() {
      getWxShareInfo()
    })
  },
  methods: {
    getValidateCode() {
      if (!this.mobile) {
        this.showToast({
          text: '请输入手机号',
          type: 'cancel'
        })
        return false
      }
      this.disabled = true
      getValidateCodeApi({
        mobile: this.mobile.trim()
      }).then((response) => {
        if (response.code * 1 === 0) {
          this.showToast({
            text: '验证码已发送',
            type: 'success'
          })
        } else {
          this.showToast({
            text: response.message,
            type: 'cancel'
          })
          this.disabled = false
          this.timerNum = 59
        }
      }).catch(() => {
      })

      let auth_timetimer = setInterval(() => {
        this.timerNum--
        if (this.timerNum <= 0) {
          this.disabled = false
          this.timerNum = 59
          clearInterval(auth_timetimer)
        }
      }, 1000)
    },
    handleLogin() {
      if (!this.name) {
        this.showToast({
          text: '请输入姓名',
          type: 'cancel'
        })
        return false
      }
      if (!this.mobile) {
        this.showToast({
          text: '请输入手机号',
          type: 'cancel'
        })
        return false
      }
      if (!this.validateCode) {
        this.showToast({
          text: '请输入验证码'
        })
        return false
      }
      this.$store.dispatch('Login', {
        name: this.name,
        mobile: this.mobile,
        validateCode: this.validateCode
      }).then((response) => {
        this.$router.push({ path: '/landlord' })
      }).catch(() => {
        console.log(1)
      })
    }
  }
}
</script>

<style>
.landlordTips {
  font-size: 30px;
  color: #fff;
}
.login_area_block {
  height: 40px;
}
.container_login {
  background-color: #3a3eeb;
  padding: 30px;
  height: 400px;
}
.input_item input{
  height: 90px;
  border: 5px solid #516bff;
  margin-bottom: 28px;
  border-radius: 10px;
  padding: 10px 20px;
  width: 100%;
  font-size: 28px;
  font-weight: 700;
}
.input_item input:focus {
  color: #3a3fe2;
  border-color: #516bff;
}

.input_item.input_item-split input {
  padding-right: 200px;
}

.btn_getValidateCode {
  position: absolute;
  z-index: 99;
  right: 5px;
  top: 5px;
  width: 185px;
  line-height: 80px;
  height: 80px;
  border: 0 none;
  background: #3a3fe2;
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.btn_getValidateCode:disabled {
  background: #ccc;
  font-size: 24px;
}



.red {
	color: #f00;
}

.dialog_rules .weui-dialog {
  position: fixed;
  max-width: 700px;
  overflow: auto;
  width: 100%;
  border-radius: 20px;
  color: #333;
  font-size: 20px;
  text-align: left;
  padding: 40px;
  background: rgba(255, 255, 255, 0.85)
}
.rules-box {
  overflow: auto;
  max-height: 800px;
}
.dialog_rules .rules-box p {
 line-height: 44px;
}
.dialog_rules .rules_title {
  font-weight: 700;
}
.rules_head {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
}

</style>
