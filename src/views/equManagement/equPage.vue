<template>
  <div class="equPage-container">
    <div class="button-group" v-if="curUsername!=='guest'">
      <el-button
        :type="currentTab === 'equCraft' ? 'info' : 'success'"
        style="width: 120px; margin-bottom: 15px"
        @click="push('/equPage/equCraft')"
        >设备工艺展示</el-button
      >
      <!-- <el-button
        :type="currentTab === 'equManagement' ? 'info' : 'success'"
        style="width: 120px; margin-bottom: 15px"
        @click="push('/equPage/equManagement')"
        >设备管理</el-button
      > -->
    </div>
    <div class="content-area">
      <router-view></router-view>
    </div>
  </div>
</template>
  
<script>
import { getLoginUserInfo } from "../../network/user";
export default {
  data() {
    return {
      currentTab: "", // 用于记录当前选中的标签
      curUsername:'',
    };
  },
  methods: {
    push(path) {
      const targetTab = path.split("/").pop();
      if (this.currentTab !== targetTab) {
        this.currentTab = targetTab;
        this.$router.push(path);
      }
    },
  },
  created() {
    // 初始化为安全培训
    this.currentTab = "equCraft";
    // 初始导航
    this.$router.push("/equPage/equCraft");

    // window.location.reload();
    // 获取登录用户信息
    getLoginUserInfo().then((res) => {
      // console.log(res.data);
      this.curUsername = res.data.username;
      // console.log(this.curUsername);
    });
  },
  
};
</script>
<style scoped>
.equPage-container {
  display: flex;
  flex-direction: row;
}
.button-group {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 30px;
}

.content-area {
  width: 100%;
}

.el-button + .el-button,
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}
</style>