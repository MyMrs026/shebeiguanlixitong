<template>
  <div class="outer-container" ref="scrollArea" @wheel="handleScroll">
    <div class="total">
      <!-- 分割线 -->
      
      <!-- <div style="height:1.875rem;" class="first">
        <br />
      </div> -->
      <!-- 标题+图标 -->
      <section style="width: 90%; margin-left: 5%;">
        <div class="border-style" style="min-width: 1700px;height: 480px;">
          <section style="width: 47%;float: left;height: 80%;margin: 0 0 0 2%;">
            <h1 class="title">实验室图片</h1>
            <img
                src="../../assets/img/home1.jpg"
                style="
                  height: 100%;
                  width: 100%;
                  text-align: center;
                  object-fit: contain;
                  background-color: #fff;
                  border-radius: 0 0 20px 20px;
                "
              />
          </section>

          <section style="width: 47%;float: left;height: 80%;margin: 0 2% 0 2%;">
              <h1 class="title">微纳加工平台</h1>
              <div class="page">
                <p>微纳加工平台主攻光/电芯片的异质异构集成以及多材料体系的超精细加工。</p>
                <p>微纳加工平台总面积641.78m²，其中百级区182.42m²，千级区368.67m²，湿法工作区26.48m²，灰区36.5m²。</p>
                <p>加工平台管理网站旨在为您提供正确的设备建议，并为您的微纳米制造工艺以及芯片检测工作提供一个良好的起点。</p>
               <p>如果您需要有关某些仪器或流程的更多信息，请联系相关人员。欢迎您对微纳加工平台管理网站提供任何反馈或意见。</p>
              </div>
              
          </section>
        </div>

        <!-- 此处为通知公告栏 -->
        <div class="border-style" style="min-width: 1700px;margin: 0;height: 400px;">
          <section style="width: 62%;float: left;height: 100%;margin: 0 1% 0 2%">
              <h1 class="title" style="text-align: left;">通知公告</h1>
              <ul class="page" style="height: 75%;">
                <ol>
                  <time style="font-size: 25px;">{{ latestNotice.createTime | formatDate }}</time>
                  <a href="/notice" style="font-size: 25px;">{{ latestNotice.content}}</a>
                </ol>
                <li>
                  <time datetime="">2023-11-11</time>
                  <a href="">第二条公告</a>
                </li>
                <li>
                  <time datetime="">2023-11-11</time>
                  <a href="">第三条通告</a>
                </li>
                <li>
                  <time datetime="">2023-11-11</time>
                  <a href="">第四条通告</a>
                </li>
                <li>
                  <time datetime="">2023-11-11</time>
                  <a href="">第五条通告</a>
                </li>
                <li>
                  <time datetime="">2023-11-11</time>
                  <a href="">第六条通告</a>
                </li>
              </ul>
          </section>

          <section style="width: 32%;float: left;height: 100%;margin: 0 2% 0 1%">
            <h1 class="title" style="text-align: left;">导航</h1>
            <ul class="page" style="height: 75%;">
              <li class="nvi" style="background-color: rgb(7, 80, 175);">
                <router-link to="/project">
                  <p>项目管理</p>
                </router-link>
              </li>
              <li class="nvi" style="background-color: rgb(63, 184, 48);">
                <router-link to="/equPage">
                  <p>设备管理</p>
                </router-link>
              </li>
              <li class="nvi" style="background-color: rgb(228, 200, 41);">
                <router-link to="/craft">
                  <p>工艺管理</p>
                </router-link>
              </li>
              <li class="nvi" style="background-color: rgb(22, 150, 107);">
                <router-link to="/mall">
                  <p>商城</p>
                </router-link>
              </li>
            </ul>
          </section>
        </div>

        <!--设备使用情况-->
        <div class="border-style" v-if="curUsername !== 'guest'" style="min-width: 1700px;margin: 0;">
          <section style="width: 96%;float: left; margin-left: 2%;" :max-height="tableHeight">
            <h1 class="title">设备使用情况</h1>
            <div class="page">
          <el-table
            border
            :data="equpsUse"
            class="table-equ"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="equp" label="设备名" min-width="200" align="center">
            </el-table-column>
            <el-table-column prop="status" label="使用情况" min-width="110" align="center">
            </el-table-column>
            <el-table-column prop="user" label="使用用户" min-width="110" align="center">
            </el-table-column>
            <el-table-column prop="org" label="使用组织" min-width="265" align="center">
            </el-table-column>
            <el-table-column prop="starttime" label="开始时间" min-width="190" align="center">
            </el-table-column>
            <el-table-column prop="endtime" label="结束时间" min-width="190" align="center">
            </el-table-column>
          </el-table>
        </div>
          </section>
        </div>

        <!--我的预约-->
        <div class="border-style" v-if="curUsername !== 'guest'" style="min-width: 1700px;margin: 0;">
          <section style="width: 96%;float: left;margin-left: 2%;" :max-height="tableHeight">
          <h1 class="title">我的预约</h1>
          <div class="page">
          <el-table :data="orderEvents" class="table-book">
            <el-table-column prop="equName" label="设备名" min-width="15%" align="center">
            </el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="15%" align="center">
            </el-table-column>
            <el-table-column prop="start" label="开始时间" min-width="20%" align="center">
            </el-table-column>
            <el-table-column prop="end" label="结束时间" min-width="20%" align="center">
            </el-table-column>
            <el-table-column prop="operate" label="修改预约" min-width="15%" align="center">
              <template slot-scope="scope">
                <router-link :to="'/book/' + scope.row.equId">
                  <el-button type="info">修改预约</el-button>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="operate" label="开始实验" min-width="15%" align="center">
              <template slot-scope="scope">
                <el-button
                  type="info"
                  @click="handleStartExperimentClick(scope.row)"
                  >开始实验</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        </section>
        </div>
      
      <div class="border-style" style="min-width: 1700px;margin: 0;">
        <section style="width: 96%;float: left;margin-left: 2%;">
          <h1 class="title">超净室平面图</h1>
          <img
            src="../../assets/img/超净室.jpg"
            style="height: 100%; width: 100%; text-align: center"
          />
        </section>
      </div>

      <!-- <div> -->
        <!-- <div class="text-home">
          <p id="dch-use">设备使用状态</p>
        </div> -->
        <!-- 所有的设备使用状态表格(目前：写死的) -->
        <!-- <div class="table-dch-use">
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
        </div> -->
        <!-- <div class="text-home">
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
        </div> -->
      <!-- </div> -->
    </section>
    </div>
  </div>
