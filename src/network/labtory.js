/** 
 * 处理所有有关实验室的逻辑代码
*/
import { request } from "./request";

//获取实验室列表(不写默认就是get请求)
export function getLabList() {
  return request({
    url:'/lab/list'
  })
}

//添加单个实验室
export function addLab( labAddress,labLayoutUrl,labLinkman,labName,labTel ) {
  return request({
    url:'/lab/add',
    method:'post',
    data:{
      labAddress:labAddress,
      labLayoutUrl:labLayoutUrl,
      labLinkman:labLinkman,
      labName:labName,
      labTel:labTel
    }
  })
}

//删除单个实验室
export function delLab(id) {
  return request({
    url:`/lab/remove/${id}`,
    method:'delete'
  })
}

//更新单个实验室
export function updateLab() {
  return request({
    url:'/lab/update',
    method:'put'
  })
}