<template>
  <div style="height:100%;background:#fff">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        <div class="search" slot="overwrite-left" @click="toSearch">
          小区/公寓/房东/房东手机号码
        </div>
        <div slot="right" class="addIcon" @click="handleAndriodMap">
          <i class="iconfont icon-xinjian1" ></i>
        </div>
      </x-header>
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
      <house-list :data="roomDataList"></house-list>
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
								<x-button @click.native="searchData = {}" style="background: #fff;">清空</x-button>
							</flexbox-item>
							<flexbox-item :span="8">
								<x-button :gradients="['#19D5FD','#1D62F0']" @click.native="searchParam">确定</x-button>
							</flexbox-item>
						</flexbox>
					</div>
					<!-- 有图？ -->
					<div class="pop_item" v-else-if="currentIndex === 1">
						<div class="pop_item-pic"
							v-for="(item, index) in paramsList.hasPic" :key="index"
							:class="{active: paramsList.hasPic[index].selected}"
							@click="selectParams(paramsList.hasPic, index, 'hasPic')">
							{{item.name}}
						</div>
					</div>
					<!-- 房态 -->
					<div class="pop_item" v-else-if="currentIndex === 2">
						<div class="pop_item-pic"
							v-for="(item, index) in paramsList.statusList" :key="index"
							:class="{active: paramsList.statusList[index].selected}"
							@click="selectParams(paramsList.statusList, index, 'statusList')">
							{{item.name}}
						</div>
					</div>
					<!-- 价格排序 -->
					<div class="pop_item" v-else-if="currentIndex === 3">
						<div class="pop_item-pic"
							v-for="(item, index) in paramsList.sortType" :key="index"
							:class="{active: paramsList.sortType[index].selected}"
							@click="selectParams(paramsList.sortType, index, 'sortType')">
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
									v-for="(item, index) in paramsList.decorationDegrees" :key="index"
									:class="{active_chamberCounts: paramsList.decorationDegrees[index].selected}"
									@click="selectParams(paramsList.decorationDegrees, index, 'decorationDegrees')">
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
								<x-button @click.native="searchData = {}" style="background: #fff;">清空</x-button>
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
	Tab, TabItem, XImg, Actionsheet, Cell,
	Flexbox, FlexboxItem, Popup, XInput, XButton
} from 'vux'
import footers from '@/components/footer'
import houseList from './components/list'
import {addClass, removeClass} from '@/utils/dom'
import {houseApi} from '@/api/source'

export default {
  components: {
    footers,
    Tab,
    TabItem,
    houseList,
		Actionsheet,
		Cell, Flexbox, FlexboxItem,
		Popup, XInput, XButton
	},
	created() {
		this.toSearch()
	},
  mounted() {
    window['backUrl'] = (str) => {
      this.$vux.toast.text(str)
      return 'true'
    }
  },
  data() {
    return {
			roomDataList: [], // 房源列表数据
			currentIndex: 0, // 当前选项索引
			searchData: {}, // 查询参数
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
			paramsList: {
				'hasPic': [{
					name: '全部',
					value: 0,
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
					value: '1,2,3,4,5,6,7,8,9,10',
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
				}],
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
					value: '4+',
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
		// 控制mask top
		popShow() {
			addClass(document.querySelector('.vux-popup-mask'),'popMask')
		},
		popHide() {
			removeClass(document.querySelector('.vux-popup-mask'),'popMask')
		},
		// 下拉列表选项
		showPopup(index) {
			if (this.selectOptions[index].active) {
				this.selectOptions[index].active = false
				this.searchData = {}
				return false
			}
			this.currentIndex = index
			this.selectOptions.map((item) => {
				item.active = false
			})
			this.selectOptions[index].active = true
		},
		// 选选项
		selectParams(list = [], index, type) {
			if (type === 'chamberCounts' || type === 'roomAttributeList' || type === 'decorationDegrees') {
				list[index].selected = !list[index].selected
				return false
			}
			list.map((item) => {
				item.selected = false
			})
			list[index].selected = true
		},
		// 搜索
    toSearch() {
			let param = this.searchData
      houseApi(param).then(res => {
				let resultData = res.result || []
				this.roomDataList = resultData
      }).catch(res => {})
    },
    handleAndriodMap() {
      console.log('andriod')
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .search {
    width: 300px;
    height: 100%;
    line-height: 30px;
    padding-left: 30px;
    border-radius: 5px;
    background-color: rgba(112, 161, 255, 1);
    position: relative;
    top: -5px;
    &:after{
      content: '\e60a';
      font-family: "iconfont";
      position: absolute;
      left: 10px;
    }
	}
	.active {
		color: #4680ff;
	}
	.active_chamberCounts {
		background: #4680ff;
		color: #fff;
		border-color: #4680ff;
	}
	.top-select {
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
</style>
