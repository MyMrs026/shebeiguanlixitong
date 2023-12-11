<template>
  <div class="train-container">
    <div class="button-group">
      <el-button
        :type="currentTab === 'security' ? 'info' : 'success'"
        style="width: 120px; margin-bottom: 15px"
        @click="push('/train/security')"
        >安全培训</el-button
      >
      <el-button
        :type="currentTab === 'equipment' ? 'info' : 'success'"
        style="width: 120px; margin-bottom: 15px"
        @click="push('/train/equipment')"
        >设备培训</el-button
      >
    </div>
    <div class="content-area">
      <router-view></router-view>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      currentTab: "", // 用于记录当前选中的标签
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
    this.currentTab = "security";
    // 初始导航
    this.$router.push("/train/security");
  },
};
</script>
<style scoped>
.train-container {
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