// @/api/index.js

import request from '@/utils/request.js' 
// -----------------小程序开始--------------
//获取openId api/factorydirect_user/weixin/queryUserOpenid
export function queryUserOpenid(params){
	return request.post("/api/factorydirect_user/weixin/queryUserOpenid",params)
}
//获取订单数字角标接口 /weixin/queryUserInfo
export function queryUserInfo(params){
	return request.post("/api/factorydirect_user/weixin/queryUserInfo",params)
}
//微信小程序根据二维码获取商品信息 weixin/queryCommodityByCode
export function queryCommodityByCode(params){
	return request.post("/api/factorydirect_commodity/weixin/queryCommodityByCode",params)
}
//微信 下单接口 factorydirect_order/weixin/createOrder
export function createOrder(params){
	return request.post("/api/factorydirect_order/weixin/createOrder",params)
}
//微信 支付接口 /weixin/toPay
export function toPay(params){
	return request.post("/api/factorydirect_order/weixin/toPay",params)
}
//微信小程序获取用户订单列表
export function queryOrderListForUser(params){
	return request.post("/api/factorydirect_order/weixin/queryOrderListForUser",params)
}
///微信小程序获取用户订单详情 weixin/queryOrderInfoByOrderNo
export function queryOrderInfoByOrderNo(params){
	return request.post("/api/factorydirect_order/weixin/queryOrderInfoByOrderNo",params)
}
///微信小程序获取发票详情 /weixin/queryOrderInvoiceInfo
export function queryOrderInvoiceInfo(params){
	return request.post("/api/factorydirect_order/weixin/queryOrderInvoiceInfo",params)
}
//微信小程序绑定订单地址信息 /bindAddressForOrder
export function bindAddressForOrder(params){
	return request.post("/api/factorydirect_order/weixin/bindAddressForOrder",params)
}
//微信小程序开票接口 /factorydirect_user/weixin/openInvoice
export function openInvoice(params){
	return request.post("/api/factorydirect_order/weixin/openInvoice",params)
}
//微信端更改订单状态  weixin/updateOrderStatusForUser orderNo status
export function updateOrderStatusForUser(params){
	return request.post("/api/factorydirect_order/weixin/updateOrderStatusForUser",params)
}
//创建收货地址 /weixin/createUserAddress
export function createUserAddress(params){
	return request.post("/api/factorydirect_user/weixin/createUserAddress",params)
}
//修改收货地址 /weixin/updateUserAddress
export function updateUserAddress(params){
	return request.post("/api/factorydirect_user/weixin/updateUserAddress",params)
}
//删除收货地址 /weixin/deleteUserAddressById
export function deleteUserAddressById(params){
	return request.post("/api/factorydirect_user/weixin/deleteUserAddressById",params)
}
//获取收货地址列表 queryUserAddressList
export function queryUserAddressList(params){
	return request.post("/api/factorydirect_user/weixin/queryUserAddressList",params)
}
//获取发票信息列表 factorydirect_user/weixin/queryUserInvoiceList
export function queryUserInvoiceList(params){
	return request.post("/api/factorydirect_user/weixin/queryUserInvoiceList",params)
}
//新增发票接口 factorydirect_user/weixin/createUserInvoice
export function createUserInvoice(params){
	return request.post("/api/factorydirect_user/weixin/createUserInvoice",params)
}
//删除发票接口 factorydirect_user/weixin/deleteUserInvoice
export function deleteUserInvoiceById(params){
	return request.post("/api/factorydirect_user/weixin/deleteUserInvoiceById",params)
}
//更新发票接口 factorydirect_user/weixin/updateUserInvoice
export function updateUserInvoice(params){
	return request.post("/api/factorydirect_user/weixin/updateUserInvoice",params)
}
// -----------------小程序结束--------------

// -----------------h5开始--------------
 
 //掌上古井获取用户权限
 export function home(params){
 	return request.post("/api/factorydirect_h5order/h5/home",params)
 }
//掌上古井获取导购首页数据
export function queryGuideHomeDate(params){
	return request.post("/api/factorydirect_h5order/h5/queryGuideHomeDate",params)
}
//掌上古井获取订单列表
export function queryOrderListForBpm(params){
	return request.post("/api/factorydirect_h5order/h5/queryOrderListForBpm",params)
}
//掌上古井获取订单列表详情
export function queryOrderInfoByOrderNoForBpm(params){
	return request.post("/api/factorydirect_h5order/h5/queryOrderInfoByOrderNoForBpm",params)
}
//掌上古井修改订单状态(取消订单status：已取消 、确认发货status：待收货)
export function updateOrderStatusForBpm(params){
	return request.post("/api/factorydirect_h5order/h5/updateOrderStatusForBpm",params)
}
//掌上古井设置订单地址信息
export function bindAddressForBpm(params){
	return request.post("/api/factorydirect_h5order/h5/bindAddressForBpm",params)
}
//掌上古井获取厂方人员列表
export function queryManagerListForBpm(params){
	return request.post("/api/factorydirect_commission/h5/queryManagerListForBpm",params)
}
//掌上古井获取导游列表
export function queryTourGuideListForBpm(params){
	return request.post("/api/factorydirect_commission/h5/queryTourGuideListForBpm",params)
}
//掌上古井分佣登记
export function registerCommissionForBpm(params){
	return request.post("/api/factorydirect_commission/h5/registerCommissionForBpm",params)
}
//掌上古井获取分佣列表 
export function queryCommissionListForBpm(params){
	return request.post("/api/factorydirect_commission/h5/queryCommissionListForBpm",params)
}
//掌上古井获取分佣列表 详情
export function queryCommissionInfoForBpm(params){
	return request.post("/api/factorydirect_commission/h5/queryCommissionInfoForBpm",params)
}
//掌上古井获取开票列表
export function queryOrderInvoiceList(params){
	return request.post("/api/factorydirect_h5order/h5/queryOrderInvoiceList",params)
}
//掌上古井获取开票列表详情
export function queryOrderInvoiceInfoh5(params){
	return request.post("/api/factorydirect_h5order/h5/queryOrderInvoiceInfo",params)
}
//掌上古井获取修改开票
export function updateOrderInvoiceStatus(params){
	return request.post("/api/factorydirect_h5order/h5/updateOrderInvoiceStatus",params)
}
//掌上古井获 查询业务点、经销商
export function queryOrgAgency(params){
	return request.post("/api/factorydirect_commission/h5/queryOrgAgency",params)
}
//掌上古井分佣确认
export function confirmCommissionForBpm(params){
	return request.post("/api/factorydirect_commission/h5/confirmCommissionForBpm",params)
}
//掌上古井获取大客户首页数据
export function queryAdminHomeDate(params){
	return request.post("/api/factorydirect_h5order/h5/queryAdminHomeDate",params)
}
//掌上古井退款申请
export function orderRefundForBpm(params){
	return request.post("/api/factorydirect_h5order/h5/orderRefundForBpm",params)
}
// -----------------h5结束--------------
// 用户注册
export function list(params){
	return request.get("/todos",params)
}
// -----------------小程序结束--------------
