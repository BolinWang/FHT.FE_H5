<template>
  <div id="app">
    <section class="agreeTxt" v-html="userAgreeMent"></section>
  </div>
</template>

<script>
import userAgreeMent from '@/utils/mlAgree'
export default {
  name: 'app',
  data () {
    return {
      userAgreeMent
    }
  }
}
</script>

<style lang="scss">
@import './styles/index.scss';
.agreeTxt {
  width: 750px;
  padding: 20px;
  margin: 0 auto;
}
</style>
