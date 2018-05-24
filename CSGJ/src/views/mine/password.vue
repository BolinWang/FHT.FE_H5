<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header title="修改密码" slot="header" class="header">  
      </x-header>
      <group label-width="100" ref="form" label-margin-right="0">
        <x-input title="原密码" v-model="formData.oldPwd" :min="6" placeholder="请输入原密码" required type="password" ></x-input>
        <x-input title="新密码" v-model="formData.newPwd" placeholder="请设置6-12位密码" required type="password" :min="6" :max="12"></x-input>
        <x-input title="确认密码" v-model="formData.checkPwd" placeholder="请确认密码" required type="password"  ></x-input>
      </group>
      <div slot="bottom" class="bottomDiv">
        <x-button  type="primary" action-type="button" @click.native="save">确定</x-button>
      </div>
    </view-box>
  </div>
</template>

<script>
import { XInput, XButton } from 'vux'
import { validResult } from '@/utils'

export default {
  components: {
    XInput,
    XButton
  },
  mounted() {
  },
  data() {
    return {
      formData: {
        oldPwd: '',
        newPwd: '',
        checkPwd: ''
      }
    }
  },
  methods: {
    save() { //退出
      let list = this.$refs.form.$children
      if(validResult(list)) {
        if (this.formData.newPwd === this.formData.checkPwd) {
          console.log(this.formData)
        } else {
          this.$vux.toast.text('两次输入密码不一致')
        }
      }
    }
  }
}
</script>

<style>
</style>
