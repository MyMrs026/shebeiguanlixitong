<template>
  <div>
    <h3>{{ message }}</h3>
    <el-table :data="pagedProductList" stripe style="width: 60%">
      <el-table-column fixed="left" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="showPurchaseDialog(scope)" size="small"> 购买 </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="productId" label="产品Id" width="80">
      </el-table-column>
      <el-table-column prop="productName" label="产品名" width="180">
      </el-table-column>
      <el-table-column prop="unit" label="单位名称" width="100">
      </el-table-column>
      <el-table-column prop="stock" label="库存" width="80"> </el-table-column>
      <el-table-column prop="price" label="单价" width="100"> </el-table-column>
      <el-table-column prop="func" label="功能" width="180"> </el-table-column>
      <el-table-column prop="description" label="介绍" width="180">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[8, 16, 24, 32]"
      :page-size="pageSize"
      :total="productList.length"
      layout="total, sizes, prev, pager, next, jumper"
    />

    <!-- 购买弹窗 -->
    <el-dialog
      title="购买商品"
      :visible="purchaseDialogVisible"
      @close="closePurchaseDialog"
    >
      <div>
        <p>产品名称: {{ purchaseData.productName }}</p>
        <p>产品单价: {{ purchaseData.price }}</p>
        <p>
          购买数量:
          <el-input-number v-model="purchaseQuantity" :min="1" :max="100" />
        </p>
        <p>产品总价: {{ purchaseData.price * purchaseQuantity }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePurchaseDialog">取消</el-button>
        <el-button type="primary" @click="confirmPurchase">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
import { getProduct } from "../../network/mall";
export default {
  data() {
    return {
      message: "商品页面",
      productList: [],

      currentPage: 1,
      pageSize: 8,
      pagedProductList: [],

      purchaseDialogVisible: false,
      purchaseData: {},
      purchaseQuantity: 1,
    };
  },
  methods: {
    //加载所有的商品
    async loadProductList() {
      try {
        const res = await getProduct();
        this.productList = res.data;
        console.log(this.productList);
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
      this.purchaseDialogVisible = true;
    },
    // 关闭购买弹窗
    closePurchaseDialog() {
      this.purchaseDialogVisible = false;
    },
    // 确认购买
    confirmPurchase() {
      // 在这里处理购买逻辑，可以将购买的数据发送到后端等
      console.log("购买数据:", {
        productName: this.purchaseData.productName,
        price: this.purchaseData.price,
        quantity: this.purchaseQuantity,
        totalPrice: this.purchaseData.price * this.purchaseQuantity,
      });

      // 关闭弹窗
      this.closePurchaseDialog();
    },
  },
  computed: {
    // 计算当前页的数据
    slicedProductList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.productList.slice(start, end);
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
  },
};
</script>
<style scoped>
</style>