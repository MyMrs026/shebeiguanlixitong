<template>
  <div>
    <div class="filter-area">
      <el-row type="flex" class="filter-row">
        <el-col :span="6">
          <el-input
            v-model="filters.experimentNum"
            placeholder="实验序号"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="filters.username" placeholder="姓名"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="filters.projectName"
            placeholder="项目名"
          ></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="table-area">
      <!-- 开始展示所有的内容，根据筛选字段展示筛选后的内容 -->
      <el-table :data="filteredTableData" stripe class="search-table">
        <el-table-column prop="experimentNum" label="实验序号" min-width="30px" align="center">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          min-width="50px" align="center"
        ></el-table-column>
        <el-table-column
          prop="equipmentName"
          label="设备名"
          min-width="100px" align="center"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名"
          min-width="100px" align="center"
        ></el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          min-width="100px" align="center"
        ></el-table-column>

        <!-- 根据param中对象的数量动态生成列 -->
        <el-table-column
          v-for="(param, index) in uniqueParams"
          :key="index"
          :label="param.experimentAttrKey"
          :prop="`param_${index}`"
          align="center"
        ></el-table-column>

        <!-- <el-table-column label="实验条件">
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
        </el-table-column> -->

        <el-table-column
          prop="result"
          label="结果"
          min-width="40px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          min-width="40px"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getExperimentList, getExperimentById } from "../../network/equpment";
export default {
  components: {},
  data() {
    return {
      message: "查询实验记录",
      equId: "",
      userName: "",
      originExList: [],
      formatExList: [],
      tableData: [], //表格所有的数据
      filters: {
        experimentNum: "",
        username: "",
        equipmentName: "",
        projectName: "",
      },
      uniqueParams: [], // 用于存储去重后的 params
    };
  },
  methods: {
    async loadExperimentList() {
      try {
        const res = await getExperimentById(this.equId);
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

    // 生成表格数据
    generateTableData() {
      this.tableData = this.formatExList.map((item) => {
        const rowData = { equName: item.equName };

        // 将每个 experimentAttrKey 对应的值加入 rowData 中
        this.uniqueParams.forEach((param) => {
          const matchingParam = item.params.find(
            (p) => p.experimentAttrKey === param.experimentAttrKey
          );
          rowData[`param_${param.index}`] = matchingParam
            ? matchingParam.experimentAttrValue
            : ""; // 设置默认值，可根据实际情况修改
        });

        // 添加其他列，根据需要添加
        rowData.equipmentName = item.equipmentName;
        rowData.projectName = item.projectName;
        rowData.experimentNum = item.experimentNum;
        rowData.remark = item.remark;
        rowData.result = item.result;
        rowData.startTime = item.startTime;
        rowData.username = item.username;
        return rowData;
      });
    },
  },
  created() {
    this.userName = this.$route.query.userName;
    this.equId = this.$route.query.equId;
    console.log("equId:", this.equId);
    console.log("userName:", this.userName);
    this.loadExperimentList();
  },
  watch: {
    // 当 uniqueExperimentAttrKeys 更新时，更新 uniqueParams 和 tableData
    uniqueExperimentAttrKeys: {
      handler(keys) {
        this.uniqueParams = keys.map((key, index) => ({
          experimentAttrKey: key,
          index,
        }));
        this.generateTableData();
      },
      immediate: true, // 立即执行一次
    },
  },
  computed: {
    // 获取所有不重复的 experimentAttrKey
    uniqueExperimentAttrKeys() {
      const keys = new Set();
      this.formatExList.forEach((item) => {
        item.params.forEach((param) => {
          keys.add(param.experimentAttrKey);
        });
      });
      return Array.from(keys);
    },
    //筛选后的数据
    filteredTableData() {
      // Use a computed property to filter the table data based on filters
      return this.tableData.filter((item) => {
        return (
          item.experimentNum.toString().includes(this.filters.experimentNum) &&
          item.username.includes(this.filters.username) &&
          item.projectName.includes(this.filters.projectName)
        );
      });
    },
  },
};
</script>
<style scope>
.search-table {
}
.filter-area {
  text-align: left;
}
</style>