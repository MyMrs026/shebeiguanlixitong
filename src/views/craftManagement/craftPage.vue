<template>
    <div class="equPage-container">
      <div class="button-group" v-if="curUsername!=='guest'">
        <el-button
          :type="currentTab === 'guangke' ? 'info' : 'success'"
          style="width: 170px; margin-bottom: 15px"
          @click="push('/craftPage/guangke')"
          >光刻</el-button
        >
        <el-button
          :type="currentTab === 'keshi' ? 'info' : 'success'"
          style="width: 170px; margin-bottom: 15px"
          @click="push('/craftPage/keshi')"
          >刻蚀</el-button
        >
        <el-button
          :type="currentTab === 'bomochenji' ? 'info' : 'success'"
          style="width: 170px; margin-bottom: 15px"
          @click="push('/craftPage/bomochenji')"
          >薄膜沉积</el-button
        >
        <el-button
          :type="currentTab === 'canza' ? 'info' : 'success'"
          style="width: 170px; margin-bottom: 15px"
          @click="push('/craftPage/canza')"
          >掺杂</el-button
        >
        <el-button
          :type="currentTab === 'biaozheng' ? 'info' : 'success'"
          style="width: 170px; margin-bottom: 15px"
          @click="push('/craftPage/biaozheng')"
          >表征</el-button
        >
        <el-button
          :type="currentTab === 'jianhe' ? 'info' : 'success'"
          style="width: 170px; margin-bottom: 15px"
          @click="push('/craftPage/jianhe')"
          >键合</el-button
        >
        <el-button
          :type="currentTab === 'rechuli' ? 'info' : 'success'"
          style="width: 170px; margin-bottom: 15px"
          @click="push('/craftPage/rechuli')"
          >热处理</el-button
        >
        <el-button
          :type="currentTab === 'tuan' ? 'info' : 'success'"
          style="width: 170px; margin-bottom: 15px"
          @click="push('/craftPage/tuan')"
          >图案设计和掩膜制作</el-button
        >
        <el-button
          :type="currentTab === 'houduanjiagong' ? 'info' : 'success'"
          style="width: 170px; margin-bottom: 15px"
          @click="push('/craftPage/houduanjiagong')"
          >后端加工</el-button
        >
        <el-button
          :type="currentTab === 'guipianqingxi' ? 'info' : 'success'"
          style="width: 170px; margin-bottom: 15px"
          @click="push('/craftPage/guipianqingxi')"
          >硅片清洗</el-button
        >

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

      this.currentTab = "craftPage";
      this.$router.push("/craftPage/guangke");
  
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