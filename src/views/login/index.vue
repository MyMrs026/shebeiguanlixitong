<template>
  <div class="max">
    <div class="animate__animated animate__backInDown">
      <div class="login">
        <div class="title">
          <h3>微纳加工平台</h3>
        </div>
        <br />
        <form @submit="login">
          <div style="text-align: center">
            <img
              src="../../assets/img/my.png"
              title="user icon"
              style="width: 40px; height: 40px"
            />
            <input
              id="username"
              placeholder="请输入邮箱"
              type="text"
              v-model="username"
              required
              autocomplete="username"
            />
          </div>
          <br />
          <div style="text-align: center">
            <img
              src="../../assets/img/pwd.png"
              title="pwd icon"
              style="width: 40px; height: 40px"
            />
            <input
              id="password"
              placeholder="请输入密码"
              type="password"
              v-model="password"
              required
              autocomplete="password"
            />
          </div>
          <br />
          <div style="text-align: center">
            <!-- <img src="../../assets/img/rights.png" title="rights icon" style="width:40px;height:40px"/> -->
            <!-- <select id="select" v-model="value">
          <option disabled selected>请选择您的身份</option>
          <option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </option>
        </select> -->
          </div>
          <br /><br />
          <div style="text-align: center">
            <el-button @click="login" id="button-3">登&nbsp;&nbsp;录</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button @click="register" id="button-4"
              >注&nbsp;&nbsp;册</el-button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 登录逻辑在这里写
 */
import { login, getLoginUserRole } from "../../network/user"; //获取所有用户信息
export default {
  data() {
    return {
      username: "", //与用户名输入框进行v-model绑定
      password: "", //与密码输入框进行v-model绑定
      loginFlag: false,
      userrole: "",
    };
  },
  methods: {
    login(event) {
      // 方法是 JavaScript 中一个常用的事件方法，它用于阻止事件的默认行为或默认操作发生。当事件发生时，通常会触发一些默认行为，例如点击链接时会跳转到链接的URL，提交表单时会发送表单数据到服务器，按下键盘的 Enter 键时可能会触发表单的提交等。
      event.preventDefault();
      if (this.username == "" || this.password == "") {
        alert("请输入完整！");
      } else {
        login(this.username, this.password)
          .then((res) => {
            console.log(res);
            // this.$router.push("/home");
            if (res.code === 3003) {
              alert("账号密码错误，验证失败请重新尝试");
            } else if (res.code === 2002) {
              alert("登录成功");
              const token = res.data;
              localStorage.setItem("token", token);
              console.log("token", token);
              this.$router.push("/home");

              //获取登录用户角色
              getLoginUserRole().then((res) => {
                // console.log(res.data);
                this.userrole = res.data;
                console.log(this.userrole);
                if (this.userrole === "1") {
                this.updateCurole("admin");
              } else {
                this.updateCurole("staff");
              }
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      this.username = "";
      this.password = "";
    },
    //跳转到注册界面
    register(event) {
      event.preventDefault();
      this.$router.push("/register");
    },
    //生成token令牌
    generateToken() {
      return Math.random().toString(36).substr(2);
    },
    //将vuex中用于用户登录状态保存的变量进行改变
    updateCurole(value) {
      this.$store.commit("setCurole", value);
    },
  },
  created() {
    // 页面创建完的时候就读取到了所有的用户信息
    // getUserList().then( res => { //调用axios中所有get方法时候都这样写
    //   this.userList = res.data
    //   console.log(this.userList)
    // })
  },
};
</script>
<style scoped >
.max {
  background: url("../../assets/img/loginbg1.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.login {
  position: absolute;
  border-radius: 10px;
  padding: 40px;
  left: 70%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  background-color: #fff;
  opacity: 0.75;
  border: 2px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur;
  width: 400px;
  height: 500px;
}
.title {
  align-items: center;
  text-align: center;
  height: 50px;
  margin: 20px;
  margin-bottom: 30px;
}
.login-form {
  margin: 10px;
}

#button-3 {
  position: relative;
  border: none;
  padding: 15px;
  box-shadow: 0 5px 15px -5px rgba(#fccf31, 0.8);
  background-image: linear-gradient(135deg, #fab14a 10%, #e857bc 100%);
  border-radius: 5px;
  cursor: pointer;
  color: rgb(42, 42, 42);
}

#button-3::before {
  opacity: 0.5;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 101%;
  height: 101%;
  transition: 400ms ease;
  background-image: linear-gradient(135deg, #f4b14a 10%, #e857bc 100%);
  border-radius: 5px;
  transform-origin: left center;
  color: rgb(42, 42, 42);
}

#button-3:hover {
  opacity: 0.5;
  color: rgb(42, 42, 42);
}

#button-4 {
  position: relative;
  border: none;
  padding: 15px;
  box-shadow: 0 5px 15px -5px rgba(#fccf31, 0.8);
  background-image: linear-gradient(135deg, #5fd1ff 10%, #a235ca 100%);
  background-color: #fefefe;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  color: rgb(42, 42, 42);
}

#button-4::before {
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  transition: 600ms ease;
  background-image: linear-gradient(135deg, #5fd1ff 10%, #a235ca 100%);
  border-radius: 50%;
  transform-origin: center;
  color: rgb(42, 42, 42);
}

#button-4:hover {
  opacity: 0.5;
  color: rgb(42, 42, 42);
}

#username {
  border: none;
  border-bottom-width: 2.3px;
  border-bottom-color: rgb(57, 127, 233);
  border-bottom-style: solid;
  height: 35px;
  outline: none;
  width: 205px;
}

#password {
  border: none;
  border-bottom-width: 2.3px;
  border-bottom-color: rgb(57, 127, 233);
  border-bottom-style: solid;
  height: 35px;
  outline: none;
  width: 205px;
}

#select {
  border: none;
  border-bottom-width: 2.3px;
  border-bottom-color: rgb(57, 127, 233);
  border-bottom-style: solid;
  background: #fff;
  height: 35px;
  outline: none;
  width: 205px;
}
</style>