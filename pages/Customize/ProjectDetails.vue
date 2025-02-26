<template>
	<view class="page">
		<image src="../../static/bg.png" mode=""></image>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		onShow(){
			uni.setNavigationBarTitle({
				title: this.$t('Customize.Project Introduction')
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
	}
</style>