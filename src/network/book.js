/** 
 * 这部分是关于
*/

import { start } from "@popperjs/core";
import { request } from "./request";

//获取登录用户的所有预约信息
export function getOrders() {
  return request ({
    url:'/equipment/order/myOrders',
    method:'get'
  })
}

//根据设备id获取该设备所有的预约信息
export function getequOrders(id) {
  return request ({
    url:`/equipment/order/list/${id}`,
    method:'get'
  })
}

//设备预约
export function makeOrder(endTime,equipmentId,startTime,projectId){
  return request ({
    url:'/equipment/order',
    method:'post',
    data: {
      endTime:endTime,
      equipmentId:equipmentId,
      startTime:startTime,
      projectId:projectId
    }
  })
}

//更改预约信息
export function updateOrder(endTime,equipmentId,equipmentOrderId,projectId,startTime) {
  return request ({
    url: '/equipment/updateOrder',
    method: 'post',
    data: {
      endTime: endTime,
      equipmentId: equipmentId,
      equipmentOrderId: equipmentOrderId,
      projectId: projectId,
      startTime: startTime
    }
  })
}

//撤销设备预约
export function removeOrder(id) {
  return request({
    url: `/equipment/order/remove/${id}`,
    method:'delete'
  })
}