/*
 * @Author: chenxing 
 * @Date: 2018-04-23 17:40:16 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-14 15:26:56
 */
<template>
  <div style="height:100%;">
    <view-box ref="viewBox">
      <div class="workbenchHead">
        <div class="userName">
          {{userData.name || '未知用户'}}
        </div>
        <div class="welcome">
          欢迎登陆城市管家!
        </div>
        <div class="loginOut" @click="loginOut">退出</div>
      </div>
      <group class="noTop">
        <cell title="租房(催缴)账单" is-link @click.native="toBill">
          10笔<span class="text-danger">（1笔逾期）</span>
        </cell>
      </group>
      <footers :selectedIndex="0" slot="bottom"></footers>
      
    </view-box>
  </div>
</template>

<script>
import footers from '@/components/footer'
import { getUserNameApi } from '@/api/source'

export default {
  name: 'workbench',
  components: {
    footers
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem('userData')) || {}
    if (window.JSUserInfo) {
      const data = window.JSUserInfo.getHouseKeeperUserAction()
      localStorage.setItem('userData', data)
      this.userData = JSON.parse(data)
    }
    
  },
  mounted() {
    window['backUrl'] = () => {
      return 'false'
    }
  },
  data() {
    return {
      userData: {}
    }
  },
  methods: {
    loginOut() {
      this.$vux.confirm.show({
        title: '提示',
        content: '确定退出当前账号吗？',
        onConfirm() {
          if (window.JSLogout) {
            window.JSLogout.logOutAction()
          }
        }
      })
    },
    toBill() {
      this.$router.push({name: 'reminder'})
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .workbenchHead {
    width: 100%;
    height: 80px;
    background: #4680FF;
    color: #fff;
    padding-left: 20px;
    padding-top: 10px;
    font-weight: 700;
    position: relative;
    .userName {
      font-size: 16px;
      line-height: 36px;
    }
    .welcome {
      font-size: 14px;
    }
    .loginOut {
      width: 50px;
      height: 24px;
      border-radius: 4px;
      text-align: center;
      line-height: 25px;
      font-size: 12px;
      background: #fff;
      color: #4680FF;
      position: absolute;
      top: 28px;
      right: 10px;
    }
  }
</style>
