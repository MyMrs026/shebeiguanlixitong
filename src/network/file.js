/** 
 * 处理所有有关文件上传和下载的逻辑代码
*/
import { request } from "./request";

//获取培训列表(不写默认就是get请求)
export function getImage() {
  return request({
    url:'/file/downloadToClient'
  })
}

export function uploadToServer() {
  return request({
    url:'/file/uploadToServer',
    method: 'post'
  })
}

export function getDeviceImage(){
  return request({
    url:`/file/image/${fileName}`
  })
}
