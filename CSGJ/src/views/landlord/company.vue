<template>
  <div class="height100">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header title="新增房东(企业)" slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
      <p  class="check-not-pass" v-show="firmForm.status === 2">审核未通过，{{firmForm.auditReasons}}</p>
      <group class="noTop" label-width="80px">
        <x-input title="企业名称" required v-model="firmForm.businessName" placeholder="请输入"></x-input>
        <x-input title="社会统一信用代码" required v-model="firmForm.unifiedSocialCreditCode" placeholder="请输入"></x-input>
        <x-input title="企业法人" required v-model="firmForm.businessEntity" placeholder="请输入"></x-input>
        <x-input title="出房费率" class="redInput" readonly v-model="firmForm.splitFree" placeholder="请输入"></x-input>
        <x-input title="企业联系人" class="redInput" readonly v-model="firmForm.concatPerson" placeholder="请输入">
           <i class="iconfont icon-zhaoxiangji" slot="right" @click.prevent="photo" v-show="firmForm.status==2"></i>
        </x-input>
        <x-input v-if="firmForm.status===1"  title="身份证号码" class="redInput" readonly v-model="plusXingCard" placeholder="请输入"></x-input>
        <x-input v-else title="身份证号码" class="redInput" readonly v-model="firmForm.IDCard" placeholder="请输入"></x-input>
        <x-input title="手机号码" class="redInput" readonly v-model="firmForm.mobile" placeholder="请输入"></x-input>
        <x-input title="备注" class="redInput" readonly v-model="firmForm.remark" placeholder="最多10个字"></x-input>
        <x-input v-if="firmForm.status===0"   title="银行卡类型" class="redInput" readonly v-model="firmForm.bankCardType" placeholder="请输入"></x-input>
        <selector v-else title="银行卡类型"  :options="bankCardType" :min="0" @on-change="getbankType"></selector>

        <selector v-if="firmForm.status===4" title="开户银行"  v-model="firmForm.cardType" :options="bankCardType" :min="0"></selector>
        <!-- <x-input v-else title="开户名" class="redInput" readonly v-model="firmForm.accountName" placeholder="请输入"></x-input> -->
        <x-input v-else-if="firmForm.status===1" title="开户人身份证1" class="redInput" readonly v-model="plusXingaccountIDcardNum" placeholder="请输入"></x-input>
        <x-input v-else title="开户人身份证" class="redInput" readonly v-model="firmForm.accountIDcardNum" placeholder="请输入"></x-input>
        <x-input title="银行卡号" class="redInput" readonly v-model="firmForm.bankCard" placeholder="请输入"></x-input>
        <cell title="企业营业执照">
          <img-upload 
          :uploadParam="uploadParam"
          :cropperList = firmForm.businessLicenceImageUrl
          ></img-upload>
        </cell>
        <cell title="联系人身份证">
          <img-upload 
          :uploadParam="uploadParam"
          :cropperList = firmForm.idImageUrl
          ></img-upload>
        </cell>
      <cell title="平台代理收租服务">
          <img-upload 
          :uploadParam="uploadParam"
          :cropperList = firmForm.hourseAgreementUrl
          ></img-upload>
        </cell>
        <cell title="房源发布和租客引流服务">
          <img-upload 
          :uploadParam="uploadParam"
          :cropperList = firmForm.drainageServiceUrl
          ></img-upload>
        </cell>
      </group>
      <div slot="bottom" class="bottomDiv">
        <x-button disabled type="primary" action-type="button" v-if="firmForm.status === 0">{{statusBtn}}</x-button>
        <x-button type="primary" action-type="button" v-else @click.native="toSave">{{statusBtn}}</x-button>
      </div>
    </view-box>
  </div>
</template>

