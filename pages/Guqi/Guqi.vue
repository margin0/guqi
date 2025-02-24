<template>
	<view class="page pages">
		<z-paging ref="paging" v-model="dataList" @query="queryList">
			<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
			<!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs -->
			<template #top>
				<view class="order-tab">
				  <view
				    v-for="(status, index) in orderStatusList"
				    :key="index"
				    class="tab"
				    :class="{'action': orderType === status}"
				    @click="onOrderTab(status)"
				  >
				    <text>{{ status }}</text>
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
					<view class="thumb"   @click="goDetls(item.orderNo,item.status,1)">
						<image src="../../static/bk2.png" mode=""></image>
					</view>
					<view class="title goldenFont" @click="goDetls(item.orderNo,item.status,1)">
						威士忌知识{{index+1}}
					</view>
				</view>
			</view>
		</z-paging>
		<!-- 自定义 tabbar -->
		 <Tabbar></Tabbar>
	</view>
</template>

<script>
	import Tabbar from "@/components/Tabbar/tabbar.vue"
	import {
		queryOrderListForUser,updateOrderStatusForUser
	} from '@/api/api.js';
	export default {
		components: {
		   Tabbar 
		 },
			
		data() {
			return {
				orderType: '威士忌知识', // 当前选中的订单状态
				orderStatusList: ['威士忌知识', '投资分析', '存储方案','品牌故事'],
				dataList: [],
			};
		},
		onLoad() {
			console.log(1)
			//orderType 全部	 0 待付款 1	 待发货	2 待收货	3	 已完成	4 已取消   5	
			this.orderType = '威士忌知识';
			this.pageNum = 1;
			//this.queryList(this.pageSize,this.pageNum,this.orderType);
		},
		onShow(){
			// this.queryList(1,10)
		},
		methods: {
		
			queryList(pageNo, pageSize) {
				// 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
				// 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				// 模拟请求服务器获取分页数据，请替换成自己的网络请求
				let basicData = uni.getStorageSync('basicData')||'{}';
				let data = JSON.parse(basicData);
				data.userOpenid = 'ozrrv6xSExsyffkhJXCotOpddM7o';
				const params = {
					pageNo: pageNo,
					pageSize: 10,
					status:this.orderType=='威士忌知识'?'':this.orderType,
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
				uni.navigateTo({
					url: '/pages/Guqi/GuqiDetails/GuqiDetails',
				})
			}
		
			
		}
	}
</script>

<style scoped lang="scss">
	@import 'Guqi.scss';
</style>