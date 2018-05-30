<template>
  <div style="height: 100%">
		<view-box ref="viewBox" v-if="bannerList.length">
			<x-header class="room-header" :left-options="{backText: ''}">
				<div slot="right" class="room-header-share">
					<i class="iconfont icon-share1"></i>
				</div>
			</x-header>
			<swiper :aspect-ratio="270/360" class="room-banner" :show-dots="false" @on-index-change="changeIndex" :loop="true" :auto="true">
				<swiper-item class="swiper-demo-img" v-for="(item, index) in bannerList" :key="index">
					<img :src="item.src" @click="photoViewOptions.index = index; $refs.pswp.openPhotoView()">
				</swiper-item>
				<div class="swiper-title">
					<span>{{bannerList[curBannerIndex].title}}</span>
					<span>{{curBannerIndex + 1}}/{{bannerList.length}}</span>
				</div>
			</swiper>
			<div class="room-info">
				<div class="room-info-row">
					<div class="row-icon">
						<i class="iconfont icon-fangyuan"></i>
					</div>
					<div class="row-container">
						<div>{{roomName}}</div>
						<div>
							<XButton plain class="empty-btn success" v-if="roomStatus == 0">已出租</XButton>
							<XButton plain class="empty-btn loading" v-else-if="roomStatus == 1">下单中</XButton>
							<XButton plain class="empty-btn loading" v-else-if="roomStatus == 2">在住</XButton>
							<XButton plain class="empty-btn hold" v-else-if="roomStatus == 3">保留中</XButton>
							<XButton plain class="empty-btn" v-else>空房</XButton>
						</div>
					</div>
				</div>
				<div class="room-info-row">
					<div class="row-icon">
						<i class="iconfont icon-fenlei"></i>
					</div>
					<div class="row-container">
						<div>
							<p>地址：{{roomAddr}}</p>
							<p>房间编号：{{roomCode}}</p>
						</div>
					</div>
				</div>
				<div class="room-info-row">
					<div class="row-icon">
						<i class="iconfont icon-yonghu"></i>
					</div>
					<div class="row-container">
						<div>房东：{{orgName}}</div>
						<div class="tel">
							电话号码：{{orgMobile | mobileFormat}}
							<i class="iconfont icon-dianhua"></i>
						</div>
					</div>
				</div>
				<div class="room-info-row">
					<div class="row-icon">
						<i class="iconfont icon-share"></i>
					</div>
					<div class="row-container" v-if="pushStatus == 0">
						<div>房源推广发布<XButton plain class="status-btn">未发布</XButton></div>
						<div class="apply-btn" @click="handleRelease">申请发布</div>
					</div>
					<div class="row-container" v-else-if="pushStatus == 1">
						<div>房源推广发布<XButton plain class="status-btn loading">申请中</XButton></div>
						<div class="apply-btn" @click="handleRelease">撤销发布</div>
					</div>
					<div class="row-container" v-else>
						<div>房源推广发布<XButton plain class="status-btn success">已发布</XButton></div>
					</div>
				</div>
			</div>
			<div class="room-options">
				<div class="room-options-item">编辑</div>
				<div class="room-options-item" @click="showPayRentWay = true">交租方式</div>
			</div>
			<div class="room-options">
				<div class="room-options-item">房间照片</div>
				<div class="room-options-item">公区照片</div>
			</div>
			<div class="room-footer">
				<template v-if="roomInfo.status == 4">
					<div class="footer-item">保留房间</div>
					<div class="footer-item active">设置已出租</div>
				</template>
				<div class="footer-item active" v-else-if="roomInfo.status == 0">设为空房</div>
				<div class="footer-item active" v-else-if="roomInfo.status == 3">取消保留中</div>
			</div>
			<Popup v-model="showPayRentWay" position="right" width="100%" class="payRentWay-modal">
				<x-header :left-options="{backText: '', preventGoBack: true}" @on-click-back="showPayRentWay = false">
					交租方式
				</x-header>
				<div v-if="roomInfo.type == '分散式'">
					<div class="joint-item" v-for="item in roomInfoList" :key="item.id">
						<div class="joint-item-title">
							请设置<span>{{item.name}}</span>{{item.direction}}，{{item.size}}
							<div class="tag" v-for="(o, i) in item.equipment" :key="i">{{o}}</div>
						</div>
						<div class="joint-item-value">
							<div class="payRentWay-item">
								<div class="payRentWay-item-title">月租金</div>
								<div class="payRentWay-item-value">
									<input type="number" placeholder="请输入" v-model="item.monthRent">
								</div>
							</div>
							<div class="payRentWay-item">
								<div class="payRentWay-item-title">押金</div>
								<div class="payRentWay-item-value">
									<input type="number" placeholder="请输入" v-model="item.deposit">
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-else>
					<div class="payRentWay-item">
						<div class="payRentWay-item-title">月租金</div>
						<div class="payRentWay-item-value">
							<input type="number" placeholder="请输入">
						</div>
					</div>
					<div class="payRentWay-item">
						<div class="payRentWay-item-title">押金</div>
						<div class="payRentWay-item-value">
							<input type="number" placeholder="请输入">
						</div>
					</div>
				</div>
				<div class="payRentWay-footer fixedBottm" @click="savePayRentWay">
					保存
				</div>
			</Popup>
			<PhotoView ref="pswp" :photoList="bannerList" :options="photoViewOptions">
			</PhotoView>
		</view-box>
  </div>
