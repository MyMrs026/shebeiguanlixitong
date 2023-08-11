<template>
  <div class="total">
    <div style="height=30px">
      <br/>
      
    </div>
    <div class="text-area">
      <p class="title">{{ this.notice.title }}&nbsp;&nbsp;日期:{{ this.notice.date | formatDate }}</p>
      <p class="content-area">{{this.notice.content}}</p>
      <div class="text-more">
        <router-link to="/notice">
          <a href="">更多</a>
        </router-link>
        
      </div>
    </div>
    <hr style="border: 1px solid white; margin-left:10px; margin-right:10px" />
    <div class="text-home">
      <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp设备使用表</p>
    </div>
    <div class="table-equ-use">
      <template>
        <el-table border :data="tableData1" class="table-equ" :row-class-name="tableRowClassName">
          <el-table-column prop="equp" label="设备名" width="170">
          </el-table-column>
          <el-table-column prop="status" label="使用情况" width="110">
          </el-table-column>
          <el-table-column prop="user" label="使用用户" width="110">
          </el-table-column>
          <el-table-column prop="org" label="使用组织" width="265">
          </el-table-column>
          <el-table-column prop="starttime" label="开始时间" width="190">
          </el-table-column>
          <el-table-column prop="endtime" label="结束时间" width="190">
          </el-table-column>
        </el-table>
      </template>
    </div>
    <hr style="border: 1px solid white; margin-left:10px; margin-right:10px" />
    <div class="text-home">
      <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp我的预约</p>
    </div>
    <div class="table-book-use">
      <el-table :data="tableData2" class="table-book">
        <el-table-column prop="equp" label="设备" width="170">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
        </el-table-column>
        <el-table-column prop="user" label="用户/操作人员" width="150">
        </el-table-column>
        <el-table-column prop="start" label="开始" width="150">
        </el-table-column>
        <el-table-column prop="end" label="结束" width="150">
        </el-table-column>
        <el-table-column prop="cal" label="日期" width="125">
        </el-table-column>
        <el-table-column prop="action" label="动作" width="165">
        </el-table-column>
      </el-table>
    </div>
    <hr style="border: 1px solid white; margin-left:10px; margin-right:10px" />
    <div class="text-home">
      <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp设备使用状态</p>
    </div>
    <div class="table-dch-use">
      <template>
        <el-table border :data="tableData3" class="table-dch" :row-class-name="getRowClassName">
          <el-table-column prop="equp" label="设备名" width="300">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="200">
          </el-table-column>
          <el-table-column prop="expected" label="预期就绪" width="200">
          </el-table-column>
          <el-table-column prop="statuslog" label="状态日志" width="330">
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
      }],
      notice: {},
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
    },
  },
  mounted() {
    this.notice = this.$store.state.notices[0];
    // console.log(this.notice);
  },
  filters:{
    formatDate: function(value) {
      if (!value) return ''
      const year = value.getFullYear()
      const month = String(value.getMonth() + 1).padStart(2, '0')
      const day = String(value.getDate()).padStart(2, '0')
      return `${year}年${month}月${day}日`
    }
  },
};
</script>

<style>
.total {
  background-image: url("../../assets/img/qqq2.jpg");
}
.text-area {
  opacity: 0.8;
  margin-left: 20px;
  width: 95%;
  background-color: rgb(255, 253, 253);
  border: 1px solid #000;
  border-radius: 3px;
  font-size: 13px;
  
}
.title {
  margin-top: 20px;
  font-weight: bolder;
  text-align: center;
  font-size: 16px;
}
.content-area {
  margin:20px;
  text-indent: 2em;
  font-size: 13px;
}
.text-more{
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: right;

}
.text-home {
  margin-top: 0px;
  margin-left: 30px;
  line-height: 55px;
  font-size: 20px;
  color:aliceblue;
  background-image: url("../../assets/img/s-titlebg.png");
  background-repeat: no-repeat;
}
.table-equ-use {
  margin-left: 20px;
}
.table-equ {
  width: 96%;
  border: 1px solid #000000;
  border-radius: 8px;
}
.table-equ .el-table__body td,
.table-equ .el-table__header th {
  font-size: 13px !important;
}
.el-table .warning-row {
  background: rgb(191, 191, 191);
}
.el-table .success-row {
  background: #e0e0e0;
}
.el-table .red-row {
  background: rgb(230, 171, 171);
}
.el-table .yellow-row {
  background: rgb(223, 220, 166);
}
.el-table .gray-row {
  background: rgb(206, 204, 204);
}
.table-book-use {
  margin-left: 20px;
}
.table-book {
  width: 96%;
  border: 2px solid black;
  border-radius: 8px;
}
.table-dch-use {
  margin-left: 20px;
}
.table-dch {
  width: 96%;
  border: 2px solid black;
  border-radius: 8px;
}
</style>