<template>
  <div class="tabbar">
    <el-row>
      <el-col :span="2">
        <div class="navbar-container">
          <el-button class="navbar-toggle" icon="el-icon-menu" @click="toggleNavbar"></el-button>
          <div class="navbar-menu" :class="{ 'show': showNavbar }">
            <el-menu mode="horizontal">
              <el-menu-item index="1">导航1</el-menu-item>
              <el-menu-item index="2">导航2</el-menu-item>
              <el-menu-item index="3">导航3</el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <el-row class="title">XXX管理系统</el-row>
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
          <router-link to="/craft">
            <el-button class="custom-button" type="info" round size="mini">工艺管理</el-button>
          </router-link>
          <router-link to="/book">
            <el-button class="custom-button" type="info" round size="mini">预约管理</el-button>
          </router-link>
          <router-link to="/train">
            <el-button class="custom-button" type="info" round size="mini">培训管理</el-button>
          </router-link>
          <router-link to="/train">
            <el-button class="custom-button" type="info" round size="mini">测试任务</el-button>
          </router-link>
          <router-link to="/train">
            <el-button class="custom-button" type="info" round size="mini">信息管理</el-button>
          </router-link>
          <router-link to="/train">
            <el-button class="custom-button" type="info" round size="mini">系统管理</el-button>
          </router-link>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-col :span="8">
          <div class="research-box">
            <div>已有项目</div>
            <el-input placeholder="请输入内容" v-model="input" clearable>
            </el-input>
          </div>

        </el-col>
        <el-col :span="2">
          <div class="help-box">
            <i class="icon-help el-icon-question"></i>
            <p class="font-help">帮助</p>
          </div>

        </el-col>
        <el-col :span="12">
          <el-col :span="8">
            XXX研究机构
          </el-col>
          <el-col :span="8">
            <img src="src/assets/img/logo.jpg">
          </el-col>
          <el-col :span="8">
            <el-button>登出</el-button>
          </el-col>
        </el-col>
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
  }
}
</script>
<style scoped>
.title {
  align-items: center;
  text-align: center;
}

.custom-button {
  margin-right: 0px;
  margin-left: 0px;
  border-color: red;
}

.icon-help {
  display: flex;
  font-size: 45px;
  color: red;
  justify-content: center;
  align-items: center;
}

.font-help {
  display: flex;
  font-size: 15px;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  margin-bottom: 0;
  color: red;
}

.research-box {
  border: 1px solid red;
  border-radius: 4px;
}

.help-box {
  border: 1px solid red;
  border-radius: 4px;

}

.navbar-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.navbar-toggle {
  margin: 15px;
}

.navbar-menu {
  display: none;
}

.navbar-menu.show {
  display: block;
}
</style>