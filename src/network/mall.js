import { request } from "./request";

//1.获取所有的商品
export function getProduct() {
  return request({
    url:'/product/list'
  })
}

//2.添加单个商品订单
export function addProductOrder(createTime,productId,productNum,productOrderId,total,userId) {
  return request({
    url:'/product/order/add',
    method:'post',
    data:{
      createTime:createTime,
      productId:productId,
      productNum:productNum,
      productOrderId:productOrderId,
      total:total,
      userId:userId
    }
  })
}

//3.获取商品订单列表
export function getProductOrderList() {
  return request({
    url:'/product/order/list'
  })
}

//4.商品订单分页
export function getProductOrdePage() {
  return request({
    url:'/product/order/page'
  })
}

//5.删除商品订单
export function removeProductOrder(id) {
  return request({
    url:`/product/order/remove/${id}`,
    method:'delete'
  })
}

//6.提交订单
export function orderSubmit(productId,productNum,total) {
  return request({
    url:'/product/order/submit',
    method:'post',
    data:{
      productId:productId,
      productNum,productNum,
      total:total
    }
  })
}

//7.商品分页
export function getProductPage() {
  return request({
    url:'/product/page'
  })
}

//8.获取商品分类列表
export function getProductTypeList() {
  return request({
    url:'/product/type/list'
  })
}

//9.根据id获取商品分类列表
export function getProductById(id) {
  return request({
    url:`/product/${id}`
  })
}