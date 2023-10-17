<template>
<div class="outer-container">
  <div class="bg-test">
    <div class="test">
      <div class="container">
        <div class="text-home">
          <p>创建测试任务</p>
        </div>
        <div class="path">
        <!-- 步骤条部分 -->
        <div class="menu">
          <el-steps
            :active="currentStep"
            :space="200"
            direction="vertical"
            finish-status="success"
            class="step"
          >
            <el-step title="新建测试任务"></el-step>
            <el-step title="编写测试流程"></el-step>
            <el-step title="测试结果详情"></el-step>
          </el-steps>
        </div>
        <!-- 新建测试任务表单部分 -->
        <div class="content">
          <div class="tab1" v-if="currentStep === 0">
            <el-form :model="buildForm" ref="buildForm" :rules="rules">
              <el-form-item label="项目选择" :label-width="formLabelWidth">
                <el-select v-model="value" placeholder="选择项目" style="width:100%;">
                  <el-option
                    v-for="item in prolist"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="测试编号"
                :label-width="formLabelWidth"
                prop="number"
              >
                <el-input
                  :disabled="value === ''"
                  v-model="buildForm.number"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="测试名称"
                :label-width="formLabelWidth"
                prop="name"
              >
                <el-input
                  :disabled="value === ''"
                  v-model="buildForm.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="测试说明"
                :label-width="formLabelWidth"
                prop="instruction"
              >
                <el-input
                  :disabled="value === ''"
                  v-model="buildForm.instruction"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="测试内容"
                :label-width="formLabelWidth"
                prop="content"
              >
                <el-input
                  :disabled="value === ''"
                  v-model="buildForm.content"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="saveClick">保 存</el-button>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
          </div>

          <el-form
            class="tab2"
            ref="processForm"
            :model="processForm"
            :rules="rules2"
            label-width="120px"
            v-if="currentStep === 1"
          >
            <el-form-item label="测试设备" prop="eqname">
              <el-input v-model="processForm.eqname"></el-input>
            </el-form-item>
            <el-form-item label="使用设备" prop="useeqname">
              <el-input v-model="processForm.useeqname"></el-input>
            </el-form-item>
            <el-form-item label="选择工艺" prop="craft">
              <el-select
                v-model="processForm.craft"
                placeholder="请选择工艺"
                label-width="120px"
              >
                <el-option label="1" value="craft1"></el-option>
                <el-option label="2" value="craft2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工艺参数设置" prop="parameter">
              <el-input v-model="processForm.parameter"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <div>{{ currentTime }}</div>
            </el-form-item>
            <el-form-item style="text-align: center">
              <el-button type="primary" @click="onSubmit">立即执行</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
          <el-button
            v-if="currentStep === 2"
            @click="currentStep = 0"
            type="primary"
            >完成</el-button
          >
        </div>
        <!-- 前进后退按钮 -->
        <div class="stepbtn">
          <el-button :disabled="canBack" @click="back" class="backbtn" type="primary"
            >上一步</el-button
          >
          <el-button v-if="showNext" @click="next" class="nextbtn" type="primary"
            >下一步</el-button
          >
          <el-button v-if="showNext02" @click="next02" class="nextbtn" type="primary"
            >下一步</el-button
          >
        </div>
        </div>
        <!-- 历史测试任务记录模块 -->
        <div class="footer">
          <hr
            style="
              border: 1px solid white;
              margin-left: 10px;
              margin-right: 10px;
            "
          />
          <div class="text-home"><p>历史测试任务记录</p></div>
          <el-input
            placeholder="请输入检索内容"
            prefix-icon="el-icon-search"
            v-model="searchTerm"
            style="width: 300px; margin-left: 20px"
          >
          </el-input>
          <el-button
            type="info"
            style="margin-left: 12px"
            :disabled="isButtonDisabled"
            >搜索
          </el-button>
          <el-table
            :data="tableData"
            style="
              width: 100%;
              margin-top: 20px;
              margin-left: 20px;
              border: 1px solid rgb(255, 255, 255);
              border-radius: 6px;
              margin-bottom: 100px;
            "
          >
            <el-table-column fixed prop="number" label="编号" width="60">
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="160">
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="160">
            </el-table-column>
            <el-table-column prop="name" label="测试名称" width="120">
            </el-table-column>
            <el-table-column prop="equipment" label="测试设备" width="120">
            </el-table-column>
            <el-table-column prop="useEquipment" label="使用设备" width="120">
            </el-table-column>
            <el-table-column prop="people" label="人员" width="120">
            </el-table-column>
            <el-table-column prop="craft" label="工艺" width="120">
            </el-table-column>
            <el-table-column prop="result" label="测试结果" width="100">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-popover placement="top" width="160" trigger="click">
                  <p>确定删除此条记录吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="visible = false"
                      >取消</el-button
                    >
                    <el-button
                      type="primary"
                      size="mini"
                      @click="visible = false"
                      @click.native.prevent="deleteRow(scope.$index, tableData)"
                      >确定</el-button
                    >
                  </div>
                  <el-button slot="reference" type="text" size="small"
                    >删除</el-button
                  >
                </el-popover>
                /
                <el-popover placement="top" width="400" trigger="click">
                  <el-table :data="gridData">
                    <el-table-column
                      width="150"
                      property="param1"
                      label="参数1"
                    ></el-table-column>
                    <el-table-column
                      width="100"
                      property="param2"
                      label="参数2"
                    ></el-table-column>
                    <el-table-column
                      width="300"
                      property="content"
                      label="测试内容"
                    ></el-table-column>
                  </el-table>
                  <el-button slot="reference" type="text" size="small"
                    >查看详情</el-button
                  >
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      isVisible: false,
      isButtonDisabled: "",
      searchTerm: "",
      currentStep: 0,
      showNext: true,
      showNext02: false,
      canBack: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      prolist: [],
      buildForm: {
        number: "",
        name: "",
        instruction: "",
        content: "",
      },
      value: "",
      rules: {
        proname: [
          { required: true, message: "请选择测试的项目", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入测试的编号", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入测试的名字", trigger: "blur" },
        ],
        instruction: [
          { required: true, message: "请输入测试的说明", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入测试内容", trigger: "blur" },
        ],
      },
      processForm: {
        eqname: "",
        useeqname: "",
        craft: "",
        parameter: "",
        startdate: "",
      },
      rules2: {
        eqname: [
          { required: true, message: "请选择测试的设备", trigger: "blur" },
        ],
        useeqname: [
          { required: true, message: "请选择需要使用的设备", trigger: "blur" },
        ],
        craft: [{ required: true, message: "请选择设备工艺", trigger: "blur" }],
        parameter: [
          { required: true, message: "请输入设备工艺的参数", trigger: "blur" },
        ],
        startdate: [
          { required: true, message: "请输入测试的开始事件", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      timer: "", //定义一个定时器的变量
      currentTime:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate() +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(), // 获取当前时间
      tableData: [
        {
          number: "1",
          startTime: "2016-05-03",
          endTime: "2016-05-03",
          name: "倒角1",
          equipment: "ASE1",
          useEquipment: "DEV1",
          people: "张三",
          craft: "倒角",
          result: "成功",
        },
        {
          number: "2",
          startTime: "2016-05-03",
          endTime: "2016-05-03",
          name: "榫卯1",
          equipment: "ASE1",
          useEquipment: "DEV1",
          people: "张三",
          craft: "榫卯",
          result: "失败",
        },
        {
          number: "3",
          startTime: "2016-05-03",
          endTime: "2016-05-03",
          name: "倒角2",
          equipment: "ASE1",
          useEquipment: "DEV1",
          people: "张三",
          craft: "倒角",
          result: "失败",
        },
        {
          number: "4",
          startTime: "2016-05-03",
          endTime: "2016-05-03",
          name: "倒角2",
          equipment: "ASE1",
          useEquipment: "DEV1",
          people: "张三",
          craft: "倒角",
          result: "成功",
        },
        {
          number: "5",
          startTime: "2016-05-03",
          endTime: "2016-05-03",
          name: "倒角2",
          equipment: "ASE1",
          useEquipment: "DEV1",
          people: "张三",
          craft: "倒角",
          result: "成功",
        },
        {
          number: "6",
          startTime: "2016-05-03",
          endTime: "2016-05-03",
          name: "倒角2",
          equipment: "ASE1",
          useEquipment: "DEV1",
          people: "张三",
          craft: "倒角",
          result: "成功",
        },
      ],
      gridData: [
        {
          param1: "0.9",
          param2: "1.5",
          content: "检测内容1",
        },
        {
          param1: "3.33",
          param2: "1.33",
          content: "检测内容2",
        },
      ],
    };
  },
  computed: {},
  methods: {
    back() {
      if (this.currentStep > 0) {
        this.currentStep--;
      } else {
        this.currentStep = 0;
      }
    },
    next() {
      this.$refs.buildForm.validate((valid) => {
        if (valid) {
          if (this.currentStep < 2) {
            this.currentStep++;
          } else {
            this.currentStep = 2;
          }
          this.showNext = false;
          this.showNext02 = true;
          this.canBack = false
        } else {
          alert ("请填写完整")
          return false
        }
      });
      //if (this.active++ > 2) this.active = 0;
    },

    next02() {
      this.$refs.processForm.validate((valid) => {
        if (valid) {
          if (this.currentStep < 2) {
            this.currentStep++;
          } else {
            this.currentStep = 2;
          }
        } else {
          alert ("请填写完整")
          return false
        }
      });
      //if (this.active++ > 2) this.active = 0;
    },


    saveClick() {
      this.$refs.buildForm.validate((valid) => {
        if (valid) {
          console.log("saveClick");
        } else {
          alert("请填写完整")
        }
      })
    },

    onSubmit() {
      console.log("submit");
    },
    moment() {
      startdate = this.$moment().format("YYYY-MM-DD HH:mm:ss");
    },

    //时间过滤加0
    appendZero(obj) {
      if (obj < 10) {
        return "0" + obj;
      } else {
        return obj;
      }
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    },
    deleteRow(index, rows) {
      this.visible = true;
      rows.splice(index, 1);
    },
    showPopover() {
      this.isVisible = true;
    },
    hidePopover() {
      // console.log("取消隐藏");
      this.isVisible = false;
    },
  },
  created() {
    var vm = this;
    vm.timer = setInterval(() => {
      var y = new Date().getFullYear();
      var m = vm.appendZero(new Date().getMonth() + 1);
      var d = vm.appendZero(new Date().getDate());
      var ho = vm.appendZero(new Date().getHours());
      var mi = vm.appendZero(new Date().getMinutes());
      var se = vm.appendZero(new Date().getSeconds());
      //修改数据date
      vm.currentTime = y + "-" + m + "-" + d + " " + ho + ":" + mi + ":" + se;
    }, 1000);
  },
  mounted() {
    this.prolist = this.$store.state.proData;
    console.log(this.prolist);
  },
};
</script>

<style scoped>
.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 100%视口高度，垂直居中 */
  max-width: 1500px; /* 设置最大宽度 */
  margin: 0 auto; /* 居中 */
  padding-left: 220px;
  /* padding: 20px; 左右下留白 */
}
.bg-test {
  display: flex;
  flex-direction: column;
  /* position:fixed;
  top:110px; */
  overflow: hidden;
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.path{
  display:flex;
  align-items: flex-start;
}
.clear {
  clear: both;
  height: 0px;
}
.test {
  height: 100%;
  overflow-y: auto;
}
.text-home {
  margin-top: 0px;
  margin-left: 20px;
  line-height: 55px;
  font-size: 20px;
  color: rgb(86, 86, 86);
}

.menu {
  height: 350px;
  width: 20%;
  float: left;
  /* flex: 1; */
}

.step {
  width: 80%;
  margin-left: 35px;
  text-align: center;
}

.content {
  height: 350px;
  width: 70%;
  float: left;
  flex: 1;
}

.tab1 {
  float: left;
  text-align: center;
  width: 90%;
}

.tab2 {
  float: left;
  width: 90%;
}

.stepbtn {
  height: 350px;
  width: 10%;
  float: right;
  display:flex;
  flex-direction: column;
}

.backbtn {
  right: 10%;
  margin-top: 100px;
  margin: 10px;
}

.nextbtn {
  right: 10%;
}

.footer {
  width: 100%;
  height: auto;
  float: left;
  margin-bottom: 50px;
}

.el-table .warning-row {
  background: #f07d57;
}

.el-table .success-row {
  background: #a3d587;
}
div /deep/ .el-step__title.is-process {
  color: rgb(48, 48, 48);
}
div /deep/ .el-step__title.is-success {
  color: rgb(97, 150, 220);
}
div /deep/ .el-step__line {
  color: rgb(97, 150, 220);
}
div /deep/ .el-step__head.is-success {
  color: rgb(97, 150, 220);
  border-color: rgb(97, 150, 220);
}
div /deep/ .el-form-item__label {
  color: rgb(80, 80, 80);
}
div /deep/ .el-button.el-button--primary {
  background-color: rgb(97, 150, 220);
  border-color: rgb(97, 150, 220);
}
</style>
