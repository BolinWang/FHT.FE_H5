<template>
	<div class="booking-container">
		<div class="booking-block booking-box room-box">
      <div class="room-pic">
        <img :src="pic.src" alt="">
      </div>
      <div class="room-info">
        <div class="room-name">{{roomName}}</div>
        <div class="room-layout">{{roomArea}}m²起 | {{houseType}} | {{decorationDegree}}</div>
        <div class="room-price">{{price}}元/月起</div>
        <div class="room-address">{{address}}</div>
      </div>
		</div>
		<div class="booking-block tips">完善看房信息</div>
		<div class="booking-block">
			<div class="booking-box input-group">
				<label for="">姓名</label>
        <input type="text" placeholder="请输入您的姓名" v-model="name">
			</div>
			<div class="booking-box input-group">
        <label for="">手机号</label>
        <input type="tel" placeholder="请输入您的手机号" v-model="phone" maxlength="11">
			</div>
		</div>
		<div class="booking-block booking-box input-group">
			<label for="">看房时间</label>
      <input v-if="isIntel=='bolin'" onfocus='this.blur();' @click="getOrderTime" type="text" v-model="selectedTime" placeholder="请选择看房时间" readonly="readonly">
      <input v-else onfocus='this.blur();' @click="showPicker = true" type="text" placeholder="请选择看房时间" v-model="selectedTime" readonly="readonly">
      <span class="icon"></span>
		</div>
    <div class="booking-block booking-box remarks">
      <label for="">备注</label>
      <textarea name="" id="" cols="30" rows="3" placeholder="可选填" v-model="remark"></textarea>
    </div>
    <div class="order-btn">
      <button class="btn btn-primary" @click="checkForm">
        立即预约
      </button>
    </div>
    <mt-popup
      class="mj-picker"
      v-model="showPicker"
      position="bottom">
      <mt-picker
        :slots="slots"
        @change="onValuesChange"
        :visibleItemCount="3"
        :showToolbar="true"
        :value-key="'text'">
        <div class="mj-picker-head">
          <span class="fl" @click="showPicker = false">取消</span>
          看房时间
          <span class="fr" @click="setTime">确定</span>
        </div>
      </mt-picker>
    </mt-popup>
    <mt-popup
      class="checkCode-modal"
      v-model="showCheckCode"
      position="center"
      zIndex="500">
      <div class="checkCode-container">
        <div class="head">验证码将发送至</div>
        <div class="active phone">{{phone}}</div>
        <mt-field
          v-model="captcha"
          placeholder="请输入验证码"
          :attr="{ maxlength: 6 }">
          <div @click="getCheckCode" :class="[sendCodeCount == 0 ? 'active' : '']">{{codeText}}</div>
        </mt-field>
        <p class="tips">新用户将自动注册，并同意</p>
        <span class="active" @click="showContract = true">《麦邻生活用户协议》</span>
      </div>
      <div class="checkCode-confirm active" @click="sendOrder">确定</div>
    </mt-popup>
    <mt-popup
      class="orderTime-modal"
      v-model="showOrderTime"
      position="top"
      zIndex="500">
      <div class="orderTime-container">
        <div>
          <div class="title">今天 | {{ new Date() | dateFormat}}</div>
          <div class="time-content">
            <div
              class="btn-box"
              v-for="(item, index) in todayTime"
              :key="index">
              <span class="btn btn-default" v-if="item.canChoose" @click="chooseTime(item)">{{item.time}}</span>
              <span class="btn btn-disabled" v-else>{{item.time}}</span>
            </div>
          </div>
        </div>
        <div>
          <div class="title">明天 | {{ new Date(new Date().getTime() + 86400000) | dateFormat}}</div>
          <div class="time-content" :style="{marginBottom: 0}">
            <div
              class="btn-box"
              v-for="(item, index) in nextDayTime"
              :key="index">
              <span class="btn btn-default" v-if="item.canChoose" @click="chooseTime(item)">{{item.time}}</span>
              <span class="btn btn-disabled" v-else>{{item.time}}</span>
            </div>
          </div>
        </div>
      </div>
