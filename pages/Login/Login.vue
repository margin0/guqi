<!-- 登录页面 -->
<template>
	<view>
		<view class="loginLogo">
			<form @submit="onSubmit(true, $event)" class="loginContent">
				<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image class="avatar"
						:src="formData.avatarUrl?formData.avatarUrl:'../../static/unlg.png'">
					</image>
					<text class="loginLogoText" v-if="isShow">授权头像</text>
				</button>
				<view class="nameContent">
					<view class="title">昵称</view>
					<input name="nickName" type="nickname" placeholder="请填写昵称" class="weui-input"
						v-model="formData.nickName" />
				</view>
 
				<view class="loginBtn">
					<button class="btn" form-type="submit" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
							<uni-icons type="weixin" size="30" color="#fff"></uni-icons>
							<text style="font-family:my-font;color:#fff;">微信授权登录</text>
						</button>
				</view>
			</form>
		</view>
 
	</view>
</template>
 
<script>
	import {
		queryUserInfo,queryUserOpenid
	} from '@/api/api.js';
	export default {
		data() {
			return {
				iv: "",
				encryptedData: '',
				phoneNum: "",
				openId: '',
				formData: {
					nickName: '',
					avatarUrl: '',
					phone:''
				},
				isShow: true,
				token: ""
			}
		},
		computed: {
			
		},
		watch: {
			formData: {
				handler(newVal, oldValue) {
					if (newVal.avatarUrl) {
						this.isShow = false;//监测isShow，如果授权头像了就隐藏 授权头像 字样
					}
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			//获取微信头像
			onChooseAvatar(e) {
				this.formData.avatarUrl = e.detail.avatarUrl;
				console.log("eeee", e.detail);
			},
			onSubmit(confirm, event) {
				if (confirm) {
					try {
						let {
							nickName
						} = event.detail.value;
						this.formData.nickName = nickName;
					} catch (e) {
						//TODO handle the exception
						uni.showToast({
							icon: 'none',
							title: e.message
						});
						return;
					}
				}
			},
			// 微信获取手机号信息
			getPhoneNumber(data) {
				if (this.formData.avatarUrl && this.formData.nickName) {
					//微信小程序返回的相关数据
					this.iv = data.detail.iv;
					this.encryptedData = data.detail.encryptedData;
					uni.showToast({
						title: '登录中',
						icon: 'loading',
						duration: 1000,
					});
					//处理头像链接
					this.uploadImage(this.formData.avatarUrl);
 
				} else {
					uni.showToast({
						title: `请选择头像或输入昵称~`,
						icon: 'none'
					});
				}
			},
			uniLogin(avatarUrl) {
				let that =this;
				wx.login({
					success(res) {
						if (res.code) {
							// 调用后端接口，使用code换取用户授权态（access_token）
							// 这里只是一个示例，实际情况需要根据自己的后端服务来编写
				
							// 发送请求到后端，获取access_token
							///api/user/weixin/queryUserOpenid
							let params = {
								code: res.code,
								nickName:that.formData.nickName,
								avatarUrl:avatarUrl,
								iv:that.iv,
								encryptedData:that.encryptedData
							}
							queryUserOpenid(params).then((res) => {
								// 存储数据 
								const basicData = JSON.stringify({
									userOpenid: res.userOpenid,
									nickName:that.formData.nickName,
									avatarUrl:avatarUrl,
									phone:res.phone
									//
									//commodityCode: 'f9024ba9-ad8b-4b26-b148-afdef5009846', //272cb24d-2438-416c-999e-61b4169b45e5
									//commodityCode:'1122c536-b406-4adb-a27c-86e4bf6ce0a4',//f9024ba9-ad8b-4b26-b148-afdef5009846
								});
								uni.setStorageSync('basicData', basicData);
								//跳转回个人中心页面
								uni.showToast({
									title: '登录成功'
								});
								let timer = setTimeout(() => {
									
									uni.switchTab({
										url: '/pages/Mine/Mine'
									})
									clearTimeout(timer);
								}, 1500)
							}).catch((err) => {
								uni.showToast({
									title: err.data.msg || 'queryUserOpenid接口异常,请稍后再试',
									icon: 'none'
								});
							});
							// ...
						} else {
							console.log('登录失败！' + res.errMsg);
							uni.showToast({
								title: '微信授权失败，请稍后重试',
								icon: 'none'
							})
						}
					}
				});
			},
			//头像图片持久化
			uploadImage(url1) {
				this.uniLogin(url1);
				//uni.uploadFile将微信返回的临时地址转成文件流传输给后端，从而上传服务器，拿到永久地址
				// uni.uploadFile({
				// 	url: `https://qmhly.hls.com/nine/getImgUrl`,
				// 	filePath: url1,
				// 	name: 'file',
				// 	header: {
				// 		'content-type': 'application/x-www-form-urlencoded',
				// 	},
				// 	formData: {
				// 		'user': this.formData.nickName
				// 	},
				// 	success: (uploadFileRes) => {
				// 		this.formData.avatarUrl = JSON.parse(uploadFileRes.data).data;
				// 		//进入登录流程
				// 		this.uniLogin();
				// 	}
				// });
			},
		}
	}
</script>
 
<style scoped lang="scss">
	.avatar-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
 
		.avatar {
			height: 120rpx;
			width: 120rpx;
			border-radius: 20rpx;
		}
	}
 
	.avatar-wrapper::after {
		border: none;
	}
 
	.nameContent {
		display: flex;
		margin: 70rpx 0;
		border-top: 1px solid #eee;
		border-bottom: 2rpx solid #eee;
		padding: 20rpx 40rpx;
		width: 100vw;
		box-sizing: border-box;
		font-size: 28rpx;
		align-items: center;
 
		.title {
			margin-right: 40rpx;
		}
	}
 
	.loginLogo {
		height: 700rpx;
		display: flex;
		justify-content: center;
		align-items: center;
 
		.loginContent {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			width: 100%;
 
			.loginLogoText {
				font-size: 24rpx;
				color: #828282;
				margin-top: 20rpx;
			}
		}
	}
 
	.loginBtn {
		width: 100%;
 
		.btn {
			width: 660rpx;background-color: #00b324;
			height: 82rpx;border-radius: 82rpx;
			display: flex;
			align-items: center;justify-content: center;border: 0;
		}
	}
	
</style>