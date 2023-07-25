<template>
  <div>
    <div class="lab">
      实验室信息管理
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
    <div class="authority">
      <p class="label-auth">权限管理</p>
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
      <el-button plain>
        保存更改
      </el-button>
      <el-dialog title="编辑人员信息" :visible.sync="editDialogVisible">
        <el-form v-model="editedInform" label-width="80px">
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
</template>

<script>
import { getLabList } from '../../network/labtory';

export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
        layout: '',
      },
      information: [{
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
.lab {
  margin-left: 8px;
  width: 60%;
  border: 1px solid black;
  border-radius: 6px;
}

.authority {
  margin: 8px;
  border: 1px solid black;
  border-radius: 6px;
  width: 60%;
}

.label-auth {
  margin: 4px;
}

.table_auth {
  width: 90%;
  margin: 4px;
  border: 1px solid black;
  border-radius: 6px;
}
</style>