<template>
  <div class="add-project">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="ruleForm.projectName"></el-input>
      </el-form-item>
      <el-form-item label="项目类型">
        <el-radio-group v-model="ruleForm.projectType">
          <el-radio label="对内项目"></el-radio>
          <el-radio label="对外项目"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="项目图片上传">
        <el-upload
          class="avatar-uploader"
          action="http://47.98.160.222:8080/api/file/uploadImage"
          :on-success="handleImgSuccess"
        >
          <img
            v-if="ruleForm.projectImg"
            :src="ruleForm.projectImg"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="项目文件上传" prop="projectFileUrl">
        <a v-if="ruleForm.projectFileUrl" :href="ruleForm.projectFileUrl">{{
          ruleForm.projectFileUrl
        }}</a>
        <el-upload
          action="http://47.98.160.222:8080/api/file/uploadFile"
          :on-success="handleFileSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="进度文件上传" prop="projectProcessUrl">
        <a v-if="ruleForm.projectProcessUrl" :href="ruleForm.projectProcessUrl">{{
          ruleForm.projectProcessUrl
        }}</a>
        <el-upload
          action="http://47.98.160.222:8080/api/file/uploadFile"
          :on-success="handleProcessSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          type="date"
          placeholder="选择开始时间"
          v-model="ruleForm.startTime"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="startTime">
        <el-date-picker
          type="date"
          placeholder="选择结束时间"
          v-model="ruleForm.endTime"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="项目来源" prop="projectSource">
        <el-input v-model="ruleForm.projectSource"></el-input>
      </el-form-item>
      <el-form-item label="项目性质" prop="projectNature">
        <el-input v-model="ruleForm.projectNature"></el-input>
      </el-form-item>
      <el-form-item label="项目预算" prop="projectBudget">
        <el-input v-model="ruleForm.projectBudget"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { createProject, addProjectUser, updateProejct, de } from '../../network/project'
import { getLoginUserInfo } from '../../network/user'
export default {
  data() {
    return {
      ruleForm: {
        projectName: "",
        projectImg: "",
        projectNature: "",
        projectProcessUrl: "",
        projectType: "对内项目",
        projectSource: "",
        tel: "",
        leader: "",
        projectFileUrl: "",
        startTime: "",
        endTime: "",
        projectBudget: "",
        projectTarget: ""
      },
    };
  },
  created() {
    getLoginUserInfo().then(res => {
      console.log(res.data);
      this.ruleForm.leader = res.data.username
      this.ruleForm.tel = tes.data.tel
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          createProject(this.ruleForm).then(res => {
            console.log(res);
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleImgSuccess(res) {
      this.ruleForm.projectImg = res.data;
    },
    handleFileSuccess(res) {
      console.log(res.data);
      this.ruleForm.projectFileUrl = res.data;
    },
    handleProcessSuccess(res) {
      console.log(res.data);
      this.ruleForm.projectProcessUrl = res.data;
    },

  }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #fff;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  border: 2px dashed #fff;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
