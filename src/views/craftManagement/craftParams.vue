<template>
  <div>
    <p class="text-title">{{ message }}</p>
    <div class="table-equcraft-use">
      <!-- <el-table 
        :data="craftParams"
        class="table-equcraft"
        border
      >
        <el-table-column fixed prop="deviceName" label="设备名称" width="150">
        </el-table-column>
        <el-table-column fixed prop="temperature" label="设备温度" width="150">
        </el-table-column>
        <el-table-column prop="pressure" label="设备压力" width="120">
        </el-table-column>
        <el-table-column prop="speed" label="设备速度" width="120">
        </el-table-column>
        <el-table-column prop="time" label="生产日期" width="120">
        </el-table-column>
      </el-table> -->
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="(item, index) in urls" :key="index">
          <img
            v-bind:src="item.url"
            style="width: 70%; height: 100%; float: left"
          />
          <ul
            class="medium"
            style="width: 30%; height: 100%; float: left; margin-top: 5px"
          >
            <li>设备名称</li>
            <li>{{ craftParams[index].deviceName }}</li>
            <li>设备温度</li>
            <li>{{ craftParams[index].temperature }}</li>
            <li>设备压力</li>
            <li>{{ craftParams[index].pressure }}</li>
            <li>设备速度</li>
            <li>{{ craftParams[index].speed }}</li>
            <li>生产日期</li>
            <li>{{ craftParams[index].time }}</li>
          </ul>
        </el-carousel-item>
      </el-carousel>
    </div>
    <hr
      style="border: 1px solid white; margin-left: 10px; margin-right: 10px"
    />
    <div class="p-device">
      <img src="../../assets/img/p-device.png" />
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
        <el-form-item label="设备名称">
          <el-select
            v-model="deviceName"
            placeholder="请选择"
            style="width: 300px"
          >
            <el-option
              v-for="item in device_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备温度" prop="temperature">
          <el-input
            placeholder="中位数"
            v-model="equCraftForm.temperature.middle"
            style="width: 200px"
          ></el-input>
          <el-input
            placeholder="枚举值"
            v-model="equCraftForm.temperature.enum"
            style="width: 200px"
          ></el-input>
          <el-input
            placeholder="数值范围"
            v-model="equCraftForm.temperature.range"
            style="width: 200px"
          ></el-input>
          <el-input
            placeholder="精度"
            v-model="equCraftForm.temperature.accuracy"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备压力" prop="pressure">
          <el-input
            placeholder="中位数"
            v-model="equCraftForm.pressure.middle"
            style="width: 200px"
          ></el-input>
          <el-input
            placeholder="枚举值"
            v-model="equCraftForm.pressure.enum"
            style="width: 200px"
          ></el-input>
          <el-input
            placeholder="数值范围"
            v-model="equCraftForm.pressure.range"
            style="width: 200px"
          ></el-input>
          <el-input
            placeholder="精度"
            v-model="equCraftForm.pressure.accuracy"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备速度" prop="speed">
          <el-input
            placeholder="中位数"
            v-model="equCraftForm.speed.middle"
            style="width: 200px"
          ></el-input>
          <el-input
            placeholder="枚举值"
            v-model="equCraftForm.speed.enum"
            style="width: 200px"
          ></el-input>
          <el-input
            placeholder="数值范围"
            v-model="equCraftForm.speed.range"
            style="width: 200px"
          ></el-input>
          <el-input
            placeholder="精度"
            v-model="equCraftForm.speed.accuracy"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="生产时间" prop="time">
          <el-input v-model="equCraftForm.time" style="width: 300px"></el-input>
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
</template>
<script>
export default {
  /**
   * 该文件目前和设备工艺文件大同小异，对照着写即可。
   */
  components: {},
  data() {
    return {
      message: "工艺参数",
      craftParams: [],
      equCraftForm: {
        temperature: {
          middle: "", //中位数
          enum: "", //枚举值
          range: "", //范围
          accuracy: "", //精度
        },
        pressure: {
          middle: "",
          enum: "",
          range: "",
          accuracy: "",
        },
        speed: {
          middle: "",
          enum: "",
          range: "",
          accuracy: "",
        },
        time: "",
      },
      device_options: [
        {
          value: "选项1",
          label: "ASE",
        },
        {
          value: "选项2",
          label: "ASF",
        },
        {
          value: "选项3",
          label: "ASG",
        },
        {
          value: "选项4",
          label: "ASP",
        },
      ],
      deviceName: "",
      urls: [
        { url: require("../../assets/img/device2.jpg") },
        { url: require("../../assets/img/device3.jpg") },
        { url: require("../../assets/img/device1.jpg") },
        { url: require("../../assets/img/device4.jpg") },
      ],
      rules: {
        temperature: [
          { required: true, message: "请填写温度", trigger: "blur" },
        ],
        pressure: [{ required: true, message: "请填写压力", trigger: "blur" }],
        speed: [{ required: true, message: "请填写速度", trigger: "blur" }],
        time: [{ required: true, message: "请填写时间", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //成功提交
          console.log("提交成功");
          location.reload();
        } else {
          alert("请填写完整");
          return false;
        }
      });
    },
    resetForm(equCraftForm) {
      this.$refs[equCraftForm].resetFields();
    },
  },
  created() {
    this.deviceName = this.device_options[0].label;
    // console.log(this.deviceName);
    this.craftParams = this.$store.state.craftParams;
    // console.log(this.craftParams);
  },
  mounted() {
    
  },  
};
</script>
<style scope>
.text-title {
  margin-top: 0px;
  margin-left: 50px;
  line-height: 55px;
  font-size: 20px;
}
.table-equcraft-use {
  margin-left: 50px;
  margin-right: 50px;
}
.table-equcraft {
  width: auto;
  height: auto;
  border: 0px solid #000000;
  box-shadow: 0 2px 4px rgba(246, 245, 245, 0.2);
  margin: 0 auto;
  font-size: 1rem;
  font-family: w95fa;
}

.p-device {
  width: 40%;
  float: left;
  height: 400px;
  margin-left: 50px;
  margin-right: 50px;
}

.form-equcraft-use {
  margin-left: 50px;
  width: 40%;
  float: left;
}
.form-equcraft {
  margin-left: 50px;
}
.form-equcraft label {
  font-size: 1rem;
  font-family: w95fa;
  color: rgb(50, 49, 49);
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

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>