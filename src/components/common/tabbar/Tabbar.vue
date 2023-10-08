<template>
  <div class="navbar-container">
    <!-- 导航栏部分 -->
    <div class="tabbar">
      <el-row>
        <el-col :span="4">
          <el-col class="institution">
            <img
              src="../../../assets/img/logo.jpg"
              style="width: 25px; height: 25px; float: left"
            />
            <div class="lab" style="float: left; font-size: 20px">
              XXX研究机构
            </div>
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
          <router-link to="/labinform">
            <el-button class="custom-button" type="info" round size="small"
              >实验室信息</el-button
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
          <router-link to="/craft">
            <el-button class="custom-button" type="info" round size="small"
              >工艺管理</el-button
            >
          </router-link>
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
          <router-link to="/test">
            <el-button class="custom-button" type="info" round size="small"
              >测试任务</el-button
            >
          </router-link>
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
        <el-col :span="1">
          <el-tooltip
            class="item"
            effect="light"
            content="我的"
            placement="bottom"
          >
            <i
              class="el-icon-s-custom"
              @click="showDrawer"
              type="primary"
              style="margin-left: 16px"
            ></i>
          </el-tooltip>
        </el-col>
        <el-col :span="1">
          <el-tooltip
            class="item"
            effect="light"
            content="邮件"
            placement="bottom"
          >
            <i
              class="el-icon-message"
              @click="showDrawer"
              type="primary"
              style="margin-left: 16px"
            ></i>
          </el-tooltip>
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
    <!-- 侧边栏部分 -->
    <div>
      <el-drawer
        v-show="isShowDrawer"
        title="我是标题"
        class="drawer"
        :modal="false"
        :modal-append-to-body="false"
        size="20%"
        :visible.sync="Drawer"
        :with-header="false"
        opacity:0.8
      >
        <el-menu
          accordion
          class="drawer-menu"
          :unique-opened="true"
          text-color="#fff"
          active-text-color="#27195e"
        >
          <!-- 信息 -->
          <el-submenu index="1">
            <div slot="title" class="firstly">信息</div>
            <router-link to="/home">
              <el-menu-item @click="closeDrawer" index="1-1" class="secondly"
                >首页信息</el-menu-item
              >
            </router-link>
            <router-link to="/notice">
              <el-menu-item @click="closeDrawer" index="1-2" class="secondly"
                >公告信息</el-menu-item
              >
            </router-link>
            <router-link to="/labinform">
              <el-menu-item @click="closeDrawer" index="1-3" class="secondly"
                >联系信息</el-menu-item
              >
            </router-link>
          </el-submenu>
          <!-- 设备 -->
          <el-submenu index="2">
            <div slot="title" class="firstly">设备</div>
            <router-link to="/equp">
              <el-menu-item @click="closeDrawer" index="2-1" class="secondly"
                >使用设备</el-menu-item
              >
            </router-link>
            <router-link to="/equlist">
              <el-menu-item @click="closeDrawer" index="2-2" class="secondly"
                >设备列表</el-menu-item
              >
            </router-link>
            <router-link to="/equcategory">
              <el-menu-item @click="closeDrawer" index="2-3" class="secondly"
                >设备分类</el-menu-item
              >
            </router-link>
          </el-submenu>
          <!-- 预约 -->
          <el-submenu index="3">
            <div slot="title" class="firstly">预约</div>
            <router-link to="/book">
              <el-menu-item @click="closeDrawer" index="3-1" class="secondly"
                >预约设备</el-menu-item
              >
            </router-link>
            <el-menu-item @click="closeDrawer" index="3-2" class="secondly"
              >日程表</el-menu-item
            >
            <el-menu-item @click="closeDrawer" index="3-3" class="secondly"
              >周程表</el-menu-item
            >
            <el-menu-item @click="closeDrawer" index="3-4" class="secondly"
              >月程表</el-menu-item
            >
          </el-submenu>
          <!-- 账户 -->
          <el-submenu index="4">
            <div slot="title" class="firstly">用户</div>
            <router-link to="/informationDisplay">
              <el-menu-item index="4-4" class="secondly">信息展示</el-menu-item>
            </router-link>

            <router-link to="/personalInfo">
              <el-menu-item index="4-1" class="secondly">编辑信息</el-menu-item>
            </router-link>
            <router-link to="/organizationInfo">
              <el-menu-item index="4-2" class="secondly">组织信息</el-menu-item>
            </router-link>
            <router-link to="/message">
              <el-menu-item index="4-3" class="secondly">信息通知</el-menu-item>
            </router-link>
          </el-submenu>
          <!-- 订单 -->
          <el-submenu index="5">
            <div slot="title" class="firstly">订单</div>
            <el-menu-item @click="closeDrawer" index="5-1" class="secondly"
              >订单列表</el-menu-item
            >
          </el-submenu>
          <!-- 商城 -->
          <el-submenu index="6">
            <div slot="title" class="firstly">商品</div>
            <router-link to="/goods">
              <el-menu-item 
                @click="closeDrawer" 
                index="6-1" 
                class="secondly"
                >商品分类</el-menu-item
              >
            </router-link>
            <router-link to="/goods/details">
            <el-menu-item 
              @click="closeDrawer" 
              index="6-2" 
              class="secondly"
              v-if="this.$store.state.cu_role === 'admin'"
              >商品详情</el-menu-item
            >
            </router-link>
            <router-link to="/goods/category">
              <el-menu-item 
              @click="closeDrawer" 
              index="6-3" 
              class="secondly"
              v-if="this.$store.state.cu_role === 'admin'"
              >商品分类</el-menu-item
            >
            </router-link>
          </el-submenu>
          <!-- 进程信息 -->
          <el-submenu index="7">
            <div slot="title" class="firstly">进程信息</div>
            <el-menu-item @click="closeDrawer" index="7-1" class="secondly"
              >实验室顾问</el-menu-item
            >
            <el-menu-item @click="closeDrawer" index="7-2" class="secondly"
              >进程分享</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-drawer>
    </div>
  </div>
</template>

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
  },
};
</script>

<style scoped>
.navbar-container {
  height: 65px;
}

.tabbar {
  position:fixed;
  z-index:10;
  background-color:rgb(141, 186, 221);
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
  font-size: 100%;
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

.el-icon-message{
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
  margin-top: 15px;
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
  background-color: #48425b;
}

div /deep/ .el-drawer__body {
  background-color: #48425b;
}

.drawer-menu {
  height: 100%;
  background-image: url("../../../assets/img/tabbar2.jpg");
  opacity: 0.8;
}

.secondly {
  background-color: #48425b;
}

div /deep/ .el-submenu__title:hover {
  background-color: rgb(0, 0, 0);
}
</style>