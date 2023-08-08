<template>
  <div class="equp-container">
    <!-- 由五个部分组成，对应网页中五个带边框的div -->
    <!-- 第一部分：使用设备，通过搜索框对已有的设备进行检索，点击即可进行使用 -->
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
              <!-- 分页显示，为了应对庞大数据量的情况 -->
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
            <!-- 搜索结果也已一个表格的形式进行显示，把上面的表格进行隐藏即可 -->
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
    <!-- 第二部分：所有被使用的设备的情况，目前是写死的，后期数据从数据库进行读取 -->
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
    <!-- 第三部分：所有设备的状态表 -->
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
    <!-- 第四部分：设备列表 -->
    <div class="centered-div" id="part4">
      <equList></equList>
    </div>
    <!-- 第五部分：设备维修模块 -->
    <div class="centered-div" id="part5">
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
      tableData1: [{ //被使用的设备的情况
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
      currentPage: 1,//part1分页功能中当前的页码
      pageSize: 5,
      searchKeyword: '',//part1输入框中的内容
      searchResult: [],//part1搜索结果存放的数组
      tableData3: [{ //所有设备的状态
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
    pageData() { //搜索得到的数据
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.equps.slice(startIndex, endIndex)
    },
    isButtonDisabled() { //当输入框中没内容时候设置搜索按钮为不可点击
      return this.searchKeyword === '';
    }
  },  
  created () {
    getEquList().then(res => {
      // console.log(res.data);
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
    handlePageSizeChange(pageSize) { //part1翻页功能
      this.pageSize = pageSize
    },
    handleCurrentPageChange(currentPage) { //part1当前页码显示切换
      this.currentPage = currentPage
    },
    handleSearch() { //对part1的两个表个显示和隐藏进行切换
      this.searchResult = this.equps.filter(equp => {
        return equp.deviceName.toLowerCase().includes(this.searchKeyword.toLowerCase())
      })
      this.$refs.tab1.style.display = 'none';
      this.$refs.tab2.style.display = 'block';
    },
    getRowClassName({row,rowIndex}) { //part3 红黄灰三种颜色进行切换
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