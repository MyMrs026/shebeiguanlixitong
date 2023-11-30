<template>
  <div class="project">
    <div class="project-buttons">
      <!-- 这里放四个按钮 -->
      <el-button 
       type="success" 
       style="width: 120px; margin-bottom: 15px;" 
       
       @click="setCurrentProjectType('对内项目')"
       >对内项目</el-button>
      <el-button 
       type="success" 
       style="width: 120px; margin-bottom: 15px;" 
       @click="setCurrentProjectType('对外项目')"
       
       >对外项目</el-button>
      <el-button 
       type="success" 
       style="width: 120px; margin-bottom: 15px;" 
       @click="redirectToMyProject('/myProject')"
       
       >我管理的项目</el-button>
      <el-button 
       type="success" 
       style="width: 120px; margin-bottom: 15px;" 
       @click="redirectToMyProject('/addProject')"
       
       >新建项目</el-button>
    </div>
    <div class="project-list">
      <el-card class="list-item" v-for="(item, index) in filterProjects" :key="index" @click.native="toggleDetail(index)">
        <div class="item-base">
          <div class="img-container">
            <el-image class="img" :src="item.project.projectImg">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>

          <div class="item-base-info">
            <p>项目名称：{{ item.project.projectName }}</p>
            <p>项目负责人：{{ item.project.leader }}</p>
            <p>
              项目成员：<el-button v-for="(user, index) in item.userList" :key="index" @click.stop="handleShowUser(user)">{{
                user.username }}</el-button>
            </p>
            <p>项目性质：{{ item.project.projectNature }}</p>
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
            <el-link :href="item.project.projectProcessUrl" type="primary">附件：项目进度单</el-link>
          </div>
          <div class="detail-3">
            <div>Ⅲ项目使用设备</div>
            <p>
              <el-button v-for="(equipment, index) in item.equipmentList" :key="index"
                @click.stop="handleShowEquipment(equipment)">{{ equipment.equipmentName }}</el-button>
            </p>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog title="用户信息" :visible.sync="showUserInfo" width="30%" class="user-info" v-if="userInfo">
      <p>用户名：{{ userInfo.username }}</p>
      <p>性别：{{ userInfo.gender }}</p>
      <p>实验室：{{ userInfo.labName }}</p>
      <p>职称：{{ userInfo.job }}</p>
      <p>电话：{{ userInfo.tel }}</p>
      <p>邮箱：{{ userInfo.email }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUserInfo = false">取 消</el-button>
        <el-button type="primary" @click="showUserInfo = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="设备信息" :visible.sync="showEquipmentInfo" width="30%" class="equipment-info" v-if="equipmentInfo">
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
        <el-button type="primary" @click="showEquipmentInfo = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getProjectDetailList } from "../../network/project";
export default {
  data() {
    return {
      projectList: [],
      showDetail: null,
      showUserInfo: false, // 添加showUserInfo状态来控制el-dialog的显示
      showEquipmentInfo: false,
      userInfo: null,
      equipmentInfo: null,
      currentProjectType: "对内项目" // 初始项目类型为 '对内项目'
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
      return function (date) {
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
      // console.log(计算属性);
      return this.projectList.filter(
        item => item.project.projectType === this.currentProjectType
      );
    }
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

    },
    redirectToMyProject(route) {
      this.$router.push(route);
    }
  }
};
</script>
<style scoped>
.project {
  display: flex;
  flex-direction: row;
}

.project-buttons {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 30px;
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 30px;
}

.list-item {
  flex-basis: 40%;
  margin: 0 10px 20px 0;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  /* 添加过渡效果 */
  position: relative;
  /* 设置相对定位 */
  height: 300px;
}

.el-button+.el-button,
.el-checkbox.is-bordered+.el-checkbox.is-bordered {
  margin-left: 0;
}

.list-item:not(.active) {
  transform: scale(1);
  /* 未激活时保持原始大小 */
}

.list-item.active {
  transform: scale(1.05);
  /* 激活时放大 */
  z-index: 2;
  /* 设置z-index以覆盖其他卡片 */
}

.img-container {
  width: 200px;
  height: 200px;
  border: 2px solid #dcdfe6;
  margin-right: 10px;
  position: relative;
  /* 设置相对定位 */
}

.img {
  max-width: 80%;
  max-height: 80%;
  /* 限制图像的最大高度 */
  object-fit: contain;
  /* 保持原始比例，完整显示图像 */
  position: absolute;
  /* 设置绝对定位 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 居中显示图像 */
}

.item-base {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.item-detail {
  position: absolute;
  /* 设置绝对定位 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  z-index: 1;
  /* 位于卡片下方 */
  padding: 10px;
}
</style>
