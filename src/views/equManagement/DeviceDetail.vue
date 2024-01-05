<template>
  <div class="border-style">
    <h1 class="title"><el-page-header @back="goBack" content="详情页面"></el-page-header></h1>
    <section class="container">
      <div class="image-container">
        <img
          :src="equinform.equipmentImageUrl"
          class="image"
        >
    </div>
    <div class="equlist">
      <ul>
        <li>仪器名称：{{ equinform.equipmentName }}</li>
        <li>仪器型号：{{ equinform.specificationModel }}</li>
        <li>仪器分类：{{ equinform.equipmentCategory }}</li>
        <li>联系方式：{{ equinform.linkman }}{{ equinform.linkmanTel }}</li>
      </ul>
      <router-link :to="'/book/' + equinform.equipmentId">
                <el-button type="primary" plain size="small"
                  >设备预约</el-button
                >
              </router-link>
    </div>
    </section >
    <section class="container">
      <div class="tables">
        <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-descriptions class="infopage" title="" :column="1" :size="size" border>
            <el-descriptions-item labelStyle="width: 30%;color:black;"><template slot="label">放置地点</template>{{ equinform.placementLocation }}</el-descriptions-item>
            <el-descriptions-item labelStyle="width: 30%;color:black;"><template slot="label">工作时间</template>{{ equinform.workTimeBegin }}-{{ equinform.workTimeEnd }}</el-descriptions-item>
            <el-descriptions-item labelStyle="width: 30%;color:black;"><template slot="label">最小预约时长</template>{{ equinform.minBookTime }}分钟</el-descriptions-item>
            <el-descriptions-item labelStyle="width: 30%;color:black;"><template slot="label">最长预约时间</template>{{ equinform.maxBookTime }}分钟</el-descriptions-item>
            <el-descriptions-item labelStyle="width: 30%;color:black;"><template slot="label">最近提前预约时间</template>{{ equinform.advanceTime }}分钟</el-descriptions-item>
            <el-descriptions-item labelStyle="width: 30%;color:black;"><template slot="label">最远提前预约时间</template>{{ equinform.longestAdvanceTime }}分钟</el-descriptions-item>
            <el-descriptions-item labelStyle="width: 30%;color:black;"><template slot="label">预约日历最小单位时间块</template>15分钟</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="主要技术指标">暂无数据</el-tab-pane>
        <el-tab-pane label="主要功能">暂无数据</el-tab-pane>
        <el-tab-pane label="应用场景">暂无数据</el-tab-pane>
        <el-tab-pane label="计费规则">
          <el-descriptions class="infopage" title="" :column="1" :size="size" border>
            <el-descriptions-item labelStyle="width: 30%;color:black;"><template slot="label">自行操作</template>{{ equinform.payment }}元/小时</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        </el-tabs>
    </div>
    </section>
  </div>
</template>

<script>
import { method } from "lodash";
import { getEquList,getEquInform } from "../../network/equpment";
export default {
  data() {
    return {
      deviceId: "",
      equinform: {},
      size:'large',
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
  methods:{
    goBack() {
        this.$router.push({path: "/equPage",});
      }
  },
  mounted() {
    const equId = this.$route.params.index;
    console.log("equId" + equId);
  },
};
</script>

<style scoped>
.border-style{
  width: 80%;
  margin-left: 10%;
  float: left;
}
.equlist{
  width: 40%;
  padding-left: 5%;
}

.equlist ul{
  margin-top:20%;
}
.equlist li{
  margin: 10px 0 10px 0;
  color: black;
}
.equlist button{
  margin-left: 30%;
  margin-top: 10%;
}

.title{
  color: #fff;
  background-color: #4a8ae2;
  border-radius: 20px 20px 0 0;
  padding: 10px 0 10px 20px;
  font-size: 20px;
  margin: 0;
  margin-top: 2%;
}

.container {
  display: flex;
  float: left;
  width: 100%;
  background-color: #fff;
}

.title /deep/ .el-page-header__content {
  color: white;
}

.tables{
  width: 90%;
  margin: 5% 0 5% 5%;
  height: 400px;
}

.image-container {
  width: 300px; /* 设置容器宽度 */
  height: 300px; /* 设置容器高度 */
  background-color: white; /* 设置占位背景颜色为白色 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 隐藏超出容器的部分 */
  width: 50%;
  margin-top: 1%;
}

.image {
  max-width: 100%; /* 图片最大宽度为容器宽度 */
  max-height: 100%; /* 图片最大高度为容器高度 */
  object-fit: cover; /* 保持宽高比例，裁剪并填充容器 */
}
</style>
