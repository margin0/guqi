(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Zsgj/SaleGuide/MyOrderList/MyOrderList"],{"254d":function(e,t,o){"use strict";var n=o("e20a"),a=o.n(n);a.a},2825:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o("7dcd"),a=null,r={data:function(){return{orderType:"",dataList:[],keyWord:""}},onLoad:function(e){console.log(e),this.orderType=e.orderType,this.pageNum=1},created:function(){console.log("基11础URL:","production")},onShow:function(){a=this,this.queryList(1,10)},methods:{onSearchInput:function(e){this.keyWord=e,this.$refs.paging.reload()},search:function(e){this.keyWord=e.value,this.$refs.paging.reload()},queryList:function(t,o){var a=this,r=e.getStorageSync("basicData"),i=JSON.parse(r),s={pageNo:t,pageSize:10,status:this.orderType,role:i.role,sid:i.sid,keyWord:this.keyWord};(0,n.queryOrderListForBpm)(s).then((function(e){a.$refs.paging.complete(e.resultList)})).catch((function(t){a.$refs.paging.complete(!1),e.showToast({title:t.data.msg||"queryOrderListForBpm接口异常,请稍后再试",icon:"none"}),console.error("失败",t)}))},onOrderTab:function(e){this.orderType=e,this.$refs.paging.reload()},goDetls:function(t,o,n){t&&o&&e.navigateTo({url:"/pages/Zsgj/SaleGuide/OrderDetails/OrderDetails?orderNo="+t+"&orderType="+o+"&onlylook="+n})},go:function(t,o,n){o&&n&&("确认发货"!=t&&"分佣登记"!=t&&"收货地址"!=t||e.navigateTo({url:"/pages/Zsgj/SaleGuide/OrderDetails/OrderDetails?orderNo="+o+"&orderType="+n+"&onlylook=0&cz="+t}))},orderRefundForBpm:function(t){var o=this,a=e.getStorageSync("basicData"),r=JSON.parse(a);e.showModal({title:"",content:"订单：【"+t+"】确认要退款吗？",confirmColor:"#C0272C",success:function(a){a.confirm&&(0,n.orderRefundForBpm)({orderNo:t,sid:r.sid,role:r.role}).then((function(t){e.showToast({title:"操作成功：预计三个工作日内退款金额返回您的支付账户",duration:2e3});var n=setTimeout((function(){o.$refs.paging.reload(),clearTimeout(n)}),1500)})).catch((function(t){e.showToast({title:t.data.msg||"orderRefundForBpm-退款接口异常,请稍后再试",icon:"none"})}))}})},updateOrderStatusForBpm:function(t,o,a){var r=this,i=e.getStorageSync("basicData"),s=JSON.parse(i);e.showModal({title:"",content:"是否"+a+"？",confirmColor:"#C0272C",success:function(i){i.confirm&&(0,n.updateOrderStatusForBpm)({orderNo:t,status:"已取消",role:s.role,sid:s.sid}).then((function(t){e.showToast({title:a+"成功",duration:2e3});var n=setTimeout((function(){r.onOrderTab(o),clearTimeout(n)}),1500)})).catch((function(t){e.showToast({title:t.data.msg||"updateOrderStatusForBpm接口异常,请稍后再试",icon:"none"})}))}})},chooseImage:function(t){e.chooseImage({count:1,sizeType:["compressed"],success:function(o){var n=o.tempFiles[0].name,r=n.match(/\.([^\.]+)$/),i=(r?r[1]:"").toLowerCase();if(console.log("~~~~~~~~~~~~~~~"+i),sessionStorage.setItem("extension",i),["jpg","png","jpeg","bmp"].includes(i)){var s=e.getStorageSync("basicData"),u=JSON.parse(s),c=o.tempFiles[0],d="https://bpmcs.gujing.cn/apps_ba/r/uf?";d+="appId=com.awspaas.user.apps.gujingfactorydirect",d=d+"&sid="+u.sid,d+="&repositoryName=factory",d+="&groupValue=picture",d+="&fileValue=pz",d=d+"&extParam={orderNo:'"+t+"'}",e.uploadFile({url:d,filePath:c.path,name:"file",formData:{},success:function(t){var o=JSON.parse(t.data);if("ok"==o.data.result&&o.data&&o){e.showToast({title:"上传凭证成功",duration:2e3});var n=setTimeout((function(){a.$refs.paging.reload(),clearTimeout(n)}),1500)}else e.showToast({title:"上传凭证失败"+o.data.msg,duration:2e3})},fail:function(t){console.log("上传失败",t),e.showToast({title:"上传凭证失败，请重试",duration:2e3})}})}else e.showToast({title:"支付凭证只支持图片格式",duration:2e3})},fail:function(t){e.showToast({title:"操作失败，请重试",duration:2e3}),e.hideLoading()}})}}};t.default=r}).call(this,o("df3c")["default"])},5516:function(e,t,o){"use strict";(function(e,t){var n=o("47a9");o("7ea0");n(o("3240"));var a=n(o("8aa2"));e.__webpack_require_UNI_MP_PLUGIN__=o,t(a.default)}).call(this,o("3223")["default"],o("df3c")["createPage"])},"8aa2":function(e,t,o){"use strict";o.r(t);var n=o("d1a8"),a=o("ab5c");for(var r in a)["default"].indexOf(r)<0&&function(e){o.d(t,e,(function(){return a[e]}))}(r);o("254d");var i=o("828b"),s=Object(i["a"])(a["default"],n["b"],n["c"],!1,null,"3302d9de",null,!1,n["a"],void 0);t["default"]=s.exports},ab5c:function(e,t,o){"use strict";o.r(t);var n=o("2825"),a=o.n(n);for(var r in n)["default"].indexOf(r)<0&&function(e){o.d(t,e,(function(){return n[e]}))}(r);t["default"]=a.a},d1a8:function(e,t,o){"use strict";o.d(t,"b",(function(){return a})),o.d(t,"c",(function(){return r})),o.d(t,"a",(function(){return n}));var n={zPaging:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/z-paging/components/z-paging/z-paging")]).then(o.bind(null,"d2eb"))},uniSearchBar:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar")]).then(o.bind(null,"e794"))}},a=function(){var e=this.$createElement;this._self._c},r=[]},e20a:function(e,t,o){}},[["5516","common/runtime","common/vendor"]]]);