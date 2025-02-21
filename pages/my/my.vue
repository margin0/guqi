<template>
	<view class="page">
		<!-- 订单信息 -->
		<view class="order">
			<view class="title">
				<!-- //orderType 全部	 0 待付款 1	 待发货	2 待收货	3	 已完成	4 已取消   5	 -->
				<text>我的订单</text>
				<view @click="go('')">全部<uni-icons type="right" size="12" style="float: right;"></uni-icons></view>
			</view>
			<view class="order-info">
				<!-- {unpaidCount: 21, daishouhuoCount: 0, undeliveredCount: 0} -->
				<view class="list" @click="go('待付款')">
					<view class="icon">
						<!-- <text class="iconfont icon-daifukuan"></text> -->
						<image src="../../static/order/dfk.png" mode=""></image>
						<text class="num" v-if="list.unpaidCount">{{formatCount(list.unpaidCount)}}</text>
					</view>
					<view class="title">
						<text>待付款</text>
					</view>
				</view>
				<view class="list" @click="go('待发货')">
					<view class="icon">
						<!-- <text clas s="iconfont icon-daifahuo"></text> -->
						<image src="../../static/order/dfh.png" mode=""></image>
						<text class="num" v-if="list.undeliveredCount">{{formatCount(list.undeliveredCount)}}</text>
					</view>
					<view class="title">
						<text>待发货</text>
					</view>
				</view>
				<view class="list" @click="go('待收货')">
					<view class="icon">
						<!-- <text class="iconfont icon-daishouhuo"></text> -->
						<image src="../../static/order/dsh.png" mode=""></image>
						<text class="num" v-if="list.daishouhuoCount">{{formatCount(list.daishouhuoCount)}}</text>
					</view>
					<view class="title">
						<text>待收货</text>
					</view>
				</view>
				<view class="list" @click="go('已完成')">
					<view class="icon">
						<!-- <text class="iconfont icon-duihao"></text> -->
						<image src="../../static/order/ysh.png" mode=""></image>
						<!-- <text class="num">22</text> -->
					</view>
					<view class="title">
						<text>已完成</text>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 我的服务 -->
		<view class="my-service">
			<view class="title">
				<text>我的服务</text>
			</view>
			<view class="service-list">
				<view class="list" @click="goDk('')">
					<view class="thumb">
						<image src="/static/dw.png"></image>
					</view>
					<view class="name">
						<text>地址簿</text>
					</view>
				</view>
				<view class="list" @click="goFp('')">
					<view class="thumb">
						<image src="/static/fp.png"></image>
					</view>
					<view class="name">
						<text>发票抬头</text>
					</view>
				</view>
				<view class="list" @click="phonecall">
					<view class="thumb">
						<image src="/static/kfrx.png"></image>
					</view>
					<view class="name">
						<text>客服热线</text>
					</view>
				</view>
				
			</view>
		</view>
		
		<!-- tabbar -->
		<!-- <TabBar :tabBarShow="4"></TabBar> -->
	</view>
</template>

<script>
	import {
		queryUserInfo,queryUserOpenid
	} from '@/api/api.js';
	export default {
		data() {
			return {
				isHotline: false,
				list:{
					unpaidCount:'',undeliveredCount:'',daishouhuoCount:""
				}
			};
		},
		onLoad(){
			
		},
		onShow(){
			let that=this;
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
								//commodityCode: 'f9024ba9-ad8b-4b26-b148-afdef5009846', //272cb24d-2438-416c-999e-61b4169b45e5
								//commodityCode:'1122c536-b406-4adb-a27c-86e4bf6ce0a4',//f9024ba9-ad8b-4b26-b148-afdef5009846
							});
							uni.setStorageSync('basicData', basicData);
							that.queryUserInfo()
			
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
		},
		methods:{
			queryUserInfo(){
				let basicData = uni.getStorageSync('basicData');
				let data = JSON.parse(basicData);
				queryUserInfo({
					userOpenid: data.userOpenid,
				}).then((res) => {
					this.list = res.countMap;
								if(res.emailAddress){
									let emailAddress = res.emailAddress;
									uni.setStorageSync('emailAddress', emailAddress);
								}
								
				}).catch((err) => {
					uni.showToast({
						title: 'queryUserInfo接口异常,请稍后再试'||err.data.msg,
						icon:'none'
					});
				});
			},
			formatCount(count) {
			  return count > 99 ? '99+' : count;
			},
			//拨打客服电话
			phonecall(){
				uni.makePhoneCall({
				   phoneNumber: '400-8877519'
				});
			},
			/**
			 * 跳转
			 */
			go(orderType){
				uni.navigateTo({
					url: '/pages/MyOrderList/MyOrderList?orderType='+orderType
				})
			},
			//地址簿
			goDk(orderType){
				uni.navigateTo({
					url: '/pages/AddressList/AddressList?orderType='+orderType
				})
			},
			//地址簿
			goFp(){
				uni.navigateTo({
					url: '/pages/InvoiceList/InvoiceList'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'my.scss';
</style>
