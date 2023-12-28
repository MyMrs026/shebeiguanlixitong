<template>
  <div class="bgpic">
    <div class="main-content">
      <p class="text-title">{{ message }}</p>
      <div class="equ-list-area">
        <ul class="table-equcraft-use">
          <li
            class="equ-item"
            v-for="equipment in paginatedEquInform"
            :key="equipment.equipmentId"
            style="text-align: center;"
          >
            <div class="image-container">
              <img
                v-bind:src="equipment.equipmentImageUrl"
                style="
                  object-fit: contain;
                  width: 100%;
                  height: 100%;
                  float: left;
                  max-height: 200px;
                "
                @click="gotoDeviceDetail(equipment.equipmentId)"
              />
            </div>
            <div v-if="curUsername !== 'guest'">
              <router-link :to="'/book/' + equipment.equipmentId">
                <el-button type="primary" plain size="small"
                  >设备预约</el-button
                >
              </router-link>
              <router-link to="/test">
                <el-button type="primary" plain size="small"
                  >实验记录</el-button
                >
              </router-link>
              <el-button
                @click="openTrainModel(equipment.equipmentId)"
                type="primary"
                plain
                size="small"
                >培训预约
              </el-button>
              <el-button
                type="primary"
                plain
                size="small"
                @click="openNewTab(equipment.equipmentId)"
                >历史记录
              </el-button>
            </div>

            <br />
            设备名称：{{ equipment.equipmentName }}
            <br>
            设备型号：{{ equipment.specificationModel }}
          </li>
        </ul>

        <div class="pagination-container">
          <el-pagination
            :total="equinform.length"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
      <!-- 添加培训弹出框 -->
      <el-dialog
        title="添加培训预约"
        :visible.sync="dialogFormVisible"
        @close="closeDialog"
      >
        <el-form :model="EventForm" ref="EventForm" :rules="rules">
          <el-form-item label="当前设备名" label-width="120px">
            <el-input
              v-model="EventForm.equName"
              style="width: 200px"
              :disabled="true"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="当前用户名" label-width="120px">
            <el-input
              v-model="EventForm.userName"
              style="width: 200px"
              :disabled="true"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="项目" label-width="120px" prop="proid">
            <el-select v-model="EventForm.projectId" placeholder="请选择项目">
              <el-option
                v-for="item in projectList"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="EventForm.experimentContent"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="button-area">
              <el-button type="primary" @click="submitClick('EventForm')"
                >提交</el-button
              >
              <el-button type="danger" @click="cancelClick">取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getEquList, getEquInform } from "../../network/equpment";
