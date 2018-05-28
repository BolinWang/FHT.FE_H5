<template>
  <div class="height100">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header title="新增房东(个人)" slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
      <p  class="check-not-pass" v-show="checkStatus === 0">审核未通过，具体原因</p>
      <group class="noTop" label-width="80px">
        <x-input title="手机号码" required v-model="userForm.mobile" placeholder="请输入"></x-input>
        <x-input title="姓名" required v-model="userForm.name" placeholder="请输入">
          <i class="iconfont icon-zhaoxiangji" slot="right" @click.prevent="photo" v-if="checkStatus === 4"></i>
          <button type="button" class="button-sex" slot="right" v-else>{{userForm.sex}}</button>
        </x-input>
        <x-input title="身份号码" required v-model="userForm.cardNo" placeholder="请输入"></x-input>
        <x-input title="出房费率" class="redInput" readonly v-model="userForm.fee" placeholder="请输入"></x-input>
        <x-textarea title="备注" :rows="1" placeholder="最多10个字" v-model="userForm.desc" :max="10" autosize :show-counter="false" @click.native="addDesc"></x-textarea>
        <cell title="身份证照片">
          <img-upload :uploadParam="uploadParam"></img-upload>
        </cell>
        <cell title="平台代理收租服务">
          <img-upload :uploadParam="uploadParam"></img-upload>
        </cell>
        <cell title="房源发布和租客引流服务">
          <img-upload :uploadParam="uploadParam"></img-upload>
        </cell>
      </group>
      <div slot="bottom" class="bottomDiv">
        <x-button disabled type="primary" action-type="button" v-if="checkStatus === 1">{{statusBtn}}</x-button>
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
    console.log(routerParams)
    // TODO getCheckDetial
    getCheckDetial(routerParams.id).then(res => {
      // 
    })
  },
  computed: {
    statusBtn () {
      let status = this.checkStatus
      return status === 0 ? '重新提交申请' : status === 1 ? '审核中' : status === 2 ? '审核通过-绑定银行卡' : ''
    }
  },
  data() {
    return {
      checkStatus: 0, // 0 => 未通过，1 => 审核中，2 =>通过未绑卡，3 =>成功！4=> 新增用户
      userForm: {
        name: '张三',
        cardNo: '1232134323423432',
        mobile: '313424543543543',
        fee: '35%',
        desc: '3213213',
        sex: '先生'
      },
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
  methods: {
    toSave() {
      if (this.checkStatus === 2) {
        this.$router.push({
          path: '/bindingCard', 
          name: 'bindingCard'
          // params: item
        })
      }
      // this.$vux.toast.text('fuck')
    },
    photo() {
      this.userForm.name = '你爸爸'
    },
    addDesc () {
      let self = this
      this.$vux.confirm.prompt('最多10个字', {
        onCancel () {},
        onConfirm (value) {
          self.userForm.desc = value
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
</style>
