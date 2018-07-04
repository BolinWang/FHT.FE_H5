<template>
  <div style="height:100%;background:#fff">
		<div class="top-select">
			<div class="select-item"
				:class="{active: selectOptions[index].active, selected: selectOptions[index].selected}"
				v-for="(item, index) in selectOptions" :key="index"
				@click="showPopup(index)">
				<span class="select-text">
					{{item.text}}
				</span>
				<span class="select-icon"></span>
			</div>
		</div>
    <view-box ref="viewBox" body-padding-top="86px" >
      <x-header slot="header" v-if="!isAndriod" class="header_container" @click.native="clickHeader">
				<div class="search" slot="overwrite-left">
					<search
						placeholder='小区/公寓/房东/房东手机号码'
						v-model="searchData.keyword"
						auto-scroll-to-top
						@on-cancel="cancelKeyword"
						@on-submit="toSearch"
						ref="search">
					</search>
				</div>
				<div slot="right" class="addIcon" @click="handleAndriodMap">
					<img src="../../static/map.png">
				</div>
			</x-header>
			<x-header class="header_container" v-else
				:leftOptions="{preventGoBack: true, backText: '地图找房'}"
				@on-click-back="andriodBack">
				{{regionAddressName}}
			</x-header>
			<div v-transfer-dom><loading :show="showLoading" text="数据加载中"></loading></div>
			<scroll :data="roomDataList" ref="scroll" @pullingUp="moreData" @pullingDown="refreshData">
      	<house-list :data="roomDataList" v-if="roomDataList.length > 0"></house-list>
				<div class="noData_content" v-else>
					<p>暂无数据o(╥﹏╥)o</p>
				</div>
			</scroll>
      <footers :selectedIndex="1" slot="bottom"></footers>
			<popup v-model="selectOptions[currentIndex].active"
				position="top" class="select-list"
				@on-show="popShow"
				@on-hide="popHide">
				<div class="pop_container">
					<!-- 精准搜索 -->
					<div class="pop_item" style="border-top: 0;" v-if="currentIndex === 0">
						<group title="小区/公寓">
							<x-input v-model="searchData.estateName" placeholder="小区/公寓"></x-input>
						</group>
						<group title="房东/房东手机号码">
							<x-input v-model="searchData.adminKeyword" placeholder="房东/房东手机号码"></x-input>
						</group>
						<group title="房间号">
							<x-input v-model="searchData.roomNo" placeholder="房间号"></x-input>
						</group>
						<flexbox class="pop_btn_group">
							<flexbox-item>
								<x-button @click.native="clearParam" style="background: #fff;">清空</x-button>
							</flexbox-item>
							<flexbox-item :span="8">
								<x-button :gradients="['#19D5FD','#1D62F0']" @click.native="searchParam">确定</x-button>
							</flexbox-item>
						</flexbox>
					</div>
					<!-- 有图？ -->
					<div class="pop_item" v-else-if="currentIndex === 1">
						<div class="pop_item-pic"
							v-for="(item, index) in topListParams.hasPic" :key="index"
							:class="{active: topListParams.hasPic[index].selected}"
							@click="selectParams(topListParams.hasPic, index, 'hasPic')">
							{{item.name}}
						</div>
					</div>
					<!-- 房态 -->
					<div class="pop_item" v-else-if="currentIndex === 2">
						<div class="pop_item-pic"
							v-for="(item, index) in topListParams.statusList" :key="index"
							:class="{active: topListParams.statusList[index].selected}"
							@click="selectParams(topListParams.statusList, index, 'statusList')">
							{{item.name}}
						</div>
					</div>
					<!-- 价格排序 -->
					<div class="pop_item" v-else-if="currentIndex === 3">
						<div class="pop_item-pic"
							v-for="(item, index) in topListParams.sortType" :key="index"
							:class="{active: topListParams.sortType[index].selected}"
							@click="selectParams(topListParams.sortType, index, 'sortType')">
							{{item.name}}
						</div>
					</div>
					<!-- 更多 -->
					<div class="pop_item" style="border-top: 0;"  v-else>
						<group title="月租金租金范围">
							<flexbox>
								<flexbox-item>
									<x-input type="number" :show-clear="false" v-model="searchData.minPrice" placeholder="最小租金" style="padding-right: 0"></x-input>
								</flexbox-item>
								<flexbox-item style="text-align: center;" :span="1">
									一
								</flexbox-item>
								<flexbox-item>
									<x-input type="number" :show-clear="false" v-model="searchData.maxPrice" placeholder="最大租金" style="padding-left: 0"></x-input>
								</flexbox-item>
							</flexbox>
						</group>
						<group title="户型">
							<div class="pop_item_chamberCounts">
								<span class="pop_item_tags"
									v-for="(item, index) in paramsList.chamberCounts" :key="index"
									:class="{active_chamberCounts: paramsList.chamberCounts[index].selected}"
									@click="selectParams(paramsList.chamberCounts, index, 'chamberCounts')">
									{{item.name}}
								</span>
							</div>
						</group>
						<group title="房间类型">
							<div class="pop_item_chamberCounts">
								<span class="pop_item_tags"
									v-for="(item, index) in paramsList.housingType" :key="index"
									:class="{active_chamberCounts: paramsList.housingType[index].selected}"
									@click="selectParams(paramsList.housingType, index, 'housingType')">
									{{item.name}}
								</span>
							</div>
						</group>
						<group title="房间朝向">
							<div class="pop_item_chamberCounts">
								<span class="pop_item_tags"
									v-for="(item, index) in paramsList.roomDirection" :key="index"
									:class="{active_chamberCounts: paramsList.roomDirection[index].selected}"
									@click="selectParams(paramsList.roomDirection, index, 'roomDirection')">
									{{item.name}}
								</span>
							</div>
						</group>
						<group title="房间特色">
							<div class="pop_item_chamberCounts">
								<span class="pop_item_tags"
									v-for="(item, index) in paramsList.roomAttributeList" :key="index"
									:class="{active_chamberCounts: paramsList.roomAttributeList[index].selected}"
									@click="selectParams(paramsList.roomAttributeList, index, 'roomAttributeList')">
									{{item.name}}
								</span>
							</div>
						</group>
						<flexbox class="pop_btn_group">
							<flexbox-item>
								<x-button @click.native="clearParam" style="background: #fff;">清空</x-button>
							</flexbox-item>
							<flexbox-item :span="8">
								<x-button :gradients="['#19D5FD','#1D62F0']" @click.native="searchParam">确定</x-button>
							</flexbox-item>
						</flexbox>
					</div>
				</div>
			</popup>
    </view-box>
  </div>
