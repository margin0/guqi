<template>
	<view class="page">
		<!-- 地址列表 -->
		<view class="address-list">
			<view class="list" v-for="(item,index) in list" :key="index"  @click.stop="goback(item)">
				<view class="name-phone">
					<view class="name">
						<text class="one-omit">{{item.recipientName}}</text>
					</view>
					<view class="phone">
						<text>{{item.phoneNumber}}</text>
						<!-- <text class="tag" v-if="item.tag">默认</text> -->
						<!-- <text class="tag blue">公司</text> -->
					</view>
				</view>
				<view class="address-edit">
					<view class="address">
						<text>{{item.province}}{{item.city}}{{item.district}}{{item.detailedAddress}}</text>
					</view>
					<view class="edit" @click.stop="onAddressEdit('编辑地址',item)">
						<text class="iconfont icon-edit1"></text>
					</view>
				</view>
			</view>
			<view class="nodatas" v-if="list.length==0">
				<image src="../../static/nodatas.png" mode=""></image>
			</view>
		</view>
		<!-- 添加地址 -->
		<view class="add-address">
			<view class="btn" @click="onAddressEdit('新增地址')">
				<text>新增地址</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryUserAddressList
	} from '@/api/api.js';
	export default {
		data() {
			return {
				orderType:'',
				from:'',
				list:[
					// {
					// 	recipientName:'张章',
					// 	phoneNumber:'18356538280',
					// 	city:'安徽省合肥市蜀山区',
					// 	detailedAddress:'安徽省合肥市蜀山区环球金融广场融广场B座1701',
					// 	id:'340104',
					// },
				]
			};
		},
		onShow(){
			let basicData = uni.getStorageSync('basicData');
			let data = JSON.parse(basicData);
			queryUserAddressList({
				userOpenid: data.userOpenid,
			}).then((res) => {
				console.log(res);
				this.list = res;	
			}).catch((err) => {
				uni.showToast({
					title: err.data.msg||'系统异常,请稍后再试',
					icon:'none'
				});
				
			});
		},
		onLoad(option){
			 console.log(option); //打印出上个页面传递的参数。
			 this.orderType = option.orderType;
			 this.orderNo =  option.orderNo;
			 option.from?this.from = option.from:this.from = '';
		},
		methods:{
			/**
			 * 编辑地址点击
			 */
			onAddressEdit(type,e){
				uni.navigateTo({
					url: '/pages/AddressEdit/AddressEdit?type=' + type +"&abInfo="+JSON.stringify(e),
				})
			},
			//带这地址信息返回订单详情页
			goback(abInfo){
				if(this.from==''){
					return
				}
				uni.navigateTo({
					url: '/pages/OrderDetails/OrderDetails?onlylook=0&abInfo='+JSON.stringify(abInfo)+'&orderType='+this.orderType+'&from=AddressList'+'&orderNo='+this.orderNo
				})
				
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'AddressList.scss';
</style>
