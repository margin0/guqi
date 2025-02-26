<template>
	<view class="">
		古奇威士忌购买协议
	</view>
</template>

<script>
	export default {
	onShow(){
		uni.setNavigationBarTitle({
			title: this.$t('Customize.Guqi Whiskey Purchase Agreement')
		});
		this.queryOrderInfoByOrderNo()
	},
	}
</script>

<style>
</style>