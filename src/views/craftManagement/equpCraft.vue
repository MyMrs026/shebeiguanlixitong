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
          :key="equipment.equipmentId"
        >
        <div class="image-container" >
          <img
            v-bind:src="equipment.equipmentImageUrl"
            style="object-fit:contain;width: 100%; height: 100%; float: left; max-height: 200px"
            @click="gotoDeviceDetail(equipment.equipmentId)"
          />
          </div>
          <router-link :to="'/book/' + equipment.equipmentId">
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
          <router-link to="/train">
            <el-button
              type="primary"
              plain
              size="small"
            >培训预约</el-button>
          </router-link>
          <router-link to="/searchRecords">
            <el-button
              type="primary"
              plain
              size="small"
            >实验记录</el-button>
          </router-link>
          <br />
          设备名称：{{ equipment.equipmentName }}
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
  </div>
</template>
<script>
import { getEquList } from "../../network/equpment";
export default {
  data() {
    return {
      equinform: [],
      currentDate: new Date(),
      currentPage:1,
      perPage: 8,
      goToPageNumber: "",
      message: "设备工艺展示",
      apiUrl : "http://47.98.160.222:8080/api/file/uploadImage",
      imageUrl: "",
      customHeaders: {
        'Authorization':localStorage.getItem('token')
      },
      value: "", //绑定设备的名称
    };
  },
  methods: {
    gotoDeviceDetail(index) {
      this.$router.push({ path: `/device/${index}` });
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
  mounted() {
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
  list-style: none;
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
.image-container {
  width: 100%; /* 设置容器宽度 */
  max-height: 200px; /* 设置最大高度，控制图片的高度 */
  background-color: white; /* 设置占位背景颜色为白色 */

  display: flex;
  justify-content: center;
  align-items: center;
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
