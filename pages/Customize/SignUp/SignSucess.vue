<template>
	<view class="page">
		<view class="pay-price">
			<view class="icon">
				<image src="../../../static/bmcg.png" mode=""></image>
			</view>

		</view>
		<view class="price-data" style="text-align: center;">
			<view class="list">
				<view class="content" style="font-size: 26rpx;line-height: 1.5;">
					您已报名成功，工作人员将在48h内完成审核，</br>
					审核结果将通过短信通知您！
				</view>
			</view>
		</view>
		<!-- 跳转按钮 -->
		<view class="skip-btn">
			<view class="btn" @click="onSkip">返回首页</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderAmount: '',
				orderNo: ''
			}
		},
		onShow(){
			uni.setNavigationBarTitle({
				title: this.$t('Customize.Sign Up')
			});
		},
		onLoad(option) {
			//this.CountDownData();
			//console.log(option.orderAmount); //打印出上个页面传递的参数。
			this.orderAmount = option.orderAmount;
			this.orderNo = option.orderNo;
		},
		methods: {
			/**
			跳转详情
			 */
			onSkip() {
				uni.switchTab({
					url: '/pages/Customize/Customize'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}

	.pay-price {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-top: 50rpx;
		background-color: #FFFFFF;

		.icon {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			margin-bottom: 20rpx;
			image {
				
				width: 280rpx;
				height: 200rpx;
			}
		}

		.price-data {
			height: 100rpx;
			margin-left: 50rpx;
			text-align: center;

			.list {
				display: flex;
				align-items: center;
				width: 100%;
				height: 50rpx;

				.title {
					font-size: 36rpx;
					color: #222222;
				}

				.content {
					font-size: 24rpx;
					color: $base;
				}
			}
		}
	}

	/* 跳转按钮 */
	.skip-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		margin-top: 100rpx;

		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 50%;
			height: 70%;
			font-size: 26rpx;
			color: #FFFFFF;
			background-color: $base;
			border-radius: 100rpx;
			margin: 0 20rpx;
		}
	}

	/* 为你推荐 */
	.recommend-info {
		width: 100%;
		background-color: #f2f2f2;

		.recommend-title {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100rpx;

			.title {
				display: flex;
				align-items: center;

				image {
					width: 416rpx;
					height: 40rpx;
				}
			}
		}

		.goods-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 30rpx;

			.list {
				width: 49%;
				height: 540rpx;
				margin-bottom: 20rpx;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				overflow: hidden;

				.pictrue {
					display: flex;
					justify-content: center;
					width: 100%;

					image {
						height: 350rpx;
					}
				}

				.title-tag {
					// display: flex;
					height: 100rpx;
					padding: 20rpx;

					.tag {
						float: left;
						margin-right: 10rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						white-space: normal;
						font-size: 26rpx;
						line-height: 40rpx;

						text {
							font-size: 24rpx;
							color: #FFFFFF;
							padding: 4rpx 16rpx;
							background: linear-gradient(to right, $base, $change-clor);
							border-radius: 6rpx;
							margin-right: 10rpx;
						}
					}
				}

				.price-info {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					justify-content: space-between;
					padding: 0 20rpx;
					height: 80rpx;

					.user-price {
						display: flex;
						align-items: center;

						text {
							color: $price-clor;
						}

						.min {
							font-size: 24rpx;
						}

						.max {
							font-size: 32rpx;
						}
					}

					.vip-price {
						display: flex;
						align-items: center;

						image {
							width: 26rpx;
							height: 26rpx;
							margin-right: 10rpx;
						}

						text {
							color: #2FDE81;
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
</style>