<!--       <div class="btn-container">
        <div class="btn" @click="">
          确定
        </div>
        <div class="btn" @click="showOrderTime=false">
          取消
        </div>
      </div> -->
    </mt-popup>
    <mt-popup
      class="contract-modal"
      v-model="showContract"
      position="center">
      <div class="head">
        麦邻生活用户协议
        <span class="close-btn" @click="showContract = false"></span>
      </div>
      <div class="contract-container">
        <p>请务必认真阅读和理解本《用户服务协议》（以下简称《协议》）中规定的所有权利和限制。除非您接受本《协议》条款，否则您无权注册、登录或使用本协议所涉及的相关服务。您一旦注册、登录、使用或以任何方式使用本《协议》所涉及的相关服务的行为将视为对本《协议》的接受，即表示您同意接受本《协议》各项条款的约束。如果您不同意本《协议》中的条款，请不要注册、登录或使用本《协议》相关服务。 本《协议》是用户与“麦邻生活”平台之间的法律协议。</p>
        <h4 style="font-weight:700;">1. 接受</h4>
        <p>本协议内容包括协议正文以及所有“麦邻生活”平台已经发布或将来发布的各类规则（包括但不限于法律声明、隐私条款等）。所有规则为本协议不可分割的一部分，与本协议正文具有同等法律效力。</p>
        <p>以任何方式进入“麦邻生活”平台并使用“服务”即表示您已经阅读本协议并同意与“麦邻生活”平台订立本协议，且您将受本协议的条款和条件(下称“条款”)的约束。本协议在必要时将随时进行修改更新，每次改动都会在“麦邻生活”平台上刊载公告，通知予您。如您不同意相关变更，必须停止使用“服务”。经修订的“条款”一经在“麦邻生活”平台公布后，立即自动生效。您登录或继续使用“服务”即表示您已阅读并接受经修订的协议。</p>
        <p>当您与“麦邻生活”平台发生争议时，应以最新的条款为准。除另行明确声明外，任何使“服务”范围扩大或功能增强的新内容均受本协议约束。</p>
        <h4 style="font-weight:700;">2.服务对象</h4>
        <p>“服务”仅供能够完全民事行为能力的民事主体，具有达成合约履行其义务的能力个人或公司使用。若您不具备此资格，请不要使用“麦邻生活”平台提供的服务。</p>
        <p>“麦邻生活”平台有权根据实际情况随时调整服务内容，并无需对任何人或第三方负责。</p>
        <h4 style="font-weight:700;">3.会员帐号和保密</h4>
        <p>在使用本服务前，您必须先行注册，取得本公司提供给您的帐号。您须对您的会员注册手机号和密码负责，您保证不向“麦邻生活”平台工作人员以及其他任何人泄露该帐号及密码，亦不使用其他任何人的帐号及密码。只有您本人或您的合法授权人员可以使用您的帐号，该帐号不可转让、不可赠与、不可继承。在您决定不再使用该帐号时，您应向本公司申请注销该帐号。</p>
        <p>本公司通过您的手机号和密码识别您的指示，请您妥善保管您的手机号和密码，对于因密码泄露所致的损失，由您自行承担。您同意：
        （1）如发现任何人未经授权使用您的手机号或密码，或发生违反保密规定的任何其他情况，您会立即通知“麦邻生活”平台；
        （2) 确保您在每个上网时段结束时，以正确步骤离开网站，避免因您选择自动登录而导致帐号被非法使用。“麦邻生活”平台无需且也不会对因您未能遵守本款规定而发生的任何损失或损毁负责。
        （3)在您确认密码丢失时，向“麦邻生活”平台工作人员申请重置密码。</p>
        <h4 style="font-weight:700;">4. 费用 </h4>
        <p>在您使用本服务时，本公司有权依照“麦邻生活”平台服务收费规则相应的服务收费介绍、订单及/或相关协议向您收取服务费用。具体服务费用以您使用本服务时本网站上所列之收费方式公告或您与本公司达成的其他书面协议为准。</p>
        <p>本公司拥有制订及调整服务费、支付条件之权利，但至少提前30天的时间发出通知或公告，“麦邻生活”平台将以网络公示和/或电信等方式通知。账户欠费的情况下，“麦邻生活”平台有权暂停或终止相应地收费服务，并将终止该账户与服务的连接。</p>
        <h4 style="font-weight:700;">5.注册义务</h4>
        <p>根据会员注册页面提示，输入正确的手机号和密码，完成注册，保证“麦邻生活”平台可以通过您所填写的联系方式与您取得联系。您承诺将及时更新您的会员资料以维持该等信息的有效性。</p>
        <p>在您注册成为“麦邻生活”平台用户时，您授权本公司可以通过向第三者审核您的身份和资格，并取得您使用本服务的相关资料。倘若您提供的资料或信息包含有不正确、不真实的信息，“麦邻生活”平台将保留取消您会员资格并随时结束为您提供服务的权利。</p>
        <p>您在“麦邻生活”平台进行软件许可使用或服务应用过程中应遵守以下条款：</p>
        <p>1) 遵守诚实信用的原则，遵守当地及中国有关法律法规的规定；不得利用该网站进行任何非法活动；遵守所有与使用该网站有关的协议、规定、程序和惯例；不发布各类违法或违规信息；不在“麦邻生活”平台上恶意评价其他用户； </p>
        <p>2) 同意接收来自“麦邻生活”平台及其合作伙伴发出的短信信息；</p>
        <p>3) 对由于您在使用“麦邻生活”平台服务的过程中，违反本协议或通过提及而纳入本协议的条款和规则或帐号违反任何法律或第三方的权利而产生或引起的任何索赔、要求、诉讼、损失和损害而言，无论是已知或未知的，包括合理的律师费，您明确同意就此对“麦邻生活”平台进行补偿并使其免受损害。 </p>
        <h4 style="font-weight:700;">6.服务期限</h4>
        <p>您的订单提交并完成费用支付之日起，为您所购买应用的服务期限起始日期；所购买应用到期日，为应用服务期限结束时间。某一应用服务期届满前，您可按“麦邻生活”平台公布的最新的服务说明继续购买使用此服务。 </p>
        <h4 style="font-weight:700;">7. 服务的终止</h4>
        <p>您同意，在下列情况下，“麦邻生活”平台有权在发出通知或不发出通知的情况下，可立即发出警告，随时停止提供“服务”或其任何部分：</p>
        <p>（1）违反了此协议或已在约定范围内的任一条款；</p>
        <p>（2）根据此协议相关说明而终止服务； </p>
        <p>（3）本协议终止或更新时，明示不愿接受新的服务协议的；</p>
        <p>（4）无法核实或鉴定您向本公司提供的任何资料；</p>
        <p>（5）其它任何违反互联网相关法律法规的信息或“麦邻生活”平台认为需终止服务的情况。</p>
        <p>服务终止后，“麦邻生活”平台没有义务为用户保留原帐号中或与之相关的信息，或转发未曾阅读或发送的信息给用户或第三方。无论因任何原因以任何方式终止服务，“麦邻生活”平台仍有权：（1）保存或不保存该用户的注册数据及以前的交易行为记录；（2）对于用户在服务终止前实施的违法或违约行为，“麦邻生活”平台保留追索。此外，您同意，“麦邻生活”平台不会就终止您接入“服务”而对您或任何第三者承担任何责任。</p>
        <h4 style="font-weight:700;">8. 服务的提供</h4>
        <p>本公司会尽一切努力为您提供最优质的服务，本公司保留在无须发出书面通知，仅在“麦邻生活”平台公示的情况下，暂时或永久地更改或停止部分或全部“服务”的权利。对于“麦邻生活”平台行使修改或中断服务的权利而造成损失的，”麦邻生活”平台不需对用户或任何第三方负责。</p>
        <p>本公司有权修改或变更所提供的收费服务、收费标准、收费方式、服务费及服务条款。“麦邻生活”平台在提供服务时，可能现在或日后对部分服务的用户开始收取一定的费用，如用户拒绝支付该等费用，则不能在收费开始后继续使用相关的服务。但“麦邻生活”平台将尽最大努力通过电邮或其他有效方式通知用户有关的修改或变更。</p>
        <p>本公司会定期或不定期的对提供网络服务的平台和相关的设备进行检修或者维护。本公司不能随时预见到任何技术上的问题或其他困难。该等困难可能会导致数据损失或其他服务中断。为此，您明确理解和同意，您使用“服务”的风险由您自行承担。</p>
        <h4 style="font-weight:700;">9. 责任限制</h4>
        <p>您明确理解和同意，本公司不对因下述任一情况而导致的任何损害赔偿承担责任，包括但不限于利润、商誉、使用、数据等方面的损失或其它无形损失的损害赔偿 (无论本公司是否已被告知该等损害赔偿的可能性)：</p>
        <p>（1）使用或未能使用“服务”；</p>
        <p>（2）第三方未经批准的接入或第三方更改用户的传输数据；</p>
        <p>（3） 任何第三方对“服务”的声明或关于“服务”的行为；</p>
        <p>（4）或非因本公司的原因而引起的与“服务”有关的任何其它事宜，包括疏忽。</p>
        <p>您明确理解并同意，如因您违反有关法律或者本协议之规定，使本公司遭受任何损失，受到任何第三方的索赔，或任何行政管理部门的处罚，您应对本公司承担赔偿责任，包括合理的律师费用。</p>
        <h4 style="font-weight:700;">10. 知识产权</h4>
        <p>“麦邻生活”平台上所有内容，包括但不限于著作、图片、档案、资讯、资料、网站架构、网站画面的安排、网页设计，均由本公司或其他权利人依法拥有其知识产权，包括但不限于商标权、专利权、著作权、商业秘密等。</p>
        <p>非经本公司或其他权利人书面同意，任何人不得擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表本网站程序或内容。</p>
        <h4 style="font-weight:700;">11.修改或转让</h4>
        <p>本公司有权随时修改本协议的任何条款，且有权将本协议项下的权利及义务转让予第三方。一旦本协议的任何内容发生变动，本公司将会通过适当方式向用户提示修改内容。</p>
        <p>如果您不同意本公司对本协议相关条款所做的修改及（或）转让，您有权停止使用网络服务。若您继续使用网络服务，则视为接受。</p> 
        <h4 style="font-weight:700;">12. 通知</h4>
        <p>除非另有明确规定，任何通知应以短信形式发送到您在登记过程中向“麦邻生活”平台提供的手机号码，在短信发出二十四 (24) 小时后，通知应被视为已送达，除非发送人被告知相关手机号码已注销。</p>
        <h4 style="font-weight:700;">13. 不可抗力</h4>
        <p>对于因本公司合理控制范围以外的原因，包括但不限于自然灾害、罢工或骚乱、物质短缺或定量配给、暴动、战争行为、政府行为、通讯或其他设施故障或严重伤亡事故等本公司不能预见、不能避免且不能克服的情况，致使本公司延迟或未能履约的，“麦邻生活”平台可免于承担责任。</p>
        <h4 style="font-weight:700;">14. 争议解决</h4>
        <p>任何一方未履行本协议的约定均视为违约，按合同法规定处理；因本协议或“麦家租房”平台服务所引起或与其有关的任何争议，双方应尽量友好协商解决，协商不能解决时，任何一方均可向本合同履行地及服务器所在地人民法院提起诉讼。</p>
        <p>此协议适用中华人民共和国法律。如与此协议有关的某一特定事项缺乏明确法律规定，则应参照通用的国际商业惯例和行业惯例。</p>
        <h4 style="font-weight:700;">15.其他规定</h4>
        <p>本协议构成您与“麦邻生活”平台之全部协议，并取代您和“麦邻生活”平台先前就相同事项订立的任何书面或口头协议。但在您使用相关服务、或使用第三方提供的内容或软件时，亦应遵从所适用之附加条款及权利。</p>
        <p>如本协议任何规定被裁定为无效或不可强制执行，该项规定应被撤销，而其余条款仍应有效且具有约束力。</p>
        <p>本公司未就您或其他人士的某项违约行为采取行动，并不表明本公司撤回就任何继后或类似的违约事件采取行动的权利。</p>
        <p>每项服务的内容、收费标准、收费方式、服务费及服务条款应以最后发布的通知为准。</p>
        <p>您对本协议的任何部分之意见及建议可通过客户服务部门与“麦邻生活”平台联系。</p>
      </div>
    </mt-popup>
    <v-dialog class="order-msg" width="75%" @closed="jumpUrl" />
	</div>
