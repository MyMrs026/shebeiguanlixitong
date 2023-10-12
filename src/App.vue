<template>
  <div id="app">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <div class="logo"></div>
    <tabbar v-if="isShowTabbar"/>
    <router-view/>
  </div>
</template>
<script>
/**
 * App.vue里面尽量不写或少写东西，代码规范
 */
import tabbar from "@/components/common/tabbar/Tabbar"
export default {
  name: 'App',
  components: {
    tabbar,
  },
  computed: {
    // 当路由路径为登录或注册时不显示tabbar
    isShowTabbar(){
      return this.$route.path !== '/login' && this.$route.path !== '/register';
    }
  },
  mounted() {
    var browerWidth = window.innerWidth;
    var baseWidth = 1920;
    var zoomValue = browerWidth / baseWidth;
    document.getElementById("mainContainer").style.transform = "scale(" + zoomValue + "," + zoomValue + ")";
    window.onresize = function(){
      browerWidth = window.innerWidth;
      zoomValue = browerWidth / baseWidth;
      document.getElementById("mainContainer").style.transform = "scale(" + zoomValue + "," + zoomValue + ")";
    }
  }
}
</script>

<style>
  @import "assets/css/base.css";
  .divided-line{
    border: 1px solid darkred;  
    margin-left: 10px;
    margin-right: 10px;
    background-color: black;
  }
  .logo { 
    background-image: url("./assets/img/logo.jpg");
  }
</style>
