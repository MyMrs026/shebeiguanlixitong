<template>
  <div class="max">
    <div class="animate__animated animate__backInDown">
      <div class="login">
        <div class="title">
          <h3>***研究机构</h3>
        </div>
      <form @submit="login">
        <div style="text-align: center;">
          <label for="username">用户名:</label>
          <input id="username" placeholder="请输入用户名" type="text" v-model="username" required>
        </div>
        <br>
        <div style="text-align: center;">
          <label for="password">密&nbsp&nbsp&nbsp码:</label>
          <input id="password" placeholder="请输入密码" type="password" v-model="password" required>
        </div>
        <br>
      <div style="text-align: center;">
        <el-select style="width: 200px;" v-model="value" placeholder="请选择您的身份">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <br>
      <div style="text-align: center;"> 
        <el-button @click="login" plain>登&nbsp&nbsp录</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button @click="register" plain>注&nbsp&nbsp册</el-button>
      </div>
    </form>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      identity: '',
      options: [{
        value: 'staff',
        label: '普通人员'
      }, {
        value: 'admin',
        label: '管理人员'
      }],
      value: '',
    };
  },
  methods: {
    login(event) {
      event.preventDefault();

      // 在这里进行账号密码验证
      const validUsername = 'admin';
      const validPassword = 'admin';
      const validUsername1 = 'staff';
      const validPassword1 = 'staff';
      if (this.username === validUsername && this.password === validPassword && (this.value == 'admin')) {
        // 登录成功，跳转到 home 页面
        this.$router.push('/home');
        // console.log("进入主页");
        console.log(this.value);
      } else if (this.username === validUsername1 && this.password === validPassword1 && (this.value == 'staff')) {
        this.$router.push('/project');
      } else if (this.username == '' || this.password == '' || this.value == '') {
        alert('请输入完整。');
      } else {
        // 登录失败，进行相应的处理，比如显示错误消息
        alert('账户或密码错误，验证失败请重新尝试。');
      }

      // 清空输入框
      this.username = '';
      this.password = '';
    },
    register(event) {
      event.preventDefault();
      this.$router.push('/register');
    }
  }
}
</script>
<style scoped>
.max {
  background: url("../../assets/img/loginbg1.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
.login {
  position: fixed;
  border-radius:10px;
  padding:20px;
  left: 70%;
  transform: translate(-50%, -50%);
  margin:325px auto;
  background-color:#fff;
  opacity: 0.7;
  border:2px solid rgba(255,255,255,.5);
  backdrop-filter: blur;
  width:400px;
  height:500px;
}
.title {
  align-items: center;
  text-align: center;
  height: 80px;
  margin:30px
}
.login-form {
  margin: 10px;
}
</style>