<template>
  <div class="equpM">
    <div style="height=30px">
      <br />
    </div>
  <div class="equp-container">
    <!-- 由五个部分组成，对应网页中五个带边框的div -->
    <!-- 第一部分：使用设备，通过搜索框对已有的设备进行检索，点击即可进行使用 -->
    <div class="centered-div" id="part1">
      <div class="text-home">
        <p style="color:white">使用的设备</p>
      </div>
      <div class="equp-container2">
        <el-row>
          <el-col >
            <div style="margin-top:10px;margin-left:10px;">
              <el-input style="width:300px;margin-top:10px;" placeholder="请输入设备名" v-model="searchKeyword"></el-input>
              <el-button type="info" style="margin-left:12px;"  @click="handleSearch" :disabled="isButtonDisabled" >搜索</el-button>
            </div>
            <br>
            <div ref="tab1" class="table-equ1">
              <el-table :data="pageData" style="width: 100%;border: 1px solid rgb(255, 255, 255);
  border-radius: 8px;">
                <el-table-column prop="deviceName" label="姓名"></el-table-column>
                <el-table-column prop="deviceFunc" label="功能"></el-table-column>
                <el-table-column prop="lab.labName" label="实验室"></el-table-column>
              </el-table>
              <!-- 分页显示，为了应对庞大数据量的情况 -->
              <el-pagination style="margin-left:320px;margin-top:10px"
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
      <div style="float:left;width:30%;height:250px;">
        <img src="../../assets/img/city.png"  style="width:250px;height:250px;text-align:center;margin-left:20px;">
      </div>
    </div>
    <!-- 第二部分：所有被使用的设备的情况，目前是写死的，后期数据从数据库进行读取 -->
    <div class="centered-div" id="part2">
      <div class="text-home">
        <p>被使用的设备情况</p>
      </div>

      <div class="table-equ-use">
        <template>
          <el-table border :data="equpsUse" class="table-equ2" :row-class-name="tableRowClassName">
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
        <p style="color:white">设备使用状态</p>
      </div>
      <div class="table-dch-use">
        <template>
          <el-table border :data="equpsStatus" class="table-dch" :row-class-name="getRowClassName">
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
      equpsUse: [],
      equps: [],
      currentPage: 1,//part1分页功能中当前的页码
      pageSize: 5,
      searchKeyword: '',//part1输入框中的内容
      searchResult: [],//part1搜索结果存放的数组
      equpsStatus: [],
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
    }),
    this.equpsUse = this.$store.state.equpsUse
    this.equpsStatus = this.$store.state.equpsStatus
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
      if ((row.status) === '不在使用中') {
        return 'red-row';
      } else if ((row.status) === '限制使用') {
        return 'yellow-row';
      } else if ((row.status) === '正在使用') {
        return 'gray-row';
      }
      return '';
    }
  },
}
</script>
<style scoped>
.equpM{
  background-image: url("../../assets/img/qqq6.png");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.equp-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.centered-div {
  width: 100%;
  margin: 10px;
}

.equp-container2 {
  width: 65%;
  margin-left: 30px;
  margin-bottom: 10px;
  float:left;
}

.table-equ-use {
  margin-left: 30px;
}
.table-equ1 {
  width: 93.5%;
  font-size: 14px;
  margin-bottom: 10px;
  margin-left:10px;
}
.table-equ2 {
  width: 93.5%;
  border: 1px solid #ffffff;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 10px;
  margin-left:10px;
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
  width: 94%;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 8px;
  margin-left:20px;
}
.text-home {
  margin-top: 0px;
  margin-left: 40px;
  line-height: 55px;
  font-size: 20px;
  color:aliceblue;
  background-image: url("../../assets/img/s-titlebg.png");
  background-repeat: no-repeat;
}
div /deep/ .el-button.el-button--info.is-disabled {
  background-color:rgb(134, 167, 224);
  border-color:rgb(134, 167, 224);
}
</style>