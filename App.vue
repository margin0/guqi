<script>
	import {
		queryUserOpenid,home
	} from '@/api/api.js';

	export default {
		globalData: {
		    currentTabIndex: 1 ,// 初始选中的 tab 索引
			isPhoneX: false  //申明全局变量
		  },
		onLaunch: function () {
		    let self = this;
		    // 获取系统信息  
		 //    wx.getSystemInfo({ // 重点！！！
		 //      success: (res) => {
		 //        console.log('getSystemInfo')
		 //        console.log(res)
		 //        if(res.safeArea.top > 20){
		 //          self.globalData.isPhoneX = true;
		 //        }
		 //      }
			// })
			uni.getSystemInfo({
				success: (res) => {
				  // 获取成功后的设备信息
					console.log(`设备型号：${res.model}, 操作系统：${res.system}, 屏幕尺寸：${res.screenWidth}x${res.screenHeight}`)
					if(res.model.includes('iPhone')){
						self.globalData.isPhoneX = true;
					}
				},
				fail: (err) => {
				  console.error('获取设备信息失败：', err);
				}
			  });
			
			
	   },
		onShow: function() {
			// setTimeout(()=>{
			//   uni.hideTabBar()  
			// },100)
			// 在uniapp中调用静默授权的函数
         console.log('~~~~~~~~~~~~~~~~~App onShow~~~~~~~~~~~~~~~~~~~~~~~~'+this.globalData.isPhoneX);
		},
		onHide: function() {
			console.log('~~~~~~~~~~~~~~~~~App Hide~~~~~~~~~~~~~~~~~~~~~~~~');
		}
		
	};
</script>

<style  lang="scss">
	/*每个页面公共css */
	@import 'colorui/main.css';
	@import 'colorui/icon.css';
	@import 'style/FontStyle.css';
	@import 'static/font/stylesheet.css';
	body {
		-webkit-text-size-adjust: none;
	}

	/* 超出一行省略号 */
	.one-omit {
		white-space: nowrap;
		/*规定段落中的文本不进行换行*/
		overflow: hidden;
		/*内容会被修剪，并且其余内容是不可见的。*/
		text-overflow: ellipsis;
		/*显示省略号来代表被修剪的文本*/
	}

	.two-omit {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
	}

	img {
		width: 100%;
	}
	.page{
		font-family: 'my-font' my-font !important;
		background-color: $baseBackgroundColor;
		// padding-bottom: constant(safe-area-inset-bottom);//兼容 iOS < 11.2
		// padding-bottom: env(safe-area-inset-bottom); //兼容 iOS >= 11.2 
	}
</style>