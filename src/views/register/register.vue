<template>
  <div class="register-container">
    <el-card class="register-card">
      <img src="../../assets/img/return.png" class="el-icon-back" @click="backItem" title="return icon" ></img>
      <h1 class="register-title" style="margin-bottom:40px;">注册</h1>
      <el-form ref="registerForm" :model="registerData">
        <img src="../../assets/img/my.png" title="user icon" style="width:40px;height:40px;float:left;"></img> 
        <el-form-item label="用户名" prop="username" >
          <input class="registername" v-model="registerData.username"></input>
        </el-form-item>
        <img src="../../assets/img/pwd.png" title="pwd icon" style="width:40px;height:40px;float:left"></img>
        <el-form-item label="密 码"  prop="password">
          <input class="registerpwd" type="password" v-model="registerData.password"></input>
        </el-form-item>
        <img src="../../assets/img/rights.png" title="rights icon" style="width:40px;height:40px;float:left"></img>
        <el-form-item label="权 限 " prop="right">
        <select class="registerselect" v-model="value"  style="margin-bottom:10px">
          <option id="r" v-model="value" disabled selected key="id">请选择您的身份</option>
          <option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </option>
        </select>
        </el-form-item>
        <el-form-item style="text-align:center;margin-top:40px">
          <el-button  type="primary" @click="register">注册</el-button>
          <el-button  @click="cancel">取消</el-button>
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
  padding-top:50px;
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

.el-icon-back {
  vertical-align: middle;
  width:25px;height:25px;
  margin:5px;
  float:left
}

.registername {
  border:none;
  border-bottom-width: 2.3px;
  border-bottom-color:rgb(57, 127, 233);
  border-bottom-style: solid;
  height:35px;
  outline:none;
}

.registerpwd {
  border:none;
  border-bottom-width: 2.3px;
  border-bottom-color:rgb(57, 127, 233);
  border-bottom-style: solid;
  height:35px;
  outline:none;
  margin-left:10px;
}

.registerselect {
  border:none;
  border-bottom-width: 2.3px;
  border-bottom-color:rgb(57, 127, 233);
  border-bottom-style: solid;
  background: #fff;
  height:35px;
  outline:none;
  width: 185px;
  margin-left:10px;
}
</style>