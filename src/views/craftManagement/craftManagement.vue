<template>
  <div class="background-craft">
    <div class="craft">
      <div class="button-area">
        <router-link to="/craft/equcraft">
          <el-button plain>设备工艺</el-button>
        </router-link>
        <router-link to="/craft/craftparams">
          <el-button plain>工艺参数</el-button>
        </router-link>
      </div>
      <hr
        style="border: 1px solid white; margin-left: 10px; margin-right: 10px"
      />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.background-craft {
  /* position: fixed;
  top: 110px; */
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* 将背景容器放置在最底层 */
  overflow: hidden; /* 隐藏溢出的内容 */
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.craft {
  height: 82%;
  overflow-y: auto;
}
.button-area {
  margin-top: 20px;
  margin-left: 30px;
}
</style>