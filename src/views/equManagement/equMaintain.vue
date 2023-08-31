<template>
  <div>
    <div class="equMaintainRecord" v-if="this.$store.state.cu_role==='admin'">
      <div class="text-home">
      <p>设备维保记录</p>
      </div>
      <el-table
        :data="MaintainData"
        height="250"
        border
        style="width: 96%;border: 1px solid rgb(255, 255, 255);
  border-radius: 8px;margin-left:40px;"
      >
        <el-table-column
          prop="deviceMaintenanceId"
          label="设备维修ID"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="deviceId"
          label="设备ID"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
        >
        </el-table-column>
        <el-table-column
          prop="expectedEndTime"
          label="预期结束时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="actualEndTime"
          label="实际结束时间"
        >
        </el-table-column>
        <el-table-column
          prop="maintenanceStaff"
          label="维修人员"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="评价"
        >
        </el-table-column>
      </el-table>
    </div>

    <div
      class="equMaintainRegistration"
      v-if="this.$store.state.cu_role==='admin'"
    >
    <div class="text-home">
      <p>设备维保登记</p>
    </div>
      <el-form
        :label-position="labelPosition"
        label-width="150px"
        :model="equMaintainRegis"
      >
        <el-form-item label="设备维修ID" >
          <el-input v-model="equMaintainRegis.deviceMaintenanceId"></el-input>
        </el-form-item>
        <el-form-item label="设备ID" >
          <el-input v-model="equMaintainRegis.deviceId"></el-input>
        </el-form-item>
        <el-form-item label="维修内容">
          <el-input v-model="equMaintainRegis.content"></el-input>
        </el-form-item>
        <el-form-item label="预期结束时间">
          <el-date-picker
            v-model="equMaintainRegis.expectedEndTime"
            type="datetime"
            placeholder="选择预期结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="equMaintainRegis.startTime"
            type="datetime"
            placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际结束时间">
          <el-date-picker
            v-model="equMaintainRegis.actualEndTime"
            type="datetime"
            placeholder="选择实际结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="维修人员">
          <el-input v-model="equMaintainRegis.maintenanceStaff"></el-input>
        </el-form-item>
        <el-form-item label="评价">
          <el-input v-model="equMaintainRegis.remark"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary">登记</el-button>
    </div>

    <div
      class="equMaintainModify"
      v-if="this.$store.state.cu_role==='admin'"
    >
    <div class="text-home">
      <p>设备维保登记修改</p>
    </div>
      <el-form
        :label-position="labelPosition"
        label-width="150px"
        :model="equMaintainRegis"
      >
        <el-form-item label="设备维修ID">
          <el-input v-model="equMaintainRegis.deviceMaintenanceId"></el-input>
        </el-form-item>
        <el-form-item label="设备ID">
          <el-input v-model="equMaintainRegis.deviceId"></el-input>
        </el-form-item>
        <el-form-item label="维修内容">
          <el-input v-model="equMaintainRegis.content"></el-input>
        </el-form-item>
        <el-form-item label="预期结束时间">
          <el-date-picker
            v-model="equMaintainRegis.expectedEndTime"
            type="datetime"
            placeholder="选择预期结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="equMaintainRegis.startTime"
            type="datetime"
            placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际结束时间">
          <el-date-picker
            v-model="equMaintainRegis.actualEndTime"
            type="datetime"
            placeholder="选择实际结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="维修人员">
          <el-input v-model="equMaintainRegis.maintenanceStaff"></el-input>
        </el-form-item>
        <el-form-item label="评价">
          <el-input v-model="equMaintainRegis.remark"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary">保存修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      MaintainData: [],
      equMaintainRegis: {
        deviceMaintenanceId: 0,
        deviceId: 0,
        content: "",
        expectedEndTime: "",
        startTime: "",
        actualEndTime: "",
        maintenanceStaff: "",
        remark: "",
      },
    };
  },
  mounted() {
    this.MaintainData = this.$store.state.MaintainData;
  },
};
</script>
<style scoped>
.equMaintainRecord {
  margin: 10px;
  /* border: 1px solid rgb(255, 255, 255);
  border-radius: 8px; */
  width: 95%;
  height: auto;
}
.equMaintainRegistration {
  margin: 10px;
  /* border: 1px solid rgb(255, 255, 255);
  border-radius: 8px; */
  width: 45%;
  height: auto;
  float:left;
}
.equMaintainModify {
  margin: 10px;
  margin-left:50px;
  /* border: 1px solid rgb(255, 255, 255);
  border-radius: 8px; */
  width: 45%;
  height: auto;
  float:left;
}
.text-home {
  margin-top: 0px;
  margin-left: 40px;
  line-height: 55px;
  font-size: 20px;
}
div /deep/ .el-form-item__label{
  color:rgb(96, 96, 96);
}
div /deep/ .el-button.el-button--primary{
  background-color:rgb(134, 167, 224);
  border-color:rgb(134, 167, 224);
  margin-left: 150px;
} 
</style>