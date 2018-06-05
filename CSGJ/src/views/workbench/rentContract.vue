<template>
	<div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px">
			<x-header title="租房订单合同" :left-options="{backText: ''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
			<tab custom-bar-width="8em">
				<tab-item selected @on-item-click="changeTable">生效中(2)</tab-item>
				<tab-item @on-item-click="changeTable">下单中(1)</tab-item>
			</tab>
			<div class="rent-contract-item" v-show="tabIndex == 0">
				<div class="item-head">
					<p>订单号：D2320430344095329059</p>
					<p>房间：天天小区-2幢-1单元-3楼-301房间A</p>
				</div>
				<div class="item-body">
					<p class="item-flex">
						<span>房东：张三</span>
						<span>手机号码：138****1234</span>
					</p>
					<p class="item-flex">
						<span>租赁内容：月付/12个月</span>
						<span>合同开始时间：2018/05/01</span>
					</p>
					<p class="item-flex">
						<span>租客：李四</span>
						<span>手机号码：138****1234</span>
					</p>
					<p>租房合同：<span class="tag tag-danger">未上传</span></p>
				</div>
				<div class="item-foot">
					订单时间：2018/05/01 14:13:12
				</div>
			</div>
			<div class="rent-contract-item" v-show="tabIndex == 1" @click="showRentContractDetail = true">
				<div class="item-head">
					<p>订单号：D2320430344095329059</p>
					<p>房间：天天小区-2幢-1单元-3楼-301房间A</p>
				</div>
				<div class="item-body">
					<p class="item-flex">
						<span>房东：张三</span>
						<span>手机号码：138****1234</span>
					</p>
					<p class="item-flex">
						<span>租赁内容：月付/12个月</span>
						<span>合同开始时间：2018/05/01</span>
					</p>
					<p class="item-flex">
						<span>租客：李四</span>
						<span>手机号码：138****1234</span>
					</p>
					<p>订单状态：<span class="tag tag-danger">未付款</span></p>
				</div>
				<div class="item-foot">
					订单时间：2018/05/01 14:13:12
				</div>
			</div>
			<Popup v-model="showRentContractDetail" position="right" width="100%" class="rentContractDetail-modal">
				<x-header :left-options="{backText: '', preventGoBack: true}" @on-click-back="showRentContractDetail = false">
					<a slot="right" v-if="true">取消订单</a>
					订单合同详情
				</x-header>
				<div class="rent-contract-item">
					<div class="item-body">
						<p>天天小区-2幢-1单元-3楼-301房间A</p>
					</div>
					<div class="item-foot">
						<p class="item-flex">
							<span>房东：张三</span>
							<span>手机号码：138****1234</span>
						</p>
					</div>
				</div>
				<div class="rent-contract-item rentContractDetail-container">
					<div class="item-body">
						<p class="item-flex">
							<span>租客</span>
							<span>李四 男</span>
						</p>
						<p class="item-flex">
							<span>手机号码</span>
							<span>138****1234</span>
						</p>
						<p class="item-flex">
							<span>身份证</span>
							<span>1234567********6789</span>
						</p>
						<p class="item-flex">
							<span>订单号</span>
							<span>D2320430344095329059</span>
						</p>
						<p class="item-flex">
							<span>订单时间</span>
							<span>2018/07/31</span>
						</p>
						<p class="item-flex">
							<span>交租方式</span>
							<span>月付</span>
						</p>
						<p class="item-flex">
							<span>租期</span>
							<span>3个月</span>
						</p>
						<p class="item-flex">
							<span>房价(元/月)</span>
							<span>1000.00</span>
						</p>
						<p class="item-flex">
							<span>押金(元)</span>
							<span>1000.00</span>
						</p>
						<p class="item-flex">
							<span>合同开始时间</span>
							<span>2018/07/31</span>
						</p>
						<p class="item-flex">
							<span>合同结束时间</span>
							<span>2018/07/31</span>
						</p>
						<p class="item-flex">
							<span>租房合同</span>
							<span class="text-danger">线下已签约·未上传</span>
						</p>
						<p class="item-flex">
							<span>操作员</span>
							<span>王五</span>
						</p>
					</div>
					<div class="aside-tag danger">
						未付款
					</div>
				</div>
				<div class="rentContractDetail-footer">
					<div class="footer-item">重新上传</div>
					<div class="footer-item active">查看合同</div>
				</div>
			</Popup>
    </view-box>
  </div>
</template>

<script>
import { Tab, TabItem, Popup } from 'vux'
export default {
	components: {
		Tab,
		TabItem,
		Popup
	},
	data() {
		return {
			tabIndex: 0,
			showRentContractDetail: false
		}
	},
	methods: {
		changeTable(i) {
			this.tabIndex = i
		}
	},
	created() {

	}
}
</script>

<style lang="less" scoped>
	.rent-contract-item {
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
				left: 12px;
				right: 0;
				height: 0;
				border-bottom: 1px solid #ccc;
			}
		}
		.item-foot {
			padding: 6px 12px;
			color: #666;
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
		.tag {
			display: inline-block;
			width: 60px;
			height: 20px;
			font-size: 11px;
			line-height: 20px;
			text-align: center;
			border-width: 1px;
			border-style: solid;
			border-radius: 4px;
		}
		.tag-danger {
			color: #e51c23;
			border-color: #e51c23;
		}
		.tag-success {
			color: #259b24;
			border-color: #259b24;
		}
	}
	.rentContractDetail-modal {
		.rentContractDetail-container {
			position: relative;
			overflow: hidden;
			.item-body {
				&::after {
					display: none;
				}
			}
			.item-flex {
				margin-bottom: 10px;
				span {
					flex: none;
					&:first-child {
						width: 6em;
					}
				}
			}
			.aside-tag {
				position: absolute;
				top: -45px;
				right: -45px;
				width: 90px;
				height: 90px;
				padding-top: 60px;
				line-height: 30px;
				font-weight: bold;
				text-align: center;
				background-color: #e51c23;
				color: #fff;
				transform: rotate(45deg);
				&.active {
					background-color: #4680ff;
				}
				&.danger {
					background-color: #e51c23;
				}
			}
		}
		.rentContractDetail-footer {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			display: flex;
			.footer-item {
				flex: 1;
				color: #4680ff;
				background-color: #fff;
				text-align: center;
				height: 36px;
				line-height: 36px;
				font-size: 16px;
				&.active {
					color: #fff;
					background-color: #4680ff;
				}
			}
		}
	}
</style>


