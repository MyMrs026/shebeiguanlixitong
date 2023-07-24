<template>
  <div class="register-container">
    <el-card class="register-card">
      <i class="el-icon-back" @click="backItem"></i>
      <h1 class="register-title">注册</h1>
      <el-form ref="registerForm" :model="registerData">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerData.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerData.password"></el-input>
        </el-form-item>

        <el-select v-model="value" placeholder="请选择" style="margin-bottom:20px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerData: {
        username: '',
        password: '',
      },
      options:[{
        value:'管理员',
        label:'管理员'
      },{
        value:'普通人员',
        label:'普通人员'
      },
    ],
    value: '',
    };
  },
  methods: {
    register() {
      // 注册逻辑
    },
    cancel() {
      // 取消逻辑
    },
    backItem() {
      this.$router.push('/login')
    }
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("../../assets/img/loginbg1.jpg");
  width:100%;
  position:fixed;
  background-size:100% 100%;
}

.register-card {
  position: absolute;
  border-radius:10px;
  padding:30px;
  left: 70%;
  top:50%;
  transform: translate(-50%, -50%);
  margin:auto; 
  background-color:#fff;
  opacity: 0.85;
  border:2px solid rgba(255,255,255,.5);
  backdrop-filter: blur;
  width:400px;
  height:500px;

}

.register-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.button-back {
  font-size: 14px;
  width: 30px;
  height: 30px;
  text-align: center;
}


.button-back .el-icon {
  vertical-align: middle;
}
</style>