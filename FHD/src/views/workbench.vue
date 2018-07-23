/*
 * @Author: chenxing 
 * @Date: 2018-04-23 17:40:16 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-07-23 15:49:20
 */
<template>
  <div style="height:100%;">
    <view-box ref="viewBox">
      <div class="workbenchHead">
        <div class="userName">
          {{userData.name || '未知用户'}}
          <div class="loginOut" @click="loginOut">退出</div>
        </div>
        <div class="message" @click="toMsg()">
          <i class="iconfont icon-p-message"></i>
          <badge :text="count" class="badgeIcon" v-show="count > 0"></badge>
        </div>
        <div class="welcome">
          欢迎登陆城市管家!
        </div>
        
      </div>
      <group class="noTop">
        <cell title="租房(催缴)账单" is-link>
          敬请期待
        </cell>
        <cell title="城市管家帮助文档" is-link @click.native="toHelp">
        </cell>
        <cell title="版本发布记录" is-link @click.native="toRecord">
        </cell>
        <cell title="我要吐槽" is-link @click.native="toTalk">
        </cell>
      </group>
      
    </view-box>
  </div>
</template>

<script>
import { Badge } from 'vux'
import footers from '@/components/footer'
import { unreadRecords } from '@/api/source'

export default {
  name: 'workbench',
  components: {
    footers,
    Badge
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem('userData')) || {}
    if (window.JSUserInfo) {
      const data = window.JSUserInfo.getHouseKeeperUserAction()
      localStorage.setItem('userData', data)
      this.userData = JSON.parse(data)
    }
    unreadRecords().then(res => {
      this.count = res.data.count || 0
    }).catch(rej => {
      this.$vux.toast.text(rej.message)
    })
  },
  mounted() {
    window['backUrl'] = () => {
      return 'false'
    }
  },
  data() {
    return {
      userData: {},
      count: 0
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
    },
    toMsg() {
      this.$router.push({name: 'message'})
    },
    toTalk() {
      if (window.workbench) {
        window.workbench.gotoFeedActivity()
      }
    },
    toApp(title, url) {
      const str = {
        title: title,
        h5Url: url
      }
      if (window.workbench) {
        window.workbench.gotoHelpActivity(JSON.stringify(str))
      } else {
        window.location.href = url
      }
    },
    toHelp() {
      this.toApp('帮助文档', 'https://mp.weixin.qq.com/s/jb5_mc3RYSgKqkAgyDNnmw')
    },
    toRecord() {
      this.toApp('版本发布记录', 'https://mp.weixin.qq.com/s/ovuOQcIJre8rtZ-07Y9mNg')
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
      display: inline-block;
    }
    .message {
      position: absolute;
      top: 0px;
      right: 30px;
      width: 35px;
      .iconfont {
        font-size: 30px;
      }  
    }
    .badgeIcon {
      position: absolute;
      top: 10px;
      left: 20px;
    }
  }
</style>
