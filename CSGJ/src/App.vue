<template>
  <div id="app" style="height:100%">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
    </router-view>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
@import './styles/index.less';
</style>