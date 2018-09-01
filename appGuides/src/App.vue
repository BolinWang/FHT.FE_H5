<template>
  <div id="app">
    <appupdate :params="getAppParams" v-if="defaultType === 'appupdate'"></appupdate>
    <appdownload v-else></appdownload>
  </div>
</template>

<script>
import appupdate from '@/views/update'
import appdownload from '@/views/download'
export default {
  name: 'App',
  components: {
    appupdate,
    appdownload
  },
  data () {
    return {
      getAppParams: {},
      defaultType: ''
    }
  },
  created () {
    if (location.search) {
      let getSearchParams = {}
      let searchArr = location.search.slice(1).split('&')
      for (let i = 0; i < searchArr.length; i++) {
        if (searchArr[i].split('=')[1]) {
          getSearchParams[searchArr[i].split('=')[0]] = unescape(searchArr[i].split('=')[1])
        }
      }
      this.getAppParams = {
        ...getSearchParams
      }
      this.defaultType = getSearchParams.pageType === 'appupdate' ? 'appupdate' : 'appdownload'
    } else {
      this.defaultType = 'appdownload'
    }
  }
}
</script>

<style>
html,body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
a{
  color:#fff;
}
</style>
