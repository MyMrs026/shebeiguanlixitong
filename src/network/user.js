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
export function login( tel,password ){
  return request({
    url:'/user/login',
    method: 'post',
    data:{
      tel:tel,
      password:password  
    }
  })
}