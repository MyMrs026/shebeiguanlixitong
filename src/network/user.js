/** 
 * 处理所有有关用户信息的请求
*/
import { request } from "./request";

//获取用户列表
export function getUserList() {
  return request({
    url:'/system/getUserList',
    method:'get'
  })
}
//用户登录
export function login(tel,password){
  return request({
    url:'user/login',
    method: 'post',
    data:{
      password:password,
      tel:tel,
    }
  })
}
//用户注册
export function register(checkPassword,
  company,
  email,
  gender,
  job,
  labName,
  mentor,
  password,
  tel,
  username){
  return request({
    url:'user/register',
    method: 'post',
    data:{
      checkPassword:checkPassword,
      company:company,
      email:email,
      gender:gender,
      job:job,
      labName:labName,
      mentor:mentor,
      password:password,
      tel:tel,
      username:username
    }
  })
}
//获取用户权限
export function getLoginUserRole(){
  return request({
    url:'/user/getLoginUserRole',
    methods: 'get'
  })
}

//根据id获取用户所有信息
export function getUserInform(id) {
  return request({
    url:`/user/${id}`,
    methods: 'get'
  })
}
//修改当前用户信息
export function updateLoginUser(user){
  return request({
    url:'user/updateLoginUser',
    method: 'put',
    data:user
  })
}
//获取登录用户信息
export function getLoginUserInfo(){
  return request({
    url:'user/getLoginUserInfo',
    method: 'get'
  })
}