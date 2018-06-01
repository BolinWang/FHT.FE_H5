/*
 * @Author: chenxing
 * @Date: 2018-05-15 11:06:55
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-31 15:14:00
 */

<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header title="工作台" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        <i slot="overwrite-left"></i>
      </x-header>
			<div class="noTop">
				<card class="workbench-top-card workbench-card">
					<div slot="content" class="card-flex">
						<div class="card-item">
							<p>总房间</p>
							1130
						</div>
						<div class="card-item">
							<p>空房</p>
							15
						</div>
						<div class="card-item">
							<p>已出租</p>
							88
						</div>
					</div>
				</card>
				<card class="workbench-rent-card workbench-card">
					<div slot="content" class="card-flex">
						<router-link class="card-item" :to="{name: 'rentBill'}">
							<p class="title">租房(催缴)账单</p>
							<p class="count">10笔<span class="tips">(1笔逾期)</span></p>
						</router-link>
						<router-link class="card-item" :to="{name: 'rentContract'}">
							<p class="title">租房订单合同</p>
							<p class="count">10笔<span class="tips">(1笔下单中)</span></p>
						</router-link>
					</div>
				</card>
				<div class="achievement-container">
					<group class="achievement-head noTop">
						<cell title="今日业绩" value="查看全部" is-link :link="{name: 'achievementRanking'}"></cell>
					</group>
					<group class="achievement-list noTop">
						<div class="title achievement-list-item">
							<div class="ranking">
								<x-button mini plain class="tag">名次</x-button>
							</div>
							<div class="item">
								<x-button mini plain class="tag">签约</x-button>
								<x-button mini plain class="tag">带看</x-button>
								<x-button mini plain class="tag">录客</x-button>
							</div>
						</div>
						<div class="list achievement-list-item">
							<div class="ranking">NO.1</div>
							<div class="item">
								<div class="top1">张小三（15）</div>
								<div class="top1">张小三（12）</div>
								<div class="top1">张小三（30）</div>
							</div>
						</div>
						<div class="list achievement-list-item">
							<div class="ranking">NO.2</div>
							<div class="item">
								<div class="top2">张小三（15）</div>
								<div class="top2">张小三（12）</div>
								<div class="top2">张小三（30）</div>
							</div>
						</div>
						<div class="list achievement-list-item">
							<div class="ranking">NO.2</div>
							<div class="item">
								<div class="top3">张小三（15）</div>
								<div class="top3">张小三（12）</div>
								<div class="top3">张小三（30）</div>
							</div>
						</div>
					</group>
				</div>
			</div>
      <footers :selectedIndex="2" slot="bottom"></footers>
    </view-box>
  </div>
</template>

<script>
import footers from '@/components/footer'
import { Card, CellBox, Group, XButton } from 'vux'

export default {
  components: {
		footers,
		Card,
		CellBox,
		Group,
		XButton
  },
  mounted() {
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
	.workbench-card {
		.card-flex {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.card-item {
			position: relative;
			flex: 1;
			text-align: center;
		}
	}
	.workbench-top-card {
		background-color: #4680FF;
		&::before {
			border-top-color: #4680FF;
		}
		.card-flex {
			.card-item {
				color: #fff;
				font-size: 14px;
				line-height: 20px;
				padding: 5px 0;
				& + .card-item::after {
					content: "";
					position: absolute;
					top: 15px;
					left: 0;
					width: 0;
					height: 20px;
					border-right: 1px solid rgba(255, 255, 255, .5);
				}
				p {
					font-size: 12px;
				}
			}
		}
	}
	.workbench-rent-card {
		margin-top: 0;
		margin-bottom: 6px;
		.card-item {
			line-height: 1;
			color: #999;
			padding: 18px 0;
			& + .card-item::after {
				content: "";
				position: absolute;
				top: 18px;
				left: 0;
				width: 0;
				height: 36px;
				border-right: 1px solid rgba(153, 153, 153, .5);
			}
			.title {
				font-size: 14px;
				margin-bottom: 10px;
			}
			.count {
				font-size: 12px;
				color: #333;
			}
			.tips {
				color: #e51c23;
			}
		}
	}
	.achievement-head {
		margin-bottom: 2px;
	}
	.achievement-list {
		.title {
			.tag {
				margin-top: 0;
				padding: 0;
				width: 50px;
				height: 20px;
				line-height: 18px;
				border-radius: 3px;
				color: #4680ff;
				border-color: #4680ff;
			}
		}
		.list {
			line-height: 16px;
			.ranking {
				position: relative;
				color: #4680ff;
				&::after {
					content: "";
					position: absolute;
					top: 0;
					right: 0;
					width: 0;
					height: 16px;
					border-right: 1px solid rgba(153, 153, 153, .5);
				}
			}
			.top1 {
				color: #e51c23;
			}
			.top2 {
				color: #ff9800;
			}
			.top3 {
				color: #259b24;
			}
		}
	}
	.achievement-list-item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		font-size: 12px;
		text-align: center;
		&::after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 10px;
			right: 0;
			height: 1px;
			border-bottom: 1px solid rgba(153, 153, 153, .5);
			transform: scaleY(.5);
			transform-origin: 0 0;
		}
		.ranking {
			width: 60px;
		}
		.item {
			display: flex;
			align-items: center;
			flex: 1;
			div {
				flex: 1;
			}
		}
	}
</style>