</template>

<script>

import { Toast } from 'mint-ui'
const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
export default {
  props: ['type', 'roomId', 'roomName', 'pic', 'price', 'address', 'houseType', 'decorationDegree', 'roomArea', 'apiAddr', 'clientType', 'isIntel'],
  data() {
    return {
      showPicker: false,
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }, {
          flex: 1,
          values: [],
          className: 'slot2',
          textAlign: 'center'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        }
      ],
      pickHList: [],
      pickMiList: [],
      todayHList: [],
      todayMiList: [],
      pickerVal: '',
      selectedTime: '',
      remark: '',
      name: '',
      phone: '',
      showCheckCode: false,
      showContract: false,
      captcha: '',
      codeText: '获取验证码',
      sendCodeCount: 0,
      isCD: false,
      orderSuccess: false,
      todayTime: [],
      nextDayTime: [],
      showOrderTime: false
    }
  },
  methods: {
    onValuesChange(picker, values) {
      if(values[0]) {
        if(values[0].text.indexOf('今天') !== -1){
          picker.setSlotValues(1, this.todayHList);
          picker.setSlotValues(2, this.todayMiList);
        } else {
          picker.setSlotValues(1, this.pickHList);
          picker.setSlotValues(2, this.pickMiList);
        }

        if(values[1] && values[2]) {
          let time = picker.getValues();
          this.pickerVal = time[0].year + '/' + time[0].month + '/' + time[0].date +
                              '(' + time[0].day + ') ' + time[1].hour + ':' +
                              time[2].minute;
        }
      }
    },
    setTimeList() {
      let today = new Date();
      let todayY = today.getFullYear();
      let todayM = today.getMonth();
      let todayD = today.getDate();

      for (var i = 0; i < 7; i++) {
        let date = new Date(todayY, todayM, todayD + i);
        let curY = date.getFullYear();
        let curM = date.getMonth() + 1;
        let curD = date.getDate();
        let curDText = curD < 10 ? '0' + curD : curD;
        let curDay = date.getDay();
        this.slots[0].values.push({
          text: i == 0 ? '今天' + '(' + weekList[curDay] + ')' : curM + '月' + curDText + '日' + '(' + weekList[curDay] + ')',
          year: curY,
          month: curM < 10 ? '0' + curM : curM,
          date: curD < 10 ? '0' + curD : curD,
          day: weekList[curDay]
        });
      }
      for (let i = 8; i <= 21; i++) {
        this.pickHList.push({
          text: i + '时',
          hour: i < 10 ? '0' + i : i
        });
      }
      this.pickMiList.push({
        text: '00分',
        minute: '00'
      });
      this.pickMiList.push({
        text: '30分',
        minute: '30'
      });

      let todayH = today.getHours();
      let todayMi = today.getMinutes();
      if(todayMi >= 30){
        this.todayHList = this.pickHList.slice(todayH - 7);
        this.todayMiList = this.pickMiList;
      } else {
        this.todayHList = this.pickHList.slice(todayH - 8);
        this.todayMiList = this.pickMiList.slice(1);
      }
    },
    setTime() {
      this.showPicker = false;
      this.selectedTime = this.pickerVal;
    },
    checkForm() {
      if(this.name == ''){
        Toast({
          message: '请输入姓名',
          duration: 3000
        });
        return ;
      }
      if(this.name.length > 12 || this.name.length < 2){
        Toast({
          message: '姓名长度为2~12个字',
          duration: 3000
        });
        return ;
      }
      if(this.phone == ''){
        Toast({
          message: '请输入手机号',
          duration: 3000
        });
        return ;
      }
      if(this.phone.length !== 11){
        Toast({
          message: '请输入11位手机号',
          duration: 3000
        });
        return ;
      }
      if(!this.selectedTime){
        Toast({
          message: '请选择看房时间',
          duration: 3000
        });
        return ;
      }
      this.showCheckCode = true;
    },
    getCheckCode() {
      if(this.isCD){
        return ;
      }
      var time = 60;
      var timer = setInterval(() => {
        this.isCD = true;
        this.sendCodeCount++;
        time--;
        this.codeText = time + '秒后重发';
        if(time < 0){
          this.isCD = false;
          clearInterval(timer);
          this.codeText = '重发验证码';
        }
      }, 1000);

      this.sendReq('https://' + this.apiAddr + '.mdguanjia.com/myhome/api/customer', {
        "v": "2.3",
        "method": "sendCheckcode",
        "params": {
          "devId": "5555998cccf2492db015c442f087f00a",
          "jpushId": "",
          "mobile" : this.phone
        }
      }).then((res) => {
        if(res.data.code == 0){
          Toast({
            message: '验证码发送成功，请查收',
            duration: 3000
          });
        } else {
          Toast({
            message: res.data.message,
            duration: 3000
          });
        }
      }).catch((err) => { console.log(err) })
    },
    sendOrder() {
      if(!this.captcha){
        Toast({
          message: '验证码不能为空',
          duration: 3000
        });
        return ;
      }
      if(this.captcha.length !== 6){
        Toast({
          message: '请输入6位数的验证码',
          duration: 3000
        });
        return ;
      }
      let year = Number(this.selectedTime.split('/')[0]);
      let month = Number(this.selectedTime.split('/')[1]);
      let date = Number(this.selectedTime.split('/')[2].split('(')[0]);
      let hour = Number(this.selectedTime.split(' ')[1].split(':')[0]);
      let minute = Number(this.selectedTime.split(' ')[1].split(':')[1]);
      this.sendReq('https://' + this.apiAddr + '.mdguanjia.com/myhome/api/customer', {
        "v": "2.3",
        "method": "tenantBooking",
        "params": {
          "devId": "5555998cccf2492db015c442f087f00a",
          "jpushId": "",
          "housingType": this.type,
          "positionId": this.roomId,
          "name" : this.name,
          "phone" : this.phone,
          "bookingTime" : new Date(year, month-1, date, hour, minute, 0).getTime(),
          "remark" : this.remark,
          "vcode" : this.captcha,
          "isIntelligent": this.isIntel == 'bolin'
        }
      }).then((res) => {
        if(res.data.code == 0){
          this.orderSuccess = true;
          this.$modal.show('dialog', {
            title: '预约成功',
            text: '已预约 <span style="color:#4680ff">' + this.selectedTime + '</span> 看房',
            buttons: [
              {
                title: '知道了',
                handler: () => { this.$modal.hide('dialog') }
              }
           ]
          })
        } else {
          this.$modal.show('dialog', {
            title: '预约失败',
            text: res.data.message || '出了点小问题，请重试',
            buttons: [
              {
                title: '知道了',
                handler: () => { this.$modal.hide('dialog') }
              }
           ]
          })
        }
      }).catch((err) => { console.log(err) })
    },
    jumpUrl() {
      if(this.orderSuccess){
        if (this.clientType == 'h5') {
          window.location.href = 'https://www.mdguanjia.com/waptest/houseInfo/appdownload/index.html';
        }else{
          window.location.href = 'https://www.mdguanjia.com/waptest/activePages/intelEstate/index.html';
        }
      }
    },
    getOrderTime() {
      this.sendReq('https://' + this.apiAddr + '.mdguanjia.com/myhome/api/estate', {
        "v": "3.1.0",
        "method": "intelligentTenantTime",
        "params": {
          "devId": "5555998cccf2492db015c442f087f00a",
          "estateRoomTypeId": this.roomId
        }
      }).then((res) => {
        if(res.data.code == 0){
          res.data.data.todayTimes.forEach((item, index) => {
            this.todayTime.push(item);
          })
          res.data.data.nextDayTimes.forEach((item, index) => {
            this.nextDayTime.push(item);
          })
          this.showOrderTime = true;
        } else {
          Toast({
            message: res.data.message,
            duration: 3000
          });
          return false;
        }
      })
    },
    chooseTime(obj) {
      var chooseTime = new Date(Number(obj.timesTemp));
      var year = chooseTime.getFullYear();
      var month = chooseTime.getMonth() + 1;
      var date = chooseTime.getDate();
      var day = chooseTime.getDay();
      month = month < 10 ? '0' + month : month;
      date = date < 10 ? '0' + date : date;
      this.selectedTime = year + '/' + month + '/' + date + ' (' + weekList[day] + ') ' + obj.time;
      this.showOrderTime = false;
    }
  },
  watch: {
    remark(val) {
      if(val.length > 50){
        Toast({
          message: '备注不能超过50个字符',
          duration: 3000
        });
        this.remark = val.substr(0, 10);
      }
    }
  },
  filters: {
    dateFormat(val) {
      var year = val.getFullYear();
      var month = val.getMonth() + 1;
      var date = val.getDate();
      var day = val.getDay();
      month = month < 10 ? '0' + month : month;
      date = date < 10 ? '0' + date : date;
      return year + '/' + month + '/' + date + ' (' + weekList[day] + ') ';
    },
  },
  mounted() {
    this.setTimeList();
  }
}
</script>
<style lang="scss">
  .booking-container {
    .booking-block {
      margin-bottom: 0.4rem;
    }
    .booking-box {
      padding: 0.4rem;
      background-color: #fff;
    }
    .tips {
      padding-left: 0.4rem;
      color: #999;
    }
    .room-box {
      display: flex;
      justify-content: center;
      .room-pic {
        width: 3.36rem;
        height: 2.533333rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .room-info {
        width: 5.84rem;
        padding-left: .346667rem;
        & > div {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .room-name {
          font-size: .4rem;
          margin-bottom: .213333rem;
        }
        .room-layout {
          color: #999;
          margin-bottom: .373333rem;
        }
        .room-price {
          color: #ee7500;
          margin-bottom: .426667rem;
          font-size: .426667rem;
        }
      }
    }
    .input-group {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:first-child {
        border-bottom: 1px solid #f5f5f5;
      }
      input, label {
        font-size: 0.373333rem;
      }
      input {
        width: 7.2rem;
      }
      label {
        flex-grow: 1;
      }
      .icon {
        position: absolute;
        top: 0.48rem;
        right: 0.4rem;
        width: 0.4rem;
        height: 0.4rem;
        background-image: url(../assets/images/icon-r.png);
        background-size: cover;
      }
    }
    .remarks {
      label {
        display: block;
        font-size: 0.373333rem;
        margin-bottom: 0.4rem;
      }
      textarea {
        width: 100%;
        font-size: 0.32rem;
      }
    }
    .order-btn {
      margin: 0.8rem 0.4rem 0;
      .btn {
        padding: 0.4rem 0;
        width: 100%;
        font-size: 0.373333rem;
        line-height: 1;
        border-radius: 1.173333rem;
      }
    }
    .order-msg {
      .v--modal {
        padding-top: 0;
        border-radius: 3px;
        .vue-dialog-button {
          color: #4680ff;
        }
      }
    }
  }
  .mj-picker {
    width: 100%;
    .picker-toolbar {
      height: 36px;
    }
    .mj-picker-head {
      line-height: 36px;
      font-size: 16px;
      text-align: center;
      padding: 0 0.4rem;
      span {
        font-size: 12px;
        color: #0575f2;
      }
      .fl {
        float: left;
      }
      .fr {
        float: right;
      }
    }
    .picker-slot {
      font-size: 0.373333rem;
    }
  }
  .checkCode-modal {
    text-align: center;
    background-color: #f8f8f8;
    border-radius: 10px;
    .checkCode-container {
      padding: 0.4rem;
    }
    .head {
      font-size: 0.426667rem;
    }
    .head, .phone, .mint-field {
      margin-bottom: 0.32rem;
    }
    .mint-field {
      width: 6.4rem;
      padding: 0.16rem 0;
      min-height: auto;
      .mint-cell-wrapper {
        padding: 0;
        flex-direction: row-reverse;
        font-size: 0.373333rem;
        background: none;
      }
      .mint-cell-value {
        padding: 0 0.24rem;
      }
      .mint-field-other {
        margin-left: 0.16rem;
        padding-left: 0.24rem;
        border-left: 1px solid #ddd;
      }
    }
    .tips {
      margin-bottom: 0.24rem;
    }
    .tips, .contract {
      font-size: 0.32rem;
    }
    .active {
      color: #4680ff;
    }
    .checkCode-confirm {
      padding: 0.4rem 0;
      border-top: 1px solid #ddd;
      font-size: 0.426667rem;
    }
  }
  .contract-modal {
    width: 100%;
    height: 100%;
    .head {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 50;
      width: 100%;
      padding: 0.4rem;
      text-align: center;
      border-bottom: 1px solid #ddd;
      background-color: #fff;
      font-size: 0.426667rem;
      .close-btn {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        width: 0.8rem;
        height: 0.8rem;
        background-image: url(../assets/images/close-btn.png);
        background-size: cover;
      }
    }
    .contract-container {
      width: 100%;
      height: 100%;
      padding: 0.4rem;
      padding-top: 1.6rem;
      line-height: 1.5;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    p {
      text-indent: 2em;
    }
  }
  .orderTime-modal {
    width: 100%;
    height: 90%;
    background-color: rgb(237, 239, 242);
    .orderTime-container {
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .title {
      height: 1.28rem;
      font-size: 0.426667rem;
      padding: 0.4rem;
      border-bottom: 1px solid #ddd;
      background-color: #fff;
    }
    .time-content {
      padding-top: 0.4rem;
      margin-bottom: 0.4rem;
      background-color: #fff;
    }
    .btn-box {
      display: inline-block;
      width: 2.0rem;
      margin-left: 0.4rem;
      margin-bottom: 0.4rem;
      height: 0.8rem;
      line-height: 0.8rem;
      .btn {
        display: block;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
        border-radius: 0.4rem;
        color: #333;
      }
      .btn-disabled {
        color: #ccc;
        background-color: #fff;
      }
    }
    .btn-container {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      line-height: 1.28rem;
      font-size: 0.426667rem;
      display: flex;
      justify-content: space-between;
      padding: 0 0.4rem;
      .btn {
        width: 2rem;
        color: #2e8ded;
      }
    }
  }
</style>