<template>
  <div class="project">
    <div class="project-buttons">
      <!-- 这里放四个按钮 -->
      <el-button
        :type="currentTab === 'security' ? 'info' : 'success'"
        style="width: 120px; margin-bottom: 15px"
        @click="setCurrentProjectType('对内项目')"
        >对内项目</el-button
      >
      <el-button
        :type="currentTab === 'equipment' ? 'info' : 'success'"
        style="width: 120px; margin-bottom: 15px"
        @click="setCurrentProjectType('对外项目')"
        >对外项目</el-button
      >
    </div>
    <div class="project-list">
      <el-card
        class="list-item"
        v-for="(item, index) in filterProjects"
        :key="index"
      >
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
              项目成员：<el-button
                v-for="(user, index) in item.userList"
                :key="index"
                @click.stop="handleShowUser(user)"
                >{{ user.username }}</el-button
              >
            </p>
            <p>项目性质：{{ item.project.projectNature }}</p>
          </div>
          <div style="left: 70%px;position: relative;">
            <el-button type="primary" plain size="small"  @click="handleStartExperimentClick(item.project.projectId)"
                  >查看详细信息</el-button
                >
        </div>
        </div>
      </el-card>
    </div>
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
      currentTab:'',
      showEquipmentInfo: false,
      userInfo: null,
      equipmentInfo: null,
      currentProjectType: "对内项目", // 初始项目类型为 '对内项目'
    };
  },
  mounted() {
    getProjectDetailList().then((list) => {
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
        (item) => item.project.projectType === this.currentProjectType
      );
    },
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
    handleStartExperimentClick(projectId) {
      // console.log(row);
      const projectid = projectId;
      this.$router.push({
        path: "/projectinfo",
        query: {
          projectid,
        },
      });
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
      this.currentProjectType = projectType;
    },
    redirectToMyProject(route) {
      this.$router.push(route);
    },
  },
};
</script>
<style scoped>
.project {
  display: flex;
  flex-direction: row;
}

.project-buttons {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 30px;
}

.project-list {
  flex: 7;
}

.list-item {
  margin: 20px;
}

.el-button + .el-button,
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
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
.item-base-info{
  width: 75%;
}
.item-base {
  display: flex;
  float: left;
  justify-content: left;
  align-items: center;
  padding: 10px;
  width: 100%;
}

.detail-1 {
  margin: 10px 0;
  padding: 10px;
  background-color: #dee1e6;
  border-radius: 5px;
}

.detail-2 {
  margin: 10px 0;
  padding: 10px;
  background-color: #dee1e6;
  border-radius: 5px;
}

.detail-3 {
  margin: 10px 0;
  padding: 10px;
  background-color: #dee1e6;
  border-radius: 5px;
}

.item-detail {
  height: 51vh;
}

</style>