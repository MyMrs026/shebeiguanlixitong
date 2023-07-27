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
      <el-form label-width="120px" :model="newEquInform">
        <el-form-item label="设备名">
          <el-input v-model="newDeviceName" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="设备功能">
          <el-input v-model="newDeviceFunc" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="newDeviceTypeId" placeholder="选择设备类型">
            <el-option v-for="item in equcategory" :key="item.deviceTypeId" :label="item.typeName" :value="item.deviceTypeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验室">
          <el-select v-model="newLabId" placeholder="选择实验室">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备说明书">
          <el-input v-model="newUuid" style="width: 300px;"></el-input>
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
import { getEquList,getEquCate } from '../../network/equpment';
export default {
  data() {
    return {
      eqpinform: [],
      equcategory:[],
      equcategoryName:[],
      newDeviceName: '',
      newDeviceFunc: '',
      newDeviceTypeId: '',
      newLabId: 1,
      newUuid: '',

    }
  },
  methods: {
    submitForm() {
      // axios.post('http://172.16.23.115:8080/api/device/addDevice', postData).then(responce=>{
      //   console.log(responce.data);
      //   //  this.equcategory = responce.data;
      // }).catch(error=> {
      //   console.error(error);
      // })
    },
  },
  created() {
    getEquList().then(res => {
      // console.log(res);
      this.eqpinform = res.data
      // console.log(this.eqpinform);
    })
   
    getEquCate().then(res =>{
    // console.log(res.data);
    this.equcategory = res.data
    console.log(this.equcategory);
    // this.equcategoryName = this.equcategory.map(item => item.typeName)
    // console.log(this.equcategoryName);
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