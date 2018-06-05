/*
 * @Author: chenxing 
 * @Date: 2018-06-05 10:33:54 
 * @Last Modified by:   chenxing 
 * @Last Modified time: 2018-06-05 10:33:54 
 */

<template>
  <div v-show="data.length > 0">
    <tab :scroll-threshold="7" v-if="showTab">
      <tab-item v-for="(item, index) in statusList" 
        :key="index" 
        :selected="index === 0"
        @on-item-click="toSearch(item.value)">{{item.name}}
      </tab-item>
    </tab>
    <div style="height:430px">
      <scroll :pullDownRefresh="false" @pullingUp="pullUploadFn" ref="scroll" :data="data">
      <ul class="houseNav">
        <li v-for="(item, index) in data" :key="index" @click="toDetail"> 
          <div class="houseTitle">
            <div class="left" v-html="item.name"></div>
          </div>
          <div class="houseDetail">
            <div class="detailImg" :class="{hasImg: item.imageUrl, noImg: !item.imageUrl}">
              <x-img :src="item.imageUrl" class="houseImg"></x-img>
            </div>
            <div class="detailRight">
              <div>
                <div class="roomStatus" 
                :class="{color2: item.status === 2, color7: item.status === 7, color9: item.status === 9}">{{item.status | statusStr}}</div>
              </div>
              <div class="flex">
                <div class="area">{{item.roomDirection | directionStr}} {{item.roomArea || 0}}㎡</div>
                <div v-if="item.houseRentType === 2" class="featureDiv">
                  <span class="feature" 
                    v-for="(v, k) in item.roomAttributes.split(',')" 
                    :key="k"
                    v-show="v">
                    {{v | attrStr}}
                  </span>
                </div>
                <div v-else class="featureDiv">
                  <span class="feature">{{item.chamberCount || 0}}室{{item.boardCount || 0}}厅{{item.toiletCount || 0}}卫</span>
                </div>
              </div>
              
            </div>
            
          </div>
        </li>
      </ul>
    </scroll>
    </div>
    
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
  filters: {
    statusStr(val) {
      /*
      * 空房对应原来的可用
      */
      const statusList = ['', '未启用租务', '空房', '下单未入住', '在住', '维修', '空脏','保留中', '预定', '已出租', '装修中']
      return statusList[val]
    },
    directionStr(val) {
      const directionList = ['未知朝向', '朝南', '朝北', '朝东', '朝西', '东南', '西南', '东北', '西北']
      return directionList[val]
    },
    attrStr(val) {
      const attrList = ['', '独卫', '阳台', '厨房', '飘窗']
      return attrList[val] || ''
    }
  },
  mounted() {

  },
  data() {
    return {
      statusList: [
        { name: '全部', value: 0 },
        { name: '空房', value: 2 },
        { name: '已出租', value: 4 },
        { name: '保留中', value: 7 },
        { name: '缺图', value: 0 },
        { name: '有图', value: 0 },
      ]
    }
  },
  methods: {
    toDetail() {
      this.$router.push({name: 'roomDetail'})
    },
    toSearch(key) {
      this.$emit('searchStatus', key)
    },
    pullUploadFn() {
      console.log(1)
      let self = this
      setTimeout(function(){
        console.log(self.$refs.scroll)
        self.$refs.scroll.forceUpdate()
      }, 2000)
      
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
          border: 1px solid #ddd;
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
          &:before {
            content: '\e620';
            font-family: 'iconfont';
            position: absolute;
            font-size: 40px;
            color: #ddd;
            left: 30%;
            top: 10%;
          }
        }
        .detailRight {
          width: 212px;
          height: 84px;
          float: right;
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px;
          .roomName {
            font-size: 14px;
            height: 22px;
            color: #101010;
            width: 80%;
            float: left;
          }
          .roomStatus {
            float: left;
            width: 100%;
            height: 25px;
            text-align: right;
            color: #4680FF;
            font-size: 14px;
          }
          .area {
            font-size: 12px;
            color: #999;
            line-height: 20px;
          }
          .feature {
            padding: 0px 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            color: #999;
            float: left;
            margin: 5px 5px 5px 0;
          }
        }
      }
    }
    .flex {
      display: flex;
      width: 100%;
      height: 55px;
      flex-direction: column;
      justify-content: flex-end;
      align-content: flex-end;
    }
    .color2 {
      color: #999990 !important;
    }
    .color7 {
      color: #FF9800 !important;
    }
    .color9 {
      color: #259B24 !important;
    }
  }
</style>
