<script>
/**
 * 整个页面的导航栏，不多说了
 */
export default {
  data() {
    return {
      projects: [],
      drawerVisible: false,
      activeNames: [], // 控制顶层折叠面板的展开状态
      activeSubNames: [], // 控制子面板的展开状态
      showNavbar: false, // 导航栏是否可见
      isShowDrawer: true,
      Drawer: false,
      proData: [], //项目列表
      getProject: "",
      notificationCount: 0 //数据库更新数据情况
    };
  },
  methods: {
    toggleNavbar() {
      this.showNavbar = !this.showNavbar;
    },
    logOut() {
      this.$router.push("/login");
      localStorage.removeItem("token");
    },
    showDrawer() {
      this.isShowDrawer = true;
      this.Drawer = true;
    },
    closeDrawer() {
      this.isShowDrawer = false;
      this.Drawer = false;
    }
  },
  mounted() {
    this.proData = this.$store.state.proData;
    this.projects = this.proData.map(item => item.name);
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0, user-scalable";
    document.head.appendChild(meta);
  }
};
</script>
<template>
  <!-- 导航栏部分 -->
  <div class="tabbar">
    <el-row>
      <el-col :span="6">
        <el-col class="institution">
          <img
            src="../../../assets/img/weina.png"
            style="width: 200px; height: 50px; float: left"
          />
          <!-- <div class="lab" style="float: left; font-size: 20px">
                浙江大学嘉兴研究院
              </div> -->
        </el-col>
      </el-col>
      <el-col :span="14">
        <el-col
          :span="12"
          style="
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              "
        >
          <router-link to="/home">
            <el-button class="custom-button" type="info" round size="small"
              >首页</el-button
            >
          </router-link>
          <router-link to="/project">
            <el-button class="custom-button" type="info" round size="small"
              >项目管理</el-button
            >
          </router-link>
          <router-link to="/craft/equcraft">
            <el-button class="custom-button" type="info" round size="small"
              >设备管理</el-button
            >
          </router-link>
          <router-link to="/craft/">
            <el-button class="custom-button" type="info" round size="small"
              >设备工艺</el-button
            >
          </router-link>
          <router-link to="/train">
            <el-button class="custom-button" type="info" round size="small"
              >安全培训</el-button
            >
          </router-link>

          <!-- <router-link to="/addProject">
            <el-button class="custom-button" type="info" round size="small"
              >新建项目</el-button
            >
          </router-link> -->

          <router-link to="/mall">
            <el-button class="custom-button" type="info" round size="small"
              >商城</el-button
            >
          </router-link>
        
        </el-col>
      </el-col>
      <el-col :span="4" class="tab-icon" style="display:flex;flex-direction:row;">
        <el-col :span="1" class="icon-question">
          <div class="help-box">
            <router-link to="/help">
              <el-tooltip
                class="item"
                effect="light"
                content="帮助"
                placement="bottom"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
            </router-link>
          </div>
        </el-col>
        <el-col :span="1" class="icon-user">
          <div class="help-box">
            <router-link to="/personalInfo">
              <el-tooltip
                class="item"
                effect="light"
                content="我的信息"
                placement="bottom"
              >
                <i class="el-icon-user"></i>
              </el-tooltip>
            </router-link>
          </div>
        </el-col>
        <el-col :span="1" class="icon-message"
          ><router-link to="/message">
            <el-tooltip
              class="item"
              effect="light"
              content="邮件"
              placement="bottom"
            >
              <el-badge value="new">
                <i
                  class="el-icon-message"
                  type="primary"
                  style="margin-left: 16px"
                ></i>
              </el-badge>
            </el-tooltip>
          </router-link>
        </el-col>
        <el-col :span="1" class="icon-back">
          <el-tooltip
            class="item"
            effect="light"
            content="退出登录"
            placement="bottom"
          >
            <i
              class="el-icon-back"
              @click="logOut"
              type="primary"
              style="margin-left: 16px"
            ></i>
          </el-tooltip>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.tabbar {
  background-color: rgb(141, 186, 221);
  width: 100%;
  height: 65px;
  background-size: 100% 100%;
}

.custom-button {
  margin-right: 0px;
  margin-left: 3px;
  margin-top: 15px;
  border-color: white;
  background-color: rgb(151, 184, 216, 0.5);
  font-size: 80%;
}

/* 帮助icon的盒子 */
.icon-question {
  float: right;
  display: flex;
  font-size: 35px;

  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
.el-icon-question {
  color: white;
}

.icon-user {
  float: right;
  display: flex;
  font-size: 35px;

  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

.el-icon-user {
  color: white;
}

/* 邮件icon的盒子 */
.icon-message {
  float: right;
  display: flex;
  font-size: 35px;

  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
.el-icon-message {
  color: white;
}
div /deep/ .el-badge__content.is-fixed {
  position: absolute;
  top: 15px;
}
/* 退出icon */
.icon-back {
  float: right;
  display: flex;
  font-size: 35px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
.el-icon-back {
  color: white;
}
.el-col.el-col-1 {
  width: 33%;
}

.institution {
  float: left;
  margin-top: 7px;
  margin-left: 15px;
  margin-right: 15px;
}

::v-deep .drawer_body tr.current-row {
  background-color: antiquewhite !important;
}

::v-deep .drawer-menu .firstly {
  border: none;
  border-top: 1px black solid;
  border-bottom: 1px black solid;
}

div /deep/ .el-drawer__body .el-menu {
  background-color: #ffffff;
}

div /deep/ .el-drawer__body {
  background-color: #d6e0f5;
  width: 10%;
}

div /deep/ .drawer-menu-item.secondly {
  background-color: #6565a1;
  width: 10%;
}

div /deep/ .el-submenu__title:hover {
  background-color: rgb(184, 188, 218);
}
</style>
