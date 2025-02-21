<template>
	<view class="container page">
		<view class="top">
			<text>立即报名，开启您的威士忌之旅！</text>
			<text>报名审核通过后，将解锁威士忌收藏新境界</text>
		</view>
		<view class="example">
			<!-- 基础用法，不包含校验规则 -->
			<uni-forms ref="baseForm" :modelValue="baseFormData">
				<uni-forms-item label="您的姓名" required name="name">
					<uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="证件类型" required  name="certificate">
					<uni-data-select
					      v-model="baseFormData.certificate"
					      :localdata="range"
					      @change="Zjchange"
						  :clear="false"
					    >
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="证件号码" required name="certificateNo">
					<uni-easyinput v-model="baseFormData.certificateNo" placeholder="请输入证件号码" />
				</uni-forms-item>
				<uni-forms-item label="联系电话" required name="phoneNo">
					<uni-easyinput v-model="baseFormData.phoneNo" placeholder="请输入联系电话" />
				</uni-forms-item>
				<uni-forms-item label="企业名称" name="company">
					<uni-easyinput v-model="baseFormData.company" placeholder="请输入企业名称" />
				</uni-forms-item>
				<uni-forms-item label="您的职业" name="career">
					<uni-easyinput v-model="baseFormData.career" placeholder="请输入您的职业" />
				</uni-forms-item>
				<uni-forms-item label="电子邮箱" name="email">
					<uni-easyinput v-model="baseFormData.email" placeholder="请输入电子邮箱" />
				</uni-forms-item>
			
				<uni-forms-item class="oth" name="reason">
					<text>您购买威士忌是为了？</text>
					<uni-data-checkbox v-model="baseFormData.reason" multiple :localdata="reasons" />
				</uni-forms-item>
				<uni-forms-item class="oth" name="reference">
					<text>您的推荐人是？</text>
					<uni-data-checkbox v-model="baseFormData.reference" :localdata="references" />
				</uni-forms-item>
			</uni-forms>
			<view type="primary" class="button" @click="submit()">提交</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 value: '身份证',
				  range: [
					{ value: '身份证', text: "身份证" },
					{ value: '护照', text: "护照" },
					{ value: '其他', text: "其他" },
				  ],
				// 基础表单数据
				baseFormData: {
					name: '',
					certificate:'身份证',
					certificateNo:'',
					introduction: '',
					reference: '无',
					reason: ['投资'],
					email:''
				},
				// 推荐人
				references: [{
					text: '无',
					value: "无"
				}, {
					text: '张三',
					value: "张三"
				}, {
					text: '李四',
					value: "李四"
				}],
				// 购买理由
				reasons: [{
					text: '投资',
					value: "投资"
				}, {
					text: '赠送',
					value: "赠送"
				}, {
					text: '自饮',
					value: "自饮"
				}, {
					text: '其他',
					value: "其他"
				}],
				// 校验规则
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					certificateNo: {
						rules: [{
							required: true,
							errorMessage: '证件号码不能为空'
						},{
						validateFunction:function(rule,value,data,callback){
							//判断 证件类型正则
							const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
							if (data.certificate=='身份证'&&!idCardRegex.test(value)) {
								callback('请输入正确的身份证号码')
							}
							return true
						}
					}]
					},
					phoneNo: {
						rules: [{
							required: true,
							errorMessage: '联系电话不能为空'
						}]
					},
					email:  {
						rules: [{
						validateFunction:function(rule,value,data,callback){
							const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
							if (!emailRegex.test(value)) {
								callback('请输入正确的电子邮箱')
							}
							return true
						}
					}]
					},
					
				},
			}
		},
		computed: {
			// 处理表单排列切换
			alignment() {
				if (this.current === 0) return 'left'
				if (this.current === 1) return 'top'
				return 'left'
			}
		},
		onLoad() {},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			this.$refs.baseForm.setRules(this.rules)
		},
		methods: {
			//证件类型切换
			Zjchange(e) {
			  console.log("e:", e);
			},
			onClickItem(e) {
				console.log(e);
				this.current = e.currentIndex
			},
			submit() {
				this.$refs.baseForm.validate().then(res => {
					console.log('success', res);
					uni.redirectTo({
						url: '/pages/Customize/SignUp/SignSucess'
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.container,.page{
		padding: 0 30rpx;
		height: 100vh;
		// width: 100%;
		// display: flex;
		// flex-direction:column;
		// align-items: center;
		// justify-content: center;
		// background-image: url('../../../static/wsj.png');
		// background-size: cover;
		// background-repeat: no-repeat;
		// background-position: center center;
	}
	.top{
		color: #fff;
		text:first-child{
			font-size: 30rpx;
			padding: 20rpx 0;
			display: inline-block;
			font-weight: bold;
		}
		text:last-child{
			font-size: 26rpx;
			padding:0 0 20rpx 0 ;
			display: inline-block;
		}
	}
	.example {
		width: 100%;
		border: 1px solid #e2e2e2;
		background-color: #fff;
		padding:30rpx 20rpx;
		border-radius: 15rpx;
	}
	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 70rpx;
		width: 90%;
		margin-left: 5%;
		background-color: $base;
		font-size: 26rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;border-radius: 100rpx;
	}
	 
</style>


