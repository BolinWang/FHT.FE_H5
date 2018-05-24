<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header title="我的" slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        <i slot="overwrite-left"></i>
        <div slot="right" @click="loginOut">退出</div>
      </x-header>
      <group >
        <cell title="修改密码" is-link link="/mine/password"></cell>
      </group>
      <footers :selectedIndex="4" slot="bottom"></footers>
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
    loginOut() { //退出
      this.$vux.confirm.show({
        content: '确认要退出吗？',
        onConfirm() {
          console.log('退出了')
        }
      })
    }
  }
}
</script>

<style>


</style>
