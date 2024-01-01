<template>
    <div class="border">
    <div class="border-in">
        <h1 class="title">项目概览</h1>
        <section class="body">
            <p>项目名称:{{ this.projectInfo.data.project.projectName }}</p>
            <p>项目负责人：:{{ this.projectInfo.data.project.leader }}</p>
            <p>
                项目成员：<el-button
                v-for="(user, index) in this.userInfoList"
                :key="index"
                @click.stop="handleShowUser(user)"
                >{{ user.data.username }}</el-button
              >
            </p>
            <p>项目性质：{{ this.projectInfo.data.project.projectNature }}</p>
        </section>
    </div>

    <div class="border-in">
        <h1 class="title">Ⅰ项目信息</h1>
        <section class="body">
            <p>项目来源:{{ this.projectInfo.data.project.projectSource }}</p>
            <p>项目周期:{{ this.projectInfo.data.project.startTime }}-{{ this.projectInfo.data.project.endTime }}</p>
            <p>项目预算：{{ this.projectInfo.data.project.projectBudget }}</p>
        </section>
    </div>
    <div class="border-in">
        <h1 class="title">Ⅱ项目进度</h1>
        <section class="body">
            <el-link :href="this.projectInfo.data.project.projectProcessUrl" type="primary"
              >附件：项目进度单</el-link
            >
        </section>
    </div>
    <div class="border-in">
        <h1 class="title">Ⅲ项目使用设备</h1>
        <section class="body">
        <p>
              <el-button
                v-for="(equipment, index) in this.equInfoList"
                :key="index"
                @click.stop="handleShowEquipment(equipment)"
                >{{ equipment.data.equipmentName }}</el-button
              >
            </p>
        </section>
    </div>
    <el-dialog
      title="用户信息"
      :visible.sync="showUserInfo"
      width="30%"
      class="user-info"
      v-if="userInfo"
    >
      <p>用户名：{{ userInfo.data.username }}</p>
      <p>性别：{{ userInfo.data.gender }}</p>
      <p>实验室：{{ userInfo.data.labName }}</p>
      <p>职称：{{ userInfo.data.job }}</p>
      <p>电话：{{ userInfo.data.tel }}</p>
      <p>邮箱：{{ userInfo.data.email }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUserInfo = false">取 消</el-button>
        <el-button type="primary" @click="showUserInfo = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="设备信息"
      :visible.sync="showEquipmentInfo"
      width="30%"
      class="equipment-info"
      v-if="equipmentInfo"
    >
      <p>设备名称：{{ equipmentInfo.data.equipmentName }}</p>
      <p>设备分类：{{ equipmentInfo.data.equipmentCategory }}</p>
      <p>设备功能：{{ equipmentInfo.data.equipmentFunction }}</p>
      <p>机器标签：{{ equipmentInfo.data.machineLabel }}</p>
      <p>厂商：{{ equipmentInfo.data.manufacturer }}</p>
      <p>规格型号：{{ equipmentInfo.data.specificationModel }}</p>
      <p>所属地区：{{ equipmentInfo.data.area }}</p>
      <p>实验室：{{ equipmentInfo.data.labName }}</p>
      <p>联系人：{{ equipmentInfo.data.linkman }}</p>
      <p>联系方式：{{ equipmentInfo.data.linkmanTel }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEquipmentInfo = false">取 消</el-button>
        <el-button type="primary" @click="showEquipmentInfo = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    </div>
    
  </template>
  <script>
  import { getProjectDetail } from "../../network/project";
  import { getUserInform } from "../../network/user";
  import { getEquInform } from "../../network/equpment";
    export default {
    data() {
        return {
            projectInfo:{
                data:{
                    project:[],
                }
            }, 
            userInfoList:[],
            equInfoList:[],
            showDetail: null,
            showUserInfo: false, // 添加showUserInfo状态来控制el-dialog的显示
            currentTab:'',
            showEquipmentInfo: false,
            userInfo: null,
            equipmentInfo: null,
            currentProjectType: "对内项目", // 初始项目类型为 '对内项目'
        };
    },
    methods: {
        async getProjectInfo(projectId) {
        try {
            this.projectInfo = await getProjectDetail(projectId);
            console.log(this.projectInfo)

            const userlist = this.projectInfo.data.userList;

            this.userInfoList = await Promise.all(userlist.map(async (user) => {
            const userid = user.userId;
            const userInfo = await getUserInform(userid);
            return userInfo;
            }));

            console.log(this.userInfoList)

            const equlist = this.projectInfo.data.equipmentList;

            this.equInfoList = await Promise.all(equlist.map(async (equ) => {
            const equid = equ.equipmentId;
            const equInfo = await getEquInform(equid);
            return equInfo;
            }));
            console.log(this.equInfoList)
        } catch (error) {
            // 处理错误
            console.error(error);
        }
        },
        handleShowUser(user) {
      // 在这里更新showUserInfo的状态以控制el-dialog的显示
        this.showUserInfo = true;
        this.userInfo = user;
        console.log(user);
        },
        handleShowEquipment(equipment) {
        // 在这里更新showUserInfo的状态以控制el-dialog的显示
        this.showEquipmentInfo = true;
        this.equipmentInfo = equipment;
        },
    },
    computed: {
        // 添加计算属性，根据需要进行定义
    },
    created() {
        const projectId = this.$route.query.projectid;
        this.getProjectInfo(projectId);
    },
    };
  </script>
  <style scoped>
  .title{
    margin: 0;
    padding: 0;
    background-color: #4a8ae2;
    border-radius: 20px 20px 0 0;
    color: white;
    text-align: left;
    padding: 10px 0 10px 20px;
    font-size: 30px;
  }
  .body{
    background-color: #fff;
    border-radius: 0 0 20px 20px;
    padding: 20px 0 20px 50px;
  }
  .border{
    width: 80%;
    margin-left: 10%;
  }

  .border-in{
    margin-bottom: 30px;
  }
  </style>
  