<template>
	<view class="page">
		<!-- 发票抬头列表 -->
		<view class="address-list">
			<view class="list" v-for="(item,index) in list" :key="index"  @click.stop="goback(item)">
				<view class="name-phone">
					<view class="name">
						<text class="one-omit">{{item.invoiceTitle}}</text>
					</view>
					<view class="phone">
						<text class="tag  blue" v-if="item.invoiceType=='个人'">个人</text>
						<text class="tag" v-if="item.invoiceType=='单位'">单位</text>
					</view>
				</view>
				<view class="address-edit">
					<view class="address">
						<text v-if="item.invoiceType=='单位'">税号：{{item.taxNumber}}</text>
					</view>
					<view class="edit" @click.stop="onInvoiceEdit('编辑发票抬头',item)">
						<text class="iconfont icon-edit1"></text>
					</view>
				</view>
			</view>
			<view class="nodatas" v-if="list.length==0">
				<image src="../../static/nodatas.png" mode=""></image>
			</view>
		</view>
		<!-- 添加发票抬头 -->
		<view class="add-address">
			<view class="btn" @click="onInvoiceEdit('新增发票抬头')">
				<text>新增发票抬头</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryUserInvoiceList
	} from '@/api/api.js';
	export default {
		data() {
			return {
				orderType:'',
				orderNo:'',
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
			queryUserInvoiceList({
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
			 * 编辑发票抬头点击
			 */
			onInvoiceEdit(type,e){
				uni.navigateTo({
					url: '/pages/InvoiceEdit/InvoiceEdit?type=' + type +"&fpInfo="+JSON.stringify(e),
				})
			},
			//带这发票抬头信息返回订单详情页
			goback(fpInfo){
				if(this.from==''){
					return
				}
				uni.navigateTo({
					url: '/pages/OrderDetails/OrderDetails?onlylook=0&fpInfo='+JSON.stringify(fpInfo)+'&orderType='+this.orderType+'&from=InvoiceList&orderNo='+this.orderNo
				})
				
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'InvoiceList.scss';
</style>
