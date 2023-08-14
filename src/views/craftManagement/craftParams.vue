<template>
  <div>
    {{ message }}
    <div class="equcraft_table">
      <el-table
        :data="craftParams"
        style="width: auto; margin: 10px"
        height="250"
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
    <hr />
    <div class="equcraft_form" v-if="this.$store.state.cu_role === 'admin'">
      <el-form label-width="80px" :model="equCraftForm" style="margin: 10px">
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
.equcraft_table {
  margin: 10px;
  width: 60%;
  height: auto;
  border: 1px solid black;
  border-radius: 3px;
}
.equcraft_form {
  margin: 10px;
  width: 60%;
  height: auto;
  border: 1px solid black;
  border-radius: 3px;
}
</style>