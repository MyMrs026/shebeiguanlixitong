<template>
  <div>
    <h3>培训列表</h3>
    <el-table :data="trainData" style="width: 100%">
      <el-table-column prop="trainName" label="培训名称" width="180"> </el-table-column>
      <el-table-column prop="trainIntroduction" label="培训介绍" width="180"> </el-table-column>
      <el-table-column prop="docUrl" label="培训内容" width="180"> </el-table-column>
      <el-table-column prop="trainDuration" label="持续时间" width="180"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getTrainList } from '../../network/train'
export default {
  components: {},
  data() {
    return {
      trainData: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {},
  mounted(){
    getTrainList().then(res=>{
      this.trainData = res.data
      // console.log(res.data);
      console.log(this.trainData);
    })
  },
};
</script>
<style scope>
</style>