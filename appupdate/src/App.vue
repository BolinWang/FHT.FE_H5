<template>
  <div id="app">
    <img src="../static/bg.jpg" class="update_bg" />
    <div class="update_container">
      <article>
        <p>当前版本过低</p>
        <p>赶紧升级APP来参与活动吧~</p>
      </article>
      <button class="default btn_update" @click="updateMethod">立即升级</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  methods: {
    updateMethod () {
      location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.memorhome.home'
    }
  }
}
</script>

<style>
html,body {
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
a{
  color:#fff;
}
.update_bg {
  position: absolute;
  z-index: -100;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
}
.update_container {
  margin-top: 850px;
}
article {
  position: relative;
  bottom: 80px;
}
article p {
  line-height: 70px;
  font-size: 34px;
  font-weight: 700;
}

.btn_update {
  width: 420px;
  height: 86px;
  line-height: 86px;
  color: #fff;
  font-weight: 700;
  font-size: 32px;
  background-image: linear-gradient(top,#ffb812,#fe8d07);
  box-shadow: 3px 6px 3px #eee;
  border: 0 none;
  border-radius: 43px;
  margin-top: 100px;
  position: relative;
  bottom: 100px;
}

</style>
