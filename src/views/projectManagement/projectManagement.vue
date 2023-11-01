<template>
  <div class="outer-container">
    <div class="bg-pro">
      <div class="project">
        <!-- 上半区域 -->
        <div class="top_part">
          <div class="pro_font">
            <p>所有项目</p>
          </div>
          <MulTable
            :data="projectList"
            :items-per-page="pageSize"
            class="project-table"
            @selection-change="handleSelectionChange"
            row-key-field="projectId"
          >
            <template v-slot:columns>
              <el-table-column label="编号" type="index"> </el-table-column>
              <el-table-column label="项目名称" prop="projectName">
              </el-table-column>
              <el-table-column label="项目目的" prop="projectTarget">
              </el-table-column>
              <el-table-column label="项目组长" prop="leader">
              </el-table-column>
              <el-table-column label="电话" prop="tel"> </el-table-column>
              <el-table-column label="创建时间" prop="createTime">
              </el-table-column>
            </template>
          </MulTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEquList } from "../../network/equpment";
import {
  getProjectList,
} from "../../network/project";
import MulTable from "../../components/common/table/MulTable.vue";
export default {
  components: {
    MulTable
  },
  data() {
    return {
      //项目列表
      projectList: [],
      pageSize: 2
    };
  },
  created() {
    getProjectList().then(res => {
      this.projectList = res.data;
    });
  },
  mounted() {
    //获取所有的设备信息
    getEquList().then(res => {
      this.pro_equps = res.data;
    });
    //获取所有项目的信息
    this.proData = this.$store.state.proData;
  },
  computed: {
    //这里是上半部分通过选择项目类别筛选出所显示的项目
    filteredData() {
      return this.proData.filter(item => item.category === this.value);
    }
  },
  methods: {
    handleSelectionChange(selection) {
      console.log(selection);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //成功提交
          console.log("成功提交");
          console.log(this.ruleForm);
          this.$store.state.proData.push({ ...this.ruleForm });
          console.log(this.proData);
          this.ruleForm = {
            name: "",
            category: "",
            desc: "",
            equ_value: "",
            purpose: "",
            member: "",
            leader: "",
            selectedEquipments: []
          };
        } else {
          alert("请填写完整");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  /* 居中 */
  height: 100%;
}

.bg-pro {
  display: flex;
  flex-direction: column;
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}

.project {
  height: 100%;
  overflow-y: auto;
}

.project-table {
  width: 100%;
  margin: 30px;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 6px;
}

.demo-table-expand {
  margin-left: 70px;
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #ffffff;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.top_part {
  width: 91%;
  height: auto;
  margin-left: 20px;
}

.bottom_part {
  width: 90%;
  height: 850px;
  margin: 20px;
}

.pro_font {
  margin: 10px;
  width: 100%;
  margin-left: 30px;
  line-height: 55px;
  font-size: 20px;
}

.pro_selector {
  margin: 30px;
}

div /deep/ .el-form-item__label {
  color: rgb(108, 108, 108);
}

div /deep/ .el-button.el-button--primary {
  background-color: rgb(116, 149, 234);
  border-color: rgb(116, 149, 234);
}
</style>