<script>
import { Popup, TransferDom, XButton, XInput, XTextarea, Selector } from 'vux'
import { queryListByPageApi } from '@/api/source'
import { plusXing } from '@/utils'
import imgUpload from '@/components/upload'

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    XButton,
    XInput,
    XTextarea,
    imgUpload,
    Selector
  },
  mounted() {
    let routerParams = this.$route.params
    console.log(routerParams, 'routerParams')
    // let self = this
    // TODO getCheckDetial
    // if (!routerParams.id) {
    //   console.log('缺少id')
    //   return false
    // }
    // getCheckDetial(routerParams.id).then(res => {
    //   if (res && res.success) {
    //     self.firmForm = res.data
          // if (res.data.status === 1) {
          //   this.uploadParam.isShowUploadBtn = false
          // }
    //   }
    // })
  },
  data() {
    return {
      // firmForm.status: 1, // 0:未通过，1:审核中，2:通过，3:新增企业个人银行, 4:对公银行，5：对公审核中
      firmForm: {
        status: 1, //0-待审核,1-审核成功,2-审核失败
        type: 2, // 1：个人，2：企业
        businessName: '前端牛逼有限公司',
        unifiedSocialCreditCode: '32132132321', // 社会信用代码
        businessEntity: '张三', //企业法人
        splitFree: '35%',
        concatPerson: '李四', // 企业联系人
        IDCard: '61912338298329321321321',
        mobile: '1332323223',
        remark: '',
        cardType: '1',
        auditReasons: '你太丑了',
        accountName: '王五', // 开户名
        accountIDcardNum: 3213213213213, // 开户人身份证
        bankCard: 343232323, // 银行卡号
        sex: 1,
        bankCardType: '个人',
        drainageServiceUrl: [{src: 'http://www.w3school.com.cn/i/eg_tulip.jpg'}],
        idImageUrl: [{src: 'http://www.w3school.com.cn/i/eg_tulip.jpg'}],
        hourseAgreementUrl: [{src: 'http://www.w3school.com.cn/i/eg_tulip.jpg'}],
        businessLicenceImageUrl: [{src: 'http://www.w3school.com.cn/i/eg_tulip.jpg'}, {src: 'http://www.w3school.com.cn/i/eg_tulip.jpg'},{src: 'http://www.w3school.com.cn/i/eg_tulip.jpg'}]
      },
      bankType: 1, // 1:对公，2:私人
      bankCardType: [{
          value: '对公银行',
          key: '2'
        },{
          value: '个人',
          key: '1'
        }
      ],
      uploadParam: {
        fixedNumber: [4, 3], // 截图框的宽高比例
        fixed: true, // 是否开启截图框宽高固定比例
        fixedBox: false, // 固定截图框大小 不允许改变
        info: true, // 裁剪框的大小信息
        size: 1, // 裁剪生成图片的质量
        autoCrop: true,
        // autoCropWidth: 320,
        // autoCropHeight: 250,
        canMoveBox: true, // 截图框能否拖动
        showRotate: true, // 是否显示旋转按钮
        showPlusMinus: true, // 是否显示加减按钮
      }
    }
  },
  computed: {
    statusBtn () {
      let status = this.firmForm.status
      console.log(this.firmForm.status, 'status')
      return status === 2 ? '重新提交申请' : status === 0 ? '审核中' : ''
    },
    plusXingCard: {
      get: function () {
        return plusXing(this.firmForm.IDCard, 6, 4)
      },
      set: function () {
      }
    },
    plusXingaccountIDcardNum: {
      get: function () {
        return plusXing(this.firmForm.accountIDcardNum, 6, 4)
      },
      set: function () {
      }
    }
  },
  methods: {
    toSave() {
      this.$vux.toast.text('fuck')
    },
    photo() {
      this.firmForm.businessName = '你爸爸'
    },
    getbankType (value) {
      // let currentStatus = this.firmForm.status
      // if (value == 2) {
      //   this.firmForm.status = 3
      // } else {
      //   this.firmForm.status = currentStatus
      // }
      // this.firmForm.status = value == 1 ? 4 : 3
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .redInput {
    .weui-cell__bd {
      color: red !important;
    } 
  }
  .icon-zhaoxiangji {
    font-size: 18px;
    color: #4680FF;
  }
  .imgNav {
    li {
      width: 60px;
      height: 60px;
      float: left;
      margin-right: 5px;
      border: 1px solid #ddd;
      margin-bottom: 5px;
    }
  }
  .check-not-pass{
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: rgba(229, 28, 35, 1);
  }
</style>
