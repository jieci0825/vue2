// 当前模块：所有的模块API进行统一的管理
import requests from './request'
import mockRequest from './mockAjax'

// 三级列表数据请求
export const reqCategoryList = () =>
  requests({ url: '/product/getBaseCategoryList', method: 'GET' })

// 轮播图数据请求
export const reqGetBannerList = () =>
  mockRequest({ url: '/banner', method: 'GET' })
// mockRequest.get({ url: '/banner' })

// 获取floor数据
export const reqGetFloorList = () =>
  mockRequest({ url: '/floor', method: 'GET' })

// 获取搜索模块数据, post请求，需要传递参数(要给服务器传递一个参数，至少是空对象，否则就会请求失败)
export const reqGetSearchInfo = (params) =>
  requests({ url: '/list', method: 'POST', data: params })

// 获取商品详情的接口
export const reqGoodsInfo = (skuid) =>
  requests({ url: `/item/${skuid}`, method: 'GET' })

// 将产品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' })

// 获取购物车列表数据
export const reqCartList = () =>
  requests({ url: '/cart/cartList', method: 'GET' })

// 删除购物车商品的接口
export const reqDeleteCartById = (skuId) => {
  return requests({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })
}

// 修改商品的选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'GET'
  })
}

// 获取验证码
export const reqGetCode = (phone) => {
  return requests({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })
}

// 注册
export const reqUserRegister = (data) => {
  return requests({ url: '/user/passport/register', data, method: 'POST' })
}

// 登录
export const reqUserLogin = (data) => {
  return requests({ url: 'user/passport/login', data, method: 'POST' })
}

// 获取用户信息【需要带着用户的token向服务器要用户信息】
export const reqUserInfo = () => {
  return requests({ url: '/user/passport/auth/getUserInfo', method: 'GET' })
}

// 退出登录
export const reqLogout = () => {
  return requests({ url: '/user/passport/logout', method: 'GET' })
}

// 获取地址信息接口
export const reqAddressInfo = () => {
  return requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'GET'
  })
}

// 获取商品清单
export const reqOrderInfo = () => {
  return requests({ url: '/order/auth/trade', method: 'GET' })
}

// 提交订单信息
export const reqSubmitOrder = (tradeNo, data) => {
  return requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'POST'
  })
}

// 获取订单支付信息
export const reqPayInfo = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'GET'
  })
}

// 获取支付订单状态
export const reqPayStatus = (orderId) => {
  return requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'GET'
  })
}

// 获取个人中心的数据
export const reqMyOrderList = (page, limit) =>
  requests({ url: `/order/auth/${page}/${limit}`, method: 'GET' })
