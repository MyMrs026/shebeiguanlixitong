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
                        <img src="../../assets/img/my.png" title="user icon" style="width: 40px; height: 40px" />
                        <input id="password" placeholder="请输入电话" type="text" v-model="tel" required
                            autocomplete="tel" />
                    </div>
                    <br />
                    <div style="text-align: center">
                        <img src="../../assets/img/pwd.png" title="pwd icon" style="width: 40px; height: 40px" />
                        <input id="password" placeholder="请输入密码" type="password" v-model="password" required
                            autocomplete="password" />
                    </div>               
                    <br /><br />
                    <div style="text-align: center">
                        <el-button @click="login" id="button-3">登&nbsp;&nbsp;录</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button @click="register" id="button-4">注&nbsp;&nbsp;册</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button @click="guestlogin" id="button-3" this.tel="100000" this.password="guest">游客登录</el-button>
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
            tel: "", //与用户名输入框进行v-model绑定
            password: "", //与密码输入框进行v-model绑定
            loginFlag: false,
            userrole: "",
        };
    },
    methods: {
        //普通用户登录
        login(event) {
            // 方法是 JavaScript 中一个常用的事件方法，它用于阻止事件的默认行为或默认操作发生。当事件发生时，通常会触发一些默认行为，例如点击链接时会跳转到链接的URL，提交表单时会发送表单数据到服务器，按下键盘的 Enter 键时可能会触发表单的提交等。
            event.preventDefault();
            if (this.tel == "" || this.password == "") {
                alert("请输入完整！");
            } else {
                login(this.tel, this.password)
                    .then((res) => {
                        console.log(res);
                        if (res.code === 3003) {
                            this.$message({
                                message: '账号密码错误，验证失败请重新尝试',
                                type: 'error'
                            });
                        } else if (res.code === 2002) {
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
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
            this.tel = "";
            this.password = "";
        },

        //游客登陆
        guestlogin(event) {
            // 方法是 JavaScript 中一个常用的事件方法，它用于阻止事件的默认行为或默认操作发生。当事件发生时，通常会触发一些默认行为，例如点击链接时会跳转到链接的URL，提交表单时会发送表单数据到服务器，按下键盘的 Enter 键时可能会触发表单的提交等。
            event.preventDefault();
                login("100000", "guest")
                    .then((res) => {
                        console.log(res);
                        if (res.code === 3003) {
                            this.$message({
                                message: '账号密码错误，验证失败请重新尝试',
                                type: 'error'
                            });
                        } else if (res.code === 2002) {
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
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
            this.tel = "";
            this.password = "";
        },
        //跳转到注册界面
        register(event) {
            event.preventDefault();
            this.$router.push("/register");
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
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}

.login {
    position: absolute;
    border-radius: 10px;
    padding: 40px;
    left: 50%;
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