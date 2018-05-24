<template>
  <div class="height100">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header title="房东管理" slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        <x-icon slot="overwrite-left" type="ios-search-strong" style="fill:#fff;position:relative;top:-8px;left:-3px;" size="30"></x-icon>
        <x-icon slot="right" type="ios-plus-outline" style="fill:#fff;position:relative;top:-8px;right:-3px;font-weight:700" size="30"></x-icon>
      </x-header>
      
      <footers :selectedIndex="0" slot="bottom"></footers>
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
