<template>
  <div class="register-container">
    <el-card class="register-card">
      <img src="../../assets/img/return.png" class="el-icon-back" @click="backItem" title="return icon"/>
      <h1 class="register-title" style="margin-bottom:40px;">注册</h1>

      <el-form ref="registerForm" :model="registerData" :rules="rules" class="register-items">
        <div class="column">
        <el-form-item label="用户名" prop="username" >
          <input class="registername" v-model="registerData.username"/>
        </el-form-item>
        <el-form-item label="密 码"  prop="password">
          <input class="registerpwd" type="password" v-model="registerData.password"/>
        </el-form-item>
        <el-form-item label="重复密码 " prop="right">
          <input class="registerpwd" type="password" v-model="registerData.checkPassword"/>
        </el-form-item>
        <el-form-item label="邮箱 " prop="right">
          <input class="registerpwd"  v-model="registerData.email"/>
        </el-form-item>
        <el-form-item label="电话 " prop="right">
          <input class="registerpwd"  v-model="registerData.tel"/>
        </el-form-item>
        </div>
        <div class="column">
        <el-form-item label="机构 " prop="right">
          <input class="registerpwd"  v-model="registerData.company"/>
        </el-form-item>
        <el-form-item label="实验室 " prop="right">
          <input class="registerpwd"  v-model="registerData.labName"/>
        </el-form-item>
        <el-form-item label="职位 " prop="right">
          <input class="registerpwd"  v-model="registerData.job"/>
        </el-form-item>
        <el-form-item label="性别 " prop="right">
          <input class="registerpwd"  v-model="registerData.gender"/>
        </el-form-item>
        <el-form-item label="组长 " prop="right">
          <input class="registerpwd"  v-model="registerData.mentor"/>
        </el-form-item>
        </div>
        <div class="button-container">
        <el-form-item style="text-align:center;margin-top:40px">
          <el-button  type="primary" @click="userRegister('registerForm')">注册</el-button>
          <el-button  @click="userCancel('registerForm')">取消</el-button>
        </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { register } from '../../network/user'
export default {
  data() {
    return {
      //绑定输入框中的数据
      registerData: {
        checkPassword: "",
        company: "",
        email: "",
        gender: "",
        job: "",
        labName: "",
        mentor: "",
        password: "",
        tel: "",
        username: ""
      },
    rules: {
        checkPassword: [
          { required: true, message: "请填写密码核对", trigger: "blur" },
        ],
        company: [
          { required: true, message: "请填写机构名称", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请填写邮件", trigger: "blur" },
        ],
        gender: [
          { required: true, message: "请填写性别", trigger: "blur" },
        ],
        job: [
          { required: true, message: "请填写职业", trigger: "blur" },
        ],
        labName: [
          { required: true, message: "请填写实验室名称", trigger: "blur" },
        ],
        mentor: [
          { required: true, message: "请填写组长", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请填写电话", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请填写用户名", trigger: "blur" },
        ],
      },
    value: '', //输入框身份信息
    };
  },
  methods: {
    userRegister(registerForm) {
      this.$refs[registerForm].validate((valid) => {
        if (valid) {
          register(
            this.registerData.checkPassword,
            this.registerData.company,
            this.registerData.email,
            this.registerData.gender,
            this.registerData.job,
            this.registerData.labName,
            this.registerData.mentor,
            this.registerData.password,
            this.registerData.tel,
            this.registerData.username
          )
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.error(error);
            });
          alert("注册成功!");
          this.$router.push('/login')
        } else {
          alert("请填写完整");
        }
      });
    },
    userCancel() {
      this.$refs[registerForm].reset(); // 重置表单
    },
    backItem() {
      this.$router.push('/login')
    }
  },

};
</script>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button-container {
  text-align: center;
  margin-top: 20px;
}
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
  left: 50%;
  top:50%;
  transform: translate(-50%, -50%);
  margin:auto; 
  background-color:#fff;
  opacity: 0.75;
  border:2px solid rgba(255,255,255,.5);
  backdrop-filter: blur;
  width:900px;
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
.register-items{
  display: flex;
  justify-content: center;
}
.registerpwd {
  border:none;
  border-bottom-width: 2.3px;
  border-bottom-color:rgb(57, 127, 233);
  border-bottom-style: solid;
  height:25px;

  display: inline-block; /* 使用内联块元素布局 */
  margin-right: 5%; /* 为表单项之间添加一些右边距 */
  vertical-align: top; /* 垂直对齐到顶部 */
  box-sizing: border-box; /* 让元素的宽度包括边框和填充 */
  width: calc(50% - 10px); /* Two columns, each with 50% width minus the gap */
  margin: 0 5px;
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