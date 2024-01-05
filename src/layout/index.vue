<script>
// import Sidebar from "../components/common/tabbar/Sidebar.vue";
import Navbar from "../components/common/tabbar/Navbar.vue";

export default {
  components: {
    // Sidebar,
    Navbar
  },
  computed: {
    // 当路由路径为登录或注册时不显示tabbar
    isShowTabbar() {
      return this.$route.path !== "/login" && this.$route.path !== "/register";
    }
  }
};
</script>
<template>
  <div class="layout">
    <div class="header" v-if="isShowTabbar">
      <Navbar />
    </div>
    <div class="content">
      <!-- <div class="sidebar" v-if="isShowTabbar">
        <Sidebar />
      </div> -->
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  flex: 0 0 auto;
}

.content {
  flex: 1 1 auto;
  display: flex;
  overflow: hidden;
  /* 隐藏左导航栏宽度溢出的部分 */
}

.sidebar {
  flex: 0 0 auto;
  width: 20vw;
  overflow: auto;
  /* 在左导航栏内容过多时出现滚动条 */
}

.main {
  flex: 1 1 auto;
  overflow-y: auto;
  background-image: url("../assets/img/qqq6.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  margin: 0;
  border: 0;
  padding: 0;
  /* 在右侧内容过多时出现纵向滚动条 */
}
</style>
