<template>
  <div class="card">
    <!-- 分为三个部分 -->
    <el-tabs type="border-card">
      <el-tab-pane label="培训项目">
        <!-- 这里的构造与预约管理的构造相同 -->
        <div class="book-container">
          <div class="top-div">
            <!-- 第一个 div 的内容 -->
            <div class="book-title">
              <p>设备预约日视图</p>
            </div>
            <div class="block">
              <el-date-picker
                v-model="value1"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
            <div>
              <el-button plain>更新</el-button>
              <el-button plain>日期</el-button>
            </div>
          </div>
          <div class="bottom-div">
            <!-- 第二个 div 的内容 -->
            <el-row style="height: auto">
              <el-col :span="8" style="height: auto">
                <div class="button-area">
                  <el-button plain @click="hideClick1">{{
                    buttonText1
                  }}</el-button>
                </div>
                <div class="schedular-area" v-if="isShow1">
                  <p style="margin: 10px">
                    当前用户:{{ this.$store.state.cu_role }}
                  </p>
                  <Schedular4 />
                </div>
              </el-col>
              <el-col :span="16" style="height: auto">
                <div v-if="this.$store.state.cu_role === 'admin'">
                  <el-form
                    id="trainProject"
                    label-width="80px"
                    :model="trainForm"
                    ref="trainForm"
                    style="margin: 10px"
                  >
                    <el-form-item label="设备名称" prop="devicename">
                      <el-select v-model="devicename" placeholder="请选择">
                        <el-option
                          v-for="item in device_options"
                          :key="item.value"
                          :label="item.label"
                          :devicename="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="编号" prop="iid">
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
                      <el-input
                        v-model="trainForm.content"
                        style="width: 300px"
                      >
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
                        <el-button size="small" type="primary"
                          >点击上传</el-button
                        >
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
                      <el-button @click="resetForm('trainForm')"
                        >重置</el-button
                      >
                    </el-form-item>
                  </el-form>
                </div>
                <div v-if="this.$store.state.cu_role === 'staff'">
                  <h3>申请参加培训</h3>
                  <el-select v-model="trainProject_value" placeholder="请选择培训名称">
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
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="培训记录">
        <el-table :data="trainRecords" height="250" border style="width: 100%">
          <el-table-column prop="date" label="日期" width="130">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="130">
          </el-table-column>
          <el-table-column prop="projectName" label="项目名称">
          </el-table-column>
          <el-table-column prop="evaluate" label="考核评定" width="130">
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="已申请培训">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="培训内容" name="1">
            <div>
              <h2>文档:</h2>
              <ul>
                <li v-for="file in files" :key="file.name">
                  <a :href="file.url" :download="file.name">{{ file.name }}</a>
                </li>
              </ul>
            </div>
            <div>
              <h2>视频列表：</h2>
              <ul>
                <li v-for="video in videos" :key="video.id">
                  <a :href="video.url" target="_blank" rel="noopener">{{
                    video.name
                  }}</a>
                </li>
              </ul>
            </div>
          </el-collapse-item>
          <el-collapse-item title="考核指标" name="2">
            <div>活着就好【双手合十】</div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
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
      files: [
        { name: "File 1", url: "https://example.com/file1.pdf" },
        { name: "File 2", url: "https://example.com/file2.doc" },
        { name: "File 3", url: "https://example.com/file3.txt" },
      ],
      activeNames: ["1"],
      trainRecords: [
        {
          date: "2016-05-03",
          name: "王小虎",
          projectName: "作业规程培训2",
          evaluate: "优秀",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          projectName: "专业知识培训1",
          evaluate: "优秀",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          projectName: "作业规程培训3",
          evaluate: "优秀",
        },
      ],
      dialogVisible: false,
      form: {
        recipient: "",
        subject: "",
        content: "",
      },
      videos: [
        { id: 1, name: "Video 1", url: "https://example.com/video1.mp4" },
        { id: 2, name: "Video 2", url: "https://example.com/video2.mp4" },
        { id: 3, name: "Video 3", url: "https://example.com/video3.mp4" },
      ],
      fileList: [
        {
          name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      isShow1: true,
      isShow2: true,
      isShow3: true,
      equp_value: "",
      trainForm: {
        devicename:"",
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
      trainProject:[
        {
          value:'培训一',
          label:'培训一'
        },
        {
          value:'培训二',
          label:'培训二'
        },
        {
          value:'培训二',
          label:'培训二'
        },
        {
          value:'培训三',
          label:'培训三'
        }
      ],
      devicename:"",
      trainProject_value:"",
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
    buttonApply(){
      if(this.trainProject_value === ""){
        this.$alert('请选择培训的项目名', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    }
  },
};
</script>
<style scoped>
.book-container {
  height: auto;
  margin-left: 10px;
}

.top-div {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 90%;
  height: auto;
  border: 1px solid #000;
  border-radius: 8px;
  margin-top: 5px;
  background-color: rgb(230, 230, 230);
  /* 可以根据需要进行其他样式设置 */
}
.book-title {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-div {
  width: 90%;
  height: auto;
  margin-top: 5px;
  border: 1px solid #000;
  border-radius: 8px;
}
.button-group {
  display: flex;
  align-content: center;
}
.button-group .button {
  margin-right: 15px;
}
.button-group .button:last-child {
  margin-right: 0;
}

.schedular-area {
  width: auto;
  height: auto;
  overflow: hidden;
}
.button-area {
  margin: 10px;
}
.button-group {
  display: flex;
  align-content: center;
}
.button-group .button {
  margin-right: 15px;
}
.button-group .button:last-child {
  margin-right: 0;
}
</style>