</template>

<script>
import { getNoticeList, getLatest } from "../../network/notice";
import { getEquInform } from "../../network/equpment";
import { getOrders } from "../../network/book";
import { getUserInform,getLoginUserInfo } from "../../network/user";
import { formatDateToISOString } from "../../common/formatDateToISOString";

export default {
  data() {
    return {
      //设备使用表数据
      equpsUse: [] ,
      //用户个人设备预约表数据
      myBooks: [],
      //设备使用状态表数据
      equpsStatus: [],
      notice: [], //公告信息，用来接收从axios传过来的公告信息
      MaintainData: [], //设备维保记录
      size: "",
      notice_content: "",
      notices: [],
      latestNotice: {},
      originEvents: [], //从数据库读出来的数据在这存放
      orderEvents: [], //将数据库中读出来的事件调整后的格式放到这个数组下,此数组存放是当前登录用户的所有预约记录
      curUsername: "", // 当前登录用户的名字

      currentPage: 1,
      totalPages: 2, // 假设有三页内容
      lastScrollTime: 0,
      scrolling: false,
    };
   tableHeight:0
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

    handleStartExperimentClick(row) {
      // 处理开始实验按钮点击事件
      // console.log(row);
      const userName = row.userName;
      const equName = row.equName;
      const equId = row.equId;
      const equipmentOrderId = row.equipmentOrderId;
      const projectId = row.projectId;
      // console.log("用户为:"+userName+"所选择行的设备为:"+equName+"预约id为:"+equipmentOrderId);
      // 在这里可以根据需要处理点击按钮的信息
      // 例如：跳转到开始实验页面
      this.$router.push({
        path: "/addRecords",
        query: {
          userName,
          equName,
          equId,
          equipmentOrderId,
          projectId,
        },
      });
    },
    //根据id获取设备名
    async loadEquInform(id) {
      try {
        const res = await getEquInform(id);
        const equName = res.data.equipmentName.toString();
        // console.log(equName);
        return equName;
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },

    //根据id获取用户名
    async loadUserInform(id) {
      try {
        const res = await getUserInform(id);
        const userName = res.data.username.toString();
        // console.log(userName);
        return userName;
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },

    //根据目前登录用户信息获取预约记录
    async loadOrderData() {
      try {
        const res = await getOrders();
        this.originEvents = res.data;
        console.log(this.originEvents);
        this.orderEvents = await Promise.all(
          this.originEvents.map(async (item) => {
            const equName = await this.loadEquInform(item.equipmentId);
            const userName = await this.loadUserInform(item.userId);
            this.curUsername = userName;
            return {
              equipmentOrderId: item.equipmentOrderId,
              equId: item.equipmentId,
              projectId: item.projectId,
              equName: equName,
              userName: userName,
              start: formatDateToISOString(item.startTime).slice(0, -5),
              end: formatDateToISOString(item.endTime).slice(0, -5),
            };
          })
        );
        console.log(this.orderEvents);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },

    // 翻页功能实现
    handleScroll(event) {
      if (!this.scrolling) {
        this.scrolling = true;
        requestAnimationFrame(() => {
          if (event.deltaY > 0 && this.currentPage < this.totalPages) {
            this.currentPage++;
          } else if (event.deltaY < 0 && this.currentPage > 1) {
            this.currentPage--;
          }
          this.scrolling = false;
        });
      }
    },
  },
  created() {
    getNoticeList().then((res) => {
      this.notices = res.data;
    });
    getLatest().then((res) => {
      this.latestNotice = res.data;
    });
    this.loadOrderData();

    getLoginUserInfo().then(res=>{
      console.log(res.data);
      this.curUsername = res.data.username;
      console.log(this.curUsername);
    })
  },
  filters: {
    //处理日期的显示格式问题，使日期以xxxx年xx月xx日的形式显示
    formatDate: function (value) {
      return new Date(value).toLocaleDateString();
    },
  },
};
</script>

<style>


.nvi{
  width: 90%;
  list-style-type: none;
  height: 50px;
  margin-bottom: 15px;
  border-radius: 10px;
}

.nvi a{
  width: 100%;
  height: 100%;
}

.nvi p{
  text-align: center;
  line-height: 200%;
  color: #fff;
  font-size: 25px;
}

.border-style{
  margin-top: 5px;
  display: block;
  height:100%; 
  width: 100%;
  min-height: 100px;
}

ul{
  padding: 0;
}

time{
  float: right;
  font-size: 20px;
  padding-right: 5%;
}

ol{
  height: 40px;
}

li{
  margin-top: 1%;
  margin-left: 5%;
}


.title{
  margin: 0 0 0 0;
  font-size: 12px;
  line-height: 50px;
  color: #fff;
  font-weight: normal;
  background-color: #4a8ae2;
  padding: 6px 15px;
  border-radius: 20px 20px 0 0 ;
}

p{
  margin-bottom: 8px;
  width: 80%;
  margin-left: 10%;
}
.page{
  height: 100%;
  font-size: 22px;
  color: #666;
  background-color: #fff;
  -webkit-text-size-adjust: none;
  padding-top: 20px;
  border-radius: 0 0 20px 20px;
}

.intro-area {
  display: flex;
  flex-direction: row;
  margin-top: 2.5rem;
  margin-bottom: 3rem;
  height: 20rem;
  width: 100%;
  font-size: 1.2rem;
  letter-spacing: 0.3125rem;
  text-align: left;
}

.intro-pic {
  display: flex;
  height: 70%;
  width: 70%;
  justify-content: center;
  align-items: center;
}

.intro-text {
  width: 100%;
  font-size: 1.05rem;
}

.bullet {
  color: black;
  /* 设置圆点颜色为黑色 */
}

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
  padding-left: 5rem;
  padding-right: 5rem;
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
  margin-left: 1rem;
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
  font-weight: bold;
  font-size: 20px;
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
  border: 0rem solid #e9eefe;
  border-radius: 0rem;
  margin: 0 auto;
  font-size: 20px;
  font-weight: bold;
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
  border: 0rem solid #ccc;
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

