/** 
 * 处理所有有关用户信息的请求
*/
import { request } from "./request";

//获取用户列表
export function getUserList() {
  return request({
    url:'/system/getUserList',
    method:'post'
  })
}