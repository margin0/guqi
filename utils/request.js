// @/utils/request.js
// #ifdef MP-WEIXIN
//小程序判断当前环境
console.log('****************小程序环境====>'+process.env.ENV_TYPE);//dev test pro
console.log('小程序接口url=====>'+process.env.VUE_APP_BASE_URL);
const baseURL = process.env.VUE_APP_BASE_URL;//todos?userId=1
// #endif 
// #ifdef H5
console.log('运行or发布==============>'+process.env.NODE_ENV)
let baseURL = '';
process.env.NODE_ENV=='development'?baseURL = '':baseURL = baseURL+'/apps_ba';
//process.env.NODE_ENV=='development'?baseURL = '':baseURL = process.env.VUE_APP_BASE_URL;
// #endif
console.log("🚀 🚀 🚀 🚀 "+process.env.NODE_ENV)
const timeout = 10000;
// 封装api请求
const request = function(option){ 
	// 获取用户传入的url
	var url = baseURL + option.url; 
	 
	// 添加提请求头
	var  header = option.header||{}
	// if(!!option.needToken){
	// 	// 添加token 
	// 	header.Authorization =  'Bearer ' +  uni.getStorageSync('token');  
	// }
	// header.source=1;
	// header.channel="h5";
	
	// 加载提示
	uni.showLoading({
		title: '请求中...'
	});
    // 返回一个promise
	return new Promise((resolve,reject)=>{  
		// 发起一个request请求
		uni.request({
			url, //请求url
			method:option.method||"GET", //请求方法
			header, //请求头
			timeout,
			data:option.data||option.params, //请求数据
			success(res){
				//debugger
				// 成功返回结果
				if(res.data.result=='ok'){
					resolve(res.data.data)
				} else{
					reject(res)
				}
				uni.hideLoading()
			},
			fail(err){
				uni.hideLoading()
				// 失败返回失败结果
				console.error(err);
				 uni.showModal({
				   title: '提示',
				   content: '系统异常,请稍后再试',
				   showCancel: false
				});
				// uni.showToast({
				// 	title:"系统异常,请稍后再试",
				// 	icon:'none'
				// })
			},
			complete(){
				// 完成 关闭loading
				uni.hideLoading()
			}
		})
	})
}

// 定义get简洁方法
request.get=function(url,data,config){
	return  request({
		url,
		method:"GET",
		...config,
		data
	})
}

// 定义post简洁方法
request.post=function(url,data,config){
	return  request({
		url,
		method:"POST",		
		...config,
		data
	})
}
// 导出请求
export default request;
