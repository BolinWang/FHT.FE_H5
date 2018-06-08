/*
 * @Author: chenxing 
 * @Date: 2018-06-05 11:13:00 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-07 14:36:05
 */

<template>
	<div>
    <div class="scrollDiv">
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
          <p class="item-flex">
            <span>最迟支付时间：{{item.time}}</span>
            <span class="text-danger">状态：已逾期{{item.day}}天</span>
          </p>
        </div>
        <div class="item-foot item-flex">
          <span class="blue" @click="callMobile(item.guestMobile)">电话催缴</span>
          <span class="blue" @click="message(item)">催租跟进</span>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import { Tab, TabItem, Sticky } from 'vux'
import { plusXing } from '@/utils'
export default {
	components: {
		Tab,
    TabItem,
    Sticky
  },
  filters: {
    mobileStr(str) {
      return str ? plusXing(str, 3, 4) : ''
    }
  },
	data() {
		return {
      tabIndex: 0,
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

    },
		changeTable(i) {
			this.tabIndex = i
    },
    callMobile(mobile) {
      console.log(mobile)
      if (mobile && window.call) {
        window.call.callAction(mobile)
      }
    },
    message(item) {
      if (item.status === 2) {
        return
      }
      console.log(item.status)
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
			padding: 6px 12px;
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
		.item-body {
			position: relative;
			padding: 6px 12px;
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
				&:last-child {
					position: relative;
					padding-left: 1.6em;
				}
			}
		}
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


