<template>
  <div class="bgpic">
    <div class="button-area">
      <router-link to="/equp">
        <el-button plain>设备管理</el-button>
      </router-link>
      <router-link to="/craft/equcraft">
        <el-button plain>设备信息展示</el-button>
      </router-link>
    </div>
    <p class="text-title">{{ message }}</p>
    <!-- 设备列表页面有两个部分组成 -->
    <!-- 设备工艺表格 -->
    <div>
      <ul class="table-equcraft-use">
        <li
          class="equ-item"
          v-for="(equipment,index) in equinform"
          :key="equipment.id"
        >
          <img
            v-bind:src="equipment.equipmentImageUrl"
            style="width: 100%; height: 100%; float: left; max-height: 200px"
            @click="gotoDeviceDetail(equipment.equipmentId)"
          />
          设备名称：{{ equipment.equipmentName }}
          <br />
          <router-link to="/book">
            <el-button
              type="primary"
              plain
              size="small"
            >立即预约</el-button>
          </router-link>
          <router-link to="/test">
            <el-button
              type="primary"
              plain
              size="small"
            >立即测试</el-button>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="pagination">
      <span>
        <el-button
          round
          @click="goToFirstPage"
          :disabled="currentPage === 1"
        >
          第一页
        </el-button>
      </span>
      <span>
        <el-button
          round
          @click="previousPage"
          :disabled="currentPage === 1"
        >
          前一页
        </el-button>
      </span>
      <span>
        <el-button
          round
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          下一页
        </el-button>
      </span>
      <span>
        <el-button
          round
          @click="goToLastPage"
          :disabled="currentPage === totalPages"
        >
          最后
        </el-button>
      </span>
      <span>
        &nbsp;&nbsp;&nbsp;&nbsp;跳转到第：
        <el-input
          type="text"
          v-model.number="goToPageNumber"
          style="width: 80px"
        />
        <el-button
          type="success"
          @click="goToPage"
          round
          style="margin-left: 10px"
        >确定</el-button>
      </span>
    </div>
    <hr style="
        display: flex;
        border: 5px solid white;
        margin-left: apiUrl10px;
        margin-right: 10px;
      " />
    <!-- 设备工艺设置，只在登录用户为管理员时显示 -->
    <div style="width: 100%">
      <div class="p-device">
        <!-- <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :action=apiUrl
          :headers="customHeaders"
          :on-success="showPic"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload> -->
        <!-- <img src="../../assets/img/p-device.png" /> -->
      </div>
      <!-- <div
        class="form-equcraft-use"
        v-if="this.$store.state.cu_role === 'admin'"
      >
        <p class="text-title">设置设备工艺</p>
        <el-form
          class="form-equcraft"
          label-width="100px"
          :model="equCraftForm"
          ref="equCraftForm"
          :rules="rules"
        >
          <el-form-item
            label="设备名称"
            prop="deviceName"
          >
            <el-select
              v-model="value"
              placeholder="请选择"
              style="width: 300px"
            >
              <el-option
                v-for="item in device_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="设备型号"
            prop="deviceType"
          >
            <el-input
              v-model="equCraftForm.deviceType"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="设备尺寸"
            prop="size"
          >
            <el-input
              v-model="equCraftForm.size"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="设备重量"
            prop="weight"
          >
            <el-input
              v-model="equCraftForm.weight"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="设备功率"
            prop="power"
          >
            <el-input
              v-model="equCraftForm.power"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              plain
              @click="submitForm('equCraftForm')"
            >提交</el-button>
            <el-button @click="resetForm('equCraftForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div> -->
    </div>
  </div>
</template>
<script>
import { getDeviceImage } from "../../network/file";
import { getEquList } from "../../network/equpment";
import { uploadImage } from '../../network/file';
/**
 * 工艺管理页面中的设备工艺子页面
 */
