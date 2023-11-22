/**
 * 处理所有有关项目的逻辑代码
 */
import { request } from "./request";
import dayjs from 'dayjs'

/**
 *
 * @returns 项目分类列表
 */
export function getProjectTypeList() {
  return request({
    url: "/project/type/list"
  });
}

/**
 *
 * @returns 项目列表
 */
export function getProjectList() {
  return request({
    url: "/project/list"
  });
}

/**
 *
 * @returns 根据项目id获取项目详情
 */
export function getProjectDetail(id) {
  return request({
    url: "/project/" + id
  });
}

export async function getProjectDetailList() {
  const list = [];
  const projects = await request({ url: "/project/list" });

  for (const project of projects.data) {
    const projectDetails = await request({ url: "/project/" + project.projectId });

    const users = [];
    const equipments = [];

    await Promise.all(
      projectDetails.data.userList.map(async (projectUser) => {
        const user = await request({ url: "/user/" + projectUser.userId });
        users.push(user.data);
      })
    );

    await Promise.all(
      projectDetails.data.equipmentList.map(async (projectEquipment) => {
        const equipment = await request({ url: "/equipment/" + projectEquipment.equipmentId });
        equipments.push(equipment.data);
      })
    );

    list.push({
      ...projectDetails.data,
      userList: users,
      equipmentList: equipments,
    });
  }
  return list;
}

//新建项目
export function createProject(projcet){
  let startTime = dayjs(projcet.startTime).format('YYYY-MM-DD HH:mm:ss')
  let endTime = dayjs(projcet.endTime).format('YYYY-MM-DD HH:mm:ss')
  projcet = {
    ...projcet,
    startTime: startTime,
    endTime: endTime
  }
  return request ({
    url:'/project/add',
    method:'post',
    data: projcet
  })
}

// 添加项目成员
export function addProjectUser(projectUser) {
  return request({
    url: '/project/user/add',
    method: 'post',
    data: projectUser
  })
}

// 更新单个项目
export function updateProejct(project) {
  return request({
    url: '/project/update',
    method: 'put',
    data: project
  })
}

// 根据项目id删除项目
export function deleteProejctById(projectId) {
  return request({
    url: '/project/remove' + projectId,
    method: 'delete'
  })
}