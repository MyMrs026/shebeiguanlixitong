<template>
    <section>
      <div class="border-style">
        <h1 style="font-size: 40px;color: black;">热处理</h1>
        <p style="font-size: 20px;color: black;">在半导体工艺中，热处理是不可或缺的重要工艺之一。热处理过程是指将晶圆放置在充满特定气体的环境中对其施加热能的过程，包括氧化/扩散/退火等。热处理设备主要应用于氧化、扩散、退火以及合金四类工艺。,键合的目的是将芯片的输入输出端与管脚进行连接,之后再将管脚与应用器件相连接,进而实现芯片的输入输出端与应用器件相连接。</p>
    </div>
    <div class="border-style">
        <h1 style="font-size: 20px;color: black;">选择热处理设备：</h1>
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
          equ:'快速退火炉',
          gongneng: '退火',
          jishucanshu: '温度范围200-1300ºC；\n升/降温阶梯20-250ºC；\n支持最多5路气体。',
        },{
          equ:'高温炉',
          gongneng: '硅晶圆高温氧化/退火/LPCVD',
          jishucanshu: '温度范围200-1230ºC，温度稳定性±0.5 ºC；\n恒温区最长600mm；\n4管（OH/干氧/湿氧/、SiN LPCVD、退火、预留）',
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
  