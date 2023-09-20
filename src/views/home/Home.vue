<template>
  <div class="total">
    <!-- 分割线 -->
    <div class="first">
      <br />
    </div>
    <!-- 标题+图标 -->
    <div>
    <div class="left">
    <div class="title1">实验室设备预约管理系统</div>
    <div style="font-size:1.5rem;margin-top:20px;">Laboratory Equipment Appointment Management System</div>
    <div style="margin-top:30px;"><hr style="color:white;height:10px;"/></div>
    <div class="menu-icon" style="margin-top:20px;height:350px;">
      <a  href="#equ-use" @click="display1">
      <div class="box" ><img src="../../assets/img/usage.png" style="width:190px;height:190px;">
      <div class="boxtitle-c" >设备使用情况</div>
      <div class="boxtitle-e">Equipment usage</div>
      </div>
      </a>
      <a href="#book-use" @click="display2">
      <div class="box"><img src="../../assets/img/reservation.png" style="width:190px;height:190px;">
      <div class="boxtitle-c">我的预约</div>
      <div class="boxtitle-e">My reservation</div>
      </div>
      </a>
      <a href="#dch-use" @click="display3">
      <div class="box"><img src="../../assets/img/state.png" style="width:190px;height:190px;">
      <div class="boxtitle-c">设备使用状态</div>
      <div class="boxtitle-e">Equipment usage status</div>
      </div>
      </a>
    </div>
    </div>
    <!-- 公告部分 -->
    <div class="text-area">
      <p class="title">
        {{ this.notice.title }}<br />日期:{{ this.notice.publishDate | formatDate }}
      </p>
      <p class="content-area">{{ this.notice.content }}</p>
      <div class="text-more">
        <router-link to="/notice">
          <p>更多>>></p>
        </router-link>
      </div>
    </div>
    </div>
    <hr
      style="border: 1px solid white; margin-left: 10px; margin-right: 10px;margin-top:35px;margin-bottom:35px;"
    />
    <div class="text-home" v-show="isUsage">
      <p id="equ-use">设备使用情况</p>
    </div>
    <!-- 设备使用表(目前：写死的) -->
    <div class="table-equ-use"  v-show="isUsage">
      <el-table
        border
        :data="equpsUse"
        class="table-equ"
        :row-class-name="tableRowClassName"
      >
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
    </div>
    <div class="text-home"  v-show="isBook">
      <p id="book-use">我的预约</p>
    </div>
    <!-- 用户个人的预约表(目前：写死的) -->
    <div class="table-book-use" v-show="isBook">
      <el-table :data="myBooks" class="table-book">
        <el-table-column prop="equp" label="设备" width="170">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
        </el-table-column>
        <el-table-column prop="user" label="用户/操作人员" width="150">
        </el-table-column>
        <el-table-column prop="start" label="开始" width="150">
        </el-table-column>
        <el-table-column prop="end" label="结束" width="150"> </el-table-column>
        <el-table-column prop="cal" label="规划方式" width="125">
        </el-table-column>
        <el-table-column prop="action" label="动作" width="165">
        </el-table-column>
      </el-table>
    </div>
    <div class="text-home"  v-show="isStatus">
      <p id="dch-use">设备使用状态</p>
    </div>
    <!-- 所有的设备使用状态表格(目前：写死的) -->
    <div class="table-dch-use"  v-show="isStatus">
      <el-table
        border
        :data="equpsStatus"
        class="table-dch"
        :row-class-name="getRowClassName"
      >
        <el-table-column prop="equp" label="设备名" width="300">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="200">
        </el-table-column>
        <el-table-column prop="expected" label="预期就绪" width="200">
        </el-table-column>
        <el-table-column prop="statuslog" label="状态日志" width="330">
        </el-table-column>
      </el-table>
    </div>
    <!-- 设备故障处理 -->
    <div class="text-home" v-if="this.$store.state.cu_role === 'admin'">
      <p>设备维修记录</p>
    </div>
    <div class="table-dch-use" v-if="this.$store.state.cu_role === 'admin'">
      <el-table :data="MaintainData" class="table-book" border>
        <el-table-column
          prop="deviceMaintenanceId"
          label="设备维修ID"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="deviceId" label="设备ID" width="180">
        </el-table-column>
        <el-table-column prop="content" label="内容"> </el-table-column>
        <el-table-column
          prop="expectedEndTime"
          label="预期结束时间"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="180">
        </el-table-column>
        <el-table-column prop="actualEndTime" label="实际结束时间">
        </el-table-column>
        <el-table-column prop="maintenanceStaff" label="维修人员" width="180">
        </el-table-column>
        <el-table-column prop="remark" label="评价"> </el-table-column>
      </el-table>
    </div> -->
  </div>
</template>

