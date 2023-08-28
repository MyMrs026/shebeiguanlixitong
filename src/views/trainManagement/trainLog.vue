<template>
  <div>
    <el-table :data="trainRecords" height="250" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="130"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="130"> </el-table-column>
      <el-table-column prop="projectName" label="项目名称"> </el-table-column>
      <el-table-column prop="evaluate" label="考核评定" width="130">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      trainRecords: [
        {
          date: "2016-05-03",
          name: "王小虎",
          projectName: "作业规程培训2",
          evaluate: "优秀",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          projectName: "专业知识培训1",
          evaluate: "优秀",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          projectName: "作业规程培训3",
          evaluate: "优秀",
        },
      ],

    };
  },
  methods: {},
};
</script>
<style scope>
</style>