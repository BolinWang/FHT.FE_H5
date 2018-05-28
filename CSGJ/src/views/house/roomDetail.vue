<template>
  <div style="height:100%">
		<x-header class="room-header" :left-options="{backText: ''}">
			<div slot="right" class="room-header-share">
				<i class="iconfont icon-share1"></i>
			</div>
		</x-header>
		<swiper :aspect-ratio="270/360" class="room-banner" :show-dots="false" @on-index-change="changeIndex" :loop="true" :auto="true">
			<swiper-item class="swiper-demo-img" v-for="(item, index) in demo01_list" :key="index">
				<img :src="item.src" @click="openPhotoSwipe(index)">
			</swiper-item>
			<div class="swiper-title">
				<span>{{demo01_list[curBannerIndex].title}}</span>
				<span>{{curBannerIndex + 1}}/{{demo01_list.length}}</span>
			</div>
		</swiper>
		<div class="room-info">
			<div class="room-info-row">
				<div class="row-icon">
					<i class="iconfont icon-fangyuan"></i>
				</div>
				<div class="row-container">
					<div>天天小区-19-1单元-4楼-401号房间A</div>
					<div>
						<XButton plain class="empty-btn success" v-if="roomInfo.status == 0">已出租</XButton>
						<XButton plain class="empty-btn loading" v-else-if="roomInfo.status == 1">下单中</XButton>
						<XButton plain class="empty-btn loading" v-else-if="roomInfo.status == 2">在住</XButton>
						<XButton plain class="empty-btn hold" v-else-if="roomInfo.status == 3">保留中</XButton>
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
						<p>地址：杭海路663-6号</p>
						<p>房间编号：200012345</p>
					</div>
				</div>
			</div>
			<div class="room-info-row">
				<div class="row-icon">
					<i class="iconfont icon-yonghu"></i>
				</div>
				<div class="row-container">
					<div>房东：张三</div>
					<div class="tel">
						电话号码：138****1234
						<i class="iconfont icon-dianhua"></i>
					</div>
				</div>
			</div>
			<div class="room-info-row">
				<div class="row-icon">
					<i class="iconfont icon-share"></i>
				</div>
				<div class="row-container" v-if="roomInfo.releaseStatus == 0">
					<div>房源推广发布<XButton plain class="status-btn">未发布</XButton></div>
					<div class="apply-btn" @click="handleRelease">申请发布</div>
				</div>
				<div class="row-container" v-else-if="roomInfo.releaseStatus == 1">
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
		<!-- Root element of PhotoSwipe. Must have class pswp. -->
		<div ref="pswp" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

			<!-- Background of PhotoSwipe.
					It's a separate element as animating opacity is faster than rgba(). -->
			<div class="pswp__bg"></div>

			<!-- Slides wrapper with overflow:hidden. -->
			<div class="pswp__scroll-wrap">

				<!-- Container that holds slides.
						PhotoSwipe keeps only 3 of them in the DOM to save memory.
						Don't modify these 3 pswp__item elements, data is added later on. -->
				<div class="pswp__container">
						<div class="pswp__item"></div>
						<div class="pswp__item"></div>
						<div class="pswp__item"></div>
				</div>

				<!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
				<div class="pswp__ui pswp__ui--hidden">

					<div class="pswp__top-bar">

						<!--  Controls are self-explanatory. Order can be changed. -->

						<div class="pswp__counter"></div>

						<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

						<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

						<!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
						<!-- element will get class pswp__preloader--active when preloader is running -->
						<div class="pswp__preloader">
							<div class="pswp__preloader__icn">
								<div class="pswp__preloader__cut">
									<div class="pswp__preloader__donut"></div>
								</div>
							</div>
						</div>
					</div>

					<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
						<div class="pswp__share-tooltip"></div>
					</div>

					<div class="pswp__caption">
						<div class="pswp__caption__center"></div>
					</div>

				</div>

			</div>

		</div>
  </div>
</template>

<script>
import { XButton, Popup, Swiper, SwiperItem } from 'vux'
import PhotoSwipe from 'photoswipe/dist/photoswipe.js'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.js'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
export default {
  components: {
		XButton,
		Popup,
		Swiper,
		SwiperItem
  },
  mounted() {

  },
  data() {
    return {
			showPayRentWay: false,
			demo01_list: [
				{
					url: 'javascript:',
					src: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
					title: '送你一朵fua',
					w: 600,
					h: 400
				}, {
					url: 'javascript:',
					src: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
					title: '送你一辆车',
					w: 600,
					h: 400
				}, {
					url: 'javascript:',
					src: 'https://static.vux.li/demo/5.jpg', // 404
					title: '送你一次旅行',
					fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg',
					w: 600,
					h: 400
				}
			],
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
			curBannerIndex: 0
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
		},
		openPhotoSwipe(i) {
			let options = {
        index: i,
        loop: false
      };
			new PhotoSwipe( this.$refs.pswp, PhotoSwipeUI_Default, this.demo01_list, options).init();
		}
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
</style>
