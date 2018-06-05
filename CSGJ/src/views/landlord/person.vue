<template>
  <div class="height100">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header title="新增房东(个人)" slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
      <form id="registerForm">
        <p  class="check-not-pass" v-show="userForm.status === 2">审核未通过，原因: {{userForm.auditReasons}}</p>
        <group class="noTop" label-width="80px">
          <x-input title="手机号码" required v-model="userForm.mobile" placeholder="请输入"></x-input>
          <x-input title="姓名" v-model="userForm.name" placeholder="请输入" name="name">
            <i class="iconfont icon-zhaoxiangji" slot="right" @click.prevent="photo" v-if="userForm.status === 2"></i>
            <button type="button" class="button-sex" slot="right" v-else>{{userForm.sex == 1 ? '先生' : '女士'}}</button>
          </x-input>
          <x-input title="身份号码" required v-model="userForm.cardNo" placeholder="请输入"></x-input>
          <x-input title="出房费率" class="redInput" readonly v-model="userForm.splitFree" placeholder="请输入"></x-input>
          <x-textarea title="备注" :rows="1" placeholder="最多10个字" v-model="userForm.remark" :max="10" autosize :show-counter="false" @click.native="addRemark"></x-textarea>
          <cell title="身份证照片">
            <img-upload
            :uploadParam = "uploadParam"
            :cropperList = userForm.idImageUrl
            >
            </img-upload>
          </cell>
          <cell title="平台代理收租服务">
            <img-upload :uploadParam="uploadParam"
            :cropperList = userForm.hourseAgreementUrl
            ></img-upload>
          </cell>
          <cell title="房源发布和租客引流服务">
            <img-upload :uploadParam="uploadParam"
            :cropperList = userForm.drainageServiceUrl
            ></img-upload>
          </cell>
        </group>
      </form>
      <div slot="bottom" class="bottomDiv">
        <x-button disabled type="primary" action-type="button" v-if="userForm.status === 1">{{statusBtn}}</x-button>
        <x-button type="primary" action-type="button" v-else @click.native="toSave">{{statusBtn}}</x-button>
      </div>
    </view-box>
  </div>
</template>

<script>
import { Popup, TransferDom, XButton, XInput, XTextarea } from 'vux'
import { queryListByPageApi } from '@/api/source'
import { plusXing } from '@/utils'
import imgUpload from '@/components/upload'
import { getCheckDetial } from '@/api/landlord'
import Validator from '@/utils/formValidator'


export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    XButton,
    XInput,
    XTextarea,
    imgUpload
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
    //     self.userForm = res.data
          // if (res.data.status === 1) {
          //   this.uploadParam.isShowUploadBtn = false
          // }
    //   }
    // })
  },
  computed: {
    statusBtn () {
      let status = this.userForm.status
      return status === 0 ? '重新提交申请' : status === 1 ? '审核中' : status === 2 ? '重新提交申请' : ''
    }
  },
  data() {
    return {
      // userForm.status: 0, // 0 => 未通过，1 => 审核中，2 =>通过未绑卡，3 =>成功！4=> 新增用户
      userForm: {
        name: '张三',
        cardNo: '1232134323423432',
        mobile: '313424543543543',
        splitFree: '35%',
        remark: '3213213',
        sex: 1,
        auditReasons: '没钱说个jb', // 失败理由
        status: 1, // 审核状态 0-待审核,1-审核成功,2-审核失败
        type: 1, // 1：个人，2：企业
        hourseAgreementUrl: [{src: 'http://www.w3school.com.cn/i/eg_tulip.jpg'}], // 平台代理收租服务图片地址
        idImageUrl: [{src: 'http://www.w3school.com.cn/i/eg_tulip.jpg'}, {src: 'http://www.w3school.com.cn/i/eg_tulip.jpg'},{src: 'http://www.w3school.com.cn/i/eg_tulip.jpg'}], // 联系人身份证图片
        drainageServiceUrl: [{src: 'http://www.w3school.com.cn/i/eg_tulip.jpg'}] // 租客引流服务图片地址
      },
      uploadParam: {
        isShowUploadBtn: true,
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
  methods: {
    validatorFunc () {
      let registerForm = document.querySelector('#registerForm')
      let validator = new Validator()

      validator.add(registerForm.name, [{
          strategy: 'isNonEmpty',
          errorMsg: '用户名不能为空！'
      }, {
          strategy: 'minLength:6',
          errorMsg: '用户名长度不能小于6位！'
      }])

      let errorMsg = validator.start()
      return errorMsg
    },
    toSave() {

      let errorMsg = this.validatorFunc()
      if (errorMsg) {
          console.log(errorMsg)
          return false
      }
      // if (this.userForm.status === 2) {
      //   this.$router.push({
      //     path: '/bindingCard', 
      //     name: 'bindingCard'
      //     // params: item
      //   })
      // }
      // this.$vux.toast.text('fuck')
    },
    photo() {
      this.userForm.name = '你爸爸'
    },
    addRemark () {
      let self = this
      this.$vux.confirm.prompt('最多10个字', {
        onCancel () {},
        onConfirm (value) {
          self.userForm.remark = value
        },
        title: '请输入备注'
      })
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .redInput {
    .weui-input {
      color: red !important;
    } 
  }
  .weui-cell__ft{
    overflow-x: scroll;
  }
  .button-sex{
    padding: 2px 20px;
    background: rgba(70, 128, 255, 1);
    font-size: 12px;
    color: #fff;
    border-radius: 10px;
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
  ::-webkit-scrollbar{
    display:none;
  }
</style>
