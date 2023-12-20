/** 
 * 处理所有有关培训的逻辑代码
*/
import { request } from "./request";

//获取培训列表(不写默认就是get请求)
export function getTrainList() {
  return request({
    url:'/training/list'
  })
}

export function addProjectTrain( docUrl,trainDuration,trainIntroduction,trainName ) {
  return request({
    url:'/train/addProjectTrain',
    method: 'post',
    data:{
      docUrl:docUrl,
      trainDuration:trainDuration,
      trainIntroduction:trainIntroduction,
      trainName:trainName
    }
  });
}

//培训预约
export function applyTraining(applicationStatus,createTime,endTime,startTime,trainingApplicationId,trainingId,updateTime,userId) {
    return request({
      url:'/training/submit',
      method: 'post',
      data: {
        applicationStatus:applicationStatus,
        createTime:createTime,
        endTime:endTime,
        startTime:startTime,
        trainingApplicationId:trainingApplicationId,
        trainingId:trainingId,
        updateTime:updateTime,
        userId:userId
      }
    });
}
