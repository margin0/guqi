<template>
	<view class="page">
		<!-- 
		1.开票进度:开具中、已开具;
		2.发票内容:商品名称
		3.发票抬头、税号、收票人邮箱:购买人填写的数据4.订单编号、开票金额、下单时间:订单的信息;
		5.发票类型:电子普通发票
		6.开票说明 
		 -->
		<view class="order-info sw">
			<view class="info-list">
				<view class="list">
					<view class="title">开票进度</view>
					<view class="content">
						<text class="jdstatus"
						:style="{backgroundColor: list.invoiceStatus == '开具中' ? '#F59A23' : list.invoiceStatus == '已开具' ? '#1ABC9C' : 'white'}"
						>{{list.invoiceStatus}}</text>
					</view>
				</view>
				<view class="list">
					<view class="title">发票内容</view>
					<view class="content">
						<text>{{list.productName}}</text>
					</view>
				</view>
				<view class="list">
					<view class="title">发票抬头</view>
					<view class="content">
						<text>{{list.invoiceTitle}}</text>
					</view>
				</view>
				<view class="list" v-if="list.invoiceType!='个人'">
					<view class="title">税号</view>
					<view class="content">
						<text>{{list.taxNumber}}</text>
					</view>
				</view>
				<view class="list">
					<view class="title">收票人邮箱</view>
					<view class="content">
						<text>{{list.emailAddress}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 取货方式   -->
		<view class="order-info sw">
			<view class="info-list">
				<view class="list">
					<view class="title">订单编号</view>
					<view class="content">
						<text>{{orderNo}}</text>
						<!-- <text class="btn" @click="copy">复制</text> -->
					</view>
				</view>
				<view class="list">
					<view class="title">开票金额</view>
					<view class="content">
						<text>{{list.orderAmount}}</text>
						<!-- <text class="btn" @click="copy">复制</text> -->
					</view>
				</view>
				<view class="list">
					<view class="title">下单时间</view>
					<view class="content">
						<text>{{list.createdate}}</text>
						<!-- <text class="btn" @click="copy">复制</text> -->
					</view>
				</view>
				<view class="list">
					<view class="title">发票类型</view>
					<view class="content">
						<text>电子普通发票</text>
						<!-- <text class="btn" @click="copy">复制</text> -->
					</view>
				</view>
			</view>
		</view>
	
		<!-- 订单信息 -->
		<view class="order-info sw">
			<view class="info-list kpsm">
				<view class="title">开票说明</view>
				<view class="words">
					<text>
						古奇威士忌线上商城的所有发票由门店提供，发票开具金额为实际支付金额，发票内容默认为商品明细。
					</text>
					<text>				
						电子发要是税务局认可的有效付款凭证，电子发票真实有效的合法发票，与传统纸质发票具有同等法律效力，暂只支持增值税普通电子发票。				
					</text>
					<text>
						电子发票将在门店发货的10个工作日内开具，届时您在收票人邮箱查看并下载发票，如未收到，请联系客服。
					</text>
					
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryOrderInvoiceInfo
	} from '@/api/api.js';
	export default {
		data() {
			return {
				orderType:'',//订单状态：未付款、待发货、待收货、已完成、已取消
				//isFirst:1,//是否首次填写地址，根据用户的地址列表有无数据，默认第一条
				list:null,
				status:'开具中',
				orderNo:''
			};
		},
		components: {
			
		},
		onShow(){
			//this.getAdss()
		},
		onLoad(option){
			console.log(option); //打印出上个页面传递的参数。
			this.orderType = option.orderType;
			this.orderNo = option.orderNo;
			let basicData = uni.getStorageSync('basicData');
			let data = JSON.parse(basicData);
			const params = {
				orderNo:this.orderNo,
				userOpenid: data.userOpenid,
			}
			queryOrderInvoiceInfo(params).then((res) => {
				//debugger
				console.log('成功 ', res);
				this.list = res;
				
			}).catch((err) => {
				uni.showToast({
					title: err.data.msg||'queryOrderInvoiceInfo接口异常,请稍后再试',
					icon:'none'
				});
				
			});
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	@import 'InvoiceDetails.scss';
</style>
