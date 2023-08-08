<template>
  <div id="app">
    <tabbar v-if="isShowTabbar"/>
    <!-- <hr v-if="isShowTabbar" class="divided-line"/> -->
    <router-view/>
  </div>
</template>

<script>
import tabbar from "@/components/common/tabbar/Tabbar"

export default {
  name: 'App',
  components: {
    tabbar,
  },
  computed: {
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
