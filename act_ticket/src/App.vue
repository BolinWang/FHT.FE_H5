<template>
  <div id="app">
    <active-page></active-page>
  </div>
</template>

<script>
import activePage from '@/views/activePage'
export default {
  name: 'app',
  components: {
    activePage
  }
}
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
