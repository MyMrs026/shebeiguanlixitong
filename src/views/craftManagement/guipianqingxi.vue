<template>
    <section>
      <div class="border-style">
        <h1 style="font-size: 40px;color: black;">硅片清洗</h1>
        <!-- <p style="font-size: 20px;color: black;"></p> -->
    </div>
    <div class="border-style">
        <!-- <h1 style="font-size: 20px;color: black;"></h1> -->
        <el-table
            :data="tableData"
            border
            style="width: 100%"
            :header-cell-style="{ 'text-align':'center' }"
            >
            <el-table-column
            fixed
            prop="equ"
            label="设备"
            align="center"
            min-width="20%">
            </el-table-column>
            <el-table-column
            prop="gongneng"
            label="功能"
            align="center"
            min-width="45%">
            </el-table-column>
            <el-table-column
            prop="jishucanshu"
            label="技术参数"
            min-width="45%">
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
          equ:'湿法工作台',
          gongneng: '芯片表面湿法清洗',
          jishucanshu: '有机/无机/III-V/金属/颗粒材料',
        },{
          equ:'氧气等离子清洗机',
          gongneng: '芯片表面干法清洗',
          jishucanshu: '3层，每层有效面积8吋向下兼容；\n极限真空度1Pa；\n2路气体（氧、氩、氮或氢气）',
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
  