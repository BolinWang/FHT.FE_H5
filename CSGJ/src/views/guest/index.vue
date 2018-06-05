/*
 * @Author: chenxing 
 * @Date: 2018-05-15 11:07:11 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-04 13:46:59
 */

<template>
  <div style="height:100%">
    <view-box ref="viewBox" >   
      <div class="searchPop">
        <div class="popTop">
          <ul class="tab">
            <li :class="{active: tabIndex === 0}" @click="tabIndex = 0">未签约租客</li>
            <li :class="{active: tabIndex === 1}" @click="tabIndex = 1">已签约租客</li>
          </ul>
          <div class="cancel" @click="addGuest">
            <i class="iconfont icon-xinjian1"></i>
          </div>
        </div>
        <div class="popSearch">
          <search :auto-fixed="false"
            v-model="keyword"
            @on-change="keywordSearch"
            placeholder="姓名/手机号码">
          </search>
        </div> 
      </div>
      <scroll>
        <ul class="guestNav">
          <li>
            <div class="line">
              <span class="name">张三</span>
              <span class="gender">先生</span>
              <span class="userStatus">低</span>
            </div>
            <div class="line">
              <div class="mobile">13812341234</div>
              <div class="watchTime">已带看 <span class="text-danger">0</span> 次</div>
            </div>
            <div class="line rightIcon borderTop">
              最后操作时间：2018/05/21 12:12:12
            </div>
          </li>
          <li>
            <div class="line">
              <span class="name">张三</span>
              <span class="gender girl">女士</span>
              <span class="userStatus statusColor2">中</span>
            </div>
            <div class="line">
              <div class="mobile">13812341234</div>
              <div class="watchTime">已带看 <span class="text-danger">0</span> 次</div>
            </div>
            <div class="line rightIcon borderTop">
              最后操作时间：2018/05/21 12:12:12
            </div>
          </li>
        </ul>
      </scroll>
      <footers :selectedIndex="3" slot="bottom"></footers>
    </view-box>
  </div>
</template>

<script>
import { Search } from 'vux'
import footers from '@/components/footer'
import scroll from '@/components/scroll'
import { queryListByPageApi } from '@/api/source'

export default {
  components: {
    footers,
    scroll,
    Search
  },
  mounted() {
  },
  filters: {
    
  },
  data() {
    return {
      tabIndex: 0,
      keyword: '',
      show: false
    }
  },
  methods: {
    keywordSearch() {
      
    },
    addGuest() {
      this.$router.push({name: 'addSource', params: {guestSourceId: 1}})
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .popTop {
    .cancel {
      line-height: 50px;
    }
  }
  .guestNav {
    li {
      padding: 12px 0 0 12px;
      min-height: 100px;
      width: 100%;
      float: left;
      margin-bottom: 2px;
      background: #fff;
      color: #999;
      .line {
        min-height: 28px;
        line-height: 28px;
      }
      .name {
        font-size: 14px;
        color: #000;
      }
      .gender {
        width: 40px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border-radius: 4px;
        display: inline-block;
        border: 1px solid #259B24;
        color: #259B24;
      }
      .girl {
        border-color: #FF9800;
        color: #FF9800;
      }
      .userStatus {
        width: 20px;
        height: 20px;
        display: block;
        text-align: center;
        line-height: 20px;
        color: #fff;
        float: right;
        margin-right: 12px;
        background: #259B24;
      }
      .statusColor1 {
        background: #4680FF;
      }
      .statusColor2 {
        background: #FF9800;
      }
      .mobile {
        float: left;
      }
      .watchTime {
        float: right;
        margin-right: 12px;
      }
      .borderTop {
        border-top: 1px solid #ddd;
      }
    }
  }
</style>
