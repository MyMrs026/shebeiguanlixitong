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
        <el-table-column
          fixed
          prop="equipmentName"
          label="设备名"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="equipmentFunction"
          label="设备功能"
          width="120"
        >
        </el-table-column>
        <!-- ? -->
        <el-table-column
          prop="equipmentCategory"
          label="设备类别"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="labName"
          label="隶属实验室"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="equipmentStatus"
          label="是否被使用"
          width="120"
        >
        </el-table-column>
        <!-- <el-table-column
            prop="isUnderMaintenance"
            label="是否处于维护中"
            width="150"
          > -->
        </el-table-column>
        <el-table-column
          prop="linkman"
          label="联系人"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="linkmanTel"
          label="联系方式"
          width="120"
        >
        </el-table-column>
      </el-table>
    </div>
    <div
      class="equAdd"
      v-if="this.$store.state.cu_role === 'admin'"
    >
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
        <el-form-item
          label="设备名"
          prop="newEquipmentName"
        >
          <el-input
            v-model="equForm.newEquipmentName"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="设备功能"
          prop="newEuipmentFunction"
        >
          <el-input
            v-model="equForm.newEuipmentFunction"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="设备类型"
          prop="newEquipmentCategory"
        >
          <!-- <el-select
              v-model="equForm.newEquipmentCategory"
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
            </el-select> -->
          <el-input
            v-model="equForm.newEquipmentCategory"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="设备图片"
          prop="newEuipmentImageUrl"
        >
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :action=apiUrl
            :headers="customHeaders"
            :on-success="showPic"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="设备状态"
          prop="newEuipmentStatus"
        >
          <el-select
            v-model="equForm.newEuipmentStatus"
            placeholder="选择设备状态"
            style="width: 400px"
          >
            <!-- <el-option
                v-for="item in labinform"
                :key="item.labId"
                :label="item.labName"
                :value="item.labId"
              >
              </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item
          label="实验室"
          prop="newLabName"
        >
          <el-select
            v-model="equForm.newLabName"
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
        <el-form-item
          label="联系人"
          prop="newLinkman"
        >
          <el-input
            v-model="equForm.newLinkman"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系方式"
          prop="newLinkmanTel"
        >
          <el-input
            v-model="equForm.newLinkmanTel"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="设备标签"
          prop="newMachineLabel"
        >
          <el-input
            v-model="equForm.newMachineLabel"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="放置地点"
          prop="newPlacementLocation"
        >
          <el-input
            v-model="equForm.newPlacementLocation"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="机时价格"
          prop="newPayment"
        >
          <el-input
            v-model="equForm.newPayment"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="设备说明书"
          prop="newUuid"
        >
          <el-input
            v-model="equForm.newUuid"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('equForm')"
          >添加</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="width: 40%; float: left; margin-top: 10px">
      <!-- <img
        src="../../assets/img/椰子树.png"
        style="width: 400px; height: 400px; margin-top: 35px"
      /> -->
      <div
        class="equUpdate"
        v-if="this.$store.state.cu_role === 'admin'"
      >
        <div class="text-home">
          <p>更新设备信息</p>
        </div>
        <el-form
          :model="eqpUpdateForm"
          :rules="rules1"
          ref="eqpUpdateForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="设备名"
            prop="newEquipmentName"
          >
            <el-input
              v-model="eqpUpdateForm.newEquipmentName"
              style="width: 400px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="设备功能"
            prop="newDeviceFunc"
          >
            <el-input
              v-model="eqpUpdateForm.newEquipmentFunction"
              style="width: 400px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="设备类型"
            prop="newEquipmentCategory"
          >
            <!-- <el-select
              v-model="eqpUpdateForm.newEquipmentCategory"
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
            </el-select> -->
            <el-input
              v-model="eqpUpdateForm.newEquipmentCategory"
              style="width: 400px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="设备图片"
            prop="newEuipmentImageUrl"
          >
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :action=eqpUpdateForm.newEquipmentImageUrl
              :on-success="showPic"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
          </el-form-item>
          <el-form-item
            label="设备状态"
            prop="newEuipmentStatus"
          >
            <el-select
              v-model="eqpUpdateForm.newEuipmentStatus"
              placeholder="选择设备状态"
              style="width: 400px"
            >
              <!-- <el-option
                v-for="item in labinform"
                :key="item.labId"
                :label="item.labName"
                :value="item.labId"
              >
              </el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item
            label="实验室"
            prop="newLabName"
          >
            <el-select
              v-model="eqpUpdateForm.newLabName"
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
          <el-form-item
            label="联系人"
            prop="newLinkman"
          >
            <el-input
              v-model="eqpUpdateForm.newLinkman"
              style="width: 400px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="联系方式"
            prop="newLinkmanTel"
          >
            <el-input
              v-model="eqpUpdateForm.newLinkmanTel"
              style="width: 400px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="设备标签"
            prop="newMachineLabel"
          >
            <el-input
              v-model="eqpUpdateForm.newMachineLabel"
              style="width: 400px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="放置地点"
            prop="newPlacementLocation"
          >
            <el-input
              v-model="eqpUpdateForm.newPlacementLocation"
              style="width: 400px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="机时价格"
            prop="newPayment"
          >
            <el-input
              v-model="eqpUpdateForm.newPayment"
              style="width: 400px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="设备说明书"
            prop="newUuid"
          >
            <el-input
              v-model="eqpUpdateForm.newUuid"
              style="width: 400px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="updateForm('eqpUpdateForm')"
            >更新</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
