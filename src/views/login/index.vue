<template>
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
      <div style="text-align: left;">
        <el-select style="width: 200px;" v-model="value" placeholder="请选择您的身份">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>

      <br>
      <div style="text-align: left;"> 
        <el-button @click="login" plain>登&nbsp&nbsp录</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button @click="register" plain>注&nbsp&nbsp册</el-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usernanadaome: '',
      password: '',
      options: [{
        value: '选项1',
        label: '普通人员'
      }, {
        value: '选项2',
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

      if (this.username === validUsername && this.password === validPassword) {
        // 登录成功，跳转到 home 页面
        this.$router.push('/home');
      } else {
        // 登录失败，进行相应的处理，比如显示错误消息
        alert('Invalid credentials. Please try again.');
      }

      // 清空输入框
      this.username = '';
      this.password = '';
    },
    register(event){
      event.preventDefault();
      this.$router.push('/register');
    }
  }
}
</script>
<style scoped>
.login {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title {
  align-items: center;
  text-align: center;
  height: 80px;
}

.login-form {
  margin: 10px;
}
</style>