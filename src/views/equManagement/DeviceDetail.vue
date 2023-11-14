<template>
  <!-- 设备详情页 -->
  <div class="container">
    <div class="part1">
      <router-link to="/craft/equcraft">
        <i class="el-icon-back"></i>
      </router-link>
      <p class="text-title">设备详情页</p>
    </div>
    <!-- 中间部分：图片、联系方式、预约链接 -->
    <div class="deviceup">
      <div class="image-container">
        <img
          :src="equinform.equipmentImageUrl"
          class="image"
        >
      </div>
      <div>
          <ul class="equUl">
            <li>联系人:{{equinform.linkman }}</li>
            <li>联系方式:{{equinform.linkmanTel}}</li>
            <li>放置地点:{{equinform.placementLocation}}</li>
          </ul>
      </div>
      <div>
        <router-link to="/book">
          <el-button>机时预约</el-button>
        </router-link>
      </div>
    </div>
    <!-- 下半部分详细信息 -->
    <div class="devicedown">
      <el-descriptions class="margin-top" title="设备信息" :column="3" n border>
    <el-descriptions-item>
      <template slot="label">
        设备名称
      </template>
      {{equinform.equipmentName}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        设备分类
      </template>
      {{equinform.equipmentCategory}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        设备功能
      </template>
      {{equinform.equipmentFunction}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        
        设备状态
      </template>
      {{equinform.equipmentStatus}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        
        实验室名称
      </template>
      {{equinform.labName}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        设备标签
      </template>
      {{equinform.machineLabel}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        制造厂商
      </template>
      {{equinform.manufacturer}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        机时价格
      </template>
      {{equinform.payment}}
    </el-descriptions-item>
  </el-descriptions>
    </div>
  </div>
</template>

<script>
import { getEquList } from "../../network/equpment";
export default {
  data() {
    return {
      deviceId: "",
      equinform: {},
    };
  },
  created() {
    //此处写的应该是axios传出来的promise函数，参照其他文件
    const deviceId = this.$route.params.index;
    console.log("deviceId" + deviceId);
    getEquList().then((res) => {
      // console.log(res.data);
      // this.equinfo = res.data;
      res.data.forEach((element) => {
        if (deviceId == element.equipmentId) {
          this.equinform = element;
        }
      });
      console.log(this.equinform);
    });
  },
  mounted() {
    const equId = this.$route.params.index;
    console.log("equId" + equId);
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  width: 100%;
  background-size: 100% 100%;
  padding-left: 100px;
}
.text-title {
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  margin-left: 50px;
  line-height: 55px;
  font-size: 20px;
  width: 30%;
}
.el-icon-back {
  font-size: 35px;
  color: rgb(0, 0, 0);
}
.part1 {
  display: flex;
  flex-direction: row;
}
.deviceup {
  display: flex;
  flex-direction: row;
  height:100%;
}
.equUl{
  list-style-type:none;
}
.image-container {
  width: 300px; /* 设置容器宽度 */
  height: 300px; /* 设置容器高度 */
  background-color: white; /* 设置占位背景颜色为白色 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 隐藏超出容器的部分 */
}

.image {
  max-width: 100%; /* 图片最大宽度为容器宽度 */
  max-height: 100%; /* 图片最大高度为容器高度 */
  object-fit: cover; /* 保持宽高比例，裁剪并填充容器 */
}
</style>
