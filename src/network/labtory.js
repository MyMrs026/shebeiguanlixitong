/** 
 * 处理所有有关实验室的逻辑代码
*/
import { request } from "./request";

//获取实验室列表(不写默认就是get请求)
export function getLabList() {
  return request({
    url:'/lab/getLabList'
  })
}