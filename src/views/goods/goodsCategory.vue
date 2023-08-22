<template>
  <div> 
    {{ message }}
    <!-- 上半区域 -->
    <div class="top_part">
    <!-- 选择实验室 -->
      <div class="pro_selector">
        <el-select v-model="value_lab" placeholder="请选择" style="width: 150px;">
          <el-option v-for="item in lab_list" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>

      <!-- 选择器，选择列表为项目的类别 -->
      <div class="pro_selector">
        <el-select v-model="value" placeholder="请选择" style="width: 150px;">
          <el-option v-for="item1 in goods_options" :key="item1.value" :label="item1.label" :value="item1.value">
          </el-option>
        </el-select>
        <el-select v-model="value1" placeholder="请选择" style="width: 150px;">
          <el-option v-for="item2 in goods_options2" :key="item2.value" :label="item2.label" :value="item2.value">
          </el-option>
        </el-select>
      </div>
      <!-- 根据选择的项目类别，以表格显示该类别下所有的项目信息 -->
      <div class="table_inform">
        <el-table :data="goodsData" style="width: 95%;border:1px solid black;border-radius: 6px;margin:10px">
          <el-table-column label="商品编号" prop="number">
          </el-table-column>
          <el-table-column label="商品名" prop="name">
          </el-table-column>
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <img :src="require('@/assets/img/'+scope.row.pic)" alt="商品图片" width="50" height="50">
            </template>
          </el-table-column>
          <el-table-column label="商品介绍" prop="desc">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components:{

  },
  data() {
    return {
      message:'商品分类',
      lab_list: [{
        value: '实验室A',
        label: '实验室A'
      },{
        value: '实验室B',
        label: '实验室B'
      },{
        value: '实验室C',
        label: '实验室C'
      }],
      goods_options: [{
        value: 'Ⅰ类',
        label: 'Ⅰ类'
      }, {
        value: 'Ⅱ类',
        label: 'Ⅱ类'
      }, {
        value: 'Ⅲ类',
        label: 'Ⅲ类'
      }],
      goods_options2: [{
        value: 'A类',
        label: 'A类'
      }, {
        value: 'B类',
        label: 'B类'
      }, {
        value: 'C类',
        label: 'C类'
      }],
      value_lab: '实验室A',
      value: 'Ⅰ类', // 默认的商品第一类别
      value1: 'A类', // 默认的商品第二类别
      // 所有商品的信息，也是写死的
      goodsData:[{
        number:'1',
        name:'商品1',
        pic:'good1.jpg',
        desc:'商品1相关描述',
      },{
        number:'2',
        name:'商品2',
        pic:'good2.jpg',
        desc:'商品2相关描述',
      },{
        number:'3',
        name:'商品3',
        pic:'good3.jpg',
        desc:'商品3相关描述',
      },{
        number:'4',
        name:'商品4',
        pic:'good4.jpg',
        desc:'商品4相关描述',
      }]
    }
  },
  methods:{
    
  }
}
</script>
<style scope>
.pro_selector {
  margin: 10px;
}
</style>