<template>
	<view class="page">
		<view class="price-count-down">
			<view class="price">
				<text class="min">￥</text>
				<text class="max">{{orderAmount}}</text>
				<!-- <text class="min">.00</text> -->
			</view>
			<!-- <view class="count-down">
				<view class="title">支付剩余时间</view>
				<view class="count">
					<text class="time">{{hour}}</text>
					<text class="dot">:</text>
					<text class="time">{{min}}</text>
					<text class="dot">:</text>
					<text class="time">{{sec}}</text>
				</view>
			</view> -->
		</view>
		<!-- 支付方式列表 -->
		<view class="pay-way">
			<text style="padding: 0 4%;color: #666;font-size: 24rpx;">支付方式</text>
			<view class="pay-list">
				<view class="list" v-for="(item,index) in PayList" @click="onPayWay(item,index)" :key="index">
					<view class="pay-type">
						<image :src="item.icon" mode=""></image>
						<text>{{item.name}}</text>
					</view>
					<view class="check">
						<uni-icons type="checkbox-filled" size="26" color="green"></uni-icons>
						<!-- <text class="iconfont" :class="PayWay === index ? 'icon-checked action':'icon-check'"></text> -->
						
					</view>
				</view>
			</view>
		</view>
		<view class="pay-submit">
			<view class="submit" @click="onSubmit">确认付款</view>
		</view>
	</view>
</template>

<script>
	import {
		toPay
	} from '@/api/api.js';
	import {
		throttle
	} from "@/utils/leejs_debounced_throttle.js"
	export default {
		data() {
			return {
				PayList: [{
					icon: '/static/wx_pay.png',
					name: '微信支付',
				}],
				PayWay: 0,
				CountDown: 1000,
				day: 0,
				hour: 0,
				min: 0,
				sec: 0,
				orderAmount: '',
				orderNo: '', //订单号
			};
		},
		onLoad(option) {
			//this.CountDownData();
			console.log(option.orderAmount); //打印出上个页面传递的参数。
			this.orderAmount = option.orderAmount;
			this.orderNo = option.orderNo;
		},
		methods: {
			/**
			 * 支付方式切换点击
			 */
			onPayWay(item, index) {
				this.PayWay = index;
				this.PayPirce = `${item.name}￥299.00`
			},
			/**
			 * 倒计时
			 */
			CountDownData() {
				setTimeout(() => {
					this.CountDown--;
					this.day = parseInt(this.CountDown / (24 * 60 * 60))
					this.hour = parseInt(this.CountDown / (60 * 60) % 24);
					this.min = parseInt(this.CountDown / 60 % 60);
					this.sec = parseInt(this.CountDown % 60);
					if (this.CountDown <= 0) {
						return
					}
					this.CountDownData();
				}, 1000)
			},
			/**
			 * 支付点击
			 */
			onSubmit: throttle(function() {
				let basicData = uni.getStorageSync('basicData');
				let data = JSON.parse(basicData);
				let that = this;
			
				uni.showToast({
					title: '支付成功'
				});
				return;
				//queryOrderInfoByOrderNo
				toPay({
					orderNo: this.orderNo,
				}).then((res) => {
					console.log(res)
					//调用微信官方支付接口弹出付款界面,输入密码扣款
					wx.requestPayment({
						timeStamp: res.timeStamp, //后端返回的时间戳
						nonceStr: res.nonceStr, //后端返回的随机字符串
						package: res.package, //后端返回的prepay_id
						signType: res.signType, //后端签名算法,根据后端来,后端MD5这里即为MD5
						paySign: res.paySign, //后端返回的签名
						success(res) {
							console.log('用户支付扣款成功', res)
							uni.showToast({
								title: '支付成功'
							});
							let timer = setTimeout(() => {
								
								uni.redirectTo({
									url: '/pages/PayResult/PayResult?orderAmount=' +
										that.orderAmount + '&orderNo=' + that
										.orderNo
								})
								clearTimeout(timer);
							}, 1500)
						},
						fail(res) {
							console.log('用户支付扣款失败', res)
							//requestPayment:fail cancel
							if(res.errMsg=='requestPayment:fail cancel'){
								uni.showToast({
									//title: '支付失败：'+res.errMsg || '支付失败：wx.requestPayment接口异常,请稍后再试',
									title: '支付取消',
									icon: 'none'
								});
								let timer = setTimeout(() =>{
									//pages/OrderDetails/OrderDetails
									uni.redirectTo({
										url: '/pages/OrderDetails/OrderDetails?orderNo=' +
											that.orderNo + '&orderType=待付款&onlylook=1'
									})
									clearTimeout(timer);
								},1500)
							}else{
								uni.showToast({
									//title: '支付失败：'+res.errMsg || '支付失败：wx.requestPayment接口异常,请稍后再试',
									title: '支付失败：'+res.errMsg || '支付失败：wx.requestPayment接口异常,请稍后再试',
									icon: 'none'
								});
							}
							
						}
					})

				}).catch((err) => {
					console.log("支付失败", err)
					uni.showToast({
						title: err.data.msg || 'toPay接口异常,请稍后再试',
						icon: 'none'
					});
				});
			}, 2000),

		}
	}
</script>

<style scoped lang="scss">
	@import 'CashierDesk.scss';
</style>