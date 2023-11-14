<template>
  <div class="my-project">
    <div class="project-list">
      <el-card
        class="list-item"
        v-for="(item, index) in filterProjects"
        :key="index"
        @click.native="toggleDetail(index)"
      >
        <div class="item-base">
          <div class="img-container">
            <el-image class="img" :src="item.project.projectImg"
              ><div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i></div
            ></el-image>
          </div>

          <div class="item-base-info">
            <p>项目名称：{{ item.project.projectName }}</p>
            <p>项目负责人：{{ item.project.leader }}</p>
            <p>
              项目成员：<el-button
                v-for="(user, index) in item.userList"
                :key="index"
                @click.stop="handleShowUser(user)"
                >{{ user.username }}</el-button
              >
            </p>
            <p>项目性质：{{ item.project.projectNature }}</p>
            <div class="btn-group">
              <el-button type="success">添加成员</el-button>
              <el-button type="primary">编辑项目</el-button>
              <el-button type="danger">删除项目</el-button>
            </div>
          </div>

        </div>
        <div class="item-detail" v-if="showDetail === index">
          <div class="detail-1">
            <div class="">Ⅰ项目信息</div>
            <p>项目来源：{{ item.project.projectSource }}</p>
            <p>
              项目周期：{{ formattedDate(item.project.startTime) }} -
              {{ formattedDate(item.project.endTime) }}
            </p>
            <p>项目预算：{{ item.project.projectBudget }}</p>
          </div>
          <div class="detail-2">
            <div>Ⅱ项目进度</div>
            <el-link :href="item.project.projectProcessUrl" type="primary"
              >附件：项目进度单</el-link
            >
          </div>
          <div class="detail-3">
            <div>Ⅲ项目使用设备</div>
            <p>
              <el-button
                v-for="(equipment, index) in item.equipmentList"
                :key="index"
                @click.stop="handleShowEquipment(equipment)"
                >{{ equipment.equipmentName }}</el-button
              >
            </p>
          </div>
        </div>
      </el-card>
      <el-dialog
      title="用户信息"
      :visible.sync="showUserInfo"
      width="30%"
      class="user-info"
      v-if="userInfo"
    >
      <p>用户名：{{ userInfo.username }}</p>
      <p>性别：{{ userInfo.gender }}</p>
      <p>实验室：{{ userInfo.labName }}</p>
      <p>职称：{{ userInfo.job }}</p>
      <p>电话：{{ userInfo.tel }}</p>
      <p>邮箱：{{ userInfo.email }}</p>
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
      <p>设备名称：{{ equipmentInfo.equipmentName }}</p>
      <p>设备分类：{{ equipmentInfo.equipmentCategory }}</p>
      <p>设备功能：{{ equipmentInfo.equipmentFunction }}</p>
      <p>机器标签：{{ equipmentInfo.machineLabel }}</p>
      <p>厂商：{{ equipmentInfo.manufacturer }}</p>
      <p>厂商：{{ equipmentInfo.specificationModel }}</p>
      <p>所属地区：{{ equipmentInfo.area }}</p>
      <p>实验室：{{ equipmentInfo.labName }}</p>
      <p>联系人：{{ equipmentInfo.linkman }}</p>
      <p>联系方式：{{ equipmentInfo.linkmanTel }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEquipmentInfo = false">取 消</el-button>
        <el-button type="primary" @click="showEquipmentInfo = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    </div>
  </div>
</template>
<script>
import { getProjectDetailList } from "../../network/project";
import { getLoginUserInfo } from '../../network/user'
export default {
  data() {
    return {
      projectList: [],
      showDetail: null,
      showUserInfo: false, // 添加showUserInfo状态来控制el-dialog的显示
      showEquipmentInfo: false,
      userInfo: null,
      equipmentInfo: null,
      currentProjectType: "对内项目", // 初始项目类型为 '对内项目'
      loginUserInfo: null
    };
  },
  mounted() {
    getProjectDetailList().then(list => {
      this.projectList = list;
      console.log(this.projectList);
    });
  },
  computed: {
    formattedDate() {
      return function(date) {
        if (!date) return "";
        return (
          date.slice(0, 4) +
          "年" +
          date.slice(5, 7) +
          "月" +
          date.slice(8, 10) +
          "日"
        );
      };
    },
    filterProjects() {
      return this.projectList.filter(
        item => item.project.leader === this.loginUserInfo.username
      );
    }
  },
  created() {
    getLoginUserInfo().then(res => {
      this.loginUserInfo = res.data
    })
  },
  methods: {
    toggleDetail(index) {
      console.log(index);
      if (this.showDetail === index) {
        this.showDetail = null;
      } else {
        this.showDetail = index;
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
    setCurrentProjectType(projectType) {
      this.currentProjectType = projectType
      console.log(this.currentProjectType);
    },
  }
};
</script>
<style scoped>
.img-container {
  float: left;
  width: 200px;
  height: 200px;
}

.list-item {
  position: relative;
  padding: 10px;
  margin: 10px;
}

.btn-group {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
