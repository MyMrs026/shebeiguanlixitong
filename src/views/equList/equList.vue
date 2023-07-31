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
      <el-form label-width="120px">
        <el-form-item label="设备名">
          <el-input v-model="newDeviceName" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="设备功能">
          <el-input v-model="newDeviceFunc" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="newDeviceTypeId" placeholder="选择设备类型">
            <el-option v-for="item in equcategory" :key="item.deviceTypeId" :label="item.typeName"
              :value="item.deviceTypeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验室">
          <el-select v-model="newLabId" placeholder="选择实验室">
            <el-option v-for="item in labinform" :key="labinform.labId" :label="item.labName" :value="item.labId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备说明书">
          <el-input v-model="newUuid" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import { getEquList, getEquCate, addEqument } from '../../network/equpment';
import { getLabList } from '../../network/labtory';
export default {
  data() {
    return {
      eqpinform: [],
      equcategory: [],
      labinform: [],
      newDeviceName: '',
      newDeviceFunc: '',
      newDeviceTypeId: 1,
      newLabId: 1,
      newUuid: '',

    }
  },
  methods: {
    submitForm() {
      // addEqument(deviceName, deviceFunc, deviceTypeId, labId, uuid).then(res => {
      //   console.log(res);
      // }).catch(error => {
      //   console.error(error);
      // })
      console.log(newDeviceName, newDeviceFunc, newDeviceTypeId, newLabId, newUuid);
    },
  },
  created() {
    getEquList().then(res => {
      this.eqpinform = res.data
    })

    getEquCate().then(res => {
      this.equcategory = res.data
      // console.log(this.equcategory);
    })

    getLabList().then(res => {
      this.labinform = res.data
      // console.log(this.labinform);
    })


  },
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