export default {
  data() {
    return {
      equinform: [],
      currentDate: new Date(),
      message: "设备工艺展示",
      apiUrl : "http://47.98.160.222:8080/api/file/uploadImage",
      imageUrl: "",
      customHeaders: {
        'Authorization':localStorage.getItem('token')
      },
      //equCrafts: [], //目前从vuex中写死，后续从axios中导入
      currentPage: 1, //当前页数
      perPage: 8, //每页显示的数据数量
      goToPageNumber: "", //跳转到指定页数的输入
      equCraftForm: {
        //表单中的内容传入到这
        deviceName: "",
        deviceType: "",
        size: "",
        weight: "",
        power: "",
      },
      device_options: [
        //目前写死，后期也是从数据库中导入
        {
          value: "选项1",
          label: "ASE",
        },
        {
          value: "选项2",
          label: "OEA",
        },
        {
          value: "选项3",
          label: "DTP",
        },
        {
          value: "选项4",
          label: "MKI",
        },
        {
          value: "选项5",
          label: "OSD",
        },
      ],
      value: "", //绑定设备的名称
      urls: [
        { url: require("../../assets/img/device2.jpg") },
        { url: require("../../assets/img/device3.jpg") },
        { url: require("../../assets/img/device1.jpg") },
        { url: require("../../assets/img/device4.jpg") },
      ],
      rules: {
        deviceName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
        ],
        deviceType: [
          { required: true, message: "请输入设备型号", trigger: "blur" },
        ],
        size: [{ required: true, message: "请输入设备尺寸", trigger: "blur" }],
        weight: [
          { required: true, message: "请输入设备重量", trigger: "blur" },
        ],
        power: [{ required: true, message: "请输入设备功率", trigger: "blur" }],
      },
    };
  },
  methods: {
    // async uploadImage(res, file) {
    //     this.imageUrl = URL.createObjectURL(file.raw);
    //     try {
    //     const result = await fetch(apiUrl, {
    //       method: 'POST',
    //       body: file.raw,
    //     });
    //     const data = await result.json();
    //     // 根据需要处理响应数据
    //   } catch (error) {
    //     throw error; 
    //   }
    // },
    showPic(res,file){  
        //console.log(res.data);
        this.imageUrl = URL.createObjectURL(file.raw)
    },

   
    gotoDeviceDetail(index) {
      this.$router.push({ path: `/device/${index}` });
      //console.log(index);
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //成功提交
          console.log("提交成功");
          location.reload();
        } else {
          alert("请填写完整");
          location.reload();
          return false;
        }
      });
    },
    resetForm(equCraftForm) {
      this.$refs[equCraftForm].resetFields();
    },
    // 分页逻辑
    updatePagination() {
      this.currentPage = 1;
    },
    goToFirstPage() {
      this.currentPage = 1;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToLastPage() {
      this.currentPage = this.totalPages;
    },
    goToPage() {
      const pageNumber = parseInt(this.goToPageNumber);
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
      this.goToPageNumber = "";
    },
  },
  computed: {
    paginatedData() {
      const data = this.equinform;
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return data.slice(startIndex, endIndex);
    },
    totalPages() {
      const data = this.equinform;
      return Math.ceil(data.length / this.perPage);
    },
  },
  created() {
    //此处写的应该是axios传出来的promise函数，参照其他文件
    // this.equCrafts = this.$store.state.equCrafts;
    //console.log(this.equCrafts);
    //console.log(this.customHeaders);
  },
  mounted() {
    // getDeviceList().then(res=>{
    //   this.devices = res.data;
    //   console.log(this.devices);
    // })
    // 在组件挂载后，调用 getDeviceImage 函数来获取设备图片
    // this.fetchDeviceImage();
    getEquList().then((res) => {
      this.equinform = res.data;
      console.log(this.equinform);
    });
  },
};
</script>
<style scope>
.bgpic {
  overflow: auto;
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  width: 100%;
  background-size: 100% 100%;
}

.button-area {
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
}

.text-title {
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  margin-left: 50px;
  line-height: 55px;
  font-size: 20px;
  width: 30%;
}
.table-equcraft-use {
  display: flex;
  flex-direction: row;
  /* align-items: center;
  justify-content: flex-start; */
  flex-wrap: wrap;
  margin-left: 50px;
  /* margin-right:50px; */
  /* gap:40px; */
}
.equ-item {
  flex: 0 0 calc(25% - 20px); /* 让每个元素占据1/3的宽度，减去一些间距 */
  margin-right: 20px; /* 可以根据需要添加间距 */
  margin-bottom: 20px; /* 用于在垂直方向上添加间距 */
  box-sizing: border-box; /* 确保元素的边框和内边距不会使它们超出指定的宽度 */
  background-color: white; /* 设置背景颜色为白色 */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  padding: 10px; /* 可以根据需要调整内边距 */
  border-radius: 10px; /* 添加圆角效果，可以根据需要调整 */
  /* 添加其他样式，例如边框 */
  border: 1px solid #ccc; /* 添加边框 */
  padding-bottom: 30px;
}
.equ-item + .equ-item {
  border-color: transparent; /* 隐藏相邻部分之间的边框 */
}
.table-equcraft {
  width: auto;
  height: auto;
  /* border: 1px solid #fff; */
  /* box-shadow: 1px 1px 1px #fff; */
  margin: 0 auto;
  font-size: 1rem;
  font-family: w95fa;
}
.p-device {
  width: 40%;
  float: left;
  height: 400px;
  margin-left: 50px;
  margin-right: 50px;
}
.form-equcraft-use {
  width: 40%;
  float: left;
  margin-left: 50px;
}
.form-equcraft {
  margin-left: 50px;
}
.form-equcraft label {
  font-size: 1rem;
  font-family: w95fa;
  color: rgb(50, 49, 49);
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

div /deep/ .el-card.is-always-shadow {
  width: 50%;
}
.image {
  width: 50%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.pagination {
  padding-left: 80px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>