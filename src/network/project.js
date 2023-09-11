/** 
 * 处理所有有关项目的逻辑代码
*/
import { request } from "./request";

//获取实验室列表(不写默认就是get请求)
export function getLabList() {
  return request({
    url:'/lab/getLabList'
  })
}

export function addLab( labName,layout,linkman,tel ) {
  return request({
    url:'/system/addLab',
    method:'post',
    data:{
      labName:labName,
      layout:layout,
      linkman:linkman,
      tel:tel
    }
  })
}