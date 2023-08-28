<template>
  <div class="total">
    <!-- 分割线 -->
    <div style="height=30px">
      <br />
    </div>
    <!-- 公告部分 -->
    <div class="text-area">
      <p class="title">
        {{ this.notice.title }}<br />日期:{{ this.notice.date | formatDate }}
      </p>
      <p class="content-area">{{ this.notice.content }}</p>
      <div class="text-more">
        <router-link to="/notice">
          <p>更多>>></p>
        </router-link>
      </div>
    </div>
    <div class="text-home">
      <p>设备使用情况</p>
    </div>
    <!-- 设备使用表(目前：写死的) -->
    <div class="table-equ-use">
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
    <hr
      style="border: 1px solid white; margin-left: 10px; margin-right: 10px"
    />
    <div class="text-home">
      <p>我的预约</p>
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
    <hr
      style="border: 1px solid white; margin-left: 10px; margin-right: 10px"
    />
    <div class="text-home">
      <p>设备使用状态</p>
    </div>
    <!-- 所有的设备使用状态表格(目前：写死的) -->
    <div class="table-dch-use">
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
    <hr
      style="border: 1px solid white; margin-left: 10px; margin-right: 10px"
    />
    <!-- 设备故障处理 -->
    <div class="text-home">
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
  display: flex;
  flex-direction: column;
}

.text-area {
  opacity: 0.8;
  width: 96%;
  margin: 0 auto;
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
  margin-left: 30px;
  line-height: 55px;
  font-size: 20px;
  color: aliceblue;
  background-image: url("../../assets/img/s-titlebg.png");
  background-repeat: no-repeat;
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
  background: rgb(230, 171, 171);
}

.el-table .yellow-row {
  background: rgb(223, 220, 166);
}

.el-table .gray-row {
  background: rgb(206, 204, 204);
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