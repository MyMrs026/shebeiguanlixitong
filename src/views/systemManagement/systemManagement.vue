<template>
<div class="outer-container">
  <div class="bg">
    <div class="lab-bg">
      <!-- 实验室信息管理，后续实验室的名字应该做成下拉列表，这样可以改变指定的实验室 -->
      <div class="lab">
        <div class="text-home">实验室添加</div>
        <el-form
          :model="formLab"
          :rules="rules"
          ref="formLab"
          :label-position="labelPosition"
          label-width="200px"
          class="demo-ruleForm"
        >
          <el-form-item label="实验室名称" prop="labName">
            <el-input v-model="formLab.labName" style="width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="实验室管理员" prop="linkman">
            <el-input v-model="formLab.linkman" style="width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="实验室联系电话" prop="tel">
            <el-input v-model="formLab.tel" style="width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="实验室布局" prop="layout">
            <el-input v-model="formLab.layout" style="width: 350px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('formLab')"
              >添加</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="twosheep">
        <img
          src="../../assets/img/computer.png"
          style="height: 350px; width: 470px; margin-top: 30px"
        />
      </div>
      <!-- 用户权限管理模块 -->
      <hr
        style="
          border: 1px solid white;
          margin-left: 10px;
          margin-right: 10px;
          margin-top: 400px;
        "
      />

      <div class="lab-list">
        <div class="text-home"><p>&nbsp;&nbsp;实验室列表</p></div>
        <el-table :data="lablist" border class="table_auth">
          <el-table-column label="实验室名字" prop="labName"> </el-table-column>
          <el-table-column label="实验室管理员" prop="linkman">
          </el-table-column>
          <el-table-column label="实验室联系电话" prop="tel"> </el-table-column>
          <el-table-column label="实验室布局" prop="layout"> </el-table-column>
        </el-table>
      </div>

      <hr
        style="
          border: 1px solid white;
          margin-left: 10px;
          margin-right: 10px;
          margin-top: 400px;
        "
      />

      <div class="text-home"><p>&nbsp;&nbsp;权限管理</p></div>
      <div class="authority">
        <el-table :data="information" border class="table_auth">
          <el-table-column prop="username" label="用户名"> </el-table-column>
          <el-table-column prop="email" label="用户邮箱"> </el-table-column>
          <el-table-column label="角色权限">
            <template slot-scope="scope">
              {{ displayRole(scope.row.userRole) }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center">
          <el-button plain> 保存更改 </el-button>
        </div>
        <!-- 点击编辑按钮弹出的对话框 -->
        <el-dialog title="编辑人员信息" :visible.sync="editDialogVisible">
          <el-form v-model="editedInform" label-width="80px">
            <!-- 用户名和密码不能更改 -->
            <el-form-item label="用户名:">
              <el-input
                v-model="editedInform[currentIndex].username"
                :disabled="true"
                style="width: 300px"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
              <el-input
                v-model="editedInform[currentIndex].email"
                :disabled="true"
                style="width: 300px"
              >
              </el-input>
            </el-form-item>
            <!-- 权限的列表应从后端数据库读取，此处是写死的 -->
            <el-form-item label="权限:">
              <el-select v-model="editedInform[currentIndex].role">
                <el-option label="管理员" value="管理员"></el-option>
                <el-option label="普通人员" value="普通人员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveInform">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { getLabList,addLab } from '../../network/labtory';
import { getUserList } from '../../network/user'; 
export default {
  data() {
    return {
      labelPosition: 'right',
      formLab: {//实验室信息管理表单内容
        labName: "",
        linkman: "",
        tel: "",
        layout: "",
      },
      information: [],
      editDialogVisible: false,
      editedInform: [{
        username: '',
        email: '',
        role: ''
      }],
      currentIndex: 0,
      lablist:[],
      rules:{
        labName: [
          { required:true, message:'请填写实验室名称',trigger:'blur' }
        ],
        linkman: [
          { required:true, message:'请填写实验室管理人',trigger:'blur' }
        ],
        tel: [
          { required:true, message:'请填写实验室联系方式',trigger:'blur' }
        ],
        layout: [
          { required:true, message:'请填写实验室布局',trigger:'blur' }
        ]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            addLab(this.formLab.labName,this.formLab.layout,this.formLab.linkman,this.formLab.tel).then(res=>{
              const data = res.data;
              console.log(data);
            }).catch(error=> {
              console.error(error);
            })
            
            alert('提交成功!');
            location.reload();
          } else {
            alert('请填写完整')
          }
        });
    },
    displayRole(role) {
      if (role === 1) {
        return "管理员";
      } else if (role === 0) {
        return "普通人员";
      } else if (role === 2) {
        return "项目组长";
      } else {
        return "未知角色";
      }
    },
    handleEdit(index, row) {
      this.editedInform = { ...this.information };
      this.editDialogVisible = true;
      console.log(this.editedInform);
      this.currentIndex=index;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    saveInform() {
      this.editDialogVisible = false;
      console.log("保存成功");
    }
  },
  mounted(){
    getLabList().then(res => {
      // console.log(res);
      this.lablist = res.data;
      // console.log(this.lablist);
    })
    getUserList().then(res => {
      // console.log(res);
      this.information = res.data;
      console.log(this.information);
    })
  }
}

</script>
<style scoped>
.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg {
  display: flex;
  flex-direction: column;
  /* position:fixed;
  top:110px; */
  left: 0;
  z-index: -1;
  overflow: hidden;
  /* background-repeat: no-repeat; */
  background-image: url("../../assets/img/qqq6.png");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.lab-bg {
  height: 100%;
  overflow-y: auto;
}
.lab {
  margin-left: 8px;
  width: 50%;
  /* border: 1px solid rgb(255, 255, 255);
  border-radius: 6px; */
  float: left;
}

.authority {
  margin: 8px;
  margin-left: 30px;
  /* border: 1px solid rgb(255, 255, 255);
  border-radius: 6px; */
  width: 95%;
  height: 500px;
  margin-bottom: 30px;
}

.table_auth {
  width: 96%;
  margin: 10px;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 6px;
  margin-bottom: 30px;
}

.text-home {
  margin-top: 10px;
  margin-left: 40px;
  line-height: 55px;
  font-size: 20px;
  color: rgb(96, 96, 96);
}

.lab-list {
  height: auto;
}

.twosheep {
  float: left;
  width: 40%;
  height: 370px;
  /* border: 1px solid rgb(255, 255, 255);
  border-radius: 6px; */
}
div /deep/ .el-form-item__label {
  color: rgb(80, 80, 80);
}
div /deep/ .el-button.el-button--primary {
  background-color: rgb(123, 178, 230);
  border-color: rgb(123, 178, 230);
}
div /deep/ .el-button.el-button--default.is-plain {
  text-align: center;
}
</style>