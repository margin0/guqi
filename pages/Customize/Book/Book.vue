<template>
	<view class="page">		
		<!-- 订单商品 -->
		<view class="order-goods sw" style="margin:0 3% 20rpx 3%;">
			<view class="goods-list">
				<!-- 订单状态 -->
				<view class="list">
					<view class="thumb">
						<!-- <image :src="detls.productImage" mode=""></image> -->
						<image src="../../../static/wsj.png" mode=""></image>
						<view class="right">
							<view class="name">
								<text>波本桶</text>
							</view>
							<view class="specs">
								<text>200L</text>
							</view>
							<view class="bot">
								<text class="num">￥{{price}}</text>
								<uni-number-box :min="1" :max="9" :value="numberValue"  @change="changeValue()" />
							</view>
						</view>
					</view>
					<view class="item item1">
						<view class="desc">
							<text class="tit">桶陈时长</text>
							<text>10年</text>
						</view>
						<view class="desc">
							<text class="tit">存储结束日期</text>
							<text>2035年</text>
						</view>
						<view class="desc">
							<text class="tit">装瓶服务</text>
							<text>2028年可选</text>
						</view>
					</view>
					<view class="item">
						<view class="desc">
							<text class="tit priceTit">订金</text>
							<text>￥{{deposit}}</text>
						</view>

					</view>
				</view>
			</view>
			
		</view>
		<!-- 购买人信息 -->
		<view class="order-info sw">
			<view class="info-list">
				<view class="title">
					<text>购买人信息</text>	
				</view>
				<view class="list">
					<view class="title">购买人</view>
					<view class="content">
						<text>测试</text>
					</view>
				</view>
				<view class="list">
					<view class="title">证件类型</view>
					<view class="content">
						<text>身份证</text>
					</view>
				</view>
				<view class="list">
					<view class="title">证件号码</view>
					<view class="content">
						<text>34126565545454514515</text>
					</view>
				</view>
				<view class="list">
					<view class="title">联系方式</view>
					<view class="content">
						<text>18356535852</text>
					</view>
				</view>
			</view>
		</view>
		<view class="order-info sw">
			<view class="info-list">
				<view class="list">
					<view class="title priceTit">总价</view>
					<view class="content">
						<text class="">￥{{total}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="order-info sw">
			<view class="info-list kpsm">
				<view class="title">订金须知</view>
				<view class="words">
				    <text v-for="(item, index) in textItems" :key="index">
				      {{ index + 1 }}、{{ item }}
				    </text>
				  </view>
			</view>
		</view>
		<view class="agree">
			<radio :checked="isChecked" @click="toggleCheck" style=""/>
			<text>我已阅读并同意<text class="xy" @click="Agreement">《古奇威士忌购买协议》</text></text>
		</view>
		<view class="pay-submit">
			<view class="submit" :style="{ backgroundColor: isChecked ? '#C0272C' : '#ccc' }"  @click="pay(total,'')">支付订金 <text style="margin-left: 10rpx;">￥{{total}}</text></view>
		</view>
	</view>
</template>
<script>
	import {
		queryUserAddressList,factorydirect_order,queryOrderInfoByOrderNo,bindAddressForOrder,createUserAddress,updateUserAddress,updateOrderStatusForUser,updateUserInvoice,createUserInvoice,queryUserInvoiceList,openInvoice
	} from '@/api/api.js';
	
   import cityPicker from '@/uni_modules/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker'
	export default {
		data() {
			return {
				orderType:'',//订单状态：待付款、待发货、待收货、已完成、已取消
				detls:null,
				numberValue:1,
				price:'39999.00',
				deposit:'10000.00',//订金
				total:'',
				textItems: [
					"古奇威士忌订金须知上商城的所有发票由门店提供，发票开具金额为实际支付金额，发票内容默认为商品明细。",
					"古奇威士忌订金须知电子发要是税务局认可的有效付款凭证，电子发票真实有效的合法发票",
					"古奇威士忌订金须知电子发票将在门店发货的10个工作日内开具，届时您在收票人邮箱查看并下载发票，如未收到，请联系客服。"
				  ],
				  isChecked: false // 用于绑定radio选中状态的响应式数据
			};
		},
		components: {
			cityPicker
		},
		onShow(){
			this.queryOrderInfoByOrderNo()
		},
		onLoad(option){
			console.log(option); //打印出上个页面传递的参数。
			this.total = this.deposit;
		},
		methods:{
			//点击协议
			toggleCheck() {
			  this.isChecked = !this.isChecked; // 切换isChecked的值
			  console.log(this.isChecked)
			},
			//购买数量
			changeValue(value) {
				this.numberValue = value;
				this.total =(Number(this.deposit)*Number(value)).toFixed(2)
			},
			queryOrderInfoByOrderNo(){
				let that = this;
				queryOrderInfoByOrderNo({
					orderNo: '202502130098',
				}).then((res) => {
					that.detls = res;
					this.orderType = res.status;
					//根据不同状态 ，控制地址以及发票的弹出框
					if(res.isAddress=='否'&&res.status=='待发货'&&that.onlylook==0){
						that.open();
						//判断 是否从地址页面返回，是--取值来自于地址页面；否--取值来自地址簿接口第一条数据
						that.getAdss(that.from,that.abInfo);
					}
					if((res.status == '待收货'||res.status == '已完成')&& res.isInvoice == '否'&&that.onlylook==0){
						that.fpopen();
						//判断 是否从发票列表页面返回，是--取值来自于发票列表页面；否--取值来自发票列表接口第一条数据
						that.getFp(that.from,that.fpInfo);
					}
					
				}).catch((err) => {
					uni.showToast({
						title: err.data.msg||'queryOrderInfoByOrderNo接口异常,请稍后再试',
						icon:'none'
					});
				});
			},
			//支付订金
			pay(orderAmount,orderNo){
				if(!this.isChecked){
					uni.showToast({
						title: '请先阅读并同意《古奇威士忌购买协议》',
						icon:'none'
					});
					return;
				}
				uni.navigateTo({
					url:'/pages/CashierDesk/CashierDesk?orderAmount='+orderAmount+'&orderNo='+orderNo
				})
			},
			//购买协议
			Agreement(){
				uni.navigateTo({
					url:'/pages/Customize/Book/BuyAgreement'
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.page{
		// position: absolute;
		// left: 0;
		// top: 0;
		width: 100%;
		// height: 100%;
		background-color: $baseBackgroundColor;
		padding-bottom: 100rpx;
	}
	.agree {
	  font-size: 26rpx;
	  color: #fff;
	  width: 90%;
	  text-align: center;
	  display: flex;
	  align-items: center;
	  margin-left: 5%;
	  padding: 20rpx 0;
	  >text{
		   margin-left: 20rpx;
	  }
	  .xy{
		  color: $base;
		 
	  }
	}
	.ttb{
		color: #fff;
		background-color: $base;
		width:120rpx;
		padding: 8rpx 10rpx;
		border-radius: 15rpx;
		font-size: 24rpx;
		text-align: center;
	}
	/* 订单状态 */
	.order-status{
		width: 100%;
		// height: 150rpx;
		padding: 20rpx 0;
		background: linear-gradient(to right,$base,$change-clor);
		.status{
			display: flex;
			align-items: center;
			// justify-content: center;
			width: 100%;
			padding: 0 6%;
			// height: 100rpx;
			text{
				font-size: 38rpx;
				// font-weight: bold;
				color: #FFFFFF;
			}
			.desc{
				display: flex;
				justify-items: center;
				margin-left: 30rpx;
			}
			.iconfont{
				margin-right: 20rpx;
			}
			.oths{
				font-size: 24rpx;
				display: block;
			}
		}
		.reason{
			display: flex;
			// align-items: center;
			justify-content: center;
			width: 100%;
			height: 80rpx;
			text{
				font-size: 28rpx;
				color: $baseBackgroundColor;
			}
		}
	}
	

	
	/* 订单商品 */
	.order-goods{
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		.goods-list{
			padding: 4% 4% 0 4%;
			.list{
				// display: flex;
				// align-items: center;
				width: 100%;
				.title{
					padding-bottom: 20rpx;
					display: flex;
					align-items: center;
					text{
						font-size: 30rpx;
						font-weight: bold;
						color: #000;
					}
				}
				.thumb{
					display: flex;
					vertical-align: clear;
					align-items: center;
					color: #000;
					font-size: 26rpx;
					image{
						width: 160rpx;
						height: 160rpx;
					}
					.right{
						flex-grow:1;
						margin-left: 20rpx;
						.name{
							font-size: 32rpx;
							font-weight: bold;
							display: flex;
							align-items:flex-start;
						}
						view{
							height:54rpx;
							
						}
						.specs{
							display: flex;
							align-items: center;
						}
						.bot{
							display: flex;
							align-items: flex-end;
							width: 100%;
							justify-content: space-between;
							.js{
								display: block;
							}
						}
					}
				}
				.item1::after{
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
				.item{
					width: 100%;
					height: 100%;
					position: relative;
					padding: 20rpx 0;
					
					.title{
						display: flex;
						align-items: center;
						width: 100%;
						height: 60rpx;
						text{
							font-size: 26rpx;
							color: #222222;
						}
					}
					.num-size{
						display: flex;
						align-items: center;
						width: 100%;
						height: 60rpx;
						text{
							font-size: 26rpx;
							color: #959595;
							margin-right: 20rpx;
						}
						text:last-child{
							margin-right: 0;
						}
					}
					.price{
						display: flex;
						align-items: center;
						width: 100%;
						height: 60rpx;
						justify-content: space-between;
						>text{
							font-size: 30rpx;
							font-weight: bold;
							color: #222222;
						}
						.num{
							font-size: 26rpx;
							 color: #959595;
							 font-weight: unset;
						}
					}
					.desc{
						display: flex;
						align-items: center;
						width: 100%;
						height: 60rpx;
						justify-content: space-between;
						font-size: 28rpx;
						.tit{
							color: #959595;
						}
					}
					.tk{
						font-size: 26rpx;
						text-align: right;
						width: 100%;
						color: $base;
					}
					
					.order-btn{
						display: flex;
						align-items: center;
						justify-content: flex-end;
						width: 100%;
						padding: 15rpx 0;
						position: relative;
						.btn{
							padding: 10rpx 30rpx;
							color: #555555;
							font-size: 26rpx;
							border: 2rpx solid #EEEEEE;
							border-radius: 100rpx;
						}
						.total{
							font-weight: bold;
							font-size: 28rpx;
							float: right;
						}
					}
					
				}
			}
		}
		.contact{
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
			text{
				font-size: 28rpx;
				color: #555555;
			}
			.iconfont{
				font-size: 34rpx;
				margin-right: 20rpx;
			}
		}
	}
	
	/* 订单信息 */
	.order-info{
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 20rpx auto;
		// padding-bottom: 120rpx;
		.info-list{
			padding: 0 4%;
			.title{
				padding: 20rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				text{
					font-size: 30rpx;
					font-weight: bold;
					color: #000;
				}
				.record{
					display: flex;
					align-items: center;
					font-size: 26rpx;
				}
			}
			
			.list{
				display: flex;
				align-items: center;
				width: 100%;
				height: 100rpx;
				border-bottom: 2rpx solid #eee;
				justify-content: space-between;
				.title{
					font-size: 26rpx;
					color: #959595;
					// color: #222222;
				}
				.content{
					display: flex;
					align-items: center;
					margin-left: 20rpx;
					text{
						font-size: 26rpx;
						// font-weight: bold;
						color: #222222;
					}
					.btn{
						padding: 6rpx 20rpx;
						background-color: #EEEEEE;
						color: #555555;
						font-size: 24rpx;
						border-radius: 50rpx;
						margin-left: 40rpx;
					}
				}
			}
			.payList{
				display: flex;
				align-items: center;
				width: 100%;
				height: 100rpx;
				border-bottom: 2rpx solid $baseBackgroundColor;
				justify-content: space-between;
				.title{
					font-size: 26rpx;
					color: #959595;
					display: flex;
					align-items: center;
				}
				.content{
					display: flex;
					align-items: center;
					margin-left: 20rpx;
					text{
						font-size: 26rpx;
						font-weight: bold;
						color: #222222;
					}
					.btn{
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
	.priceTit{
		font-size: 30rpx !important;
		color: #000 !important;
	}
	
	
	.sw{
		width: 94%;
		margin: 20rpx 3%;
	}
	/*  */
	.pay-submit{
		
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		
		.submit{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90%;
			height: 70%;
			background-color: $base;
			color: #FFFFFF;
			border-radius: 100rpx;
			font-size: 26rpx;
		}
	}
	.kpsm{
		color: #959595;
		font-size: 26rpx;
		.title{
			color: #555;
			text-align: center;
			padding: 20rpx 0;
		}
		.words{
			padding-bottom: 20rpx;
			text{
				display: block;
				font-size: 24rpx;
				margin-bottom: 5rpx;
			}
		}
	}
</style>
