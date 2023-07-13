<template>
  <div>
    <div class="text-area">
      <p class="fist-line">Please note regarding working with WetChemistry at Danchip (Update 2016-10-17 15:55)</p>
      <p>The 2 "old' fume hoods in D-3 vil be emoved October 24 and we will slowly start up using the new ones, starting
        with fume hood 2 "Acidand bases*& fume hood 3 “solvents".
        <br />
        <br />
        Your wet chemistry compelence (Hands-on aka Labintro) will be removed until you have been trained in the new fume
        hoods. therelorecontact training@danchipdtudk to get training.
      </p>
      <p class="warning-text">YOU ARE NOT ALLOWED TO USE THE NEW FUMEHOODS WITHOUT TRAINING!</p>
      <p>You can still use the old fume hoods for what you have been trained to
        <br />
        Before you get training,you need to have read the <a style="text-decoration:none" href="@">APV/manual for the fume
          hoods</a>
      </p>
    </div>
    <div class="text-home">
      <p>设备使用表</p>
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
    <hr style="border: 1px solid darkred; margin-left:10px; margin-right:10px" />
    <div class="text-home">
      <p>我的预约</p>
    </div>
    <div class="table-book-use">
      <el-table :data="tableData2" class="table-book">
        <el-table-column prop="equp" label="设备" width="120">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
        </el-table-column>
        <el-table-column prop="user" label="用户/操作人员" width="150">
        </el-table-column>
        <el-table-column prop="start" label="开始" width="100">
        </el-table-column>
        <el-table-column prop="end" label="结束" width="100">
        </el-table-column>
        <el-table-column prop="cal" label="日期" width="105">
        </el-table-column>
        <el-table-column prop="action" label="动作" width="158">
        </el-table-column>
      </el-table>
    </div>
    <hr style="border: 1px solid darkred; margin-left:10px; margin-right:10px" />
    <div class="text-home">
      <p>设备使用状态</p>
    </div>
    <div class="table-dch-use">
      <template>
        <el-table border :data="tableData3" class="table-dch" :row-class-name="getRowClassName">
          <el-table-column prop="equp" label="设备名" width="300">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="150">
          </el-table-column>
          <el-table-column prop="expected" label="预期就绪" width="180">
          </el-table-column>
          <el-table-column prop="statuslog" label="状态日志" width="300">
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      tableData2: [{
        equp: '0-TestTool',
        status: 'OK',
        user: 'choi',
        start:'19:00',
        end:'20:00',
        cal:'Weekly',
        action:'Not authorized'
      }],
      tableData3: [{
        equp: '7-up(masks)',
        status: 'Out of use',
        expected: 'Not set',
        statuslog: 'still not working'
      },
      {
        equp: '7-up 6"',
        status: 'Out of use',
        expected: 'Not set',
        statuslog: 'Is being decommissioned'
      },
      {
        equp: 'ALD Picosun R200',
        status: 'Limited use',
        expected: '11-11-2016',
        statuslog: 'no DEZ;TiO2 and AI2O3 are fine'
      },
      {
        equp: 'Aligner',
        status: 'Limited use',
        expected: '11-11-2016',
        statuslog: 'Intensity low,max power'
      },
      {
        equp: 'ICP Metal Etch',
        status: 'Being Serviced',
        expected: '14-11-2016',
        statuslog: 'Yearly service by SPTS 1 of 3'
      },

    ],
    };
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
    getRowClassName({row,rowIndex}) {
      if ((row.status) === 'Out of use') {
        return 'red-row';
      } else if ((row.status) === 'Limited use') {
        return 'yellow-row';
      } else if ((row.status) === 'Being Serviced') {
        return 'gray-row';
      }
      return '';
    } 

  },
};
</script>

<style>
.text-area {
  margin-left: 10px;
  margin-bottom: 0px;
  width: 55%;
  background-color: rgb(227, 227, 227);
  border-radius: 3px;
  font-size: 8px;
}

.fist-line {
  font-weight: bolder;
}

.warning-text {
  color: rgb(210, 30, 30);
}

.text-home {
  margin-top: 0px;
  margin-left: 10px;
  font-size: 8px;
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

.table-equ .el-table__body td,
.table-equ .el-table__header th {
  font-size: 6px !important;
}

.el-table .warning-row {
  background: rgb(191, 191, 191);
}

.el-table .success-row {
  background: #e0e0e0;
}

.el-table .red-row {
  background: rgb(255, 103, 103);
}

.el-table .yellow-row {
  background: rgb(255, 242, 0);
}

.el-table .gray-row {
  background: rgb(142, 142, 142);
}

.table-book-use {
  margin-left: 10px;
}

.table-book {
  width: 58%;
  border: 2px solid black;
  border-radius: 8px;
}

.table-dch-use {
  margin-left: 10px;
}

.table-dch {
  width: 62%;
  border: 2px solid black;
  border-radius: 8px;
}
</style>