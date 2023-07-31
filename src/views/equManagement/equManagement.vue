<template>
  <div class="equp-container">
    <div class="centered-div" id="part1">
      <div>
        <p>使用的设备</p>
      </div>
      <div class="equp-container2">
        <el-row>
          <el-col :span="6">
            <div style="margin-top:10px;margin-left:10px;">
              <p>设备</p>
            </div>
          </el-col>
          <el-col :span="18">
            <div>
              <el-input style="width:300px;margin-top:10px;" placeholder="请输入设备名" v-model="searchKeyword"></el-input>
              <el-button type="info" style="margin-left:12px;" size="mini" @click="handleSearch" :disabled="isButtonDisabled" >搜索</el-button>
            </div>
            <br>
            <div ref="tab1" class="table-equ">
              <el-table :data="pageData" style="width: 100%">
                <el-table-column prop="deviceName" label="姓名"></el-table-column>
                <el-table-column prop="deviceFunc" label="功能"></el-table-column>
                <el-table-column prop="lab.labName" label="实验室"></el-table-column>
              </el-table>
              <el-pagination
                @size-change="handlePageSizeChange"
                @current-change="handleCurrentPageChange"
                :current-page="currentPage"
                :page-sizes="[5]"
                :page-size="pageSize"
                layout="pager"
                :total="equps.length"
              ></el-pagination> 
            </div>
            <div ref="tab2" class="search-area">
              <el-table v-if="searchResult.length > 0" :data="searchResult" style="width: 100%">
                <el-table-column prop="deviceName" label="姓名"></el-table-column>
                <el-table-column prop="deviceFunc" label="功能"></el-table-column>
                <el-table-column prop="lab.labName" label="实验室"></el-table-column>
              </el-table>
              <p v-else> 未找到匹配的记录</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="centered-div" id="part2">
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
    <div class="centered-div" id="part3">
      <div class="text-home">
        <p>设备使用状态</p>
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
    <div class="centered-div">
      <equList></equList>
    </div>
    <div class="centered-div">
      <equMaintain></equMaintain>
    </div>
  </div>
</template>

<script>
import equList from '../equList/equList'
import equMaintain from '../equManagement/equMaintain.vue'
import { getEquList } from '../../network/equpment';
export default {
  components:{
    equList,
    equMaintain
  },  
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
      equps: [],
      currentPage: 1,
      pageSize: 5,
      searchKeyword: '',
      searchResult: [],
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
    }
  },
  computed : {
    pageData() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.equps.slice(startIndex, endIndex)
    },
    isButtonDisabled() {
      return this.searchKeyword === '';
    }
  },  
  created () {
    getEquList().then(res => {
      console.log(res.data);
      this.equps = res.data
    })
  }, 
  methods: {
    tableRowClassName({ row, rowIndex }) { //表格灰黑相间
      if ((rowIndex % 2) === 0) {
        return 'warning-row';
      } else if ((rowIndex % 2) === 1) {
        return 'success-row';
      }
      return '';
    },
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize
    },
    handleCurrentPageChange(currentPage) {
      this.currentPage = currentPage
    },
    handleSearch() {
      this.searchResult = this.equps.filter(equp => {
        return equp.deviceName.toLowerCase().includes(this.searchKeyword.toLowerCase())
      })
      this.$refs.tab1.style.display = 'none';
      this.$refs.tab2.style.display = 'block';
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
  width: 80%;
  border: 1px solid #000;
  border-radius: 8px;
  margin-left: 3px;
  margin-bottom: 10px;
}

.table-equ-use {
  margin-left: 10px;
}

.table-equ {
  width: 95%;
  border: 1px solid #000000;
  border-radius: 8px;
  font-size: 6px;
  margin-bottom: 10px;
}

.el-table .warning-row {
  background: rgb(191, 191, 191);
}

.el-table .success-row {
  background: #e0e0e0;
}

.search-area{
  display: none;
}
.table-dch-use {
  margin: 20px;
}

.table-dch {
  width: 96%;
  border: 1px solid black;
  border-radius: 8px;
}
</style>