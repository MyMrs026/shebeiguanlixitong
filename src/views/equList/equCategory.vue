<template>
  <div class="outer-container">
    <div class="equbg">
      <div style="height=30px">
        <br />
      </div>
      <div class="equList">
        <div class="text-home">
          <p>设备分类列表</p>
        </div>
        <el-table
          :data="equcategory"
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
            prop="deviceTypeId"
            label="类别ID"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="类别名"
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
          <p>添加设备分类</p>
        </div>
        <el-form
          :model="equcateForm"
          :rules="rules"
          ref="equcateForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="分类名"
            prop="newTypeName"
          >
            <el-input
              v-model="equcateForm.newTypeName"
              style="width: 400px"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('equcateForm')"
            >添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div
        class="equUpdate"
        v-if="this.$store.state.cu_role === 'admin'"
      >
        <div class="text-home">
          <p>更新设备分类</p>
        </div>
        <el-form
          :model="eqpcateUpdateForm"
          :rules="rules1"
          ref="eqpcateUpdateForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="类型id"
            prop="deviceTypeId"
          >
            <el-select
              v-model="eqpcateUpdateForm.deviceTypeId"
              placeholder="选择分类id"
            >
              <el-option
                v-for="item in equcategory"
                :key="item.deviceTypeId"
                :label="item.deviceTypeId"
                :value="item.deviceTypeId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="类型名"
            prop="newTypeName"
          >
            <el-input
              v-model="eqpcateUpdateForm.newTypeName"
              style="width: 400px"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="updateForm('eqpcateUpdateForm')"
            >更新</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div style="width: 40%; height: 450px; float: left; margin-top: 10px">
        <img
          src="../../assets/img/椰子树.png"
          style="width: 400px; height: 400px; margin-top: 35px"
        />
      </div> -->
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import { getEquCate, updateSingleDeviceType } from "../../network/equpment";

export default {
  data() {
    return {
      equcategory: [],
      equcateForm: {
        newTypeName: "",
      },
      eqpcateUpdateForm: {
        newTypeName: "",
        deviceTypeId: "",
      },
      rules: {
        newTypeName: [
          { required: true, message: "请类别的名称", trigger: "blur" },
        ],
      },
      rules1: {
        newTypeName: [
          { required: true, message: "请类别的名称", trigger: "blur" },
        ],
        deviceTypeId: [
          { required: true, message: "请选择类别id", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return;
        } else {
          alert("请填写完整");
          return false;
        }
      });
    },
    updateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("提交成功");
          console.log(this.eqpcateUpdateForm);
          updateSingleDeviceType(
            this.eqpcateUpdateForm.deviceTypeId,
            this.eqpcateUpdateForm.newTypeName
          )
            .then((res) => {
              //处理返回的相应数据
              const data = res.data;
              console.log(data);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          alert("请填写完整");
          return false;
        }
      });
    },
  },
  mounted() {
    getEquCate().then((res) => {
      this.equcategory = res.data;
      // console.log(this.equcategory);
    });
  },
};
</script>
<style scoped>
.clear {
  clear: both;
  height: 0px;
}
.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 100%视口高度，垂直居中 */
  max-width: 1500px; /* 设置最大宽度 */
  margin: 0 auto; /* 居中 */
  /* padding: 20px; 左右下留白 */
}

.equbg {
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-image: url("../../assets/img/qqq6.png");
  width: 100%;
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
  /* margin: 10px; */
  /* border: 1px solid rgb(255, 255, 255);
  border-radius: 8px; */
  width: 50%;
  /* height: auto; */
  /* float: left; */
}
.equUpdate {
  width: 50%;
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