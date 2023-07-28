import { request } from "./request";

export function getUserList() {
  return request({
    url:'/system/getUserList',
    method:'post'
  })
}