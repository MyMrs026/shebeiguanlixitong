<template>
  <div>
    <div class="table-area">
      <el-table :data="formatExList" stripe style="width: 100%">
        <el-table-column prop="experimentNum" label="实验序号" width="80">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="equipmentName"
          label="设备名"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          width="180"
        ></el-table-column>
        <el-table-column label="实验条件">
          <template slot-scope="scope">
            <el-table :data="scope.row.params">
              <el-table-column
                label="实验属性"
                prop="experimentAttrKey"
              ></el-table-column>
              <el-table-column
                label="实验数值"
                prop="experimentAttrValue"
              ></el-table-column
            ></el-table>
          </template>
        </el-table-column>

        <el-table-column
          prop="result"
          label="结果"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="80"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getExperimentList } from "../../network/equpment";
export default {
  components: {},
  data() {
    return {
      message: "查询实验记录",
      originExList: [],
      formatExList: [],
      tableData: [],
    };
  },
  methods: {
    async loadExperimentList() {
      try {
        const res = await getExperimentList();
        console.log(res.data);
        this.originExList = res.data;

        for (const obj of this.originExList) {
          const equipmentName = obj.equipment.equipmentName;
          const projectName = obj.project.projectName;
          const experimentNum = obj.experiment.experimentNum;
          const remark = obj.experiment.remark;
          const result = obj.experiment.result;
          const startTime = obj.experiment.startTime;
          const username = obj.user.username;

          // Extract information from params array
          const params = obj.params.map((param) => ({
            experimentAttrKey: param.experimentAttrKey,
            experimentAttrValue: param.experimentAttrValue,
          }));
          // Create a new object with extracted information
          const extractedObject = {
            equipmentName,
            projectName,
            experimentNum,
            remark,
            result,
            startTime,
            username,
            params,
          };
          // Add the new object to the extractedData array
          this.formatExList.push(extractedObject);
        }
        console.log(this.formatExList);

        // 遍历formatExList
        this.formatExList.forEach((item) => {
          // 遍历params数组
          item.params.forEach((param) => {
            // 构造新的对象，添加设备名称和实验属性值
            const tableItem = {
              equName: item.equName,
              experimentAttrKey: param.experimentAttrKey,
              experimentAttrValue: param.experimentAttrValue,
            };
            // 将新对象推入tableData数组
            this.tableData.push(tableItem);
          });
        });
        console.log(this.tableData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  created() {
    this.loadExperimentList();
  },
};
</script>
<style scope>
</style>