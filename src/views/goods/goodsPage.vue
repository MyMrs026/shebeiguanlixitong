<template>
  <div> 
    <router-link to="/goods/category">
      <el-button plain>商品分类</el-button>
    </router-link>
    <router-link to="/goods/details">
      <el-button plain>商品详情</el-button>
    </router-link>
    <hr/>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  components:{

  },
  data() {
    return {
      
    }
  },
  methods:{
    
  }
}
</script>
<style scope>

</style>