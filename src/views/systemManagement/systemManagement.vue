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
    <div class="role">
      角色管理
    </div>
    <div class="authority">
      权限管理
      <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column label="账号" prop="account">
        </el-table-column>
        <el-table-column label="用户名" prop="username">
        </el-table-column>
        <el-table-column label="用户邮箱" prop="email">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">普通人员</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">管理员</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="account">
      账号管理
    </div>

  </div>
</template>

<script>

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
      tableData: [{
        account: 'admin',
        username:'admin',
        email: 'admin@edu.cn',
      }, {
        account: 'admin',
        username:'admin',
        email: 'admin@edu.cn',
      }, {
        account: 'admin',
        username:'admin',
        email: 'admin@edu.cn',
      }, {
        account: 'admin',
        username:'admin',
        email: 'admin@edu.cn',
      }],
      search: ''
    };
  },
  methods: {
    onSubmit() {
      console.log('提交信息');
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
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
</style>