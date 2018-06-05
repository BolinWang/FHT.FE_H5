/*
 * @Author: chenxing 
 * @Date: 2018-06-05 10:35:34 
 * @Last Modified by:   chenxing 
 * @Last Modified time: 2018-06-05 10:35:34 
 */

<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header slot="header" title="编辑房源信息" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
      <tab v-if="houseType === 2">
        <tab-item :selected="current === 1" @click.native="current = 1">基础信息</tab-item>
        <tab-item :selected="current === 2" @click.native="current = 2">房间信息</tab-item>
      </tab>
      <house-info v-show="current === 1"></house-info>
      <room-info v-show="current === 2"></room-info>
      <div slot="bottom" class="bottomDiv">
        <x-button  type="primary" action-type="button" @click.native="saveData">保存</x-button>
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
      houseType: 2,
      current: 1
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
