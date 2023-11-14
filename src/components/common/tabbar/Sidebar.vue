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
    <el-menu
      router
      default-active="2"
      background-color="#eee"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="/myProject">
        <i class="el-icon-menu"></i>
        <span slot="title">我管理的项目</span>
      </el-menu-item>
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
