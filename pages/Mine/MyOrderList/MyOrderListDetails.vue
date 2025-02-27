<template>
	<view class="page">		
		<!-- 订单商品 -->
		<view class="order-goods sw" style="margin:0 3%;padding-top: 20rpx;">
			<view class="goods-list">
				<!-- 订单状态 -->
				<view class="list">
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
						<text style="color: #000;">
							待支付订金
						</text>
					</view>
					<view class="thumb">
						  <image src="../../../static/wsj.png" mode=""></image>
					</view>
					<view class="item">
						<view class="title">
							<!-- <text class="one-omit">1111{{detls.productName}}</text> -->
						</view>
						<!-- <view class="num-size">
							<text>数量：88</text>
							<text>颜色</text>
						</view> -->
						<view class="price">
							<text>波本桶 2L</text>
							<text class="num"><text>×</text>1</text>
						</view>
						
						<view class="order-btn">
							<view class="total">
								<!-- <text style="margin-right: 20rpx;">共<text class="red">{{detls.quantity}}</text>件商品</text> -->
								<text>¥ <text>{{detls.orderAmount}}</text></text>
							</view> 
						</view>
					</view>
					<view class="item">
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
				</view>
			</view>
			
		</view>
		<!-- 付款明细 -->
		<view class="order-info sw">
			<view class="info-list">
				<view class="title">
					<text>付款明细</text>	
					<view class="record" @click="goPayList()">付款记录<uni-icons type="right" size="12" style="float: right;"></uni-icons></view>
				</view>
				<view
				  v-for="(item, index) in payList"
				  :key="index"
				  class="payList"
				>							
				  <view class="title">
					  <image src="../../../static/pay.png" style="height: 40rpx;width: 40rpx;" mode=""></image>
					<text style="font-size: 28rpx;margin-left: 6rpx;">{{ item.title }}</text>
				  </view>
				  <view class="content">
				    <text>￥{{ item.content }}</text>
				  </view>
				  <view class="content">
				    <text :style="{
				    	color:item.status == '待支付' ? '#C0272C' :
				    	 item.status == '已支付' ? '#1ABC9C' :'#666' }">
				    	{{item.status}}
				    </text>
				  </view>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="order-info sw">
			<view class="info-list">
				<view class="title">
					<text>订单信息</text>	
				</view>
				<view class="list">
					<view class="title">订单编号</view>
					<view class="content">
						<text>{{detls.orderNo}}</text>
						<text class="btn" @click="copy(detls.orderNo)">复制</text>
					</view>
				</view>
				<view class="list">
					<view class="title">下单时间</view>
					<view class="content">
						<text>{{detls.createDate}}</text>
					</view>
				</view>
				<view class="list" v-if="orderType != '待付款'">
					<view class="title">支付方式</view>
					<view class="content">
						<text>{{detls.paymentMethod}}</text>
					</view>
				</view>
				<view class="list" v-if="orderType != '待付款'">
					<view class="title">付款时间</view>
					<view class="content">
						<text>{{detls.paymentTime}}</text>
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
				//isFirst:1,//是否首次填写地址，根据用户的地址列表有无数据，默认第一条
				visible: false,
				maskCloseAble: true,
				defaultValue: '110101',
				// defaultValue: ['河北省','唐山市','丰南区'],
				column: 3,
				name:'',//收货人姓名
				phone:'',//收货人手机
				city:'',//收货人地区
				area:'',//收货人详细的地址
				
				ab:{//地址簿
					recipientName:'',
					code:'',
					phoneNumber:'',
					//area:'',//详细的地址
				},
				orderNo:'',
				orderAmount:'',
				from:'',//laizi
				detls:null,
				abList:[],
				fpList:[],
				commodityCode:'',
				fp:{
				  invoiceType: '单位',//"发票类型(个人/单位)",
				  invoiceTitle: '',//"发票抬头",
				  taxNumber: '',//"税号(单位必填)",
				  companyAddress: '',//"公司地址(单位必填)",
				  phoneNumber: '',//"电话号码(单位必填)",
				  bankName: '',//"开户银行(单位必填)",
				  bankAccount: '',//"银行账号(单位必填)"
				  id:'',
				  email:''
				},
				invoiceTitle:'',//个人 发票抬头
				onlylook:1,
				payList:[
				      { title: "订金", content: "1000.00",status: "已支付" },
				      { title: "尾款", content: "999.00" ,status: "待支付" }
				    ]
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
			this.orderType = option.orderType;
			this.orderNo = option.orderNo;
			this.from= option.from;
			this.abInfo= option.abInfo;
			this.fpInfo= option.fpInfo;
			this.onlylook = option.onlylook;
			
		},
		methods:{
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
			//复制 单号
			copy(orderNo) {
			   let that = this;
				uni.setClipboardData({
					data: orderNo, // 
					success: function () {
						uni.showToast({
							title:'复制成功！',
							icon:'none'
						})
					},
					fail(e){
						uni.showToast({
							title:'复制失败：'+e.errMsg,
							icon:'none'
						})
						console.log(JSON.stringify(e))
					}
				})
			},
			//付款记录
			goPayList(orderNo) {
			   let that = this;
			   uni.navigateTo({
					url:"/pages/Mine/MyOrderList/PayList?orderNo="+that.orderNo
				})
			  
			}
			,
			goIndex(){
				let oData = uni.getStorageSync('basicData');
				let data = JSON.parse(oData);
			
				const basicData = JSON.stringify({
					userOpenid:data.userOpenid,
					commodityCode:this.detls.commodityCode
				});
				uni.setStorageSync('basicData', basicData);
				uni.navigateTo({
					url:"/pages/GoodsDetails/GoodsDetails?isBuy=1"
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
			padding:0 4% 4% 4%;
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
					// display: flex;
					width: 100%;
					height: 200rpx;
					// margin-top: -20rpx;
					image{
						width: 100%;
						height: 260rpx;
						border-radius: 10rpx;
					}
				}
				.item{
					width: 100%;
					height: 100%;
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
					.order-btn::after{
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
				border-bottom: 2rpx solid #eee;
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
	.option-group {
		  display: flex;
		  // justify-content: space-between;
		  width: 100%;
		  outline:none;
		}
		.option {
		  background-color: #ccc;
		  outline: none;
		  cursor: pointer;
		  font-size: 26rpx;
		  padding: 4px 18px;
		  border-radius: 30rpx;
		 -webkit-tap-highlight-color:rgba(0,0,0,0);
	
		  // border: 1px solid $base;
		}
		.option:focus{
				outline:none;
			}
		.option:last-child{
		  margin-left: 50rpx;
		}
		.selected {
		  border-color: $base;
		  background-color: $base;
		  color: white;
		  outline:none;
		}
	/* 订单明细 */
	.order-details{
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 20rpx auto;
		padding-bottom: 100rpx;
		.details-list{
			padding: 0 4%;
			.list{
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 100rpx;
				border-bottom: 2rpx solid $baseBackgroundColor;
				.title{
					font-size: 26rpx;
					color: #959595;
				}
				.price{
					font-size: 26rpx;
					font-weight: bold;
				}
			}
			.action{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.price{
					font-size: 32rpx;
					font-weight: bold;
					color: $base;
				}
			}
		}
	}
	
	.footer-btn{
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
		.del{
			display: flex;
			align-items: center;
			text{
				padding: 10rpx 30rpx;
				font-size: 24rpx;
				font-weight: bold;
			}
		}
		.btn{
			display: flex;
			align-items: center;
			text{
				padding: 15rpx 35rpx;
				font-size: 24rpx;
				border: 2rpx solid #C0C0C0;
				border-radius: 100rpx;
				color: #555555;
				margin-left: 20rpx;
			}
			.action{
				background-color: $base;
				color: #FFFFFF;
				border: 2rpx solid #FFFFFF;
			}
		}
	}
	// 弹出地址簿
	.popupBox{
		//height: 720rpx;
		width: 100%;
		background-color: #fff;
		font-size: 28rpx;
		
		.title{
			text-align: center;
			.name{
				display: inline-block;
				margin-top: 20rpx;
				font-size: 32rpx;
			}
			.close{
				font-size: 50rpx;
				width: 50rpx;
				text-align: center;
				
				float: right;
			}
		}
		.save{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 60%;
				height:70rpx;
				margin-left: 20%;
				background-color: $base;
				color: #FFFFFF;
				border-radius: 100rpx;
				font-size: 26rpx;
				margin-top: 25rpx;
				position: relative;
				top: 15rpx;
			}
			
		.address-input{
			width: 100%;
			background-color: #FFFFFF;
			.toptitle{
				font-weight: bold;
				text-align: left;
				display: flex;
				align-items: center;
				padding: 0 4%;
			}
			.list-input{
				display: flex;
				align-items: center;
				padding: 0 4%;
				height: 100rpx;
				border-bottom: 2rpx solid $baseBackgroundColor;
				.title{
					display: flex;
					align-items: center;
					width: 20%;
					height: 100%;
					text{
						color: #222222;
						font-size: 26rpx;
					}
				}
				.content{
					display: flex;
					align-items: center;
					width: 80%;
					height: 100%;
					input{
						width: 100%;
						height: 100%;
						font-size: 26rpx;
						color: #222222;
					}
				}
			}
			.list-textarea{
				display: flex;
				align-items: center;
				padding: 0 4%;
				height: 200rpx;
				border-bottom: 2rpx solid $baseBackgroundColor;
				.title{
					display: flex;
					width: 20%;
					height: 80%;
					text{
						color: #222222;
						font-size: 26rpx;
					}
				}
				.content{
					display: flex;
					align-items: center;
					width: 70%;
					height: 100%;
					textarea{
						width: 100%;
						height: 80%;
						font-size: 26rpx;
						color: #222222;
					}
				}
			}
			.box{
				display: flex;
				width: 100%;
				padding: 0 4%;
				align-items: center;
				.left{
					line-height: 1.5;
					width: 70%;
					.area{
						color: #959595;
						font-size: 24rpx;
					}
				}
				.right{
					width: 30%;
					text-align: center;
					font-weight: bold;
					position: relative;
				}
				.right:before{
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
	.sw{
		width: 94%;
		margin: 20rpx 3%;
	}
	/*  */
	
	
</style>
