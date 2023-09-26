<template>
  <div class="total">
    <!-- 分割线 -->
    <div style="height=1.875rem" class="first">
      <br />
    </div>
    <!-- 标题+图标 -->
    <div style="height:35rem;">
    <div class="left">
    <div class="title1">微纳公共平台管理网站</div>
    <div style="font-size:1.75rem;margin-top:1.25rem;">WeiNa Public Platform Management Website</div>
    <div style="margin-top:1.25rem;"><hr style="color:white;height:0.625rem;"/></div>
    <div class="menu-icon" style="margin-top:1.25rem;height:18.75rem;margin-right:3.125rem;background-color:white;">

      <el-descriptions class="margin-top" :column="3" :size="size" border >
    <el-descriptions-item>
      <template slot="label" style="width:5rem;" >
        <i class="el-icon-user"></i>
        实验室名称
      </template>
      洪合实验室
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        联系方式
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        地址
      </template>
      浙江省嘉兴市秀洲区洪福路1108号
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        简介
      </template>
      <!-- <el-tag size="small">学校</el-tag> -->
      国家实验室，属于科学与工程研究类国家科技创新基地，体现国家意志、实现国家使命、代表国家水平的战略科技力量，是面向国际科技竞争的创新基础平台，是保障国家安全的核心支撑，是突破型、引领型、平台型一体化的大型综合性研究基地。
      国家同步辐射实验室等5个首批国家实验室至2000年底，全部通过验收。2000年-2003年，科学技术部陆续批准了5个国家实验室的试点。随后，又于2006年启动10个第二批国家实验室试点建设。截止到2016年底，除青岛海洋科学与技术国家实验室正式获批成立外，其余14个试点的国家实验室仍处于筹建状态。 截至2021年1月，北京已成立挂牌成立中关村国家实验室、怀柔国家实验室、昌平国家实验室。
      2023年3月，根据国务院关于提请审议国务院机构改革方案的议案，重新组建科学技术部，保留国家实验室建设职责。
    </el-descriptions-item>
    <!-- <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      江苏省苏州市吴中区吴中大道 1188 号
    </el-descriptions-item> -->
  </el-descriptions>

    </div>
    </div>
    <!-- 公告部分 -->
    <div class="text-area">
      <div>公告信息</div>
      <ul class="news">
        <li
          v-for="item in paginatedData"
          :key="item.notice_id"
          style="cursor: pointer">
          <div style="display: flex; flex-direction: row;">
            <div class="notice_content" @click="gotoNoticeDetail(item.notice_id)">
              <font>{{ item.title }}</font>
              <!-- 日期的显示格式:xxxx年xx月xx日 -->
              <font>{{ item.publishDate | formatDate }}</font>
            </div>
          </div>
        </li>
      </ul>
      
      <div class="text-more">
        <router-link to="/notice">
          <p>更多>>></p>
        </router-link>
      </div>
    </div>
    </div>
    <hr
      style="border: 0.0625rem solid white; margin-left: 0.625rem; margin-right: 0.625rem;margin-top:1.875rem;margin-bottom:2.1875rem;"
    />
    <div class="text-home" >
      <p id="equ-use">设备使用情况</p>
    </div>
    <!-- 设备使用表(目前：写死的) -->
    <div class="table-equ-use"  >
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
    <div class="text-home"  >
      <p id="book-use">我的预约</p>
    </div>
    <!-- 用户个人的预约表(目前：写死的) -->
    <div class="table-book-use">
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
    <div class="text-home"  >
      <p id="dch-use">设备使用状态</p>
    </div>
    <!-- 所有的设备使用状态表格(目前：写死的) -->
    <div class="table-dch-use"  >
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
	// 分辨率大于等于1680，大部分为1920的范围情况下，调用此css
	if(window.screen.width >= 1680){
		document.write('<link rel="stylesheet" href="css/index_1920.css">');
	}
	// 分辨率在1600-1680这个范围的情况下，调用此css
	else if(window.screen.width >= 1600){
		document.write('<link rel="stylesheet" href="css/index_1600.css">');
	}
	// 分辨率小于1600的范围情况下，调用此css
	else{
		document.write('<link rel="stylesheet" href="css/index.css">');
	}
