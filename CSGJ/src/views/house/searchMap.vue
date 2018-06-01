<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="0">
      <x-header :left-options="{backText: ''}" slot="header" title="选择房源地址" style="width:100%;position:absolute;left:0;top:0;z-index:100;" >
        <div class="search" solt="overwrite-title" @click="doSearch">
          搜索小区/公寓名称
          <i class="iconfont icon-sousuo"></i>
        </div>
        <div slot="right" @click="saveMapData">确定</div>
      </x-header>
      <map-search v-model="mapSearchData" :wordShow="wordShow" @changeShow="changeShow"></map-search>
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
    window['backUrl'] = () => {
      return 'true'
    }
  },
  data() {
    return {
      wordShow: false,
      mapSearchData: {}
    }
  },
  methods: {
    doSearch() {
      this.wordShow = true
    },
    changeShow() {
      this.wordShow = false
    },
    saveMapData(){
      this.$store.commit('updateMapData', this.mapSearchData)
      this.$router.back(-1)
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
   #mapDiv {
    width: 100%;
    height: 250px;
    position: relative
  }
  .search {
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    background-color: rgba(112, 161, 255, 1);
    text-align: center;
    position: relative;
    top: -2px;
    font-size: 12px;
    color: #eee;
    display: inline-block;
    .icon-sousuo {
      position: absolute;
      left: 5%;
    }
  }

</style>
