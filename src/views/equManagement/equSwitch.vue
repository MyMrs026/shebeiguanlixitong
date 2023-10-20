<template>
  <div class="outer-container">
    <div class="background-craft">
      <div class="craft">
        <div class="button-area">
          <router-link to="/equp">
            <el-button plain>设备管理</el-button>
          </router-link>
          <router-link to="/craft/equcraft">
            <el-button plain>设备信息展示</el-button>
          </router-link>
        </div>
        <hr style="border: 1px solid white; margin-left: 10px; margin-right: 10px" />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.background-craft {
  /*display: flex;
  flex-direction: column;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; 
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding-left:220px;*/
  /* margin-top:70px; */
} 
.outer-container{
    padding-left:100px;
}

.craft {
  height: 82%;
  overflow-y: auto;
}
.button-area {
  margin-top: 20px;
  margin-left: 500px;
}
</style>