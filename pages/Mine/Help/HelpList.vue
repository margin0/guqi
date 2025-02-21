<template>
	<view class="page">
	  <uni-collapse   class="clos" accordion v-model="accordionVal" @change="change">
	    <uni-collapse-item
	      v-for="(item, index) in accordionItems"
	      :key="index"
	      :title="item.title"
		  class="clos"
	    >
	      <view class="content">
	        <text class="text">{{ item.content }}</text>
	      </view>
	    </uni-collapse-item>
	  </uni-collapse>
	  <!-- 在线咨询 -->
	  <view class="add-address">
	  	<view class="btn" @click="online()">
	  		<text>在线咨询</text>
	  	</view>
	  </view>
	</view>
</template>
<script>
	export default {
		components: {},
		data() {
		  return {
		    accordionVal: null, // 当前展开的项的索引
		    accordionItems: [
		      {
		        title: "单桶限量发售是否有限购规则?",
		        content: "单桶限量发售活动，每个手机号限购2桶。"
		      },
		      {
		        title: "如何定制单桶，有什么流程?",
		        content: "如何定制单桶，有什么流程?"
		      },
		      {
		        title: "付款后是否会提供收据?",
		        content: "付款后是否会提供收据?付款后是否会提供收据?付款后是否会提供收据?付款后是否会提供收据?付款后是否会提供收据?付款后是否会提供收据?付款后是否会提供收据?"
		      }
		    ]
		  };
		},
		methods: {
			change(val) {
			    console.log("222手风琴展开/折叠的索引:", val);
			    this.accordionVal = val;
			  }
			,
			online(){
				console.log("在线咨询");
			}
		}
	}
</script>
<style scoped lang="scss">
	.page{
		height: 100vh;
	}
	.example-body {
		flex-direction: column;
		flex: 1;
	}

	.content {
		padding: 26rpx;
	}

	.text {
		font-size: 26rpx;
		color: $baseFontColor;
		line-height: 40rpx;
	}
	.clos{
		background-color: $baseBackgroundColor !important;
	}
	/deep/ .uni-collapse-item__title-box {
		background-color: $baseBackgroundColor !important;
		color: #fff;
	}
	/deep/  .uni-collapse-item-border {
		border-bottom: 2rpx solid #eee;
	}

	.add-address{
		position: fixed;
		left: 0;
		bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		.btn{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 80%;
			height: 70rpx;
			background: $base;
			border-radius: 70rpx;
			//box-shadow: 0 10rpx 10rpx $base;
			text{
				font-size: 28rpx;
				color: #FFFFFF;
			}
		}
	}
</style>


