<template>
	<view class="zero-privacy" :class="[{'zero-bottom':position=='bottom'}]" v-if="showPrivacy">
		<view class="zero-privacy-container" :style="{'--color':color,'--bgcolor':bgcolor,'--contenth':contentHeight}">
			<view class="title">
				{{ title }}
			</view>
			<view class="content">{{ predesc }}<text @click.stop="handleOpenPrivacyContract">{{ privacyContractNameCustom || privacyContractName }}</text>。{{ subdesc }}
			</view>
			<view class="footer">
				<view class="btn disagree-btn" @click="handleRefuse">{{ disagreeBtnText }}</view>
				<button id="agree-btn" class="btn agree-btn" open-type="agreePrivacyAuthorization" @agreeprivacyauthorization="handleAgree">
					{{ agreeBtnText }}
				</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "zero-privacy",
	emits: ['agree', 'disagree', 'needAuthorization'],
	props: {
		position: {
			type: String,
			default: 'center'
		},
		color: {
			type: String,
			default: '#0396FF'
		},
		bgcolor: {
			type: String,
			default: '#ffffff'
		},
		onNeed: {
			type: Boolean,
			default: true
		},
		hideTabBar: {
			type: Boolean,
			default: false
		},
		privacyContractNameCustom: {
			type: String,
			default: ''
		},
		contentHeight: {
			type: String,
			default: '30vh'
		}
	},
	data() {
		return {
			resolvePrivacyAuthorization: null,
			showPrivacy: false,
			privacyContractName: "", // 小程序协议名称
			title: this.$t('privacy.title'), // 使用国际化文本
			predesc: this.$t('privacy.predicate'), // 使用国际化文本
			subdesc: this.$t('privacy.subdesc'), // 使用国际化文本
			agreeBtnText: this.$t('privacy.agree'), // 使用国际化文本
			disagreeBtnText: this.$t('privacy.disagree') // 使用国际化文本
		};
	},
	methods: {
		open(name) {
			if (this.hideTabBar) {
				uni.hideTabBar({
					success: (res) => {},
					fail: (err) => {},
				});
			}
			this.privacyContractName = name
			this.showPrivacy = true;
		},
		close() {
			this.showPrivacy = false;
			if (this.hideTabBar) {
				uni.showTabBar({
					success: (res) => {},
					fail: (err) => {},
				});
			}
		},
		handleAgree() {
			if (this.onNeed) {
				this.resolvePrivacyAuthorization({
					buttonId: "agree-btn",
					event: "agree",
				});
			}
			this.close();
			this.$emit('agree')
		},
		handleRefuse() {
			if (this.onNeed) {
				this.resolvePrivacyAuthorization({
					event: "disagree",
				});
			}
			this.close();
			this.$emit('disagree')
		},
		handleOpenPrivacyContract() {
			uni.openPrivacyContract({
				success: (res) => {},
				fail: (err) => {},
			});
		},
		checkPrivacySetting() {
			uni.getPrivacySetting({
				success: (res) => {
					if (res.needAuthorization === false) {
						this.$emit('needAuthorization', false)
						return;
					}
					this.$emit('needAuthorization', true)
					if (this.onNeed) {
						uni.onNeedPrivacyAuthorization((resolve) => {
							this.open(res.privacyContractName)
							this.resolvePrivacyAuthorization = resolve;
						});
					} else {
						this.open(res.privacyContractName)
					}
				},
				fail: () => {},
				complete: () => {},
			});
		},
		updateText() {
			// 更新国际化文本
			this.title = this.$t('privacy.title');
			this.predesc = this.$t('privacy.predicate');
			this.subdesc = this.$t('privacy.subdesc');
			this.agreeBtnText = this.$t('privacy.agree');
			this.disagreeBtnText = this.$t('privacy.disagree');
		}
	},
	created() {
		this.checkPrivacySetting();
	},
};
</script>

<style lang="scss">
	.zero-privacy {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99999;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		-webkit-justify-content: center;
		animation: fadeIn 0.2s linear both;
	}

	.zero-privacy-container {
		width: 580rpx;
		min-height: 400rpx;
		background: var(--bgcolor);
		border-radius: 16px;
		padding: 50rpx;
		font-size: 14px;
		animation: fadeInBig 0.2s 0.2s linear both;
		backdrop-filter: blur(10rpx); //毛玻璃属性

		.title {
			color: #333333;
			font-size: 36rpx;
			text-align: center;
		}

		.content {
			color: #595959;
			margin-top: 36rpx;
			margin-bottom: 36rpx;
			line-height: 50rpx;
			white-space: pre-wrap;
			// max-height: var(--contenth);
			overflow: auto;
			text {
				color: var(--color);
			}
		}

		.footer {
			display: flex;
			justify-content: space-between;

			// 重置微信小程序的按钮样式
			button:after {
				border: none;
			}

			.btn {
				min-width: 200rpx;
				line-height: 80rpx;
				padding: 0 10rpx;
				border-radius: 24px;
				text-align: center;
				font-size: 28rpx;
				white-space: nowrap;
				word-break: break-all;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.disagree-btn {
				background-color: #ccc;
				color: #666666;
			}

			.agree-btn {
				line-height: 80rpx;
				background-color: var(--color);
				color: #fff;
				margin: 0;
			}
		}
	}

	.zero-bottom {
		align-items: flex-end;

		.zero-privacy-container {
			width: 100%;
			animation: fadeIn 0.2s linear both;
			animation: fadeInUp 0.2s 0.2s linear both;
			padding-bottom: calc(env(safe-area-inset-bottom) + 30rpx);
			border-radius: 24px 24px 0 0;
		}

		.footer {
			padding: 0 40rpx;

			.btn {
				min-width: 250rpx;
			}
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0.5;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes fadeInBig {
		0% {
			opacity: 0;
			transform: scale(0.5);
		}

		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes fadeInUp {
		0% {
			opacity: 0;
			transform: translate3d(0, 100%, 0);
		}

		100% {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}
</style>