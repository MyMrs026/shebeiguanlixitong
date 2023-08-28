<template>
<div class="bg">
  <div class="lab-bg">
    <div style="height=30px">
      <br />
    </div>
    <!-- 实验室信息管理，后续实验室的名字应该做成下拉列表，这样可以改变指定的实验室 -->
    <div class="lab">
      <div class="text-home">实验室信息管理</div>
      <el-form :label-position="labelPosition" label-width="200px" :model="formLabelAlign">
        <el-form-item label="实验室名称">
          <el-input v-model="formLabelAlign.name" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="实验室管理员">
          <el-input v-model="formLabelAlign.region" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="实验室联系电话">
          <el-input v-model="formLabelAlign.type" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="实验室布局">
          <el-input v-model="formLabelAlign.layout" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交信息</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="twosheep"><img src="../../assets/img/city.png" style="height:300px;margin-top:30px"></div>
    <!-- 用户权限管理模块 -->
    <hr style="border: 1px solid white; margin-left: 10px; margin-right: 10px;margin-top:400px;" />
    <div class="text-home" ><p>&nbsp;&nbsp;权限管理</p></div>
    <div class="authority">
      <el-table :data="information" border class="table_auth">
        <el-table-column label="用户名" prop="username">
        </el-table-column>
        <el-table-column label="用户邮箱" prop="email">
        </el-table-column>
        <el-table-column label="权限" prop="role">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center;">
      <el-button plain >
        保存更改
      </el-button>
      </div>
      <!-- 点击编辑按钮弹出的对话框 -->
      <el-dialog title="编辑人员信息" :visible.sync="editDialogVisible">
        <el-form v-model="editedInform" label-width="80px">
          <!-- 用户名和密码不能更改 -->
          <el-form-item label="用户名:">
            <el-input 
              v-model="editedInform[currentIndex].username" 
              :disabled="true"
              style="width: 300px;">
          </el-input>
          </el-form-item>
          <el-form-item label="邮箱:">
            <el-input 
              v-model="editedInform[currentIndex].email" 
              :disabled="true" 
              style="width:300px;">
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
</template>

<script>
import { getLabList } from '../../network/labtory';

export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {//实验室信息管理表单内容
        name: '',
        region: '',
        type: '',
        layout: '',
      },
      information: [{//所有用户信息列表，这里是写死的，后面需要从数据库读取
        username: 'admin',
        email: 'admin@edu.cn',
        role: '管理员'
      }, {
        username: 'staff',
        email: 'staff@edu.cn',
        role: '普通人员'
      }, {
        username: 'xiaoming',
        email: 'xiaoming@edu.cn',
        role: '普通人员'
      }, {
        username: 'root',
        email: 'root@edu.cn',
        role: '管理员'
      }],
      editDialogVisible: false,
      editedInform: [{
        username: '',
        email: '',
        role: ''
      }],
      currentIndex: 0
    };
  },
  methods: {
    onSubmit() {
      console.log('提交信息');
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
  created(){
    getLabList().then(res => {
      console.log(res);
    })
  }
}

</script>
<style scoped>
.bg{
  position:fixed;
  top:110px;
  left:0;
  z-index:-1;
  overflow:hidden;
  /* background-repeat: no-repeat; */
  background-image: url("../../assets/img/qqq6.png");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.lab-bg{
  height:100%;
  overflow-y: auto;
}
.lab {
  margin-left: 8px;
  width: 45%;
  /* border: 1px solid rgb(255, 255, 255);
  border-radius: 6px; */
  float:left;
}

.authority {
  margin: 8px;
  margin-left:30px;
  /* border: 1px solid rgb(255, 255, 255);
  border-radius: 6px; */
  width: 95%;
  height:500px;
  margin-bottom:30px;
}

.table_auth {
  width: 96%;
  margin: 10px;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 6px;
  margin-bottom:30px;
}

.text-home {
  margin-top: 0px;
  margin-left: 30px;
  line-height: 55px;
  font-size: 20px;
  color:aliceblue;
  background-image: url("../../assets/img/s-titlebg.png");
  background-repeat: no-repeat;
}

.twosheep{
  float:left;
  width:50%;
  height:370px;
  /* border: 1px solid rgb(255, 255, 255);
  border-radius: 6px; */
}
div /deep/ .el-form-item__label{
  color:white;
} 
div /deep/ .el-button.el-button--primary{
  background-color:rgb(186, 137, 223);
  border-color:rgb(186, 137, 223);
} 
div /deep/ .el-button.el-button--default.is-plain{
  text-align: center;
}
</style>