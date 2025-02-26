<template>
	<view class="page">
		<image src="../../static/bg.png" mode=""></image>
		<view class="pay-submit"  v-if="status=='报名'||status=='预订'||status=='购买'">
			<view class="submit">{{status}}</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				status:'',
				id:''
			};
		},
		onLoad(option){
			console.log(option); //打印出上个页面传递的参数。
			this.status = option.status;
			this.id = option.id;
			
			
		},
		onShow(){
			uni.setNavigationBarTitle({
				title: this.$t('Customize.Product Introduction')
			});
		},
		methods: {
			
			
		}
	}
</script>

<style scoped lang="scss">
	.page {
		height: 100vh;
		width: 100%;
		// display: flex;
		// flex-direction:column;
		// align-items: center;
		// justify-content: center;
		// background-image: url('../../static/bg.png');
		// background-size: cover;
		// background-repeat: no-repeat;
		// background-position: center center;
		image{
			height: 100vh;
			width: 100%;
		}
		.pay-submit{
			position: absolute;
			left: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100rpx;
			
			.submit{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 90%;
				height: 70%;
				background-color: $base;
				color: #FFFFFF;
				border-radius: 100rpx;
				font-size: 26rpx;
				z-index: 999;
			}
		}
	}
</style>