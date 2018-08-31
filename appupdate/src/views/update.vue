<template>
  <section class="container">
    <img src="../assets/bg_update.jpg" class="update_bg" />
    <div class="update_container">
      <article>
        <p>当前版本过低</p>
        <p>赶紧升级APP来参与活动吧~</p>
      </article>
      <button class="default btn_update"
        v-if="getAppParams.clientType * 1 !== 1 || getAppParams.lastAppVersion >= 355"
        @click="updateMethod">
        立即升级
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'appupdate',
  props: {
    params: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      getAppParams: {
        lastAppVersion: 355
      }
    }
  },
  created () {
    this.getAppParams = {
      ...this.params,
      lastAppVersion: this.params.version ? this.params.version.split('.').join('') * 1 : 355
    }
  },
  methods: {
    updateMethod () {
      window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.memorhome.home'
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}
.update_bg {
  position: absolute;
  z-index: -100;
  width: 750px;
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
  /* autoprefixer: off */
  background-image: -webkit-linear-gradient(top,#ffb812,#fe8d07);
  /* autoprefixer: on */
  width: 420px;
  height: 86px;
  line-height: 86px;
  color: #fff;
  font-weight: 700;
  font-size: 32px;
  box-shadow: 3px 6px 3px #eee;
  border: 0 none;
  border-radius: 43px;
  margin-top: 100px;
  position: relative;
  bottom: 100px;
}

</style>
