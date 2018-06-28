/*
 * @Author: chenxing 
 * @Date: 2018-04-23 17:40:16 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-28 10:12:44
 */
<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="0">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" title="我的消息">
      </x-header>
      <div v-transfer-dom>
        <loading :show="showLoading" text="数据加载中"></loading>
      </div>
      <div class="sourceScroll" v-if="msgList.length > 0">
        <scroll :data="msgList" ref="scroll" @pullingDown="refreshData" @pullingUp="moreData">
          <ul class="messageNav">
            <li v-for="(item, index) in msgList" :key="index">
              <div class="msgTitle">{{item.title}}</div>
              <div class="msgContent">
                {{item.content}}
              </div>
              <div class="msgBot">
                <span class="msgTime">{{item.time}}</span>
                <span class="msgStatus" :class="{unread: item.unread}">{{item.unread | readStr}}</span>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
      
      <div class="noMsg" v-show="showNodata">
        <div>
          <i class="iconfont icon-wuxiaoxiwutongzhi"></i><br>
          消息没有来过，再等等吧！
        </div>
      </div>
    </view-box>
  </div>
</template>

<script>
import { Loading, TransferDom } from 'vux'
import scroll from '@/components/scroll'
import { plusXing, deepClone } from '@/utils'
import { msgList } from '@/api/source'

export default {
  name: 'message',
  directives: {
    TransferDom
  },
  components: {
    Loading,
    scroll
  },
  created() {
    window['backUrl'] = () => {
      this.goBack()
      return 'false'
    }
    this.showLoading = true
    this.getMsgList()
  },
  filters: {
    readStr(val) {
      return val ? '未读' : '已读'
    }
  },
  data() {
    return {
      msgList: [],
      showLoading: false,
      showNodata: false,
      pageNo: 1
    }
  },
  methods: {
    refreshData() {
      this.pageNo = 1
      this.getMsgList()
    },
    moreData() {
      this.pageNo++
      this.getMsgList()
    },
    getMsgList() {
      let param = {
        pageNo: this.pageNo,
        pageSize: 20
      }
      msgList(param).then(res => {
        this.showLoading = false
        if (this.pageNo === 1) {
          this.msgList = res.data || []
          this.showNodata = this.msgList.length > 0 ? false : true
        } else {
          if (res.data.length > 0) {
            this.msgList = this.msgList.concat(res.data)
          } else {
            this.$refs.scroll.forceUpdate()
          }
        }
      }).catch(err => {
        this.showLoading = false
        this.$vux.toast.text(err.message)
        this.$refs.scroll.forceUpdate()
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .icon-bf-icon-help {
    font-size: 25px;
    position: relative;
    top: -5px;
  }
  .messageNav {
    li {
      margin-bottom: 5px;
      width: 100%;
      min-height: 130px;
      padding: 12px 20px;
      background: #fff;
      .msgTitle {
        font-size: 14px;
        color: #101010;
      }
      .msgContent {
        padding: 10px 0;
        color: #888;
        min-height: 60px;
      }
      .msgBot {
        color: #888;
      }
      .msgTime {
        width: 60%;
      }
      .msgStatus {
        width: 40%;
        float: right;
        text-align: right;
      }
    }
    .unread {
      position: relative;
      &:after {
        content: '\e61e';
        font-family: 'iconfont';
        position: absolute;
        top: -15px;
        right: -15px;
        font-size: 20px;
        color: #E51C23;
      }
    }
  }
  .noMsg {
    display: flex;
    align-items:center;
    justify-content:center;
    width: 100%;
    height: 100%;
    color: #999;
    .iconfont {
      font-size: 120px;
    }
  }
  .sourceScroll {
    height: 530px;
  }
</style>
