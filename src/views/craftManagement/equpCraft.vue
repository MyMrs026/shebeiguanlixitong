<template>
  <div>
    {{ message }}
    <!-- 页面有两个部分组成 -->
    <!-- 设备工艺表格 -->
    <div class="equcraft_table">
      <el-table
        :data="equCrafts"
        style="width: auto; margin: 10px"
        height="250"
        border>
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
    <!-- 设备工艺设置，只在登录用户为管理员时显示 -->
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
/**
 * 工艺管理页面中的设备工艺子页面
 */
export default {
  components: {},
  data() {
    return {
      message: "设备工艺",
      equCrafts: [],//目前从vuex中写死，后续从axios中导入
      equCraftForm: { //表单中的内容传入到这
        deviceName: "",
        deviceType: "",
        size: "",
        weight: "",
        power: "",
      },
      device_options: [ //目前写死，后期也是从数据库中导入
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
    //此处写的应该是axios传出来的promise函数，参照其他文件
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