import { getNoticeList,publishNotice } from "../../network/notice";
export default {
  data() {
    return {
      //设备使用表数据
      equpsUse: [],
      //用户个人设备预约表数据
      myBooks: [],
      //设备使用状态表数据
      equpsStatus: [],
      notice: {}, //公告信息，用来接收从axios传过来的公告信息
      MaintainData: [], //设备维保记录
      
      size:'',
      notice_content: "",
      notices: [],
      currentPage: 1,
      perPage: 5,
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
    // //控制图标对应表格的显示
    // display1(){
    // this.isUsage = true;
    // this.isBook = false;
    // this.isStatus = false;
    // },
    // display2(){
    // this.isUsage = false;
    // this.isBook = true;
    // this.isStatus = false;
    // },
    // display3(){
    // this.isUsage = false;
    // this.isBook = false;
    // this.isStatus = true;
    // },
  },
  computed: {
    paginatedData() {
      const data = this.notices;
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return data.slice(startIndex, endIndex);
    },
  },
  created() {
    //目前是从vuex中读取数据，后期可以从axios中读取数据
    this.notice = this.$store.state.notices;
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
    
    this.MaintainData = this.$store.state.MaintainData;
    this.proData = this.$store.state.proData;
    getNoticeList().then(res=>{
      const data = res.data;
      const sortedData = data.sort((a,b)=>a.noticeId - b.noticeId);
      this.notice = sortedData;
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
  height:1.875rem;
}
.left{
  float:left;
  width:60%;
  height:31.25rem;
  padding-left:3.125rem;
}
.title1 {
  font-size: 3.5rem;
  margin-top: 0.9375rem;
  height: 4.375rem;
  color: rgb(103, 112, 147);
  font-weight:bolder;
}
.box{
  margin-top:1.25rem;
  margin-right:0.625rem;
  border: 0.0625rem solid white;
  border-radius: 0.5rem;
  height:20rem;
  width:30%;
  float:left;
  background-color:white;
  opacity: 0.7;
}

.boxtitle-c{
  height:2.5rem;
  text-align:center;
  font-size:1.35rem;
  margin-top:0.625rem;
}

.boxtitle-e{
  height:3.125rem;
  text-align:center;
  font-size:1.35rem;
}

.text-area {
  border: 0.0625rem solid white;
  border-radius: 0.5rem;
  opacity: 0.8;
  width: 35%;
  margin-right:1.25rem;
  float:left;
  padding: 0.625rem;
  background-color: rgb(255, 253, 253);
}

.title {
  margin-top: 1.25rem;
  font-weight: bolder;
  text-align: center;
  font-size: 1.6rem;
}

.content-area {
  margin: 1.25rem;
  text-indent: 2em;
  line-height: 200%;
  font-size: 1rem;
  font-family: Microsoft YaHei;
  overflow:hidden;
  text-overflow:ellipsis;
  height:18.75rem;
}

.text-more {
  margin-right: 0.625rem;
  margin-bottom: 0.625rem;
  text-align: right;
  font-size: 1.3rem;
  color: aqua;
}

.text-home {
  margin-top: 0rem;
  margin-left: 3.125rem;
  line-height: 3.4375rem;
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
  border: 0rem solid #000000;
  box-shadow: 0 0.125rem 0.25rem rgba(246, 245, 245, 1);
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
  border: 0rem solid #000000;
  border-radius: 0rem;
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
  border: 0rem solid #000000;
  border-radius: 0rem;
  margin: 0 auto;
  font-size: 1rem;
  font-family: w95fa;
}
div /deep/ .margin-top.el-descriptions .el-descriptions__table.is-bordered{
  height:17.5rem;
}
div /deep/ .margin-top.el-descriptions .el-descriptions.is-bordered{
  height:17.5rem;
}
/* div /deep/ .el-descriptions-item__cell.el-descriptions-item__label.is-bordered-label{
  width:6.25rem;
} */

</style>