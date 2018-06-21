/*
 * @Author: chenxing 
 * @Date: 2018-06-05 11:13:00 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-14 15:57:47
 */

<template>
	<div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="0px">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" title="房租(催缴)账单">
      </x-header>
      <div>
        <div class="rent-bill-item" v-for="(item, index) in dataList" :key="index">
          <div class="item-head">
            <p>房间：{{item.roomName}}</p>
          </div>
          <div class="item-body">
            <p>账单号：{{item.billNo}}</p>
            <p class="item-flex">
              <span>账单名称：{{item.billName}}</span>
              <span class="blue">账单金额：{{item.billPrice}}</span>
            </p>
            <p class="item-flex">
              <span>租客：{{item.guest}}</span>
              <span>手机号码：{{item.guestMobile | mobileStr}}</span>
            </p>
            <p class="item-flex bottomBorder">
              <span>最迟支付时间：{{item.time}}</span>
              <span class="text-danger">状态：已逾期{{item.day}}天</span>
            </p>
            <p class="item-flex topHeight">
              <span>2018/05/01 13:21:23 李小红</span>
              <span class="blue alignRight" @click="lookDetail(item.billNo)">查看全部催租记录(3)</span>
            </p>
            <p class="item-flex">
              <span>已和租客沟通过，会过1天马上交租</span>
            </p>
          </div>
          <div class="item-foot item-flex">
            <span class="blue" @click="callMobile(item.guestMobile)">电话催缴</span>
            <span class="blue" @click="message(item)">催租跟进</span>
          </div>
        </div>
      </div>    
    </view-box>
    <confirm v-model="show"
      title="请记录跟进内容"
      @on-confirm="onConfirm"
      @on-hide="hideModel">
      <textarea class="messageContent" v-model="messageText"></textarea>
    </confirm>
  </div>
</template>

<script>
import { Popup, Confirm } from 'vux'
import { plusXing } from '@/utils'
export default {
  name: 'reminder',
	components: {
    Popup,
    Confirm
  },
  filters: {
    mobileStr(str) {
      return str ? plusXing(str, 3, 4) : ''
    }
  },
  mounted() {
    window['backUrl'] = () => {
      this.goBack()
      return 'false'
    }
  },
	data() {
		return {
      show: false,
      messageText: '',
      dataList: [
        {
          roomName: '天天小区-2幢-1单元-3楼-301房间A',
          fangdong: '张三',
          mobile: '13812341234',
          billNo: 'B2320430344095329059',
          billName: '3期房租租金',
          billPrice: '3000.0',
          guest: '李四',
          guestMobile: '18912344321',
          time: '2018/05/01',
          day: 1,
          status: 1
        },{
          roomName: '天天小区-2幢-1单元-3楼-301房间B',
          fangdong: '王五',
          mobile: '13812341234',
          billNo: 'B2320430344095329066',
          billName: '4期房租租金',
          billPrice: '2000.0',
          guest: '李四',
          guestMobile: '18912344321',
          time: '2018/05/01',
          day: 1,
          status: 2
        },{
          roomName: '天天小区-2幢-1单元-3楼-301房间B',
          fangdong: '王五',
          mobile: '13812341234',
          billNo: 'B2320430344095329066',
          billName: '4期房租租金',
          billPrice: '2000.0',
          guest: '李四',
          guestMobile: '18912344321',
          time: '2018/05/01',
          day: 1,
          status: 2
        },{
          roomName: '天天小区-2幢-1单元-3楼-301房间B',
          fangdong: '王五',
          mobile: '13812341234',
          billNo: 'B2320430344095329066',
          billName: '4期房租租金',
          billPrice: '2000.0',
          guest: '李四',
          guestMobile: '18912344321',
          time: '2018/05/01',
          day: 1,
          status: 2
        }
      ]
		}
	},
	methods: {
    goBack() {
      this.$router.go(-1)
    },
    callMobile(mobile) {
      if (mobile && window.call) {
        window.call.callAction(mobile)
      }
    },
    message(item) {
      this.show = true
    },
    hideModel() {
      this.messageText = ''
    },
    onConfirm() {

    },
    lookDetail(billNo) {
      this.$router.push({name: 'reminderDetail'})
    }
	}
}
</script>

<style lang="less" scoped>
	.rent-bill-item {
		margin-bottom: 6px;
		color: #333;
    background-color: #fff;
    &:last-child {
      margin-bottom: 0;
    }
		.item-head {
			position: relative;
      padding: 8px 12px;
      &::after {
				content: "";
				position: absolute;
				bottom: 0;
				left: 12px;
				right: 0;
				height: 0;
				border-bottom: 1px solid #ccc;
			}
			.iconfont {
				position: absolute;
				top: 5px;
				left: 0;
				width: 20px;
				font-size: 16px;
				line-height: 1;
			}
    }
    .topHeight {
      padding-top: 5px;
    }
    .bottomBorder{
      position: relative;
      padding-bottom: 5px;
      &::after {
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 0;
				border-bottom: 1px solid #ccc;
			}
    }
		.item-body {
			position: relative;
			padding: 6px 0px 6px 12px;
			&::after {
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 0;
				border-bottom: 1px solid #ccc;
			}
		}
		.item-foot {
			padding: 6px 0;
			span {
				position: relative;
				text-align: center;
				&:last-child::before {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					width: 0;
					height: 19px;
					border-right: 1px solid #ccc;
				}
				&:only-child::before {
					display: none;
				}
			}
		}
		.item-flex {
			display: flex;
      align-items: center;
      line-height: 24px;
			span {
				flex: 1;
				&:nth-child(2) {
					position: relative;
					padding-left: 1.6em;
				}
			}
		}
  }
  .messageContent {
    width: 100%;
    height: 80px;
    border: 1px solid #ddd;
    border-radius: 3px;
    resize: none;
    padding: 5px;
    line-height: 18px;
    outline:none
  }
  .alignRight {
    text-align: right;
    padding-right: 12px;
  }
  .text-warning {
    color: #FF9800
  }
  .text-danger {
    color: #E51C23;
  }
  .blue {
    color: #4680FF;
  }
  .disabled {
    color: #999;
  }
</style>


