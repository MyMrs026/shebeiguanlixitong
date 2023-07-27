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