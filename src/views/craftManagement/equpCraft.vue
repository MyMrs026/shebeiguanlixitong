<template>
  <div>
    <p class="text-title">{{ message }}</p>
    <!-- 页面有两个部分组成 -->
    <!-- 设备工艺表格 -->
    <div class="table-equcraft-use">
      <el-table
        :data="equCrafts"
        class="table-equcraft"
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
    <hr style="border: 1px solid white; margin-left: 10px; margin-right: 10px"/>
    <!-- 设备工艺设置，只在登录用户为管理员时显示 -->
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
          <el-button type="primary" plain @click="submitForm('device_options')"
            >提交</el-button
          >
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
    };
  },
  methods: {
    submitForm(equCraftForm) {
      console.log("提交");
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
  border: 1px solid #fff;
  box-shadow: 1px 1px 1px #fff;
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
  border: 1px solid #fff;
  box-shadow: 1px 1px 1px #fff;
  margin: 0 auto;
  
}
.form-equcraft label {
  font-size: 1rem;
  font-family: w95fa;
  color:rgb(255, 255, 255);
}
</style>