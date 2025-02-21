<template>
	<view class="page">
		<view class="address-input">
			<!-- <view class="list-input">
				<view class="option-group">
				  <text class="option" @click="selectOption('单位')" :class="{ 'selected': ab.invoiceType === '单位' }">单位</text>
				  <text class="option" @click="selectOption('个人')" :class="{ 'selected': ab.invoiceType === '个人' }">个人</text>
				</view>
			</view> -->
			<!-- 
			 1.发票抬头、税号、收票人邮箱:必填;
			 2.单位地址、电话号码、开户银行、银行账户:选填
			 -->
			<view class="list-input">
				<view class="title">
					<text class="bx">发票抬头</text>
				</view>
				<view class="content">
					<input type="text" placeholder="请填写发票抬头" v-model="ab.invoiceTitle">
				</view>
			</view>
			<view v-if="ab.invoiceType=='单位'">
				<view class="list-input">
					<view class="title">
						<text class="bx">税号</text>
					</view>
					<view class="content">
						<input type="text" placeholder="请填写税号" v-model="ab.taxNumber">
					</view>
				</view> 
				<view class="list-input">
					<view class="title">
						<text class="">单位地址</text>
					</view>
					<view class="content">
						<input type="text" placeholder="请填写单位地址" v-model="ab.companyAddress">
					</view>
				</view>
				<view class="list-input">
					<view class="title">
						<text>单位电话</text>
					</view>
					<view class="content">
						<input type="tel" placeholder="请填写收单位电话"  v-model="ab.phoneNumber">
					</view>
				</view>
				<view class="list-input">
					<view class="title">
						<text class="">开户银行</text>
					</view>
					<view class="content">
						<input type="text" placeholder="请填写开户银行" v-model="ab.bankName">
					</view>
				</view>
				<view class="list-input">
					<view class="title">
						<text class="">银行账号</text>
					</view>
					<view class="content">
						<input type="text" placeholder="请填写银行账号" v-model="ab.bankAccount">
					</view>
				</view>
			</view>
			
		</view>
		<view class="footer-btn">
			<view class="btn" @click="save">
				<text>保存</text>
			</view>
			<view class="btn del" v-if="addressType=='编辑发票抬头'" @click="del">
				<text>删除</text>
			</view>
		</view>
		<zero-privacy  @disagree='handleNeedAuthorization(true)' @agree='handleNeedAuthorization(false)' :onNeed='false' color='#C0272C'></zero-privacy>
	</view>
</template>

