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
            <Schedular4 />
          </div>
        </div>
      </el-col>
      <!-- 第二个 div 的内容 -->
      <el-col :span="12">
        <div class="right-div">
          <div class="form-area" v-if="this.$store.state.cu_role === 'admin'">
            <el-form class="train-form" label-width="80px" :model="trainForm">
              <el-form-item
                label="设备名称"
                prop="devicename"
                label-class-name="white-label"
              >
                <el-select v-model="devicename" placeholder="请选择">
                  <el-option
                    v-for="item in device_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="编号" prop="iid" class="form-item">
                <el-input v-model="trainForm.iid" style="width: 300px">
                </el-input>
              </el-form-item>
              <el-form-item label="培训名称" prop="name">
                <el-input v-model="trainForm.name" style="width: 300px">
                </el-input>
              </el-form-item>
              <el-form-item label="培训介绍" prop="intro">
                <el-input v-model="trainForm.intro" style="width: 300px">
                </el-input>
              </el-form-item>

              <el-form-item label="培训内容" prop="content">
                <el-input v-model="trainForm.content" style="width: 300px">
                </el-input>
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="培训指标" prop="target">
                <el-input v-model="trainForm.target" style="width: 300px">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" plain @click="submitForm"
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
                v-for="item in trainProject"
                :key="item.value"
                :label="item.label"
                :trainProject_value="item.value"
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
import Schedular4 from "../../components/common/schedular/Schedular4.vue";
export default {
  components: {
    Schedular4,
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
        devicename: "",
        iid: "",
        name: "",
        intro: "",
        content: "",
        target: "",
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
      trainProject: [
        {
          value: "培训一",
          label: "培训一",
        },
        {
          value: "培训二",
          label: "培训二",
        },
        {
          value: "培训二",
          label: "培训二",
        },
        {
          value: "培训三",
          label: "培训三",
        },
      ],
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      devicename: "",
      trainProject_value: "",
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
    submitForm() {
      console.log("提交");
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
};
</script>
<style scope>
.book-title {
  color: #fff;
}
.schedular-area {
  color: #fff;
}
</style>