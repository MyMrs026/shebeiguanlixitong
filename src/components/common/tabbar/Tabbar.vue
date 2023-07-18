<template>
  <div class="tabbar">
    <el-row>
      <el-col :span="2">
        <div class="navbar-container">
          <el-button class="navbar-toggle" icon="el-icon-menu" @click="toggleNavbar"></el-button>
          <div class="navbar-menu" :class="{ 'show': showNavbar }">
            <el-menu>
              <el-submenu index="1"> 
                <template slot="title">信息</template>
                <el-menu-item index="1-1">首页信息</el-menu-item>
                <el-menu-item index="1-2">一般信息</el-menu-item>
                <el-menu-item index="1-3">联系信息</el-menu-item>
              </el-submenu>
              <el-submenu index="2"> 
                <template slot="title">设备</template>
                <el-menu-item index="2-1">使用设备</el-menu-item>
                <el-menu-item index="2-2">信息</el-menu-item>
                <el-menu-item index="2-3">设备列表</el-menu-item>
                <el-menu-item index="2-4">日志</el-menu-item>
              </el-submenu>
              <el-submenu index="3"> 
                <template slot="title">预约</template>
                <el-menu-item index="3-1">预约设备</el-menu-item>
                <el-menu-item index="3-2">日程表</el-menu-item>
                <el-menu-item index="3-3">周程表</el-menu-item>
                <el-menu-item index="3-4">月程表</el-menu-item>
              </el-submenu>
              <el-submenu index="4"> 
                <template slot="title">账户</template>
                <el-menu-item index="4-1">编辑信息</el-menu-item>
                <el-menu-item index="4-2">组织信息</el-menu-item>
                <el-menu-item index="4-3">邮件联系</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <el-row class="title">实验室设备预约管理系统</el-row>
        <el-row>
          <router-link to="/home">
            <el-button class="custom-button" type="info" round size="mini">首页</el-button>
          </router-link>
          <router-link to="/project">
            <el-button class="custom-button" type="info" round size="mini">项目管理</el-button>
          </router-link>
          <router-link to="/equp">
            <el-button class="custom-button" type="info" round size="mini">设备管理</el-button>
          </router-link>
          <!-- <router-link to="/craft">
            <el-button class="custom-button" type="info" round size="mini">工艺管理</el-button>
          </router-link> -->
          <router-link to="/book">
            <el-button class="custom-button" type="info" round size="mini">预约管理</el-button>
          </router-link>
          <router-link to="/train">
            <el-button class="custom-button" type="info" round size="mini">培训管理</el-button>
          </router-link>
          <!-- <router-link to="/train">
            <el-button class="custom-button" type="info" round size="mini">测试任务</el-button>
          </router-link> -->
          <router-link to="/information">
            <el-button class="custom-button" type="info" round size="mini">信息管理</el-button>
          </router-link>
          <router-link to="/system">
            <el-button class="custom-button" type="info" round size="mini" v-if="this.$store.state.cu_role==='admin'">系统管理</el-button>
          </router-link>
        </el-row>
      </el-col>
      <el-col :span="7">
        <el-col :span="9">
          <div class="research-box">
            <div style="color:white">已有项目</div>
            <el-input placeholder="请输入内容" v-model="input" clearable>
            </el-input>
          </div>

        </el-col>
        <el-col :span="5">
          <div class="help-box">
            <i class="icon-help el-icon-question"></i>
            <p class="font-help">帮助</p>
          </div>

        </el-col>
        <el-col :span="7" class="institution">
          <el-col >
          <el-col >
            <img  src="../../../assets/img/logo.jpg" style="width: 70px;height:70px">
          </el-col >
          <el-col >
            <div class="lab">
              XXX研究机构
            </div>           
          </el-col>
          </el-col>
          </el-col>
          
      </el-col>
      <el-col :span="1" >
            <el-button class="btn" @click="logOut">登出</el-button>
          </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      showNavbar: false, // 导航栏是否可见
    }
  },
  methods: {
    toggleNavbar() {
      this.showNavbar = !this.showNavbar;
    },
    logOut(){
      this.$router.push('/login')
      localStorage.removeItem('token')
    },
  }
}
</script>
<style scoped>
.tabbar {
  background-image:url("../../../assets/img/tabbar2.jpg");
  width:100%;
  height:100%;
  background-size:100% 100%;
}
.title {
  text-align: center;
  margin-top:10px;
  height:40px;
  color:white;
}
.custom-button {
  margin-right: 0px;
  margin-left: 0px;
  margin-bottom: 10px;
  border-color: white;
  background-color:rgb(151, 184, 216,0.5);
  font-size: 100%;
}
.icon-help {
  display: flex;
  font-size: 45px;
  color: white;
  justify-content: center;
  align-items: center;
  margin:10px;
}
.font-help {
  align-items: center;
  margin-top: 0;
  margin-bottom: 0;
  color: white;
}
.research-box {
  border: 1px solid white;
  border-radius: 4px;
  margin:4px;
}
.help-box {
  border: 1px solid white;
  border-radius: 4px;
  margin:4px;
  text-align: center;
}
.institution {
  float:left;
  margin:5px;
}
.lab{
  color:#fff;
}
.btn{
  width:50px;
  height:25px;
  margin:20px;
  display:flex;
  align-items: center;
  justify-content: center;
  line-height:20px;
  font-size: 13px;
  float:right;
  text-align: center;
  color:white;
}
.btn:hover{
  background-color: rgb(151, 184, 216,0.5);
}
.navbar-toggle {
  margin: 15px;
  margin-top:40px;
}

.navbar-menu {
  display: none;
  width:200px;
}

.navbar-menu.show {
  display: block;
}
</style>