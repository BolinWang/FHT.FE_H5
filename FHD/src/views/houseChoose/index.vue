<template>
  <div style="height:100%;">
    <view-box ref="viewBox" >
			<div class="askDiv">
				<flexbox :gutter="0">
          <flexbox-item :span="1/8">
            <div class="title">租客<br/>要求</div>
          </flexbox-item>
          <flexbox-item>
            <div class="nav">
							<span v-if="askParam.rentFeeName && askParam.rentFeeName != '不限'">{{askParam.rentFeeName}}</span>
							<span>{{askParam.houseType | houseTypeStr}}</span>
							<span v-if="askParam.roomType">{{askParam.roomType}}室</span>
							<span>{{askParam.houseDirection | houseDirectionStr}}</span>
							<span v-for="(item, index) in houseFeatureArr" :key="index">
								{{item | houseFeatureStr}}
							</span>
						</div>
          </flexbox-item>
        </flexbox>
			</div>
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
			<div class="textAlign" style="line-height:30px" v-show="showLoading">
				<inline-loading ></inline-loading> 数据加载中O(∩_∩)O~
			</div>
			<scroll :data="roomDataList" ref="scroll" @pullingUp="moreData" @pullingDown="refreshData" id="scroll_container">
      	<house-list :data="roomDataList" @getLength="getLength" v-if="roomDataList.length > 0" :cList="chooseList" ref="house"></house-list>
				<div class="noData_content" v-else>
					<p>暂无数据o(╥﹏╥)o</p>
				</div>
			</scroll>
			<div slot="bottom" class="bottomDiv">
        <flexbox :gutter="0">
          <flexbox-item :span="1/4" class="btn-box"  @click.native="chooseAll">
            <div class="btn-item text-all">{{isChooseAll ? '全不选' : '全选'}}</div>
          </flexbox-item>
          <flexbox-item class="btn-box" @click.native="chooseToApp">
            <div class="btn-item text-choose">已选择（{{chooseList.length}}）并确定</div>
          </flexbox-item>
        </flexbox>
      </div>
			<popup ref="mypop" v-model="selectOptions[currentIndex].active"
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
							<x-input v-model="searchData.adminNameOrMobile" placeholder="房东/房东手机号码"></x-input>
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
					<!-- <div class="pop_item" v-else-if="currentIndex === 1">
						<div class="pop_item-pic"
							v-for="(item, index) in topListParams.hasPic" :key="index"
							:class="{active: topListParams.hasPic[index].selected}"
							@click="selectParams(topListParams.hasPic, index, 'hasPic')">
							{{item.name}}
						</div>
					</div> -->
					<!-- 房态 -->
					<div class="pop_item" v-else-if="currentIndex === 1">
						<div class="pop_item-pic"
							v-for="(item, index) in topListParams.statusList" :key="index"
							:class="{active: topListParams.statusList[index].selected}"
							@click="selectParams(topListParams.statusList, index, 'statusList')">
							{{item.name}}
						</div>
					</div>
					<!-- 价格排序 -->
					<div class="pop_item" v-else-if="currentIndex === 2">
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
									<x-input :show-clear="false" v-model="searchData.minPrice" placeholder="最小租金" style="padding-right: 0"></x-input>
								</flexbox-item>
								<flexbox-item style="text-align: center;" :span="1">
									一
								</flexbox-item>
								<flexbox-item>
									<x-input :show-clear="false" v-model="searchData.maxPrice" placeholder="最大租金" style="padding-left: 0"></x-input>
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
	Loading, TransferDom, InlineLoading
} from 'vux'
import footers from '@/components/footer'
import scroll from "@/components/scroll"
import houseList from './components/list'
import {addClass, removeClass} from '@/utils/dom'
import {houseApi, recordUrlApi, queryManagerZone} from '@/api/source'
import {ObjectMap, deepClone} from '@/utils'
const priceList = [{
	minPrice: '',
	maxPrice: ''
},{
	minPrice: '',
	maxPrice: '1500'
},{
	minPrice: '1500',
	maxPrice: '2000'
},{
	minPrice: '2000',
	maxPrice: '2500'
},{
	minPrice: '2500',
	maxPrice: '3000'
},{
	minPrice: '3000',
	maxPrice: '3500'
},{
	minPrice: '3500',
	maxPrice: '4000'
},{
	minPrice: '4000',
	maxPrice: '5000'
},{
	minPrice: '5000',
	maxPrice: ''
}]
export default {
  components: {
    footers, Tab, TabItem, houseList,
		Actionsheet, Loading, TransferDom,
		Cell, Flexbox, FlexboxItem, scroll,
		Popup, XInput, XButton, Search, InlineLoading
	},
	directives: {
    TransferDom
	},
	filters: {
		houseTypeStr(val) {
			const arr = ['合租', '整租', '公寓']
			return arr[val - 1] || '未知'
		},
		houseDirectionStr(val) {
			const arr = ['朝南', '朝北', '朝东', '朝西']
			return arr[val - 1] || '未知'
		},
		houseFeatureStr(val) {
			const arr = ['独立厨房', '独卫', '独立阳台', '飘窗']
			return arr[val - 1] || '未知'
		}
	},
	created() {
		if (window.JSCustomerDetailInfo) {
			let data = window.JSCustomerDetailInfo.getCustomerDetailInfoAction()
			this.askParam = JSON.parse(data)
		} else {
			this.askParam = {
				roomType: '',
				houseType: 1,
				houseDirection: 1,
				houseFeature: '',
				rentFee: 0,
				rentFeeName: '不限'
			}
		}
		this.paramsListClone = deepClone(this.paramsList)
		this.topListParamsClone = deepClone(this.topListParams)

		// 客源带过来的搜索条件
		this.houseFeatureArr = this.askParam.houseFeature.split(',')
		if (this.houseFeatureArr[0] === '') {
			this.houseFeatureArr = []
		}
		const price = priceList[this.askParam.rentFee]
		this.searchData.minPrice = price.minPrice
		this.searchData.maxPrice = price.maxPrice
		this.paramsList.chamberCounts.forEach(val => {
			if (parseInt(val.value) === this.askParam.roomType) {
				val.selected = true
			}
		})
		this.paramsList.roomDirection.forEach(val => {
			if (parseInt(val.value) === this.askParam.houseDirection) {
				val.selected = true
			}
		})
		if (this.askParam.houseType > 0) {
			this.paramsList.housingType[this.askParam.houseType - 1].selected = true
		}
		this.topListParams.statusList[1].selected = true //默认空房
		this.paramsList.roomAttributeList.forEach(val => {
			if (this.houseFeatureArr.indexOf(val.value) > -1) {
				val.selected = true
			}
		})

		this.getArea().then(res => {
      this.toSearch()
    }).catch(rej => {
      this.$vux.toast.text(rej.message || '未查询到所属板块')
		})
	},
  mounted() {
		window['returnData'] = (data) => {
			this.chooseList = JSON.parse(data) || []
		}
  },
  data() {
    return {
			regionAddressName: '',
			totalPages: 1,
			pageNo: 1,
			pageSize: 20,
			showLoading: false,
			isChooseAll: false,
			chooseList: [],
			houseFeatureArr: [],
      zoneList: [], // 管辖地区
			roomDataList: [], // 房源列表数据
			currentIndex: 0, // 当前选项索引
			searchData: {}, // 查询参数
			askParam: {},
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
					value: 'desc',
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
				queryManagerZone().then(res => {
					if (res.success && res.data && res.data.length > 0) {
            res.data.map(val => {
              this.zoneList.push(val.zoneId)
						})
						resolve(res)
          } else {
						reject(res)
					}
				}).catch(rej => {
					reject(rej)
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
		getLength(arr) {
			this.chooseList = arr || []
		},
		chooseAll() {
			this.isChooseAll = !this.isChooseAll
			this.$refs.house.allIn(this.isChooseAll)
		},
		chooseToApp() {
			if (window.JSLookRoomsInfo) {
				window.JSLookRoomsInfo.lookRoomsInfoInfoAction(JSON.stringify(this.chooseList))
			}
		},
		// 控制mask top
		popShow() {
			const top = document.getElementById('scroll_container').offsetTop + 'px'
			document.querySelector('.select-list').style.top = top
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
			let isChecked = list[index].selected
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
			list[index].selected = !isChecked
			this.selectOptions[this.currentIndex].selected = true
			// 更多选项中不要关闭popup
			if (type !== 'housingType' && type !== 'roomDirection') {
				// 选择后关闭popup
				this.selectOptions[this.currentIndex].active = false
				this.toSearch()
			}
		},
		clearParam() {
			this.selectOptions[this.currentIndex].selected = false
			// 精准搜索
			if (this.currentIndex === 0) {
				this.$set(this.searchData, 'estateName', '')
				this.$set(this.searchData, 'adminNameOrMobile', '')
				this.$set(this.searchData, 'roomNo', '')
			} else {
				this.$set(this.searchData, 'minPrice', '')
				this.$set(this.searchData, 'maxPrice', '')
				this.paramsList = deepClone(this.paramsListClone)
			}
			this.toSearch()
		},
		searchParam() {
			this.selectOptions[this.currentIndex].selected = false
			// 精准搜索
			if (this.currentIndex === 0) {
				if (this.searchData.estateName || this.searchData.adminNameOrMobile || this.searchData.roomNo){
					this.selectOptions[this.currentIndex].selected = true
					this.searchData.keyword = ''
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
			if (this.zoneList.length === 0) { // 未查询到所属板块时 一律拦截
				return false
			}
			if (type === 'more') {
				this.pageNo ++
			} else {
				this.pageNo = 1
				this.showLoading = true
			}
			if (this.pageNo > this.totalPages) {
				this.$refs.scroll.forceUpdate()
				return false
			}

			let searchData = this.searchData
			let hasPicParam = this.topListParams.hasPic.filter((item) => item.selected)
			let statusListParam = this.topListParams.statusList.filter((item) => item.selected && item.value)
			let sortTypeParam = this.topListParams.sortType.filter((item) => item.selected)
			let topListParams = {
				hasRoomPic: hasPicParam.length > 0 ? (hasPicParam[0].value * 1 === 1 ? true : hasPicParam[0].value * 1 === 2 ? false : '') : '',
				statusList: statusListParam.length > 0 ? statusListParam[0].value.split(',').map((item) => item * 1) : undefined,
				sortType: sortTypeParam.length > 0 ? sortTypeParam[0].value : 'desc',
				orderBy: sortTypeParam.length > 0 ? sortTypeParam[0].name === '默认' ? 'createTime' : 'minRentPrice' : 'createTime',
			}
			// keyword和排序规则权重冲突
			if (searchData.keyword) {
				topListParams.orderBy = ''
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
			//  let decorationDegreesParam = this.paramsList.decorationDegrees.filter((item) => item.selected)
			let roomDirectionParam = this.paramsList.roomDirection.filter((item) => item.selected)
			let roomAttributeListParam = this.paramsList.roomAttributeList.filter((item) => item.selected)
			let paramsList = {
				chamberCounts: chamberCountsParam.length > 0 ? chamberCountsParam : undefined,
				roomDirections: roomDirectionParam.length > 0 ? [roomDirectionParam[0].value * 1] : undefined,
			//	decorationDegrees: decorationDegreesParam.length > 0 ? decorationDegreesParam.map((item) => item.value * 1) : undefined,
				roomAttributeList: roomAttributeListParam.length > 0 ? roomAttributeListParam.map((item) => item.value * 1) : undefined
			}
			// 房间类型
			if (housingTypeParam.length > 0) {
				paramsList[housingTypeParam[0].param] = housingTypeParam[0].value * 1
				if (housingTypeParam[0].param === 'houseRentType') {
					paramsList.housingType = 2
				}
			}

			let searchDataParams = ObjectMap({
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				financeType: 1,
				...searchData,
				...topListParams,
				...paramsList
			})
			let toLei = deepClone(searchDataParams)
			searchDataParams.zoneIds = this.zoneList
      houseApi(searchDataParams).then(res => {
				type === 'more' ? '' : this.showLoading = false
				let resultData = res.result || []
				if (this.isAndriod && resultData.length > 0) {
					// 安卓地图返回小区
					this.regionAddressName = resultData[0].regionAddressName
				}

				if (this.pageNo === 1) {
					this.totalPages = res.totalPages || 1
					this.roomDataList = resultData
					this.$refs.scroll.scrollTo(0, 0)
        } else if (this.pageNo <= this.totalPages) {
          this.roomDataList = this.roomDataList.concat(resultData)
        } else {
          this.$refs.scroll.forceUpdate()
				}
				toLei.zoneList = this.zoneList
				recordUrlApi(toLei).then(res => {
					console.log('recordUrl')
				}).catch(res => {})
      }).catch(res => {
				type === 'more' ? '' : this.showLoading = false
			})
		},
		// 安卓地图
    handleAndriodMap() {
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
			if (this.zoneList.length > 0) {
				this.toSearch('more')
			} else {
				this.$refs.scroll.forceUpdate()
			}
    },
    refreshData() {
			if (this.zoneList.length > 0) {
				this.toSearch()
			} else {
				this.$refs.scroll.forceUpdate()
			}
		},
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
	.header_container{
		width:100%;
		position:absolute;
		left:0;
		top:0;
		z-index:100;
	}
	#scroll_container {
   height: 450px;
	}
	.textAlign {
		width: 100%;
		text-align: center;
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
	.askDiv {
		background: #fff;
		.title {
			text-align: center;
		}
		border-bottom: 1px solid #ccc;
		.nav {
			display: flex;
			align-items: flex-start;
			flex-wrap: wrap;
			span {
				padding: 0px 5px;
				border: 1px solid #ccc;
				border-radius: 5px;
				margin-right: 5px;
				margin-top: 5px;
			}
			margin-bottom: 5px;
		}
	}
	.top-select {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		padding: 10px 0;
		font-size: 14px;
		border-bottom: 1px solid #ddd;
		background: #fff;
		.select-item {
			width: 90px;
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
		// top: 85px !important;
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
	.bottomDiv {
		z-index: 9;
		top: -36PX;
		.btn-item {
			text-align: center;
			height: 36px;
			line-height: 36px;
			background: #4680ff;
			color: #fff;
			font-weight: 700;
		}
		.text-all {
			background: #fff;
			color: #4680ff;
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
	.vux-header-back,
	.left-arrow {
		margin-top: 13px;
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