<script>
	import {
		createUserInvoice,updateUserInvoice,deleteUserInvoiceById
	} from '@/api/api.js';
	export default {
		data() {
			return {
			  ab:{
				  invoiceType: '单位',//"发票类型(个人/单位)",
				  invoiceTitle: '',//"发票抬头",
				  taxNumber: '',//"税号(单位必填)",
				  companyAddress: '',//"公司地址(单位必填)",
				  phoneNumber: '',//"电话号码(单位必填)",
				  bankName: '',//"开户银行(单位必填)",
				  bankAccount: '',//"银行账号(单位必填)"
				  id:''
			  },
			  addressType:''
			};
		},
		onLoad(params) {
			console.log("@@@@"+params)
			this.addressType = params.type;//新增or编辑
			uni.setNavigationBarTitle({
				title: this.addressType
			})
			//编辑 带出上个页面的参数
			if(this.addressType=='编辑发票抬头'){
				this.ab = JSON.parse(params.fpInfo);
			}
		},
		methods:{
			handleNeedAuthorization(val){
				console.log('是否需要授权',val);
				// false便是已经授权过,或者无需授权
				if(!val){
					// 无需授权,直接执行业务,同理,点击同意也是执行下面的业务
				}else{
					uni.navigateBack()
				}
			},
			 selectOption(option) {
			  this.ab.invoiceType = option;
			},
			
			/**
			 * 保存地址
			 */
			save(){
				if(this.ab.invoiceTitle ==''){
					uni.showToast({title: '请输入发票抬头',icon: 'none'});
					return false
				}else if(this.ab.taxNumber==''&&this.ab.invoiceType=='单位'){
					uni.showToast({title: '请输入正确的税号',icon: 'none'});
					return false
				}
				// 存储数据
				let basicData = uni.getStorageSync('basicData');
				let data = JSON.parse(basicData);
				if (this.addressType=='编辑发票抬头') {
					updateUserInvoice({
						userOpenid: data.userOpenid,
						invoiceType:this.ab.invoiceType,//"发票类型(个人/单位)",
						invoiceTitle: this.ab.invoiceTitle,//"发票抬头",
						taxNumber: this.ab.taxNumber,//"税号(单位必填)",
						companyAddress:this.ab.companyAddress,//"公司地址(单位必填)",
						phoneNumber: this.ab.phoneNumber,//"电话号码(单位必填)",
						bankName: this.ab.bankName,//"开户银行(单位必填)",
						bankAccount: this.ab.bankAccount,//"银行账号(单位必填)"
						id:this.ab.id
					}).then((res) => {
						uni.showToast({
							title: '保存成功',
							duration: 2000
						});
						var timer = setInterval(()=> {
						  uni.navigateBack()
						  clearInterval(timer)
						},2000)
								
					}).catch((err) => {
						uni.showToast({
							title: err.data.msg||'updateUserInvoice接口异常,请稍后再试',
							icon:'none'
						});
						
					});
				} else{
					createUserInvoice({
						userOpenid: data.userOpenid,
						invoiceType:this.ab.invoiceType,//"发票类型(个人/单位)",
						invoiceTitle: this.ab.invoiceTitle,//"发票抬头",
						taxNumber: this.ab.taxNumber,//"税号(单位必填)",
						companyAddress:this.ab.companyAddress,//"公司地址(单位必填)",
						phoneNumber: this.ab.phoneNumber,//"电话号码(单位必填)",
						bankName: this.ab.bankName,//"开户银行(单位必填)",
						bankAccount: this.ab.bankAccount,//"银行账号(单位必填)"
					}).then((res) => {
						uni.showToast({
							title: '保存成功',
							duration: 2000
						});
						var timer = setInterval(()=> {
						  uni.navigateBack()
						  clearInterval(timer)
						},1500)
								
					}).catch((err) => {
						uni.showToast({
							title: err.data.msg||'createUserInvoice接口异常,请稍后再试',
							icon:'none'
						});
					});
				}
				
			},
			/**
			 * 删除
			 */
			del(){
				let that = this;
				uni.showModal({
					title: '',
					content: '立即删除该发票抬头？',
					confirmColor:'#C0272C',//确定按钮颜色
					success: function (res) {
						if (res.confirm) {
							deleteUserInvoiceById({
								id:that.ab.id
							}).then((res) => {
								uni.showToast({
									title: '删除成功',
									duration: 1500
								});
								var timer = setInterval(()=> {
								  uni.navigateBack()
								  clearInterval(timer)
								},2000)
										
							}).catch((err) => {
								uni.showToast({
									title: err.data.msg||'deleteUserInvoiceById接口异常,请稍后再试',
									icon:'none'
								});
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'InvoiceEdit.scss';
	
	.option-group {
	  display: flex;
	  // justify-content: space-between;
	  width: 100%;
	  outline:none;
	}
	.option {
	  background-color: #ccc;
	  outline: none;
	  cursor: pointer;
	  font-size: 26rpx;
	  padding: 4px 18px;
	  border-radius: 30rpx;
	 -webkit-tap-highlight-color:rgba(0,0,0,0);

	  // border: 1px solid $base;
	}
	.option:focus{
			outline:none;
		}
	.option:last-child{
	  margin-left: 50rpx;
	}
	.selected {
	  border-color: $base;
	  background-color: $base;
	  color: white;
	  outline:none;
	}
	
</style>
