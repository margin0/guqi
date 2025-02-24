<template>
	<view class="page">
		<!-- 自定义 tabbar -->
		   <Tabbar></Tabbar>
		<!-- 用户头部 -->
		<view class="hearder" @click="login">
			<view class="avatar">
				<image :src="loginUserInfo.avatarUrl" mode=""></image>
			</view>
			<view class="name">
				{{loginUserInfo.nickName}}
			</view>	
			
		</view>
		<!-- 用户头部 结束-->
		<!-- 订单信息 -->
		<view class="order">
			<view class="title" @click="goMyOrderList()">
				<!-- //orderType 全部	 0 待付款 1	 待发货	2 待收货	3	 已完成	4 已取消   5	 -->
				<text>我的订单</text>
				<view ><uni-icons type="right" size="12" style="float: right;" color="#fff"></uni-icons></view>
			</view>
		</view>
		
		
		<!-- 我的服务 -->
		<view class="my-service">
			<view class="title">
				<text>我的服务</text>
			</view>
			<view class="service-list">
				<view class="list" @click="goBm('')">
					<view class="thumb">
						<image src="/static/bm-w.png"></image>
					</view>
					<view class="name">
						<text>我的报名</text>
					</view>
				</view>
				<view class="list" @click="MyYt()">
					<view class="thumb">
						<image src="/static/jt-w.png"></image>
					</view>
					<view class="name">
						<text>我的原桶</text>
					</view>
				</view>
				<view class="list"  @click="help">
					<view class="thumb">
						<image src="/static/zx-w.png"></image>
					</view>
					<view class="name">
						<text>客服咨询</text>
					</view>
				</view>
				
			</view>
		</view>
		
		<!-- tabbar -->
		<!-- <TabBar :tabBarShow="4"></TabBar> -->
		<!-- 隐私协议 -->
		<zero-privacy  @disagree='handleNeedAuthorization(true)' @agree='handleNeedAuthorization(false)' :onNeed='false' color='#C0272C'></zero-privacy>
	</view>
</template>

<script>
	import Tabbar from "@/components/Tabbar/tabbar.vue"
	import {
		queryUserInfo,queryUserOpenid
	} from '@/api/api.js';
	export default {
		components: {
		   Tabbar
		 },
			
		data() {
			return {
				isHotline: false,
				list:{
					unpaidCount:'',undeliveredCount:'',daishouhuoCount:""
				},
				loginUserInfo:{
					avatarUrl:'/static/unlogin.png',
					nickName:'注册/登录',
					mobile:''
				},
				tabbarIndex: 2,
			};
		},
		onLoad(){
			
		},
		onShow(){
			let basicData = uni.getStorageSync('basicData');
			let data = JSON.parse(basicData);
			this.loginUserInfo = data;
		},
		methods:{
			//注册登录 
			login(){
				uni.navigateTo({
					url: '/pages/Login/Login'
				})
			},
			//隐私协议
			handleNeedAuthorization(val){
				console.log('是否需要授权',val);
				// false便是已经授权过,或者无需授权
				if(!val){
					// 无需授权,直接执行业务,同理,点击同意也是执行下面的业务
				}else{
					uni.navigateBack()
				}
			},
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
			help(){
				uni.navigateTo({
					url: '/pages/Mine/Help/HelpList'
				})
			},
			/**
			 * 我的订单
			 */
			goMyOrderList(orderType){
				uni.navigateTo({
					url: '/pages/Mine/MyOrderList/MyOrderList'
				})
			},
			//我的原桶
			MyYt(){
				uni.navigateTo({
					url: '/pages/Mine/MyYt/MyYt'
				})
			},
			//goBm我的报名
			goBm(){
				uni.navigateTo({
					url: '/pages/Mine/Help/Help'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'Mine.scss';
</style>
