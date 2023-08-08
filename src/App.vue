<template>
  <div id="app">
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
  }
}
</script>

<style>
.divided-line{
  border: 1px solid darkred;  
  margin-left: 10px;
  margin-right: 10px;
  background-color: black;
}
</style>
