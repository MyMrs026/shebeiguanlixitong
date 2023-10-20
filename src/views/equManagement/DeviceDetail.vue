<template>
<!-- 设备详情页 -->
  <div class="container">
    <!-- 上半部分：图片、联系方式、预约链接 -->
    <div class="deviceup">
        <div >
            <img :src="urls[device_id].url" style="width:200px;height:200px;">
        </div>
        <div>
            <button>报告故障</button>
        </div>
        <div>
            <router-link to="/book">
            <button>机时预约</button>
            </router-link>
        </div>
    </div>
    <!-- 下半部分详细信息 -->
    <div class="devicedown">
        <ul class="medium" style="width:50%;height:50%;float:left;margin-top:5px;">
            <li>设备名称</li>
            <li>{{equCrafts[device_id].deviceName }}</li>
            <li>设备型号</li>
            <li>{{equCrafts[device_id].deviceType}}</li>
            <li>设备尺寸</li>
            <li>{{equCrafts[device_id].size}}</li>
            <li>设备重量</li>
            <li>{{equCrafts[device_id].weight}}</li>
            <li>功率信息</li>
            <li>{{equCrafts[device_id].power}}</li>
          </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      device_id:null,
      device:{},
      imageUrl: "",
      equCrafts: [], //目前从vuex中写死，后续从axios中导入
      urls: [
        { url: require("../../assets/img/device2.jpg") },
        { url: require("../../assets/img/device3.jpg") },
        { url: require("../../assets/img/device1.jpg") },
        { url: require("../../assets/img/device4.jpg") },
      ],
    };
  },
  created() {
  this.device_id = this.$route.params.index;
    //此处写的应该是axios传出来的promise函数，参照其他文件
  this.equCrafts = this.$store.state.equCrafts;
  console.log(this.equCrafts);
  },
  mounted(){
    const device_id = this.$route.params.index;
    console.log(device_id);
    
  }
}
</script>

<style>
.container{
    padding-left:200px;
}
</style>