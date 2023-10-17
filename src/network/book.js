/** 
 * 这部分是关于
*/

import { request } from "./request";

//获取登录用户的所有预约信息
export function getOrders() {
  return request ({
    url:'/equipment/order/myOrders',
    methods:'get'
  })
}

//根据设备id获取该设备所有的预约信息
export function getequOrders(id) {
  return request ({
    url:'/equipment/order/list/{id}',
    methods:'get'
  })
}

//设备预约
export function makeOrder(endTime,equipmentId,startTime){
  return request ({
    url:'/equipment/order',
    methods:'post',
    data: {
      endTime:endTime,
      equipmentId:equipmentId,
      startTime:startTime
    }
  })
}