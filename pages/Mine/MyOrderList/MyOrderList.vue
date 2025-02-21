<template>
	<view class="page">
		   
		 	<z-paging ref="paging" v-model="dataList" @query="queryList" slot="loading">
				 <skeleton v-if="isShowskeleton"/>
		 		<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
		 		<!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs -->
				
		 		<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
		 		
		 		<!-- 订单列表 -->
		 			
		 		<view class="order-list">
		 			<view class="list" v-for="(item,index) in dataList" :key="index"   @click="goDetls(item.orderNo,item.status,1)">
		 				<view class="title-status">
		 					<view class="title">
		 						<!--
		 						 待付款  红 #E23940
		 						 蓝 #1E98D7
		 						 黄 #F59A23
		 						 绿 #1ABC9C
		 						 -->
		 						<!-- <text :style="{ 
		 							color:item.status == '待支付订金' ? '#E23940' :
		 							 item.status == '待发货' ? '#1E98D7' :
		 							 item.status == '待收货' ? '#F59A23' :
		 							 item.status == '已完成' ? '#1ABC9C' :'#666' }">
		 							{{item.status}}
		 						</text> -->
		 						<text style="color:;">
		 							待支付订金
		 						</text>
		 					</view>
		 					
		 				</view>
		 				<view class="goods-content">
		 					<view class="thumb">
		 						<image src="../../../static/wsj.png" mode=""></image>
								<!-- <image :src="item.productImage" mode=""></image> -->
		 					</view>
		 				</view>
		 				<view class="goods-list" >
		 					<view class="goods">
		 						
		 						<view class="item">
		 							<view class="goods-name">
		 								<text class="two-omit">波本桶 200L</text>
		 								<text class="num">x1</text>
		 							</view>
		 							<view class="goods-des">
		 								<text>￥20000.00</text>
		 							</view>
		 							<view class="goods-price">
		 								<text class="notice">请在2025-03-15前支付尾款，超时将关闭订单，订金不退!</text>
		 							</view>
		 							<view class="total">
		 								<text>应付订金：</text>
		 								<text class="price">￥20000.00</text>
		 							</view>
		 						</view>
		 					</view>
		 				</view>
		 				<view class="status-btn" >
		 					<view class="btn"  @click.stop="cancel()">
		 						<text>取消订单</text>
		 					</view>
		 					<view class="btn action"  @click.stop="buy(1000,1000)">
		 						<text>购买</text>
		 					</view>
		 					<view class="btn action-blue"  @click.stop="goDgzz()">
		 						<text>对公转账</text>
		 					</view>
		 					<!-- <view class="btn action-blue"  @click="goSign()">
		 						<text>签署合同</text>
		 					</view> -->
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
	import skeleton from './components/skeleton.vue';
	// import MyOrderListSkeleton from './components/myOrderListSkeleton.vue';
	export default {
		components:{
			skeleton
		},
		data() {
			return {
				isShowskeleton:true,
				orderType: '',
				dataList: [{
					status:1
				}],
			};
		},
		onLoad() {
		
			//orderType 全部	 0 待付款 1	 待发货	2 待收货	3	 已完成	4 已取消   5	
			this.orderType = '';
			this.pageNum = 1;
			//this.queryList(this.pageSize,this.pageNum,this.orderType);
		},
		onShow(){
			//this.queryList(1,10)
			// let timer = setTimeout(() => {
			// 	this.isShowskeleton = false
			// 	clearTimeout(timer);
			// }, 1500)
		},
		methods: {
			queryList(pageNo, pageSize) {
				 let that = this;
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
					this.isShowskeleton = false
				}).catch((err) => {
					console.log(err)
					this.$refs.paging.complete(false);
					uni.showToast({
						title: err.data.msg||'queryOrderListForUser接口异常,请稍后再试',
						icon:'none'
					});
					console.error('失败', err);
					this.isShowskeleton = false
					
				});

			},
			/**
			 *  订单列表点击
			 */
			goDetls(orderNo,orderType,onlylook) {
				uni.navigateTo({
					url: '/pages/Mine/MyOrderList/MyOrderListDetails?orderNo=' + orderNo + '&orderType=' + orderType+'&onlylook='+onlylook,
				})
			},
			//cancel 取消订单
			cancel(orderNo,status){
				let that = this;
				uni.showModal({
					title: '',
					content: '是否立即取消订单？',
					confirmColor:'#C0272C',//确定按钮颜色
					success: function (res) {
						if (res.confirm) {
							uni.showToast({
								title: '订单取消成功！',
								duration: 2000
							});
							// updateOrderStatusForUser({
							// 	orderNo: orderNo,
							// 	status: '已完成',
							// }).then((res) => {
							// 	uni.showToast({
							// 		title: '确认收货成功',
							// 		duration: 2000
							// 	});
							// 	let timer = setTimeout(() =>{
							// 		that.onOrderTab(status);
							// 		clearTimeout(timer);
							// 	},1500)
								
							// }).catch((err) => {
							// 	uni.showToast({
							// 		title: err.data.msg||'updateOrderStatusForUser接口异常,请稍后再试',
							// 		icon:'none'
							// 	});
							// });
							
						} 
					}
				});
			},
			//buy 购买
			buy(orderAmount,orderNo){
				uni.navigateTo({
					url:'/pages/CashierDesk/CashierDesk?orderAmount='+orderAmount+'&orderNo='+orderNo
				})
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
							display: flex;
							justify-content: space-between;
							text{
								font-size: 30rpx;
								color: #000;
							}
							.two-omit{
								font-weight: bold;
							}
							.num{
								font-size: 26rpx;
								color:#666 ;
							}
						}
						.goods-des{
							width:100%;
							position: relative;
							padding-bottom: 30rpx;
							text-align: right;
							text{
								font-size: 28rpx;
								color: #000;
								font-weight: bold;
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
							.notice{
								background-color:rgba(230,40,40,0.15) ;
								color: $base;
								padding: 6rpx 20rpx;
								border-radius: 8rpx;
							}
						}
						.total{
							margin-top: 15rpx;
							font-size: 24rpx;
							text-align: right;
							.price{
								font-size: 28rpx;
								color: #000;
								font-weight: bold;
							}
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
				.action-blue{
					border: 2rpx solid #1E98D7;
					text{
						color: #1E98D7;
					}
				}
			}
		}
	}
</style>