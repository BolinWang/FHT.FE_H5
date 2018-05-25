<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="0">
      <x-header :left-options="{backText: ''}" slot="header" title="房间详情" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        <div class="search" solt="overwrite-title" @click="doSearch">
          搜索小区/公寓名称
          <i class="iconfont icon-sousuo"></i>
        </div>
        <div slot="right">确定</div>
      </x-header>
      
    </view-box>
  </div>
</template>

<script>
import mapSearch from '@/components/map'
let map = null
export default {
  components: {
    mapSearch
  },
  mounted() {
  },
  data() {
    return {
      wordShow: false
    }
  },
  methods: {
    doSearch() {
      this.wordShow = true
    },
    changeShow() {
      this.wordShow = false
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
   #mapDiv {
    width: 100%;
    height: 500px;
    position: relative
  }
  .search {
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-radius: 10px;
    background-color: rgba(112, 161, 255, 1);
    text-align: center;
    position: relative;
    top: -4px;
    font-size: 24px;
    color: #eee;
    display: inline-block;
    .icon-sousuo {
      position: absolute;
      left: 5%;
    }
  }

</style>
