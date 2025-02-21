import Vue from 'vue';
import App from './App';
// 弹出框
import DialogBox from './components/DialogBox/DialogBox';

// 获取环境变量
const baseUrl = process.env.VUE_APP_BASE_URL
const envType = process.env.ENV_TYPE
console.log('当前环境baseUrl:', baseUrl)
console.log('当前环境类型:', envType)

// 将baseUrl挂载到Vue原型上
Vue.prototype.$baseUrl = baseUrl

// 配置请求baseURL
if (process.env.NODE_ENV === 'development') {
    // 开发环境下使用代理
    Vue.prototype.$apiBaseUrl = '/api'
} else {
    // 生产环境使用完整的URL
    Vue.prototype.$apiBaseUrl = `${baseUrl}/api`
}
Vue.config.productionTip = false
// vconsole 只在非生产环境的 H5 中启用
// import vconsole from "vconsole";
// const baseUrl_ = window.location.hostname;
// console.log("~~~~~~~~~🚀 ~~~~~~~~~~ :"+awsWebview.isMobileAWSApp()&&!(baseUrl_.includes('www')))
// if(awsWebview.isMobileAWSApp()&&!(baseUrl_.includes('www'))){
//    Vue.prototype.vconsole = new vconsole();
// }
// 全局组件
Vue.component('DialogBox', DialogBox);
//mescroll
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
