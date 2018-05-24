<template>
  <Tabbar slot="bottom" class="bottomTab">
    <tabbar-item :selected="selectedIndex === 0" link="/landlord">
      <i class="iconfont icon-yonghu" slot="icon"></i>
      <span slot="label">房东</span>
    </tabbar-item>
    <tabbar-item :selected="selectedIndex === 1" link="/house">
      <i class="iconfont icon-fangyuan" slot="icon"></i>
      <span slot="label">房源</span>
    </tabbar-item>
    <tabbar-item :selected="selectedIndex === 2" link="/workbench">
      <i class="iconfont icon-gongzuotai" slot="icon"></i>
      <span slot="label">工作台</span>
    </tabbar-item>
    <tabbar-item :selected="selectedIndex === 3" link="/guest">
      <i class="iconfont icon-kehu1" slot="icon"></i>
      <span slot="label">客源</span>
    </tabbar-item>
    <tabbar-item :selected="selectedIndex === 4" link="/mine">
      <i class="iconfont icon-wo" slot="icon"></i>
      <span slot="label">我的</span>
    </tabbar-item>
  </Tabbar>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'
  export default {
    props: {
      selectedIndex: {
        type: Number,
        default: 0
      }
    },
    components: {
      Tabbar,
      TabbarItem
    },
    mounted(){
      document.getElementsByTagName('body')[0].style.height = window.innerHeight+'px'
    }
  }
</script>

<style scoped lang="less">
  .weui-tabbar {
    background: #fff;
  }
  .bottomTab {
    .iconfont {
      position: relative;
      top: -3px;
    }
  }
  
</style>
  