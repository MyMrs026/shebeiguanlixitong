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
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, user-scalable';
    document.head.appendChild(meta);
  },
};
</script>
<template>
    <el-menu accordion class="drawer-menu" :unique-opened="true" text-color="#000" active-text-color="#4737ec">
        <!-- 信息 -->
        <el-submenu index="1">
            <div slot="title" class="firstly">信息</div>
            <router-link to="/home">
                <el-menu-item @click="closeDrawer" index="1-1" class="secondly">首页信息</el-menu-item>
            </router-link>
            <router-link to="/notice">
                <el-menu-item @click="closeDrawer" index="1-2" class="secondly">公告信息</el-menu-item>
            </router-link>
            <router-link to="/labinform">
                <el-menu-item @click="closeDrawer" index="1-3" class="secondly">联系信息</el-menu-item>
            </router-link>
        </el-submenu>
        <!-- 设备 -->
        <el-submenu index="2">
            <div slot="title" class="firstly">设备</div>
            <router-link to="/equp">
                <el-menu-item @click="closeDrawer" index="2-1" class="secondly">使用设备</el-menu-item>
            </router-link>
            <router-link to="/equlist">
                <el-menu-item @click="closeDrawer" index="2-2" class="secondly">设备列表</el-menu-item>
            </router-link>
            <router-link to="/equcategory">
                <el-menu-item @click="closeDrawer" index="2-3" class="secondly">设备分类</el-menu-item>
            </router-link>
        </el-submenu>
        <!-- 预约 -->
        <el-submenu index="3">
            <div slot="title" class="firstly">预约</div>
            <router-link to="/book">
                <el-menu-item @click="closeDrawer" index="3-1" class="secondly">预约设备</el-menu-item>
            </router-link>
            <el-menu-item @click="closeDrawer" index="3-2" class="secondly">日程表</el-menu-item>
            <el-menu-item @click="closeDrawer" index="3-3" class="secondly">周程表</el-menu-item>
            <el-menu-item @click="closeDrawer" index="3-4" class="secondly">月程表</el-menu-item>
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
            <router-link to="/bill">
                <el-menu-item index="4-5" class="secondly">用户账单</el-menu-item>
            </router-link>
        </el-submenu>
        <!-- 订单 -->
        <el-submenu index="5">
            <div slot="title" class="firstly">订单</div>
            <el-menu-item @click="closeDrawer" index="5-1" class="secondly">订单列表</el-menu-item>
        </el-submenu>
        <!-- 商城 -->
        <el-submenu index="6">
            <div slot="title" class="firstly">商品</div>
            <router-link to="/goods">
                <el-menu-item @click="closeDrawer" index="6-1" class="secondly">商品分类</el-menu-item>
            </router-link>
            <router-link to="/goods/details">
                <el-menu-item @click="closeDrawer" index="6-2" class="secondly"
                    v-if="this.$store.state.cu_role === 'admin'">商品详情</el-menu-item>
            </router-link>
            <router-link to="/goods/category">
                <el-menu-item @click="closeDrawer" index="6-3" class="secondly"
                    v-if="this.$store.state.cu_role === 'admin'">商品分类</el-menu-item>
            </router-link>
        </el-submenu>
        <!-- 进程信息 -->
        <el-submenu index="7">
            <div slot="title" class="firstly">进程信息</div>
            <el-menu-item @click="closeDrawer" index="7-1" class="secondly">实验室顾问</el-menu-item>
            <el-menu-item @click="closeDrawer" index="7-2" class="secondly">进程分享</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<style scoped>

.drawer-menu {
    height: 100%;
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