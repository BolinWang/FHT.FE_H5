<template>
  <div id="app">
    <section class="agreeTxt">
      <h4 class="title">用户服务协议和隐私声明</h4>
      <article v-html="userAgreeMent"></article>
    </section>
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
.title {
  font-size: 32px;
  text-align: center;
}
</style>
