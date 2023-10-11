<template>
  <div>
    <el-row>
      <!-- 第一个 div 的内容 -->
      <el-col :span="12">
        <div class="left-div">
          <div class="book-title">
            <p>设备预约日视图</p>
          </div>
          <div>
            <el-date-picker
              v-model="value1"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
          <div class="button-area">
            <el-button plain @click="hideClick1">{{ buttonText1 }}</el-button>
          </div>
          <div class="schedular-area" v-if="isShow1">
            <p style="margin: 10px">当前用户:{{ this.$store.state.cu_role }}</p>
            <Schedular class="Schedular" :events="events"/>
          </div>
        </div>
      </el-col>
      <!-- 第二个 div 的内容 -->
      <el-col :span="12">
        <div class="right-div">
          <div class="form-area" v-if="this.$store.state.cu_role === 'admin'">
            <el-form class="train-form" label-width="80px" :model="trainForm" ref="trainForm" :rules="rules">
              <el-form-item label="培训名称" prop="trainName">
                <el-input v-model="trainForm.trainName" style="width: 300px">
                </el-input>
              </el-form-item>
              <el-form-item label="培训介绍" prop="trainIntroduction">
                <el-input
                  v-model="trainForm.trainIntroduction"
                  style="width: 300px"
                >
                </el-input>
              </el-form-item>

              <el-form-item label="培训内容" prop="docUrl">
                <el-input
                  v-model="trainForm.docUrl"
                  style="width: 300px"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="持续时间" prop="trainDuration">
                <el-input
                  v-model="trainForm.trainDuration"
                  style="width: 300px"
                >
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" plain @click="submitForm('trainForm')">提交</el-button>
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
                :key="item.trainId"
                :label="item.trainName"
                :value="item.trainId"
              >
              </el-option>
            </el-select>
            <el-button plain @click="buttonApply">申请</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Schedular from "../../components/common/schedular/Schedular";
import { getTrainList, addProjectTrain } from '../../network/train'
import { getEquList } from '../../network/equpment'
import { INITIAL_EVENTS4 } from  '../../common/event-utils'
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
      events: INITIAL_EVENTS4,
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
        trainIntroduction: "",
        docUrl: "",
        trainDuration: "",
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
      trainProName: [],
      trainData: [],
      fileList: [],
      equlist: [],
      imageUrl: "", // 用于保存上传文件的地址
      devicename: "",
      trainProject_value: "",
      rules: {
        trainName: [
          { required: true, message: '请填写培训的名称', trigger: 'blur' }
        ],
        trainIntroduction: [
          { required: true, message: '请填写培训的介绍', trigger: 'blur' }
        ],
        docUrl: [
          { required: true, message: '请填写培训的内容', trigger: 'blur' }
        ],
        trainDuration: [
          { required: true, message: '请填写培训的持续时间', trigger: 'blur' }
        ]
      }
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
  },
  methods: {
    hideClick1() {
      this.isShow1 = !this.isShow1;
    },
    hideClick2() {
      this.isShow2 = !this.isShow2;
    },
    hideClick3() {
      this.isShow3 = !this.isShow3;
    },
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
        if(valid) {
          //成功提交
          console.log("提交成功");
          console.log(this.trainForm);
          addProjectTrain(this.trainForm.docUrl,this.trainForm.trainDuration,this.trainForm.trainIntroduction,this.trainForm.trainName)
          .then(res=> {
            //处理返回的响应数据
            const data = res.data
            console.log(data);
          }).catch(error => {
            console.error(error);
          })
        } else {
          alert("请填写完整")
          // console.log(this.trainForm);
          return false;
        }
      })
      
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
      if (this.trainProject_value === "") {
        this.$alert("请选择培训的项目名", "提示", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      }
    },
  },
  mounted() {
    getTrainList().then(res =>{
      this.trainData = res.data;
      // console.log(res.data);
      this.trainData.forEach(obj => {
        const { trainName,trainId } = obj;
        this.trainProName.push({trainName,trainId});
      });
      console.log(this.trainProName);
    })
    
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