<script>
import { getNoticeList } from "../../network/notice";
export default {
  data() {
    return {
      //设备使用表数据
      equpsUse: [],
      //用户个人设备预约表数据
      myBooks: [],
      //设备使用状态表数据
      equpsStatus: [],
      notice: [], //公告信息，用来接收从axios传过来的公告信息
      MaintainData: [], //设备维保记录
      isUsage:false,
      isBook:false,
      isStatus:false,
    };
  },
  methods: {
    //这个方法是为了使表格呈现灰黑相间模式
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
    //这个方法是为了使表格呈现红黄灰相间模式
    getRowClassName({ row, rowIndex }) {
      if (row.status === "不在使用中") {
        return "red-row";
      } else if (row.status === "限制使用") {
        return "yellow-row";
      } else if (row.status === "正在使用") {
        return "gray-row";
      }
      return "";
    },
    //控制图标对应表格的显示
    display1(){
    this.isUsage = true;
    this.isBook = false;
    this.isStatus = false;
    },
    display2(){
    this.isUsage = false;
    this.isBook = true;
    this.isStatus = false;
    },
    display3(){
    this.isUsage = false;
    this.isBook = false;
    this.isStatus = true;
    },
  },
  created() {
    //目前是从vuex中读取数据，后期可以从axios中读取数据
    
    this.equpsUse = this.$store.state.equpsUse;
    this.myBooks = this.$store.state.myBooks;
    this.equpsStatus = this.$store.state.equpsStatus;
  },
  filters: {
    //处理日期的显示格式问题，使日期以xxxx年xx月xx日的形式显示
    formatDate: function (value) {
      if (!value) return "";
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const day = String(value.getDate()).padStart(2, "0");
      return `${year}年${month}月${day}日`;
    },
  },
  mounted() {
    this.notice = this.$store.state.notices;
    this.MaintainData = this.$store.state.MaintainData;
    this.proData = this.$store.state.proData;
    getNoticeList().then(res=>{
      const data = res.data;
      const sortedData = data.sort((a,b)=>a.noticeId - b.noticeId);
      this.notice = sortedData[ 0 ];
      this.notice.publishDate = new Date((this.notice.publishDate).substring(0,10));
    })
  },
};
</script>

<style>
.total {
  background-image: url("../../assets/img/qqq6.png");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
}
.first{
  height:50px;
}
.left{
  float:left;
  width:58%;
  height:300px;
  padding-left:50px;
}
.title1 {
  font-size: 3.5rem;
  margin-top: 15px;
  height: 70px;
  color: rgb(103, 112, 147);
  font-weight:bolder;
}
.box{
  margin-top:20px;
  margin-right:10px;
  border: 1px solid white;
  border-radius: 8px;
  height:320px;
  width:30%;
  float:left;
  background-color:white;
  opacity: 0.7;
}

.boxtitle-c{
  height:40px;
  text-align:center;
  font-size:1.35rem;
  margin-top:10px;
}

.boxtitle-e{
  height:50px;
  text-align:center;
  font-size:1.35rem;
}

.text-area {
  overflow: auto;
  height: auto;
  border: 1px solid white;
  border-radius: 8px;
  opacity: 0.8;
  width: 35%;
  margin-right:20px;
  float:left;
  padding: 10px;
  background-color: rgb(255, 253, 253);
  
}

.title {
  margin-top: 20px;
  font-weight: bolder;
  text-align: center;
  font-size: 1.6rem;
}

.content-area {
  margin: 20px;
  text-indent: 2em;
  line-height: 200%;
  font-size: 1rem;
  font-family: Microsoft YaHei;
  overflow:hidden;
  text-overflow:ellipsis;
  height:300px;
}

.text-more {
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: right;
  font-size: 1.3rem;
  color: aqua;
}

.text-home {
  margin-top: 0px;
  margin-left: 50px;
  line-height: 55px;
  font-size: 1.5rem;
  color:rgb(103, 102, 102);
}

.table-equ-use {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.table-equ {
  width: auto;
  height: auto;
  border: 0px solid #000000;
  box-shadow: 0 2px 4px rgba(246, 245, 245, 1);
  margin: 0 auto;
  font-size: 1rem;
  font-family: w95fa;
}

.el-table .warning-row {
  background: rgb(191, 191, 191);
}

.el-table .success-row {
  background: #e0e0e0;
}

.el-table .red-row {
  background: rgb(255, 201, 201);
}

.el-table .yellow-row {
  background: rgb(255, 253, 209);
}

.el-table .gray-row {
  background: rgb(196, 196, 196);
}

.table-book-use {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.table-book {
  width: auto;
  height: auto;
  border: 0px solid #000000;
  border-radius: 0px;
  margin: 0 auto;
  font-size: 1rem;
  font-family: w95fa;
}

.table-dch-use {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.table-dch {
  width: auto;
  height: auto;
  border: 0px solid #000000;
  border-radius: 0px;
  margin: 0 auto;
  font-size: 1rem;
  font-family: w95fa;
}
</style>