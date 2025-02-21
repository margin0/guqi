<template>
	<view class="page">
		<view class="address-input">
			<view class="list-input">
				<view class="title">
					<text>收货人</text>
				</view>
				<view class="content">
					<input type="text" placeholder="请填写收货人姓名" v-model="recipientName">
				</view>
			</view>
			<view class="list-input">
				<view class="title">
					<text>手机号</text>
				</view>
				<view class="content">
					<input type="tel" placeholder="请填写收货人手机号"  v-model="phone">
				</view>
			</view>
			<view class="list-input" @click="openCp">
				<view class="title">
					<text>所在地区</text>
				</view>
				<view class="content" >
					<input type="text" placeholder="请选择所在地区"  disabled='true' v-model="ab.name" >
					<uni-icons type="right" size="12" style="float: right;"></uni-icons>
				</view>
			</view>
			<view class="list-textarea">
				<view class="title">
					<text>详细地址</text>
				</view>
				<view class="content">
					<textarea type="tel" placeholder="请填写详细地址"  v-model="area"/>
				</view>
			</view>
			<!-- <view class="list-input">
				<view class="title">
					<text>默认地址</text>
				</view>
				<view class="content" >
					<switch class="red sm" color="#C0272C !important" :checked="status" @change="handleSwitchChange"></switch>
				</view>
			</view> -->
		</view>
		<!-- 智能识别 -->
		<!-- <view class="tag-default">
			
			<view class="default-address">
				<view class="title">
					<text>默认地址</text>
				</view>
				<view class="switch-default">
					1
				</view>
			</view>
		</view> -->
		<view class="footer-btn">
			<view class="btn" @click="save">
				<text>保存</text>
			</view>
			<view class="btn del" v-if="addressType=='编辑地址'" @click="del">
				<text>删除</text>
			</view>
		</view>
		<cityPicker :column="column" :default-value="defaultValue" :mask-close-able="maskCloseAble" @confirm="confirm" @cancel="cancel" :visible="visible"/>
		<zero-privacy  @disagree='handleNeedAuthorization(true)' @agree='handleNeedAuthorization(false)' :onNeed='false' color='#C0272C'></zero-privacy>
	</view>
</template>

<script>
	import {
		createUserAddress,updateUserAddress,deleteUserAddressById
	} from '@/api/api.js';
	import cityPicker from '@/uni_modules/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker'
	export default {
		data() {
			return {
				status:false,
				addressType: "",
				visible: false,
				maskCloseAble: true,
				defaultValue: '110101',
				// defaultValue: ['河北省','唐山市','丰南区'],
				column: 3,
				ab:{//地址簿
					name:'',
					phone:'',
					area:'',//详细的地址
					code:'',
					recipientName:"",
				},
				recipientName:"",
				phone:"",
				area:'',
				id:'',
				onNeed:true,
			};
		},
		components: {
			cityPicker
		},
		onLoad(params) {
			console.log("@@@@"+params)
			this.addressType = params.type;//新增or编辑
			uni.setNavigationBarTitle({
				title: this.addressType
			})
			//编辑 带出上个页面的参数
			if(this.addressType=='编辑地址'){
				this.ab = JSON.parse(params.abInfo);
				this.ab.name = this.ab.province+ this.ab.city+this.ab.district;
				this.recipientName = this.ab.recipientName;
				this.phone = this.ab.phoneNumber;
				this.area = this.ab.detailedAddress;
				this.defaultValue = [this.ab.province,this.ab.city,this.ab.district];
				this.id = this.ab.id;
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
			handleSwitchChange(event) {
			  // event.detail.value 是 switch 的新状态
			  this.status = event.detail.value;
			  // 这里可以执行其他逻辑，比如保存状态到本地存储或者发送请求到服务器
			  console.log('Switch is changed to:', this.status);
			},
			//下拉选择省区县
			openCp () {
			    this.visible = true
			},
			confirm (val) {
			    console.log(val)
			    this.ab = val;
			    this.visible = false
			},
			cancel () {
			    this.visible = false
			},
			open() {
				this.$refs.popup.open('bottom')
			},
			close() {
				this.$refs.popup.close()
			},
			/**
			 * 保存地址
			 */
			save(){
				const regex_phone = /^1[3-9]\d{9}$/;
				if(this.ab.recipientName==''){
					uni.showToast({title: '请输入收货人姓名',icon: 'none'});
					return false
				}else if(this.phone==''||!regex_phone.test(this.phone)){
					uni.showToast({title: '请输入正确的手机号',icon: 'none'});
					return false
				}else if(this.ab.name==''){
					uni.showToast({title: '请选择所在地区',icon: 'none'});
					return false
				}else if(this.area==''){
					uni.showToast({title: '请输入详细地址',icon: 'none'});
					return false
				}
				// 存储数据
				let basicData = uni.getStorageSync('basicData');
				let data = JSON.parse(basicData);
				//{code: "110101", name: "北京市市辖区东城区", provinceName: "北京市", cityName: "市辖区", areaName: "东城区"}
				if (this.addressType=='编辑地址') {
					updateUserAddress({
						userOpenid: data.userOpenid,
						recipientName:this.recipientName,
						phoneNumber:this.phone,
						province:this.ab.province||this.ab.provinceName,
						city:this.ab.city||this.ab.cityName,
						district:this.ab.areaName||this.ab.district,
						detailedAddress:this.area,
						id:this.id
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
							title: err.data.msg||'updateUserAddress接口异常,请稍后再试',
							icon:'none'
						});
						
					});
				} else{
					createUserAddress({
						userOpenid: data.userOpenid,
						recipientName:this.recipientName,
						phoneNumber:this.phone,
						province:this.ab.provinceName,
						city:this.ab.cityName,
						district:this.ab.areaName,
						detailedAddress:this.area
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
							title: err.data.msg||'createUserAddress接口异常,请稍后再试',
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
					content: '立即删除该收货地址？',
					confirmColor:'#C0272C',//确定按钮颜色
					success: function (res) {
						if (res.confirm) {
							deleteUserAddressById({
								id:that.id
							}).then((res) => {
								uni.showToast({
									title: '删除成功',
									duration: 2000
								});
								var timer = setInterval(()=> {
								  uni.navigateBack()
								  clearInterval(timer)
								},2000)
										
							}).catch((err) => {
								uni.showToast({
									title: err.data.msg||'deleteUserAddressById接口异常,请稍后再试',
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
	@import 'AddressEdit.scss';
</style>