// import axios from 'axios';
import {
  getEquList,
  getEquCate,
  addEqument,
  updateDevice,
} from "../../network/equpment";
import { getLabList } from "../../network/labtory";
export default {
  data() {
    return {
      eqpinform: [],
      equcategory: [],
      labinform: [],
      apiUrl: "http://47.98.160.222:8080/api/file/uploadImage",
      resUrl:"",
      imageUrl:"",
      customHeaders: {
        'Authorization':localStorage.getItem('token')
      },
      equForm: {
        newEquipmentFunction: "",
        newEquipmentCategory: "",
        newEquipmentId: 1,
        newEquipmentName: "",
        newEquipmentImageUrl: "",
        newEquipmentStatus: 1,
        newLabName: "",
        newLinkman: "",
        newLinkmanTel: "",
        newMachineLabel: "",
        newPlacementLocation: "",
        newPayment: 1,
        newUuid: "",
      },
      eqpUpdateForm: {
        newEquipmentFunction: "",
        newEquipmentCategory: "",
        newEquipmentId: 1,
        newEquipmentName: "",
        newEquipmentImageUrl: "",
        newEquipmentStatus: 1,
        newLabName: "",
        newLinkman: "",
        newLinkmanTel: "",
        newMachineLabel: "",
        newPlacementLocation: "",
        newPayment: 1,
        newUuid: "",
      },
      rules: {
        newEquipmentName: [
          { required: true, message: "请填写设备名称", trigger: "blur" },
        ],
        newEquipmentFunction: [
          { required: true, message: "请填写设备功能", trigger: "blur" },
        ],
        newEquipmentCategory: [
          { required: true, message: "请选择设备类别", trigger: "change" },
        ],
        newLabName: [
          // {
          //   required: true,
          //   message: "请选择设备隶属实验室",
          //   trigger: "change",
          // },
        ],
      },
      rules1: {
        newEquipmentName: [
          { required: true, message: "请填写设备名称", trigger: "blur" },
        ],
        newEquipmentFunction: [
          { required: true, message: "请填写设备功能", trigger: "blur" },
        ],
        newEquipmentCategory: [
          { required: true, message: "请选择设备类别", trigger: "change" },
        ],
        newLabName: [
          // {
          //   required: true,
          //   message: "请选择设备隶属实验室",
          //   trigger: "change",
          // },
        ],
      },
    };
  },
  methods: {
    showPic(res, file) {
      // console.log(res.data);
      this.resUrl = res.data;
      // this.eqpinform.newEquipmentImageUrl = res.data
      console.log(this.resUrl );
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addEqument(
            this.equForm.newEquipmentFunction,
            this.equForm.newEquipmentCategory,
            this.equForm.newEquipmentName,
            this.resUrl,
            this.equForm.newEquipmentStatus,
            this.equForm.newLabName,
            this.equForm.newLinkman,
            this.equForm.newLinkmanTel,
            this.equForm.newMachineLabel,
            this.equForm.newPlacementLocation
          )
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.error(error);
            });
          alert("提交成功!");
          // location.reload();
        } else {
          alert("请填写完整");
        }
      });
    },
    updateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateDevice(
            this.equForm.newEquipmentFunction,
            this.equForm.newEquipmentCategory,
            this.equForm.newEquipmentId,
            this.equForm.newEquipmentName,
            this.equForm.newEquipmentImageUrl,
            this.equForm.newEquipmentStatus,
            this.equForm.newLabName,
            this.equForm.newLinkman,
            this.equForm.newLinkmanTel,
            this.equForm.newMachineLabel,
            this.equForm.newPlacementLocation
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
      console.log(this.equcategory);
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
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-image: url("../../assets/img/qqq6.png");
  width: 100%;
  /* height: 100%; */
  background-size: 100% 100%;
}
.equList {
  margin: 10px;
  /* border: 1px solid rgb(255, 255, 255);
  border-radius: 8px; */
  width: 93%;
  height: 100%;
  /* height: auto; */
}

.equAdd {
  /* margin: 10px; */
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