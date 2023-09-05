<template>
  <div class="equbg">
    <div style="height=30px">
      <br />
    </div>
    <div class="equList">
      <div class="text-home">
        <p>设备列表</p>
      </div>
      <el-table
        :data="eqpinform"
        style="
          width: 98%;
          margin-left: 40px;
          border: 1px solid #ffffff;
          border-radius: 8px;
        "
        height="250"
      >
        <el-table-column fixed prop="deviceName" label="设备名" width="150">
        </el-table-column>
        <el-table-column prop="deviceFunc" label="设备功能" width="120">
        </el-table-column>
        <el-table-column
          prop="deviceType.typeName"
          label="设备类别"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="operationInstructionUrl"
          label="使用说明书"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="lab.labName" label="隶属实验室" width="120">
        </el-table-column>
        <el-table-column prop="isInUse" label="是否被使用" width="120">
        </el-table-column>
        <el-table-column
          prop="isUnderMaintenance"
          label="是否处于维护中"
          width="300"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="equAdd" v-if="this.$store.state.cu_role === 'admin'">
      <div class="text-home">
        <p>添加设备信息</p>
      </div>
      <el-form
        :model="equForm"
        :rules="rules"
        ref="equForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="设备名" prop="newDeviceName">
          <el-input
            v-model="equForm.newDeviceName"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备功能" prop="newDeviceFunc">
          <el-input
            v-model="equForm.newDeviceFunc"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="newDeviceTypeId">
          <el-select
            v-model="equForm.newDeviceTypeId"
            placeholder="选择设备类型"
            style="width: 400px"
          >
            <el-option
              v-for="item in equcategory"
              :key="item.deviceTypeId"
              :label="item.typeName"
              :value="item.deviceTypeId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验室" prop="newLabId">
          <el-select
            v-model="equForm.newLabId"
            placeholder="选择实验室"
            style="width: 400px"
          >
            <el-option
              v-for="item in labinform"
              :key="item.labId"
              :label="item.labName"
              :value="item.labId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备说明书" prop="newUuid">
          <el-input v-model="equForm.newUuid" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('equForm')"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div style="width: 40%; height: 450px; float: left; margin-top: 10px">
      <img
        src="../../assets/img/椰子树.png"
        style="width: 400px; height: 400px; margin-top: 35px"
      />
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
// import axios from 'axios';
import { getEquList, getEquCate, addEqument } from "../../network/equpment";
import { getLabList } from "../../network/labtory";
export default {
  data() {
    return {
      eqpinform: [],
      equcategory: [],
      labinform: [],
      equForm: {
        newDeviceName: "",
        newDeviceFunc: "",
        newDeviceTypeId: 1,
        newLabId: 1,
        newUuid: "",
      },
      rules: {
        newDeviceName: [
          { required: true, message: "请填写设备名称", trigger: "blur" },
        ],
        newDeviceFunc: [
          { required: true, message: "请填写设备功能", trigger: "blur" },
        ],
        newDeviceTypeId: [
          { required: true, message: "请选择设备类别", trigger: "change" },
        ],
        newLabId: [
          {
            required: true,
            message: "请选择设备隶属实验室",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addEqument(
            this.equForm.newDeviceFunc,
            this.equForm.newDeviceName,
            this.equForm.newDeviceTypeId,
            this.equForm.newLabId,
            this.equForm.newUuid,
          )
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.error(error);
            });
          alert("提交成功!");
          location.reload();
        } else {
          alert("请填写完整");
        }
      });
    },
  },
  mounted() {
    getEquList().then((res) => {
      this.eqpinform = res.data;
      console.log(this.eqpinform);
    });

    getEquCate().then((res) => {
      this.equcategory = res.data;
      // console.log(this.equcategory);
    });

    getLabList().then((res) => {
      this.labinform = res.data;
      // console.log(this.labinform);
    });
  },
};
</script>
<style scoped>
.clear {
  clear: both;
  height: 0px;
}
.equbg {
  background-image: url("../../assets/img/qqq6.png");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.equList {
  margin: 10px;
  /* border: 1px solid rgb(255, 255, 255);
  border-radius: 8px; */
  width: 93%;
  height: auto;
}

.equAdd {
  margin: 10px;
  /* border: 1px solid rgb(255, 255, 255);
  border-radius: 8px; */
  width: 50%;
  /* height: auto; */
  float: left;
}

.text-home {
  margin-top: 0px;
  margin-left: 40px;
  line-height: 55px;
  font-size: 20px;
}
div /deep/ .el-form-item__label {
  color: rgb(93, 90, 90);
}
div /deep/ .el-button.el-button--primary {
  background-color: rgb(134, 167, 224);
  border-color: rgb(134, 167, 224);
}
</style>