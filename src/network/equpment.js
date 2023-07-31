import { request } from "./request";

export function getEquList() {
  return request({
    url:'/device/getDeviceList',
    method:'get'
  })
}

export function getEquCate() {
  return request({
    url:'/device/getDeviceTypeList',
    method: 'post'
  })
}

export function addEqument(param1,param2,param3,param4,param5) {
  return request({
    url:'/api/device/addDevice',
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