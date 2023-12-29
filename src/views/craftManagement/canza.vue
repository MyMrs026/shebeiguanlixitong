<template>
    <section>
      <div class="border-style">
        <h1 style="font-size: 40px;color: black;">掺杂</h1>
        <p style="font-size: 20px;color: black;">掺杂的方法主要有<a style="font-weight: bold;">扩散</a>扩散和<a style="font-weight: bold;">离子注入</a>，两种方法在分立器件或集成电路中都有用得到，并且两者可以说是互补的，比如说，<a style="font-weight: bold;">扩散可应用于形成深结，离子注入可形成浅结</a>。</p>
    </div>
    <div class="border-style">
        <h1 style="font-size: 20px;color: black;">比较掺杂工艺：</h1>
        <el-table
            :data="tableData"
            border
            style="width: 100%"
            :show-header="false"
            :header-cell-style="{ 'text-align':'center' }"
            >
            <el-table-column>
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="商品名称">
                        <span>{{ props.row.project }}</span>
                    </el-form-item>
                    </el-form>
                </template>
             </el-table-column>
        </el-table>
    </div>
    </section>
  </template>
  <script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [{
          project:'接触式紫外光刻机',
          gongneng: '紫外曝光',
          jishucanshu: 'I线365nm，G线436nm\n6吋向下兼容\n曝光精度1um，对准精度500nm；\n正反两面对准。',
        },]
      }
    }
  }
  </script>
  <style scoped>
  .border-style{
    width: 80%;
    margin: 0 0 0 10% ;
  }
.el-table{
    .cell {
        white-space: pre-wrap;
    }
}
  </style>