<template>
  <div class="page_container">
    <div class="act_rules" @click="showRulesBox = true">
      规则
    </div>
    <div class="container_items">
      <!-- 内容显示区域 -->
      <div class="item_container">
        <div class="container_box">
          <div class="container_box-items" v-if="onlinePay">
            <div class="item item_onlinePay" v-if="firstOpenAcount">
              您开通线上交易功能获得红包
              <p class="item_money text-center" v-if="rewardPrices > 0">
                100.00
              </p>
              <p class="item_money text-center" v-else>
                0.00
              </p>
            </div>
            <div class="area_block" v-else></div>
            <div class="item item_getCashPacket">
              您已通过线上交易获得红包
              <p class="item_money text-center">
                {{rewardPrices}}
              </p>
            </div>
          </div>
          <div class="container_box-items noOnlinePay" v-else>
            <p class="text-center">您当前账户暂未开通麦滴管家</p>
            <p class="text-center red">线上支付功能，</p>
            <p class="text-center">开通后产生在线支付订单即可</p>
            <p class="text-center red">获得现金红包！</p>
          </div>
        </div>
      </div>
      <!-- 连接背景 -->
      <div v-if="onlinePay">
        <div class="item_connect"></div>
        <!-- 申请提现区域-->
        <div class="item_operate">
          <div class="tips_box">
            <p class="tips text-center">
              活动结束后才可申请提现，
            </p>
            <p class="tips text-center">
              提现金额将打款至开通线上交易时绑定的收款账户
            </p>
          </div>
          <div v-if="!isApplyed" class="btn_applyCash text-center" @click="applyCash">
            申请提现
          </div>
          <div v-else class="btn_applyCash text-center disabled">
            已申请
          </div>
        </div>
        <!-- 红包滚动区域 -->
        <div v-if="scrollList.length > 0" class="item_scrollBoard">
          <div class="scroll_container">
            <div class="scroll_title text-center">
              我的红包奖励
            </div>
            <div class="scroll-content">
              <ul>
                <li v-for="item in scrollList" :key="item.mobile" class="groupCell clearfix">
                  <span class="right red" style="font-weight: 700;">{{item.rewardPrice}} 元</span>
                  <span class="left">{{item.userMobile}}</span>
                </li>
                <div v-if="scrollList.length > 4" class="text-center deliver_content">
                  <divider class="deliver">到底了</divider>
                </div>
              </ul>
              <div v-if="scrollList.length <= 4" class="text-center deliver_content noData">
                <divider class="deliver">没有数据啦</divider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center" v-else>
        <div class="btn_applyCash text-center onlinePayUrl" @click="showPayAgreement=true">一键开启线上支付</div>
      </div>
      <p class="text-center service">
        <a class="callTel" :href="tellHref">客服协助热线：400-882-7099</a>
      </p>
    </div>
    <div class="dialog_rules">
      <x-dialog v-model="showRulesBox" :hide-on-blur="true">
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

    <div class="dialog_rules onlinePay">
      <x-dialog v-model="showPayAgreement" :hide-on-blur="true" @on-show="onpayIsshow">
        <div class="rules_head text-center font30" style="color: #4680ff">
          一键开启线上支付
        </div>
        <div>
          尊敬的客户，使用平台线上支付，需遵守
          <strong>《麦滴管家租务管理平台线上支付条约》</strong>
          。点击确定后，系统会为您自动设置<span class="red">支付密码</span>，用于<span class="red">提现</span>使用，
          支付密码为您当前<span class="red">手机号码的后6位</span>，您可以通过麦滴管家网页端-设置-账号中心修改密码。
        </div>
        <div class="rules_head head__oninePay text-center font30">
          麦滴管家租务管理平台线上支付条约
        </div>
        <div class="onlinePayRules">
          <div class="rules-box" ref="scrollBox">
            <p>麦滴管家租务管理平台（以下简称甲方）线上支付条约是杭州复恒科技有限公司与用户（以下简称乙方）所定义的条约。您通过网络页面点击确认或以其他方式（包括但不限于签字或签章确认等方式）接受本条约，即表示您同意接受本条约的全部内容。</p>
            <p>在接受本条约之前，请您仔细阅读本条约的全部内容。如果您不同意本条约的任意内容，或者无法准确理解该条约的含义，请不要进行后续操作。一旦您使用本条约项下的服务，即表示您同意遵循规则。依据本协议的规定提供服务，本条约具有合同效力。</p>
            <br>
            <p>
              <strong>第一条 服务内容</strong>
            </p>
            <p>1.甲、乙双方决定开展互联网线上支付服务业务合作。</p>
            <p>2.甲方负责使用麦滴管家系统向乙方提供网上交易支付接入服务。</p>
            <p>3.甲方负责为乙方提供客户使用支付宝、微信支付、银行卡支付三种线上支付方式租赁乙方房源的货币资金代收及结算服务，相关平台费率以商务洽谈为准。</p>
            <p>4.乙方从甲方提现，提现到账时长为7个工作日，提现手续费2元/笔。</p>
            <p>
              <strong>第二条 甲方的权利与义务</strong>
            </p>
            <p>1.甲方负责建设和维护其管理系统，提供相关的业务应用和技术接口。同时应尽可能在现有技术条件下对系统进行改进、功能提升。</p>
            <p>2.甲方应在其系统内妥善保管乙方的交易记录和电子凭证，并向乙方提供交易信息查询和对账服务。</p>
            <p>3.如遇甲方系统原因造成的平台服务中断，甲方应及时排除故障并在第一时间内恢复平台的正常运行。</p>
            <p>4.甲方负责协调解决本条约项下互联网交易的差错处理工作。</p>
            <p>5.甲方对乙方在本平台上提供的房源真实性等方面拥有监督权利。</p>
            <p>6.甲方作为麦滴管家租务管理平台的所有者和管理者，有权对乙方的平台服务范围内的经营活动进行规范、监督和管理。对于严重损害公共权益或甲方利益的用户，甲方有权终止其继续使用本平台，同时支持和协助租客、有关行政机关对其进行追索和查处。</p>
            <p>
              <strong>第三条 乙方的权利和义务</strong>
            </p>
            <p>1.乙方承诺在利用甲方房源管理系统开展业务的过程中，严格遵守《中华人民共和国消费者权益保护法》等相关法律法规，尊重租客的隐私权和其他法定权利。</p>
            <p>2.乙方通过甲方房源管理系统发布的房源必须真实有效，若因此与租客出现纠纷，乙方须承担相应的责任。</p>
            <p>3.未经甲方事先书面同意，乙方不得将本条约的任何内容透露给第三方。</p>
            <p>4.乙方应理解甲方为了系统的正常运行或基于市场整体利益考虑及经营需要，定期或不定期地对系统进行维护或对其系统的服务内容、版面内容、页面设计等有关方面进行调整，如因此类情况而影响甲方本条约中义务的履行，乙方给予充分的谅解，不对此追究法律责任。</p>
            <p>
              <strong>第四条 不可抗力</strong>
            </p>
            <p>1.不可抗力指甲乙双方不能预见、对其发生和后果不能避免且不能克服的事件。鉴于网络所具有之特殊性质，不可抗力亦包括黑客攻击、计算机病毒、第三方支付方问题、因政府管制而造成的暂时性关闭在内的任何影响网络正常经营之情形。</p>
            <p>2.若由于不可抗力致使一方未能全部或部分履行条约的，应及时出具相关公告。则本协议内受影响之条款可在不能履行之期间及受影响范围内中止履行。</p>
            <p>
              <strong>第五条 适用法律与争议的解决</strong>
            </p>
            <p>甲乙双方就本条约之履行而产生的一切争议，均应首先通过友好协商的方式解决。如不能协商解决，任何一方均有权提请甲方所在地人民法院裁决。</p>
            <br>
            <p>商务联系 400-882-7099</p>
          </div>
        </div>
        <div class="rules_footer">
          <div class="btn__openOnline text-center" @click="showPayAgreement=false" style="color: #333;">
            取消
          </div>
          <div class="btn__openOnline text-center" @click="openOnlinePay">
            同意并开启
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { Toast, XDialog, Divider } from 'vux'
import { getLandlordListApi, applyCashApi, openOnlinePaymentApi } from '@/api/landlord'
import store from '../store'
import { getSessionId } from '@/utils/auth'
import { getWxShareInfo } from '@/utils/wxshare'

