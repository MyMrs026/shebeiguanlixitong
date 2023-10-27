/** 
 * 对于axios请求做了一个最基础的封装
 * 所有其他文件都继承里面的request方法
*/

import axios from "axios";

export function request(config){

  const token = localStorage.getItem('token')

  const instance = axios.create({
    baseURL: 'http://47.98.160.222:8080/api', //接口的地址，如果更改了接口地址只改这里就行
    headers: {
      'Authorization':`${token}`
    },
    timeout: 5000,
  });
  instance.interceptors.request.use(config => {
    return config;
  }),err =>{
    console.log(err);
  }
  instance.interceptors.response.use(res => {
    // console.log(config);
    return res.data
  },err => {
    console.log(err);
  })
  // instance.interceptors.response
  return instance(config)
}