<template>
  <div class="container">
     <iframe width="100%"  height='400' style='min-height: 400px' :src="nowUrl"></iframe>
  </div>
</template>
<script>
import axios from 'axios'
const biUrl = '//bi.mdguanjia.com/fh/ReportServer'
export default {
  data() {
    return {
      userData: {},
      endDate: null,
      nowUrl: null,
      startDate: null
    }
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem('userData')) || {}
    if (window.JSUserInfo) {
      const data = window.JSUserInfo.getHouseKeeperUserAction()
      localStorage.setItem('userData', data)
      this.userData = JSON.parse(data)
    }
    const myDate = new Date()
    const nowY = myDate.getFullYear()
    const nowM = myDate.getMonth() + 1
    const nowD = myDate.getDate()
    this.endDate = `${nowY}-${(nowM < 10 ? '0' + nowM : nowM)}-${(nowD < 10 ? '0' + nowD : nowD)}`
    this.startDate = `${nowY}-${(nowM < 10 ? '0' + nowM : nowM)}-${(nowD < 10 ? '0' + nowD : nowD)}`
  },
  mounted() {
    let that = this
    window['refreshPage'] = (row) => {
      const jsonList = JSON.parse(row)
      that.upDataUrl(jsonList)
    }
    that.upDataUrl()
    axios.get(`${biUrl}?op=fs_load&cmd=sso`, {
      withCredentials: true,
      params: {
        fr_username: this.userData.mobile,
        fr_password: this.userData.password
      }
    }).then((response) => {
      that.upDataUrl()
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    upDataUrl(jsonList) {
      console.log(jsonList)
      if (jsonList) {
        this.startDate = jsonList.startTime
        this.endDate = jsonList.endTime
        console.log(this.$route.query.type)
        switch (this.$route.query.type) {
          case '1':
            this.nowUrl = `//bi.mdguanjia.com/fh/ReportServer?reportlet=fh%2FcityManagerAPP%2F%5B4e2a%5D%5B4eba%5D%5B4e1a%5D%5B7ee9%5D.cpt&op=h5&fid=${this.userData.id}&startDate=${this.startDate}&endDate=${this.endDate}`
            break
          case '2':
            console.log(jsonList.leafDep)
            jsonList.leafDep === true
            ? this.nowUrl = `//bi.mdguanjia.com/fh/ReportServer?reportlet=fh%2FcityManagerAPP%2F%5B7ba1%5D%5B7406%5D%5B65e5%5D%5B62a5%5D.cpt&op=h5&depId=${jsonList.depId}&&startDate=${this.startDate}&endDate=${this.endDate}`
            : this.nowUrl = `//bi.mdguanjia.com/fh/ReportServer?reportlet=fh%2FcityManagerAPP%2F%5B7ba1%5D%5B7406%5D%5B65e5%5D%5B62a5%5D-%5B975e%5D%5B6700%5D%5B540e%5D%5B4e00%5D%5B7ea7%5D.cpt&op=h5&depId=${jsonList.depId}&&startDate=${this.startDate}&endDate=${this.endDate}`
            break
          default:
            break
        }
      } else {
        if (this.$route.query.type === '1') {
          this.nowUrl = `//bi.mdguanjia.com/fh/ReportServer?reportlet=fh%2FcityManagerAPP%2F%5B4e2a%5D%5B4eba%5D%5B4e1a%5D%5B7ee9%5D.cpt&op=h5&fid=${this.userData.id}&startDate=${this.startDate}&endDate=${this.endDate}`
        } else {
          this.userData.leafDep === true
            ? this.nowUrl = `//bi.mdguanjia.com/fh/ReportServer?reportlet=fh%2FcityManagerAPP%2F%5B7ba1%5D%5B7406%5D%5B65e5%5D%5B62a5%5D.cpt&op=h5&depId=${this.userData.depId}&&startDate=${this.startDate}&endDate=${this.endDate}`
            : this.nowUrl = `//bi.mdguanjia.com/fh/ReportServer?reportlet=fh%2FcityManagerAPP%2F%5B7ba1%5D%5B7406%5D%5B65e5%5D%5B62a5%5D-%5B975e%5D%5B6700%5D%5B540e%5D%5B4e00%5D%5B7ea7%5D.cpt&op=h5&depId=${this.userData.depId}&&startDate=${this.startDate}&endDate=${this.endDate}`
        }
      }
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .container{
    min-height: 100%;
    background: #fff;
  }
</style>
