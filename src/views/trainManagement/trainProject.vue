<template>
  <div>
    <el-row>
      <!-- 第一个 div 的内容 -->
      <el-col :span="12">
        <div class="left-div">
          <div class="book-title">
            <p>设备预约日视图</p>
          </div>
          <!-- <div>
            <el-date-picker
              v-model="value1"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div> -->
          <div class="schedular-area">
            <p style="margin: 10px">当前用户:{{ this.$store.state.cu_role }}</p>
            <Schedular class="Schedular" :events="events" />
          </div>
        </div>
      </el-col>
      <!-- 第二个 div 的内容 -->
      <el-col :span="12">
        <div class="right-div">
          <div class="form-area" v-if="this.$store.state.cu_role === 'admin'">
            <el-form
              class="train-form"
              label-width="80px"
              :model="trainForm"
              ref="trainForm"
              :rules="rules"
            >
              <el-form-item label="培训名称" prop="trainName">
                <!-- <el-input v-model="trainForm.trainName" style="width: 300px">
                </el-input> -->
                <el-select
                  v-model="trainForm.trainName"
                  placeholder="请选择培训名称"
                >
                  <el-option
                    v-for="item in trainProName"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="培训费用" prop="cost">
                <el-input v-model="trainForm.cost" style="width: 80px">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" plain @click="submitForm('trainForm')"
                  >提交</el-button
                >
                <el-button @click="resetForm('trainForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="this.$store.state.cu_role === 'staff'">
            <h3>申请参加培训</h3>
            <el-select
              v-model="trainProject_value"
              placeholder="请选择培训名称"
            >
              <el-option
                v-for="item in trainProName"
                :key="item.key"
                :label="item.label"
                :value="item.key"
              >
              </el-option>
            </el-select>
            <el-input
              v-model="trainNumber"
              type="number"
              style="width: 100px"
            ></el-input>

            <div class="eqp-select">
              <el-table
                ref="multipleTable"
                :data="pageData"
                tooltip-effect="dark"
                style="width: 500px"
                @row-click="handleRowClick"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="equipmentName" label="设备名" width="200">
                </el-table-column>
                <el-table-column prop="placementLocation" label="设备地点" width="120">
                </el-table-column>
                <el-table-column prop="labName" label="实验室名字" width="120">
                </el-table-column>
              </el-table>

              <el-pagination style="margin-left:320px;margin-top:10px"
                @size-change="handlePageSizeChange"
                @current-change="handleCurrentPageChange"
                :current-page="currentPage"
                :page-sizes="[5]"
                :page-size="pageSize"
                layout="pager"
                :total="equlist.length"
              >
              </el-pagination> 

              <div style="margin-top: 20px">
                <el-button @click="toggleSelection()">取消选择</el-button>
              </div>
            </div>

            <el-button plain @click="buttonApply">申请</el-button>
            <div>培训费用共计:{{ this.trainCost }}元</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Schedular from "../../components/common/schedular/Schedular";
