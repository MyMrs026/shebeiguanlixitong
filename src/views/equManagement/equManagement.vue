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
              <el-input style="width:300px" placeholder="请输入设备名" v-model="searchKeyword"></el-input>
              <el-button type="info" style="margin-left:12px;" size="mini" @click="handleSearch" :disabled="isButtonDisabled" >搜索</el-button>
            </div>
            <br>
            <div ref="tab1" class="table-equ">
              <el-table :data="pageData" style="width: 100%">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="id" label="学号"></el-table-column>
              </el-table>
              <el-pagination
                @size-change="handlePageSizeChange"
                @current-change="handleCurrentPageChange"
                :current-page="currentPage"
                :page-sizes="[5]"
                :page-size="pageSize"
                layout="pager"
                :total="students.length"
              ></el-pagination> 
            </div>
            <div ref="tab2" class="search-area">
              <el-table v-if="searchResult.length > 0" :data="searchResult" style="width: 100%">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="id" label="学号"></el-table-column>
              </el-table>
              <p v-else> 未找到匹配的记录</p>
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
      students: [],
      currentPage: 1,
      pageSize: 5,
      searchKeyword: '',
      searchResult: []
    }
  },
  computed : {
    pageData() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.students.slice(startIndex, endIndex)
    },
    isButtonDisabled() {
      return this.searchKeyword === '';
    }
  },  
  mounted() {
    this.generateRandomStudents()
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
    generateRandomStudents() {
      for (let i = 0; i < 10; i++) {
        const student = {
          name: this.generateRandomName(),
          age: this.generateRandomAge(),
          id: this.generateRandomID(),
        }
        this.students.push(student)
      }
    },
    generateRandomName() {
      const names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack']
      return names[Math.floor(Math.random() * names.length)]
    },
    generateRandomAge() {
      return Math.floor(Math.random() * 10) + 15
    },
    generateRandomID() {
      return Math.floor(Math.random() * 10000) + 10000
    },
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize
    },
    handleCurrentPageChange(currentPage) {
      this.currentPage = currentPage
    },
    handleSearch() {
      this.searchResult = this.students.filter(student => {
        return student.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      })
      this.$refs.tab1.style.display = 'none';
      this.$refs.tab2.style.display = 'block';
    },
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
}

.search-area{
  display: none;
}
</style>