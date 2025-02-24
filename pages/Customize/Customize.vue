<template>
	<view class="page">
		<!-- 项目介绍 -->
		<view class="introduce"  @click="goIntroduce()">
			<image src="../../static/dingzhi.png" mode=""></image>
		</view>
		<!-- 订单商品 -->
		<view class="order-goods sw">
			<view v-for="(item, index) in list" :key="index" class="goods-list" style="position: relative;overflow: hidden;"  @click="goPrdt(item.status,item.id)">
				<view class="list">
					<view class="badge"
					 v-if="item.status=='报名中'||item.status=='已售罄'||item.status=='已结束'" 
					 :style="{
						 backgroundColor:item.status == '报名' ? '#E23940' :
						 item.status == '报名中' ? '#1ABC9C' :
						 item.status == '预订' ? '#F59A23' :
						 item.status == '购买' ? '#1E98D7' :
						 item.status == '已售罄' ? '#8f939c' :'#ccc' }">
						{{item.status}}
					</view>
					<view class="title">
						<image src="../../static/wsj.png" mode=""></image>
					</view>
					<view class="item">
						<view class="price">
							<text class="goldenFont">{{ item.name }}</text>
							<text class="goldenFont">¥ <text>{{ item.price }}</text></text>
						</view>
						<view class="order-btn">
							<view class="total">
								<text>{{ item.capacity }}L</text>
								<!-- 
					 操作按钮：
					     a. 报名：未提交报名信息或报名信息审核中；报名信息提交后，按钮变为【报名中】，且不可点击；
					     b. 报名中：正在审核报名信息；
					     c. 预订：报名通过，按钮可点击；未到预定时间，提示“未到预定时间，请耐心等待”					 
					     d. 购买：到达开售时间；					 
					     e. 已售罄：库存为0					 
					     f. 已结束：项目时间结束					 
					 点击按钮进入对应的功能页，点击按钮外的其他位置，进入【产品介绍】页
					 -->
								<view class="btn" @click.stop="go(item)" v-if="item.status=='报名'||item.status=='预订'||item.status=='购买'">
									{{item.status}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 首次登录 报名弹框 -->
		<uni-popup ref="popup" class="popBox" background-color="#fff" @close="dialogClose">
			<view class="popup-content"  :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="title">购买报名</view>
				<image src="../../static/wsj.png" mode="" class="img"></image>
				<view class="content">立即报名，开启您的威士忌之旅</view>
				<view class="btn" @click="SignUp">立即报名</view>
			</view>
			<uni-icons class="popClose" type="close" size="40" @click="close" color="#fff" style="font-weight: 100;"></uni-icons>
		</uni-popup>
		 <!-- 自定义 tabbar -->
		  <Tabbar></Tabbar>
	</view>
</template>
<script>
	import Tabbar from "@/components/Tabbar/tabbar.vue"
	import {
		queryUserAddressList,
		factorydirect_order,
		queryOrderInfoByOrderNo,
		bindAddressForOrder,
		createUserAddress,
		updateUserAddress,
		updateOrderStatusForUser,
		updateUserInvoice,
		createUserInvoice,
		queryUserInvoiceList,
		openInvoice,
		queryUserInfo,queryUserOpenid
	} from '@/api/api.js';

	import cityPicker from '@/uni_modules/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker'
	export default {
		components: {
		   Tabbar
		 },
				
		data() {
			return {
				
				orderType: '', //订单状态：待付款、待发货、待收货、已完成、已取消
				list: [{
						name: "波本桶",
						capacity: "400",
						price: 50000.00,
						status: "报名",
						id:17
					},
					{
						name: "红酒桶",
						capacity: "300",
						price: 30000.00,
						status: "报名中",
						id:16
					},
					{
						name: "干邑桶",
						capacity: "200",
						price: 20000.00,
						status: "购买",
						id:15
					},
					{
						name: "波本桶",
						capacity: "900",
						price: 50000.00,
						status: "预订",
						id:14
					},
					{
						name: "红酒桶",
						capacity: "300",
						price: 30000.00,
						status: "已售罄",
						id:13
					},
					{
						name: "干邑桶",
						capacity: "200",
						price: 20000.00,
						status: "已结束",
						id:12
					}
				]


			};
		},
		components: {
			cityPicker
		},
		onShow() {
			let that=this;
			// wx.login({
			// 	success(res) {
			// 		if (res.code) {
			// 			// 调用后端接口，使用code换取用户授权态（access_token）
			// 			// 这里只是一个示例，实际情况需要根据自己的后端服务来编写
			
			// 			// 发送请求到后端，获取access_token
			// 			///api/user/weixin/queryUserOpenid
			// 			let params = {
			// 				code: res.code,
			// 			}
			// 			queryUserOpenid(params).then((res) => {
			// 				// 存储数据 
			// 				const basicData = JSON.stringify({
			// 					userOpenid: res.userOpenid,
			// 					//
			// 					//commodityCode: 'f9024ba9-ad8b-4b26-b148-afdef5009846', //272cb24d-2438-416c-999e-61b4169b45e5
			// 					//commodityCode:'1122c536-b406-4adb-a27c-86e4bf6ce0a4',//f9024ba9-ad8b-4b26-b148-afdef5009846
			// 				});
			// 				uni.setStorageSync('basicData', basicData);
			// 				//that.queryUserInfo()
			
			// 			}).catch((err) => {
			// 				uni.showToast({
			// 					title: err.data.msg || 'queryUserOpenid接口异常,请稍后再试',
			// 					icon: 'none'
			// 				});
			// 			});
			// 			// ...
			// 		} else {
			// 			console.log('登录失败！' + res.errMsg);
			// 			uni.showToast({
			// 				title: '微信授权失败，请稍后重试',
			// 				icon: 'none'
			// 			})
			// 		}
			// 	}
			// });
		},
		onLoad(option) {
			console.log(option); //打印出上个页面传递的参数。
			this.orderType = option.orderType;
			this.orderNo = option.orderNo;
			this.from = option.from;
			this.abInfo = option.abInfo;
			this.fpInfo = option.fpInfo;
			this.onlylook = option.onlylook;
			this.queryOrderInfoByOrderNo()
			//this.toggle('center');
		},
		methods: {
			
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			dialogClose() {
				console.log('点击关闭')
			},
			close() {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
				// ...
				this.$refs.popup.close()
			},
			queryOrderInfoByOrderNo() {
				let that = this;
				queryOrderInfoByOrderNo({
					orderNo: '202502130098',
				}).then((res) => {
					that.detls = res;
					this.orderType = res.status;
					//根据不同状态 ，控制地址以及发票的弹出框
					if (res.isAddress == '否' && res.status == '待发货' && that.onlylook == 0) {
						that.open();
						//判断 是否从地址页面返回，是--取值来自于地址页面；否--取值来自地址簿接口第一条数据
						that.getAdss(that.from, that.abInfo);
					}
					if ((res.status == '待收货' || res.status == '已完成') && res.isInvoice == '否' && that.onlylook ==
						0) {
						that.fpopen();
						//判断 是否从发票列表页面返回，是--取值来自于发票列表页面；否--取值来自发票列表接口第一条数据
						that.getFp(that.from, that.fpInfo);
					}

				}).catch((err) => {
					uni.showToast({
						title: err.data.msg || 'queryOrderInfoByOrderNo接口异常,请稍后再试',
						icon: 'none'
					});
				});
			},
			//项目详情
			goIntroduce(id) {
				uni.navigateTo({
					url: '/pages/Customize/ProjectDetails'//ProductIntroduce
				})
			},
			goPrdt(status,id) {
				uni.navigateTo({
					url: '/pages/Customize/ProductIntroduce?status='+status+'&id='+id//ProductIntroduce
				})
			},
			//操作
			go(t) {
				let that = this;
				if(t.status=='报名'){
					that.SignUp()
				}else if(t.status=='预订'){
					uni.navigateTo({
						url: '/pages/Customize/Book/Book'
					})
				}else if(t.status=='购买'){
					uni.navigateTo({
						url:'/pages/CashierDesk/CashierDesk?orderAmount='+t.price
					})
				}
			},
			SignUp(){
				uni.navigateTo({
					url: '/pages/Customize/SignUp/SignUp'
				})
			}

		}
	}
</script>

<style scoped lang="scss">
	.page {
		// position: absolute;
		// left: 0;
		// top: 0;
		width: 100%;
		// height: 100%;
		background-color: $baseBackgroundColor;
		padding-bottom: 100rpx;
	}
	.popBox{
		text-align: center;
		position: relative;
		.popup-content{
			background-color: #fff;width: 600rpx;
			text-align: center;
			font-size: 30rpx;
			color: #000;
			border-radius: 10rpx;
			.title{
				font-weight: bold;
				padding: 30rpx 0 50rpx 0;
			}
			.img{
				height: 250rpx;
				width: 500rpx;
			}
			.content{
				font-weight: 400;
				padding: 30rpx 0 50rpx 0;
			}
			.btn{
				width: 200rpx;
				font-size: 24rpx;
				background-color: $base;
				color: #fff;
				text-align: center;
				display: inline-block;
				padding: 10rpx;
				border-radius: 5rpx;
				margin-bottom: 40rpx;
			}
		}
		.popClose{
			position: relative;
			top: 20rpx;
		}
	}
	.introduce {
		width: 100%;
		background-color: rgba(14, 37, 45, 1);
		 --background: 0 0% 100%;
		height: 300rpx;
		color: #fff;
		text-align: center;
		line-height: 300rpx;
		image {
			width: 100%;
			background-color: $base;
			height: 300rpx;
			
		}
	}

	.ttb {
		color: #fff;
		background-color: $base;
		width: 120rpx;
		padding: 8rpx 10rpx;
		border-radius: 15rpx;
		font-size: 24rpx;
		text-align: center;
	}

	/* 订单状态 */
	.order-status {
		width: 100%;
		// height: 150rpx;
		padding: 20rpx 0;
		background: linear-gradient(to right, $base, $change-clor);

		.status {
			display: flex;
			align-items: center;
			// justify-content: center;
			width: 100%;
			padding: 0 6%;

			// height: 100rpx;
			text {
				font-size: 38rpx;
				// font-weight: bold;
				color: #FFFFFF;
			}

			.desc {
				display: flex;
				justify-items: center;
				margin-left: 30rpx;
			}

			.iconfont {
				margin-right: 20rpx;
			}

			.oths {
				font-size: 24rpx;
				display: block;
			}
		}

		.reason {
			display: flex;
			// align-items: center;
			justify-content: center;
			width: 100%;
			height: 80rpx;

			text {
				font-size: 28rpx;
				color: $baseBackgroundColor;
			}
		}
	}


	/* 订单商品 */
	.order-goods {
		width: 100%;
	
		.goods-list {
			// background-color: #FFFFFF;
			margin-bottom: 15rpx;
			border-radius: 15rpx;
			// border: .5rpx solid $baseFontColor;
			// padding: 4%;
			.badge {
			  width: 180rpx; /* 宽度 */
			  height: 50rpx; /* 高度 */
			  background-color: #28a745; /* 背景颜色 */
			  color: #ffffff; /* 字体颜色 */
			  font-size: 24rpx; /* 字体大小 */
			  display: flex; /* 使用flex布局 */
			  justify-content: center; /* 水平居中 */
			  align-items: center; /* 垂直居中 */
			  transform: rotate(45deg); /* 旋转45度 */
			  position: absolute; /* 相对定位 */
			  right: -45rpx; /* 向左偏移 */
			  top: 22rpx; /* 向上偏移 */
			  z-index: 9999;
			}
			.list {
				// display: flex;
				// align-items: center;

				width: 100%;

				.title {
					// padding-bottom: 20rpx;
					display: flex;
					align-items: center;
					background-color: #ccc;
					height: 250rpx;
					width: 100%;
					text {
						font-size: 30rpx;
						font-weight: bold;
						color: #000;
					}
					image{
						height: 250rpx;
						width: 100%;
					}
				}

				.thumb {
					// display: flex;
					width: 100%;
					height: 200rpx;

					// margin-top: -20rpx;
					image {
						width: 100%;
						height: 260rpx;
						border-radius: 10rpx;
					}
				}

				.item {
					width: 100%;
					height: 100%;
					padding: 4%;
					background-color: $baseCardColor;
					overflow: hidden;
					.price {
						display: flex;
						align-items: center;
						width: 100%;
						height: 60rpx;
						justify-content: space-between;

						>text {
							font-size: 30rpx;
							font-weight: bold;
							// color: $baseFontColor1;
						}

						.num {
							font-size: 25rpx;
							color: #fff;
							font-weight: unset;
						}
					}

					.desc {
						display: flex;
						align-items: center;
						width: 100%;
						height: 60rpx;
						justify-content: space-between;
						font-size: 28rpx;

						.tit {
							color: #959595;
						}
					}

					.tk {
						font-size: 26rpx;
						text-align: right;
						width: 100%;
						color: $base;
					}

					.order-btn {
						width: 100%;
						padding: 10rpx 0;
						position: relative;

						.total {
							display: flex;
							align-items: center;
							justify-content: space-between;
							// font-weight: bold;
							font-size: 26rpx;
							color: #fff;
							// float: right;
							.btn {
								padding: 10rpx 0;
								width: 140rpx;
								text-align: center;
								color: #ffffff;
								font-size: 26rpx;
								// border: 2rpx solid $base;
								background-color: $base;
								border-radius: 100rpx;
							}
						}
					}

					// .order-btn::after{
					// 	content: "";
					// 	position: absolute;
					// 	bottom: 0;
					// 	left: 0;
					// 	width: 100%;
					// 	display: inline-block;
					// 	height: 1rpx;
					// 	background-color: #EEEEEE;
					// 	// border: .1rpx solid #e2e2e2;
					// }
				}
			}
		}

		.contact {
			display: flex;
			align-items: center;
			justify-content: center;
			display: flex;
			align-items: center;
			width: 100%;
			height: 100rpx;
			background-color: #FFFFFF;
			box-shadow: 0 0 20rpx #EEEEEE;
			border-radius: 0 0 20rpx 20rpx;

			text {
				font-size: 28rpx;
				color: #555555;
			}

			.iconfont {
				font-size: 34rpx;
				margin-right: 20rpx;
			}
		}
	}

	/* 订单信息 */
	.order-info {
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 20rpx auto;

		// padding-bottom: 120rpx;
		.info-list {
			padding: 0 4%;

			.title {
				padding: 20rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;

				text {
					font-size: 30rpx;
					font-weight: bold;
					color: #000;
				}

				.record {
					display: flex;
					align-items: center;
					font-size: 26rpx;
				}
			}

			.list {
				display: flex;
				align-items: center;
				width: 100%;
				height: 100rpx;
				border-bottom: 2rpx solid $baseBackgroundColor;
				justify-content: space-between;

				.title {
					font-size: 26rpx;
					color: #959595;
					// color: #222222;
				}

				.content {
					display: flex;
					align-items: center;
					margin-left: 20rpx;

					text {
						font-size: 26rpx;
						// font-weight: bold;
						color: #222222;
					}

					.btn {
						padding: 6rpx 20rpx;
						background-color: #EEEEEE;
						color: #555555;
						font-size: 24rpx;
						border-radius: 50rpx;
						margin-left: 40rpx;
					}
				}
			}

			.payList {
				display: flex;
				align-items: center;
				width: 100%;
				height: 100rpx;
				border-bottom: 2rpx solid $baseBackgroundColor;
				justify-content: space-between;

				.title {
					font-size: 26rpx;
					color: #959595;
					display: flex;
					align-items: center;
				}

				.content {
					display: flex;
					align-items: center;
					margin-left: 20rpx;

					text {
						font-size: 26rpx;
						font-weight: bold;
						color: #222222;
					}

					.btn {
						padding: 6rpx 20rpx;
						background-color: #EEEEEE;
						color: #555555;
						font-size: 24rpx;
						border-radius: 50rpx;
						margin-left: 40rpx;
					}
				}
			}
		}
	}

	.option-group {
		display: flex;
		// justify-content: space-between;
		width: 100%;
		outline: none;
	}

	.option {
		background-color: #ccc;
		outline: none;
		cursor: pointer;
		font-size: 26rpx;
		padding: 4px 18px;
		border-radius: 30rpx;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);

		// border: 1px solid $base;
	}

	.option:focus {
		outline: none;
	}

	.option:last-child {
		margin-left: 50rpx;
	}

	.selected {
		border-color: $base;
		background-color: $base;
		color: white;
		outline: none;
	}

	/* 订单明细 */
	.order-details {
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 20rpx auto;
		padding-bottom: 100rpx;

		.details-list {
			padding: 0 4%;

			.list {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 100rpx;
				border-bottom: 2rpx solid $baseBackgroundColor;

				.title {
					font-size: 26rpx;
					color: #959595;
				}

				.price {
					font-size: 26rpx;
					font-weight: bold;
				}
			}

			.action {
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.price {
					font-size: 32rpx;
					font-weight: bold;
					color: $base;
				}
			}
		}
	}

	.footer-btn {
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		border-top: 2rpx solid #EEEEEE;
		padding: 0 4%;

		.del {
			display: flex;
			align-items: center;

			text {
				padding: 10rpx 30rpx;
				font-size: 24rpx;
				font-weight: bold;
			}
		}

		.btn {
			display: flex;
			align-items: center;

			text {
				padding: 15rpx 35rpx;
				font-size: 24rpx;
				border: 2rpx solid #C0C0C0;
				border-radius: 100rpx;
				color: #555555;
				margin-left: 20rpx;
			}

			.action {
				background-color: $base;
				color: #FFFFFF;
				border: 2rpx solid #FFFFFF;
			}
		}
	}

	// 弹出地址簿
	.popupBox {
		//height: 720rpx;
		width: 100%;
		background-color: #fff;
		font-size: 28rpx;

		.title {
			text-align: center;

			.name {
				display: inline-block;
				margin-top: 20rpx;
				font-size: 32rpx;
			}

			.close {
				font-size: 50rpx;
				width: 50rpx;
				text-align: center;

				float: right;
			}
		}

		.save {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60%;
			height: 70rpx;
			margin-left: 20%;
			background-color: $base;
			color: #FFFFFF;
			border-radius: 100rpx;
			font-size: 26rpx;
			margin-top: 25rpx;
			position: relative;
			top: 15rpx;
		}

		.address-input {
			width: 100%;
			background-color: #FFFFFF;

			.toptitle {
				font-weight: bold;
				text-align: left;
				display: flex;
				align-items: center;
				padding: 0 4%;
			}

			.list-input {
				display: flex;
				align-items: center;
				padding: 0 4%;
				height: 100rpx;
				border-bottom: 2rpx solid $baseBackgroundColor;

				.title {
					display: flex;
					align-items: center;
					width: 20%;
					height: 100%;

					text {
						color: #222222;
						font-size: 26rpx;
					}
				}

				.content {
					display: flex;
					align-items: center;
					width: 80%;
					height: 100%;

					input {
						width: 100%;
						height: 100%;
						font-size: 26rpx;
						color: #222222;
					}
				}
			}

			.list-textarea {
				display: flex;
				align-items: center;
				padding: 0 4%;
				height: 200rpx;
				border-bottom: 2rpx solid $baseBackgroundColor;

				.title {
					display: flex;
					width: 20%;
					height: 80%;

					text {
						color: #222222;
						font-size: 26rpx;
					}
				}

				.content {
					display: flex;
					align-items: center;
					width: 70%;
					height: 100%;

					textarea {
						width: 100%;
						height: 80%;
						font-size: 26rpx;
						color: #222222;
					}
				}
			}

			.box {
				display: flex;
				width: 100%;
				padding: 0 4%;
				align-items: center;

				.left {
					line-height: 1.5;
					width: 70%;

					.area {
						color: #959595;
						font-size: 24rpx;
					}
				}

				.right {
					width: 30%;
					text-align: center;
					font-weight: bold;
					position: relative;
				}

				.right:before {
					content: "";
					height: 50rpx;
					display: inline-block;
					width: 1px;
					background-color: #222222;
					position: absolute;
					top: -4rpx;
					left: 30rpx;
				}
			}
		}
	}

	.sw {
		width: 94%;
		margin: 20rpx 3%;
	}

	/*  */
</style>