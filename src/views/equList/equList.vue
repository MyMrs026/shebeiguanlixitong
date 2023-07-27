<template>
  <div>
    <div class="equList">
      <h2>设备列表</h2>
      <el-table :data="eqpinform" style="width: 100%" height="250">
        <el-table-column fixed prop="deviceName" label="设备名" width="150">
        </el-table-column>
        <el-table-column prop="deviceFunc" label="设备功能" width="120">
        </el-table-column>
        <el-table-column prop="deviceType.typeName" label="设备类别" width="120">
        </el-table-column>
        <el-table-column prop="operationInstructionUrl" label="使用说明书" width="120">
        </el-table-column>
        <el-table-column prop="lab.labName" label="隶属实验室" width="120">
        </el-table-column>
        <el-table-column prop="isInUse" label="是否被使用" width="120">
        </el-table-column>
        <el-table-column prop="isUnderMaintenance" label="是否处于维护中" width="300">
        </el-table-column>
      </el-table>
    </div>
    <div class="equAdd">
      <h2>添加设备信息</h2>
      <el-form :label-position="labelPosition" label-width="80px" :model="newEquInform">
        <el-form-item label="设备名">
          <el-input v-model="newEquInform.deviceName"></el-input>
        </el-form-item>
        <el-form-item label="设备功能">
          <el-input v-model="newEquInform.deviceFunc"></el-input>
        </el-form-item>
        <el-form-item label="设备使用说明书">
          <el-input v-model="newEquInform.operationInstructionUrl"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('newEquInform')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getEquList } from '../../network/equpment';
export default {
  data() {
    return {
      eqpinform: [],
      labelPosition: 'right',
      newEquInform: {
        deviceName: '',
        deviceFunc: '',
        deviceTypeId: 0,
        operationInstructionUrl: '',
        labId: 0,
        isInUse: 0,
        isUnderMaintenance: 0,
      }
    }
  },
  methods: {
    submitForm() {
      
    }
  },
  created() {
    getEquList().then(res => {
      // console.log(res);
      this.eqpinform = res.data
      console.log(this.eqpinform);
    })
  }
}

</script>
<style scoped>
.equList {
  margin: 10px;
  border: 1px solid black;
  border-radius: 8px;
  width: 80%;
  height: auto;
}

.equAdd {
  margin: 10px;
  border: 1px solid black;
  border-radius: 8px;
  width: 80%;
  height: auto;
}
</style>