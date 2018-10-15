/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-07-02 10:19:21
 * @Last Modified by: chudequan
 * @Last Modified time: 2018-10-15 16:20:39
 */

<template>
	<div>
		<div style="height:100%;background:#fff">
			<ul class="houseNav" v-if="listData.length > 0">
				<li v-for="(item, index) in listData" :class="{'liMask': chooseIdList.indexOf(item.roomId) > -1, 'liMask unclickable': item.fhdRoomTag === 1}" :key="index" @click="toDetail(item)">
					<div class="houseTitle">
						<div>{{item.name}}</div>
					</div>
					<div class="houseDetail">
						<div class="detailImg" :class="{hasImg: item.roomImageUrl, noImg: !item.roomImageUrl}">
							<span class="isVrPic" v-if="item.isVr === 1">VR</span>
              <img :src="item.roomImageUrl" class="houseImg" v-if="item.roomImageUrl">
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
          <div class="houseTitle">
						<div class="leftName">{{item.name ? `房东：${item.adminUserName}` : ''}}</div>
            <div class="rightMobile" @click.stop="callMobile(item.adminUserMobile)">
              {{item.adminUserMobile | mobileStr}}
              <i class="iconfont icon-dianhua"></i>
            </div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { Tab, TabItem, XImg } from 'vux'
import { plusXing, deepClone } from '@/utils'

const statusMapData = {
  'kongfang': '1,2,5,6,10',
  'zaizhu': '3,4,8',
  'chuzu': '9',
  'baoliu': '7'
}
const directionList = [
  '未知朝向',
  '朝南',
  '朝北',
  '朝东',
  '朝西',
  '东南',
  '西南',
  '东北',
  '西北'
]
const attrList = ['', '独卫', '阳台', '厨房', '飘窗']

export default {
  name: 'house-list',
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
    },
    cList: {
      type: Array,
      default: []
    }
  },
  filters: {
    statusStr(val) {
      const statusList = [{
        name: '空房',
        value: '1,2,5,6,10'
      }, {
        name: '在住',
        value: '3,4,8'
      }, {
        name: '已出租',
        value: '9'
      }, {
        name: '保留中',
        value: '7'
      }]
      let mapArr = statusList.filter((item) => {
        return item.value.includes(val)
      })
      return mapArr.length > 0 ? mapArr[0].name : '空房'
    },
    mobileStr(val) {
      return plusXing(val, 3, 4)
    }
  },
  created() {
    this.listData = this.data
    this.chooseList = this.cList
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
  data() {
    return {
      statusMapData,
      chooseList: [],
      listData: []
    }
  },
  methods: {
    toDetail(item) {
      if (item.fhdRoomTag === 1) {
        return
      }
      let hasIndex = -1
      this.chooseList.map((val, index) => {
        if (val.roomId === item.roomId) {
          hasIndex = index
          return false
        }
      })
      if (hasIndex > -1) {
        this.chooseList.splice(hasIndex, 1)
      } else {
        this.chooseList.push(item)
      }
      this.$emit('getLength', this.chooseList)
    },
    callMobile(mobile) {
      if (mobile) {
        window.call.callAction(mobile)
      }
    },
    allIn(flag) {
      this.chooseList = flag ? deepClone(this.listData.filter(item => item.fhdRoomTag !== 1)) : []
      this.$emit('getLength', this.chooseList)
    }
  },
  computed: {
    chooseIdList() {
      return this.chooseList.map(val => {
        return val.roomId
      })
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
    },
    cList(val = []) {
      this.chooseList = val
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.houseNav {
  padding: 5px 0;
  li {
    padding: 0 5px;
    width: 100%;
    position: relative;
    .houseTitle {
      margin: 5px 0;
      width: 100%;
      min-height: 28px;
      line-height: 28px;
      border-radius: 4px;
      color: rgba(16, 16, 16, 1);
      font-size: 12px;
      left: 6px;
      padding: 0 5px;
      background-color: rgba(242, 242, 242, 1);
      .leftName {
        width: 50%;
        float: left;
      }
      .rightMobile {
        width: 50%;
        text-align: right;
        color: #4680ff;
        float: left;
        padding-right: 10px;
        .iconfont {
          position: relative;
          top: 2px;
        }
      }
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
  .liMask {
    &:before{
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
      background: rgba(16, 16, 16, 0.5);
    }
    &:after {
      font-family: 'iconfont';
      content: '\e644';
      font-size: 100px;
      color: #fff;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 3;
		}
		&.unclickable {
			&::after {
				position: absolute;
				top: 50%;
				left: 0.2rem;
				transform: translateY(-50%);
				width: 3.2rem;
				height: 2.3rem;
				background-image: url(../../../static/is-distribution.png);
				background-size: 100%;
				background-repeat: no-repeat;
				font-size: 0;
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
	.isVrPic {
		position: absolute;
		top: 3px;
		right: 3px;
		color: #4680ff;
		background: #efefef;
		width: 30px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		border-radius: 5px;
		opacity: 0.8;
		font-weight: 700;
	}
}
</style>

