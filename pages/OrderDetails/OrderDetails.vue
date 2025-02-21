<template>
	<view class="page">
		<!-- 订单状态 -->
		<!-- 订单tab   全部  0
		orderType  待付款1 待发货	2	待收货3 已完成4 已取消5	 -->
		<view class="order-status">
			<view class="status">
				<image :src="
				        detls.status == 0 ? '' :
				         detls.status == '待付款' ? '../../static/order/dfk-w.png' :
				         detls.status == '待发货' ? '../../static/order/dfh-w.png' :
				         detls.status == '待收货' ? '../../static/order/dsh-w.png' :
				         detls.status == '已完成' ? '../../static/order/ysh-w.png' :
						 
						 detls.status  == '退款失败' ? '../../static/order/yqx-w.png' :
						 detls.status  == '退款中' ? '../../static/order/yqx-w.png' :
						 detls.status  == '已退款' ? '../../static/order/yqx-w.png' :
				         detls.status == '已取消' ? '../../static/order/yqx-w.png' : ''
				"mode=""  style="height:70rpx;width:70rpx;"></image>
				<!-- <text class="iconfont icon-zhuyi"></text> -->
				<text class="desc">
					<text>{{detls.status}}</text>
					<text class="oths" v-if="detls.status  == '已退款'">款项已原路退回</text>
				</text>
			</view>
		</view>
		<!-- 收货地址 -->
		<view class="shipping-address sw"  v-if="(detls.isAddress=='是'&&detls.status=='待发货')||detls.status=='待收货'">
			<view class="name-phone">
				<text class="iconfont icon-dingwei"></text>
				<text>{{detls.recipientName}}</text>
				<text>{{detls.phoneNumber}}</text>
			</view>
			<view class="address">
				<text>{{detls.address}}</text>
			</view>
		</view>
		<!-- 快递信息   -->
		<view class="order-info sw"  v-if="detls.status == '待收货'">
			<view class="info-list">
				<view class="list">
					<view class="title">快递公司</view>
					<view class="content">
						<text>{{detls.expressCompany}}</text>
						<!-- <text class="btn" @click="copy">复制</text> -->
					</view>
				</view>
				
				<view class="list">
					<view class="title">快递单号</view>
					<view class="content">
						<text>{{detls.trackingNumber}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 取货方式   -->
		<view class="order-info sw" v-if="detls.status == '已完成'">
			<view class="info-list">
				<view class="list">
					<view class="title">取货方式</view>
					<view class="content">
						<text>{{detls.pickupMethod}}</text>
						<!-- <text class="btn" @click="copy">复制</text> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 订单商品 -->
		<view class="order-goods sw">
			<view class="goods-list">
				<view class="list">
					<view class="thumb">
						<image :src="detls.productImage" mode=""></image>
					</view>
					<view class="item">
						<view class="title">
							<text class="one-omit">{{detls.productName}}</text>
						</view>
						<!-- <view class="num-size">
							<text>数量：88</text>
							<text>颜色</text>
						</view> -->
						<view class="price">
							<text>￥{{detls.memberPrice}}</text>
							<text class="num"><text>×</text>1</text>
						</view>
						<view class="tk" v-if='0'>
							<text>退款成功</text>
						</view>
						<view class="order-btn">
							<view>
								<text style="margin-right: 20rpx;">共<text class="red">{{detls.quantity}}</text>件商品</text>
								<text>合计：¥ <text class="red" style="margin-left:10rpx;">{{detls.orderAmount}}</text></text>
							</view> 
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<!-- 订单信息 -->
		<view class="order-info sw">
			<view class="info-list">
				<view class="list">
					<view class="title">订单编号</view>
					<view class="content">
						<text>{{orderNo}}</text>
						<!-- <text class="btn" @click="copy">复制</text> -->
					</view>
				</view>
				<view class="list">
					<view class="title">下单时间</view>
					<view class="content">
						<text>{{detls.createDate}}</text>
					</view>
				</view>
				<view class="list" v-if="orderType != '待付款'">
					<view class="title">支付方式</view>
					<view class="content">
						<text>{{detls.paymentMethod}}</text>
					</view>
				</view>
				<view class="list" v-if="orderType != '待付款'">
					<view class="title">付款时间</view>
					<view class="content">
						<text>{{detls.paymentTime}}</text>
					</view>
				</view>
				
			</view>
		</view>
		
		<!-- 底部按钮 -->
		<view class="footer-btn" v-if="detls.status == '已完成' ||detls.status == '待收货' ||detls.status == '待付款' || (detls.status == '待发货' && detls.isAddress == '否')">
			<view class="del">
				<!-- <text>删除订单</text> -->
			</view> 
			<!-- v-if="orderType === '待付款' || orderType === '待发货' && isAddress !== '是'" isInvoice-->
			<view class="btn">
				<!--  orderType  待付款1 待发货	2	待收货3 已完成4 已取消5 -->
				<text class=""   @click="go('开发票')" v-if="(detls.status == '待收货' || detls.status == '已完成') && detls.isInvoice == '否'">开发票</text>
				<text class=""   @click="go('查看发票')" v-if="(detls.status == '待收货' || detls.status == '已完成') && detls.isInvoice == '是'">查看发票</text>
				<text class="action"   @click="goIndex()" v-if="detls.status=='已完成'">再来一单</text>
				<text class="action"  @click="go('确认收货')" v-if="detls.status=='待收货'">确认收货</text>
				<text class="action"  @click="go('收货地址')" v-if="detls.status=='待发货'&&detls.isAddress=='否'">收货地址</text>
				<text class="action" @click="go('去付款')" v-if="detls.status=='待付款'">去付款</text>
				<!-- <text @click="phonecall">联系客服</text> -->
			</view>
		</view>
		<!-- //填写地址 -->
		<uni-popup ref="popup"  border-radius="10px 10px 0 0">
			<view class="popupBox" style="padding-bottom: 45rpx;">
				
				<view class="title"><text class="name">收货地址</text><text class="close" @click="close">×</text></view>
				<view class="info" v-if="abList.length=='0'">
					<view class="address-input">
						<view class="list-input" style="border: unset;height: 50rpx;"></view>
						<view class="list-input">
							<view class="title">
								<text>收货人</text>
							</view>
							<view class="content">
								<input type="text" placeholder="请填写收货人姓名" v-model="name">
							</view>
						</view>
						<view class="list-input">
							<view class="title">
								<text>手机号</text>
							</view>
							<view class="content">
								<input type="tel" placeholder="请填写收货人手机号" v-model="phone">
							</view>
						</view>
						<view class="list-input" @click="openCp">
							<view class="title">
								<text>所在地区</text>
							</view>
							<view class="content">
								<input type="text" v-model="city" placeholder="请选择所在地区" readonly style="position: relative;z-index: 1;pointer-events: none;">
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
					</view>
				</view>
				<!-- 再次 -->
				<view class="info" v-else>
					<view class="address-input">
						<view class="list-input" style="border: unset;height: 50rpx;"></view>
						<view class="box">
							<view class="left">
								<view class="name">
									<text style="font-weight: bold;">{{ab.recipientName}}</text><text style="margin-left: 20rpx;">{{ab.phoneNumber}}</text>
								</view>
								<view class="area">
									<text>{{ab.province}}{{ab.city}}{{ab.district}}{{ab.detailedAddress}}</text>
								</view>
							</view>
							<view class="right" @click="goAb">
								<text>地址簿</text>
							</view>
						</view>
						
					</view>
				</view>
				<view  @click="save" class="save">保存</view>
			</view>
			
		</uni-popup>
		<cityPicker :column="column" :default-value="defaultValue" :mask-close-able="maskCloseAble" @confirm="confirm" @cancel="cancel" :visible="visible"/>
		<!-- 开发票 
		invoiceType: '单位',//"发票类型(个人/单位)",
		invoiceTitle: '',//"发票抬头",
		taxNumber: '',//"税号(单位必填)",
		companyAddress: '',//"公司地址(单位必填)",
		phoneNumber: '',//"电话号码(单位必填)",
		bankName: '',//"开户银行(单位必填)",
		bankAccount: '',//"银行账号(单位必填)"
		-->
		<uni-popup ref="popup1"  border-radius="10px 10px 0 0">
			<view class="popupBox">
				<view class="title"><text class="name">发票</text><text class="close" @click="fpclose">×</text></view>
				<view class="info">
					<view class="address-input">
						<view class="list-input" style="border: unset;height: 50rpx;"></view>
						<view class="toptitle">
							发票信息
						</view>
						<view class="list-input">
							<view class="option-group">
							  <text class="option" @click="selectOption('单位')" :class="{ 'selected': fp.invoiceType == '单位' }">单位</text>
							  <text class="option" @click="selectOption('个人')" :class="{ 'selected': fp.invoiceType == '个人' }">个人</text>
							</view>
						</view>
						<view class="list-input"  v-if="fp.invoiceType=='单位'">
							<view class="title">
								<text class="bx">发票抬头</text>
							</view>
							<view class="content">
								<input type="text" placeholder="请填写发票抬头" v-model="fp.invoiceTitle">
								<text class="ttb" @click="goFplist" v-if="fpList.length>0&&fp.invoiceType == '单位'">抬头簿</text>
							</view>
						</view>
						<view class="list-input"  v-if="fp.invoiceType=='个人'">
							<view class="title">
								<text class="bx">发票抬头</text>
							</view>
							<view class="content">
								<input type="text" placeholder="请填写发票抬头" v-model="invoiceTitle">
							</view>
						</view>
						<view  v-if="fp.invoiceType=='单位'">
							<view class="list-input">
								<view class="title">
									<text class="bx">税&nbsp;&nbsp;号</text>
								</view>
								<view class="content">
									<input type="tel" placeholder="请填写税号" v-model="fp.taxNumber">
								</view>
							</view>
							<view class="list-input">
								<view class="title">
									<text>公司地址</text>
								</view>
								<view class="content">
									<input type="tel" placeholder="请填写公司地址" v-model="fp.companyAddress">
								</view>
							</view>
							<view class="list-input">
								<view class="title">
									<text>单位电话</text>
								</view>
								<view class="content">
									<input type="tel" placeholder="请填写单位电话" v-model="fp.phoneNumber">
								</view>
							</view>
							<view class="list-input">
								<view class="title">
									<text>开户银行</text>
								</view>
								<view class="content">
									<input type="tel" placeholder="请填写开户银行" v-model="fp.bankName">
								</view>
							</view>
							<view class="list-input">
								<view class="title">
									<text>银行账号</text>
								</view>
								<view class="content">
									<input type="tel" placeholder="请填写银行账号" v-model="fp.bankAccount">
								</view>
							</view>
						</view>
						<view class="toptitle" style="border: unset;margin-top: 30rpx;">
							收票人信息
						</view>
						<view class="list-input">
							<view class="title">
								<text class="bx">接收邮箱</text>
							</view>
							<view class="content">
								<input type="tel" placeholder="请填写接收邮箱" v-model="fp.email">
							</view>
						</view>
						
					</view>
				</view>
				<view  @click="fpsave" class="save" >保存</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import {
		queryUserAddressList,factorydirect_order,queryOrderInfoByOrderNo,bindAddressForOrder,createUserAddress,updateUserAddress,updateOrderStatusForUser,updateUserInvoice,createUserInvoice,queryUserInvoiceList,openInvoice
	} from '@/api/api.js';
	
   import cityPicker from '@/uni_modules/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker'
	export default {
		data() {
			return {
				orderType:'',//订单状态：待付款、待发货、待收货、已完成、已取消
				//isFirst:1,//是否首次填写地址，根据用户的地址列表有无数据，默认第一条
				visible: false,
				maskCloseAble: true,
				defaultValue: '110101',
				// defaultValue: ['河北省','唐山市','丰南区'],
				column: 3,
				name:'',//收货人姓名
				phone:'',//收货人手机
				city:'',//收货人地区
				area:'',//收货人详细的地址
				
				ab:{//地址簿
					recipientName:'',
					code:'',
					phoneNumber:'',
					//area:'',//详细的地址
				},
				orderNo:'',
				orderAmount:'',
				from:'',//laizi
				detls:null,
				abList:[],
				fpList:[],
				commodityCode:'',
				fp:{
				  invoiceType: '单位',//"发票类型(个人/单位)",
				  invoiceTitle: '',//"发票抬头",
				  taxNumber: '',//"税号(单位必填)",
				  companyAddress: '',//"公司地址(单位必填)",
				  phoneNumber: '',//"电话号码(单位必填)",
				  bankName: '',//"开户银行(单位必填)",
				  bankAccount: '',//"银行账号(单位必填)"
				  id:'',
				  email:''
				},
				invoiceTitle:'',//个人 发票抬头
				onlylook:1,
			};
		},
		components: {
			cityPicker
		},
		onShow(){
			this.queryOrderInfoByOrderNo()
		},
		onLoad(option){
			console.log(option); //打印出上个页面传递的参数。
			this.orderType = option.orderType;
			this.orderNo = option.orderNo;
			this.from= option.from;
			this.abInfo= option.abInfo;
			this.fpInfo= option.fpInfo;
			this.onlylook = option.onlylook;
			
		},
		methods:{
			queryOrderInfoByOrderNo(){
				let that = this;
				queryOrderInfoByOrderNo({
					orderNo: that.orderNo,
				}).then((res) => {
					that.detls = res;
					this.orderType = res.status;
					//根据不同状态 ，控制地址以及发票的弹出框
					if(res.isAddress=='否'&&res.status=='待发货'&&that.onlylook==0){
						that.open();
						//判断 是否从地址页面返回，是--取值来自于地址页面；否--取值来自地址簿接口第一条数据
						that.getAdss(that.from,that.abInfo);
					}
					if((res.status == '待收货'||res.status == '已完成')&& res.isInvoice == '否'&&that.onlylook==0){
						that.fpopen();
						//判断 是否从发票列表页面返回，是--取值来自于发票列表页面；否--取值来自发票列表接口第一条数据
						that.getFp(that.from,that.fpInfo);
					}
					
				}).catch((err) => {
					uni.showToast({
						title: err.data.msg||'queryOrderInfoByOrderNo接口异常,请稍后再试',
						icon:'none'
					});
				});
			},
			selectOption(option) {
			  let that = this;
			  that.fp.invoiceType = option;
			},
			//获取地址列表
			getAdss(from,abInfo){
				let that = this;
				let basicData = uni.getStorageSync('basicData');
				let data = JSON.parse(basicData);
				//queryOrderInfoByOrderNo
				queryUserAddressList({
					userOpenid: data.userOpenid,
				}).then((res) => {
					res.length>0?that.ab  = res[0]:console.log("")
					//取地址簿第一条数据
					that.abList  = res;	//取地址簿第一条数据
					//判断 是否从地址页面返回，是--取值来自于地址页面；否--取值来自地址簿接口第一条数据
					if(from=="AddressList"&&abInfo){
						that.ab = JSON.parse(abInfo);
					}
				}).catch((err) => {
					uni.showToast({
						title: err.data.msg||'queryUserAddressList接口异常,请稍后再试',
						icon:'none'
					});
				});
			},
			//去地址簿
			goAb(){
				uni.redirectTo({
					url: '/pages/AddressList/AddressList?from=orderDetails&orderType='+this.orderType+'&orderNo='+this.detls.orderNo
				})
			},
			//去抬头簿
			goFplist(){
				uni.redirectTo({
					url: '/pages/InvoiceList/InvoiceList?from=orderDetails&orderType='+this.orderType+'&orderNo='+this.detls.orderNo
				})
			},
			//获发票列表
			getFp(from,fpInfo){
				let that = this;
				let basicData = uni.getStorageSync('basicData');
				let data = JSON.parse(basicData);
				//queryOrderInfoByOrderNo
				queryUserInvoiceList({
					userOpenid: data.userOpenid,
				}).then((res) => {
					res.length>0?that.fp  = res[0]:console.log('');
					//取抬头簿第一条数据
					that.fpList  = res;	//取抬头簿第一条数据
					//判断 是否从抬头簿页面返回，是--取值来自于抬头簿页面；否--取值来自抬头簿接口第一条数据
					if(from=="InvoiceList"&&fpInfo){
						that.fp = JSON.parse(fpInfo);
					}
					//获取用户历史邮箱信息
					if(uni.getStorageSync('emailAddress')){
						that.fp.email = uni.getStorageSync('emailAddress')
					}
				}).catch((err) => {
					uni.showToast({
						title: err.data.msg||'queryUserInvoiceList接口异常,请稍后再试',
						icon:'none'
					});
				});
			},
			//下拉选择省区县
			openCp () {
                this.visible = true
            },
            confirm (val) {
                console.log(val)
				this.city = val.name;
				//{code: "110101", name: "北京市市辖区东城区", provinceName: "北京市", cityName: "市辖区", areaName: "东城区"}
				this.provinceName = val.provinceName;
				this.cityName = val.cityName;
				this.areaName = val.areaName;
                this.visible = false;
            },
            cancel () {
                this.visible = false
            },
			open() {
				this.$refs.popup.open('bottom')
			},
			fpopen() {
				this.$refs.popup1.open('bottom')
			},
			close() {
				this.$refs.popup.close()
			},
			fpclose() {
				this.$refs.popup1.close()
			},
			/**
			 * 保存地址
			 */
			save(){
				let that = this;
				let basicData = uni.getStorageSync('basicData');
				let data = JSON.parse(basicData);
				const regex_phone = /^1[3-9]\d{9}$/;
				//判断 1、用户是否首次填写，首次填写保存后先调用保存地址接口后，再调用绑定订单接口
				//     2、非首次填写，直接取当前选择的地址id即可
				if(this.abList.length=="0"){
					if(this.name==''){
						uni.showToast({title: '请输入收货人姓名',icon: 'none'});
						return false
					}else if(this.phone==''||!regex_phone.test(this.phone)){
						uni.showToast({title: '请输入正确的手机号',icon: 'none'});
						return false
					}else if(this.city==''){
						uni.showToast({title: '请选择所在地区',icon: 'none'});
						return false
					}else if(this.area==''){
						uni.showToast({title: '请输入详细地址',icon: 'none'});
						return false
					}
					//name phone city area
					/*
					this.provinceName = val.provinceName;
					this.cityName = val.cityName;
					this.areaName = val.areaName;
					*/ 
					createUserAddress({
						userOpenid: data.userOpenid,
						recipientName:that.name,
						phoneNumber:that.phone,
						province:that.provinceName,
						city:that.cityName,
						district:that.areaName,
						detailedAddress:that.area
					}).then((res) => {
						that.bindAddressForOrder(res);
					}).catch((err) => {
						uni.showToast({
							title: err.data.msg||'createUserAddress接口异常,请稍后再试',
							icon:'none'
						});
					});
				}else{
					//非首次填写地址，
					that.bindAddressForOrder(that.ab.id);
				}
				
			},
			/**
			 * 保存开票信息
			 * 			 */
			fpsave(){
				let that = this;
				let basicData = uni.getStorageSync('basicData');
				let data = JSON.parse(basicData);
				const regex_email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
				//保存时，单位和个人分别判断。个人直接调用开票接口。只传抬头，id置空，
				if(that.fp.invoiceType=='个人'){
					if(that.invoiceTitle ==''){
						uni.showToast({title: '请输入发票抬头',icon: 'none'});
						return false
					}
					that.openInvoice('',that.fp.email,that.invoiceTitle);
				}else{
					//判断 1、首次填写保存后先调用保存接口后createUserInvoice，再调用绑定订单接口openInvoice
					//     2、非首次填写，直接取当前选择的发票记录的id即可
					if(that.fp.invoiceTitle ==''){
						uni.showToast({title: '请输入发票抬头',icon: 'none'});
						return false
					}else if(that.fp.taxNumber==''&&that.fp.invoiceType=='单位'){
						uni.showToast({title: '请输入正确的税号',icon: 'none'});
						return false
					}else if(that.fp.email==''||!regex_email.test(that.fp.email)){
						uni.showToast({title: '请输入正确的邮箱',icon: 'none'});
						return false
					}
					
					if(that.fpList.length=="0"){
						createUserInvoice({
							userOpenid: data.userOpenid,
							invoiceType:that.fp.invoiceType,//"发票类型(个人/单位)",
							invoiceTitle: that.fp.invoiceTitle,//"发票抬头",
							taxNumber: that.fp.taxNumber,//"税号(单位必填)",
							companyAddress:that.fp.companyAddress,//"公司地址(单位必填)",
							phoneNumber: that.fp.phoneNumber,//"电话号码(单位必填)",
							bankName: that.fp.bankName,//"开户银行(单位必填)",
							bankAccount: that.fp.bankAccount,//"银行账号(单位必填)"
						}).then((res) => {
							that.openInvoice(res,that.fp.email,that.fp.invoiceTitle);
						}).catch((err) => {
							uni.showToast({
								title: err.data.msg||'createUserInvoice接口异常,请稍后再试',
								icon:'none'
							});
						});
					}else{
						//非首次填写发票，先调用发票的更新接口
						updateUserInvoice({
							userOpenid: data.userOpenid,
							invoiceType:that.fp.invoiceType,//"发票类型(个人/单位)",
							invoiceTitle: that.fp.invoiceTitle,//"发票抬头",
							taxNumber: that.fp.taxNumber,//"税号(单位必填)",
							companyAddress:that.fp.companyAddress,//"公司地址(单位必填)",
							phoneNumber: that.fp.phoneNumber,//"电话号码(单位必填)",
							bankName: that.fp.bankName,//"开户银行(单位必填)",
							bankAccount: that.fp.bankAccount,//"银行账号(单位必填)"
							id:that.fp.id
						}).then((res) => {
							that.openInvoice(that.fp.id,that.fp.email,that.fp.invoiceTitle);
						}).catch((err) => {
							uni.showToast({
								title: err.data.msg||'updateUserInvoice接口异常,请稍后再试',
								icon:'none'
							});
						});
					}
				}
			},
			//地址绑定订单 orderNo addressId
			bindAddressForOrder(id) {
				let that = this;
				bindAddressForOrder({
					orderNo: that.orderNo,
					addressId:id,
				}).then(() => {
					uni.showToast({
						title: '保存成功',
						duration: 2000
					});
					let timer = setTimeout(() =>{
						// uni.navigateTo({
						// 	url: '/pages/MyOrderList/MyOrderList?orderType=待发货'
						// })
						that.close()
						that.queryOrderInfoByOrderNo()
						clearTimeout(timer);
					},1500)
				}).catch((err) => {
					uni.showToast({
						title: err.data.msg||'bindAddressForOrder接口异常,请稍后再试',
						icon:'none'
					});
				});
				
			},
			//发票绑定订单 orderNo invoiceId
			openInvoice(id,emailAddress,invoiceTitle) {
				let that = this;
				let basicData = uni.getStorageSync('basicData');
				let data = JSON.parse(basicData);
				openInvoice({
					orderNo: that.orderNo,
					invoiceId:id,
					emailAddress:emailAddress,
					invoiceTitle:invoiceTitle,
					userOpenid: data.userOpenid
				}).then(() => {
					uni.showToast({
						title: '保存成功',
						duration: 2000
					});
					let timer = setTimeout(() =>{
						that.fpclose();
						that.queryOrderInfoByOrderNo()
						clearTimeout(timer);
						// uni.navigateTo({
						// 	url: '/pages/MyOrderList/MyOrderList?orderType='+this.orderType
						// })
						//clearTimeout(timer);
					},1500)
				}).catch((err) => {
					uni.showToast({
						title: err.data.msg||'openInvoice接口异常,请稍后再试',
						icon:'none'
					});
				});
				
			},
			go(url){
				let that = this;
				if(url=='确认收货'&&this.orderNo){				
					uni.showModal({
						title: '',
						content: '是否确认收货？',
						confirmColor:'#C0272C',//确定按钮颜色
						success: function (res) {
							if (res.confirm) {
								//updateOrderStatusForUser orderNo status
								let basicData = uni.getStorageSync('basicData');
								let data = JSON.parse(basicData);
								updateOrderStatusForUser({
									orderNo: that.orderNo,
									status: '已完成',
								}).then((res) => {
									uni.showToast({
										title: '确认收货成功',
										duration: 2000
									});
									let timer = setTimeout(() =>{
										that.queryOrderInfoByOrderNo()
										// uni.navigateTo({
										// 	url: '/pages/MyOrderList/MyOrderList?orderType=已完成'
										// })
										clearTimeout(timer);
									},1500)
								}).catch((err) => {
									uni.showToast({
										title: err.data.msg||'updateOrderStatusForUser接口异常,请稍后再试',
										icon:'none'
									});
								});
								
							} 
						}
					});
				}else if(url=='去付款'){
					uni.navigateTo({
						url: '/pages/CashierDesk/CashierDesk?orderAmount='+this.detls.orderAmount+'&orderNo='+this.detls.orderNo
					})
				}else if(url=='收货地址'){
					/*
					orderType  待付款1 待发货	2	待收货3 已完成4 已取消5
					需要判断是否是首次填写地址或者是没填写地址的，直接弹出 填写收货地址；非首次带出默认地址
					*/
					if(this.orderType=='待发货'){
						this.open(); 
						this.getAdss(this.from,this.abInfo)
					}
				}else if(url=='开发票'){
					this.fpopen();
				}else if(url=='查看发票'){
					uni.navigateTo({
						url:"/pages/InvoiceList/InvoiceDetails/InvoiceDetails?orderNo="+this.orderNo
					})
				}
			}
			,
			goIndex(){
				let oData = uni.getStorageSync('basicData');
				let data = JSON.parse(oData);
			
				const basicData = JSON.stringify({
					userOpenid:data.userOpenid,
					commodityCode:this.detls.commodityCode
				});
				uni.setStorageSync('basicData', basicData);
				uni.navigateTo({
					url:"/pages/GoodsDetails/GoodsDetails?isBuy=1"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'OrderDetails.scss';
</style>
