<template>
  <div>
    <h3>个人信息</h3>
    <el-tabs type="border-card">
    <el-tab-pane label="基本资料">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" style="width:600px">
        <el-form-item label="昵称">
            <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="地区">
            <el-cascader clearable
                v-model="formLabelAlign.region"
                :options="options"
                @change="handleChange">
            </el-cascader>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="formLabelAlign.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="保密"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :rules="[
      { message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]">
            <el-input v-model="formLabelAlign.email"></el-input>
        </el-form-item>
        <br><br>
        <el-button>保存</el-button>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="修改头像">
      <div>
        <input type="file" @change="handleFileChange" accept="image/*" />
        <button @click="uploadAvatar">上传头像</button>
        <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="修改密码">
      <el-form :model="pwdForm" status-icon :rules="rules" ref="pwdForm" label-width="100px" class="demo-pwdForm">
        <el-form-item label="旧密码" prop="pass">
            <el-input type="password" v-model="pwdForm.oldpass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="pwdForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="pwdForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('pwdForm')">提交</el-button>
            <el-button @click="resetForm('pwdForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="更换绑定邮箱">
        <div>
            <input type="text" v-model="oldEmail" placeholder="旧邮箱" />
            <input type="text" v-model="newEmail" placeholder="新邮箱" />
            <button @click="sendVerificationCode">发送验证码邮件</button>
            <input type="text" v-model="verificationCode" placeholder="验证码" />
            <button @click="changeEmail">更换验证</button>
        </div>
    </el-tab-pane>
    <el-tab-pane label="账号注销">
      <button @click="logout">注销</button>
    </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>

export default {
  data(){
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.pwdForm.checkPass !== '') {
            this.$refs.pwdForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.pwdForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    };
    return {
      oldEmail: '',
      newEmail: '',
      verificationCode: '',
      selectedFile: null, // 存储已选择的文件
       // 头像的URL
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      labelPosition: 'right',
      formLabelAlign: {
          name: '',
          region: [],
          gender:'',
          email: ''
        },
        options: [{
          value: 'beijing',
          label: '北京',
          children: [{
            value: 'dongchengqu',
            label: '东城区',
          }, {
            value: 'xichengqu',
            label: '西城区',
          }]
        }, {
          value: 'shanghai',
          label: '上海',
          children: [{
            value: 'huangpuqu',
            label: '黄浦区',
          }, {
            value: 'xuhuiqu',
            label: '徐汇区',
            
          }, {
            value: 'jinganqu',
            label: '静安区',
          },]
        }, {
          value: 'guangzhou',
          label: '广州',
          children: [{
            value: 'liwanqu',
            label: '荔湾区'
          }, {
            value: 'yuexiuqu',
            label: '越秀区'
          }, {
            value: 'haizhuqu',
            label: '海珠区'
          }]
        }],
        pwdForm: {
          oldpass:'',
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
  },
  methods:{
    handleChange(value) {
        console.log(value);
      },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0]; // 将选择的文件存储在selectedFile中
    },
    uploadAvatar() {

    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
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
      this.$router.push('/login');
    }
  },
  
}

</script>
<style scoped>

</style>