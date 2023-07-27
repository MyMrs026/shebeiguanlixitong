import axios from "axios";

export function request(config){
  const instance = axios.create({
    baseURL: 'http://172.16.23.115:8080/api',
    timeout: 5000,
  })
  instance.interceptors.request.use(config => {
    return config
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