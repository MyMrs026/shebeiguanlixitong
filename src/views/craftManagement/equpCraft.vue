<template>
  <div>
    <p class="text-title">{{ message }}</p>
    <!-- 页面有两个部分组成 -->
    <!-- 设备工艺表格 -->
    <div class="table-equcraft-use">
      <div class="equ-item" v-for="(item,index) in urls" :key="index">
        <img v-bind:src="item.url" style="width:100%;height:100%;float:left;max-height:200px;">
        设备名称：{{equCrafts[index].deviceName }}
        <br/>
        <router-link to="/book">
        <el-button>立即预约</el-button>
        </router-link>
        <router-link to="/test">
        <el-button>立即测试</el-button>
        </router-link>
          <!-- <ul class="medium" style="width:50%;height:50%;float:left;margin-top:5px;">
            <li>设备名称</li>
            <li>{{equCrafts[index].deviceName }}</li>
            <li>设备型号</li>
            <li>{{equCrafts[index].deviceType}}</li>
            <li>设备尺寸</li>
            <li>{{equCrafts[index].size}}</li>
            <li>设备重量</li>
            <li>{{equCrafts[index].weight}}</li>
            <li>功率信息</li>
            <li>{{equCrafts[index].power}}</li>
          </ul> -->
      </div>
    </div>
    <hr style="display:flex;border: 5px solid white; margin-left: 10px; margin-right: 10px"/>
    <!-- 设备工艺设置，只在登录用户为管理员时显示 -->
    <div style="width:100%;">
    <div class="p-device">
      <img src="../../assets/img/p-device.png">
    </div>
    <div class="form-equcraft-use" v-if="this.$store.state.cu_role === 'admin'">
      <p class="text-title">设置设备工艺</p>
      <el-form 
        class="form-equcraft" 
        label-width="100px" 
        :model="equCraftForm"
        ref="equCraftForm"
        :rules="rules"
        >
        <el-form-item label="设备名称" prop="deviceName">
          <el-select v-model="value" placeholder="请选择" style="width: 300px">
            <el-option
              v-for="item in device_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备型号" prop="deviceType">
          <el-input
            v-model="equCraftForm.deviceType"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备尺寸" prop="size">
          <el-input v-model="equCraftForm.size" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="设备重量" prop="weight">
          <el-input
            v-model="equCraftForm.weight"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备功率" prop="power">
          <el-input
            v-model="equCraftForm.power"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="submitForm('equCraftForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('equCraftForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  </div>
</template>
<script>
/**
 * 工艺管理页面中的设备工艺子页面
 */
export default {
  components: {},
  data() {
    return {
      currentDate: new Date(),
      message: "设备工艺展示",
      equCrafts: [], //目前从vuex中写死，后续从axios中导入
      equCraftForm: {
        //表单中的内容传入到这
        deviceName: "",
        deviceType: "",
        size: "",
        weight: "",
        power: "",
      },
      device_options: [
        //目前写死，后期也是从数据库中导入
        {
          value: "选项1",
          label: "ASE",
        },
        {
          value: "选项2",
          label: "OEA",
        },
        {
          value: "选项3",
          label: "DTP",
        },
        {
          value: "选项4",
          label: "MKI",
        },
        {
          value: "选项5",
          label: "OSD",
        },
      ],
      value: "", //绑定设备的名称
      urls:[
        {url:require('../../assets/img/device2.jpg')},
        {url:require('../../assets/img/device3.jpg')},
        {url:require('../../assets/img/device1.jpg')},
        {url:require('../../assets/img/device4.jpg')},
        
      ],
      rules:{
        deviceName:[
          {required:true,message:'请输入设备名称',trigger:'blur'}
        ],
        deviceType:[
          {required:true,message:'请输入设备型号',trigger:'blur'}
        ],
        size:[
          {required:true,message:'请输入设备尺寸',trigger:'blur'}
        ],
        weight:[
          {required:true,message:'请输入设备重量',trigger:'blur'}
        ],
        power:[
          {required:true,message:'请输入设备功率',trigger:'blur'}
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          //成功提交
          console.log("提交成功");
          location.reload();
        } else {
          alert("请填写完整")
          location.reload();
          return false;
        }
      })
    },
    resetForm(equCraftForm) {
      this.$refs[equCraftForm].resetFields();
    },
  },
  created() {
    //此处写的应该是axios传出来的promise函数，参照其他文件
    this.equCrafts = this.$store.state.equCrafts;
    console.log(this.equCrafts);
  },
};
</script>
<style scope>
.text-title {
  margin-top: 0px;
  margin-left: 50px;
  line-height: 55px;
  font-size: 20px;
  width:100%;
}
.table-equcraft-use {
  display: flex;
  /* align-items: center;
  justify-content: flex-start; */
  flex-wrap:wrap;
  margin-left:50px;
  margin-right:50px;
  /* gap:40px; */
}
.equ-item {
  flex: 0 0 calc(25% - 40px); /* 让每个元素占据1/3的宽度，减去一些间距 */
  margin-right: 40px; /* 可以根据需要添加间距 */
  margin-bottom: 40px; /* 用于在垂直方向上添加间距 */
  box-sizing: border-box; /* 确保元素的边框和内边距不会使它们超出指定的宽度 */
  background-color: white; /* 设置背景颜色为白色 */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  padding: 10px; /* 可以根据需要调整内边距 */
  border-radius: 10px; /* 添加圆角效果，可以根据需要调整 */
  /* 添加其他样式，例如边框 */
  border: 1px solid #ccc; /* 添加边框 */
}
.equ-item + .equ-item {
  border-color: transparent; /* 隐藏相邻部分之间的边框 */
}
.table-equcraft {
  width: auto;
  height: auto;
  /* border: 1px solid #fff; */
  /* box-shadow: 1px 1px 1px #fff; */
  margin: 0 auto;
  font-size: 1rem;
  font-family: w95fa;
}
.p-device{
  width:40%;
  float:left;
  height:400px;
  margin-left:50px;
  margin-right:50px;
}
.form-equcraft-use {
  width:40%;
  float:left;
  margin-left:50px;
}
.form-equcraft{
  margin-left:50px;
}
.form-equcraft label{
  font-size: 1rem;
  font-family: w95fa;
  color:rgb(50, 49, 49);
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

div /deep/ .el-card.is-always-shadow{
  width:50%;
}
.image {
  width: 50%;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>