<template>
	<view>
		<view class="banner-title">
			<!-- banner -->
			<view class="banner">
				<swiper class="screen-swiper round-dot" indicator-dots="true" circular="true" autoplay="true"
					interval="5000" duration="500">
					<swiper-item v-for="(item, index) in swiperList" :key="index" @click="imgPreview(item.url)">
						<image :src="item.url" mode="aspectFill"></image>
						<!-- <video src="{{item.url}}" autoplay loop muted show-play-btn="{{false}}" controls="{{false
            }}" objectFit="cover" wx:if="{{item.type == 'video'}}"></video> -->
					</swiper-item>
				</swiper>
			</view>
			<!-- 价格 -->
			<view class="price-info" v-show="type==0">
				<view class="price">
					<text class="min">￥</text>
					<text class="max">{{memberPrice}}</text>
					<image src="../../static/vip.png" mode="" class="vipicon"></image>
					<text class="del">{{originalPrice}}</text>
				</view>
				<!-- <view class="info">
					<view class="list" >
						<text>599</text>
					</view>
					
				</view> -->
			</view>

			<!-- 标题 -->
			<view class="goods-title">
				<text>{{productName}}</text>
			</view>

		</view>
		<!-- 数量 -->
		<view class="goods-discounts">
			<!-- 数量 -->
			<view class="goods-discounts">
				<view class="list">
					<view class="title">数量</view>
					<view class="content">
						<view class="quty">
							<view class="jiajian-wrapper" @click="reduce">
								<text class="jiajian" style="font-size:25rpx;" :class="{ 'disabled': quantity <= 1 }">—</text>
							</view>
							<input type="number" v-model="quantity" @click="showQuantityModal" />
							<view class="jiajian-wrapper" @click="add">
								<text class="jiajian">+</text>
							</view>
						</view>
					</view>

				</view>
				<view class="list">
					<view class="title" style="width: 15%;color:#C0272C;">合计:</view>
					<view class="content" style="justify-content:flex-start;width: 85%;">
						<view class="serve">
							<text>¥</text><text class="amount">{{orderAmount}}</text>
						</view>
					</view>

				</view>

			</view>
			<!-- 底部  -->
			<view class="page-footer">
				<view class="footer-fn">
					<view class="list" @click="phonecall">
						<!-- <text class="iconfont icon-kefu"></text> -->
						<image src="/static/kfrx.png"></image>
						<text>客服</text>
					</view>
					<view class="list" @click="gomy">
						<!-- <text class="iconfont icon-home"></text> -->
						<image src="/static/my.png"></image>
						<text>我的</text>
					</view>
					<!-- <view class="list" @click="gohome">
						
						<text>主页</text>
					</view> -->
				</view>
				<view class="footer-buy">
					<view class="buy-at" @click="gopay">
						<text>提交订单</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 数量弹框 -->
		<view class="quantity-modal" v-if="isModalVisible">
			<view class="quantity-modal-content">
				<view class="quantity-modal-header">
					<text>修改商品数量</text>
				</view>
				<view class="quantity-modal-body">
					<view class="quantity-quty">
						<view class="quantity-jiajian-wrapper" @click="reduce">
							<text class="quantity-jiajian" :class="{ 'disabled': quantity <= 1 }" style="font-size: 24rpx;">—</text>
						</view>
						<input type="number" v-model="quantity" class="quantity-input" />
						<view class="quantity-jiajian-wrapper" @click="add">
							<text class="quantity-jiajian">+</text>
						</view>
					</view>
				</view>
				<view class="quantity-modal-footer">
					<button class="quantity-cancel-btn" @click="confirmQuantity">取消</button>
					<button class="quantity-confirm-btn" @click="confirmQuantity">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryCommodityByCode,home,
		createOrder,
		queryUserOpenid
	} from '@/api/api.js';
	export default {
		data() {
			return {
				backgroundColor: "#e2e2e2",
				fColor:'#C0272C',
				swiperList: [
					// {
					// 	id: 0,
					// 	type: 'image',
					// 	url: 'https://cdn.gj519.com/Bq6U9Q-%E4%B8%BB%E5%9B%BE-1.jpg'
					// },

				],
				quantity: 1,
				id: '', //商品id
				originalPrice: '',
				memberPrice: '',
				orderAmount: "",
				productName: '',
				mainImage: '',
				isModalVisible: false
			};
		},
		onShow() {


		},
		onLoad(option) {
			let that = this;
			
			// #ifdef MP
			console.log(option);
			//判断是否再次购买
			let qrcode ='';
			if(option.isBuy==1){
				let basicData = uni.getStorageSync('basicData');
				let data = JSON.parse(basicData);
				qrcode = data.commodityCode;
			}else{
				const scene = decodeURIComponent(option.scene);
				console.log("onLoad扫码scene参数=" + scene);
				// 判断当前环境是否为微信小程序
				//console.log('扫码进入携 带参数' + JSON.stringify(option));
				qrcode = (decodeURIComponent(option.scene)).replace(/^\?code=/, '');
				
			}
			console.log("qrcode=" + qrcode);
			wx.login({
				success(res) {
					if (res.code) {
						// 调用后端接口，使用code换取用户授权态（access_token）
						// 这里只是一个示例，实际情况需要根据自己的后端服务来编写

						// 发送请求到后端，获取access_token
						///api/user/weixin/queryUserOpenid
						let params = {
							code: res.code,
						}
						queryUserOpenid(params).then((res) => {
							// 存储数据 
							const basicData = JSON.stringify({
								userOpenid: res.userOpenid,
								//
								commodityCode: qrcode, //c9d9f8da-17cb-425d-8891-c81c22d091aa
								//commodityCode:'1122c536-b406-4adb-a27c-86e4bf6ce0a4',//f9024ba9-ad8b-4b26-b148-afdef5009846
							});
							uni.setStorageSync('basicData', basicData);
							that.getInfo()

						}).catch((err) => {
							uni.showToast({
								title: err.data.msg || 'queryUserOpenid接口异常,请稍后再试',
								icon: 'none'
							});
						});
						// ...
					} else {
						console.log('登录失败！' + res.errMsg);
						uni.showToast({
							title: '微信授权失败，请稍后重试',
							icon: 'none'
						})
					}
				}
			});
			// #endif

		},
		methods: {
			getInfo() {
				let that = this;
				//获取商品信息
				let basicData = uni.getStorageSync('basicData');
				let data = JSON.parse(basicData);
				queryCommodityByCode({
					userOpenid: data.userOpenid,
					commodityCode: data.commodityCode
				}).then((res) => {
					console.log(res);
					that.originalPrice = res.originalPrice;
					that.memberPrice = res.memberPrice;
					that.orderAmount = Number(res.memberPrice).toFixed(2);
					that.productName = res.productName;
					that.id = res.id;
					that.mainImage = res.mainImage.url;
					//轮播图
					that.swiperList = res.slideshowImages;
				}).catch((err) => {
					uni.showModal({
						title: '提示',
						content: err.data.msg || 'queryCommodityByCode接口异常,请稍后再试',
						showCancel: false
					});
					// uni.showToast({
					// 	title: err.data.msg||'queryCommodityByCode接口异常,请稍后再试',
					// 	icon:'none'
					// });

				});
			},
			//预览轮播图
			imgPreview(url) {
				uni.previewImage({
					indicator: "none",
					loop: false,
					urls: [url],
				})
			},
			//加
			add() {
				this.quantity = Number(this.quantity) + 1;
				this.orderAmount = (Number(this.quantity) * Number(this.memberPrice)).toFixed(2);
			},
			//减 
			reduce() {
				if (Number(this.quantity) <= 1) {
					uni.showToast({
						title: '数量不能小于1',
						icon: 'none'
					});
					return;
				}
				this.quantity = Number(this.quantity) - 1;
				this.orderAmount = (Number(this.quantity) * Number(this.memberPrice)).toFixed(2);
			},
			changeNumber: function(e) {
				// e.detail.value 是输入框当前的内容
				let val = e.detail.value;
				// 兼容微信异步更新input值 setTimeout 和this.$nextTick方法二选一

				this.orderAmount = (Number(this.quantity) * Number(this.memberPrice)).toFixed(2);
			},
			//拨打客服电话
			phonecall() {
				uni.makePhoneCall({
					phoneNumber: '400-8877519'
				});
			},
			//提交订单
			gopay() {
				if (this.quantity == '' || Number(this.quantity) == 0) {
					uni.showToast({
						title: '数量不能小于1',
						icon: 'none'
					})
					return
				}
				/*创建订单 createOrder
				  - `orderAmount` (String): 订单金额
				  - `userOpenid` (String): 用户openID
				  - `commodityList` (Array): 商品列表
				    - `ID` (String): 商品ID
				    - `quantity` (Int): 购买数量
				*/
				let that = this;
				//获取商品信息
				let basicData = uni.getStorageSync('basicData');
				let data = JSON.parse(basicData);
				createOrder({
					userOpenid: data.userOpenid,
					commodityList: [{
						id: that.id,
						quantity: that.quantity,
						mainImageUrl: that.mainImage
					}],
					id: that.id,
					orderAmount: that.orderAmount,
				}).then((res) => {
					console.log("+++++++++++++" + res);
					uni.navigateTo({
						url: '/pages/CashierDesk/CashierDesk?orderAmount=' + this.orderAmount +
							'&orderNo=' + res.orderNo
					})
				}).catch((err) => {
					uni.showToast({
						title: err.data.msg || 'createOrder接口异常,请稍后再试',
						icon: 'none'
					});

				});

			},
			//我的
			gomy() {
				uni.navigateTo({
					url: '/pages/my/my'
				})
			},
			//主页
			gohome() {
				uni.navigateTo({
					url: '/pages/home/home'
				})
			},
			showQuantityModal() {
				this.isModalVisible = true;
			},
			confirmQuantity() {
				this.isModalVisible = false;
				this.orderAmount = (this.quantity * this.memberPrice).toFixed(2);
			}
		}
	};
