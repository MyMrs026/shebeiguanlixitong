<template>
  <div class="mallLayer">
    <div class="button-group">
      <el-button
        :type="currentTab === 'product' ? 'info' : 'success'"
        style="width: 120px; margin-bottom: 15px"
        @click="push('/mall/product')"
        >产品</el-button
      >
      <el-button
        :type="currentTab === 'reagent' ? 'info' : 'success'"
        style="width: 120px; margin-bottom: 15px"
        @click="push('/mall/reagent')"
        >试剂</el-button
      >
      <el-button
        :type="currentTab === 'material' ? 'info' : 'success'"
        style="width: 120px; margin-bottom: 15px"
        @click="push('/mall/material')"
        >材料</el-button
      >
      <el-button
        :type="currentTab === 'silicon' ? 'info' : 'success'"
        style="width: 120px; margin-bottom: 15px"
        @click="push('/mall/silicon')"
        >硅片</el-button
      >
    </div>
    <div class="content-area">
      <router-view></router-view>
    </div>
  </div>
</template>
  
<script>
import { getLoginUserInfo } from '../../network/user'
export default {
  data() {
    return {
      currentTab: "", // 用于记录当前选中的标签
      curUsername: "",
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
    this.currentTab = "product";
    // 初始导航
    this.$router.push("/mall/product");

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
<style>
.mallLayer {
  display: flex;
  flex-direction: row;
}
.button-group {
  display: flex;
  flex-direction: column;
  width: 20%;
  margin-top: 30px;
  margin-left: 30px;

}
.content-area {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.el-button + .el-button,
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px !important;
}
</style>