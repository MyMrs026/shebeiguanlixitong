/** 
 * 处理所有有关公告的请求
*/
import { request } from "./request";

//获取公告列表
export function getNoticeList() {
  return request({
    url:'/message/notice/list',
    method:'get'
  })
}

//获取最新发布的公告
export function getLatest(){
  return request({
    url:'/message/notice/latest',
    method:'get'
  })
}

//发布公告
export function publishNotice( content,noticeId,createTime,title ) {
  return request({
    url:'/message/notice/add',
    method: 'post',
    data:{
      content:content,
      noticeId:noticeId,
      createTime:createTime,
      title:title
    }
  });
}