</script>

<style scoped lang="scss">
	@import 'GoodsDetails.scss';

	.quty {
		display: flex;
		align-items: center;
		height: 40rpx;

		.jiajian-wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60rpx;
			height: 60rpx;
			cursor: pointer;
			-webkit-tap-highlight-color: transparent;
		}

		.jiajian {
			font-size: 34rpx;
			display: inline-block;
			text-align: center;
			background-color: #fff;
			width: 45rpx;
			height: 45rpx;
			line-height: 45rpx;
			color: #000; /* Default black */
			border: none; /* Remove border */

			&.disabled {
				color: #ccc; /* Darker gray for disabled */
			}
		}

		input {
			width: 50rpx;
			text-align: center;
			background-color: #f0f0f0; /* Gray background */
			border: none; /* Remove border */
			border-radius: 5rpx; /* Optional: add some rounding */
		}
	}

	.quantity-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.quantity-modal-content {
		background-color: #fff;
		padding: 40rpx;
		border-radius: 20rpx;
		width: 85%;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
	}

	.quantity-modal-header {
		text-align: center;
		font-size: 34rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.quantity-modal-body {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 40rpx; /* 向下移动按钮 */
	}

	.quantity-quty {
		display: flex;
		align-items: center;
	}

	.quantity-jiajian-wrapper,
	.quantity-input {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60rpx;
		height: 60rpx;
		cursor: pointer;
		border-top: 1rpx solid #ccc;
		border-bottom: 1rpx solid #ccc;
		box-sizing: border-box; /* 确保大小计算正确 */
	}

	.quantity-jiajian-wrapper:first-child {
		// border-right: none; /* 去掉左边框 */
		border: 1px solid #ccc;
	}

	.quantity-jiajian-wrapper:last-child {
		// border-left: none; /* 去掉右边框 */
		border: 1px solid #ccc;
	}

	.quantity-jiajian {
		font-size: 24rpx; /* 确保字体大小适中 */
		color: #000;
	}

	.quantity-jiajian.disabled {
		color: #ccc;
	}

	.quantity-input {
		width: 160rpx; /* 加长为原来的两倍 */
		text-align: center;
		background-color: #fff; /* 设置为白色 */
		border-top: 1rpx solid #ccc;
		border-bottom: 1rpx solid #ccc;
	}

	.quantity-modal-footer {
		display: flex;
		justify-content: space-between;
	}

	button {
		width: 240rpx; /* 加长为原来的两倍 */
		height: 60rpx; /* 增加高度 */
		border: none;
		/* 去掉圆角 */
		cursor: pointer;
		font-size: 28rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.quantity-cancel-btn {
		background-color: #f0f0f0;
		color: #333;
	}

	.quantity-confirm-btn {
		background-color: #C0272C;
		color: #fff;
	}
</style>