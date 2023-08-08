/**
 * emm先看request.js文件
 * 这个部分是所有有关设备的逻辑代码
 */
import { request } from "./request";

//获取所有设备列表
export function getEquList() {
  return request({
    url:'/device/getDeviceList',
    method:'get'
  })
}

//获取设备分类，注意方法是'post',看接口文档
export function getEquCate() {
  return request({
    url:'/device/getDeviceTypeList',
    method: 'post'
  })
}

//添加设备
export function addEqument(param1,param2,param3,param4,param5) {
  return request({
    url:'/device/addDevice',
    method: 'post',
    data:{
      param1,
      param2,
      param3,
      param4,
      param5
    }
  })
}