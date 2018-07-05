/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-07-02 10:19:21
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-07-05 13:27:31
 */

<template>
	<div>
		<div style="height:100%;">
			<ul class="houseNav" v-if="listData.length > 0">
				<li v-for="(item, index) in listData" :key="index" @click="toDetail(item)">
					<div class="houseTitle">
						<div class="left" v-html="item.name"></div>
					</div>
					<div class="houseDetail">
						<div class="detailImg" :class="{hasImg: item.imageUrl, noImg: !item.imageUrl}">
							<x-img :src="item.imageUrl" class="houseImg"></x-img>
						</div>
						<div class="detailRight flex">
							<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
								<div class="roomPrice">
									{{item.minRentPrice > 0 ? `${item.minRentPrice} 元/月` : '暂无价格'}}
								</div>
								<div class="roomStatus" :class="{
									kongfang: statusMapData.kongfang.includes(item.status),
									chuzu: statusMapData.chuzu.includes(item.status),
									zaizhu: statusMapData.zaizhu.includes(item.status),
									baoliu: statusMapData.baoliu.includes(item.status)
								}">{{item.status | statusStr}}</div>
							</div>
							<div class="featureDiv">
								<span class="feature" v-for="(v, k) in item.featureList" :key="k" v-show="v">
									{{v}}
								</span>
							</div>
							<div class="featureDiv">
								<span class="feature" v-for="(v, k) in item.roomFeatureList" :key="k" v-show="v">
									{{v}}
								</span>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { Tab, TabItem, XImg } from "vux"

const statusMapData = {
	'kongfang': '1,2,5,6,10',
	'zaizhu': '3,4,8',
	'chuzu': '9',
	'baoliu': '7'
}
const directionList = [
	"未知朝向",
	"朝南",
	"朝北",
	"朝东",
	"朝西",
	"东南",
	"西南",
	"东北",
	"西北"
]
const attrList = ["", "独卫", "阳台", "厨房", "飘窗"]

export default {
  name: "house-list",
  components: {
    Tab, TabItem, XImg
  },
  props: {
    data: {
      default: []
    },
    showTab: {
      type: Boolean,
      default: true
    }
  },
  filters: {
    statusStr(val) {
      const statusList = [{
				name: '空房',
				value: '1,2,5,6,10'
			},{
				name: '在住',
				value: '3,4,8'
			},{
				name: '已出租',
				value: '9'
			},{
				name: '保留中',
				value: '7'
			}]
			let mapArr = statusList.filter((item) => {
				return item.value.includes(val)
			})
			return mapArr.length > 0 ? mapArr[0].name : '空房'
    }
	},
	created() {
		this.listData = this.data
		this.listData.map((item) => {
			item.featureList = []
			let roomGuard = `${item.chamberCount || 0}室${item.boardCount || 0}厅${item.toiletCount || 0}卫`
			let roomType = item.housingType === 1 ? '公寓' : (item.houseRentType === 2 ? '合租' : '整租')
			let roomArea = `${item.roomArea || 0}㎡`
			let roomDirection = directionList[item.roomDirection]
			let roomAttributes = item.roomAttributes.split(',').map((item) => {
				return attrList[item]
			})
			item.roomFeatureList = [
				roomDirection,
				...roomAttributes
			]
			item.featureList = [roomGuard, roomType, roomArea]
		})
	},
  mounted() {},
  data() {
    return {
			statusMapData,
			listData: []
    }
  },
  methods: {
		// andriod 跳转详情页
    toDetail(item) {
			if (window.HouseResouse) {
        window.HouseResouse.gotoRoomDetail(JSON.stringify(item))
      }
    }
  },
  watch: {
    data(val = []) {
			val.map((item) => {
				item.featureList = []
				let roomGuard = `${item.chamberCount || 0}室${item.boardCount || 0}厅${item.toiletCount || 0}卫`
				let roomType = item.housingType === 1 ? '公寓' : (item.houseRentType === 2 ? '合租' : '整租')
				let roomArea = `${item.roomArea || 0}㎡`
				let roomDirection = directionList[item.roomDirection]
				let roomAttributes = item.roomAttributes.split(',').map((item) => {
					return attrList[item]
				})
				item.roomFeatureList = [
					roomDirection,
					...roomAttributes
				]
 				item.featureList = [roomGuard, roomType, roomArea]
			})
			this.listData = val
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.houseNav {
  padding: 5px;
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
      
    }
    .houseDetail {
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
        &:after {
          content: "";
          position: absolute;
          right: -25px;
          bottom: -25px;
          width: 50px;
          height: 50px;
          font-size: 12px;
          display: inline-block;
          transform: rotate(-45deg);
          text-align: center;
          background: #e5e5e5;
        }
      }
      .hasImg {
        &:after {
          content: "有图";
          color: #4680ff;
        }
      }
      .noImg {
        &:after {
          content: "无图";
          color: #e51c23;
        }
        &:before {
          content: "\e620";
          font-family: "iconfont";
          position: absolute;
          font-size: 40px;
          color: #ddd;
          left: 30%;
          top: 10%;
        }
      }
      .detailRight {
        width: 230px;
        height: 84px;
        float: right;
        .roomName {
          font-size: 14px;
          height: 22px;
          color: #101010;
          width: 80%;
          float: left;
				}
				.roomPrice {
					color: #E51C23;
					font-size: 14px;
				}
        .roomStatus {
          color: #fff;
					font-size: 12px;
					width: 40px;
					height: 20px;
					line-height: 18px;
					border-radius: 4px;
					text-align: center;
					border: 1px solid transparent;
        }
        .area {
          font-size: 12px;
          color: #999;
          line-height: 20px;
        }
        .feature {
          padding: 0px 4px;
          border: 1px solid #ddd;
          border-radius: 4px;
          color: #999;
          float: left;
          margin: 0 5px 5px 0;
        }
      }
    }
  }
  .flex {
    display: flex;
    width: 100%;
    height: 55px;
    flex-direction: column;
    justify-content: space-between;
    align-content: flex-end;
	}

	// 出租
  .chuzu {
		background: #B341ED !important;
	}
	// 空房
  .kongfang {
    background: #ff9800 !important;
	}
	// 保留
  .baoliu {
    background: #259b24 !important;
	}
	// 在住
	.zaizhu {
    background: #4680ff !important;
  }
}
</style>

