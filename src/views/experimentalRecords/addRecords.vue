<template>
  <div class="container-area">
    <h3 style="margin-top: 20px">添加实验记录</h3>
    <div class="button-area text-right">
      <el-button class="align-right" @click="openNewTab"
        >历史实验记录</el-button
      >
    </div>
    <div class="title-area">
      <div>当前设备：{{ this.equName }}</div>
      <div>当前用户：{{ this.userName }}</div>
      <div>当前项目: {{ this.projectName }}</div>
    </div>
    <div class="form-area">
      <el-form
        :model="ruleForm"
        :rules="rules"
        :label-position="labelPosition"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="实验开始日期" label-width="150px" required>
          <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="ruleForm.startTime"
            style="width: 200px"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="序号" label-width="150px" prop="experimentNum">
          <el-input
            v-model="ruleForm.experimentNum"
            style="width: 200px"
            type="number"
            :min="1"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(value, key) in equAttrs"
          :label="key"
          :key="key"
          label-width="150px"
          :prop="key"
        >
          <el-input
            v-model="equAttrs[key]"
            :placeholder="value"
            style="width: 200px"
          ></el-input>
        </el-form-item>

        <el-form-item label="结果" label-width="150px" prop="result">
          <el-input v-model="ruleForm.result" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="150px" prop="remark">
          <el-input v-model="ruleForm.remark" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label-width="150px">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getEquAttr, addExperiment } from "../../network/equpment";
import { getProjectDetail } from "../../network/project";
export default {
  components: {},
  data() {
    return {
      userName: "",
      equName: "",
      equId: "",
      equipmentOrderId: "",
      projectId: "",
      projectName: "",
      labelPosition: "right",
      equAttrs: [],
      ruleForm: {
        startTime: new Date(),
        experimentNum: null,
        result: "",
        remark: "",
      },
      rules: {
        startTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        experimentNum: [
          {
            required: true,
            message: "请输入实验序号",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: true,
            message: "请输入实验备注",
            trigger: "blur",
          },
        ],
        result: [
          {
            required: true,
            message: "请输入实验结果",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //日期时间格式转换
    formatDate(inputDate) {
      const date = new Date(inputDate);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      return formattedDate;
    },

    //查看历史实验记录
    openNewTab() {
      // 获取当前路由路径
      const currentRoute = this.$route.fullPath;

      // 拼接新页面的路由路径
      const newTabRoute = "/searchRecords";

      // 在新标签页中打开新页面
      window.open(newTabRoute, "_blank");

      // 在原页面保持路由不变
      this.$router.replace({ path: currentRoute });
    },
    //提交新建表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          // console.log(this.ruleForm);
          // console.log(this.equAttrs);
          const params = {};
          for (const key in this.equAttrs) {
            if (Object.prototype.hasOwnProperty.call(this.equAttrs, key)) {
              params[key] = this.equAttrs[key];
            }
          }
          console.log(params);
          this.ruleForm.startTime = this.formatDate(this.ruleForm.startTime);
          console.log(
            this.equipmentOrderId,
            this.ruleForm.experimentNum,
            params,
            this.ruleForm.remark,
            this.ruleForm.result,
            this.ruleForm.startTime
          );
          addExperiment(
            this.equipmentOrderId,
            this.ruleForm.experimentNum,
            params,
            this.ruleForm.remark,
            this.ruleForm.result,
            this.ruleForm.startTime
          ).then((res) => {
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //我也不知道有什么用，好像不能成功加入到rules中
    generateRules() {
      // 动态生成验证规则
      this.rules = Object.fromEntries(
        Object.keys(this.equAttrs).map((key) => [
          key,
          [{ required: true, message: `请输入${key}`, trigger: "blur" }],
        ])
      );
    },
  },
  created() {
    this.userName = this.$route.query.userName;
    this.equName = this.$route.query.equName;
    this.equId = this.$route.query.equId;
    this.equipmentOrderId = this.$route.query.equipmentOrderId;
    this.projectId = this.$route.query.projectId;
    // 现在你可以在组件中使用 equId 和 equipmentOrderId 了
    // console.log("userName:", this.userName);
    // console.log("equName:", this.equName);
    // console.log("equId:", this.equId);
    // console.log("equipmentOrderId:", this.equipmentOrderId);

    getEquAttr(this.equId).then((res) => {
      // console.log(res.data);
      // 使用 reduce 方法将 attrName 赋值给 equAttrs 对象
      this.equAttrs = res.data.reduce((acc, currentItem) => {
        acc[currentItem.attrName] = currentItem.attrValue;
        return acc;
      }, {});
      // console.log(this.equAttrs);
    });

    getProjectDetail(this.projectId).then((res) => {
      // console.log(res.data);
      this.projectName = res.data.project.projectName;
      // console.log(this.projectName);
    });
  },
};
</script>
<style scope>
.container-area {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
.button-area {
  align-self: flex-end;
  margin-right: 30px;
}
.title-area {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 1.25rem;
}
.title-area div {
  margin-right: 25px;
}
.el-form-item__label {
  font-size: 16px;
}
</style>