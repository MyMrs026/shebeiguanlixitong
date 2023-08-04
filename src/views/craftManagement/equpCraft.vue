<template>
  <div>
    {{ message }}
    <div class="equcraft_table">
      <el-table
        :data="equCrafts"
        style="width: auto; margin: 10px"
        height="250"
        border
      >
        <el-table-column fixed prop="deviceName" label="设备名称" width="150">
        </el-table-column>
        <el-table-column prop="deviceType" label="设备型号" width="120">
        </el-table-column>
        <el-table-column prop="size" label="设备尺寸" width="120">
        </el-table-column>
        <el-table-column prop="weight" label="设备重量" width="120">
        </el-table-column>
        <el-table-column prop="power" label="设备功率" width="120">
        </el-table-column>
      </el-table>
    </div>
    <hr />
    <div class="equcraft_form">
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
        <el-form-item label="设备型号">
          <el-input
            v-model="equCraftForm.deviceType"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备尺寸">
          <el-input v-model="equCraftForm.size" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="设备重量">
          <el-input
            v-model="equCraftForm.weight"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备功率">
          <el-input
            v-model="equCraftForm.power"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="submitForm('device_options')">提交</el-button>
          <el-button @click="resetForm('equCraftForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      message: "设备工艺",
      equCrafts: [],
      equCraftForm: {
        deviceName: "",
        deviceType: "",
        size: "",
        weight: "",
        power: "",
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
    submitForm(equCraftForm) {
      console.log("提交");
    },
    resetForm(equCraftForm){
      this.$refs[equCraftForm].resetFields();
    }
  },
  created() {
    this.equCrafts = this.$store.state.equCrafts;
    console.log(this.equCrafts);
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