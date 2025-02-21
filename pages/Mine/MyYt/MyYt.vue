<template>
	<view class="page">
		
		<z-paging ref="paging" v-model="dataList" @query="queryList" >
			<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
			<!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs -->
		
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			
			<!-- 订单列表 -->
			<view class="order-list" style="">
				<view class="list" v-for="(item,index) in dataList" :key="index" @click="goDetls(item.orderNo,item.status,1)">
					<view class="title-status" >
						<view class="title">
							<text>波本桶 200L</text>
						</view>
						<view class="status">
							<text>
								NO.123456577
							</text>
						</view>
					</view>
					<view class="goods-content">
						<view class="thumb">
							<image src="../../../static/wsj.png" mode=""></image>
						</view>
					</view>
					<view class="goods-list"   >
						<view class="goods">
							
							<view class="item">
								<view class="goods-name">
									<text class="two-omit">原桶存储中</text>
								</view>
								<view class="goods-des">
									<text>购买后预计6个月后可提货</text>
								</view>
								<view class="goods-price">
									<text class="max">度数：38°</text>
									<text class="min">风味：威士忌</text>

								</view>
								<view class="total">
									<text class="">数据更新日期：2025-01-01 12:00:00</text>
								</view>
							</view>
						</view>
					</view>
					<view class="status-btn" >
						<!-- 
						
						 -->
						<view class="btn"  @click="goDetls()">
							<text>查看订单</text>
						</view>
						<view class="btn"  @click.stop="goNdbg()">
							<text>年度报告</text>
						</view>
						<view class="btn action"  @click.stop="goZp()">
							<text>装瓶</text>
						</view>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import {
		queryOrderListForUser,updateOrderStatusForUser
	} from '@/api/api.js';
	export default {
		data() {
			return {
				orderType: '',
				dataList: [],
			};
		},
		onLoad() {
			
			//orderType 全部	 0 待付款 1	 待发货	2 待收货	3	 已完成	4 已取消   5	
			this.orderType = '';
			this.pageNum = 1;
			//this.queryList(this.pageSize,this.pageNum,this.orderType);
		},
		onShow(){
			// this.queryList(1,10)
		},
		methods: {
			queryList(pageNo, pageSize) {
				// 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
				// 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				// 模拟请求服务器获取分页数据，请替换成自己的网络请求
			let basicData = uni.getStorageSync('basicData')||'{}';
				let data = JSON.parse(basicData);
				const params = {
					pageNo: pageNo,
					pageSize: 10,
					status:'',
					userOpenid: data.userOpenid,
					//orderNo:'20241210'
				}
				//this.$refs.paging.complete([10]);
				queryOrderListForUser(params).then((res) => {
					//debugger
					//console.log('成功 ', res);
					this.$refs.paging.complete(res.resultList);
				}).catch((err) => {
					this.$refs.paging.complete(false);
					uni.showToast({
						title: err.data.msg||'queryOrderListForUser接口异常,请稍后再试',
						icon:'none'
					});
					console.error('失败', err);
				});

			},
			/**
			 *  订单列表点击
			 */
			goDetls(orderNo) {
				uni.navigateTo({
					url: '/pages/Mine/MyOrderList/MyOrderListDetails?orderNo=' + orderNo
				})
			},
			//年度报告
			goNdbg(orderNo,orderType,isInvoice){
				uni.showToast({
					title: '打开年度报告页',
					icon:'none'
				});
				return
			},
			//装瓶
			goZp(orderNo,orderType,isInvoice){
				uni.showToast({
					title: '装瓶',
					icon:'none'
				});
				return
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.page{
		// position: absolute;
		// left: 0;
		// top: 0;
		width: 100%;
		height: 100vh;
		background-color: $baseBackgroundColor;
	}
	
	
	/* 订单列表 */
	.order-list{
		width: 100%;
		// margin-top: 220rpx;
		/* #ifdef APP-PLUS */
		margin-top: calc(170rpx + var(--status-bar-height));
		/* #endif */
		
		.list{
			padding: 0 2%;
			min-height: 400rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			// margin-top: 20rpx;
			
			margin: 20rpx 2%;
			.title-status{
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 100rpx;
				font-weight: bold;
				.title{
					display: flex;
					align-items: center;
					text{
						font-size: 30rpx;
						// font-weight: bold;
						color: #000;
					}
				}
				.status{
					display: flex;
					align-items: center;
					text{
						font-size:30rpx;
						color: #000;
					}
					.del{
						padding: 10rpx;
						font-size: 34rpx;
						color: #222222;
						background-color: $baseBackgroundColor;
						border-radius: 100%;
						margin-left: 20rpx;
					}
				}
			}
			.goods-content{
				.thumb{
					display: flex;
					align-items: center;
					width: 100%;
					image{
						width: 100%;
						height: 260rpx;
						border-radius: 10rpx;
					}
				}
			}
			.title-status::after{
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				display: inline-block;
				height: 1rpx;
				background-color: #EEEEEE;
				// border: .1rpx solid #e2e2e2;
			}
			
			.goods-list{
				width: 100%;
				.goods{
					display: flex;
					align-items: center;
					width: 100%;
				
					font-size: 24rpx;
					color: #000;
					.item{
						// display: flex;
						// align-items: center;
						width: 100%;
						// height: 100%;
						.goods-name{
							width:100%;
							padding-top: 30rpx;
							text{
								font-size: 30rpx;
								color: #000;
							}
						}
						.goods-des{
							width:100%;
							position: relative;
							padding-bottom: 30rpx;
							text{
								font-size: 24rpx;
								color: #666;
							}
						}
						.goods-des::after{
							content: "";
							position: absolute;
							bottom: 0;
							left: 0;
							width: 100%;
							display: inline-block;
							height: 1rpx;
							background-color: #EEEEEE;
							// border: .1rpx solid #e2e2e2;
						}
						.goods-price{
							display: flex;
							align-items: center;
							// justify-content: ;
							width: 100%;
							padding-top: 15rpx;
							
							.min{
								font-size: 24rpx;
								margin-left: 60rpx;
								
							}
							.max{
								font-size: 24rpx;
								
							}
						}
						.total{
							margin-top: 15rpx;
							font-size: 24rpx;
							
						}
					}
				}
			}
			.status-btn{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				width: 100%;
				height: 100rpx;
				.btn{
					padding: 10rpx 30rpx;
					border: 2rpx solid #ccc;
					border-radius: 100rpx;
					margin-left: 20rpx;
					text{
						font-size: 26rpx;
						color: #555555;
					}
				}
				.action{
					border: 2rpx solid $base;
					text{
						color: $base;
					}
				}
			}
		}
	}
</style>