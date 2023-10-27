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
      notificationCount: 0, //数据库更新数据情况
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
    },
  },
  mounted() {
    this.proData = this.$store.state.proData;
    this.projects = this.proData.map((item) => item.name);
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0, user-scalable";
    document.head.appendChild(meta);
  },
};
</script>
<template>
  <!-- 导航栏部分 -->
  <div class="tabbar">
    <el-row>
      <el-col :span="5">
        <el-col class="institution">
          <img
            src="../../../assets/img/weinalogo.png"
            style="width: 200px; height: 50px; float: left"
          />
          <!-- <div class="lab" style="float: left; font-size: 20px">
              浙江大学嘉兴研究院
            </div> -->
        </el-col>
      </el-col>
      <el-col :span="16">
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
          <router-link to="/equp">
            <el-button class="custom-button" type="info" round size="small"
              >设备管理</el-button
            >
          </router-link>
          <!-- <router-link to="/craft/craftparams">
              <el-button class="custom-button" type="info" round size="small"
                >工艺管理</el-button
              >
            </router-link> -->
          <router-link to="/book">
            <el-button class="custom-button" type="info" round size="small"
              >预约管理</el-button
            >
          </router-link>
          <router-link to="/train">
            <el-button class="custom-button" type="info" round size="small"
              >培训管理</el-button
            >
          </router-link>
          <router-link to="/notice">
            <el-button class="custom-button" type="info" round size="small"
              >公告信息</el-button
            >
          </router-link>
          <router-link to="/system">
            <el-button
              class="custom-button"
              type="info"
              round
              size="small"
              v-if="this.$store.state.cu_role === 'admin'"
              >系统管理</el-button
            >
          </router-link>
          <!-- <router-link to="/test">
              <el-button class="custom-button" type="info" round size="small"
                >测试任务</el-button
              >
            </router-link> -->
        </el-col>
      </el-col>
      <el-col :span="1">
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

      <el-col :span="1" class="mail"
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
      <el-col :span="1">
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

div /deep/ .el-badge__content.is-fixed {
  position: absolute;
  top: 10px !important;
}

.custom-button {
  margin-right: 0px;
  margin-left: 3px;
  margin-top: 15px;
  border-color: white;
  background-color: rgb(151, 184, 216, 0.5);
  font-size: 80%;
}

.font-help {
  align-items: center;
  margin-top: 0;
  margin-bottom: 0;
  color: white;
}

/* 搜索输入栏 */
.search-box {
  /* background-color: rgb(151, 184, 216,0.3); */
  border: none;
  border-radius: 5px;
  border-bottom-width: 1px;
  border-bottom-color: rgb(255, 255, 255);
  border-bottom-style: solid;
  margin-top: 17px;
  margin-right: 20px;
  float: right;
  width: 180px;
  height: 27px;
  opacity: 0.4;
  /* color: white; */
}

.el-icon-question {
  float: right;
  display: flex;
  font-size: 35px;
  color: white;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
}

/* 搜索icon */
.el-icon-search {
  float: right;
  display: flex;
  font-size: 35px;
  color: white;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
}

.el-icon-message {
  float: right;
  display: flex;
  font-size: 35px;
  color: white;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
}

.el-icon-back {
  float: right;
  display: flex;
  font-size: 35px;
  color: white;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
}

.icon-help {
  display: flex;
  font-size: 35px;
  color: white;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  float: right;
}

/* 个人icon */
.el-icon-s-custom {
  display: flex;
  font-size: 35px;
  color: white;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  float: right;
}

.institution {
  float: left;
  margin-top: 7px;
  margin-left: 15px;
  margin-right: 15px;
}

.lab {
  margin-left: 15px;
  color: #fff;
}

.btn {
  width: 50px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 20px;
  font-size: 13px;
  float: right;
  text-align: center;
  color: white;
  margin-right: 15px;
}

.btn:hover {
  background-color: rgb(151, 184, 216, 0.5);
}

.navbar-toggle {
  margin: 15px;
  margin-top: 40px;
  float: right;
}

.navbar-menu {
  display: none;
  width: 100px;
}

.navbar-menu.show {
  display: flex;
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

.drawer-menu {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  opacity: 0.8;
}

div /deep/ .drawer-menu-item.secondly {
  background-color: #6565a1;
  width: 10%;
}

div /deep/ .el-submenu__title:hover {
  background-color: rgb(184, 188, 218);
}
</style>