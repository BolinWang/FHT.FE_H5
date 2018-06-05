<template>
	<div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px">
			<x-header title="业绩排名" slot="header" :left-options="{backText: ''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
			<tab custom-bar-width="8em">
				<tab-item selected @on-item-click="changeTable">今日排行</tab-item>
				<tab-item @on-item-click="changeTable">本周排行</tab-item>
				<tab-item @on-item-click="changeTable">本月排行</tab-item>
			</tab>
			<x-table class="ranking-table">
        <thead>
          <tr>
            <th></th>
            <th>录客</th>
            <th>带看</th>
            <th>成交</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NO.1</td>
            <td>张小三（15）</td>
            <td>张小三（12）</td>
            <td>张小三（30）</td>
          </tr>
          <tr>
            <td>Banana</td>
            <td>$1.20</td>
						<td>$1.25</td>
            <td>$1.25</td>
          </tr>
					<tr>
            <td>Banana</td>
            <td>$1.20</td>
						<td>$1.25</td>
            <td>$1.25</td>
          </tr>
					<tr>
            <td>Banana</td>
            <td>$1.20</td>
						<td>$1.25</td>
            <td>$1.25</td>
          </tr>
        </tbody>
      </x-table>
    </view-box>
  </div>
</template>

<script>
import { Tab, TabItem, XTable } from 'vux'

export default {
	components: {
    Tab,
		TabItem,
		XTable
	},
	data() {
		return {
			rankingList: [

			]
		}
	},
	methods: {
		changeTable(i) {
			console.log(i)
		}
	}
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
	.ranking-table {
		thead {
			th {
				color: #4680FF;
				background-color: #eee;
				font-size: 16px;
				&::before {
					border-color: #fff;
					transform: scaleY(1);
				}
				&::after {
					border-color: #fff;
					transform: scaleX(1);
				}
			}
		}
		tbody {
			tr {
				&:first-child {
					td {
						color: #e51c23;
					}
				}
				&:nth-child(2) {
					td {
						color: #ff9800;
					}
				}
				&:nth-child(3) {
					td {
						color: #4c7c4b;
					}
				}
				td {
					color: #333;
					background-color: #eee;
					&:first-child {
						color: #4680FF;
					}
					&::before {
						border-color: #fff;
						transform: scaleY(1);
					}
					&::after {
						border-color: #fff;
						transform: scaleX(1);
					}
				}
			}
		}
	}
</style>

