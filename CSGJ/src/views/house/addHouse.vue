<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header slot="header" title="添加房源" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
      <house-info></house-info>
      <room-info></room-info>
      <div slot="bottom" class="bottomDiv">
        <x-button  type="primary" action-type="button" @click.native="saveData">确定</x-button>
      </div>
    </view-box>
  </div>
</template>

<script>
import { Tab, TabItem, XButton } from 'vux'
import houseInfo from './components/houseInfo'
import roomInfo from './components/roomInfo'

export default {
  components: {
    Tab, 
    TabItem,
    XButton,
    houseInfo,
    roomInfo
  },
  mounted() {
  },
  data() {
    return {
      
    }
  },
  methods: {
    saveData() {

    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  
  
</style>
