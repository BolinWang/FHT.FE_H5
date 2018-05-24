/*
 * @Author: chenxing 
 * @Date: 2018-05-15 11:06:55 
 * @Last Modified by:   chenxing 
 * @Last Modified time: 2018-05-15 11:06:55 
 */

<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header title="工作台" slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        <i slot="overwrite-left"></i>
      </x-header>
      <footers :selectedIndex="2" slot="bottom"></footers>
    </view-box>
  </div>
</template>

<script>
import footers from '@/components/footer'

export default {
  components: {
    footers
  },
  mounted() {
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style>

</style>
