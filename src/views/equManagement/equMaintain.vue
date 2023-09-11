<template>
  <div>
    <div class="equMaintainRecord" v-if="this.$store.state.cu_role === 'admin'">
      <div class="text-home">
        <p>设备维保记录</p>
      </div>
      <el-table
        :data="MaintainData"
        height="250"
        border
        style="
          width: 96%;
          border: 1px solid rgb(255, 255, 255);
          border-radius: 8px;
          margin-left: 40px;
        "
      >
        <el-table-column
          prop="deviceMaintenanceId"
          label="设备维修ID"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="deviceName" label="设备名" width="100">
        </el-table-column>
        <el-table-column prop="content" label="内容"> </el-table-column>
        <el-table-column
          prop="expectedEndTime"
          label="预期结束时间"
          :formatter="formatDate"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="startTime" 
          label="开始时间" 
          :formatter="formatDate"
          width="180">
        </el-table-column>
        <el-table-column 
          prop="actualEndTime" 
          label="实际结束时间"
          :formatter="formatDate"
          width="180"
          >
        </el-table-column>
        <el-table-column prop="maintenanceStaff" label="维修人员" width="180">
        </el-table-column>
        <el-table-column prop="remark" label="评价"> </el-table-column>
      </el-table>
    </div>

    <div class="equMaintainRegistration" v-if="this.$store.state.cu_role === 'admin'">
      <div class="text-home">
        <p>设备维保登记</p>
      </div>
      <el-form
        :label-position="labelPosition"
        label-width="150px"
        :model="equMaintainRegis"
        ref="equMaintainRegis"
        :rules="rules"
      >
        <el-form-item label="设备维修ID" prop="deviceMaintenanceId">
          <el-input v-model="equMaintainRegis.deviceMaintenanceId"></el-input>
        </el-form-item>
        <el-form-item label="设备ID" prop="deviceId">
          <el-input v-model="equMaintainRegis.deviceId"></el-input>
        </el-form-item>
        <el-form-item label="维修内容" prop="content">
          <el-input v-model="equMaintainRegis.content"></el-input>
        </el-form-item>
        <el-form-item label="预期结束时间" prop="expectedEndTime">
          <el-date-picker
            v-model="equMaintainRegis.expectedEndTime"
            type="datetime"
            placeholder="选择预期结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="equMaintainRegis.startTime"
            type="datetime"
            placeholder="选择开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际结束时间" prop="actualEndTime">
          <el-date-picker
            v-model="equMaintainRegis.actualEndTime"
            type="datetime"
            placeholder="选择实际结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="维修人员" prop="maintenanceStaff">
          <el-input v-model="equMaintainRegis.maintenanceStaff"></el-input>
        </el-form-item>
        <el-form-item label="评价" prop="remark">
          <el-input v-model="equMaintainRegis.remark"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm('equMaintainRegis')">登记</el-button>
    </div>

    <div class="equMaintainModify" v-if="this.$store.state.cu_role === 'admin'">
      <div class="text-home">
        <p>设备维保登记修改</p>
      </div>
      <el-form
        :label-position="labelPosition"
        label-width="150px"
        :model="updateMaintain"
        :rules="rules2"
        ref="updateMaintain"
      >
        <el-form-item label="设备维修ID" prop="deviceMaintenanceId">
          <el-input v-model="updateMaintain.deviceMaintenanceId"></el-input>
        </el-form-item>
        <el-form-item label="设备ID" prop="deviceId">
          <el-input v-model="updateMaintain.deviceId"></el-input>
        </el-form-item>
        <el-form-item label="维修内容" prop="content">
          <el-input v-model="updateMaintain.content"></el-input>
        </el-form-item>
        <el-form-item label="预期结束时间" prop="expectedEndTime">
          <el-date-picker
            v-model="updateMaintain.expectedEndTime"
            type="datetime"
            placeholder="选择预期结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="updateMaintain.startTime"
            type="datetime"
            placeholder="选择开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际结束时间" prop="actualEndTime">
          <el-date-picker
            v-model="updateMaintain.actualEndTime"
            type="datetime"
            placeholder="选择实际结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="维修人员" prop="maintenanceStaff">
          <el-input v-model="updateMaintain.maintenanceStaff"></el-input>
        </el-form-item>
        <el-form-item label="评价" prop="remark">
          <el-input v-model="updateMaintain.remark"></el-input>
        </el-form-item>
        <el-button type="primary" @click="updateForm('updateMaintain')">保存修改</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getDeviceMaintenanceList,
  addDeviceMaintenance,
  updateDeviceMaintenance
} from "../../network/equpment";
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
      updateMaintain: {
        deviceMaintenanceId: 0,
        deviceId: 0,
        content: "",
        expectedEndTime: "",
        startTime: "",
        actualEndTime: "",
        maintenanceStaff: "",
        remark: "",
      },
      rules:{
        actualEndTime:[
          { required:true,message:'请填写实际结束时间',trigger:'blur'}
        ],
        content:[
          { required:true,message:'请填写维修内容',trigger:'blur'}
        ],
        deviceId:[
          { required:true,message:'请填写设备的ID',trigger:'blur'}
        ],
        deviceMaintenanceId:[
          { required:true,message:'请填写设备的维修ID',trigger:'blur'}
        ],
        expectedEndTime:[
          { required:true,message:'请填写预期结束时间',trigger:'blur'}
        ],
        maintenanceStaff:[
          { required:true,message:'请填写维修人员',trigger:'blur'}
        ],
        remark:[
          { required:true,message:'请填写维修评价',trigger:'blur'}
        ],
        startTime:[
          { required:true,message:'请填写维修开始时间',trigger:'blur'}
        ],
      },
      rules2:{
        actualEndTime:[
          { required:true,message:'请填写实际结束时间',trigger:'blur'}
        ],
        content:[
          { required:true,message:'请填写维修内容',trigger:'blur'}
        ],
        deviceId:[
          { required:true,message:'请填写设备的ID',trigger:'blur'}
        ],
        deviceMaintenanceId:[
          { required:true,message:'请填写设备的维修ID',trigger:'blur'}
        ],
        expectedEndTime:[
          { required:true,message:'请填写预期结束时间',trigger:'blur'}
        ],
        maintenanceStaff:[
          { required:true,message:'请填写维修人员',trigger:'blur'}
        ],
        remark:[
          { required:true,message:'请填写维修评价',trigger:'blur'}
        ],
        startTime:[
          { required:true,message:'请填写维修开始时间',trigger:'blur'}
        ],
      }
    };
  },
  methods: {
    formatDate(row, column) {
      const date = row[column.property]; // 获取单元格的值[row是行数据，column是列属性]
      if (date instanceof Date) {
        return date.toLocaleString(); // 按照本地时间格式进行显示，您也可以根据需要自定义格式
      } else {
        return ""; // 如果值不是Date类型，则返回空字符串或其他默认值
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          //成功提交
          console.log("提交成功");
          console.log(this.equMaintainRegis);
          addDeviceMaintenance(
            this.equMaintainRegis.actualEndTime,
            this.equMaintainRegis.content,
            this.equMaintainRegis.deviceId,
            this.equMaintainRegis.deviceMaintenanceId,
            this.equMaintainRegis.expectedEndTime,
            this.equMaintainRegis.maintenanceStaff,
            this.equMaintainRegis.remark,
            this.equMaintainRegis.startTime)
          .then(res=>{
            //处理返回的响应数据
            const data = res.data
            console.log(data);
          }).catch(error=>{
            console.error(error);
          })
        } else {
          alert("请填写完整")
          return false;
        }
      })
    },
    updateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          //成功提交
          console.log("提交成功");
          console.log(this.updateMaintain);
          updateDeviceMaintenance(
            this.updateMaintain.actualEndTime,
            this.updateMaintain.content,
            this.updateMaintain.deviceId,
            this.updateMaintain.deviceMaintenanceId,
            this.updateMaintain.expectedEndTime,
            this.updateMaintain.maintenanceStaff,
            this.updateMaintain.remark,
            this.updateMaintain.startTime)
          .then(res=>{
            //处理返回的响应数据
            const data = res.data
            console.log(data);
          }).catch(error=>{
            console.error(error);
          })
        } else {
          alert("请填写完整或者维修不存在")
          return false;
        }
      })
    },
  },
  mounted() {
    // this.MaintainData = this.$store.state.MaintainData;
    getDeviceMaintenanceList().then((res) => {
      this.MaintainData = res.data;
      // console.log(this.MaintainData);
      this.MaintainData = this.MaintainData.map((obj) => {
        const {
          actualEndTime,
          content,
          deviceId,
          deviceMaintenanceId,
          deviceName,
          expectedEndTime,
          maintenanceStaff,
          remark,
          startTime,
        } = obj;

        const actual_endTime = new Date(actualEndTime);
        const expected_endTime = new Date(expectedEndTime);
        const start_time = new Date(startTime);

        return {
          actualEndTime: actual_endTime,
          content,
          deviceId,
          deviceMaintenanceId,
          deviceName,
          expectedEndTime: expected_endTime,
          maintenanceStaff,
          remark,
          startTime: start_time,
        };
      });
      console.log(this.MaintainData);
    });
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
  float: left;
}
.equMaintainModify {
  margin: 10px;
  margin-left: 50px;
  /* border: 1px solid rgb(255, 255, 255);
  border-radius: 8px; */
  width: 45%;
  height: auto;
  float: left;
}
.text-home {
  margin-top: 0px;
  margin-left: 40px;
  line-height: 55px;
  font-size: 20px;
}
div /deep/ .el-form-item__label {
  color: rgb(96, 96, 96);
}
div /deep/ .el-button.el-button--primary {
  background-color: rgb(134, 167, 224);
  border-color: rgb(134, 167, 224);
  margin-left: 150px;
}
</style>