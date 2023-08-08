<template>
  <div class="project">
    <!-- 上半区域 -->
    <div class="top_part">
      <div class="pro_font">
        <p>项目分类</p>
      </div>
      <!-- 选择器，选择列表为项目的类别 -->
      <div class="pro_selector">
        <el-select v-model="value" placeholder="请选择" style="width: 150px;">
          <el-option v-for="item in pro_options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!-- 根据选择的项目类别，以表格显示该类别下所有的项目信息 -->
      <div class="table_inform">
        <el-table :data="filteredData" style="width: 95%;border:1px solid black;border-radius: 6px;margin:10px">
          <el-table-column type="expand">
            <template slot-scope="props">
              <!-- 表格中数据的详细信息在这展示 -->
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="项目名称:">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="项目类别:">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="项目编号:">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="项目描述:">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
                <el-form-item label="项目目的:">
                  <span>{{ props.row.purpose }}</span>
                </el-form-item>
                <el-form-item label="使用设备:">
                  <span>{{ props.row.equp }}</span>
                </el-form-item>
                <el-form-item label="项目成员:">
                  <span>{{ props.row.member }}</span>
                </el-form-item>
                <el-form-item label="项目组长:">
                  <span>{{ props.row.leader }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="项目名" prop="name">
          </el-table-column>
          <el-table-column label="项目类别" prop="category">
          </el-table-column>
          <el-table-column label="项目描述" prop="desc">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 下半区域 -->
    <div class="bottom_part">
      <div class="pro_font">
        <p>新建项目</p>
      </div>
      <!-- 新建项目的表单区域 -->
      <div class="pro_form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="项目id" prop="id" style="margin-top: 10px;">
            <el-input v-model="ruleForm.id" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" prop="name" style="margin-top: 10px;">
            <el-input v-model="ruleForm.name" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="项目类别" prop="category">
            <el-select v-model="ruleForm.category" placeholder="请选择项目的类别">
              <el-option label="Ⅰ类" value="Ⅰ类"></el-option>
              <el-option label="Ⅱ类" value="Ⅱ类"></el-option>
              <el-option label="Ⅲ类" value="Ⅲ类"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="项目描述" prop="desc">
            <el-input v-model="ruleForm.desc" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="实验设备" prop="equ_value">
            <el-select v-model="ruleForm.equ_value" placeholder="请选择实验所需的设备">
              <el-option
                v-for="item in pro_equps"
                :key="item.deviceName"
                :label="item.deviceName"
                :value="item.deviceName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="实验目的" prop="purpose">
            <el-input v-model="ruleForm.purpose" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="成员" prop="member">
            <el-input v-model="ruleForm.member" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="组长" prop="leader">
            <el-input v-model="ruleForm.leader" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      // 项目分类选项数组，这里是写死的，后期应该从数据库中进行读取
      pro_options: [{
        value: 'Ⅰ类',
        label: 'Ⅰ类'
      }, {
        value: 'Ⅱ类',
        label: 'Ⅱ类'
      }, {
        value: 'Ⅲ类',
        label: 'Ⅲ类'
      }],
      value: 'Ⅰ类', // 默认的项目的类别
      // 所有项目的信息，也是写死的
      proData: [{
        id: '100001',
        name: '项目一',
        category: 'Ⅰ类',
        desc: '本项目是一个普通项目',
        equp: 'ASE',
        purpose: '目的一',
        member: '张三',
        leader: '张三',
      }, {
        id: '100002',
        name: '项目二',
        category: 'Ⅰ类',
        desc: '本项目是一个不普通项目',
        equp: 'AWM',
        purpose: '目的二',
        member: '李四、王五',
        leader: '李四',
      }, {
        id: '100003',
        name: '项目三',
        category: 'Ⅱ类',
        desc: '本项目是一个省级项目',
        equp: 'AOPU',
        purpose: '目的三',
        member: '小明、小张、小亮',
        leader: '小明',
      }, {
        id: '100004',
        name: '项目四',
        category: 'Ⅲ类',
        desc: '本项目是一个国家级项目',
        equp: 'OOPEE',
        purpose: '目的四',
        member: '王浩、张伟、李鹏',
        leader: '王浩',
      }],
      pro_equps:[], //实验设备选择器绑定的设备列表
      ruleForm: { //表单绑定的数据信息，写完后传到这里
        id:'',
        name: '',
        category: '',
        desc: '',
        equ_value: '',
        purpose: '',
        member: '',
        leader: '',
      },
      rules: { //这里是表单的一些规则，比如必填项，字符长度等
        id: [
          { required: true, message: '请填写项目的id', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入项目名字', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择项目类别', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写项目的描述', trigger: 'blur' }
        ],
        equ_value: [
          { required: true, message: '请选择实验所需设备', trigger: 'change' }
        ],
        purpose: [
          { required: true, message: '请填写实验目的', trigger: 'blur' }
        ],
        member: [
          { required: true, message: '请填写项目的成员', trigger: 'blur' }
        ],
        leader: [
          { required: true, message: '请填写项目的组长', trigger: 'blur' }
        ],
        
        
      },
    }
  },
  created() {
    //获取所有的设备信息
    getEquList().then(res => {
      this.pro_equps = res.data
    })
  },
  computed: {
    //这里是上半部分通过选择项目类别筛选出所显示的项目
    filteredData() {
      return this.proData.filter((item) => item.category === this.value);
    },
  },
  methods: {
    submitForm() {
      this.proData.push({...this.ruleForm});
      console.log(this.proData);
      this.ruleForm = {
        id:'',
        name: '',
        category: '',
        desc: '',
        equ_value: '',
        purpose: '',
        member: '',
        leader: ''
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}

</script>
<style scoped>
.demo-table-expand {
  margin-left: 70px;
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.top_part {
  width: 80%;
  height: auto;
  border: 1px solid black;
  border-radius: 6px;
  margin: 10px;
}

.bottom_part {
  width: 80%;
  height: auto;
  border: 1px solid black;
  border-radius: 6px;
  margin: 10px;
}

.pro_font {
  margin: 10px;
}

.pro_selector {
  margin: 10px;
}
.pro_form{
  width: 90%;
  border: 1px solid black;
  border-radius: 6px;
  margin: 10px;

}
</style>