</template>

<script>
import { XButton, Popup, Swiper, SwiperItem } from 'vux'
import PhotoView from '@/components/photoView'
import { getRoomDetailApi } from '@/api/source'
export default {
  components: {
		XButton,
		Popup,
		Swiper,
		SwiperItem,
		PhotoView
  },
  mounted() {
		// this.$refs.pswp.openPhotoView()
  },
  data() {
    return {
			showPayRentWay: false,
			bannerList: [],
			roomInfo: {
				releaseStatus: 0,	// 0.未发布 1.申请中 2.已发布
				type: '集中式',
				status: 4, // 0.已出租 1.下单中 2.在住 3.保留中 4.空房
			},
			roomInfoList: [
				{
					name: '房间A',
					direction: '朝南',
					size: '30㎡',
					equipment: ['独卫', '厨房', '阳台'],
					monthRent: '',
					deposit: ''
				},
				{
					name: '房间B',
					direction: '朝南',
					size: '30㎡',
					equipment: ['独卫', '厨房', '阳台'],
					monthRent: '',
					deposit: ''
				},
				{
					name: '房间C',
					direction: '朝南',
					size: '30㎡',
					equipment: ['独卫', '厨房', '阳台'],
					monthRent: '',
					deposit: ''
				}
			],
			curBannerIndex: 0,
			photoViewOptions: {
				index: 0,
				history: false,
				loop: false,
				captionEl: false,
				tapToToggleControls: false
			},
			orgName: '',
			orgMobile: '',
			roomName: '',
			roomCode: '',
			roomAddr: '',
			roomStatus: 0,
			pushStatus: 0
    }
  },
  methods: {
		savePayRentWay() {
			this.roomInfoList.forEach(element => {
				element.monthRent = '',
				element.deposit = ''
			});
			this.showPayRentWay = false;
		},
		changeIndex(n) {
			this.curBannerIndex = n;
		},
		handleRelease() {
			console.log(this.roomInfo.releaseStatus);
		}
	},
	filters: {
		mobileFormat(mobile) {
			return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		}
	},
	created() {
		getRoomDetailApi({
			roomCode: '1234567890'
		}).then((res) => {
			let roomInfo = res.data;
			this.orgName = roomInfo.orgName;
			this.orgMobile = roomInfo.orgMobile;
			this.roomName = roomInfo.roomName;
			this.roomCode = roomInfo.roomCode;
			this.roomAddr = roomInfo.roomAddr;
			this.roomStatus = roomInfo.roomStatus;
			this.pushStatus = roomInfo.pushStatus;
			let picList = [].concat(roomInfo.roomPictures, roomInfo.housePictures);
			picList.forEach((v, i) => {
				this.bannerList.push({
					src: v.url,
					title: v.tags,
					w: 600,
					h: 400
				})
			})
		}).catch(err => {console.log(err)})
	}
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
	.room-header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: transparent;
		z-index: 500;
		.iconfont {
			font-size: 24px;
			line-height: 1;
		}
	}
	.room-banner {
		width: 360px;
		height: 270px;
		img {
			width: 100%;
			height: 100%;
		}
		.swiper-title {
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 100;
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 30px;
			padding: 0 10px;
			line-height: 30px;
			background-color: rgba(16, 16, 16, 0.5);
			color: #fff;
			font-size: 14px;
		}
	}
	.room-info {
		background-color: #fff;
		margin-bottom: 6px;
	}
	.room-info-row {
		position: relative;
		padding-left: 44px;
		&:last-child {
			.row-container {
				border-bottom: 0;
			}
		}
		.row-icon {
			position: absolute;
			top: 12px;
			left: 12px;
			width: 20px;
			height: 20px;
			i {
				font-size: 20px;
				line-height: 1;
				color: #4681FF;
			}
		}
		.row-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 48px;
			border-bottom: 1px solid #bbb;
			padding-right: 12px;
			color: #333;
			.empty-btn {
				width: 50px;
				height: 22px;
				line-height: 22px;
				border-radius: 11px;
				border-color: #bbb;
				color: #999;
				font-size: 11px;
				padding: 0;
				&.success {
					color: #259b24;
					border-color: #259b24;
				}
				&.loading {
					color: #4680ff;
					border-color: #4680ff;
				}
				&.hold {
					color: #ff9800;
					border-color: #ff9800;
				}
			}
			.tel {
				i {
					vertical-align: middle;
					margin-left: 5px;
					font-size: 20px;
					color: #ff9800;
				}
			}
			.status-btn {
				display: inline-block;
				margin-left: 15px;
				color: #ddd;
				border-color: #ddd;
				border-radius: 4px;
				font-size: 12px;
				width: 60px;
				height: 22px;
				line-height: 22px;
				padding: 0;
				&.loading {
					color: #e51c23;
					border-color: #e51c23;
				}
				&.success {
					color: #ff9800;
					border-color: #ff9800;
				}
			}
			.apply-btn {
				color: #4681ff;
			}
		}
	}
	.room-options {
		display: flex;
		.room-options-item {
			flex: 1;
			height: 50px;
			line-height: 50px;
			text-align: center;
			background-color: #fff;
			color: #4680ff;
			font-size: 14px;
			margin-bottom: 1px;
			&:first-child {
				border-right: 1px solid #F2F2F2;
			}
		}
	}
	.room-footer {
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
	.payRentWay-modal {
		.payRentWay-item {
			display: flex;
			padding: 10px 12px;
			font-size: 14px;
			line-height: 24px;
			background-color: #fff;
			margin-bottom: 1px;
			z-index: 501;
			.payRentWay-item-title {
				width: 4em;
			}
			.payRentWay-item-value {
				flex: 1;
				input {
					width: 100%;
					height: 100%;
					border: 0;
					font-size: 14px;
					color: #4680ff;
					vertical-align: top;
				}
			}
		}
		.joint-item {
			margin-bottom: 6px;
			background-color: #fff;
			.joint-item-title {
				border-bottom: 1px solid #eee;
				padding: 6px 10px;
				line-height: 20px;
				span {
					display: inline-block;
					vertical-align: top;
					color: #e51c23;
					margin: 0 5px;
				}
				.tag {
					display: inline-block;
					vertical-align: top;
					width: 40px;
					height: 20px;
					line-height: 20px;
					border: 1px solid #999;
					border-radius: 4px;
					margin-left: 5px;
					color: #999;
					text-align: center;
				}
			}
			.joint-item-value {
				display: flex;
				.payRentWay-item {
					position: relative;
					flex: 1;
					margin-bottom: 0;
					&:first-child {
						&::after {
							content: "";
							position: absolute;
							top: 10px;
							right: 0;
							width: 0;
							height: 24px;
							border-right: 1px solid #eee;
						}
					}
				}
			}
		}
		.payRentWay-footer {
			height: 36px;
			line-height: 36px;
			font-size: 16px;
			text-align: center;
			color: #fff;
			background-color: #4680ff;
		}
	}
	.heihei {
		background: #ff0000;
	}
</style>
