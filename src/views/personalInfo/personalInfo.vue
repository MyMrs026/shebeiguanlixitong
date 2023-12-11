<template>
  <div class="outer-container">
    <div class="bg-person">
      <h3>个人信息</h3>
      <el-tabs type="border-card">
        <!-- 分页1.基本资料 -->
        <el-tab-pane label="基本资料">
          <el-form ref="userForm" :model="user" label-width="80px">
            <el-form-item label="用户名">
              <el-input
                v-model="user.username"
                :disabled="!editMode.username"
                class="user-input"
              />
              <!-- <el-button @click="toggleEditMode('username')" v-if="!editMode.username">修改</el-button> -->
            </el-form-item>
            <el-form-item label="电话">
              <el-input
                v-model="user.tel"
                :disabled="!editMode.tel"
                class="user-input"
              />
              <el-button @click="toggleEditMode('tel')" v-if="!editMode.tel"
                >修改</el-button
              >
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input
                v-model="user.email"
                :disabled="!editMode.email"
                class="user-input"
              />
              <el-button @click="toggleEditMode('email')" v-if="!editMode.email"
                >修改</el-button
              >
            </el-form-item>
            <el-form-item label="机构">
              <el-input
                v-model="user.company"
                :disabled="!editMode.company"
                class="user-input"
              />
              <el-button
                @click="toggleEditMode('company')"
                v-if="!editMode.company"
                >修改</el-button
              >
            </el-form-item>
            <el-form-item label="职业">
              <el-input
                v-model="user.job"
                :disabled="!editMode.job"
                class="user-input"
              />
              <el-button @click="toggleEditMode('job')" v-if="!editMode.job"
                >修改</el-button
              >
            </el-form-item>
            <el-form-item label="实验室">
              <el-input
                v-model="user.labName"
                :disabled="!editMode.labName"
                class="user-input"
              />
              <el-button
                @click="toggleEditMode('labName')"
                v-if="!editMode.labName"
                >修改</el-button
              >
            </el-form-item>
            <el-form-item label="性别">
              <el-input
                v-model="user.gender"
                :disabled="!editMode.gender"
                class="user-input"
              />
              <el-button
                @click="toggleEditMode('gender')"
                v-if="!editMode.gender"
                >修改</el-button
              >
            </el-form-item>
            <el-button @click="saveUser('userForm')">保存</el-button>
          </el-form>
        </el-tab-pane>

        <!-- 分页2.修改密码 -->
        <el-tab-pane label="修改密码">
          <el-form
            :model="pwdForm"
            status-icon
            :rules="rules"
            ref="pwdForm"
            label-width="100px"
            class="demo-pwdForm"
          >
            <el-form-item label="旧密码" prop="pass">
              <el-input
                type="password"
                v-model="pwdForm.oldpass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input
                type="password"
                v-model="pwdForm.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="pwdForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('pwdForm')"
                >提交</el-button
              >
              <el-button @click="resetForm('pwdForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 分页3.更换绑定邮箱 -->
        <el-tab-pane label="更换绑定邮箱">
          <div>
            <input type="text" v-model="oldEmail" placeholder="旧邮箱" />
            <input type="text" v-model="newEmail" placeholder="新邮箱" />
            <button @click="sendVerificationCode">发送验证码邮件</button>
            <input
              type="text"
              v-model="verificationCode"
              placeholder="验证码"
            />
            <button @click="changeEmail">更换验证</button>
          </div>
        </el-tab-pane>
        <!-- 分页4.账号注销 -->
        <el-tab-pane label="账号注销">
          <button @click="logout">注销</button>
        </el-tab-pane>
        <!-- 分页5.查看账单 -->
        <el-tab-pane label="账单">
         <billVue/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { updateLoginUser, getLoginUserInfo } from "../../network/user";
import billVue from '../bill/bill.vue';
export default {
  components:{
    billVue
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.pwdForm.checkPass !== "") {
          this.$refs.pwdForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pwdForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      oldEmail: "",
      newEmail: "",
      verificationCode: "",
      selectedFile: null, // 存储已选择的文件
      // user:[],//temp
      editMode: {
        //用户信息进入修改模式
        username: false,
        tel: false,
        email: false,
        company: false,
        job: false,
        labName: false,
        gender: false,
      },
      user: {}, // 保存原始用户数据
      pwdForm: {
        oldpass: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    toggleEditMode(field) {
      this.editMode[field] = true;
      // this.user[field] = this.editeduser[field];
    },
    saveUser(user) {
      this.$refs[user].validate((valid) => {
        if (valid) {
          const updatedUser = {
            company: this.user.company,
            email: this.user.email,
            gender: this.user.gender,
            job: this.user.job,
            labName: this.user.labName,
            tel: this.user.tel,
            username: this.user.username,
          };
          this.user = updatedUser;
          updateLoginUser({
            company: this.user.company,
            email: this.user.email,
            gender: this.user.gender,
            job: this.user.job,
            labName: this.user.labName,
            tel: this.user.tel,
            username: this.user.username,
          })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.error(error);
            });
          alert("提交成功!");
        } else {
          alert("请填写完整");
        }
      });
      console.log("保存用户信息:", this.user);
    },
    handleChange(value) {
      console.log(value);
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0]; // 将选择的文件存储在selectedFile中
    },
    uploadAvatar() {},
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    sendVerificationCode() {
      // 在这里调用后端接口发送短信验证码
      // 需要将this.oldEmail作为参数传递给后端接口
      // 示例代码（使用axios发送POST请求，假设接口为/api/send-verification-code）
      // axios.post('/api/send-verification-code', { Email: this.oldEmail }).then(() => {
      //   // 发送成功的处理逻辑
      // }).catch(() => {
      //   // 发送失败的处理逻辑
      // });
    },
    changeEmail() {
      // 在这里调用后端接口验证短信验证码，并更换手机号码
      // 需要将this.oldEmail、this.newEmail和this.verificationCode作为参数传递给后端接口
      // 示例代码（使用axios发送POST请求，假设接口为/api/change-phone-number）
      // axios.post('/api/change-phone-number', {
      //   oldEmail: this.oldEmail,
      //   newEmail: this.newEmail,
      //   verificationCode: this.verificationCode,
      // }).then(() => {
      //   // 更换成功的处理逻辑
      // }).catch(() => {
      //   // 更换失败的处理逻辑
      // });
    },
    logout() {
      // 执行注销逻辑
      // 清除用户登录状态，例如从本地存储或会话中删除存储的用户凭证
      // 执行其他必要的清理操作

      // 跳转到登录页面
      this.$router.push("/login");
    },
    billPage() {

    }
  },
  mounted() {
    getLoginUserInfo().then((res) => {
      this.user = res.data;
      console.log(this.user);
    });
  },
};
</script>
<style scoped>
.user-input {
  width: 200px;
}
.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 100%视口高度，垂直居中 */
  max-width: 1500px; /* 设置最大宽度 */
  margin: 0 auto; /* 居中 */
}
.bg-person {
  display: flex;
  flex-direction: column;
  /* background-image: url("../../assets/img/qqq6.png"); */
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
</style>