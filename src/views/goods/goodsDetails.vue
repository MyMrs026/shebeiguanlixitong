<template>
  <div class="goods">
    <div 
      id="admin"
      class="goods-manage" 
      v-if="this.$store.state.cu_role === 'admin'">
      <el-form
        :model="goodsInforms"
        :rules="rules"
        ref="goodsInforms"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="商品编号" prop="number">
          <el-input v-model="goodsInforms.iid" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goodsInforms.name" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="pic">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品类别" prop="cate">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in goods_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品sku" prop="sku">
          <el-input v-model="goodsInforms.sku" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="商品库存量" prop="storage">
          <el-input v-model="goodsInforms.storage" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="goodsInforms.price" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="商品介绍" prop="desc">
          <el-input v-model="goodsInforms.intro" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('goodsInforms')">立即创建</el-button>
          <el-button @click="resetForm('goodsInforms')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="staff" class="goods-detail">

    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      goodsInforms: {
        number: "",
        name: "",
        pic: "",
        cate: "",
        sku: "",
        storage: "",
        price: "",
        desc: "",
      },
      rules: {
        iid: [
          { required: true, message: "请输入商品编号", trigger: "blur" },
          { type: "number", message: "编号必须为数字" },
        ],
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        // pic: [{ required: true, message: "请上传商品图片", trigger: "blur" }],
        cate: [{ required: true, message: "请输入商品类别", trigger: "blur" }],
        sku: [{ required: true, message: "请输入商品sku", trigger: "blur" }],
        storage: [
          { required: true, message: "请输入商品库存", trigger: "blur" },
          { type: "number", message: "编号必须为数字" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "编号必须为数字" },
        ],
        intro: [{ required: true, message: "请输入商品介绍", trigger: "blur" }],
      },
      fileList: [],
      goods_options: [
        {
          value: "Ⅰ类",
          label: "Ⅰ类",
        },
        {
          value: "Ⅱ类",
          label: "Ⅱ类",
        },
        {
          value: "Ⅲ类",
          label: "Ⅲ类",
        },
      ],

    };
  },
  methods: {
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
  
};
</script>
<style scope>
.goods {
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-image: url("../../assets/img/qqq6.png");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
</style>