</template>

<script>
import {
	Tab, TabItem, XImg, Actionsheet, Cell, Search,
	Flexbox, FlexboxItem, Popup, XInput, XButton,
	Loading, TransferDom
} from 'vux'
import footers from '@/components/footer'
import scroll from "@/components/scroll"
import houseList from './components/list'
import {addClass, removeClass} from '@/utils/dom'
import {houseApi} from '@/api/source'
import {ObjectMap, deepClone} from '@/utils'
import axios from 'axios'

const leiUrl = process.env.ENV_CONFIG === 'dev' ? 'test-flying-api' : 'flying-api'

export default {
  components: {
    footers, Tab, TabItem, houseList,
		Actionsheet, Loading, TransferDom,
		Cell, Flexbox, FlexboxItem, scroll,
		Popup, XInput, XButton, Search
	},
	directives: {
    TransferDom
  },
	created() {
		this.getArea().then(res => {
      this.toSearch()
    }).catch(rej => {
      this.$vux.toast.text('获取区域失败')
		})

		// 去安卓拿地图数据
		this.isAndriod = false
		this.paramsListClone = deepClone(this.paramsList)
		this.topListParamsClone = deepClone(this.topListParams)
	},
  mounted() {
    window['getMapData'] = (data) => {
			// 清空所有查询条件
			this.searchData = {}
			this.selectOptions.map((item) => {
				item.selected = false
				item.active = false
			})
			this.paramsList = deepClone(this.paramsListClone)
			this.topListParams = deepClone(this.topListParamsClone)
			this.currentIndex = 0
			// andriod返回数据 空房
			if (data && data != -999) {
				this.isAndriod = true
				this.currentIndex = 2
				this.searchData.regionAddressId = data
				this.topListParams.statusList[1].selected = true
				this.selectOptions[this.currentIndex].selected = true
			} else {
				this.isAndriod = false
				this.searchData.regionAddressId = ''
			}
			this.toSearch()
		},
		window['refreshPage'] = () => {
			this.toSearch()
		}
  },
  data() {
    return {
			regionAddressName: '',
			totalPages: 1,
			pageNo: 1,
			pageSize: 5,
      showLoading: false,
      areaList: [], // 管辖地区
			roomDataList: [], // 房源列表数据
			currentIndex: 0, // 当前选项索引
			searchData: {}, // 查询参数
			/**
			 * active: 选项激活状态
			 * selected: 选项有选中
			 */
      selectOptions: [
				{
          text: "搜索",
					active: false,
					selected: false
        },
        {
          text: "图片",
					active: false,
					selected: false
        },
        {
          text: "状态",
					active: false,
					selected: false
        },
        {
          text: "租金",
					active: false,
					selected: false
        },
        {
          text: "更多",
					active: false,
					selected: false
        }
			],
			// 图片。状态。租金
			topListParams: {
				'hasPic': [{
					name: '全部',
					value: '',
					selected: false
				},
				{
					name: '有图',
					value: 1,
					selected: false
				},
				{
					name: '无图',
					value: 2,
					selected: false
				}],
				'statusList': [{
					name: '全部',
					value: '',
					selected: false
				},{
					name: '空房',
					value: '1,2,5,6,10',
					selected: false
				},{
					name: '在住',
					value: '3,4,8',
					selected: false
				},{
					name: '已出租',
					value: '9',
					selected: false
				},{
					name: '保留中',
					value: '7',
					selected: false
				}],
				'sortType': [{
					name: '默认',
					value: 'asc',
					selected: false
				},{
					name: '从低到高',
					value: 'asc',
					selected: false
				},{
					name: '从高到低',
					value: 'desc',
					selected: false
				}]
			},
			// 更多条件
			paramsList: {
				'chamberCounts': [{
					name: '1室',
					value: '1',
					selected: false
				},{
					name: '2室',
					value: '2',
					selected: false
				},{
					name: '3室',
					value: '3',
					selected: false
				},{
					name: '4室',
					value: '4',
					selected: false
				},{
					name: '4室以上',
					value: '999',
					selected: false
				}],
				'roomDirection': [{
					name: '朝南',
					value: '1',
					selected: false
				},{
					name: '朝北',
					value: '2',
					selected: false
				},{
					name: '朝东',
					value: '3',
					selected: false
				},{
					name: '朝西',
					value: '4',
					selected: false
				}],
				'housingType': [{
					name: '合租',
					value: '2',
					param: 'houseRentType',
					selected: false
				},{
					name: '整租',
					value: '1',
					param: 'houseRentType',
					selected: false
				},{
					name: '公寓',
					value: '1',
					param: 'housingType',
					selected: false
				}],
				'decorationDegrees': [{
					name: '毛坯',
					value: '1',
					selected: false
				},{
					name: '简装',
					value: '2',
					selected: false
				},{
					name: '精装',
					value: '3',
					selected: false
				},{
					name: '豪装',
					value: '4',
					selected: false
				}],
				'roomAttributeList': [{
					name: '独卫',
					value: '1',
					selected: false
				},{
					name: '独立阳台',
					value: '2',
					selected: false
				},{
					name: '独立厨房',
					value: '3',
					selected: false
				},{
					name: '带飘窗',
					value: '4',
					selected: false
				}]
			}
    }
  },
  methods: {
		// 获取管辖地区
		getArea() {
      return new Promise((resolve, reject) => {
        const userData = JSON.parse(localStorage.getItem('userData')) || {}
        axios({
          url: `https://${leiUrl}.mdguanjia.com/api/user/queryManageArea`,
          method: 'post',
          data: {
            sessionId: userData.sessionId
          },
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          if (res.data.success && res.data.data.length > 0) {
            res.data.data.map(val => {
              this.areaList.push(val.areaId)
            })
            localStorage.setItem('areaData', JSON.stringify(res.data.data))
          }
          resolve(res)
        }).catch(req => {
          reject(req)
        })
      })
		},
		clickHeader() {
			this.selectOptions[this.currentIndex].active = false
		},
		cancelKeyword() {
			this.searchData.keyword = ''
			this.toSearch()
		},
		// 控制mask top
		popShow() {
			addClass(document.querySelector('.vux-popup-mask'),'popMask')
		},
		popHide() {
			removeClass(document.querySelector('.vux-popup-mask'),'popMask')
		},
		// 下拉列表选项
		showPopup(index) {
			// 重新点击取消选项
			if (this.selectOptions[index].active) {
				this.selectOptions[index].active = false
				return false
			}
			this.currentIndex = index
			this.selectOptions.map((item) => {
				item.active = false
			})
			this.selectOptions[index].active = true
		},
		// 选择选项
		selectParams(list = [], index, type) {
			if (type === 'housingType') {
				list.map((item) => {
					item.selected = false
				})
				list[index].selected = true
				let selectedItems_type = list.map((item) => {
					return item.selected
				})
				// 非合租时，更改房间合租属性标签
				if (list[index].value * 1 === 1 && selectedItems_type.length > 0) {
					this.paramsList.roomAttributeList.map((item) => {
						item.selected = false
					})
				}
				this.selectOptions[this.currentIndex].selected = true
				return false
			}
			if (type === 'chamberCounts' || type === 'roomAttributeList') {
				list[index].selected = !list[index].selected
				// 合租独有的属性
				if (type === 'roomAttributeList') {
					let selectedItems_attr = list.map((item) => {
						return item.selected
					})
					// 选择合租属性时，更改房间类型为合租
					if (selectedItems_attr.length > 0) {
						this.paramsList.housingType.map((item) => {
							item.selected = false
						})
						this.paramsList.housingType[0].selected = true
					}
				}
				return false
			}
			list.map((item) => {
				item.selected = false
			})
			list[index].selected = true
			this.selectOptions[this.currentIndex].selected = true

			// 更多选项中不要关闭popup
			if (type !== 'housingType' && type !== 'roomDirection') {
				// 选择后关闭popup
				this.selectOptions[this.currentIndex].active = false
				this.toSearch()
			}
		},
		clearParam() {
			// 精准搜索
			if (this.currentIndex === 0) {
				this.searchData.estateName = ''
				this.searchData.adminKeyword = ''
				this.searchData.roomNo = ''
			} else {
				this.searchData.minPrice = ''
				this.searchData.maxPrice = ''
				this.paramsList = deepClone(this.paramsListClone)
			}
		},
		searchParam() {
			this.selectOptions[this.currentIndex].selected = false
			// 精准搜索
			if (this.currentIndex === 0) {
				if (this.searchData.estateName || this.searchData.adminKeyword || this.searchData.roomNo){
					this.selectOptions[this.currentIndex].selected = true
				}
			} else {
				let totalItems = [
					...this.paramsList.chamberCounts,
					...this.paramsList.housingType,
					...this.paramsList.roomDirection,
					...this.paramsList.roomAttributeList
				]
				const selectedList = totalItems.filter((item) => {
					return item.selected
				})
				if (selectedList.length > 0 || this.searchData.minPrice || this.searchData.maxPrice) {
					this.selectOptions[this.currentIndex].selected = true
				}
			}
			this.selectOptions[this.currentIndex].active = false
			this.toSearch()
		},
		// // 连续数组组装
		// continueArr(arr){
		// 	if (!arr || arr.length === 0) {
		// 		return undefined
		// 	}
		// 	let result = [], i = 0
		// 	result[i] = [arr[0]]
		// 	arr.reduce(function(prev, cur){
		// 		cur - prev === 1 ? result[i].push(cur) : result[++i] = [cur]
		// 		return cur
		// 	})
		// 	return result
		// },
		// 搜索
    toSearch(type) {
			/**
			 * 组装查询数据
			 * @param searchData
			 * @param topListParams 图片、状态、租金
			 * @param paramsList
			 */
			if (type === 'more') {
				this.pageNo ++
			} else {
				this.pageNo = 1
			}
			if (this.pageNo > this.totalPages) {
				this.$refs.scroll.forceUpdate()
				return false
			}
			this.showLoading = true
			let searchData = this.searchData

			let hasPicParam = this.topListParams.hasPic.filter((item) => item.selected)
			let statusListParam = this.topListParams.statusList.filter((item) => item.selected && item.value)
			let sortTypeParam = this.topListParams.sortType.filter((item) => item.selected)
			let topListParams = {
				hasPic: hasPicParam.length > 0 ? (hasPicParam[0].value * 1 === 1 ? true : false) : '',
				statusList: statusListParam.length > 0 ? statusListParam[0].value.split(',').map((item) => item * 1) : undefined,
				sortType: sortTypeParam.length > 0 ? sortTypeParam[0].value : 'asc',
				orderBy: 'minRentPrice'
			}
			// 户型
			let chamberCountsParam = this.paramsList.chamberCounts
					.filter((item) => item.selected)
					.map((item) => {
						let mapObj = item.value * 1 === 999 ? {
							'min': 5,
							'max': '',
						} : {
							'min': item.value * 1,
							'max': item.value * 1,
						}
						return mapObj
					})
			let housingTypeParam = this.paramsList.housingType.filter((item) => item.selected)
		//	let decorationDegreesParam = this.paramsList.decorationDegrees.filter((item) => item.selected)
			let roomDirectionParam = this.paramsList.roomDirection.filter((item) => item.selected)
			let roomAttributeListParam = this.paramsList.roomAttributeList.filter((item) => item.selected)
			let paramsList = {
				chamberCounts: chamberCountsParam.length > 0 ? chamberCountsParam : undefined,
				roomDirection: roomDirectionParam.length > 0 ? roomDirectionParam[0].value * 1 : undefined,
			//	decorationDegrees: decorationDegreesParam.length > 0 ? decorationDegreesParam.map((item) => item.value * 1) : undefined,
				roomAttributeList: roomAttributeListParam.length > 0 ? roomAttributeListParam.map((item) => item.value * 1) : undefined
			}
			// 房间类型
			if (housingTypeParam.length > 0) {
				paramsList[housingTypeParam[0].param] = housingTypeParam[0].value * 1
			}
      houseApi(ObjectMap({
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				areaList: this.areaList,
				...searchData,
				...topListParams,
				...paramsList
			})).then(res => {
				this.showLoading = false
				let resultData = res.result || []
				if (this.isAndriod && resultData.length > 0) {
					// 安卓地图返回小区
					this.regionAddressName = resultData[0].regionAddressName
				}
				if (this.pageNo === 1) {
					this.totalPages = res.totalPages || 1
          this.roomDataList = resultData
        } else if (this.pageNo <= this.totalPages) {
          this.roomDataList = this.roomDataList.concat(resultData)
        } else {
          this.$refs.scroll.forceUpdate()
        }
      }).catch(res => {
				this.showLoading = false
			})
		},
		// 安卓地图
    handleAndriodMap() {
			console.log('map')
      if (window.MapSearch) {
        window.MapSearch.goToMap()
			}
		},
		// 安卓返回
		andriodBack() {
			if (window.MapGoBack) {
        window.MapGoBack.goBack()
      }
		},
		moreData(){
      this.toSearch('more')
    },
    refreshData() {
      this.toSearch()
		},
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
	.noData_content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		line-height: 30px;
		height: 150px;
		color: #333;
		font-size: 14px;
	}
	.header_container{
		width:100%;
		position:absolute;
		left:0;
		top:0;
		z-index:100;
	}
  .search {
    width: 300px;
    height: 30px;
		line-height: 30px;
		padding-left: 0;
    background-color: #4680ff;
		position: relative;
		top: 0 !important;
    &:after{
      content: '';
      font-family: "iconfont";
      position: absolute;
      left: 0;
    }
	}
	.selected,
	.active {
		color: #4680ff;
	}
	.active_chamberCounts {
		background: #4680ff;
		color: #fff;
		border-color: #4680ff;
	}
	.top-select {
		position: absolute;
		z-index: 500;
		top: 46px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		padding: 10px 0;
		font-size: 14px;
		border-bottom: 1px solid #ddd;
		.select-item {
			width: 70px;
			text-align: center;
			&:not(:first-child){
				border-left: 1px solid #ddd;
			}
			&.active {
				color: rgb(112, 161, 255);
				.select-icon {
					border-width: 0 5px 5px;
					border-color:transparent transparent rgb(112, 161, 255);
					top: -10px;
				}
			}
			.select-icon {
				width:0;
				height:0;
				border-width: 5px 5px 0;
				border-style: solid;
				border-color:#bababa transparent transparent;
				position: relative;
				top: 10px;
			}
		}
	}
	.select-list {
		width: 100%;
		top: 85px !important;
		background-color: #fff;
		font-size: 14px;
		.pop_btn_group {
			padding: 15px;
			button.weui-btn {
				padding: 8px;
				font-size: 14px;
				line-height: 1.2;
				border: 1px solid #4680ff;
			}
		}
		.pop_item{
			color: #333;
			.pop_item-pic {
				text-align: center;
				line-height: 40px;
				border-bottom: 1px solid #ddd;
			}
			.pop_item_chamberCounts {
				padding-left: 15px;
				.pop_item_tags {
					display: inline-block;
					padding: 4px 10px;
					border: 1px solid #ddd;
					border-radius: 3px;
					margin-bottom: 10px;
					margin-top: 5px;
					+.pop_item_tags {
						margin-left: 10px;
					}
				}
			}
		}
	}
	.pop_container {
		border-top: 1px solid #ddd;
	}
	.addIcon {
    width: 46px;
    height: 46px;
    text-align: center;
		line-height: 46px;
		top: 0;
		left: 10px;
    position: relative;
  	img {
			width: 24px;
			height: 24px;
			vertical-align: middle;
		}
	}
</style>

<style rel="stylesheet/less" lang="less">
.vux-popup-mask.popMask {
	top: 85px;
}
.pop_item{
	.weui-cells{
		font-size: 12px;
		&::before{
			border-top: 0 !important;
		}
	}
	.vux-x-input {
		padding: 5px 15px 10px 15px;
	}
	.weui-cells__title {
		margin-bottom: 0;
		color: #333;
	}
	.weui-input {
		background-color: #F2F2F2;
		padding: 10px;
		border-radius: 5px;
		height: 30px;
		line-height: 30px;
	}
}
.header_container {
	height: 46px;
	.vux-header-title {
		font-size: 14px !important;
		margin: 0 95px !important;
	}
	.weui-icon-clear {
		color: #B2B2B2 !important;
	}
	.weui-search-bar {
		padding: 8px 10px !important;
		.weui-search-bar__label {
			top: 0;
		}
	}
	&.vux-header{
		padding: 3px 0;
		.vux-header-right{
			top: 0;
		}
		.vux-header-left {
			top: 0;
		}
	}
}
</style>
