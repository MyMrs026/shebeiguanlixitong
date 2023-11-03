<template>
  <div class="outer-container">
    <div class="total">
      <!-- 分割线 -->

      <div style="height=1.875rem" class="first">
        <br />
      </div>
      <!-- 标题+图标 -->
      <div style="height: 35rem">
        <div class="left">
          <div class="title1">微纳加工平台</div>
          <router-link to="/notice">
            <el-tooltip
              class="item"
              effect="dark"
              content="点击查看更多"
              placement="right"
            >
              <div>
                最新通知：{{ latestNotice.content
                }}{{ latestNotice.createTime | formatDate }}
              </div>
            </el-tooltip>
          </router-link>
          <div
            class="menu-icon"
            style="
              margin-top: 2.5rem;
              margin-bottom: 3rem;
              height: 20rem;
              font-size: 1.2rem;
              letter-spacing: 0.3125rem;
              text-align: left;
            "
          >
            微纳加工平台主攻光/电芯片的异质异构集成以及多材料体系的超精细加工。<br />
            <br />
            微纳加工平台总面积641.78m²，其中百级区182.42m²，千级区368.67m²，湿法工作区26.48m²，灰区36.5
            m²。<br />
            <br />
            加工平台管理网站旨在为您提供正确的设备建议，并为您的微纳米制造工艺以及芯片检测工作提供一个良好的起点。<br />
            如果您需要有关某些仪器或流程的更多信息，请联系相关人员。欢迎您对微纳加工平台管理网站提供任何反馈或意见。
          </div>
        </div>
      </div>

      <div class="text-home">
        <p id="equ-use">设备使用情况</p>
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
      <div class="text-home">
        <p id="book-use">我的预约</p>
      </div>
      <!-- 用户个人的预约表(目前：写死的) -->
      <div class="table-book-use">
        <el-table :data="myBooks" class="table-book">
          <el-table-column prop="equp" label="设备" width="140">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="110">
          </el-table-column>
          <el-table-column prop="user" label="用户/操作人员" width="140">
          </el-table-column>
          <el-table-column prop="start" label="开始" width="140">
          </el-table-column>
          <el-table-column prop="end" label="结束" width="140">
          </el-table-column>
          <el-table-column prop="cal" label="规划方式" width="125">
          </el-table-column>
          <el-table-column prop="action" label="动作" width="115">
          </el-table-column>
          <el-table-column prop="operate" label="快捷操作" width="125">
            <router-link to="/test">
              <el-button type="info">立即测试</el-button>
            </router-link>
          </el-table-column>
        </el-table>
      </div>
      <div class="text-home">
        <p id="dch-use">设备使用状态</p>
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
      <div class="text-home">
        <p id="lab-map" style="margin-top: 8rem">超净室平面图</p>
      </div>
      <div
        style="
          display: flex;
          height: 100%;
          justify-content: center;
          align-items: center;
        "
      >
        <img
          src="../../assets/img/超净室.jpg"
          style="height: 100%; width: 80%; text-align: center"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getNoticeList, getLatest } from "../../network/notice";
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

      size: "",
      notice_content: "",
      notices: [],
      latestNotice: {}
      // currentPage: 1,
      // perPage: 5,
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
    }
  },
  computed: {
    // paginatedData() {
    //   const data = this.notices;
    //   const startIndex = (this.currentPage - 1) * this.perPage;
    //   const endIndex = startIndex + this.perPage;
    //   return data.slice(startIndex, endIndex);
    // },
  },
  created() {
    //目前是从vuex中读取数据，后期可以从axios中读取数据
    // this.equpsUse = this.$store.state.equpsUse;
    // this.myBooks = this.$store.state.myBooks;
    // this.equpsStatus = this.$store.state.equpsStatus;
    getNoticeList().then(res => {
      this.notices = res.data;
    });
    getLatest().then(res => {
      this.latestNotice = res.data;
    });
  },
  filters: {
    //处理日期的显示格式问题，使日期以xxxx年xx月xx日的形式显示
    formatDate: function(value) {
      return new Date(value).toLocaleDateString();
    }
  },
  mounted() {}
};
</script>

<style>
.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.total {
  /* background-image: url("../../assets/img/qqq6.png"); */
  width: 100%;
  margin-bottom: 2rem;
  height: 100%;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
}
.first {
  height: 1.875rem;
}
.left {
  text-align: center;
  height: 45rem;
  padding-left: 10rem;
  padding-right: 10rem;
}
.title1 {
  font-size: 3.5rem;
  margin-top: 0.9375rem;
  margin-bottom: 3rem;
  height: 4.375rem;
  color: rgb(103, 112, 147);
  font-weight: bolder;
  text-align: center;
}
.box {
  margin-top: 1.25rem;
  margin-right: 0.625rem;
  border: 0.0625rem solid white;
  border-radius: 0.5rem;
  height: 20rem;
  width: 30%;
  float: left;
  background-color: white;
  opacity: 0.7;
}

.boxtitle-c {
  height: 2.5rem;
  text-align: center;
  font-size: 1.35rem;
  margin-top: 0.625rem;
}

.boxtitle-e {
  height: 3.125rem;
  text-align: center;
  font-size: 1.35rem;
}

.text-area {
  border: 0.0625rem solid white;
  border-radius: 0.5rem;
  opacity: 0.8;
  width: 35%;
  margin-right: 1.25rem;
  float: left;
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
  overflow: hidden;
  text-overflow: ellipsis;
  height: 18.75rem;
}

.text-more {
  margin-right: 0.625rem;
  margin-bottom: 0.625rem;
  text-align: right;
  font-size: 1.3rem;
  color: aqua;
}

.text-home {
  margin-left: 16rem;
  margin-top: 0rem;
  padding-left: 3.125rem;
  line-height: 3.4375rem;
  font-size: 1.5rem;
  color: rgb(103, 102, 102);
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
  padding-left: 5px;
  padding-bottom: 30px;
}

.table-book {
  width: auto;
  height: auto;
  border: 0rem solid #e9eefe;
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
  border: 0rem solid ccc;
  border-radius: 0rem;
  margin: 0 auto;
  font-size: 1rem;
  font-family: w95fa;
}
div /deep/ .margin-top.el-descriptions .el-descriptions__table.is-bordered {
  height: 17.5rem;
}
div /deep/ .margin-top.el-descriptions .el-descriptions.is-bordered {
  height: 17.5rem;
}
</style>
