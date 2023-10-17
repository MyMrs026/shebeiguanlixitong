/** 
 * 处理所有有关项目的逻辑代码
*/
import { request } from "./request";

//获取实验室列表(不写默认就是get请求)
export function getLabList() {
    return request({
        url: '/lab/getLabList'
    })
}

export function addLab(labName, layout, linkman, tel) {
    return request({
        url: '/system/addLab',
        method: 'post',
        data: {
            labName: labName,
            layout: layout,
            linkman: linkman,
            tel: tel
        }
    })
}

/**
 * 
 * @returns 项目分类列表
 */
export function getProjectTypeList() {
    return request({
        url: '/project/type/list'
    })
}

/**
* 
* @returns 项目列表
*/
export function getProjectList() {
    return request({
        url: '/project/list'
    })
}

/**
* 
* @returns 根据项目id获取项目详情
*/
export function getProjectDetail(id) {
    return request({
        url: '/project/' + id
    })
}

