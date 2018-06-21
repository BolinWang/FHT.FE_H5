/*
 * @Author: chenxing 
 * @Date: 2018-04-23 17:40:16 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-13 16:00:28
 */
<template>
  <div class="height100">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header 
      title="新增带看" 
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
      slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
      <flexbox>
        
      </flexbox>
      <group class="noTop" label-width="90px">
       
      </group>
      <div slot="bottom" class="bottomDiv">
        <x-button type="primary" action-type="button" @click.native="saveData">确定</x-button>
      </div>
    </view-box>
    
  </div>
</template>

<script>
import { PopupPicker, XButton, Flexbox, FlexboxItem } from 'vux'
import { deepClone } from '@/utils'
export default {
  name: 'source-watch',
  components: {
    PopupPicker,
    XButton,
    Flexbox, 
    FlexboxItem
  },
  created() {
    window['backUrl'] = () => {
      this.goBack()
      return 'true'
    }
  },
  data() {
    return {
    }
  },
  methods: {
    goBack() {
      this.$router.push({name: 'sourceDetail', params: {guestSourceId: this.guestSourceId}})
    },
    msg(val) {
      this.$vux.toast.text(val)
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
 
</style>
