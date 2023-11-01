<template>
  <div classs="goods">
    <!-- 上半区域 -->
    <div
      id="staff"
      class="top_part"
      v-if="this.$store.state.cu_role === 'staff'"
    >
      <!-- 选择实验室 -->
      <div class="pro_selector">
        <el-select
          v-model="value_lab"
          placeholder="请选择"
          style="width: 150px"
        >
          <el-option
            v-for="item in lab_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <!-- 选择器，选择列表为项目的类别 -->
      <div class="pro_selector">
        <el-select v-model="value" placeholder="请选择" style="width: 150px">
          <el-option
            v-for="item1 in goods_options"
            :key="item1.value"
            :label="item1.label"
            :value="item1.value"
          >
          </el-option>
        </el-select>
      </div>
      <!-- 根据选择的项目类别，以表格显示该类别下所有的项目信息 -->
      <div class="table_inform">
        <el-table
          :data="goodsData"
          style="
            width: 95%;
            border: 1px solid black;
            border-radius: 6px;
            margin: 10px;"
            @row-click = "handleRowClick">
          <el-table-column label="商品编号" prop="number"> </el-table-column>
          <el-table-column label="商品名" prop="name"> </el-table-column>
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <img
                :src="require('@/assets/img/' + scope.row.pic)"
                alt="商品图片"
                width="50"
                height="50"
              />
            </template>
          </el-table-column>
          <el-table-column label="商品介绍" prop="desc"> </el-table-column>
        </el-table>
      </div>
    </div>
    <div
      id="admin"
      class="top_part"
      v-if="this.$store.state.cu_role === 'admin'"
    >
      <!-- 选择实验室 -->
      <div class="pro_selector">
        <el-select
          v-model="value_lab"
          placeholder="请选择"
          style="width: 150px"
        >
          <el-option
            v-for="item in lab_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="addCategory">
        <el-form label-width="80px" :model="goodCategory">
          <el-form-item label="类别编号">
            <el-input
              v-model="goodCategory.gnumber"
              style="width: 150px"
            ></el-input>
          </el-form-item>
          <el-form-item label="类别名称">
            <el-input
              v-model="goodCategory.gname"
              style="width: 150px"
            ></el-input>
          </el-form-item>
          <el-form-item label="类别图片">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="类别描述">
            <el-input
              v-model="goodCategory.gdesc"
              style="width: 150px"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      lab_list: [
        {
          value: "实验室A",
          label: "实验室A",
        },
        {
          value: "实验室B",
          label: "实验室B",
        },
        {
          value: "实验室C",
          label: "实验室C",
        },
      ],
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
      value_lab: "实验室A",
      value: "Ⅰ类", // 默认的商品第一类别
      value1: "A类", // 默认的商品第二类别
      // 所有商品的信息，也是写死的
      goodsData: [
        {
          number: "1",
          name: "商品1",
          pic: "good1.jpg",
          desc: "商品1相关描述",
        },
        {
          number: "2",
          name: "商品2",
          pic: "good2.jpg",
          desc: "商品2相关描述",
        },
        {
          number: "3",
          name: "商品3",
          pic: "good3.jpg",
          desc: "商品3相关描述",
        },
        {
          number: "4",
          name: "商品4",
          pic: "good4.jpg",
          desc: "商品4相关描述",
        },
      ],
      goodCategory: {
        gnumber: "",
        gname: "",
        gpic: "",
        gdesc: "",
      },
      fileList: [
        {
          name: 'cat1.jpeg', 
          url: 'https://c-ssl.duitang.com/uploads/blog/202104/21/20210421202949_f7e14.jpeg'
        }, 
        {
          name: 'cat2.jpeg', 
          url: 'https://c-ssl.duitang.com/uploads/blog/202104/21/20210421202951_301cf.jpeg'
        }
      ]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleRowClick(row) {
      //console.log('点击了第',row.number);
      this.$router.push({path:`/goods/${row.number}`});
    }
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
  background-size: 100% 100%;
}
.pro_selector {
  margin: 10px;
}
</style>