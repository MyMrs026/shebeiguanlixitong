<template>
  <div class="background-train">
    <div class="train">
      <div class="button-area">
        <router-link to="/train/project">
          <el-button plain>培训项目</el-button>
        </router-link>
        <router-link to="/train/log">
          <el-button plain>培训记录</el-button>
        </router-link>
        <router-link to="/train/list">
          <el-button plain>培训列表</el-button>
        </router-link>
      </div>
      <hr
        style="border: 1px solid white; margin-left: 10px; margin-right: 10px"
      />
      <router-view></router-view>
    </div>
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
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
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
<style scoped>
.background-train {
  /* position: fixed;
  top: 110px; */
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* 将背景容器放置在最底层 */
  overflow: hidden; /* 隐藏溢出的内容 */
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.train{
  height: 82%;
  overflow-y: auto;
}
.book-title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-area {
  margin-top: 20px;
  margin-left: 30px;
}
.bottom-div {
  width: 90%;
  height: auto;
  margin-top: 5px;
  border: 1px solid #000;
  border-radius: 8px;
}
.schedular-area {
  width: auto;
  height: auto;
  overflow: hidden;
}
div /deep/ .el-form-item__label {
  color: #fff;
}
.white-label {
  color: #fff;
}
</style>