import { request } from "./request";

export function getNoticeList() {
  return request({
    url:'/info/getNoticeList',
    method:'post'
  })
}