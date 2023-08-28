<template>
  <div>
    <p class="text-title">{{ message }}</p>
    <div class="table-equcraft-use">
      <el-table 
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
      </el-table>
    </div>
    <hr style="border: 1px solid white; margin-left: 10px; margin-right: 10px"/>
    <p class="text-title">设置设备工艺</p>
    <div class="form-equcraft-use" v-if="this.$store.state.cu_role === 'admin'">
      <el-form class="form-equcraft" label-width="80px" :model="equCraftForm">
        <el-form-item label="设备名称">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in device_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备温度">
          <el-input
            v-model="equCraftForm.temperature"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备压力">
          <el-input v-model="equCraftForm.pressure" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="设备速度">
          <el-input
            v-model="equCraftForm.speed"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="生产时间">
          <el-input
            v-model="equCraftForm.time"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="submitForm"
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
        temperature: "",
        pressure: "",
        speed: "",
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
      value: "",
    };
  },
  methods: {
    submitForm() {
      console.log("提交");
    },
    resetForm(equCraftForm) {
      this.$refs[equCraftForm].resetFields();
    },
  },
  created() {
    this.craftParams = this.$store.state.craftParams;
    console.log(this.craftParams);
  },
};
</script>
<style scope>
.text-title {
  margin-top: 0px;
  margin-left: 30px;
  line-height: 55px;
  font-size: 20px;
  color: aliceblue;
  background-image: url("../../assets/img/s-titlebg.png");
  background-repeat: no-repeat;
}
.table-equcraft-use {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
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
.form-equcraft-use {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.form-equcraft{
  width: auto;
  height: auto;
  border: 0px solid #000000;
  box-shadow: 0 2px 4px rgba(246, 245, 245, 0.2);
  margin: 0 auto;
  
}
.form-equcraft label {
  font-size: 1rem;
  font-family: w95fa;
  color:rgb(255, 255, 255);
}
</style>