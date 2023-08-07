<template>
  <div class="navbar-container">
    <div class="tabbar">
      <el-row>
        <el-col :span="3">
          <el-col class="institution">
            <img src="../../../assets/img/logo.jpg" style="width: 25px;height:25px;float:left">
            <div class="lab" style="float:left">
              XXX研究机构
            </div>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col class="title">实验室设备预约管理系统</el-col>
        </el-col>
        <el-col :span="6">
          <div>
            <input class="search-box" placeholder="请输入已有项目" v-model="input" clearable />
          </div>

        </el-col>
        <el-col :span="1">
          <i class="el-icon-search"></i>
        </el-col>
        <el-col :span="1">
          <div class="help-box">
            <i class="icon-help el-icon-question"></i>
          </div>
        </el-col>
        <el-col :span="1">
          <i class="el-icon-s-custom" @click="showDrawer" type="primary" style="margin-left: 16px;"></i>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21">
          <router-link to="/home">
            <el-button class="custom-button" type="info" round size="mini">首页</el-button>
          </router-link>
          <router-link to="/project">
            <el-button class="custom-button" type="info" round size="mini">项目管理</el-button>
          </router-link>
          <router-link to="/equp">
            <el-button class="custom-button" type="info" round size="mini">设备管理</el-button>
          </router-link>
          <router-link to="/craft">
            <el-button class="custom-button" type="info" round size="mini">工艺管理</el-button>
          </router-link>
          <router-link to="/book">
            <el-button class="custom-button" type="info" round size="mini">预约管理</el-button>
          </router-link>
          <router-link to="/train">
            <el-button class="custom-button" type="info" round size="mini">培训管理</el-button>
          </router-link>
          <router-link to="/notice">
            <el-button class="custom-button" type="info" round size="mini">公告信息</el-button>
          </router-link>
          <router-link to="/system">
            <el-button class="custom-button" type="info" round size="mini"
              v-if="this.$store.state.cu_role === 'admin'">系统管理</el-button>
          </router-link>
          <router-link to="/test">
            <el-button class="custom-button" type="info" round size="mini">测试任务</el-button>
          </router-link>
        </el-col>
        <el-col :span="3">
          <el-button class="btn" @click="logOut">登出</el-button>
        </el-col>
      </el-row>

    </div>
    <div>
      <el-drawer v-show="isShowDrawer" title="我是标题" class="drawer" :modal="false" :modal-append-to-body="false" size="20%"
        :visible.sync="Drawer" :with-header="false" opacity:0.8>
        <el-menu accordion class="drawer-menu" :unique-opened="true" text-color="#fff" active-text-color="#27195e">
          <el-submenu index="1">
            <template slot="title" class="firstly">信息</template>
            <router-link to="/home">
              <el-menu-item @click="closeDrawer" index="1-1" class="secondly">首页信息</el-menu-item>
            </router-link>
            <router-link to="/home">
              <el-menu-item @click="closeDrawer" index="1-2" class="secondly">一般信息</el-menu-item>
            </router-link>
            <router-link to="/labinform">
              <el-menu-item @click="closeDrawer" index="1-3" class="secondly">联系信息</el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title" class="firstly">设备</template>
            <router-link to="/equp">
              <el-menu-item @click="closeDrawer" index="2-1" class="secondly">使用设备</el-menu-item>
            </router-link>
            <el-menu-item @click="closeDrawer" index="2-2" class="secondly">信息</el-menu-item>
            <router-link to="/equlist">
              <el-menu-item @click="closeDrawer" index="2-3" class="secondly">设备列表</el-menu-item>
            </router-link>
            <el-menu-item @click="closeDrawer" index="2-4" class="secondly">日志</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title" class="firstly">预约</template>
            <el-menu-item @click="closeDrawer" index="3-1" class="secondly">预约设备</el-menu-item>
            <el-menu-item @click="closeDrawer" index="3-2" class="secondly">日程表</el-menu-item>
            <el-menu-item @click="closeDrawer" index="3-3" class="secondly">周程表</el-menu-item>
            <el-menu-item @click="closeDrawer" index="3-4" class="secondly">月程表</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title" class="firstly">账户</template>
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
          <el-submenu index="5">
            <template slot="title" class="firstly">订单</template>
            <el-menu-item @click="closeDrawer" index="5-1" class="secondly">订单列表</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title" class="firstly">商城</template>
            <el-menu-item @click="closeDrawer" index="6-1" class="secondly">硅晶片</el-menu-item>
            <el-menu-item @click="closeDrawer" index="6-2" class="secondly">金属</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title" class="firstly">进程信息</template>
            <el-menu-item @click="closeDrawer" index="7-1" class="secondly">实验室顾问</el-menu-item>
            <el-menu-item @click="closeDrawer" index="7-2" class="secondly">进程分享</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawerVisible: false,
      activeNames: [], // 控制顶层折叠面板的展开状态
      activeSubNames: [], // 控制子面板的展开状态
      input: '',
      showNavbar: false, // 导航栏是否可见
      isShowDrawer: true,
      Drawer: false,
    }
  },
  methods: {
    toggleNavbar() {
      this.showNavbar = !this.showNavbar;
    },
    logOut() {
      this.$router.push('/login')
      localStorage.removeItem('token')
    },
    showDrawer() {
      this.isShowDrawer = true
      this.Drawer = true
    },
    closeDrawer() {
      this.isShowDrawer = false
      this.Drawer = false
    }

  }
}
</script>
<style scoped>
.tabbar {
  background-image: url("../../../assets/img/tabbar2.jpg");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}

.title {
  text-align: center;
  margin-top: 15px;
  height: 40px;
  color: white;
}

.custom-button {
  margin-right: 0px;
  margin-left: 15px;
  margin-bottom: 10px;
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
  background-color: rgb(151, 184, 216, 0.5);
  border: 1px solid white;
  border-radius: 15px;
  margin-top: 17px;
  margin-right: 20px;
  float: right;
  width: 180px;
  height: 27px;
  color: white;
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

/* 帮助icon的div */
.help-box {
  border-radius: 4px;
  text-align: center;
  float: right;
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