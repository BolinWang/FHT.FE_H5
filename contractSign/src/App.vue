<template>
  <div id="app">
    <!-- <pdfview></pdfview> -->
    <sign></sign>
  </div>
</template>

<script>
import pdfview from '@/views/pdfview'
import sign from '@/views/sign'
export default {
  name: 'app',
  components: {
    pdfview,
    sign
  }
}
</script>

<style lang="scss">
@import './styles/index.scss';
#app {
  width: 750px;
}
</style>
