/** 
 * 处理所有有关公告的请求
*/
import { request } from "./request";

//获取公告列表
export function getNoticeList() {
  return request({
    url:'/info/getNoticeList',
    method:'post'
  })
}