<template>
  <div v-show="data.length > 0">
    <tab :scroll-threshold="7" v-if="showTab">
      <tab-item selected>全部</tab-item>
      <tab-item>空房</tab-item>
      <tab-item>已出租</tab-item>
      <tab-item>保留中</tab-item>
      <tab-item>缺图</tab-item>
      <tab-item>有图</tab-item>
    </tab>
    <scroll :pullDownRefresh="false" :pullUpLoad="false">
      <ul class="houseNav">
        <li v-for="(itme, index) in data" :key="index" @click="toDetail"> 
          <div class="houseTitle">
            <div class="left">天天小区-19-1单元-4楼-401号</div>
            <div class="right">3间</div>
          </div>
          <div class="houseDetail">
            <div class="detailImg" :class="{hasImg: index === 0, noImg: index !== 0}">
              <x-img src="http://cdn.baletoo.cn/Uploads/housephoto/869/868498/oss_5a5ed2dc87a40.jpg@!380_280.png" class="houseImg"></x-img>
            </div>
            
            <div class="detailRight">
              <div>
                <div class="roomName">401号房间A</div>
                <div class="roomStatus">在住</div>
              </div>
              <div class="area">朝南 30㎡</div>
              <div>
                <span class="feature">独卫</span>
                <span class="feature">厨房</span>
                <span class="feature">阳台</span>
              </div>
            </div>
            
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import { Tab, TabItem, XImg } from 'vux'
import scroll from '@/components/scroll'

export default {
  name: 'house-list',
  components: {
    Tab, 
    TabItem,
    scroll,
    XImg
  },
  props: {
    data: {
      default: []
    },
    showTab: {
      type: Boolean,
      default: true,
    }
  },
  mounted() {
  },
  data() {
    return {
    }
  },
  methods: {
    toDetail() {
      this.$router.push({name: 'roomDetail'})
    }
  },
  watch: {
    data(val) {
      this.data = val || []
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .houseNav {
    padding: 0 12px;
    li {
      width: 100%;
      .houseTitle {
        margin: 5px 0;
        width: 100%;
        height: 28px;
        line-height: 28px;
        border-radius: 4px;
        color: rgba(16, 16, 16, 1);
        font-size: 12px;
        left: 6px;
        padding: 0 5px;
        background-color: rgba(242, 242, 242, 1);
        .left {
          width: 90%;
        }
        .right {
          width: 10%;
          text-align: right;
        }
      }
      .houseDetail{
        height: 84px;
        .detailImg {
          width: 112px;
          height: 84px;
          border-radius: 4px;
          position: relative;
          float: left;
          overflow: hidden;
          .houseImg {
            width: 100%;
            height: 100%;
          }
          &:after{
            content:'';
            position: absolute;
            right: -25px;
            bottom: -25px;
            width: 50px;
            height: 50px;
            font-size: 12px;
            display: inline-block;
            transform: rotate(-45deg);
            text-align: center;
            background: #E5E5E5;
          }
        }
        .hasImg {
          &:after{
            content:'有图';
            color: #4680FF;
          }  
        }
        .noImg {
          &:after{
            content:'无图';
            color:#E51C23;
          }
        }
        .detailRight {
          width: 212px;
          height: 84px;
          float: right;
          border-bottom: 1px solid #ddd;
          .roomName {
            font-size: 14px;
            color: #101010;
            width: 80%;
            float: left;
          }
          .roomStatus {
            width: 15%;
            float: right;
            color: #4680FF;
            font-size: 14px;
          }
          .area {
            font-size: 12px;
            color: #999;
            line-height: 35px;
          }
          .feature {
            padding: 3px 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            color: #999;
          }
        }
      }
    }
  }
</style>
