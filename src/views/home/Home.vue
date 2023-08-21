<template>
  <div class="total">
    <!-- 分割线 -->
    <div style="height=30px">
      <br />
    </div>
    <!-- 公告部分 -->
    <div class="text-area">
      <p class="title">
        {{ this.notice.title }}&nbsp;&nbsp;日期:{{
          this.notice.date | formatDate
        }}
      </p>
      <p class="content-area">{{ this.notice.content }}</p>
      <div class="text-more">
        <router-link to="/notice">
          <a href="">更多</a>
        </router-link>
      </div>
    </div>
    <!-- 设备使用表(目前：写死的) -->
    <div class="table-equ-use">
      <div class="text-home">
        <p>设备使用表</p>
      </div>
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
    <hr style="border: 1px solid white; margin-left: 10px; margin-right: 10px" />
    <!-- 用户个人的预约表(目前：写死的) -->
    <div class="table-book-use">
      <div class="text-home">
        <p>我的预约</p>
      </div>
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
    <hr style="border: 1px solid white; margin-left: 10px; margin-right: 10px" />
    <!-- 所有的设备使用状态表格(目前：写死的) -->
    <div class="table-dch-use">
      <div class="text-home">
        <p>设备使用状态</p>
      </div>
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
    <hr style="border: 1px solid white; margin-left: 10px; margin-right: 10px" />
    <!-- 设备故障处理 -->
    <div class="table-dch-use" v-if="this.$store.state.cu_role === 'admin'">
      <div class="text-home">
        <p>设备维修记录</p>
      </div>
      <el-table
        :data="MaintainData"
        class="table-book"
        border
      >
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
    </div>
  </div>
</template>

<script>
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
  },
  created() {
    //目前是从vuex中读取数据，后期可以从axios中读取数据
    this.notice = this.$store.state.notices[0];
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
  margin: 20px;
  text-indent: 2em;
  font-size: 13px;
}
.text-more {
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