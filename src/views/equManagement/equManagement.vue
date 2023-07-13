<template>
  <div class="equp-container">
    <div class="centered-div">
      <div>
        <p>使用的设备</p>
      </div>
      <div class="equp-container2">
        <el-row>
          <el-col :span="6">
            <div>
              <p>设备</p>
            </div>
          </el-col>
          <el-col :span="18">
            <div>
              <el-input style="width:300px" v-model="input"></el-input>
            </div>
            <br>
            <div>
              <el-button type="info" style="margin-left:12px;" size="mini">开始使用</el-button>
            </div>
            <br>
            <div>
              <el-tag type="success">DCH(All)</el-tag>
              <el-tag type="success">Last Used(Project)</el-tag>
              <el-tag type="success">Ready Again</el-tag>
              <br>
              <el-tag type="success">Last Used</el-tag>
              <el-tag type="success">Most Popular(DCH)</el-tag>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="centered-div">
      <div style="margin-left: 6px;">
        <p>被使用的设备情况</p>
      </div>

      <div class="table-equ-use">
        <template>
          <el-table border :data="tableData1" class="table-equ" :row-class-name="tableRowClassName">
            <el-table-column prop="equp" label="设备名" width="180">
            </el-table-column>
            <el-table-column prop="status" label="使用情况" width="100">
            </el-table-column>
            <el-table-column prop="user" label="使用用户" width="100">
            </el-table-column>
            <el-table-column prop="org" label="使用组织" width="180">
            </el-table-column>
            <el-table-column prop="starttime" label="开始时间" width="180">
            </el-table-column>
            <el-table-column prop="endtime" label="结束时间" width="193">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      tableData1: [{
        equp: 'ASE',
        status: 'Open',
        user: 'ansimon',
        org: 'KU-Rekvisition 6516-00638',
        starttime: '2016-11-10 17:30:03',
        endtime: '2016-11-10 19:49:21'
      }, {
        equp: 'ASE',
        status: 'Open',
        user: 'ansimon',
        org: 'KU-Rekvisition 6516-00638',
        starttime: '2016-11-10 17:30:03',
        endtime: '2016-11-10 19:49:21'
      }, {
        equp: 'ASE',
        status: 'Open',
        user: 'ansimon',
        org: 'KU-Rekvisition 6516-00638',
        starttime: '2016-11-10 17:30:03',
        endtime: '2016-11-10 19:49:21'
      }, {
        equp: 'ASE',
        status: 'Open',
        user: 'ansimon',
        org: 'KU-Rekvisition 6516-00638',
        starttime: '2016-11-10 17:30:03',
        endtime: '2016-11-10 19:49:21'
      }],
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if ((rowIndex % 2) === 0) {
        return 'warning-row';
      } else if ((rowIndex % 2) === 1) {
        return 'success-row';
      }
      return '';
    },
  }
}
</script>
<style scoped>
.equp-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.centered-div {
  width: 95%;

  border: 1px solid #000;
  border-radius: 8px;
  margin: 3px;
}

.equp-container2 {
  width: 50%;
  border: 1px solid #000;
  border-radius: 8px;
  margin-left: 3px;
}

.table-equ-use {
  margin-left: 10px;
}

.table-equ {
  width: 62%;
  border: 1px solid #000000;
  border-radius: 8px;
  font-size: 6px;
}

.el-table .warning-row {
  background: rgb(191, 191, 191);
}

.el-table .success-row {
  background: #e0e0e0;
}</style>