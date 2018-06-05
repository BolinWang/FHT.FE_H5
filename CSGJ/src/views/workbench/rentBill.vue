<template>
	<div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px">
			<x-header title="房租（催缴）账单" :left-options="{backText: ''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
			<tab custom-bar-width="8em">
				<tab-item selected @on-item-click="changeTable">催缴账单</tab-item>
				<tab-item @on-item-click="changeTable">未放款账单</tab-item>
			</tab>

			<div class="rent-bill-item" v-show="tabIndex == 0">
				<div class="item-head">
					<p>房间：天天小区-2幢-1单元-3楼-301房间A</p>
					<p class="item-flex">
						<span>房东：张三</span>
						<span><i class="iconfont icon-dianhua text-warning"></i>手机号码：18815287483</span>
					</p>
				</div>
				<div class="item-body">
					<p>账单号：B2320430344095329059</p>
					<p class="item-flex">
						<span>账单名称：3期房租租金</span>
						<span class="blue">账单金额：3000.0</span>
					</p>
					<p class="item-flex">
						<span>租客：李四</span>
						<span>手机号码：138****1234</span>
					</p>
					<p class="item-flex">
						<span>最迟支付时间：2018/05/01</span>
						<span class="text-danger">状态：已逾期1天</span>
					</p>
				</div>
				<div class="item-foot item-flex">
					<span class="blue">电话催缴</span>
					<span class="blue">今日已催</span>
				</div>
			</div>
			<div class="rent-bill-item" v-show="tabIndex == 1">
				<div class="item-head">
					<p>房间：天天小区-2幢-1单元-3楼-301房间A</p>
					<p class="item-flex">
						<span>房东：张三</span>
						<span><i class="iconfont icon-dianhua text-warning"></i>手机号码：18815287483</span>
					</p>
				</div>
				<div class="item-body">
					<p>账单号：B2320430344095329059</p>
					<p class="item-flex">
						<span>账单名称：3期房租租金</span>
						<span>账单金额：3000.0</span>
					</p>
					<p>支付时间：2018/05/01</p>
				</div>
				<div class="item-foot item-flex">
					<span class="text-danger">重新放款</span>
				</div>
			</div>
    </view-box>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
export default {
	components: {
		Tab,
		TabItem
	},
	data() {
		return {
			tabIndex: 0
		}
	},
	methods: {
		changeTable(i) {
			this.tabIndex = i
		}
	}
}
</script>

<style lang="less" scoped>
	.rent-bill-item {
		margin-bottom: 6px;
		color: #333;
		background-color: #fff;
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
				top: 0;
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
			span {
				flex: 1;
				&:last-child {
					position: relative;
					padding-left: 1.6em;
				}
			}
		}
	}
</style>


