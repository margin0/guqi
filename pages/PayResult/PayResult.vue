<template>
	<view class="page">
		<view class="pay-price">
			<view class="icon">
				<image src="/static/pay_success.png" mode=""></image>
				<view style="color:#06A414;">支付成功</view>
			</view>
			
		</view>
		<view class="price-data" style="text-align: center;">
			<view class="list">
				<view class="content" style="font-size: 24rpx;">微信支付</view>
			</view>
			<view class="list">
				<view class="title"  style="font-size:52rpx;color: #000;font-weight: bold;margin-top: 30rpx;"><text  style="font-size: 32rpx;">￥</text>{{orderAmount}}</view>
			</view>
		</view>
		<!-- 跳转按钮 -->
		<view class="skip-btn">
			<view class="btn" @click="onSkip">填写收货地址</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderAmount:'',
				orderNo:''
			}
		},
		onLoad(option){
			//this.CountDownData();
			 //console.log(option.orderAmount); //打印出上个页面传递的参数。
			this.orderAmount = option.orderAmount;
			this.orderNo = option.orderNo;
		},
		methods: {
			/**
			跳转详情
			 */
			onSkip(){
				if(!this.orderNo){return}
				uni.redirectTo({
					url: '/pages/OrderDetails/OrderDetails?onlylook=0&orderType=待发货&orderNo='+this.orderNo
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'PayResult.scss';
</style>
