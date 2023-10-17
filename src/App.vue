<template>
  <div id="app">
    <Layout/>
  </div>
</template>
<script>
/**
 * App.vue里面尽量不写或少写东西，代码规范
 */
import Layout from "./layout/index.vue"
export default {
  name: 'App',
  components: {
    Layout
  },
  
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
  #app {
    width: 100%;
    height: 100%;
  }

</style>
