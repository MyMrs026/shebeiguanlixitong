<template>
  <div class="system">
    <div class="container">
      <div id="header">
        <h3>创建测试任务</h3>
      </div>
      <div class="menu">
        <el-steps :active="currentStep" :space="200" direction="vertical" finish-status="success" class="step">
          <el-step title="新建测试任务"></el-step>
          <el-step title="编写测试流程"></el-step>
          <el-step title="测试结果详情"></el-step>
        </el-steps>
      </div>
      <div class="content">
        <div class="tab1" v-if="currentStep === 0">
          <el-form :model="buildForm">
            <el-form-item label="测试编号" :label-width="formLabelWidth">
              <el-input v-model="buildForm.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="测试名称" :label-width="formLabelWidth">
              <el-input v-model="buildForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="测试说明" :label-width="formLabelWidth">
              <el-input v-model="buildForm.instruction" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="测试内容" :label-width="formLabelWidth">
              <el-input v-model="buildForm.content" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </div>
        </div>

        <el-form class="tab2" ref="form" :model="processForm" label-width="120px" v-if="currentStep === 1">
          <el-form-item label="测试设备">
            <el-input v-model="processForm.eqname"></el-input>
          </el-form-item>
          <el-form-item label="使用设备">
            <el-input v-model="processForm.useeqname"></el-input>
          </el-form-item>
          <el-form-item label="选择工艺">
            <el-select v-model="processForm.craft" placeholder="请选择工艺" label-width="120px">
              <el-option label="1" value="craft1"></el-option>
              <el-option label="2" value="craft2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工艺参数设置">
            <el-input v-model="processForm.parameter"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <div>{{ currentTime }}</div>
          </el-form-item>
          <el-form-item style="text-align:center">
            <el-button type="primary" @click="onSubmit">立即执行</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>

        <el-button v-if="currentStep === 2" @click="currentStep = 0">完成</el-button>
      </div>
      <div class="stepbtn">
        <el-button @click="back" class="backbtn">上一步</el-button>
        <el-button @click="next" class="nextbtn">下一步</el-button>
      </div>

      <div class="footer">
        <h3>历史测试任务记录 </h3>
        <el-input placeholder="请输入检索内容" prefix-icon="el-icon-search" v-model="searchTerm" style="width:300px">
        </el-input>
        <el-button type="info" style="margin-left:12px;" :disabled="isButtonDisabled">搜索
        </el-button>
        <el-table :data="tableData" style="width: 100%" max-height="250">
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
              <el-popover :visible.sync="isVisible" title="删除页面" placement="top" width="200" trigger="click">
                <p>确定删除此条记录吗？</p>
                <div style="text-align: right; margin: 0">
                  <!-- <el-button size="mini" type="text" @click="isShowPopover">取消</el-button> -->
                  <el-button type="primary" size="mini" @click="isShowPopover"
                    @click.native.prevent="deleteRow(scope.$index, tableData)">确定</el-button>
                </div>
                <el-button slot="reference" type="text" size="small">删除</el-button>
              </el-popover>
              <el-popover placement="top" width="400" trigger="click">
                <el-table :data="gridData">
                  <el-table-column width="150" property="param1" label="参数1"></el-table-column>
                  <el-table-column width="100" property="param2" label="参数2"></el-table-column>
                  <el-table-column width="300" property="content" label="测试内容"></el-table-column>
                </el-table>
                <el-button slot="reference" type="text" size="small">查看详情</el-button>
              </el-popover>

            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      isButtonDisabled: '',
      searchTerm: '',
      currentStep: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      buildForm: {
        number: '',
        name: '',
        instruction: '',
        content: '',
      },
      processForm: {
        eqname: '',
        useeqname: '',
        craft: '',
        parameter: '',
        startdate: '',
      },
      formLabelWidth: '120px',
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
      tableData: [{
        number: '1',
        startTime: '2016-05-03',
        endTime: '2016-05-03',
        name: '倒角1',
        equipment: 'ASE1',
        useEquipment: 'DEV1',
        people: '张三',
        craft: '倒角',
        result: '成功'
      }, {
        number: '2',
        startTime: '2016-05-03',
        endTime: '2016-05-03',
        name: '榫卯1',
        equipment: 'ASE1',
        useEquipment: 'DEV1',
        people: '张三',
        craft: '榫卯',
        result: '失败'
      }, {
        number: '3',
        startTime: '2016-05-03',
        endTime: '2016-05-03',
        name: '倒角2',
        equipment: 'ASE1',
        useEquipment: 'DEV1',
        people: '张三',
        craft: '倒角',
        result: '失败'
      }, {
        number: '4',
        startTime: '2016-05-03',
        endTime: '2016-05-03',
        name: '倒角2',
        equipment: 'ASE1',
        useEquipment: 'DEV1',
        people: '张三',
        craft: '倒角',
        result: '成功'
      }, {
        number: '5',
        startTime: '2016-05-03',
        endTime: '2016-05-03',
        name: '倒角2',
        equipment: 'ASE1',
        useEquipment: 'DEV1',
        people: '张三',
        craft: '倒角',
        result: '成功'
      }, {
        number: '6',
        startTime: '2016-05-03',
        endTime: '2016-05-03',
        name: '倒角2',
        equipment: 'ASE1',
        useEquipment: 'DEV1',
        people: '张三',
        craft: '倒角',
        result: '成功'
      }
      ],
      gridData: [{
        param1: '0.9',
        param2: '1.5',
        content: '检测内容1'
      }, {
        param1: '3.33',
        param2: '1.33',
        content: '检测内容2'
      },],
    }
  },
  methods: {
    back() {
      if (this.currentStep > 0) {
        this.currentStep--;
      } else {
        this.currentStep = 0;
      }
    },
    next() {
      if (this.currentStep < 2) {
        this.currentStep++;
      } else {
        this.currentStep = 2;
      }
      //if (this.active++ > 2) this.active = 0;
    },
    moment() {
      startdate = this.$moment().format('YYYY-MM-DD HH:mm:ss')
    },
    created() {
      var vm = this
      vm.timer = setInterval(() => {
        var y = new Date().getFullYear()
        var m = vm.appendZero(new Date().getMonth() + 1)
        var d = vm.appendZero(new Date().getDate())
        var ho = vm.appendZero(new Date().getHours())
        var mi = vm.appendZero(new Date().getMinutes())
        var se = vm.appendZero(new Date().getSeconds())
        //修改数据date
        vm.currentTime = y + "-" + m + "-" + d + " " + ho + ":" + mi + ":" + se
      }, 1000)
    },
    //时间过滤加0
    appendZero(obj) {
      if (obj < 10) {
        return "0" + obj
      } else {
        return obj
      }
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
      }
    },
    deleteRow(index, rows) {
      this.visible = true
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
};

</script>

<style scoped>
.container {
  width: 90%;
  margin: 15px;
}

.menu {
  height: 400px;
  width: 20%;
  float: left;

}

.step {
  width: 80%;
  margin-left: 35px;
  text-align: center;

}

.content {
  height: 400px;
  width: 70%;
  float: left;
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
  height: 400px;
  width: 10%;
  float: right;
}

.backbtn {
  right: 10%;
  margin-top: 100px;
  margin: 10px
}

.nextbtn {
  right: 10%;
}

.footer {
  width: 100%;
  height: 300px;
  float: left;
}

.el-table .warning-row {
  background: #f07d57;
}

.el-table .success-row {
  background: #a3d587;
}
</style>
