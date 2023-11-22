/**
 * emm先看request.js文件
 * 这个部分是所有有关设备的逻辑代码
 */
import { request } from "./request";



//1.添加单个设备
export function addEqument(
  equipmentFunction,
  equipmentCategory,
  equipmentName,
  equipmentImageUrl,
  equipmentStatus,
  labName,
  linkman,
  linkmanTel,
  machineLabel,
  placementLocation,
  payment) {
  return request({
    url:'/equipment/add',
    method: 'post',
    data:{
      equipmentFunction:equipmentFunction,
      equipmentCategory:equipmentCategory,
      equipmentName:equipmentName,
      equipmentImageUrl:equipmentImageUrl,
      equipmentStatus:equipmentStatus,
      labName:labName,
      linkman:linkman,
      linkmanTel:linkmanTel,
      machineLabel:machineLabel,
      placementLocation:placementLocation,
      payment:payment
    }
  })
}
//5.结束使用设备
export function endEqu(equipmentOrderId){
  return request({
    url:`/equipment/end/${equipmentOrderId}`,
    method: 'put'
  })
}
//6.添加实验记录(修改后)
export function addExperiment(equipmentOrderId,experimentNum,params,remark,result,startTime){
  return request({
    url:'/equipment/experiment/add',
    method:'post',
    data:{
      equipmentOrderId:equipmentOrderId,
      experimentNum:experimentNum,
      params: params,
      remark:remark,
      result: result,
      startTime: startTime
    }
  })
}
//7.获取实验记录列表
export function getExperimentList(){
  return request({
    url:'/equipment/experiment/list',
    method:'get'
  })
}
//8.获取我的实验记录列表
export function getMineExperiment(){
  return request({
    url:'/equipment/experiment/mine',
    method:'get'
  })
}
//9.根据id删除实验记录
export function removeExperiment(id){
  return request({
   url: `/equipment/experiment/remove/${id}`,
   method: 'delete',
  })
}
//10.根据id获取实验记录
export function getExperimentById(id){
  return request({
   url: `/equipment/experiment/${id}`,
   method: 'get',
  })
}
//11.获取所有设备列表
export function getEquList() {
  return request({
    url:'/equipment/list',
    method:'get'
  })
}

//16.分页
export function getPage() {
  return request({
    url:'/equipment/page',
    method:'get'
  })
}
//17.删除单个设备
export function removeEqu(id){
  return request({
   url: `/equipment/remove/${id}`,
   method: 'delete',
  })
}
//18.根据设备名搜索
export function searchEqu() {
  return request({
    url:'/equipment/search',
    method: 'get'
  })
}
//19.开始使用设备
export function startEqu(equipmentOrderId) {
  return request({
    url:`/equipment/start/${equipmentOrderId}`,
    method: 'put'
  })
}
//20.获取设备分类列表
export function getEquCate() {
  return request({
    url:'/equipment/type/list',
    method: 'get'
  })
}
//21.更新设备信息
export function updateDevice(
  equipmentFunction,
  equipmentCategory,
  equipmentId,
  equipmentName,
  equipmentImageUrl,
  equipmentStatus,
  labName,
  linkman,
  linkmanTel,
  machineLabel,
  placementLocation,
  payment,
  uuid){
  return request({
    url:'/equipment/update',
    method: 'put',
    data:{
      equipmentFunction:equipmentFunction,
      equipmentCategory:equipmentCategory,
      equipmentId:equipmentId,
      equipmentName:equipmentName,
      equipmentImageUrl:equipmentImageUrl,
      equipmentStatus:equipmentStatus,
      labName:labName,
      linkman:linkman,
      linkmanTel:linkmanTel,
      machineLabel:machineLabel,
      placementLocation:placementLocation,
      payment:payment,
      uuid:uuid
    }
  })
}


//22.根据设备id获取设备信息
export function getEquInform(id){
 return request({
  url: `/equipment/${id}`,
  method: 'get',
 })
}

//23.根据设备id获取设备参数列表
export function getEquAttr(id) {
  return request({
    url: `/equipment/attr/list/${id}`,
    method:'get',
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