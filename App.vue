<script>
	import {
		queryUserOpenid,home
	} from '@/api/api.js';
	export default {
		onLaunch: function(option) {
			// #ifdef H5
			// var script = document.createElement('script');
			// script.src = "https://www.gujing.cn/commons/js/aws.mobile.api.js";
			// document.body.appendChild(script);
			
			/*
			GUIDE( value:"1"),//导购  f7a26231-bdbf-4d58-aadb-befef3045365
			TOUR_GUIDE( value:"2"),//导游  166a8f1f-034b-4456-a10c-a87a7a7a43de
			TOUR GUIDE1( value:"3"),// 厂方人员  35b0f487-34c4-412d-b38e-46a5bca965e7
			? ?TOUR GUIDE2( value: "4");// 大客户
			*/
			// console.log("awsWebview.isMobileAWSApp"+awsWebview.isMobileAWSApp())
			// if(awsWebview.isMobileAWSApp()){
			//   awsWebview.hideTitle()
			// }
			// #endif
		},
		onShow: function() {
			// setTimeout(()=>{
			//   uni.hideTabBar()  
			// },100)
			// 在uniapp中调用静默授权的函数

		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
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
	}
</style>