import { getProjectList } from "../../network/project";
import { getLoginUserInfo } from "../../network/user";
import { applyTraining } from "../../network/train";
export default {
  data() {
    return {
      equinform: [],
      pageSize: 8,
      currentPage: 1,
      message: "设备工艺展示",
      apiUrl: "http://47.98.160.222:8080/api/file/uploadImage",
      imageUrl: "",
      customHeaders: {
        Authorization: localStorage.getItem("token"),
      },
      value: "", //绑定设备的名称
      dialogFormVisible: false, //添加预约弹窗不可见
      pickerOptions: {
        // 设置日期范围
        disabledDate(time) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          // 禁用过去的日期
          if (time.getTime() < today.getTime()) {
            return true;
          }
        },
      },
      EventForm: {
        equName: "",
        trainingId: "",
        userName: "",
        experimentContent:"",
        userId: "",
        projectId: "",
        date: "",
        startTime: "",
        endTime: "",
      },
      formatEvent: {},
      projectList: [],
      rules: {
        date: [{ required: true, message: "请选择日期", trigger: "blur" }],
        startTime: [
          { required: true, message: "请填写事件的开始事件", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "请填写事件的结束事件", trigger: "blur" },
        ],
      },
      curUsername: "",
    };
  },
  methods: {
    gotoDeviceDetail(index) {
      this.$router.push({ path: `/device/${index}` });
    },
    //其实是日期和具体时间的拼接罢了
    formatDateTime(date, time) {
      const eventDate = new Date(date);

      // 解析时间
      const [hours, minutes] = time.split(":");
      eventDate.setHours(parseInt(hours));
      eventDate.setMinutes(parseInt(minutes));

      // 格式化日期时间
      const inputDate = eventDate;

      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要加1
      const day = String(inputDate.getDate()).padStart(2, "0");
      const hour = String(inputDate.getHours()).padStart(2, "0");
      const minute = String(inputDate.getMinutes()).padStart(2, "0");
      const seconds = String(inputDate.getSeconds()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;

      return formattedDate;
    },
    // 格式化日期
    formattedDate(date) {
      // 将字符串解析为Date对象
      const originalDate = new Date(date);

      // 获取年、月、日、时、分、秒
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");
      const hours = String(originalDate.getHours()).padStart(2, "0");
      const minutes = String(originalDate.getMinutes()).padStart(2, "0");
      const seconds = String(originalDate.getSeconds()).padStart(2, "0");

      // 拼接格式化后的日期字符串
      date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      return date;
    },
    resetForm(equCraftForm) {
      this.$refs[equCraftForm].resetFields();
    },
    //查看历史实验记录
    openNewTab(id) {
      // 获取当前路由路径
      const currentRoute = this.$route.fullPath;
      // 拼接新页面的路由路径
      const newTabRoute = "/searchRecords";
      if (currentRoute !== newTabRoute) {
        // 在新标签页中打开新页面
        // window.open(`${newTabRoute}?equId=${id}&userName=${userName}`, "_blank");
        window.open(`${newTabRoute}?equId=${id}`, "_blank");
        // 在原页面保持路由不变
        this.$router.replace({
          path: currentRoute,
          query: {
            equId,
          },
        });
      }
    },
    //培训预约弹窗
    openTrainModel(id) {
      getEquInform(id).then((res) => {
        console.log(res.data);
        this.EventForm.equName = res.data.equipmentName;
        this.EventForm.trainingId = res.data.equipmentId;
      });
      this.dialogFormVisible = true;
    },
    //关闭对话框
    closeDialog() {
      this.dialogFormVisible = false;
    },
    //弹窗提交按钮实现
    submitClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formatEvent = {
            applicationStatus: 0,
            createTime: this.formattedDate(new Date()),
            endTime: this.formatDateTime(
              this.EventForm.date,
              this.EventForm.endTime
            ),
            startTime: this.formatDateTime(
              this.EventForm.date,
              this.EventForm.startTime
            ),
            trainingApplicationId: 0,
            updateTime: this.formattedDate(new Date()),
            trainingId: this.EventForm.trainingId,
            userId: this.EventForm.userId,
          };
          console.log(this.formatEvent);
          applyTraining(
            this.formatEvent.applicationStatus,
            this.formatEvent.createTime,
            this.formatEvent.endTime,
            this.formatEvent.startTime,
            this.formatEvent.trainingApplicationId,
            this.formatEvent.updateTime,
            this.formatEvent.trainingId,
            this.formatEvent.userId
          ).then((res) => {
            console.log(res);
          });
        } else {
          alert("请填写完整");
        }
      });
    },
    //弹窗中的取消按钮实现
    cancelClick() {
      this.dialogFormVisible = false;
      console.log("取消申请");
    },
    // 处理页码变化
    handleCurrentChange(page) {
      this.currentPage = page;
    },
  },
  computed: {
    // 根据当前页计算分页后的设备数据
    paginatedEquInform() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.equinform.slice(startIndex, endIndex);
    },
  },
  created() {
    //获取项目列表
    getProjectList().then((res) => {
      this.projectList = res.data.map((item) => {
        return {
          projectId: item.projectId,
          projectName: item.projectName,
        };
      });
    });

    // 获取登录用户信息
    getLoginUserInfo().then((res) => {
      // console.log(res.data);
      this.EventForm.userName = res.data.username;
      this.curUsername = res.data.username;
      this.EventForm.userId = res.data.userId;
      console.log(this.curUsername);
    });
  },
  mounted() {
    getEquList().then((res) => {
      this.equinform = res.data;
      console.log(this.equinform);
    });
  },
  watch: {
    $route() {
      location.reload();
    },
  },
};
</script>
<style scope>
.bgpic {
  display: flex;
  flex-direction: row;
  overflow: auto;
  /* background-image: url("../../assets/img/qqq6.png"); */
  background-repeat: no-repeat;
  width: 100%;
  background-size: 100% 100%;
}
.equ-buttons {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 30px;
}

.button-area {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 10px;
}

.text-title {
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  margin-left: 50px;
  line-height: 55px;
  font-size: 20px;
  width: 30%;
}

.table-equcraft-use {
  display: flex;
  flex-direction: row;
  /* align-items: center;
  justify-content: flex-start; */
  flex-wrap: wrap;
  margin-left: 50px;
  /* margin-right:50px; */
  /* gap:40px; */
}
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px; /* 调整上边距以适应您的布局 */
}

.equ-item {
  flex: 0 0 calc(25% - 20px);
  /* 让每个元素占据1/3的宽度，减去一些间距 */
  margin-right: 20px;
  /* 可以根据需要添加间距 */
  margin-bottom: 20px;
  /* 用于在垂直方向上添加间距 */
  box-sizing: border-box;
  /* 确保元素的边框和内边距不会使它们超出指定的宽度 */
  background-color: white;
  /* 设置背景颜色为白色 */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  /* 添加阴影效果 */
  padding: 10px;
  /* 可以根据需要调整内边距 */
  border-radius: 10px;
  /* 添加圆角效果，可以根据需要调整 */
  /* 添加其他样式，例如边框 */
  border: 1px solid #ccc;
  /* 添加边框 */
  list-style: none;
  padding-bottom: 30px;
}

.el-button + .el-button,
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px !important;
}

.equ-item + .equ-item {
  border-color: transparent;
  /* 隐藏相邻部分之间的边框 */
}

.table-equcraft {
  width: auto;
  height: auto;
  /* border: 1px solid #fff; */
  /* box-shadow: 1px 1px 1px #fff; */
  margin: 0 auto;
  font-size: 1rem;
  font-family: w95fa;
}

.p-device {
  width: 40%;
  float: left;
  height: 400px;
  margin-left: 50px;
  margin-right: 50px;
}

.form-equcraft-use {
  width: 40%;
  float: left;
  margin-left: 50px;
}

.form-equcraft {
  margin-left: 50px;
}

.form-equcraft label {
  font-size: 1rem;
  font-family: w95fa;
  color: rgb(50, 49, 49);
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

div /deep/ .el-card.is-always-shadow {
  width: 50%;
}

.image-container {
  width: 100%;
  /* 设置容器宽度 */
  max-height: 200px;
  /* 设置最大高度，控制图片的高度 */
  background-color: white;
  /* 设置占位背景颜色为白色 */

  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  width: 50%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.pagination {
  padding-left: 80px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
