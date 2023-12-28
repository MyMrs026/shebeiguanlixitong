<template>
  <div class="product-area">
    <!-- 筛选模块 -->
    <div class="filter-area">
      <el-input
        v-model="filter.id"
        placeholder="请输入试剂ID"
      ></el-input>
      <el-input
        v-model="filter.name"
        placeholder="请输入试剂名"
      ></el-input>
      <el-button @click="filterProducts" type="primary" style="width: 80px"
        >筛选</el-button
      >
      <el-button @click="resetFilter" style="width: 80px">重置</el-button>
    </div>
    <!-- 表格区域 -->
    <el-table :data="pagedProductList" stripe style="width: 100%">
      <el-table-column
        fixed="left"
        label="操作"
        width="120"
        v-if="curUsername !== 'guest'"
      >
        <template slot-scope="scope">
          <el-button @click="showPurchaseDialog(scope.row)" size="small">
            购买
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="产品Id" width="80"> </el-table-column>
      <el-table-column prop="name" label="产品名" width="220">
      </el-table-column>
      <el-table-column prop="purity" label="纯度" width="100">
      </el-table-column>
      <el-table-column prop="price" label="单价" width="100"> </el-table-column>
      <el-table-column prop="description" label="介绍" width="220">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[12]"
        :page-size="pageSize"
        :total="productList.length"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
    <!-- 购买弹窗 -->
    <el-dialog
      title="购买商品"
      :visible="purchaseDialogVisible"
      @close="closePurchaseDialog"
      :style="{ width: '50%', margin: '0 auto' }"
    >
      <div>
        <p>产品名称: {{ purchaseData.name }}</p>

        <p>产品总价: {{ purchaseData.price }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePurchaseDialog">取消</el-button>
        &nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="confirmPurchase">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getReagentList, addProductOrder } from "../../network/mall";
import { getLoginUserInfo } from "../../network/user";
export default {
  data() {
    return {
      message: "试管页面",
      productList: [],
      userInfo: {},

      currentPage: 1,
      pageSize: 12,
      pagedProductList: [],

      purchaseDialogVisible: false,
      purchaseData: {},
      purchaseQuantity: 1,

      filter: {
        id: "",
        name: "",
      },

      curUsername: "",
    };
  },
  methods: {
    // 加载所有的商品
    async loadProductList() {
      try {
        const res = await getReagentList();
        this.productList = res.data;
        console.log(this.productList);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
    // 加载当前登录用户信息
    async loadLoginUserInfo() {
      try {
        const res = await getLoginUserInfo();
        this.userInfo = res.data;
        console.log(this.userInfo);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
    // 处理每页显示数量变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    // 处理当前页变化
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    // 点击购买按钮，显示购买弹窗
    showPurchaseDialog(row) {
      this.purchaseData = row;
      console.log(this.purchaseData);
      this.purchaseDialogVisible = true;
    },
    // 关闭购买弹窗
    closePurchaseDialog() {
      this.purchaseDialogVisible = false;
    },
    // 确认购买
    confirmPurchase() {
      this.purchaseData.createTime = new Date();
      // 在这里处理购买逻辑，可以将购买的数据发送到后端等
      const productId = this.purchaseData.id;
      const name = this.purchaseData.name;
      const price = this.purchaseData.price;
      const quantity = this.purchaseQuantity;
      const totalPrice = this.purchaseData.price;
      const createTime = this.formattedDate;
      const userId = this.userInfo.userId;
      console.log("购买数据:", {
        productId,
        name,
        price,
        totalPrice,
        createTime,
        userId,
      });

      // addProductOrder(
      //   createTime,
      //   productId,
      //   quantity,
      //   0,
      //   totalPrice,
      //   userId
      // ).then((res) => {
      //   console.log(res.data);
      // });

      // 关闭弹窗
      this.closePurchaseDialog();
    },
    // 筛选产品
    filterProducts() {
      if (this.filter.id !== "" || this.filter.name !== "") {
        this.pagedProductList = this.productList.filter((product) => {
          return (
            String(product.id).includes(this.filter.id) &&
            product.name.includes(this.filter.name)
          );
        });
        // 重置分页信息
        this.currentPage = 1;
        this.pageSize = 12;
      } else {
        this.$message({
          message: "请输入要筛选的信息",
          type: "warning",
        });
      }
    },
    // 重置筛选条件
    resetFilter() {
      this.filter.id = "";
      this.filter.name = "";
      this.pagedProductList = this.productList.slice(0, this.pageSize);
      this.currentPage = 1;
    },
  },
  computed: {
    // 计算当前页的数据
    slicedProductList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.productList.slice(start, end);
    },

    // 格式化日期
    formattedDate() {
      // 将字符串解析为Date对象
      const originalDate = new Date(this.purchaseData.createTime);

      // 获取年、月、日、时、分、秒
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");
      const hours = String(originalDate.getHours()).padStart(2, "0");
      const minutes = String(originalDate.getMinutes()).padStart(2, "0");
      const seconds = String(originalDate.getSeconds()).padStart(2, "0");

      // 拼接格式化后的日期字符串
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      return formattedDate;
    },
  },
  watch: {
    // 监听slicedProductList的变化并更新pagedProductList
    slicedProductList: {
      handler(newVal) {
        this.pagedProductList = newVal;
      },
      immediate: true,
    },
  },
  created() {
    this.loadProductList();
    this.loadLoginUserInfo();
    // 获取登录用户信息
    getLoginUserInfo().then((res) => {
      // console.log(res.data);
      this.curUsername = res.data.username;
      // console.log(this.curUsername);
    });
  },
};
</script>

<style>
.mallLayer {
  display: flex;
  flex-direction: row;
}
.button-area {
  display: flex;
  flex-direction: column;
  width: 20%;
  align-items: center;
  justify-content: center;
}
.button-area .el-button {
  margin-bottom: 15px;
  width: 150px !important;
}
.content-area {
  display: flex;
  flex-direction: column;
  width: 80%;
}
.filter-area {
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Adjust as needed */
  width: 100%;
}
.el-button + .el-button,
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px !important;
}
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Adjust as needed */
}
.el-dialog__header {
  padding: 20px 20px 10px; /* 您的原始样式 */
  text-align: center;
}

.el-dialog__footer {
  padding: 10px 20px 20px;
  text-align: right;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
}

.el-dialog__body {
  padding: 30px 60px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
</style>