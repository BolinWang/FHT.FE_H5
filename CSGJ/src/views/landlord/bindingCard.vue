<template>
  <div class="height100">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header title="绑定银行卡" slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
      <group class="noTop" label-width="80px">
        <x-input title="姓名" required v-model="userForm.cardNo" placeholder="请输入姓名"></x-input>
        <x-input title="身份证" required v-model="userForm.mobile" placeholder="请输入身份证号"></x-input>
        <x-input title="银行卡号" class="redInput"  v-model="userForm.fee" placeholder="请输入卡号"></x-input>
      </group>
      <div slot="bottom" class="bottomDiv">
        <x-button type="primary" action-type="button" @click.native="toSave">确定</x-button>
      </div>
    </view-box>
  </div>
</template>

<script>
import { Popup, TransferDom, XButton, XInput, XTextarea } from 'vux'
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
    imgUpload
  },
  mounted() {
  },
  data() {
    return {
      userForm: {
        name: '张三',
        cardNo: '',
        mobile: '',
        fee: '',
        desc: ''
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
      this.$vux.toast.text('fuck')
    },
    photo() {
      this.userForm.name = '你爸爸'
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
</style>
