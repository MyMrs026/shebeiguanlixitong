<template>
  <div class="craft">
    <router-link to="/craft/equcraft">
      <el-button plain>设备工艺</el-button>
    </router-link>
    <router-link to="/craft/craftparams">
      <el-button plain>工艺参数</el-button>
    </router-link>
    <hr/>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>
<style scoped>
.craft{
  margin: 30px;
}
</style>