import { getTrainList, addProjectTrain } from "../../network/train";
import { getEquList } from "../../network/equpment";
import { INITIAL_EVENTS5 } from "../../common/event-utils";
export default {
  components: {
    Schedular,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      events: INITIAL_EVENTS5,
      value1: "",
      value2: "new Date(2016, 9, 10, 18, 40)",
      value3: "new Date(2016, 9, 10, 18, 40)",
      value4: "new Date(2016, 9, 10, 18, 40)",
      dialogVisible: false,
      form: {
        recipient: "",
        subject: "",
        content: "",
      },
      isShow1: true,
      isShow2: true,
      isShow3: true,
      equp_value: "",
      trainForm: {
        // devicename: "",
        // iid: "",
        trainName: "",
        cost: 0,
      },
      device_options: [
        {
          value: "选项1",
          label: "ASE",
        },
        {
          value: "选项2",
          label: "ASF",
        },
        {
          value: "选项3",
          label: "ASG",
        },
        {
          value: "选项4",
          label: "ASP",
        },
      ],
      // trainProName: [],
      trainData: [],
      fileList: [],
      equlist: [],
      imageUrl: "", // 用于保存上传文件的地址
      devicename: "",
      trainProject_value: "",
      rules: {
        trainName: [
          { required: true, message: "请填写培训的名称", trigger: "blur" },
        ],
        cost: [
          { required: true, message: "请填写培训的费用", trigger: "blur" },
          {
            validator: this.validateNumber,
            trigger: "blur",
          },
        ],
        // docUrl: [
        //   { required: true, message: "请填写培训的内容", trigger: "blur" },
        // ],
        // trainDuration: [
        //   { required: true, message: "请填写培训的持续时间", trigger: "blur" },
        // ],
      },
      trainProName: [
        { key: 0, label: "安全培训(120元/人)", cost: 120 },
        { key: 1, label: "设备培训(120元/人)", cost: 120 },
      ],
      trainNumber: 1,
      trainCost: 0,
      currentPage:1,
      pageSize:3,
    };
  },
  computed: {
    buttonText1() {
      return this.isShow1 ? "隐藏" : "显示";
    },
    buttonText2() {
      return this.isShow2 ? "隐藏" : "显示";
    },
    buttonText3() {
      return this.isShow3 ? "隐藏" : "显示";
    },
    pageData() { //搜索得到的数据
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.equlist.slice(startIndex, endIndex)
    },
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 文件上传成功时的钩子
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(file);
    },
    handleChange(val) {
      console.log(val);
    },
    sendEmail() {
      const mailtoLink = `mailto:${this.recipient}?subject=${encodeURIComponent(
        this.subject
      )}&body=${encodeURIComponent(this.content)}`;
      window.location.href = mailtoLink;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //成功提交
          console.log("提交成功");
          console.log(this.trainForm);
          addProjectTrain(
            this.trainForm.docUrl,
            this.trainForm.trainDuration,
            this.trainForm.trainIntroduction,
            this.trainForm.trainName
          )
            .then((res) => {
              //处理返回的响应数据
              const data = res.data;
              console.log(data);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          alert("请填写完整");
          // console.log(this.trainForm);
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    validateNumber(rule, value, callback) {
      if (value === null || value === "") {
        callback(new Error("请输入数字"));
      } else if (isNaN(value) || value <= 0) {
        callback(new Error("必须为大于零的数字"));
      } else {
        callback();
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    buttonApply() {
      if (this.trainProject_value === "" || this.trainNumber === "") {
        this.$alert("请填写完整", "提示", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      } else if (this.trainNumber < 1) {
        this.$alert("人数不能少于1个人", "提示", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      } else {
        // console.log(this.trainProName[this.trainProject_value].cost);
        this.trainCost =
          this.trainNumber * this.trainProName[this.trainProject_value].cost;
        console.log(this.trainCost);
      }
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    handleRowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handlePageSizeChange(pageSize) { //part1翻页功能
      this.pageSize = pageSize
    },
    handleCurrentPageChange(currentPage) { //part1当前页码显示切换
      this.currentPage = currentPage
    },
  },
  created() {
    // getTrainList().then(res =>{
    //   this.trainData = res.data;
    //   // console.log(res.data);
    //   this.trainData.forEach(obj => {
    //     const { trainName,trainId } = obj;
    //     this.trainProName.push({trainName,trainId});
    //   });
    //   console.log(this.trainProName);
    // })
    getEquList().then(res => {
      this.equlist = res.data;
      // console.log(this.equlist);
    });
  },
};
</script>
<style scope>
.book-title {
  color: #595959;
}
.Schedular {
  height: 100vh;
  color: #393939;
  font-size: 15px;
  overflow: auto;
}
.schedular-area {
  color: #5e5e5e;
}
.left-div {
  margin-left: 50px;
}
</style>