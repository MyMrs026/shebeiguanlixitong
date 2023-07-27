import { request } from "./request";

export function getEquList() {
  return request({
    url:'/device/getDeviceList'
  })
}