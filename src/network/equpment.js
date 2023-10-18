/**
 * emm先看request.js文件
 * 这个部分是所有有关设备的逻辑代码
 */
import { request } from "./request";

//获取所有设备列表
export function getEquList() {
  return request({
    url:'/equipment/list',
    method:'get'
  })
}

//添加设备
export function addEqument(deviceFunc,deviceName,deviceTypeId,labId,uuid) {
  return request({
    url:'/equipment/add',
    method: 'post',
    data:{
      deviceFunc:deviceFunc,
      deviceName:deviceName,
      deviceTypeId:deviceTypeId,
      labId:labId,
      uuid:uuid
    }
  })
}

//更新设备信息
export function updateDevice(deviceFunc,deviceName,deviceTypeId,labId,uuid){
  return request({
    url:'/equipment/update',
    method: 'post',
    data:{
      deviceFunc:deviceFunc,
      deviceName:deviceName,
      deviceTypeId:deviceTypeId,
      labId:labId,
      uuid:uuid
    }
  })
}

//根据设备id获取设备信息
export function getEquInform(id){
 return request({
  url:'/equipment/{id}',
  method: 'get',
 })
}

//获取设备分类，注意方法是'post',看接口文档
export function getEquCate() {
  return request({
    url:'/equipment/types2',
    method: 'post'
  })
}

//更新设备分类，通过设备id更改
export function updateSingleDeviceType(deviceTypeId,typeName) {
  return request({
    url:'/device/updateSingleDeviceType',
    method: 'post',
    data:{
      deviceTypeId:deviceTypeId,
      typeName:typeName
    }
  })
}

//获取设备维修记录列表
export function getDeviceMaintenanceList(){
  return request({
    url:'/device/getDeviceMaintenanceList',
    method:'get'
  })
}

//设备维修登记
export function addDeviceMaintenance(
  actualEndTime,
  content,
  deviceId,
  deviceMaintenanceId,
  expectedEndTime,
  maintenanceStaff,
  remark,
  startTime){
  return request({
    url:'/device/addDeviceMaintenance',
    method:'post',
    data:{
      actualEndTime:actualEndTime,
      content:content,
      deviceId:deviceId,
      deviceMaintenanceId:deviceMaintenanceId,
      expectedEndTime:expectedEndTime,
      maintenanceStaff:maintenanceStaff,
      remark:remark,
      startTime:startTime
    }
  })
}

//设备维修修改
export function updateDeviceMaintenance(
  actualEndTime,
  content,
  deviceId,
  deviceMaintenanceId,
  expectedEndTime,
  maintenanceStaff,
  remark,
  startTime){
  return request({
    url:'/device/updateDeviceMaintenance',
    method:'post',
    data:{
      actualEndTime:actualEndTime,
      content:content,
      deviceId:deviceId,
      deviceMaintenanceId:deviceMaintenanceId,
      expectedEndTime:expectedEndTime,
      maintenanceStaff:maintenanceStaff,
      remark:remark,
      startTime:startTime
    }
  })
}