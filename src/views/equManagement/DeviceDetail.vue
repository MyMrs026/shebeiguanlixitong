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
      <div>
        <img
          :src="equinform.equipmentImageUrl"
          style="width:300px;height:300px;"
        >
      </div>
      <div>
        <router-link to="/book">
          <el-button>机时预约</el-button>
        </router-link>
      </div>
    </div>
    <!-- 下半部分详细信息 -->
    <div class="devicedown">
      <p>设备信息</p>
      <ul
        class="medium"
        style="width:50%;height:50%;float:left;margin-top:5px;"
      >
        <li>设备名称</li>
        <li>{{equinform.equipmentName}}</li>
        <li>设备分类</li>
            <li>{{equinform.equipmentCategory}}</li>
            <li>设备功能</li>
            <li>{{equinform.equipmentFunction}}</li>
            <li>设备状态</li>
            <li>{{equinform.equipmentStatus}}</li>
            <li>实验室名称</li>
            <li>{{equinform.labName}}</li>
            <li>联系人</li>
            <li>{{equinform.linkman }}</li>
            <li>联系方式</li>
            <li>{{equinform.linkmanTel}}</li>
            <li>设备标签</li>
            <li>{{equinform.machineLabel}}</li>
            <li>制造厂商</li>
            <li>{{equinform.manufacturer}}</li>
            <li>放置地点</li>
            <li>{{equinform.placementLocation}}</li>
            <li>机时价格</li>
            <li>{{equinform.payment}}</li>
      </ul>
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
}
</style>