export default {
  name: 'landlord',
  components: {
    Toast,
    Divider,
    XDialog
  },
  data() {
    return {
      scrollList: [],
      tellHref: 'tel:400-882-7099',
      onlinePayUrl: 'http://t.cn/RmTQxYe',
      firstOpenAcount: false, // 首次
      onlinePay: false, // 已开通线上支付
      rewardPrices: 0, // 获取红包奖励
      showRulesBox: false,
      showPayAgreement: false,
      isApplyed: false // 申请提现
    }
  },
  created() {
    if (store.state.user.isApp) {
      this.tellHref = 'javascript:;'
    }
    if (getSessionId()) {
      this.getLandlordData()
    } else {
      console.log('to login')
    }
  },
  mounted() {
    this.$nextTick(function() {
      getWxShareInfo()
    })
  },
  methods: {
    getLandlordData() {
      getLandlordListApi({
        sessionId: getSessionId()
      }).then(response => {
        let data = response.data || {}
        this.scrollList = data.list || []
        this.firstOpenAcount = data.firstOpenAcount === 1
        this.onlinePay = data.isOpen === 1
        this.isApplyed = data.isApply === 1
        this.rewardPrices = data.rewardPrices.toFixed(2)
      })
    },
    applyCash() {
      applyCashApi({
        sessionId: getSessionId()
      }).then(() => {
        this.isApplyed = true
        this.showToast({
          text: '提现申请提交成功',
          type: 'success'
        })
      })
    },
    openOnlinePay() {
      this.showPayAgreement = false
      openOnlinePaymentApi({
        sessionId: getSessionId()
      }).then(() => {
        this.getLandlordData()
        this.showToast({
          text: '线上支付开启成功<br>支付密码为手机号码后6位',
          type: 'success'
        })
      })
    },
    onpayIsshow() {
      this.$nextTick(() => {
        this.$refs.scrollBox.scrollTop = 0
      })
    }
  }
}
</script>

<style>
.red {
  color: #f00;
}
.onlinePayUrl {
  margin: 60px 0;
  display: block;
}
.service {
  color: #fff;
  font-size: 30px;
  padding-bottom: 40px;
}
.callTel {
  font-size: 24px;
}
.groupCell {
  line-height: 55px;
  font-size: 24px;
}
.deliver_content .deliver {
  padding: 0 100px;
}

.deliver_content.noData {
  position: absolute;
  bottom: 0;
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
  background: rgba(255, 255, 255, 0.85);
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
.btn__openOnline {
  font-size: 30px;
  font-weight: 700;
  padding-top: 30px;
  color: #4680ff;
}
.font30 {
  font-size: 30px;
}
.onlinePayRules {
  border: 1px solid #9e9e9e;
  border-radius: 5px;
  padding: 20px;
}
.onlinePayRules .rules-box {
  max-height: 550px;
}
.onlinePay .weui-dialog {
  background: rgba(255, 255, 255, 1)
}
.head__oninePay {
  margin-bottom: 10px;
}
.rules_footer {
  display: flex;
  align-items: center;
  align-content: space-between;
}
.rules_footer div {
  display: block;
  width: 100%;
}
</style>
