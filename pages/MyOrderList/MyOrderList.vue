<template>
	<view class="page">
		<!-- 订单tab   全部  0
		orderType 
		全部		0
		待付款	1			  
		待发货	2			  
		待收货	3			  
		已完成	4
		已取消   5			  
						  -->
		<z-paging ref="paging" v-model="dataList" @query="queryList" >
			<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
			<!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs -->
			<template #top>
				<view class="order-tab">
					<view class="tab" :class="{'action':orderType==''}" @click="onOrderTab('')">
						<text>全部</text>
						<text class="line"></text>
					</view>
					<view class="tab" :class="{'action':orderType=='待付款'}" @click="onOrderTab('待付款')">
						<text>待付款</text>
						<text class="line"></text>
					</view>
					<view class="tab" :class="{'action':orderType=='待发货'}" @click="onOrderTab('待发货')">
						<text>待发货</text>
						<text class="line"></text>
					</view>
					<view class="tab" :class="{'action':orderType=='待收货'}" @click="onOrderTab('待收货')">
						<text>待收货</text>
						<text class="line"></text>
					</view>
					<view class="tab" :class="{'action':orderType=='已完成'}" @click="onOrderTab('已完成')">
						<text>已完成</text>
						<text class="line"></text>
					</view>
					<view class="tab" :class="{'action':orderType=='已取消'}" @click="onOrderTab('已取消')">
						<text>已取消</text>
						<text class="line"></text>
					</view>
				</view>
			</template>
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<!-- 
			"isAddress": "否",
			"orderNo": "20241209-016",
			"orderAmount": "2000.00",
			"quantity": "2",
			"productImage": "",
			"productName": "65°5L*1特级15年原酒",
			"status": "待付款" 
			 -->
			<!-- 订单列表 -->
			<view class="order-list" style="">
				<view class="list" v-for="(item,index) in dataList" :key="index">
					<view class="title-status"  @click="goDetls(item.orderNo,item.status,1)">
						<view class="title">
							<text>订单号：{{item.orderNo}}</text>
						</view>
						<view class="status">
							<!-- 
							 待付款  红 #E23940
							 蓝 #1E98D7
							 黄 #F59A23
							 绿 #1ABC9C
							 -->
							<text :style="{ 
								color:item.status == '待付款' ? '#E23940' :
								 item.status == '待发货' ? '#1E98D7' :
								 item.status == '待收货' ? '#F59A23' :
								 item.status == '已完成' ? '#1ABC9C' :'#666' }">
								{{item.status}}
							</text>
						</view>
					</view>
					<view class="goods-list"   @click="goDetls(item.orderNo,item.status,1)">
						<view class="goods">
							<view class="thumb">
								<image :src="item.productImage" mode=""></image>
							</view>
							<view class="item">
								<view class="goods-name">
									<text class="two-omit">{{item.productName}}</text>
								</view>
								<view class="goods-price">
									<text class="max">￥{{item.memberPrice}}</text>
									<text class="min">x{{item.quantity}}</text>

								</view>
								<view class="total">
									<text class="">实付款：￥{{item.orderAmount}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="status-btn" >
						<!-- 
						 v-if="item.status == '已完成' ||item.status == '待收货' ||item.status == '待付款' || (item.status == '待发货' && item.isAddress == '否')"
						 1.待付款:点击“付款”按钮，调起微信支付，适用支付流程,付款后;
						 2.待发货:已填写收货地址，不显示“收货地址”按钮，未填写收货地址，显示该按钮;
						 3.待收货:点击“确认收货”弹出二次确认框“是否确认收货”收货后订单状态变为已完成:导购发货7天后凌晨，统一调度大于7天未收货的订单，自动确认收货，
						 4.已完成:点击“再来一单”，跳转【商品详情】页;
						 5.已取消:待付款状态取消的订单;待发货状态取消的订单显示退款标识。
						 -->
						 <view class="btn"  @click="goFp(item.orderNo,item.status,item.isInvoice)" v-if="item.status=='待收货'||item.status=='已完成'">
						 	<text>{{item.isInvoice=='是'?'查看发票':'开发票'}}</text>
						 </view>
						<view class="btn action" @click="goPay(item.orderAmount,item.orderNo)" v-if="item.status=='待付款'">
							<text>付款</text>
						</view>
						<view class="btn action" v-if="item.isAddress=='否'&&item.status=='待发货'"  @click="goDetls(item.orderNo,item.status,0)">
							<text>收货地址</text>
						</view>
						<view class="btn action"  @click="goSh(item.orderNo,item.status)" v-if="item.status=='待收货'">
							<text>确认收货</text>
						</view>
						
						<view class="btn action"  @click="goIndex(item.commodityCode)"  v-if="item.status=='已完成'">
							<text>再来一单</text>
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
		onLoad(params) {
			console.log(params)
			//orderType 全部	 0 待付款 1	 待发货	2 待收货	3	 已完成	4 已取消   5	
			this.orderType = params.orderType;
			this.pageNum = 1;
			//this.queryList(this.pageSize,this.pageNum,this.orderType);
		},
		onShow(){
			this.queryList(1,10)
		},
		methods: {
			queryList(pageNo, pageSize) {
				// 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
				// 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				// 模拟请求服务器获取分页数据，请替换成自己的网络请求
				let basicData = uni.getStorageSync('basicData');
				let data = JSON.parse(basicData);
				const params = {
					pageNo: pageNo,
					pageSize: 10,
					status:this.orderType,
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
			 * 订单tab点击
			 */
			onOrderTab(type) {
				this.orderType = type;
				// 当切换tab或搜索时请调用组件的reload方法，请勿直接调用：queryList方法！！
				this.$refs.paging.reload();
			},
			/**
			 *  订单列表点击
			 */
			goDetls(orderNo,orderType,onlylook) {
				if(!orderNo||!orderType){
					return;
				}
				uni.navigateTo({
					url: '/pages/OrderDetails/OrderDetails?orderNo=' + orderNo + '&orderType=' + orderType+'&onlylook='+onlylook,
				})
			}
			,
			goSh(orderNo,status){
				let that = this;
				uni.showModal({
					title: '',
					content: '是否确认收货？',
					confirmColor:'#C0272C',//确定按钮颜色
					success: function (res) {
						if (res.confirm) {
							updateOrderStatusForUser({
								orderNo: orderNo,
								status: '已完成',
							}).then((res) => {
								uni.showToast({
									title: '确认收货成功',
									duration: 2000
								});
								let timer = setTimeout(() =>{
									that.onOrderTab(status);
									clearTimeout(timer);
								},1500)
								
							}).catch((err) => {
								uni.showToast({
									title: err.data.msg||'updateOrderStatusForUser接口异常,请稍后再试',
									icon:'none'
								});
							});
							
						} 
					}
				});
			},
			goIndex(commodityCode){
				let oData = uni.getStorageSync('basicData');
				let data = JSON.parse(oData);
				const basicData = JSON.stringify({
					userOpenid:data.userOpenid,
					commodityCode:commodityCode
				});
				uni.setStorageSync('basicData', basicData);
				uni.navigateTo({
					url:"/pages/GoodsDetails/GoodsDetails?isBuy=1"
				})
			},
			goPay(orderAmount,orderNo){
				uni.navigateTo({
					url:'/pages/CashierDesk/CashierDesk?orderAmount='+orderAmount+'&orderNo='+orderNo
				})
			},
			goFp(orderNo,orderType,isInvoice){
				if(isInvoice=='是'){//查看发票
					uni.navigateTo({
						url:"/pages/InvoiceList/InvoiceDetails/InvoiceDetails?orderNo="+orderNo
					})
				}else{//去开票
					if(!orderNo||!orderType){
						return;
					}
					uni.navigateTo({
						url: '/pages/OrderDetails/OrderDetails?onlylook=0&orderNo=' + orderNo + '&orderType=' + orderType,
					})
				}
				
			},
			
		}
	}
</script>

<style scoped lang="scss">
	@import 'MyOrderList.scss';
</style>